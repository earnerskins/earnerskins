"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { useCart } from "@/components/providers/CartProvider";
import { Price } from "@/components/ui/Price";
import { GameChip } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";

export function MiniCart({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const { lines, subtotalPence, remove, count } = useCart();

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Link href="/cart" aria-label={`Cart, ${count} items`} className="focus-ring block">
        {children}
      </Link>

      {open && (
        <div className="absolute right-0 top-full z-50 w-80 rounded-xl border border-hairline bg-panel p-3 shadow-vault">
          {lines.length === 0 ? (
            <div className="py-6 text-center">
              <p className="text-sm text-muted">Your cart is empty.</p>
              <ButtonLink href="/catalog" variant="secondary" size="sm" className="mt-3">
                Browse skins
              </ButtonLink>
            </div>
          ) : (
            <>
              <ul className="max-h-72 space-y-2 overflow-y-auto">
                {lines.map((l) => (
                  <li key={l.slug} className="flex items-center gap-2 rounded-lg border border-hairline bg-card p-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={l.imageUrl} alt="" className="h-10 w-12 rounded object-cover" />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <GameChip game={l.gameSlug} />
                        {l.quantity > 1 && (
                          <span className="font-mono text-[10px] text-muted">×{l.quantity}</span>
                        )}
                      </div>
                      <p className="truncate text-xs text-ink">{l.name}</p>
                    </div>
                    <Price pence={l.pricePence * l.quantity} size="sm" />
                    <button
                      onClick={() => remove(l.slug)}
                      aria-label={`Remove ${l.name}`}
                      className="focus-ring rounded p-1 text-muted hover:text-danger"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M6 6l12 12M18 6L6 18" />
                      </svg>
                    </button>
                  </li>
                ))}
              </ul>
              <div className="mt-3 flex items-center justify-between border-t border-hairline pt-3">
                <span className="text-sm text-muted">Subtotal</span>
                <Price pence={subtotalPence} className="text-primary" />
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <ButtonLink href="/cart" variant="secondary" size="sm">
                  View cart
                </ButtonLink>
                <ButtonLink href="/checkout" size="sm">
                  Checkout
                </ButtonLink>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
