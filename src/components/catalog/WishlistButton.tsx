"use client";

import { cn } from "@/lib/cn";
import { useWishlist } from "@/components/providers/WishlistProvider";

export function WishlistButton({ slug, className }: { slug: string; className?: string }) {
  const { has, toggle } = useWishlist();
  const active = has(slug);
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        toggle(slug);
      }}
      aria-pressed={active}
      aria-label={active ? "Remove from wishlist" : "Add to wishlist"}
      className={cn(
        "focus-ring flex h-8 w-8 items-center justify-center rounded-lg border border-hairline bg-base/70 backdrop-blur transition-colors hover:border-primary/60",
        active ? "text-danger" : "text-muted hover:text-ink",
        className,
      )}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
        <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
      </svg>
    </button>
  );
}
