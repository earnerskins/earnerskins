import {
  pgTable,
  text,
  varchar,
  integer,
  boolean,
  timestamp,
  numeric,
  jsonb,
  index,
  uniqueIndex,
  pgEnum,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createId } from "@/lib/id";

/* ----------------------------------------------------------------------------
 * Enums
 * ------------------------------------------------------------------------- */
export const gameSlugEnum = pgEnum("game_slug", ["cs2", "tf2", "rust"]);
export const orderStatusEnum = pgEnum("order_status", [
  "pending",
  "paid",
  "delivered",
  "refunded",
  "cancelled",
]);
export const txnTypeEnum = pgEnum("txn_type", ["topup", "purchase", "refund"]);

/* ----------------------------------------------------------------------------
 * Users & addresses
 * ------------------------------------------------------------------------- */
export const users = pgTable(
  "users",
  {
    id: varchar("id", { length: 24 }).primaryKey().$defaultFn(createId),
    email: varchar("email", { length: 255 }).notNull(),
    passwordHash: text("password_hash").notNull(),
    firstName: varchar("first_name", { length: 120 }).notNull(),
    lastName: varchar("last_name", { length: 120 }).notNull(),
    phone: varchar("phone", { length: 40 }).notNull(),
    dateOfBirth: varchar("date_of_birth", { length: 10 }).notNull(), // YYYY-MM-DD
    // Address split into 4 separate fields (client requirement)
    street: varchar("street", { length: 255 }).notNull(),
    city: varchar("city", { length: 120 }).notNull(),
    country: varchar("country", { length: 120 }).notNull(),
    postalCode: varchar("postal_code", { length: 40 }).notNull(),
    // Balance stored in minor units of GBP (pence) — base currency.
    balancePence: integer("balance_pence").notNull().default(0),
    agreedToTerms: boolean("agreed_to_terms").notNull().default(false),
    emailVerified: boolean("email_verified").notNull().default(false),
    // Linked Steam account — required to receive skins (avatar/nickname pulled
    // from the Steam Web API; steamId + tradeToken are what SIH delivers to).
    steamId: varchar("steam_id", { length: 20 }),
    steamTradeToken: varchar("steam_trade_token", { length: 20 }),
    steamPersonaName: varchar("steam_persona_name", { length: 120 }),
    steamAvatarUrl: text("steam_avatar_url"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => ({
    emailIdx: uniqueIndex("users_email_idx").on(t.email),
  }),
);

/* ----------------------------------------------------------------------------
 * Password reset & email verification tokens
 * ------------------------------------------------------------------------- */
export const tokens = pgTable(
  "tokens",
  {
    id: varchar("id", { length: 24 }).primaryKey().$defaultFn(createId),
    userId: varchar("user_id", { length: 24 })
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    token: varchar("token", { length: 64 }).notNull(),
    purpose: varchar("purpose", { length: 32 }).notNull(), // 'reset' | 'verify'
    expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
    usedAt: timestamp("used_at", { withTimezone: true }),
  },
  (t) => ({
    tokenIdx: index("tokens_token_idx").on(t.token),
  }),
);

/* ----------------------------------------------------------------------------
 * Games, categories, rarities
 * ------------------------------------------------------------------------- */
export const games = pgTable("games", {
  slug: gameSlugEnum("slug").primaryKey(),
  name: varchar("name", { length: 60 }).notNull(),
  tagline: varchar("tagline", { length: 160 }).notNull(),
  accentColor: varchar("accent_color", { length: 9 }).notNull(),
  hasWear: boolean("has_wear").notNull().default(false),
});

export const categories = pgTable(
  "categories",
  {
    id: varchar("id", { length: 24 }).primaryKey().$defaultFn(createId),
    gameSlug: gameSlugEnum("game_slug").notNull().references(() => games.slug),
    slug: varchar("slug", { length: 60 }).notNull(),
    name: varchar("name", { length: 80 }).notNull(),
    imageUrl: text("image_url").notNull(),
  },
  (t) => ({
    gameCatIdx: uniqueIndex("categories_game_slug_idx").on(t.gameSlug, t.slug),
  }),
);

export const rarities = pgTable(
  "rarities",
  {
    id: varchar("id", { length: 24 }).primaryKey().$defaultFn(createId),
    gameSlug: gameSlugEnum("game_slug").notNull().references(() => games.slug),
    slug: varchar("slug", { length: 60 }).notNull(),
    name: varchar("name", { length: 80 }).notNull(),
    // Normalized 1..8 tier so cross-game rarity feels coherent.
    tier: integer("tier").notNull(),
    glow: varchar("glow", { length: 9 }).notNull(), // hex used for the light glow
  },
  (t) => ({
    gameRarIdx: uniqueIndex("rarities_game_slug_idx").on(t.gameSlug, t.slug),
  }),
);

/* ----------------------------------------------------------------------------
 * Items (the skins EarnerSkins sells)
 * ------------------------------------------------------------------------- */
export const items = pgTable(
  "items",
  {
    id: varchar("id", { length: 24 }).primaryKey().$defaultFn(createId),
    slug: varchar("slug", { length: 140 }).notNull(),
    name: varchar("name", { length: 160 }).notNull(),
    gameSlug: gameSlugEnum("game_slug").notNull().references(() => games.slug),
    categoryId: varchar("category_id", { length: 24 }).notNull().references(() => categories.id),
    rarityId: varchar("rarity_id", { length: 24 }).notNull().references(() => rarities.id),
    // Price in pence GBP (base currency).
    pricePence: integer("price_pence").notNull(),
    oldPricePence: integer("old_price_pence"),
    // Wear / float where the game supports it.
    wear: varchar("wear", { length: 40 }), // e.g. "Factory New"
    floatValue: numeric("float_value", { precision: 8, scale: 6 }),
    pattern: integer("pattern"),
    imageUrl: text("image_url").notNull(),
    description: text("description").notNull(),
    isFeatured: boolean("is_featured").notNull().default(false),
    isNew: boolean("is_new").notNull().default(false),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => ({
    slugIdx: uniqueIndex("items_slug_idx").on(t.slug),
    gameIdx: index("items_game_idx").on(t.gameSlug),
    categoryIdx: index("items_category_idx").on(t.categoryId),
    rarityIdx: index("items_rarity_idx").on(t.rarityId),
    priceIdx: index("items_price_idx").on(t.pricePence),
  }),
);

/* ----------------------------------------------------------------------------
 * Orders, order items, transactions
 * ------------------------------------------------------------------------- */
export const orders = pgTable(
  "orders",
  {
    id: varchar("id", { length: 24 }).primaryKey().$defaultFn(createId),
    orderNumber: varchar("order_number", { length: 20 }).notNull(),
    userId: varchar("user_id", { length: 24 }).references(() => users.id),
    email: varchar("email", { length: 255 }).notNull(),
    status: orderStatusEnum("status").notNull().default("pending"),
    subtotalPence: integer("subtotal_pence").notNull(),
    serviceFeePence: integer("service_fee_pence").notNull().default(0),
    totalPence: integer("total_pence").notNull(),
    currency: varchar("currency", { length: 3 }).notNull().default("GBP"),
    // Steam account the order was delivered to (when linked at checkout).
    steamId: varchar("steam_id", { length: 20 }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => ({
    orderNumIdx: uniqueIndex("orders_order_number_idx").on(t.orderNumber),
    userIdx: index("orders_user_idx").on(t.userId),
  }),
);

export const orderItems = pgTable("order_items", {
  id: varchar("id", { length: 24 }).primaryKey().$defaultFn(createId),
  orderId: varchar("order_id", { length: 24 })
    .notNull()
    .references(() => orders.id, { onDelete: "cascade" }),
  itemId: varchar("item_id", { length: 24 }).references(() => items.id),
  name: varchar("name", { length: 160 }).notNull(),
  gameSlug: gameSlugEnum("game_slug").notNull(),
  wear: varchar("wear", { length: 40 }),
  pricePence: integer("price_pence").notNull(),
  quantity: integer("quantity").notNull().default(1),
  // SIH fulfilment linkage (per line). Null for internal/demo items.
  marketHashName: varchar("market_hash_name", { length: 200 }),
  appId: integer("app_id"),
  sihOrderId: integer("sih_order_id"),
  sihStatus: varchar("sih_status", { length: 20 }),
});

export const transactions = pgTable(
  "transactions",
  {
    id: varchar("id", { length: 24 }).primaryKey().$defaultFn(createId),
    userId: varchar("user_id", { length: 24 })
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: txnTypeEnum("type").notNull(),
    amountPence: integer("amount_pence").notNull(), // + for topup/refund, - for purchase
    description: varchar("description", { length: 200 }).notNull(),
    orderId: varchar("order_id", { length: 24 }).references(() => orders.id),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => ({
    userIdx: index("transactions_user_idx").on(t.userId),
  }),
);

/* ----------------------------------------------------------------------------
 * Wishlist
 * ------------------------------------------------------------------------- */
export const wishlist = pgTable(
  "wishlist",
  {
    id: varchar("id", { length: 24 }).primaryKey().$defaultFn(createId),
    userId: varchar("user_id", { length: 24 })
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    itemId: varchar("item_id", { length: 24 })
      .notNull()
      .references(() => items.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => ({
    uniq: uniqueIndex("wishlist_user_item_idx").on(t.userId, t.itemId),
  }),
);

/* ----------------------------------------------------------------------------
 * Blog & reviews
 * ------------------------------------------------------------------------- */
export const blogPosts = pgTable(
  "blog_posts",
  {
    id: varchar("id", { length: 24 }).primaryKey().$defaultFn(createId),
    slug: varchar("slug", { length: 160 }).notNull(),
    title: varchar("title", { length: 200 }).notNull(),
    excerpt: text("excerpt").notNull(),
    body: text("body").notNull(),
    coverImage: text("cover_image").notNull(),
    author: varchar("author", { length: 120 }).notNull(),
    tag: varchar("tag", { length: 60 }).notNull(),
    readingMinutes: integer("reading_minutes").notNull(),
    publishedAt: timestamp("published_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => ({
    slugIdx: uniqueIndex("blog_slug_idx").on(t.slug),
  }),
);

export const reviews = pgTable("reviews", {
  id: varchar("id", { length: 24 }).primaryKey().$defaultFn(createId),
  authorName: varchar("author_name", { length: 120 }).notNull(),
  avatarUrl: text("avatar_url").notNull(),
  gameSlug: gameSlugEnum("game_slug").notNull(),
  rating: integer("rating").notNull(),
  body: text("body").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

/* ----------------------------------------------------------------------------
 * Relations
 * ------------------------------------------------------------------------- */
export const itemsRelations = relations(items, ({ one }) => ({
  game: one(games, { fields: [items.gameSlug], references: [games.slug] }),
  category: one(categories, { fields: [items.categoryId], references: [categories.id] }),
  rarity: one(rarities, { fields: [items.rarityId], references: [rarities.id] }),
}));

export const ordersRelations = relations(orders, ({ many, one }) => ({
  items: many(orderItems),
  user: one(users, { fields: [orders.userId], references: [users.id] }),
}));

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, { fields: [orderItems.orderId], references: [orders.id] }),
}));

export type User = typeof users.$inferSelect;
export type Item = typeof items.$inferSelect;
export type Game = typeof games.$inferSelect;
export type Category = typeof categories.$inferSelect;
export type Rarity = typeof rarities.$inferSelect;
export type Order = typeof orders.$inferSelect;
export type Transaction = typeof transactions.$inferSelect;
export type BlogPost = typeof blogPosts.$inferSelect;
export type Review = typeof reviews.$inferSelect;
