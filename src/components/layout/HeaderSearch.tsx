"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { searchItems, type CatalogItem } from "@/lib/queries";
import { GameChip } from "@/components/ui/Badge";
import { Price } from "@/components/ui/Price";

export function HeaderSearch() {
  const [q, setQ] = useState("");
  const [results, setResults] = useState<CatalogItem[]>([]);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    setResults(searchItems(q, 6));
    setActive(-1);
  }, [q]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const go = (slug?: string) => {
    setOpen(false);
    if (slug) router.push(`/item/${slug}`);
    else if (q.trim()) router.push(`/catalog?q=${encodeURIComponent(q)}`);
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, -1));
    } else if (e.key === "Enter") {
      go(active >= 0 ? results[active]?.slug : undefined);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <div className="relative" ref={ref}>
      <div className="flex items-center gap-2 rounded-lg border border-hairline bg-card px-3 py-2 focus-within:border-primary/60">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted">
          <circle cx="11" cy="11" r="7" /><path d="M21 21l-4-4" />
        </svg>
        <input
          type="search"
          role="combobox"
          aria-expanded={open}
          aria-controls="search-results"
          aria-autocomplete="list"
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKey}
          placeholder="Search skins, knives, arcanas…"
          className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-muted"
        />
      </div>

      {open && q.trim() && (
        <div
          id="search-results"
          role="listbox"
          className="absolute z-50 mt-2 w-full overflow-hidden rounded-xl border border-hairline bg-panel shadow-vault"
        >
          {results.length === 0 ? (
            <p className="px-4 py-6 text-center text-sm text-muted">
              No results for “{q}”. Try a game or category.
            </p>
          ) : (
            <ul className="max-h-96 overflow-y-auto py-1">
              {results.map((item, i) => (
                <li key={item.slug} role="option" aria-selected={active === i}>
                  <Link
                    href={`/item/${item.slug}`}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2 ${active === i ? "bg-card" : "hover:bg-card"}`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.imageUrl} alt="" className="h-10 w-12 rounded object-cover" />
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-1.5">
                        <GameChip game={item.gameSlug} />
                        <span
                          className="h-2 w-2 rounded-full"
                          style={{ background: item.rarityGlow, boxShadow: `0 0 6px ${item.rarityGlow}` }}
                        />
                      </span>
                      <span className="mt-0.5 block truncate text-sm text-ink">{item.name}</span>
                    </span>
                    <Price pence={item.pricePence} size="sm" />
                  </Link>
                </li>
              ))}
              <li>
                <button
                  onClick={() => go()}
                  className="w-full px-3 py-2 text-left text-xs text-primary hover:bg-card"
                >
                  See all results for “{q}” →
                </button>
              </li>
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
