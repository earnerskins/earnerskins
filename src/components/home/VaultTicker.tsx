import Link from "next/link";
import type { CatalogItem } from "@/lib/queries";
import { Price } from "@/components/ui/Price";
import { GameChip } from "@/components/ui/Badge";

/**
 * Auto-scrolling marquee of live catalog items. Decorative + interactive:
 * the whole track pauses on hover (`.pause-hover`) and edges fade out.
 * Items are duplicated once so the -50% keyframe loops seamlessly.
 */
export function VaultTicker({
  items,
  reverse,
}: {
  items: CatalogItem[];
  reverse?: boolean;
}) {
  if (items.length === 0) return null;
  const loop = [...items, ...items];
  return (
    <div className="pause-hover edge-fade relative overflow-hidden py-2">
      <div
        className={`flex w-max gap-4 ${reverse ? "animate-marquee-slow" : "animate-marquee"}`}
        style={reverse ? { animationDirection: "reverse" } : undefined}
      >
        {loop.map((it, i) => (
          <Link
            key={`${it.slug}-${i}`}
            href={`/item/${it.slug}`}
            className="focus-ring group flex w-64 shrink-0 items-center gap-3 rounded-xl border border-hairline bg-card p-3 transition-colors hover:border-primary/50"
            style={{ ["--rarity-glow" as string]: it.rarityGlow }}
          >
            <span className="rarity-stage relative shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={it.imageUrl}
                alt=""
                className="h-14 w-16 rounded-lg object-cover"
              />
            </span>
            <span className="min-w-0 flex-1">
              <span className="flex items-center gap-1.5">
                <GameChip game={it.gameSlug} />
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ background: it.rarityGlow, boxShadow: `0 0 6px ${it.rarityGlow}` }}
                />
              </span>
              <span className="mt-1 block truncate text-sm text-ink">{it.name}</span>
              <Price pence={it.pricePence} size="sm" className="text-primary" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
