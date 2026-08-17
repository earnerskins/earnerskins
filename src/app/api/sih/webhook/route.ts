import { NextResponse } from "next/server";
import { and, eq } from "drizzle-orm";
import { sihConfig } from "@/lib/sih/config";
import type { SihOrderStatus, SihWebhookPayload } from "@/lib/sih/types";

export const dynamic = "force-dynamic";

// SIH POSTs order-status changes to the webhook URL we register. We authenticate
// with a shared secret carried in the query string (?secret=…) since SIH sends
// no signing header. customId is `${orderNumber}-${lineIndex}`.
export async function POST(req: Request) {
  const cfg = sihConfig();
  const url = new URL(req.url);
  const secret = url.searchParams.get("secret") ?? "";
  if (!cfg.webhookSecret || secret !== cfg.webhookSecret) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  let payload: SihWebhookPayload;
  try {
    payload = (await req.json()) as SihWebhookPayload;
  } catch {
    return NextResponse.json({ error: "invalid json" }, { status: 400 });
  }

  const status = payload.status;
  if (!payload.id && !payload.customId) {
    return NextResponse.json({ error: "missing order reference" }, { status: 400 });
  }

  if (!process.env.DATABASE_URL) {
    // Nothing to persist without a database — acknowledge so SIH stops retrying.
    return NextResponse.json({ ok: true });
  }

  try {
    const { db, orderItems, orders } = await import("@/db");

    // Prefer matching by SIH order id; fall back to our customId prefix.
    const orderNumber = payload.customId?.split("-").slice(0, -1).join("-") ?? null;

    if (payload.id) {
      await db
        .update(orderItems)
        .set({ sihStatus: status })
        .where(eq(orderItems.sihOrderId, payload.id));
    } else if (orderNumber) {
      const row = await db
        .select({ id: orders.id })
        .from(orders)
        .where(eq(orders.orderNumber, orderNumber))
        .limit(1);
      const orderId = row[0]?.id;
      if (orderId) {
        await db
          .update(orderItems)
          .set({ sihStatus: status })
          .where(and(eq(orderItems.orderId, orderId)));
      }
    }

    // Roll the parent order forward on terminal states.
    const orderStatus = mapOrderStatus(status);
    if (orderStatus && orderNumber) {
      await db
        .update(orders)
        .set({ status: orderStatus })
        .where(eq(orders.orderNumber, orderNumber));
    }
  } catch {
    // Swallow so SIH doesn't hammer retries on a transient DB blip; the order
    // is already recorded and can be reconciled via get-order.
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ ok: true });
}

function mapOrderStatus(
  s: SihOrderStatus,
): "delivered" | "cancelled" | null {
  switch (s) {
    case "finished":
      return "delivered";
    case "failed":
    case "penalized":
      return "cancelled";
    default:
      return null;
  }
}
