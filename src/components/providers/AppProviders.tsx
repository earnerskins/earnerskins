"use client";

import type { ReactNode } from "react";
import { ThemeProvider } from "./ThemeProvider";
import { CurrencyProvider } from "./CurrencyProvider";
import { CartProvider } from "./CartProvider";
import { WishlistProvider } from "./WishlistProvider";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <CurrencyProvider>
        <WishlistProvider>
          <CartProvider>{children}</CartProvider>
        </WishlistProvider>
      </CurrencyProvider>
    </ThemeProvider>
  );
}
