"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import type { CatalogItem } from "@/lib/queries";
import { useCart } from "@/components/providers/CartProvider";

export function AddToCartButton({
  item,
  compact,
  className,
}: {
  item: CatalogItem;
  compact?: boolean;
  className?: string;
}) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  const handle = () => {
    add({
      slug: item.slug,
      name: item.name,
      gameSlug: item.gameSlug,
      wear: item.wear,
      pricePence: item.pricePence,
      imageUrl: item.imageUrl,
      rarityGlow: item.rarityGlow,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  if (compact) {
    return (
      <button
        onClick={handle}
        aria-label={`Add ${item.name} to cart`}
        className={cn(
          "focus-ring flex h-8 w-8 items-center justify-center rounded-lg border border-hairline bg-panel text-ink transition-colors hover:border-primary/60 hover:text-primary",
          added && "border-primary bg-primary-tint text-primary",
          className,
        )}
      >
        {added ? <CheckIcon /> : <CartPlusIcon />}
      </button>
    );
  }

  return (
    <button
      onClick={handle}
      className={cn(
        "focus-ring inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 font-medium text-primary-ink transition-colors hover:bg-[#c6f56a]",
        className,
      )}
    >
      {added ? <CheckIcon /> : <CartPlusIcon />}
      {added ? "Added to cart" : "Add to cart"}
    </button>
  );
}

function CartPlusIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="9" cy="20" r="1" /><circle cx="18" cy="20" r="1" />
      <path d="M3 4h2l2.4 12.5a1 1 0 0 0 1 .8h8.7a1 1 0 0 0 1-.8L21 8H6" />
      <path d="M12 6v4M10 8h4" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
