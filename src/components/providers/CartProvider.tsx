"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export interface CartLine {
  slug: string;
  name: string;
  gameSlug: string;
  wear: string | null;
  pricePence: number;
  imageUrl: string;
  rarityGlow: string;
  quantity: number;
}

interface CartCtx {
  lines: CartLine[];
  count: number;
  subtotalPence: number;
  add: (line: Omit<CartLine, "quantity">) => void;
  remove: (slug: string) => void;
  setQuantity: (slug: string, q: number) => void;
  clear: () => void;
}

const Ctx = createContext<CartCtx | null>(null);
const STORAGE_KEY = "earnerskins.cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setLines(JSON.parse(raw));
    } catch {
      /* ignore corrupt storage */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [lines, hydrated]);

  const add: CartCtx["add"] = (line) =>
    setLines((prev) => {
      const existing = prev.find((l) => l.slug === line.slug);
      if (existing) {
        return prev.map((l) => (l.slug === line.slug ? { ...l, quantity: l.quantity + 1 } : l));
      }
      return [...prev, { ...line, quantity: 1 }];
    });

  const remove: CartCtx["remove"] = (slug) =>
    setLines((prev) => prev.filter((l) => l.slug !== slug));

  const setQuantity: CartCtx["setQuantity"] = (slug, q) =>
    setLines((prev) =>
      q <= 0
        ? prev.filter((l) => l.slug !== slug)
        : prev.map((l) => (l.slug === slug ? { ...l, quantity: q } : l)),
    );

  const clear = () => setLines([]);

  const { count, subtotalPence } = useMemo(
    () => ({
      count: lines.reduce((n, l) => n + l.quantity, 0),
      subtotalPence: lines.reduce((n, l) => n + l.pricePence * l.quantity, 0),
    }),
    [lines],
  );

  return (
    <Ctx.Provider value={{ lines, count, subtotalPence, add, remove, setQuantity, clear }}>
      {children}
    </Ctx.Provider>
  );
}

export function useCart(): CartCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
