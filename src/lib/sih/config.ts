/** SIH game app IDs we surface in the store. */
export const APP_IDS = { cs2: 730, tf2: 440, rust: 252490 } as const;

export type StoreGameSlug = keyof typeof APP_IDS;

export const APP_ID_TO_SLUG: Record<number, StoreGameSlug> = {
  730: "cs2",
  440: "tf2",
  252490: "rust",
};

function num(name: string, fallback: number): number {
  const v = Number(process.env[name]);
  return Number.isFinite(v) ? v : fallback;
}

/**
 * Typed view over the SIH environment. Reads at call time so the same module
 * works in the sync script, server actions and route handlers.
 */
export function sihConfig() {
  const apiKey = process.env.SIH_API_KEY ?? "";
  return {
    apiBase: process.env.SIH_API_BASE ?? "https://api.sih.market/api/v1",
    apiKey,
    webhookSecret: process.env.SIH_WEBHOOK_SECRET ?? "",
    /** When false, every order is forced to test=true (no balance debited). */
    live: process.env.SIH_LIVE === "1" && process.env.SIH_TEST_MODE !== "true",
    margin: num("SIH_MARGIN", 0.07),
    minMarginAbs: num("SIH_MIN_MARGIN_ABS", 0.1),
    priceTolerance: num("SIH_PRICE_TOLERANCE", 0.03),
    maxItemPriceUsd: num("SIH_MAX_ITEM_PRICE", 20000),
    lowBalanceThreshold: num("SIH_LOW_BALANCE_THRESHOLD", 200),
    syncIntervalMin: num("SIH_SYNC_INTERVAL_MIN", 7),
    appIds: (process.env.SIH_APP_IDS ?? "730,440,252490")
      .split(",")
      .map((s) => Number(s.trim()))
      .filter((n) => APP_ID_TO_SLUG[n]),
    steamApiKey: process.env.STEAM_API_KEY ?? "",
    configured: apiKey.length > 0,
  };
}

export type SihConfig = ReturnType<typeof sihConfig>;
