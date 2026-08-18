import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { getGames, getAllItems, getBlogPosts } from "@/lib/queries";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPaths = [
    "/",
    "/catalog",
    "/deals",
    "/new",
    "/blog",
    "/about",
    "/contact",
    "/faq",
    "/delivery",
    "/login",
    "/register",
    "/legal/terms",
    "/legal/delivery",
    "/legal/refund",
    "/legal/payment",
    "/legal/privacy",
    "/legal/cookies",
  ];

  const entries: MetadataRoute.Sitemap = staticPaths.map((p) => ({
    url: `${SITE_URL}${p}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: p === "/" ? 1 : 0.7,
  }));

  for (const g of getGames()) {
    entries.push({
      url: `${SITE_URL}/game/${g.slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    });
  }

  for (const item of getAllItems()) {
    entries.push({
      url: `${SITE_URL}/item/${item.slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.6,
    });
  }

  for (const post of getBlogPosts()) {
    entries.push({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    });
  }

  return entries;
}
