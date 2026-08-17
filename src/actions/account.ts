"use server";

import { revalidatePath } from "next/cache";
import { eq, sql } from "drizzle-orm";
import { getSessionUserId } from "@/lib/session";
import { toBasePence, type CurrencyCode } from "@/lib/currency";

export interface TopUpState {
  error?: string;
  ok?: boolean;
  message?: string;
}

/** Add funds to the signed-in user's balance and record a transaction. */
export async function topUpAction(_prev: TopUpState, formData: FormData): Promise<TopUpState> {
  const userId = await getSessionUserId();
  if (!userId) return { error: "Please sign in to top up your balance." };

  const amount = Number(formData.get("amount"));
  const currency = (String(formData.get("currency") ?? "GBP") as CurrencyCode) || "GBP";
  if (!Number.isFinite(amount) || amount <= 0) {
    return { error: "Enter a valid amount to top up." };
  }
  const pence = toBasePence(amount, currency);
  if (pence <= 0) return { error: "Enter a valid amount to top up." };

  try {
    const { db, users, transactions } = await import("@/db");
    await db
      .update(users)
      .set({ balancePence: sql`${users.balancePence} + ${pence}` })
      .where(eq(users.id, userId));
    await db.insert(transactions).values({
      userId,
      type: "topup",
      amountPence: pence,
      description: "Account top-up",
    });
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Top-up failed. Please try again." };
  }

  revalidatePath("/account");
  revalidatePath("/account/wallet");
  return { ok: true, message: "Your balance has been topped up." };
}
