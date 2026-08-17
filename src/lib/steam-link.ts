import "server-only";
import { cookies } from "next/headers";
import { eq } from "drizzle-orm";
import { getSessionUserId } from "./session";
import type { SteamLink } from "./steam";

/**
 * Where the buyer's linked Steam account lives.
 *
 * A signed-in user with a database persists it on their row. Everyone else
 * (guest checkout, no DATABASE_URL) keeps it in an httpOnly cookie, so linking
 * Steam always works — the storefront runs fine without a database.
 */

const COOKIE = "earnerskins_steam";

export async function getSteamLink(): Promise<SteamLink | null> {
  // Prefer the persisted account for logged-in users.
  const userId = await getSessionUserId();
  if (userId && process.env.DATABASE_URL) {
    try {
      const { db, users } = await import("@/db");
      const rows = await db.select().from(users).where(eq(users.id, userId)).limit(1);
      const u = rows[0];
      if (u?.steamId && u.steamTradeToken) {
        return {
          steamId: u.steamId,
          token: u.steamTradeToken,
          personaName: u.steamPersonaName ?? "Steam user",
          avatarUrl: u.steamAvatarUrl ?? "",
        };
      }
    } catch {
      // fall through to cookie
    }
  }

  const jar = await cookies();
  const raw = jar.get(COOKIE)?.value;
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as SteamLink;
    if (parsed.steamId && parsed.token) return parsed;
  } catch {
    // ignore malformed cookie
  }
  return null;
}

export async function setSteamLinkCookie(link: SteamLink): Promise<void> {
  const jar = await cookies();
  jar.set(COOKIE, JSON.stringify(link), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 180,
  });
}

export async function clearSteamLinkCookie(): Promise<void> {
  const jar = await cookies();
  jar.delete(COOKIE);
}
