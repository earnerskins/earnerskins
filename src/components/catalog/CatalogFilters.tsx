"use client";

import { useCallback, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { getGames } from "@/lib/queries";
import { useCurrency } from "@/components/providers/CurrencyProvider";
import { CURRENCIES, toBasePence } from "@/lib/currency";
import { cn } from "@/lib/cn";

const GAMES = getGames();
const WEARS = ["Factory New", "Minimal Wear", "Field-Tested", "Well-Worn", "Battle-Scarred"];
const SORTS = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "rarity", label: "Rarity" },
  { value: "name", label: "Name A–Z" },
];

/**
 * URL-synced catalog filters. Price range is expressed in the currently
 * selected header currency and converted to base pence for the URL.
 * When `lockGame` is set (game pages), the game control is hidden.
 */
export function CatalogFilters({ lockGame }: { lockGame?: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const { currency } = useCurrency();
  const meta = CURRENCIES[currency];

  const gameSlug = lockGame ?? params.get("game") ?? "";
  const activeGame = GAMES.find((g) => g.slug === gameSlug);

  const setParam = useCallback(
    (updates: Record<string, string | null>) => {
      const next = new URLSearchParams(params.toString());
      for (const [k, v] of Object.entries(updates)) {
        if (v === null || v === "") next.delete(k);
        else next.set(k, v);
      }
      // Changing game invalidates category/rarity.
      if ("game" in updates) {
        next.delete("category");
        next.delete("rarity");
      }
      router.push(`${pathname}?${next.toString()}`, { scroll: false });
    },
    [params, pathname, router],
  );

  const penceToDisplay = (p: string | null) =>
    p ? Math.round((Number(p) / 100) * meta.rate) : "";
  const [minInput, setMinInput] = useState(String(penceToDisplay(params.get("min"))));
  const [maxInput, setMaxInput] = useState(String(penceToDisplay(params.get("max"))));

  const applyPrice = () => {
    const min = minInput ? String(toBasePence(Number(minInput), currency)) : null;
    const max = maxInput ? String(toBasePence(Number(maxInput), currency)) : null;
    setParam({ min, max });
  };

  const FilterGroup = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="border-b border-hairline py-4">
      <p className="eyebrow mb-3">{title}</p>
      {children}
    </div>
  );

  const Chip = ({
    active,
    onClick,
    children,
    glow,
  }: {
    active: boolean;
    onClick: () => void;
    children: React.ReactNode;
    glow?: string;
  }) => (
    <button
      onClick={onClick}
      className={cn(
        "focus-ring flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs transition-colors",
        active
          ? "border-primary bg-primary-tint text-primary"
          : "border-hairline bg-card text-muted hover:text-ink",
      )}
    >
      {glow && <span className="h-2 w-2 rounded-full" style={{ background: glow }} />}
      {children}
    </button>
  );

  return (
    <div className="text-sm">
      {!lockGame && (
        <FilterGroup title="Game">
          <div className="flex flex-wrap gap-2">
            <Chip active={!gameSlug} onClick={() => setParam({ game: null })}>
              All games
            </Chip>
            {GAMES.map((g) => (
              <Chip key={g.slug} active={gameSlug === g.slug} onClick={() => setParam({ game: g.slug })}>
                {g.name}
              </Chip>
            ))}
          </div>
        </FilterGroup>
      )}

      {activeGame && (
        <FilterGroup title="Category">
          <div className="flex flex-wrap gap-2">
            <Chip active={!params.get("category")} onClick={() => setParam({ category: null })}>
              All
            </Chip>
            {activeGame.categories.map((c) => (
              <Chip
                key={c.slug}
                active={params.get("category") === c.slug}
                onClick={() => setParam({ category: c.slug })}
              >
                {c.name}
              </Chip>
            ))}
          </div>
        </FilterGroup>
      )}

      {activeGame && (
        <FilterGroup title="Rarity">
          <div className="flex flex-wrap gap-2">
            <Chip active={!params.get("rarity")} onClick={() => setParam({ rarity: null })}>
              Any
            </Chip>
            {activeGame.rarities.map((r) => (
              <Chip
                key={r.slug}
                active={params.get("rarity") === r.slug}
                onClick={() => setParam({ rarity: r.slug })}
                glow={r.glow}
              >
                {r.name}
              </Chip>
            ))}
          </div>
        </FilterGroup>
      )}

      {activeGame?.hasWear && (
        <FilterGroup title="Wear">
          <div className="flex flex-wrap gap-2">
            <Chip active={!params.get("wear")} onClick={() => setParam({ wear: null })}>
              Any
            </Chip>
            {WEARS.map((w) => (
              <Chip key={w} active={params.get("wear") === w} onClick={() => setParam({ wear: w })}>
                {w}
              </Chip>
            ))}
          </div>
        </FilterGroup>
      )}

      <FilterGroup title={`Price range (${currency})`}>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 rounded-lg border border-hairline bg-card px-2 py-1">
            <span className="text-muted">{meta.symbol}</span>
            <input
              type="number"
              min={0}
              inputMode="decimal"
              value={minInput}
              onChange={(e) => setMinInput(e.target.value)}
              onBlur={applyPrice}
              placeholder="Min"
              aria-label="Minimum price"
              className="w-16 bg-transparent font-mono text-xs text-ink outline-none"
            />
          </div>
          <span className="text-muted">–</span>
          <div className="flex items-center gap-1 rounded-lg border border-hairline bg-card px-2 py-1">
            <span className="text-muted">{meta.symbol}</span>
            <input
              type="number"
              min={0}
              inputMode="decimal"
              value={maxInput}
              onChange={(e) => setMaxInput(e.target.value)}
              onBlur={applyPrice}
              placeholder="Max"
              aria-label="Maximum price"
              className="w-16 bg-transparent font-mono text-xs text-ink outline-none"
            />
          </div>
        </div>
      </FilterGroup>

      <FilterGroup title="Sort by">
        <select
          value={params.get("sort") ?? "featured"}
          onChange={(e) => setParam({ sort: e.target.value })}
          className="focus-ring w-full rounded-lg border border-hairline bg-card px-3 py-2 text-sm text-ink"
        >
          {SORTS.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </FilterGroup>

      <button
        onClick={() => router.push(pathname, { scroll: false })}
        className="focus-ring mt-4 text-xs text-muted hover:text-ink"
      >
        Clear all filters
      </button>
    </div>
  );
}
