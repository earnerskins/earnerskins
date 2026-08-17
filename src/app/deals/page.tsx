import type { Metadata } from "next";
import { getDeals } from "@/lib/queries";
import { pageMetadata } from "@/lib/seo";
import { ItemGrid } from "@/components/catalog/ItemGrid";

export const metadata: Metadata = pageMetadata({
  title: "Deals — Discounted skins",
  description: "Discounted skins across CS2, Team Fortress 2 and Rust. Grab a finish before the price goes back up.",
  path: "/deals",
});

export default function DealsPage() {
  const items = getDeals();
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <header className="mb-6">
        <p className="eyebrow mb-2">Reduced from the vault</p>
        <h1 className="font-display text-3xl font-semibold text-ink md:text-4xl">Deals</h1>
        <p className="mt-1 text-sm text-muted">Skins currently below their usual price.</p>
      </header>
      <ItemGrid items={items} />
    </div>
  );
}
