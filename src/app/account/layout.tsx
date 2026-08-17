import { redirect } from "next/navigation";
import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { logoutAction } from "@/actions/auth";
import { Price } from "@/components/ui/Price";

const NAV = [
  { href: "/account", label: "Dashboard" },
  { href: "/account/orders", label: "Orders & history" },
  { href: "/account/wallet", label: "Wallet" },
  { href: "/wishlist", label: "Wishlist" },
];

export default async function AccountLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login?next=/account");

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8">
        <p className="eyebrow mb-2">Your account</p>
        <h1 className="font-display text-3xl font-semibold text-ink">
          Welcome back, {user.firstName}
        </h1>
      </div>

      <div className="grid gap-8 md:grid-cols-[220px_1fr]">
        <aside className="md:sticky md:top-24 md:self-start">
          <div className="mb-4 rounded-xl border border-hairline bg-card p-4">
            <p className="text-xs text-muted">Available balance</p>
            <Price pence={user.balancePence} size="lg" className="mt-1 block text-primary" />
            <Link
              href="/account/wallet"
              className="focus-ring mt-3 inline-block text-xs text-primary hover:underline"
            >
              Top up →
            </Link>
          </div>

          <nav aria-label="Account" className="rounded-xl border border-hairline bg-card p-2">
            <ul className="space-y-1">
              {NAV.map((n) => (
                <li key={n.href}>
                  <Link
                    href={n.href}
                    className="focus-ring block rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:bg-panel hover:text-ink"
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
            <form action={logoutAction} className="mt-1 border-t border-hairline pt-1">
              <button
                type="submit"
                className="focus-ring block w-full rounded-lg px-3 py-2 text-left text-sm text-muted transition-colors hover:bg-panel hover:text-danger"
              >
                Sign out
              </button>
            </form>
          </nav>
        </aside>

        <div className="min-w-0">{children}</div>
      </div>
    </div>
  );
}
