import { readFileSync } from "node:fs";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

// Load .env.local / .env without pulling in a dotenv dependency.
for (const file of [".env.local", ".env"]) {
  try {
    for (const line of readFileSync(file, "utf8").split("\n")) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (!m) continue;
      let val = m[2].trim();
      if (/^(".*"|'.*')$/.test(val)) val = val.slice(1, -1);
      if (process.env[m[1]] === undefined) process.env[m[1]] = val;
    }
  } catch {
    /* file absent — ignore */
  }
}
import bcrypt from "bcryptjs";
import * as schema from "./schema";
import {
  GAMES,
  CATEGORIES,
  RARITIES,
  ITEMS,
  BLOG_POSTS,
} from "@/lib/catalog-data";
import { categoryImage, blogCover, itemImage } from "@/lib/art";

async function main() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not set.");
  const db = drizzle(neon(url), { schema });

  console.log("Seeding games…");
  await db.insert(schema.games).values(GAMES).onConflictDoNothing();

  console.log("Seeding categories…");
  const catRows = CATEGORIES.map((c) => ({
    gameSlug: c.gameSlug,
    slug: c.slug,
    name: c.name,
    imageUrl: categoryImage(c.gameSlug, c.slug),
  }));
  await db.insert(schema.categories).values(catRows).onConflictDoNothing();

  console.log("Seeding rarities…");
  await db.insert(schema.rarities).values(RARITIES).onConflictDoNothing();

  // Resolve ids for items.
  const cats = await db.select().from(schema.categories);
  const rars = await db.select().from(schema.rarities);
  const catId = (game: string, slug: string) =>
    cats.find((c) => c.gameSlug === game && c.slug === slug)!.id;
  const rarId = (game: string, slug: string) =>
    rars.find((r) => r.gameSlug === game && r.slug === slug)!.id;

  console.log("Seeding items…");
  const itemRows = ITEMS.map((i) => ({
    slug: i.slug,
    name: i.name,
    gameSlug: i.gameSlug,
    categoryId: catId(i.gameSlug, i.categorySlug),
    rarityId: rarId(i.gameSlug, i.raritySlug),
    pricePence: i.pricePence,
    oldPricePence: i.oldPricePence ?? null,
    wear: i.wear ?? null,
    floatValue: i.floatValue != null ? String(i.floatValue) : null,
    pattern: i.pattern ?? null,
    imageUrl: itemImage(i.slug),
    description: i.description,
    isFeatured: i.isFeatured ?? false,
    isNew: i.isNew ?? false,
  }));
  await db.insert(schema.items).values(itemRows).onConflictDoNothing();

  console.log("Seeding blog posts…");
  await db
    .insert(schema.blogPosts)
    .values(
      BLOG_POSTS.map((p) => ({
        slug: p.slug,
        title: p.title,
        excerpt: p.excerpt,
        body: p.body,
        coverImage: blogCover(p.slug),
        author: p.author,
        tag: p.tag,
        readingMinutes: p.readingMinutes,
      })),
    )
    .onConflictDoNothing();

  console.log("Seeding demo user…");
  const passwordHash = await bcrypt.hash("Password123!", 10);
  await db
    .insert(schema.users)
    .values({
      email: "demo@earnerskins.example",
      passwordHash,
      firstName: "Demo",
      lastName: "Collector",
      phone: "+44 7700 900123",
      dateOfBirth: "1995-06-15",
      street: "1 Vault Lane",
      city: "London",
      country: "United Kingdom",
      postalCode: "EC1A 1BB",
      balancePence: 50000,
      agreedToTerms: true,
      emailVerified: true,
    })
    .onConflictDoNothing();

  console.log("✔ Seed complete.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
