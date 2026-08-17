import type { Metadata } from "next";
import { getCurrentUser } from "@/lib/auth";
import { getUserTransactions } from "@/lib/account-queries";
import { Price } from "@/components/ui/Price";
import { PaymentMarks } from "@/components/ui/PaymentMarks";
import { TopUpForm } from "@/components/account/TopUpForm";

export const metadata: Metadata = {
  title: "Wallet",
  robots: { index: false, follow: false },
};

export default async function WalletPage() {
  const user = await getCurrentUser();
  if (!user) return null;
  const transactions = await getUserTransactions(user.id);

  return (
    <div className="space-y-8">
      <div className="rounded-xl border border-hairline bg-card p-6">
        <p className="text-xs text-muted">Current balance</p>
        <Price pence={user.balancePence} size="lg" className="mt-1 block text-primary" />
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <section className="rounded-xl border border-hairline bg-card p-6">
          <h2 className="font-display text-lg font-semibold text-ink">Top up your balance</h2>
          <p className="mt-1 mb-5 text-sm text-muted">
            Add funds to check out instantly on your next purchase.
          </p>
          <TopUpForm />
          <div className="mt-5 border-t border-hairline pt-4">
            <p className="mb-2 text-xs text-muted">Secured card payments</p>
            <PaymentMarks />
          </div>
        </section>

        <section>
          <h2 className="mb-4 font-display text-lg font-semibold text-ink">Recent activity</h2>
          {transactions.length === 0 ? (
            <div className="rounded-xl border border-hairline bg-card p-8 text-center">
              <p className="text-sm text-muted">No transactions yet.</p>
            </div>
          ) : (
            <ul className="divide-y divide-hairline overflow-hidden rounded-xl border border-hairline bg-card">
              {transactions.map((t) => (
                <li key={t.id} className="flex items-center justify-between gap-4 px-5 py-3.5">
                  <div className="min-w-0">
                    <p className="truncate text-sm text-ink">{t.description}</p>
                    <p className="text-xs text-muted">
                      {new Date(t.createdAt).toLocaleDateString("en-GB")}
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
    </div>
  );
}
