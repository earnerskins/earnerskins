import "server-only";
import { desc, eq } from "drizzle-orm";
import type { Order, Transaction } from "@/db/schema";

export async function getUserTransactions(userId: string): Promise<Transaction[]> {
  if (!process.env.DATABASE_URL) return [];
  try {
    const { db, transactions } = await import("@/db");
    return db
      .select()
      .from(transactions)
      .where(eq(transactions.userId, userId))
      .orderBy(desc(transactions.createdAt))
      .limit(100);
  } catch {
    return [];
  }
}

export interface OrderWithItems extends Order {
  items: { name: string; gameSlug: string; wear: string | null; pricePence: number; quantity: number }[];
}

export async function getUserOrders(userId: string): Promise<OrderWithItems[]> {
  if (!process.env.DATABASE_URL) return [];
  try {
    const { db, orders, orderItems } = await import("@/db");
    const rows = await db
      .select()
      .from(orders)
      .where(eq(orders.userId, userId))
      .orderBy(desc(orders.createdAt))
      .limit(50);
    const result: OrderWithItems[] = [];
    for (const o of rows) {
      const items = await db
        .select({
          name: orderItems.name,
          gameSlug: orderItems.gameSlug,
          wear: orderItems.wear,
          pricePence: orderItems.pricePence,
          quantity: orderItems.quantity,
        })
        .from(orderItems)
        .where(eq(orderItems.orderId, o.id));
      result.push({ ...o, items });
    }
    return result;
  } catch {
    return [];
  }
}
