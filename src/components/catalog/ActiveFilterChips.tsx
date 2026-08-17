"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";

const LABELS: Record<string, string> = {
  game: "Game",
  category: "Category",
  rarity: "Rarity",
  wear: "Wear",
  q: "Search",
  min: "Min",
  max: "Max",
  sort: "Sort",
};

export function ActiveFilterChips() {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const entries = Array.from(params.entries()).filter(([k]) => k in LABELS && k !== "sort");
  if (entries.length === 0) return null;

  const remove = (key: string) => {
    const next = new URLSearchParams(params.toString());
    next.delete(key);
    router.push(`${pathname}?${next.toString()}`, { scroll: false });
  };

  return (
    <div className="mb-4 flex flex-wrap items-center gap-2">
      {entries.map(([k, v]) => (
        <button
          key={k}
          onClick={() => remove(k)}
          className="focus-ring inline-flex items-center gap-1.5 rounded-lg border border-primary/40 bg-primary-tint px-2.5 py-1 text-xs text-primary"
        >
          <span className="text-muted">{LABELS[k]}:</span> {v}
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      ))}
    </div>
  );
}
