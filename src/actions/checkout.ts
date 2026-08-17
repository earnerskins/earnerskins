"use server";

import { redirect } from "next/navigation";
import { eq, sql } from "drizzle-orm";
import { getSessionUserId } from "@/lib/session";
import { getItemBySlug } from "@/lib/queries";
import { getSteamLink } from "@/lib/steam-link";
import { sihConfig } from "@/lib/sih/config";
import { createOrder } from "@/lib/sih/client";
import type { SihOrderStatus } from "@/lib/sih/types";
import { POLICIES } from "@/lib/config";
import { formatPrice, type CurrencyCode } from "@/lib/currency";
import { sendMail, orderConfirmationEmail } from "@/lib/mail";
import { renderInvoicePdf, type InvoiceData } from "@/lib/invoice";

export interface CheckoutState {
  error?: string;
}

interface IncomingLine {
  slug: string;
  quantity: number;
}

function orderNumber(): string {
  const d = new Date();
  const ymd = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(
    d.getDate(),
  ).padStart(2, "0")}`;
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `SP-${ymd}-${rand}`;
}

export async function placeOrderAction(
  _prev: CheckoutState,
  formData: FormData,
): Promise<CheckoutState> {
  const agreed = formData.get("agree") === "on" || formData.get("agree") === "true";
  if (!agreed) return { error: "Please agree to the terms before placing your order." };

  const currency = (String(formData.get("currency") ?? "GBP") as CurrencyCode) || "GBP";
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const payWithBalance = formData.get("payWithBalance") === "true";

  let incoming: IncomingLine[];
  try {
    incoming = JSON.parse(String(formData.get("lines") ?? "[]"));
  } catch {
    return { error: "Your cart could not be read. Please try again." };
  }
  if (!Array.isArray(incoming) || incoming.length === 0) {
    return { error: "Your cart is empty." };
  }

  // Re-price server-side from the catalog to prevent tampering.
  const lines = incoming
    .map((l) => {
      const item = getItemBySlug(l.slug);
      if (!item) return null;
      const quantity = Math.max(1, Math.min(10, Math.floor(l.quantity) || 1));
      return {
        slug: item.slug,
        name: item.name,
        gameSlug: item.gameSlug,
        wear: item.wear,
        pricePence: item.pricePence,
        quantity,
        marketHashName: item.marketHashName,
        appId: item.appId,
      };
    })
    .filter((l): l is NonNullable<typeof l> => l !== null);

  if (lines.length === 0) return { error: "Your cart items are no longer available." };

  const subtotalPence = lines.reduce((n, l) => n + l.pricePence * l.quantity, 0);
  const serviceFeePence = POLICIES.serviceFeePence;
  const totalPence = subtotalPence + serviceFeePence;

  // Skins are delivered to Steam, so a linked account is mandatory.
  const steam = await getSteamLink();
  if (!steam) {
    return { error: "Please link your Steam account before placing your order." };
  }

  const number = orderNumber();

  // Place each line with SIH (test mode unless SIH_LIVE). Best-effort in test
  // mode: a provider hiccup shouldn't lose the customer's order. Items without
  // a market_hash_name (demo supplements) are fulfilled internally.
  const cfg = sihConfig();
  const sihResults = await Promise.all(
    lines.map(async (l, i) => {
      if (!cfg.configured || !l.marketHashName || !l.appId) {
        return { sihOrderId: null as number | null, sihStatus: null as SihOrderStatus | null };
      }
      try {
        const res = await createOrder({
          item: l.marketHashName,
          amount: l.quantity,
          steamId: steam.steamId,
          token: steam.token,
          appId: l.appId,
          customId: `${number}-${i}`,
          test: !cfg.live,
        });
        return {
          sihOrderId: res.id ?? res.order?.id ?? null,
          sihStatus: (res.order?.status ?? (res.success ? "created" : "failed")) as SihOrderStatus,
        };
      } catch {
        return { sihOrderId: null as number | null, sihStatus: "failed" as SihOrderStatus };
      }
    }),
  );

  const userId = await getSessionUserId();
  let customerEmail = email;
  let customerName = "EarnerSkins Customer";

  const hasDb = !!process.env.DATABASE_URL;

  if (hasDb) {
    try {
      const { db, users, orders, orderItems, transactions } = await import("@/db");

      if (userId) {
        const rows = await db.select().from(users).where(eq(users.id, userId)).limit(1);
        const user = rows[0];
        if (user) {
          customerEmail = user.email;
          customerName = `${user.firstName} ${user.lastName}`.trim();
          if (payWithBalance) {
            if (user.balancePence < totalPence) {
              return { error: "Your balance is too low. Top up or pay by card." };
            }
            await db
              .update(users)
              .set({ balancePence: sql`${users.balancePence} - ${totalPence}` })
              .where(eq(users.id, userId));
          }
        }
      }

      if (!customerEmail) return { error: "Please provide an email for your order confirmation." };

      const inserted = await db
        .insert(orders)
        .values({
          orderNumber: number,
          userId: userId ?? null,
          email: customerEmail,
          status: "paid",
          subtotalPence,
          serviceFeePence,
          totalPence,
          currency,
          steamId: steam.steamId,
        })
        .returning({ id: orders.id });
      const orderId = inserted[0].id;

      await db.insert(orderItems).values(
        lines.map((l, i) => ({
          orderId,
          name: l.name,
          gameSlug: l.gameSlug,
          wear: l.wear,
          pricePence: l.pricePence,
          quantity: l.quantity,
          marketHashName: l.marketHashName ?? null,
          appId: l.appId ?? null,
          sihOrderId: sihResults[i].sihOrderId,
          sihStatus: sihResults[i].sihStatus,
        })),
      );

      if (userId) {
        await db.insert(transactions).values({
          userId,
          type: "purchase",
          amountPence: -totalPence,
          description: `Order ${number}`,
          orderId,
        });
      }
    } catch (e) {
      return { error: e instanceof Error ? e.message : "Payment could not be processed." };
    }
  } else if (!customerEmail) {
    return { error: "Please provide an email for your order confirmation." };
  }

  // Invoice + confirmation email (best-effort — never block the order).
  try {
    const invoiceData: InvoiceData = {
      orderNumber: number,
      date: new Date().toLocaleDateString("en-GB"),
      customerName,
      customerEmail,
      currency,
      lines: lines.map((l) => ({
        name: l.name,
        game: l.gameSlug,
        wear: l.wear,
        pricePence: l.pricePence,
        quantity: l.quantity,
      })),
      subtotalPence,
      serviceFeePence,
      totalPence,
    };
    const pdf = await renderInvoicePdf(invoiceData);
    await sendMail({
      to: customerEmail,
      subject: `Your EarnerSkins order ${number}`,
      html: orderConfirmationEmail(number, formatPrice(totalPence, currency)),
      attachments: [
        { filename: `earnerskins-invoice-${number}.pdf`, content: pdf, contentType: "application/pdf" },
      ],
    });
  } catch {
    // ignore mail/pdf failures
  }

  redirect(`/checkout/success?order=${number}`);
}
