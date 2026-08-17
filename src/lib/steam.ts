/**
 * Steam helpers: parse a public trade URL into the identifiers SIH needs
 * (steamId64 + trade token) and resolve the account's avatar + nickname via
 * the Steam Web API. Pure/isomorphic except for the network call.
 */

/** SteamID64 of the first individual account — added to a 32-bit "partner". */
const STEAMID64_BASE = 76561197960265728n;

export interface SteamLink {
  steamId: string;
  token: string;
  personaName: string;
  avatarUrl: string;
}

export interface ParsedTradeUrl {
  steamId: string;
  token: string;
}

/**
 * Accepts a Steam trade offer URL:
 *   https://steamcommunity.com/tradeoffer/new/?partner=1234&token=AbCdEfG
 * and returns steamId64 + token.
 */
export function parseTradeUrl(input: string): ParsedTradeUrl | null {
  if (!input) return null;
  let url: URL;
  try {
    url = new URL(input.trim());
  } catch {
    return null;
  }
  if (!/steamcommunity\.com$/i.test(url.hostname)) return null;
  if (!url.pathname.includes("/tradeoffer/new")) return null;

  const partner = url.searchParams.get("partner");
  const token = url.searchParams.get("token");
  if (!partner || !token) return null;
  if (!/^\d+$/.test(partner) || !/^[A-Za-z0-9_-]{6,}$/.test(token)) return null;

  const steamId = (BigInt(partner) + STEAMID64_BASE).toString();
  return { steamId, token };
}

interface SteamSummary {
  personaName: string;
  avatarUrl: string;
}

/**
 * Resolve avatar + nickname from the Steam Web API.
 * Returns null on any failure (missing key, network, unknown account) so the
 * caller can still proceed with a linked-but-unnamed account.
 */
export async function fetchSteamSummary(
  steamId: string,
  apiKey: string,
): Promise<SteamSummary | null> {
  if (!apiKey) return null;
  const url = new URL(
    "https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/",
  );
  url.searchParams.set("key", apiKey);
  url.searchParams.set("steamids", steamId);

  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return null;
    const data = (await res.json()) as {
      response?: { players?: Array<{ personaname?: string; avatarfull?: string }> };
    };
    const player = data.response?.players?.[0];
    if (!player) return null;
    return {
      personaName: player.personaname ?? "Steam user",
      avatarUrl: player.avatarfull ?? "",
    };
  } catch {
    return null;
  }
}
