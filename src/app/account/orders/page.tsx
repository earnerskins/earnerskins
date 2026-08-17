import type { Metadata } from "next";
import { getCurrentUser } from "@/lib/auth";
import { getUserOrders, getUserTransactions } from "@/lib/account-queries";
import { Price } from "@/components/ui/Price";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Orders & history",
  robots: { index: false, follow: false },
};

export default async function OrdersPage() {
  const user = await getCurrentUser();
  if (!user) return null;

  const [orders, transactions] = await Promise.all([
    getUserOrders(user.id),
    getUserTransactions(user.id),
  ]);

  return (
    <div className="space-y-10">
      <section>
        <h2 className="mb-4 font-display text-xl font-semibold text-ink">Order history</h2>
        {orders.length === 0 ? (
          <div className="rounded-xl border border-hairline bg-card p-8 text-center">
            <p className="text-sm text-muted">No orders yet.</p>
            <ButtonLink href="/catalog" variant="secondary" className="mt-4">
              Browse the vault
            </ButtonLink>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((o) => (
              <article key={o.id} className="overflow-hidden rounded-xl border border-hairline bg-card">
                <header className="flex flex-wrap items-center justify-between gap-3 border-b border-hairline bg-panel/40 px-5 py-3">
                  <div>
                    <p className="font-mono text-sm text-ink">{o.orderNumber}</p>
                    <p className="text-xs text-muted">
                      {new Date(o.createdAt).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="rounded-full border border-hairline bg-card px-2.5 py-0.5 text-[11px] capitalize text-muted">
                      {o.status}
                    </span>
                    <Price pence={o.totalPence} />
                  </div>
                </header>
                <ul className="divide-y divide-hairline">
                  {o.items.map((it, i) => (
                    <li key={i} className="flex items-center justify-between gap-4 px-5 py-3 text-sm">
                      <span className="min-w-0 truncate text-ink">
                        {it.name}
                        {it.wear ? <span className="text-muted"> · {it.wear}</span> : null}
                        {it.quantity > 1 ? <span className="text-muted"> × {it.quantity}</span> : null}
                      </span>
                      <Price pence={it.pricePence * it.quantity} size="sm" className="shrink-0" />
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="mb-4 font-display text-xl font-semibold text-ink">Transaction history</h2>
        {transactions.length === 0 ? (
          <div className="rounded-xl border border-hairline bg-card p-8 text-center">
            <p className="text-sm text-muted">No transactions recorded yet.</p>
          </div>
        ) : (
          <ul className="divide-y divide-hairline overflow-hidden rounded-xl border border-hairline bg-card">
            {transactions.map((t) => (
              <li key={t.id} className="flex items-center justify-between gap-4 px-5 py-3.5">
                <div className="min-w-0">
                  <p className="truncate text-sm text-ink">{t.description}</p>
                  <p className="text-xs capitalize text-muted">
                    {t.type} · {new Date(t.createdAt).toLocaleDateString("en-GB")}
                  </p>
                </div>
                <span
                  className={`shrink-0 font-mono text-sm tabular-nums ${
                    t.amountPence >= 0 ? "text-primary" : "text-muted"
                  }`}
                >
                  {t.amountPence >= 0 ? "+" : "−"}
                  <Price pence={Math.abs(t.amountPence)} className="inline" />
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
