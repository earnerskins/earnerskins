import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { getBlogPosts } from "@/lib/queries";

export const metadata: Metadata = pageMetadata({
  title: "Blog",
  description: "Guides and insight on CS2, Team Fortress 2 and Rust skins from the EarnerSkins team.",
  path: "/blog",
});

export default function BlogIndexPage() {
  const posts = getBlogPosts();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <header className="mb-8">
        <p className="eyebrow mb-2">The vault journal</p>
        <h1 className="font-display text-3xl font-semibold text-ink md:text-4xl">EarnerSkins blog</h1>
        <p className="mt-2 max-w-2xl text-muted">
          Guides, breakdowns and buying advice for skins across every game we cover.
        </p>
      </header>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((p) => (
          <article
            key={p.slug}
            className="foil-card group overflow-hidden rounded-xl border border-hairline bg-card"
          >
            <Link href={`/blog/${p.slug}`}>
              <div className="relative aspect-[16/9] overflow-hidden border-b border-hairline">
                <Image
                  src={p.coverImage}
                  alt={p.title}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <div className="mb-2 flex items-center gap-2 text-xs text-muted">
                  <span className="rounded-full border border-hairline bg-panel px-2 py-0.5">
                    {p.tag}
                  </span>
                  <span>{p.readingMinutes} min read</span>
                </div>
                <h2 className="font-display text-lg font-semibold text-ink group-hover:text-primary">
                  {p.title}
                </h2>
                <p className="mt-2 line-clamp-2 text-sm text-muted">{p.excerpt}</p>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
