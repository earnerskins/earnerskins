"use client";

import { getAllItems } from "@/lib/queries";
import { useWishlist } from "@/components/providers/WishlistProvider";
import { ItemGrid } from "@/components/catalog/ItemGrid";
import { ButtonLink } from "@/components/ui/Button";

const ALL = getAllItems();

export default function WishlistPage() {
  const { slugs } = useWishlist();
  const items = ALL.filter((i) => slugs.includes(i.slug));

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <header className="mb-6">
        <p className="eyebrow mb-2">Saved for later</p>
        <h1 className="font-display text-3xl font-semibold text-ink">Your wishlist</h1>
        <p className="mt-1 text-sm text-muted">
          {items.length} item{items.length === 1 ? "" : "s"} saved.
        </p>
      </header>

      {items.length === 0 ? (
        <div className="rounded-xl border border-hairline bg-card p-12 text-center">
          <p className="text-muted">Your wishlist is empty. Tap the heart on any skin to save it.</p>
          <ButtonLink href="/catalog" variant="secondary" className="mt-4">
            Browse skins
          </ButtonLink>
        </div>
      ) : (
        <ItemGrid items={items} />
      )}
    </div>
  );
}
