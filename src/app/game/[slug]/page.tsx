import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getGame, filterItems } from "@/lib/queries";
import { GAMES } from "@/lib/catalog-data";
import { pageMetadata } from "@/lib/seo";
import { CatalogFilters } from "@/components/catalog/CatalogFilters";
import { ItemGrid } from "@/components/catalog/ItemGrid";
import { ActiveFilterChips } from "@/components/catalog/ActiveFilterChips";

export function generateStaticParams() {
  return GAMES.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const game = getGame(slug);
  if (!game) return {};
  return pageMetadata({
    title: `${game.name} skins`,
    description: `Buy ${game.name} skins on EarnerSkins — ${game.tagline}. Instant delivery, official store.`,
    path: `/game/${slug}`,
  });
}

type SP = Record<string, string | string[] | undefined>;

export default async function GamePage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<SP>;
}) {
  const { slug } = await params;
  const game = getGame(slug);
  if (!game) notFound();
  const sp = await searchParams;
  const g = (k: string) => (typeof sp[k] === "string" ? (sp[k] as string) : undefined);

  const items = filterItems({
    game: slug,
    category: g("category"),
    rarity: g("rarity"),
    wear: g("wear"),
    sort: g("sort"),
    minPence: g("min") ? Number(g("min")) : undefined,
    maxPence: g("max") ? Number(g("max")) : undefined,
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <header className="mb-6">
        <p className="eyebrow mb-2">{game.tagline}</p>
        <h1 className="font-display text-3xl font-semibold text-ink md:text-4xl">
          {game.name} skins
        </h1>
        <p className="mt-1 text-sm text-muted">
          <span className="font-mono text-ink">{items.length}</span> items available
        </p>
      </header>

      <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
        <aside className="lg:sticky lg:top-32 lg:h-fit">
          <details className="lg:hidden">
            <summary className="focus-ring mb-2 cursor-pointer rounded-lg border border-hairline bg-card px-4 py-2.5 text-sm text-ink">
              Filters
            </summary>
            <CatalogFilters lockGame={slug} />
          </details>
          <div className="hidden lg:block">
            <CatalogFilters lockGame={slug} />
          </div>
        </aside>
        <div>
          <ActiveFilterChips />
          {items.length === 0 ? (
            <div className="rounded-xl border border-hairline bg-card p-12 text-center text-muted">
              No skins match these filters.
            </div>
          ) : (
            <ItemGrid items={items} />
          )}
        </div>
      </div>
    </div>
  );
}
