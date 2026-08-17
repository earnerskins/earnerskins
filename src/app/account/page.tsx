import type { Metadata } from "next";
import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { getUserOrders, getUserTransactions } from "@/lib/account-queries";
import { Price } from "@/components/ui/Price";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Dashboard",
  robots: { index: false, follow: false },
};

export default async function AccountDashboardPage() {
  const user = await getCurrentUser();
  if (!user) return null;

  const [orders, transactions] = await Promise.all([
    getUserOrders(user.id),
    getUserTransactions(user.id),
  ]);

  const totalSpent = orders
    .filter((o) => o.status !== "refunded" && o.status !== "cancelled")
    .reduce((n, o) => n + o.totalPence, 0);

  const stats = [
    { label: "Orders placed", value: String(orders.length) },
    { label: "Total spent", pence: totalSpent },
    { label: "Wallet balance", pence: user.balancePence },
  ];

  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl border border-hairline bg-card p-5">
            <p className="text-xs text-muted">{s.label}</p>
            {s.pence != null ? (
              <Price pence={s.pence} size="lg" className="mt-2 block" />
            ) : (
              <p className="mt-2 font-mono text-2xl text-ink">{s.value}</p>
            )}
          </div>
        ))}
      </div>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-xl font-semibold text-ink">Recent orders</h2>
          <Link href="/account/orders" className="text-sm text-primary hover:underline">
            View all →
          </Link>
        </div>

        {orders.length === 0 ? (
          <div className="rounded-xl border border-hairline bg-card p-8 text-center">
            <p className="text-sm text-muted">You haven&apos;t placed any orders yet.</p>
            <ButtonLink href="/catalog" variant="secondary" className="mt-4">
              Browse the vault
            </ButtonLink>
          </div>
        ) : (
          <ul className="divide-y divide-hairline overflow-hidden rounded-xl border border-hairline bg-card">
            {orders.slice(0, 5).map((o) => (
              <li key={o.id} className="flex items-center justify-between gap-4 px-5 py-4">
                <div className="min-w-0">
                  <p className="font-mono text-sm text-ink">{o.orderNumber}</p>
                  <p className="truncate text-xs text-muted">
                    {o.items.length} item{o.items.length === 1 ? "" : "s"} ·{" "}
                    {new Date(o.createdAt).toLocaleDateString("en-GB")}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="rounded-full border border-hairline bg-panel px-2.5 py-0.5 text-[11px] capitalize text-muted">
                    {o.status}
                  </span>
                  <Price pence={o.totalPence} className="shrink-0" />
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="grid gap-6 rounded-xl border border-hairline bg-card p-6 sm:grid-cols-2">
        <div>
          <h3 className="eyebrow mb-3">Account details</h3>
          <dl className="space-y-2 text-sm">
            <Row label="Name" value={`${user.firstName} ${user.lastName}`} />
            <Row label="Email" value={user.email} />
            <Row label="Phone" value={user.phone} />
          </dl>
        </div>
        <div>
          <h3 className="eyebrow mb-3">Delivery address</h3>
          <address className="text-sm not-italic leading-relaxed text-muted">
            {user.street}
            <br />
            {user.city}, {user.postalCode}
            <br />
            {user.country}
          </address>
        </div>
      </section>

      {transactions.length > 0 && (
        <p className="text-xs text-muted">
          {transactions.length} transaction{transactions.length === 1 ? "" : "s"} recorded.{" "}
          <Link href="/account/orders" className="text-primary hover:underline">
            See history
          </Link>
        </p>
      )}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-muted">{label}</dt>
      <dd className="truncate text-ink">{value}</dd>
    </div>
  );
}
