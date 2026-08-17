/**
 * Turns raw SIH market_hash_name + color into the normalized catalog fields
 * (slug, wear, category, rarity) that the storefront renders.
 *
 * SIH gives us a display color per item; for CS2 that maps cleanly to the
 * canonical rarity ladder, so we use it directly. For TF2/Rust the color is
 * less meaningful, so we fall back to a price-bucket ladder.
 */

import type { StoreGameSlug } from "./config";

/* ---------------------------------------------------------------- images */

const STEAM_ECONOMY_IMAGE =
  "https://community.cloudflare.steamstatic.com/economy/image/";

/** SIH `image` is either a full URL or a bare Steam economy hash. */
export function resolveImage(raw: string | undefined): string | undefined {
  if (!raw) return undefined;
  if (raw.startsWith("http://") || raw.startsWith("https://")) return raw;
  return `${STEAM_ECONOMY_IMAGE}${raw}/360fx360f`;
}

export function normalizeColor(raw: string | undefined): string | undefined {
  if (!raw) return undefined;
  const hex = raw.replace(/^#/, "").trim().toLowerCase();
  return /^[0-9a-f]{6}$/.test(hex) ? hex : undefined;
}

/* ------------------------------------------------------------------ wear */

const WEARS = [
  "Factory New",
  "Minimal Wear",
  "Field-Tested",
  "Well-Worn",
  "Battle-Scarred",
] as const;

export function parseWear(name: string): string | undefined {
  const m = name.match(/\(([^()]+)\)\s*$/);
  if (!m) return undefined;
  const inside = m[1].trim();
  return (WEARS as readonly string[]).includes(inside) ? inside : undefined;
}

const WEAR_FLOAT: Record<string, number> = {
  "Factory New": 0.03,
  "Minimal Wear": 0.11,
  "Field-Tested": 0.25,
  "Well-Worn": 0.41,
  "Battle-Scarred": 0.6,
};

export function wearFloat(wear: string | undefined): number | undefined {
  return wear ? WEAR_FLOAT[wear] : undefined;
}

/* ------------------------------------------------------------------ slug */

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/★/g, "star")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 120);
}

/* -------------------------------------------------------------- rarities */

export interface RarityDef {
  slug: string;
  name: string;
  tier: number;
  glow: string;
}

/** Canonical CS2 rarity ladder keyed by the Steam display color. */
const CS2_COLOR_RARITY: Record<string, RarityDef> = {
  b0c3d9: { slug: "consumer", name: "Consumer", tier: 1, glow: "#B0C3D9" },
  "5e98d9": { slug: "industrial", name: "Industrial", tier: 2, glow: "#5E98D9" },
  "4b69ff": { slug: "milspec", name: "Mil-Spec", tier: 3, glow: "#4B69FF" },
  "8847ff": { slug: "restricted", name: "Restricted", tier: 4, glow: "#8847FF" },
  d32ce6: { slug: "classified", name: "Classified", tier: 5, glow: "#D32CE6" },
  eb4b4b: { slug: "covert", name: "Covert", tier: 6, glow: "#EB4B4B" },
  e4ae39: { slug: "contraband", name: "Contraband", tier: 7, glow: "#E4AE39" },
  ffd700: { slug: "exceedingly-rare", name: "★ Rare Special", tier: 7, glow: "#FFD700" },
};

/** Generic 6-tier price ladder used for TF2 & Rust (USD thresholds). */
const BUCKET_RARITIES: RarityDef[] = [
  { slug: "common", name: "Common", tier: 1, glow: "#B0C3D9" },
  { slug: "uncommon", name: "Uncommon", tier: 2, glow: "#5E98D9" },
  { slug: "rare", name: "Rare", tier: 3, glow: "#4B69FF" },
  { slug: "mythical", name: "Mythical", tier: 4, glow: "#8847FF" },
  { slug: "legendary", name: "Legendary", tier: 5, glow: "#D32CE6" },
  { slug: "ancient", name: "Ancient", tier: 6, glow: "#EB4B4B" },
];

function bucketRarity(costUsd: number): RarityDef {
  if (costUsd < 1) return BUCKET_RARITIES[0];
  if (costUsd < 4) return BUCKET_RARITIES[1];
  if (costUsd < 12) return BUCKET_RARITIES[2];
  if (costUsd < 40) return BUCKET_RARITIES[3];
  if (costUsd < 150) return BUCKET_RARITIES[4];
  return BUCKET_RARITIES[5];
}

export function resolveRarity(
  game: StoreGameSlug,
  color: string | undefined,
  costUsd: number,
): RarityDef {
  if (game === "cs2" && color && CS2_COLOR_RARITY[color]) {
    return CS2_COLOR_RARITY[color];
  }
  return bucketRarity(costUsd);
}

/** All rarity defs a given game may emit — used to build the RARITIES table. */
export function rarityUniverse(game: StoreGameSlug): RarityDef[] {
  if (game === "cs2") return Object.values(CS2_COLOR_RARITY);
  return BUCKET_RARITIES;
}

/* ------------------------------------------------------------ categories */

export interface CategoryDef {
  slug: string;
  name: string;
}

const CS2_PISTOLS = [
  "USP-S", "Glock-18", "P250", "Five-SeveN", "Tec-9", "CZ75-Auto",
  "Desert Eagle", "Dual Berettas", "R8 Revolver", "P2000",
];
const CS2_RIFLES = [
  "AK-47", "M4A4", "M4A1-S", "AUG", "SG 553", "FAMAS", "Galil AR",
  "AWP", "SSG 08", "SCAR-20", "G3SG1",
];
const CS2_SMGS = ["MP9", "MAC-10", "MP7", "MP5-SD", "UMP-45", "P90", "PP-Bizon"];
const CS2_HEAVY = ["Nova", "XM1014", "Sawed-Off", "MAG-7", "M249", "Negev"];

const CS2_CATEGORIES: Record<string, string> = {
  rifles: "Rifles",
  pistols: "Pistols",
  smgs: "SMGs",
  heavy: "Heavy",
  knives: "Knives",
  gloves: "Gloves",
  stickers: "Stickers",
  other: "Other",
};

function cs2Category(name: string): CategoryDef {
  const weapon = name.split(" | ")[0].replace(/^★\s*/, "").trim();
  if (/Gloves|Hand Wraps/i.test(name)) return { slug: "gloves", name: "Gloves" };
  if (name.startsWith("★")) return { slug: "knives", name: "Knives" };
  if (name.startsWith("Sticker")) return { slug: "stickers", name: "Stickers" };
  if (CS2_RIFLES.includes(weapon)) return { slug: "rifles", name: "Rifles" };
  if (CS2_PISTOLS.includes(weapon)) return { slug: "pistols", name: "Pistols" };
  if (CS2_SMGS.includes(weapon)) return { slug: "smgs", name: "SMGs" };
  if (CS2_HEAVY.includes(weapon)) return { slug: "heavy", name: "Heavy" };
  return { slug: "other", name: "Other" };
}

const TF2_CATEGORIES: Record<string, string> = {
  weapons: "Weapons",
  cosmetics: "Cosmetics",
  crates: "Crates & Cases",
  tools: "Tools & Keys",
  misc: "Misc",
};

function tf2Category(name: string): CategoryDef {
  if (/\b(Key|Name Tag|Description Tag|Tool|Paint Can|Gift)\b/i.test(name))
    return { slug: "tools", name: "Tools & Keys" };
  if (/\b(Crate|Case|Cooler|Munition)\b/i.test(name))
    return { slug: "crates", name: "Crates & Cases" };
  if (/\b(Rocket Launcher|Scattergun|Sniper Rifle|Minigun|Flame Thrower|Knife|Wrench|Medi Gun|Revolver|Pistol|Shotgun|Sticky|Grenade Launcher|Bat|Bottle|Kukri|Sword)\b/i.test(name))
    return { slug: "weapons", name: "Weapons" };
  if (/\b(Hat|Helm|Hood|Mask|Cap|Beanie|Badge|Medal|Cosmetic|Hair|Beard|Glasses|Goggles)\b/i.test(name))
    return { slug: "cosmetics", name: "Cosmetics" };
  return { slug: "misc", name: "Misc" };
}

const RUST_CATEGORIES: Record<string, string> = {
  weapons: "Weapons",
  clothing: "Clothing",
  tools: "Tools",
  building: "Building",
  other: "Other",
};

function rustCategory(name: string): CategoryDef {
  if (/\b(AK47|AK-47|Rifle|Bolt|SMG|Pistol|Revolver|Shotgun|Thompson|LR300|M39|M92|Nailgun|Crossbow|Bow)\b/i.test(name))
    return { slug: "weapons", name: "Weapons" };
  if (/\b(Hoodie|Pants|Jacket|Mask|Facemask|Kilt|Boots|Gloves|Shirt|Vest|Cap|Hat|Poncho|Hazmat|Coat|Roadsign)\b/i.test(name))
    return { slug: "clothing", name: "Clothing" };
  if (/\b(Hatchet|Pickaxe|Pick|Rock|Torch|Hammer|Salvaged|Jackhammer|Chainsaw|Tool)\b/i.test(name))
    return { slug: "tools", name: "Tools" };
  if (/\b(Door|Box|Storage|Sleeping Bag|Barrel|Fridge|Furnace|Table|Wall|Vending|Garage)\b/i.test(name))
    return { slug: "building", name: "Building" };
  return { slug: "other", name: "Other" };
}

export function resolveCategory(game: StoreGameSlug, name: string): CategoryDef {
  if (game === "cs2") return cs2Category(name);
  if (game === "tf2") return tf2Category(name);
  return rustCategory(name);
}

export function categoryUniverse(game: StoreGameSlug): CategoryDef[] {
  const map =
    game === "cs2" ? CS2_CATEGORIES : game === "tf2" ? TF2_CATEGORIES : RUST_CATEGORIES;
  return Object.entries(map).map(([slug, name]) => ({ slug, name }));
}
