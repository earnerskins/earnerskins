"use client";

import Link from "next/link";
import { cn } from "@/lib/cn";
import type { CatalogItem } from "@/lib/queries";
import { GameChip } from "@/components/ui/Badge";
import { PriceWithOld } from "@/components/ui/Price";
import { AddToCartButton } from "@/components/catalog/AddToCartButton";
import { WishlistButton } from "@/components/catalog/WishlistButton";

/**
 * The single unified item card used everywhere.
 * Uniform render stage, rarity edge-strip + soft glow, mono price.
 * Premium (high-tier) items get the foil light-sweep on hover.
 */
export function ItemCard({ item, premium }: { item: CatalogItem; premium?: boolean }) {
  const isPremium = premium ?? item.rarityTier >= 6;
  return (
    <div
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-xl border bg-card shadow-vault transition-transform duration-200 hover:-translate-y-0.5",
        isPremium && "foil-card",
      )}
      style={{ borderColor: `${item.rarityGlow}33` }}
    >
      {/* Rarity edge strip */}
      <span
        className="absolute inset-x-0 top-0 z-10 h-0.5"
        style={{ background: item.rarityGlow }}
        aria-hidden="true"
      />

      <Link
        href={`/item/${item.slug}`}
        className="focus-ring block"
        aria-label={`${item.name} — view details`}
      >
        <div
          className="rarity-stage relative aspect-[4/3] w-full overflow-hidden bg-panel"
          style={{ ["--rarity-glow" as string]: item.rarityGlow }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={item.imageUrl}
            alt={`${item.name} — ${item.gameName} ${item.categoryName} skin`}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            loading="lazy"
          />
          <div className="absolute left-2 top-2 flex gap-1.5">
            <GameChip game={item.gameSlug} />
            {item.isNew && (
              <span className="rounded-md border border-primary/30 bg-primary-tint px-1.5 py-0.5 font-mono text-[10px] uppercase text-primary">
                New
              </span>
            )}
          </div>
          <div className="absolute right-2 top-2">
            <WishlistButton slug={item.slug} />
          </div>
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-3">
        <div className="flex items-center gap-1.5">
          <span
            className="inline-block h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: item.rarityGlow, boxShadow: `0 0 8px ${item.rarityGlow}` }}
          />
          <span className="font-mono text-[10px] uppercase tracking-wide text-muted">
            {item.rarityName}
          </span>
        </div>

        <Link href={`/item/${item.slug}`} className="focus-ring">
          <h3 className="line-clamp-1 font-display text-sm font-medium text-ink group-hover:text-primary">
            {item.name}
          </h3>
        </Link>

        {item.hasWear && item.wear ? (
          <p className="font-mono text-[11px] text-muted">
            {item.wear}
            {item.floatValue != null && (
              <span className="ml-2 text-muted/70">float {item.floatValue.toFixed(4)}</span>
            )}
          </p>
        ) : (
          <p className="font-mono text-[11px] text-muted">{item.categoryName}</p>
        )}

        <div className="mt-auto flex items-center justify-between gap-2 pt-1">
          <PriceWithOld pence={item.pricePence} oldPence={item.oldPricePence} size="md" />
          <AddToCartButton item={item} compact />
        </div>
      </div>
    </div>
  );
}
