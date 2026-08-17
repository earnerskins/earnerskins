import type { Metadata } from "next";
import { getNewItems } from "@/lib/queries";
import { pageMetadata } from "@/lib/seo";
import { ItemGrid } from "@/components/catalog/ItemGrid";

export const metadata: Metadata = pageMetadata({
  title: "New arrivals",
  description: "The latest skins added to the EarnerSkins vault across CS2, Team Fortress 2 and Rust.",
  path: "/new",
});

export default function NewPage() {
  const items = getNewItems();
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <header className="mb-6">
        <p className="eyebrow mb-2">Fresh in the vault</p>
        <h1 className="font-display text-3xl font-semibold text-ink md:text-4xl">New arrivals</h1>
        <p className="mt-1 text-sm text-muted">Recently added skins, hot off the display case.</p>
      </header>
      <ItemGrid items={items} />
    </div>
  );
}
