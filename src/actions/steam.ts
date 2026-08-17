"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { getSessionUserId } from "@/lib/session";
import { sihConfig } from "@/lib/sih/config";
import { parseTradeUrl, fetchSteamSummary, type SteamLink } from "@/lib/steam";
import { setSteamLinkCookie, clearSteamLinkCookie } from "@/lib/steam-link";

export interface SteamLinkState {
  error?: string;
  ok?: boolean;
  link?: SteamLink;
}

/**
 * Link a Steam account from a public trade URL. Resolves avatar + nickname from
 * the Steam Web API, persists to the user row when signed in with a database,
 * and always writes an httpOnly cookie so guest checkout works too.
 */
export async function linkSteamAction(
  _prev: SteamLinkState,
  formData: FormData,
): Promise<SteamLinkState> {
  const tradeUrl = String(formData.get("tradeUrl") ?? "").trim();
  const parsed = parseTradeUrl(tradeUrl);
  if (!parsed) {
    return {
      error:
        "That doesn't look like a valid Steam trade URL. Copy it from Steam → Inventory → Trade Offers → Who can send me Trade Offers.",
    };
  }

  const summary = await fetchSteamSummary(parsed.steamId, sihConfig().steamApiKey);
  const link: SteamLink = {
    steamId: parsed.steamId,
    token: parsed.token,
    personaName: summary?.personaName ?? "Steam user",
    avatarUrl: summary?.avatarUrl ?? "",
  };

  const userId = await getSessionUserId();
  if (userId && process.env.DATABASE_URL) {
    try {
      const { db, users } = await import("@/db");
      await db
        .update(users)
        .set({
          steamId: link.steamId,
          steamTradeToken: link.token,
          steamPersonaName: link.personaName,
          steamAvatarUrl: link.avatarUrl,
        })
        .where(eq(users.id, userId));
    } catch {
      // non-fatal — cookie still carries the link
    }
  }

  await setSteamLinkCookie(link);
  revalidatePath("/checkout");
  revalidatePath("/account");
  return { ok: true, link };
}

export async function unlinkSteamAction(): Promise<SteamLinkState> {
  const userId = await getSessionUserId();
  if (userId && process.env.DATABASE_URL) {
    try {
      const { db, users } = await import("@/db");
      await db
        .update(users)
        .set({
          steamId: null,
          steamTradeToken: null,
          steamPersonaName: null,
          steamAvatarUrl: null,
        })
        .where(eq(users.id, userId));
    } catch {
      // ignore
    }
  }
  await clearSteamLinkCookie();
  revalidatePath("/checkout");
  revalidatePath("/account");
  return { ok: true };
}
