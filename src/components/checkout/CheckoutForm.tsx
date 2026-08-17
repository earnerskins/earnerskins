"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { useCart } from "@/components/providers/CartProvider";
import { useCurrency } from "@/components/providers/CurrencyProvider";
import { placeOrderAction, type CheckoutState } from "@/actions/checkout";
import { Price } from "@/components/ui/Price";
import { PaymentMarks } from "@/components/ui/PaymentMarks";
import { ButtonLink } from "@/components/ui/Button";
import { SteamLinkCard } from "@/components/checkout/SteamLinkCard";
import { COMPANY, POLICIES } from "@/lib/config";
import type { SteamLink } from "@/lib/steam";

interface CheckoutUser {
  email: string;
  firstName: string;
  lastName: string;
  balancePence: number;
}

export function CheckoutForm({
  user,
  steam: initialSteam,
}: {
  user: CheckoutUser | null;
  steam: SteamLink | null;
}) {
  const { lines, subtotalPence } = useCart();
  const { currency } = useCurrency();
  const [state, action, pending] = useActionState<CheckoutState, FormData>(placeOrderAction, {});
  const [agreed, setAgreed] = useState(false);
  const [method, setMethod] = useState<"card" | "balance">("card");
  const [steam, setSteam] = useState<SteamLink | null>(initialSteam);

  const serviceFeePence = POLICIES.serviceFeePence;
  const totalPence = subtotalPence + serviceFeePence;
  const canUseBalance = !!user && user.balancePence >= totalPence;

  if (lines.length === 0) {
    return (
      <div className="rounded-xl border border-hairline bg-card p-12 text-center">
        <p className="text-muted">Your cart is empty, so there&apos;s nothing to check out.</p>
        <ButtonLink href="/catalog" variant="secondary" className="mt-4">
          Browse skins
        </ButtonLink>
      </div>
    );
  }

  const linesPayload = JSON.stringify(lines.map((l) => ({ slug: l.slug, quantity: l.quantity })));
  const effectiveMethod = method === "balance" && canUseBalance ? "balance" : "card";

  return (
    <form action={action} className="grid gap-8 lg:grid-cols-[1fr_360px]">
      <input type="hidden" name="lines" value={linesPayload} />
      <input type="hidden" name="currency" value={currency} />
      <input type="hidden" name="payWithBalance" value={String(effectiveMethod === "balance")} />

      <div className="space-y-6">
        {/* Steam delivery — required */}
        <section className="rounded-xl border border-hairline bg-card p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold text-ink">Steam delivery</h2>
            <span className="rounded-md border border-hairline bg-panel px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide text-muted">
              Required
            </span>
          </div>
          <p className="mb-4 text-sm text-muted">
            Skins are delivered straight to your Steam account. Link it so we know where to send
            your items.
          </p>
          <SteamLinkCard initial={steam} onChange={setSteam} />
        </section>

        {/* Contact */}
        <section className="rounded-xl border border-hairline bg-card p-6">
          <h2 className="mb-4 font-display text-lg font-semibold text-ink">Contact</h2>
          {user ? (
            <p className="text-sm text-muted">
              Signed in as <span className="text-ink">{user.email}</span>. Your confirmation and
              invoice will be sent here.
            </p>
          ) : (
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm text-ink">
                Email for your confirmation & invoice
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                className="focus-ring w-full rounded-lg border border-hairline bg-panel px-3 py-2.5 text-ink placeholder:text-muted"
              />
              <p className="mt-2 text-xs text-muted">
                Already have an account?{" "}
                <Link href="/login" className="text-primary hover:underline">
                  Sign in
                </Link>{" "}
                to pay with your balance.
              </p>
            </div>
          )}
        </section>

        {/* Payment method */}
        <section className="rounded-xl border border-hairline bg-card p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold text-ink">Payment</h2>
            <PaymentMarks />
          </div>

          <div className="space-y-3">
            <label
              className={`flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-colors ${
                effectiveMethod === "card" ? "border-primary bg-primary-tint" : "border-hairline bg-panel"
              }`}
            >
              <input
                type="radio"
                name="method"
                checked={method === "card"}
                onChange={() => setMethod("card")}
                className="accent-[var(--primary)]"
              />
              <span className="flex-1">
                <span className="block text-sm font-medium text-ink">Credit or debit card</span>
                <span className="block text-xs text-muted">Visa & Mastercard · PCI DSS secured</span>
              </span>
            </label>

            {user && (
              <label
                className={`flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-colors ${
                  !canUseBalance
                    ? "cursor-not-allowed border-hairline bg-panel opacity-60"
                    : effectiveMethod === "balance"
                      ? "border-primary bg-primary-tint"
                      : "border-hairline bg-panel"
                }`}
              >
                <input
                  type="radio"
                  name="method"
                  checked={method === "balance"}
                  disabled={!canUseBalance}
                  onChange={() => setMethod("balance")}
                  className="accent-[var(--primary)]"
                />
                <span className="flex-1">
                  <span className="block text-sm font-medium text-ink">Account balance</span>
                  <span className="block text-xs text-muted">
                    Available: <Price pence={user.balancePence} size="sm" className="inline" />
                    {!canUseBalance && " · too low for this order"}
                  </span>
                </span>
              </label>
            )}
          </div>

          {effectiveMethod === "card" && (
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <input
                aria-label="Card number"
                inputMode="numeric"
                placeholder="Card number"
                className="focus-ring col-span-2 rounded-lg border border-hairline bg-panel px-3 py-2.5 font-mono text-ink placeholder:text-muted"
              />
              <input
                aria-label="Expiry date"
                placeholder="MM / YY"
                className="focus-ring rounded-lg border border-hairline bg-panel px-3 py-2.5 font-mono text-ink placeholder:text-muted"
              />
              <input
                aria-label="Security code"
                inputMode="numeric"
                placeholder="CVC"
                className="focus-ring rounded-lg border border-hairline bg-panel px-3 py-2.5 font-mono text-ink placeholder:text-muted"
              />
              <p className="col-span-2 text-xs text-muted">
                Card details are for demonstration only. No real payment is processed.
              </p>
            </div>
          )}
        </section>

        {/* Seller legal identity */}
        <section className="rounded-xl border border-hairline bg-card p-6 text-xs leading-relaxed text-muted">
          <p className="eyebrow mb-2">Seller</p>
          <p className="text-ink">{COMPANY.legalName}</p>
          <p>{COMPANY.address}</p>
          <p>Company registration: {COMPANY.regNumber}</p>
          <p>
            {COMPANY.email} · {COMPANY.phone}
          </p>
        </section>
      </div>

      {/* Summary */}
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-xl border border-hairline bg-card p-5">
          <h2 className="font-display text-lg font-semibold text-ink">Order summary</h2>

          <ul className="mt-4 space-y-2.5">
            {lines.map((l) => (
              <li key={l.slug} className="flex justify-between gap-3 text-sm">
                <span className="min-w-0 truncate text-muted">
                  {l.name}
                  {l.quantity > 1 ? ` × ${l.quantity}` : ""}
                </span>
                <Price pence={l.pricePence * l.quantity} size="sm" className="shrink-0" />
              </li>
            ))}
          </ul>

          <dl className="mt-4 space-y-2 border-t border-hairline pt-4 text-sm">
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
            <div className="flex justify-between border-t border-hairline pt-2 text-base">
              <dt className="font-medium text-ink">Total</dt>
              <dd>
                <Price pence={totalPence} className="font-medium text-primary" />
              </dd>
            </div>
          </dl>

          <label className="mt-5 flex items-start gap-2.5 text-xs text-muted">
            <input
              type="checkbox"
              name="agree"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-0.5 accent-[var(--primary)]"
            />
            <span>
              I agree to the{" "}
              <Link href="/legal/terms" className="text-primary hover:underline">
                Terms
              </Link>
              ,{" "}
              <Link href="/legal/refund" className="text-primary hover:underline">
                Refund Policy
              </Link>{" "}
              and{" "}
              <Link href="/legal/payment" className="text-primary hover:underline">
                Payment Policy
              </Link>
              .
            </span>
          </label>

          {state.error && (
            <p className="mt-4 rounded-lg border border-danger/30 bg-danger/10 px-3 py-2 text-sm text-danger">
              {state.error}
            </p>
          )}

          {!steam && (
            <p className="mt-4 rounded-lg border border-hairline bg-panel px-3 py-2 text-xs text-muted">
              Link your Steam account above to place the order.
            </p>
          )}

          <button
            type="submit"
            disabled={!agreed || pending || !steam}
            className="focus-ring mt-5 w-full rounded-lg bg-primary px-6 py-3 font-medium text-primary-ink transition-colors hover:bg-[#c6f56a] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {pending ? "Placing order…" : "Place order"}
          </button>

          <p className="mt-3 text-center text-[11px] text-muted">
            {POLICIES.deliveryPromise} after payment. Support {COMPANY.supportHours}.
          </p>
        </div>
      </aside>
    </form>
  );
}
