import type { Metadata } from "next";
import { filterItems, type CatalogFilters as Filters } from "@/lib/queries";
import { pageMetadata } from "@/lib/seo";
import { CatalogFilters } from "@/components/catalog/CatalogFilters";
import { ItemGrid } from "@/components/catalog/ItemGrid";
import { ActiveFilterChips } from "@/components/catalog/ActiveFilterChips";

export const metadata: Metadata = pageMetadata({
  title: "Catalog — Browse all skins",
  description:
    "Browse every skin in the EarnerSkins vault across CS2, Team Fortress 2 and Rust. Filter by game, category, rarity, wear and price.",
  path: "/catalog",
});

type SP = Record<string, string | string[] | undefined>;

function toFilters(sp: SP): Filters {
  const g = (k: string) => (typeof sp[k] === "string" ? (sp[k] as string) : undefined);
  return {
    game: g("game"),
    category: g("category"),
    rarity: g("rarity"),
    wear: g("wear"),
    sort: g("sort"),
    q: g("q"),
    minPence: g("min") ? Number(g("min")) : undefined,
    maxPence: g("max") ? Number(g("max")) : undefined,
  };
}

export default async function CatalogPage({ searchParams }: { searchParams: Promise<SP> }) {
  const sp = await searchParams;
  const filters = toFilters(sp);
  const items = filterItems(filters);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <header className="mb-6">
        <p className="eyebrow mb-2">The vault</p>
        <h1 className="font-display text-3xl font-semibold text-ink">
          {filters.q ? `Results for “${filters.q}”` : "Browse all skins"}
        </h1>
        <p className="mt-1 text-sm text-muted">
          <span className="font-mono text-ink">{items.length}</span> item
          {items.length === 1 ? "" : "s"} in the vault
        </p>
      </header>

      <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
        <aside className="lg:sticky lg:top-32 lg:h-fit">
          <details className="lg:hidden" open={false}>
            <summary className="focus-ring mb-2 cursor-pointer rounded-lg border border-hairline bg-card px-4 py-2.5 text-sm text-ink">
              Filters
            </summary>
            <CatalogFilters />
          </details>
          <div className="hidden lg:block">
            <CatalogFilters />
          </div>
        </aside>

        <div>
          <ActiveFilterChips />
          {items.length === 0 ? (
            <div className="rounded-xl border border-hairline bg-card p-12 text-center">
              <p className="text-muted">No skins match these filters.</p>
              <a href="/catalog" className="mt-2 inline-block text-sm text-primary hover:underline">
                Clear filters
              </a>
            </div>
          ) : (
            <ItemGrid items={items} />
          )}
        </div>
      </div>
    </div>
  );
}
