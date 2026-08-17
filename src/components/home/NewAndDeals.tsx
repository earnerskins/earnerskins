"use client";

import { useState } from "react";
import { type CatalogItem } from "@/lib/queries";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ItemGrid } from "@/components/catalog/ItemGrid";

export function NewAndDeals({
  newItems,
  deals,
}: {
  newItems: CatalogItem[];
  deals: CatalogItem[];
}) {
  const [tab, setTab] = useState<"new" | "deals">("new");
  const items = tab === "new" ? newItems : deals;
  return (
    <Section band>
      <div className="mb-6 flex items-center justify-between gap-4">
        <div className="inline-flex rounded-lg border border-hairline bg-card p-1" role="tablist" aria-label="New arrivals and deals">
          <button
            role="tab"
            aria-selected={tab === "new"}
            onClick={() => setTab("new")}
            className={`focus-ring rounded-md px-4 py-1.5 text-sm ${tab === "new" ? "bg-primary-tint text-primary" : "text-muted hover:text-ink"}`}
          >
            New arrivals
          </button>
          <button
            role="tab"
            aria-selected={tab === "deals"}
            onClick={() => setTab("deals")}
            className={`focus-ring rounded-md px-4 py-1.5 text-sm ${tab === "deals" ? "bg-primary-tint text-primary" : "text-muted hover:text-ink"}`}
          >
            Deals
          </button>
        </div>
        <a href={tab === "new" ? "/new" : "/deals"} className="focus-ring text-sm text-primary hover:underline">
          View all →
        </a>
      </div>
      <ItemGrid items={items.slice(0, 8)} />
    </Section>
  );
}
