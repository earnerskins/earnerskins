import type { Metadata } from "next";
import { getCurrentUser } from "@/lib/auth";
import { getSteamLink } from "@/lib/steam-link";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Complete your EarnerSkins order with secure card payment or account balance.",
  robots: { index: false, follow: false },
};

export default async function CheckoutPage() {
  const [user, steam] = await Promise.all([getCurrentUser(), getSteamLink()]);
  const safe = user
    ? {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        balancePence: user.balancePence,
      }
    : null;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <header className="mb-6">
        <p className="eyebrow mb-2">Secure checkout</p>
        <h1 className="font-display text-3xl font-semibold text-ink">Checkout</h1>
      </header>
      <CheckoutForm user={safe} steam={steam} />
    </div>
  );
}
