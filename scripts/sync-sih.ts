/**
 * SIH → catalog snapshot.
 *
 * Fetches live stock for CS2 / TF2 / Rust, normalizes each item into the
 * storefront's Seed* shapes (price in pence GBP, rarity, category, wear, image)
 * and writes src/lib/generated/catalog.json. The storefront prefers this file
 * over the built-in seed, so browsing stays fast & synchronous while the data
 * is real.
 *
 * Run: npm run sih:sync
 */

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";

/* ------- load .env.local before importing anything that reads env --------- */
function loadEnv(file: string) {
  let text: string;
  try {
    text = readFileSync(file, "utf8");
  } catch {
    return;
  }
  for (const line of text.split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (!m) continue;
    const key = m[1];
    let val = m[2].trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    if (process.env[key] === undefined) process.env[key] = val;
  }
}
const ROOT = process.cwd();
loadEnv(join(ROOT, ".env.local"));
loadEnv(join(ROOT, ".env"));

/* eslint-disable import/first */
import { sihConfig, APP_ID_TO_SLUG, type StoreGameSlug } from "@/lib/sih/config";
import { getItems } from "@/lib/sih/client";
import { fetchMarketCatalog } from "@/lib/steam-market";
import { priceItem } from "@/lib/sih/pricing";
import {
  resolveImage,
  normalizeColor,
  parseWear,
  wearFloat,
  slugify,
  resolveRarity,
  resolveCategory,
  categoryUniverse,
  rarityUniverse,
} from "@/lib/sih/parse";
import type { SeedGame, SeedCategory, SeedRarity, SeedItem } from "@/lib/catalog-data";

const GAME_META: Record<StoreGameSlug, Omit<SeedGame, "slug">> = {
  cs2: { name: "CS2", tagline: "Counter-Strike 2 finishes, knives & gloves", accentColor: "#E8A33D", hasWear: true },
  tf2: { name: "Team Fortress 2", tagline: "Unusuals, weapons, crates & keys", accentColor: "#B8703B", hasWear: false },
  rust: { name: "Rust", tagline: "Weapon skins, clothing & tools", accentColor: "#9C6B4A", hasWear: false },
};

/** How many items to surface per game (a price spread, not just the top end). */
const PER_GAME = 300;
const MIN_PRICE_USD = 0.4;
/** Below this, a game looks empty, so we top it up with curated display items. */
const MIN_VIABLE = 12;

/**
 * SIH ships economy art only for CS2 and barely stocks TF2. For TF2/Rust we
 * pull breadth + images from the Steam Community Market, then mark an item
 * purchasable when SIH actually has it in stock. `pull` caps how many market
 * listings we page through.
 */
const MARKET_SOURCE: Record<StoreGameSlug, { pull: number } | null> = {
  cs2: null,
  tf2: { pull: 700 },
  rust: { pull: 1600 },
};

interface Ranked {
  name: string;
  costUsd: number;
  color?: string;
  image?: string;
  /** True when SIH stocks this item, so checkout can place a live order. */
  purchasable: boolean;
}

/**
 * Display-only supplements for games the provider barely stocks (TF2 here).
 * These have no marketHashName, so checkout treats them as internal demo orders
 * rather than live SIH purchases.
 */
const SUPPLEMENTS: Partial<Record<StoreGameSlug, SeedItem[]>> = {
  tf2: [
    { slug: "tf2-unusual-team-captain", name: "Unusual Team Captain", gameSlug: "tf2", categorySlug: "cosmetics", raritySlug: "ancient", pricePence: 210000, description: "The iconic officer's cap wreathed in a coveted Unusual particle effect.", isFeatured: true },
    { slug: "tf2-unusual-burning-flames", name: "Burning Flames Modest Pile of Hat", gameSlug: "tf2", categorySlug: "cosmetics", raritySlug: "ancient", pricePence: 540000, description: "One of the most sought-after effects in TF2 — pure burning prestige.", isFeatured: true },
    { slug: "tf2-australium-scattergun", name: "Australium Scattergun", gameSlug: "tf2", categorySlug: "weapons", raritySlug: "legendary", pricePence: 9800, description: "Gleaming gold Scattergun for the Scout who has everything.", isNew: true },
    { slug: "tf2-strange-rocket-launcher", name: "Strange Rocket Launcher", gameSlug: "tf2", categorySlug: "weapons", raritySlug: "rare", pricePence: 640, description: "Counts every kill you rack up as Soldier, right on the weapon.", isNew: true },
    { slug: "tf2-strange-scattergun", name: "Strange Scattergun", gameSlug: "tf2", categorySlug: "weapons", raritySlug: "rare", pricePence: 520, description: "A kill-tracking Scattergun for the dedicated Scout main." },
    { slug: "tf2-salvaged-crate", name: "Salvaged Mann Co. Supply Crate", gameSlug: "tf2", categorySlug: "crates", raritySlug: "rare", pricePence: 1200, description: "A rare salvaged crate holding a chance at limited-run cosmetics." },
    { slug: "tf2-unusual-modest-pile", name: "Cloudy Moon Modest Pile of Hat", gameSlug: "tf2", categorySlug: "cosmetics", raritySlug: "mythical", pricePence: 42000, description: "A gentle Cloudy Moon effect drifting over the classic starter hat." },
    { slug: "tf2-taunt-conga", name: "Taunt: The Conga", gameSlug: "tf2", categorySlug: "misc", raritySlug: "uncommon", pricePence: 320, description: "The legendary all-class conga line taunt." },
    { slug: "tf2-name-tag", name: "Name Tag", gameSlug: "tf2", categorySlug: "tools", raritySlug: "common", pricePence: 60, description: "Rename any item in your inventory." },
    { slug: "tf2-professional-killstreak-kit", name: "Professional Killstreak Kit", gameSlug: "tf2", categorySlug: "tools", raritySlug: "rare", pricePence: 1500, description: "Add an animated killstreak sheen and eyes to your favourite weapon." },
  ],
};

/** Pick a spread: the priciest showpieces + an even sample across the rest. */
function curate(ranked: Ranked[]): Ranked[] {
  ranked.sort((a, b) => b.costUsd - a.costUsd);
  if (ranked.length <= PER_GAME) return ranked;
  const showCount = Math.min(80, Math.floor(PER_GAME / 3));
  const showpieces = ranked.slice(0, showCount);
  const rest = ranked.slice(showCount);
  const need = PER_GAME - showpieces.length;
  const stride = Math.max(1, Math.floor(rest.length / need));
  const sampled: Ranked[] = [];
  for (let i = 0; i < rest.length && sampled.length < need; i += stride) {
    sampled.push(rest[i]);
  }
  return [...showpieces, ...sampled];
}

async function main() {
  const cfg = sihConfig();
  if (!cfg.configured) {
    console.error("SIH_API_KEY is not set — aborting sync.");
    process.exit(1);
  }
  const pricing = { margin: cfg.margin, minMarginAbs: cfg.minMarginAbs };

  const games: SeedGame[] = [];
  const categories: SeedCategory[] = [];
  const rarities: SeedRarity[] = [];
  const items: SeedItem[] = [];

  for (const appId of cfg.appIds) {
    const game = APP_ID_TO_SLUG[appId];
    if (!game) continue;
    process.stdout.write(`Fetching ${game} (appId ${appId})… `);

    let raw: Awaited<ReturnType<typeof getItems>>;
    try {
      raw = await getItems(appId, true);
    } catch (e) {
      console.error(`\n  failed: ${e instanceof Error ? e.message : e}`);
      continue;
    }

    // SIH stock keyed by market hash name — the source of truth for what we can
    // actually place a live order against.
    const stock = new Map<string, { costUsd: number; color?: string; image?: string }>();
    for (const [name, item] of Object.entries(raw)) {
      const costUsd = item.sell ?? item.price;
      if (!Number.isFinite(costUsd) || costUsd < MIN_PRICE_USD) continue;
      if (costUsd > cfg.maxItemPriceUsd) continue;
      if (!item.count || item.count < 1) continue;
      stock.set(name, { costUsd, color: item.color, image: resolveImage(item.image) });
    }

    const market = MARKET_SOURCE[game];
    const ranked: Ranked[] = [];

    if (market) {
      // TF2 / Rust: Steam Market gives us breadth + art. An item is purchasable
      // only when SIH actually stocks it; otherwise it's display-only.
      let listings: Awaited<ReturnType<typeof fetchMarketCatalog>> = [];
      try {
        listings = await fetchMarketCatalog(appId, { maxItems: market.pull, log: (m) => console.log(m) });
      } catch (e) {
        console.error(`\n  market fetch failed: ${e instanceof Error ? e.message : e}`);
      }
      for (const m of listings) {
        if (!m.image) continue; // no art → skip; the whole point here is images
        const sih = stock.get(m.hashName);
        const costUsd = sih?.costUsd ?? m.priceUsd;
        if (!Number.isFinite(costUsd) || (costUsd as number) < MIN_PRICE_USD) continue;
        if ((costUsd as number) > cfg.maxItemPriceUsd) continue;
        ranked.push({
          name: m.hashName,
          costUsd: costUsd as number,
          color: sih?.color,
          image: m.image,
          purchasable: !!sih,
        });
      }
      console.log(
        `${listings.length} market listings → ${ranked.length} with art (${
          ranked.filter((r) => r.purchasable).length
        } live)`,
      );
    } else {
      // CS2: SIH ships economy art and stock, so everything here is purchasable.
      for (const [name, s] of stock) {
        if (!s.image) continue;
        ranked.push({ name, costUsd: s.costUsd, color: s.color, image: s.image, purchasable: true });
      }
      console.log(`${Object.keys(raw).length} listed → ${ranked.length} in stock with art`);
    }

    const picked = curate(ranked);
    console.log(`  curated ${picked.length}`);

    games.push({ slug: game, ...GAME_META[game] });
    const usedCategories = new Set<string>();
    const usedRarities = new Set<string>();
    const usedSlugs = new Set<string>();

    const registerCategory = (slug: string, name: string) => {
      if (usedCategories.has(slug)) return;
      usedCategories.add(slug);
      categories.push({ gameSlug: game, slug, name });
    };
    const registerRarity = (rar: { slug: string; name: string; tier: number; glow: string }) => {
      if (usedRarities.has(rar.slug)) return;
      usedRarities.add(rar.slug);
      rarities.push({ gameSlug: game, ...rar });
    };

    picked.forEach((r, idx) => {
      const wear = GAME_META[game].hasWear ? parseWear(r.name) : undefined;
      const cat = resolveCategory(game, r.name);
      const rar = resolveRarity(game, normalizeColor(r.color), r.costUsd);
      const priced = priceItem(r.costUsd, undefined, pricing);
      // Surface a deterministic slice as deals so the /deals view is populated.
      const oldPricePence =
        priced.oldPricePence ??
        (idx % 9 === 4 ? Math.round(priced.pricePence * 1.18) : undefined);

      let slug = `${game}-${slugify(r.name)}`;
      if (usedSlugs.has(slug)) slug = `${slug}-${idx}`;
      usedSlugs.add(slug);

      registerCategory(cat.slug, cat.name);
      registerRarity(rar);

      items.push({
        slug,
        name: r.name,
        gameSlug: game,
        categorySlug: cat.slug,
        raritySlug: rar.slug,
        pricePence: priced.pricePence,
        oldPricePence,
        wear,
        floatValue: wearFloat(wear),
        imageUrl: r.image,
        marketHashName: r.purchasable ? r.name : undefined,
        appId: r.purchasable ? appId : undefined,
        isFeatured: idx < 3,
        isNew: idx >= 8 && idx < 12,
        description: buildDescription(r.name, GAME_META[game].name, cat.name, rar.name),
      });
    });

    // Top up thinly-stocked games with curated display items so the section
    // never looks broken. These have no marketHashName (non-live).
    if (picked.length < MIN_VIABLE && SUPPLEMENTS[game]) {
      const catNames = new Map(categoryUniverse(game).map((c) => [c.slug, c.name]));
      const rarDefs = new Map(rarityUniverse(game).map((r) => [r.slug, r]));
      for (const s of SUPPLEMENTS[game]!) {
        if (usedSlugs.has(s.slug)) continue;
        usedSlugs.add(s.slug);
        registerCategory(s.categorySlug, catNames.get(s.categorySlug) ?? s.categorySlug);
        const rd = rarDefs.get(s.raritySlug);
        if (rd) registerRarity(rd);
        items.push(s);
      }
    }
  }

  const out = {
    generatedAt: new Date().toISOString(),
    games,
    categories,
    rarities,
    items,
  };

  const dest = join(ROOT, "src/lib/generated/catalog.json");
  mkdirSync(dirname(dest), { recursive: true });
  writeFileSync(dest, JSON.stringify(out, null, 2) + "\n", "utf8");
  console.log(
    `\nWrote ${items.length} items across ${games.length} games → ${dest}`,
  );
}

function buildDescription(
  name: string,
  gameName: string,
  category: string,
  rarity: string,
): string {
  const base = name.replace(/\s*\([^()]*\)\s*$/, "");
  return `${base} — a ${rarity} ${gameName} ${category.toLowerCase()} item, delivered instantly to your linked Steam account.`;
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
