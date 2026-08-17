import {
  GAMES,
  CATEGORIES,
  RARITIES,
  ITEMS,
  BLOG_POSTS,
  type GameSlug,
} from "./catalog-data";
import { itemImage, categoryImage, blogCover } from "./art";

/** Fully-joined item shape consumed by UI components. */
export interface CatalogItem {
  id: string;
  slug: string;
  name: string;
  gameSlug: GameSlug;
  gameName: string;
  gameAccent: string;
  categorySlug: string;
  categoryName: string;
  raritySlug: string;
  rarityName: string;
  rarityTier: number;
  rarityGlow: string;
  pricePence: number;
  oldPricePence: number | null;
  wear: string | null;
  floatValue: number | null;
  pattern: number | null;
  imageUrl: string;
  description: string;
  isFeatured: boolean;
  isNew: boolean;
  hasWear: boolean;
  /** SIH market_hash_name — exact string used to place an order (live catalog). */
  marketHashName: string | null;
  /** Steam appId (730/440/252490) for the order (live catalog). */
  appId: number | null;
}

export interface CatalogGame {
  slug: GameSlug;
  name: string;
  tagline: string;
  accentColor: string;
  hasWear: boolean;
  categories: { slug: string; name: string; imageUrl: string }[];
  rarities: { slug: string; name: string; tier: number; glow: string }[];
}

function buildItems(): CatalogItem[] {
  return ITEMS.map((i, idx) => {
    const game = GAMES.find((g) => g.slug === i.gameSlug)!;
    const cat = CATEGORIES.find((c) => c.gameSlug === i.gameSlug && c.slug === i.categorySlug)!;
    const rar = RARITIES.find((r) => r.gameSlug === i.gameSlug && r.slug === i.raritySlug)!;
    return {
      id: `itm_${idx}_${i.slug}`,
      slug: i.slug,
      name: i.name,
      gameSlug: i.gameSlug,
      gameName: game.name,
      gameAccent: game.accentColor,
      categorySlug: cat.slug,
      categoryName: cat.name,
      raritySlug: rar.slug,
      rarityName: rar.name,
      rarityTier: rar.tier,
      rarityGlow: rar.glow,
      pricePence: i.pricePence,
      oldPricePence: i.oldPricePence ?? null,
      wear: i.wear ?? null,
      floatValue: i.floatValue ?? null,
      pattern: i.pattern ?? null,
      imageUrl: i.imageUrl ?? itemImage(i.slug),
      description: i.description,
      isFeatured: i.isFeatured ?? false,
      isNew: i.isNew ?? false,
      hasWear: game.hasWear,
      marketHashName: i.marketHashName ?? null,
      appId: i.appId ?? null,
    };
  });
}

const ALL_ITEMS = buildItems();

export function getGames(): CatalogGame[] {
  return GAMES.map((g) => ({
    slug: g.slug,
    name: g.name,
    tagline: g.tagline,
    accentColor: g.accentColor,
    hasWear: g.hasWear,
    categories: CATEGORIES.filter((c) => c.gameSlug === g.slug).map((c) => ({
      slug: c.slug,
      name: c.name,
      imageUrl: categoryImage(c.gameSlug, c.slug),
    })),
    rarities: RARITIES.filter((r) => r.gameSlug === g.slug)
      .map((r) => ({ slug: r.slug, name: r.name, tier: r.tier, glow: r.glow }))
      .sort((a, b) => a.tier - b.tier),
  }));
}

export function getGame(slug: string): CatalogGame | undefined {
  return getGames().find((g) => g.slug === slug);
}

export function getAllItems(): CatalogItem[] {
  return ALL_ITEMS;
}

/** Real catalog totals for the homepage stats band (no mock numbers). */
export function getCatalogStats() {
  return {
    items: ITEMS.length,
    games: GAMES.length,
    categories: CATEGORIES.length,
    rarities: RARITIES.length,
  };
}

export function getItemBySlug(slug: string): CatalogItem | undefined {
  return ALL_ITEMS.find((i) => i.slug === slug);
}

export function getFeaturedItems(): CatalogItem[] {
  return ALL_ITEMS.filter((i) => i.isFeatured);
}

export function getNewItems(): CatalogItem[] {
  return ALL_ITEMS.filter((i) => i.isNew);
}

export function getDeals(): CatalogItem[] {
  return ALL_ITEMS.filter((i) => i.oldPricePence && i.oldPricePence > i.pricePence);
}

export function getHighTierVault(limit = 6): CatalogItem[] {
  return [...ALL_ITEMS].sort((a, b) => b.pricePence - a.pricePence).slice(0, limit);
}

export function getItemsByGame(slug: string): CatalogItem[] {
  return ALL_ITEMS.filter((i) => i.gameSlug === slug);
}

export function getSimilarItems(item: CatalogItem, limit = 4): CatalogItem[] {
  return ALL_ITEMS.filter(
    (i) => i.slug !== item.slug && i.gameSlug === item.gameSlug,
  ).slice(0, limit);
}

export interface CatalogFilters {
  game?: string;
  category?: string;
  rarity?: string;
  minPence?: number;
  maxPence?: number;
  wear?: string;
  sort?: string;
  q?: string;
}

export function filterItems(f: CatalogFilters): CatalogItem[] {
  let out = [...ALL_ITEMS];
  if (f.game) out = out.filter((i) => i.gameSlug === f.game);
  if (f.category) out = out.filter((i) => i.categorySlug === f.category);
  if (f.rarity) out = out.filter((i) => i.raritySlug === f.rarity);
  if (f.wear) out = out.filter((i) => i.wear === f.wear);
  if (f.minPence != null) out = out.filter((i) => i.pricePence >= f.minPence!);
  if (f.maxPence != null) out = out.filter((i) => i.pricePence <= f.maxPence!);
  if (f.q) {
    const q = f.q.toLowerCase();
    out = out.filter(
      (i) =>
        i.name.toLowerCase().includes(q) ||
        i.gameName.toLowerCase().includes(q) ||
        i.categoryName.toLowerCase().includes(q),
    );
  }
  switch (f.sort) {
    case "price-asc":
      out.sort((a, b) => a.pricePence - b.pricePence);
      break;
    case "price-desc":
      out.sort((a, b) => b.pricePence - a.pricePence);
      break;
    case "rarity":
      out.sort((a, b) => b.rarityTier - a.rarityTier);
      break;
    case "name":
      out.sort((a, b) => a.name.localeCompare(b.name));
      break;
    default:
      out.sort((a, b) => Number(b.isFeatured) - Number(a.isFeatured));
  }
  return out;
}

export function searchItems(q: string, limit = 6): CatalogItem[] {
  if (!q.trim()) return [];
  const query = q.toLowerCase();
  return ALL_ITEMS.filter(
    (i) =>
      i.name.toLowerCase().includes(query) ||
      i.gameName.toLowerCase().includes(query) ||
      i.categoryName.toLowerCase().includes(query),
  ).slice(0, limit);
}

export function getBlogPosts() {
  return BLOG_POSTS.map((p) => ({ ...p, coverImage: blogCover(p.slug) }));
}

export function getBlogPost(slug: string) {
  const p = BLOG_POSTS.find((b) => b.slug === slug);
  return p ? { ...p, coverImage: blogCover(p.slug) } : undefined;
}
