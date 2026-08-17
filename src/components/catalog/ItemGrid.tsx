import type { CatalogItem } from "@/lib/queries";
import { ItemCard } from "./ItemCard";
import { cn } from "@/lib/cn";

export function ItemGrid({
  items,
  className,
  premium,
}: {
  items: CatalogItem[];
  className?: string;
  premium?: boolean;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:gap-4",
        className,
      )}
    >
      {items.map((item, i) => (
        <div key={item.slug} className="animate-fade-up" style={{ animationDelay: `${i * 40}ms` }}>
          <ItemCard item={item} premium={premium} />
        </div>
      ))}
    </div>
  );
}

export function ItemRail({ items }: { items: CatalogItem[] }) {
  return (
    <div className="-mx-4 flex snap-x gap-3 overflow-x-auto px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {items.map((item) => (
        <div key={item.slug} className="w-56 shrink-0 snap-start">
          <ItemCard item={item} />
        </div>
      ))}
    </div>
  );
}
