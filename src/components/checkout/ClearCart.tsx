"use client";

import { useEffect } from "react";
import { useCart } from "@/components/providers/CartProvider";

/** Empties the cart once the order has been confirmed. */
export function ClearCart() {
  const { clear } = useCart();
  useEffect(() => {
    clear();
    // clear is stable enough for a one-shot on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}
