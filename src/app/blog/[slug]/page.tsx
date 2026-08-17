import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Script from "next/script";
import { pageMetadata, SITE_URL } from "@/lib/seo";
import { COMPANY } from "@/lib/config";
import { getBlogPost, getBlogPosts } from "@/lib/queries";

export function generateStaticParams() {
  return getBlogPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return { title: "Post not found" };
  return pageMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    image: post.coverImage,
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const related = getBlogPosts().filter((p) => p.slug !== post.slug).slice(0, 2);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: `${SITE_URL}${post.coverImage.startsWith("/") ? post.coverImage : ""}`,
    author: { "@type": "Organization", name: post.author },
    publisher: { "@type": "Organization", name: COMPANY.brand },
  };

  return (
    <article className="mx-auto max-w-3xl px-4 py-10">
      <Script
        id="blog-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav className="mb-6 text-xs text-muted">
        <Link href="/blog" className="hover:text-ink">
          ← All posts
        </Link>
      </nav>

      <header className="mb-6">
        <div className="mb-3 flex items-center gap-2 text-xs text-muted">
          <span className="rounded-full border border-hairline bg-panel px-2 py-0.5">{post.tag}</span>
          <span>{post.readingMinutes} min read</span>
          <span>·</span>
          <span>{post.author}</span>
        </div>
        <h1 className="font-display text-3xl font-semibold text-ink md:text-4xl">{post.title}</h1>
        <p className="mt-3 text-lg text-muted">{post.excerpt}</p>
      </header>

      <div className="relative mb-8 aspect-[16/9] overflow-hidden rounded-xl border border-hairline">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          sizes="(max-width: 768px) 100vw, 768px"
          className="object-cover"
          priority
        />
      </div>

      <div className="space-y-5 text-[15px] leading-relaxed text-ink/90">
        {post.body.split("\n\n").map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>

      {related.length > 0 && (
        <section className="mt-12 border-t border-hairline pt-8">
          <h2 className="mb-4 font-display text-xl font-semibold text-ink">Keep reading</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/blog/${r.slug}`}
                className="focus-ring rounded-xl border border-hairline bg-card p-4 transition-colors hover:border-primary/60"
              >
                <p className="text-xs text-muted">{r.tag} · {r.readingMinutes} min</p>
                <p className="mt-1 font-medium text-ink">{r.title}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
