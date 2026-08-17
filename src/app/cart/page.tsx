"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/providers/CartProvider";
import { Price } from "@/components/ui/Price";
import { ButtonLink } from "@/components/ui/Button";
import { POLICIES } from "@/lib/config";

export default function CartPage() {
  const { lines, subtotalPence, setQuantity, remove, count } = useCart();
  const serviceFeePence = POLICIES.serviceFeePence;
  const totalPence = subtotalPence + serviceFeePence;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <header className="mb-6">
        <p className="eyebrow mb-2">Your cart</p>
        <h1 className="font-display text-3xl font-semibold text-ink">Shopping cart</h1>
        <p className="mt-1 text-sm text-muted">
          {count} item{count === 1 ? "" : "s"} ready for instant delivery.
        </p>
      </header>

      {lines.length === 0 ? (
        <div className="rounded-xl border border-hairline bg-card p-12 text-center">
          <p className="text-muted">Your cart is empty.</p>
          <ButtonLink href="/catalog" variant="secondary" className="mt-4">
            Browse skins
          </ButtonLink>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
          <ul className="space-y-3">
            {lines.map((l) => (
              <li
                key={l.slug}
                className="flex gap-4 rounded-xl border border-hairline bg-card p-3"
              >
                <div
                  className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border border-hairline"
                  style={{ boxShadow: `inset 0 0 24px ${l.rarityGlow}33` }}
                >
                  <Image src={l.imageUrl} alt={l.name} fill sizes="80px" className="object-cover" />
                </div>

                <div className="flex min-w-0 flex-1 flex-col justify-between">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <Link
                        href={`/item/${l.slug}`}
                        className="block truncate font-medium text-ink hover:text-primary"
                      >
                        {l.name}
                      </Link>
                      {l.wear && <p className="text-xs text-muted">{l.wear}</p>}
                    </div>
                    <button
                      onClick={() => remove(l.slug)}
                      aria-label={`Remove ${l.name}`}
                      className="focus-ring shrink-0 rounded-lg p-1 text-muted hover:text-danger"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 6 6 18M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center rounded-lg border border-hairline">
                      <button
                        onClick={() => setQuantity(l.slug, l.quantity - 1)}
                        aria-label="Decrease quantity"
                        className="focus-ring px-2.5 py-1 text-muted hover:text-ink"
                      >
                        −
                      </button>
                      <span className="min-w-8 text-center font-mono text-sm text-ink">
                        {l.quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(l.slug, Math.min(10, l.quantity + 1))}
                        aria-label="Increase quantity"
                        className="focus-ring px-2.5 py-1 text-muted hover:text-ink"
                      >
                        +
                      </button>
                    </div>
                    <Price pence={l.pricePence * l.quantity} />
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-xl border border-hairline bg-card p-5">
              <h2 className="font-display text-lg font-semibold text-ink">Order summary</h2>
              <dl className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted">Subtotal</dt>
                  <dd>
                    <Price pence={subtotalPence} size="sm" />
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted">Service fee</dt>
                  <dd className="text-muted">
                    {serviceFeePence === 0 ? "Free" : <Price pence={serviceFeePence} size="sm" />}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted">Delivery</dt>
                  <dd className="text-primary">{POLICIES.deliveryPromise}</dd>
                </div>
                <div className="flex justify-between border-t border-hairline pt-3 text-base">
                  <dt className="font-medium text-ink">Total</dt>
                  <dd>
                    <Price pence={totalPence} className="font-medium text-primary" />
                  </dd>
                </div>
              </dl>
              <ButtonLink href="/checkout" className="mt-5 w-full">
                Proceed to checkout
              </ButtonLink>
              <Link
                href="/catalog"
                className="focus-ring mt-3 block text-center text-xs text-muted hover:text-ink"
              >
                Continue shopping
              </Link>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
