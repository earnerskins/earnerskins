import "server-only";
import { cache } from "react";
import { eq } from "drizzle-orm";
import { getSessionUserId } from "./session";
import type { User } from "@/db/schema";

export type SafeUser = Omit<User, "passwordHash">;

/**
 * Load the current user from the session.
 * Returns null when logged out — or when no database is configured,
 * so public pages still render in preview environments.
 */
export const getCurrentUser = cache(async (): Promise<SafeUser | null> => {
  const userId = await getSessionUserId();
  if (!userId) return null;
  if (!process.env.DATABASE_URL) return null;
  try {
    const { db, users } = await import("@/db");
    const rows = await db.select().from(users).where(eq(users.id, userId)).limit(1);
    if (!rows[0]) return null;
    const { passwordHash: _ph, ...safe } = rows[0];
    return safe;
  } catch {
    return null;
  }
});
