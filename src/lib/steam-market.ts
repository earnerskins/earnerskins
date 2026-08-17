/**
 * Steam Community Market client used by the catalog sync.
 *
 * SIH only ships art for CS2, and barely stocks TF2 — so for TF2/Rust we source
 * breadth and images straight from the public market search endpoint, which
 * returns name + sell price + an economy image hash per item.
 */

const RENDER = "https://steamcommunity.com/market/search/render/";
const ECONOMY_IMAGE = "https://community.cloudflare.steamstatic.com/economy/image/";

export interface SteamMarketItem {
  hashName: string;
  name: string;
  /** Lowest sell price in USD, when the market lists one. */
  priceUsd?: number;
  /** Resolved 360×360 economy image URL. */
  image?: string;
}

interface RenderResult {
  name?: string;
  hash_name?: string;
  sell_price?: number; // cents USD
  asset_description?: { icon_url?: string; market_hash_name?: string };
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function fetchPage(
  appId: number,
  start: number,
  count: number,
): Promise<{ total: number; items: SteamMarketItem[] }> {
  const url = new URL(RENDER);
  url.searchParams.set("appid", String(appId));
  url.searchParams.set("norender", "1");
  url.searchParams.set("count", String(count));
  url.searchParams.set("start", String(start));
  url.searchParams.set("search_descriptions", "0");
  url.searchParams.set("sort_column", "quantity");
  url.searchParams.set("sort_dir", "desc");

  const res = await fetch(url, {
    headers: {
      "user-agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
      accept: "application/json",
      "accept-language": "en-GB,en;q=0.9",
    },
  });
  if (!res.ok) throw new Error(`steam market ${res.status}`);
  const json = (await res.json()) as { total_count?: number; results?: RenderResult[] };
  const results = json.results ?? [];
  const items: SteamMarketItem[] = results.map((r) => {
    const hashName = r.hash_name ?? r.asset_description?.market_hash_name ?? r.name ?? "";
    const icon = r.asset_description?.icon_url;
    return {
      hashName,
      name: r.name ?? hashName,
      priceUsd: typeof r.sell_price === "number" ? r.sell_price / 100 : undefined,
      image: icon ? `${ECONOMY_IMAGE}${icon}/360fx360f` : undefined,
    };
  });
  return { total: json.total_count ?? items.length, items };
}

/**
 * Page through the market (throttled, with a single backoff retry per page)
 * until `maxItems` are collected or the listing is exhausted. Returns whatever
 * was gathered — partial results are fine, the caller degrades gracefully.
 */
export async function fetchMarketCatalog(
  appId: number,
  { maxItems, log }: { maxItems: number; log?: (msg: string) => void },
): Promise<SteamMarketItem[]> {
  const out: SteamMarketItem[] = [];
  const seen = new Set<string>();
  const count = 100;
  let start = 0;

  while (out.length < maxItems) {
    let page: Awaited<ReturnType<typeof fetchPage>>;
    try {
      page = await fetchPage(appId, start, count);
    } catch (e) {
      log?.(`  market page @${start} failed (${e instanceof Error ? e.message : e}); backing off`);
      await sleep(4000);
      try {
        page = await fetchPage(appId, start, count);
      } catch {
        break; // give up paging; keep what we have
      }
    }
    if (page.items.length === 0) break;
    for (const it of page.items) {
      if (!it.hashName || seen.has(it.hashName)) continue;
      seen.add(it.hashName);
      out.push(it);
    }
    start += count;
    if (start >= page.total) break;
    await sleep(900);
  }
  return out.slice(0, maxItems);
}
