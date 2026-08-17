/**
 * Catalog content for EarnerSkins.
 *
 * Source of truth priority:
 *   1. Generated SIH snapshot (src/lib/generated/catalog.json) — real CS2/TF2/Rust
 *      stock, written by `npm run sih:sync`.
 *   2. The compact seed below — a coherent fallback so the storefront always
 *      renders on-theme content even before the first sync (or without network).
 *
 * Prices are in pence GBP (base currency).
 */

import generatedRaw from "./generated/catalog.json";

export type GameSlug = "cs2" | "tf2" | "rust";

export interface SeedGame {
  slug: GameSlug;
  name: string;
  tagline: string;
  accentColor: string;
  hasWear: boolean;
}

export interface SeedCategory {
  gameSlug: GameSlug;
  slug: string;
  name: string;
}

export interface SeedRarity {
  gameSlug: GameSlug;
  slug: string;
  name: string;
  tier: number; // normalized 1..8
  glow: string;
}

export interface SeedItem {
  slug: string;
  name: string;
  gameSlug: GameSlug;
  categorySlug: string;
  raritySlug: string;
  pricePence: number;
  oldPricePence?: number;
  wear?: string;
  floatValue?: number;
  pattern?: number;
  description: string;
  /** Real remote image (Steam CDN) when sourced from SIH; else generated SVG. */
  imageUrl?: string;
  /** SIH market_hash_name — the exact string used to place an order. */
  marketHashName?: string;
  /** Steam appId (730/440/252490) — needed when creating the SIH order. */
  appId?: number;
  isFeatured?: boolean;
  isNew?: boolean;
}

interface GeneratedCatalog {
  generatedAt: string | null;
  games: SeedGame[];
  categories: SeedCategory[];
  rarities: SeedRarity[];
  items: SeedItem[];
}

/* ============================================================ seed (fallback) */

const SEED_GAMES: SeedGame[] = [
  { slug: "cs2", name: "CS2", tagline: "Counter-Strike 2 finishes, knives & gloves", accentColor: "#E8A33D", hasWear: true },
  { slug: "tf2", name: "Team Fortress 2", tagline: "Unusuals, weapons, crates & keys", accentColor: "#B8703B", hasWear: false },
  { slug: "rust", name: "Rust", tagline: "Weapon skins, clothing & tools", accentColor: "#9C6B4A", hasWear: false },
];

const SEED_CATEGORIES: SeedCategory[] = [
  // CS2
  { gameSlug: "cs2", slug: "rifles", name: "Rifles" },
  { gameSlug: "cs2", slug: "pistols", name: "Pistols" },
  { gameSlug: "cs2", slug: "smgs", name: "SMGs" },
  { gameSlug: "cs2", slug: "heavy", name: "Heavy" },
  { gameSlug: "cs2", slug: "knives", name: "Knives" },
  { gameSlug: "cs2", slug: "gloves", name: "Gloves" },
  { gameSlug: "cs2", slug: "stickers", name: "Stickers" },
  { gameSlug: "cs2", slug: "other", name: "Other" },
  // TF2
  { gameSlug: "tf2", slug: "weapons", name: "Weapons" },
  { gameSlug: "tf2", slug: "cosmetics", name: "Cosmetics" },
  { gameSlug: "tf2", slug: "crates", name: "Crates & Cases" },
  { gameSlug: "tf2", slug: "tools", name: "Tools & Keys" },
  { gameSlug: "tf2", slug: "misc", name: "Misc" },
  // Rust
  { gameSlug: "rust", slug: "weapons", name: "Weapons" },
  { gameSlug: "rust", slug: "clothing", name: "Clothing" },
  { gameSlug: "rust", slug: "tools", name: "Tools" },
  { gameSlug: "rust", slug: "building", name: "Building" },
  { gameSlug: "rust", slug: "other", name: "Other" },
];

const SEED_RARITIES: SeedRarity[] = [
  // CS2 (Consumer -> Contraband)
  { gameSlug: "cs2", slug: "consumer", name: "Consumer", tier: 1, glow: "#B0C3D9" },
  { gameSlug: "cs2", slug: "industrial", name: "Industrial", tier: 2, glow: "#5E98D9" },
  { gameSlug: "cs2", slug: "milspec", name: "Mil-Spec", tier: 3, glow: "#4B69FF" },
  { gameSlug: "cs2", slug: "restricted", name: "Restricted", tier: 4, glow: "#8847FF" },
  { gameSlug: "cs2", slug: "classified", name: "Classified", tier: 5, glow: "#D32CE6" },
  { gameSlug: "cs2", slug: "covert", name: "Covert", tier: 6, glow: "#EB4B4B" },
  { gameSlug: "cs2", slug: "contraband", name: "Contraband", tier: 7, glow: "#E4AE39" },
  { gameSlug: "cs2", slug: "exceedingly-rare", name: "★ Rare Special", tier: 7, glow: "#FFD700" },
  // TF2 & Rust share the price-bucket ladder
  ...bucketLadder("tf2"),
  ...bucketLadder("rust"),
];

function bucketLadder(gameSlug: GameSlug): SeedRarity[] {
  return [
    { gameSlug, slug: "common", name: "Common", tier: 1, glow: "#B0C3D9" },
    { gameSlug, slug: "uncommon", name: "Uncommon", tier: 2, glow: "#5E98D9" },
    { gameSlug, slug: "rare", name: "Rare", tier: 3, glow: "#4B69FF" },
    { gameSlug, slug: "mythical", name: "Mythical", tier: 4, glow: "#8847FF" },
    { gameSlug, slug: "legendary", name: "Legendary", tier: 5, glow: "#D32CE6" },
    { gameSlug, slug: "ancient", name: "Ancient", tier: 6, glow: "#EB4B4B" },
  ];
}

const SEED_ITEMS: SeedItem[] = [
  // ---------------- CS2 ----------------
  {
    slug: "cs2-ak47-neon-rider", name: "AK-47 | Neon Rider", gameSlug: "cs2", categorySlug: "rifles",
    raritySlug: "covert", pricePence: 8990, oldPricePence: 10990, wear: "Factory New", floatValue: 0.03,
    pattern: 661, description: "A synthwave-drenched AK-47 finish with luminous neon linework across the receiver.", isFeatured: true,
  },
  {
    slug: "cs2-awp-gungnir", name: "AWP | Gungnir", gameSlug: "cs2", categorySlug: "rifles",
    raritySlug: "contraband", pricePence: 189000, wear: "Factory New", floatValue: 0.03, pattern: 88,
    description: "One of the rarest AWP finishes — cool blue hydrographic with a mythic edge.", isFeatured: true,
  },
  {
    slug: "cs2-karambit-doppler", name: "★ Karambit | Doppler", gameSlug: "cs2", categorySlug: "knives",
    raritySlug: "covert", pricePence: 132000, wear: "Factory New", floatValue: 0.03, pattern: 412,
    description: "Phase 2 Doppler Karambit with deep sapphire and magenta marbling.", isFeatured: true,
  },
  {
    slug: "cs2-sport-gloves-vice", name: "★ Sport Gloves | Vice", gameSlug: "cs2", categorySlug: "gloves",
    raritySlug: "classified", pricePence: 78000, wear: "Minimal Wear", floatValue: 0.11,
    description: "Miami-hued Sport Gloves in electric magenta and cyan.", isNew: true,
  },
  {
    slug: "cs2-usp-kill-confirmed", name: "USP-S | Kill Confirmed", gameSlug: "cs2", categorySlug: "pistols",
    raritySlug: "covert", pricePence: 6200, wear: "Field-Tested", floatValue: 0.25, pattern: 5,
    description: "Stark monochrome skull artwork on the silenced USP-S.",
  },
  {
    slug: "cs2-deagle-blaze", name: "Desert Eagle | Blaze", gameSlug: "cs2", categorySlug: "pistols",
    raritySlug: "restricted", pricePence: 5400, oldPricePence: 6900, wear: "Factory New", floatValue: 0.03,
    description: "Iconic flame finish licking up the Desert Eagle slide.",
  },
  {
    slug: "cs2-mac10-neon-rider", name: "MAC-10 | Neon Rider", gameSlug: "cs2", categorySlug: "smgs",
    raritySlug: "milspec", pricePence: 950, wear: "Field-Tested", floatValue: 0.25,
    description: "Budget-friendly synthwave MAC-10 with neon accents.", isNew: true,
  },
  {
    slug: "cs2-sticker-katowice-holo", name: "Sticker | Holo Crown (Katowice)", gameSlug: "cs2", categorySlug: "stickers",
    raritySlug: "classified", pricePence: 155000, description: "Legendary holographic crown sticker — a genuine collector grail.", isFeatured: true,
  },

  // ---------------- Team Fortress 2 ----------------
  {
    slug: "tf2-unusual-team-captain", name: "Unusual Team Captain", gameSlug: "tf2", categorySlug: "cosmetics",
    raritySlug: "ancient", pricePence: 210000, description: "The iconic officer's cap wreathed in a coveted Unusual particle effect.", isFeatured: true,
  },
  {
    slug: "tf2-mann-co-key", name: "Mann Co. Supply Crate Key", gameSlug: "tf2", categorySlug: "tools",
    raritySlug: "uncommon", pricePence: 180, description: "The trading backbone of TF2 — opens any Mann Co. crate.",
  },
  {
    slug: "tf2-strange-rocket-launcher", name: "Strange Rocket Launcher", gameSlug: "tf2", categorySlug: "weapons",
    raritySlug: "rare", pricePence: 640, description: "Counts every kill you rack up as Soldier, right on the weapon.", isNew: true,
  },
  {
    slug: "tf2-unusual-burning-flames", name: "Burning Flames Modest Pile of Hat", gameSlug: "tf2", categorySlug: "cosmetics",
    raritySlug: "ancient", pricePence: 540000, description: "One of the most sought-after effects in TF2 — pure burning prestige.", isFeatured: true,
  },
  {
    slug: "tf2-mann-co-crate", name: "Salvaged Mann Co. Supply Crate", gameSlug: "tf2", categorySlug: "crates",
    raritySlug: "rare", pricePence: 1200, description: "A rare salvaged crate holding a chance at limited-run cosmetics.",
  },
  {
    slug: "tf2-australium-scattergun", name: "Australium Scattergun", gameSlug: "tf2", categorySlug: "weapons",
    raritySlug: "legendary", pricePence: 9800, description: "Gleaming gold Scattergun for the Scout who has everything.", isNew: true,
  },

  // ---------------- Rust ----------------
  {
    slug: "rust-ak-tempered", name: "Tempered AK47", gameSlug: "rust", categorySlug: "weapons",
    raritySlug: "legendary", pricePence: 12500, description: "Molten-forged AK47 skin glowing with tempered heat lines.", isFeatured: true,
  },
  {
    slug: "rust-ak-alien-red", name: "Alien Red AK47", gameSlug: "rust", categorySlug: "weapons",
    raritySlug: "mythical", pricePence: 9800, oldPricePence: 12000, description: "Otherworldly crimson circuitry across the AK47 body.", isNew: true,
  },
  {
    slug: "rust-mp5-glory", name: "Glory MP5", gameSlug: "rust", categorySlug: "weapons",
    raritySlug: "mythical", pricePence: 4300, description: "Graffiti-splashed MP5 in bold street colours.",
  },
  {
    slug: "rust-metal-facemask-frost", name: "Frost Metal Facemask", gameSlug: "rust", categorySlug: "clothing",
    raritySlug: "rare", pricePence: 3100, description: "Ice-plated facemask with a frozen visor sheen.",
  },
  {
    slug: "rust-hoodie-neon", name: "Neon Circuit Hoodie", gameSlug: "rust", categorySlug: "clothing",
    raritySlug: "rare", pricePence: 1700, description: "Dark hoodie laced with glowing neon circuit traces.", isNew: true,
  },
  {
    slug: "rust-hatchet-blackout", name: "Blackout Hatchet", gameSlug: "rust", categorySlug: "tools",
    raritySlug: "uncommon", pricePence: 780, description: "Matte-black tactical hatchet with a stealth grip.",
  },
  {
    slug: "rust-garage-door-rock", name: "Rock Skin Garage Door", gameSlug: "rust", categorySlug: "building",
    raritySlug: "uncommon", pricePence: 950, description: "Camouflage your base with a convincing rock-face garage door.",
  },
];

export interface SeedBlogPost {
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  author: string;
  tag: string;
  readingMinutes: number;
}

export const BLOG_POSTS: SeedBlogPost[] = [
  {
    slug: "understanding-cs2-float-values",
    title: "Understanding CS2 Float Values and Wear",
    author: "The EarnerSkins Team",
    tag: "CS2",
    readingMinutes: 6,
    excerpt: "Float is the hidden number behind every CS2 finish. Here's how wear works and why two Factory New skins can look different.",
    body: `Every CS2 skin carries a float value — a number between 0 and 1 that determines how worn the finish appears. Lower floats mean cleaner, sharper artwork; higher floats introduce scratches and fading.\n\nThe five wear brackets are Factory New (0.00–0.07), Minimal Wear (0.07–0.15), Field-Tested (0.15–0.38), Well-Worn (0.38–0.45) and Battle-Scarred (0.45–1.00). But the bracket only tells part of the story. A Field-Tested skin at 0.16 can look dramatically better than one at 0.37, because different finishes wear in different places.\n\nPattern index matters too. Some finishes — Case Hardened blues, Fade percentages, Doppler phases — vary wildly by pattern seed, and certain seeds command large premiums. When you browse EarnerSkins, we surface the float and pattern in mono readouts on every eligible item so you always know exactly what you are buying.\n\nA practical tip: if you care about appearance over collection completeness, sort by float within a wear bracket rather than paying for the top bracket. You can often get a near-Factory-New look at a Field-Tested price. And because skins are delivered instantly, you can inspect your purchase in-game right away.\n\nFloat is permanent — it never changes once an item exists. That makes it one of the few objective quality signals in a market driven by taste, so it pays to understand it before you spend.`,
  },
  {
    slug: "tf2-unusual-effects-explained",
    title: "TF2 Unusual Effects: What Drives the Price",
    author: "The EarnerSkins Team",
    tag: "Team Fortress 2",
    readingMinutes: 5,
    excerpt: "Unusuals are the crown jewels of TF2 cosmetics. We break down what actually makes one hat worth a fortune.",
    body: `Team Fortress 2's Unusual cosmetics sit at the very top of the trading hierarchy. What separates a plain hat from an Unusual is the particle effect — an animated aura that plays constantly around the item — and the market treats those effects with wildly different reverence.\n\nThree things drive an Unusual's value. First, the effect itself: legacy effects like Burning Flames and Scorching Flames were only available from the earliest crates and command enormous premiums. Second, the hat it sits on — a clean, iconic cosmetic like the Team Captain pairs better with a big effect than an obscure misc. Third, effect-on-hat aesthetics: collectors pay for combinations that actually look good together in-game.\n\nBecause the supply of early effects is fixed and shrinks as items are deleted or lost, the top tier behaves like a collectibles market rather than a game-cosmetic one. Prices are set by a small pool of dedicated traders, and fair valuation takes genuine knowledge.\n\nOn EarnerSkins we surface a curated slice of the TF2 market so you can see where the value sits without wading through thousands of listings. Every item is delivered to your account instantly once you've linked your Steam trade URL, so you can equip and admire your new effect within minutes.`,
  },
  {
    slug: "rust-skins-explained",
    title: "Rust Skins Explained: Where the Value Lives",
    author: "The EarnerSkins Team",
    tag: "Rust",
    readingMinutes: 5,
    excerpt: "Rust cosmetics are purely visual, so what makes one AK skin worth ten times another? We dig in.",
    body: `Rust skins are strictly cosmetic — they never affect stats — yet prices range from a few pounds to hundreds. Understanding why helps you spend well.\n\nThe biggest driver is supply. Many desirable Rust skins were sold for a limited window through the item store and never returned. Once the store rotates on, the only supply is the secondary market, and scarcity does the rest. Weapon skins for the AK47 and MP5 attract the most demand simply because those weapons are used constantly.\n\nArtwork quality is the second factor. Skins with cohesive themes, custom worldmodels and clean finishes hold value far better than hastily made workshop entries. The Tempered and Alien Red AK families are good examples — strong art, consistent demand.\n\nA third, subtler factor is how a skin reads at a distance. Rust is a game of split-second raids and encounters, and skins that stay legible and intimidating in low light carry a social premium.\n\nBecause Rust items live in your Steam inventory, delivery is instant and applying a skin is as simple as spawning the item. When you browse Rust skins on EarnerSkins, we group by weapon and tier so you can see exactly where the value sits before you buy.`,
  },
  {
    slug: "how-instant-delivery-works",
    title: "How Instant Skin Delivery Works",
    author: "The EarnerSkins Team",
    tag: "Guides",
    readingMinutes: 4,
    excerpt: "Buy a skin, get it in your account moments later. Here's what happens behind the scenes.",
    body: `One of the first questions new customers ask is simple: how fast is instant? For digital game skins, the answer is genuinely near-immediate, and understanding the flow builds confidence.\n\nWhen you complete payment on EarnerSkins, your order is confirmed and the item is queued for delivery to the Steam account you linked at checkout. Because skins are digital inventory items, there is no shipping — delivery is a Steam trade, and trades complete in moments rather than days.\n\nYou'll receive an order-confirmation email with a PDF invoice attached for your records, and the item appears in your game inventory. From there you can inspect, equip or store it exactly as you would any other cosmetic.\n\nIf anything looks off, our support team is available around the clock. We keep a single, honest promise on delivery timing across the whole site — no asterisks, no shifting windows.\n\nInstant delivery is only possible because EarnerSkins sells directly. You are buying from the store, not waiting on a third party, which is what keeps the experience fast, predictable and secure.`,
  },
  {
    slug: "keeping-your-account-secure",
    title: "Keeping Your Steam Account Secure",
    author: "The EarnerSkins Team",
    tag: "Guides",
    readingMinutes: 5,
    excerpt: "A valuable skin inventory deserves protection. Simple habits that keep your account and purchases safe.",
    body: `As your skin collection grows in value, account security stops being optional. The good news is that a few straightforward habits protect the vast majority of inventories.\n\nStart with Steam Guard Mobile Authenticator. A mobile authenticator adds a second lock that a leaked password alone cannot open, and it's required for fast trades anyway. Pair it with a unique, long password stored in a password manager — reused passwords are the single most common way accounts are compromised.\n\nBe sceptical of anything that creates urgency. Messages claiming your account is 'about to be banned' or offering a too-good trade are designed to rush you into handing over credentials. Legitimate stores, EarnerSkins included, will never ask for your password — we only ever need your public Steam trade URL.\n\nCheck the address bar. Phishing sites imitate real storefronts down to the logo, but the domain gives them away. When you shop with us, confirm you're on the correct EarnerSkins domain before entering any details.\n\nFinally, keep your email secure, because it's the recovery key to everything else. Enable 2FA there too.\n\nThese habits cost minutes to set up and protect a collection you've invested real money and time into building.`,
  },
];

/* ==================================================== choose active source */

const generated = generatedRaw as unknown as GeneratedCatalog;
const hasGenerated = Array.isArray(generated.items) && generated.items.length > 0;

export const GAMES: SeedGame[] = hasGenerated ? generated.games : SEED_GAMES;
export const CATEGORIES: SeedCategory[] = hasGenerated ? generated.categories : SEED_CATEGORIES;
export const RARITIES: SeedRarity[] = hasGenerated ? generated.rarities : SEED_RARITIES;
export const ITEMS: SeedItem[] = hasGenerated ? generated.items : SEED_ITEMS;

/** True when the catalog is backed by a real SIH snapshot. */
export const CATALOG_IS_LIVE = hasGenerated;
