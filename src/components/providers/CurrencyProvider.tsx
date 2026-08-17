"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { CURRENCIES, type CurrencyCode, formatPrice } from "@/lib/currency";

interface CurrencyCtx {
  currency: CurrencyCode;
  setCurrency: (c: CurrencyCode) => void;
  format: (pence: number) => string;
  locale: string;
}

const Ctx = createContext<CurrencyCtx | null>(null);
const STORAGE_KEY = "earnerskins.currency";

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<CurrencyCode>("GBP");

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as CurrencyCode | null;
    if (saved && CURRENCIES[saved]) setCurrencyState(saved);
  }, []);

  const setCurrency = (c: CurrencyCode) => {
    setCurrencyState(c);
    localStorage.setItem(STORAGE_KEY, c);
  };

  return (
    <Ctx.Provider
      value={{
        currency,
        setCurrency,
        format: (pence: number) => formatPrice(pence, currency),
        locale: CURRENCIES[currency].locale,
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useCurrency(): CurrencyCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCurrency must be used within CurrencyProvider");
  return ctx;
}
