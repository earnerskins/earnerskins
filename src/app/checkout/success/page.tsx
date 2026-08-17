import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { ClearCart } from "@/components/checkout/ClearCart";
import { COMPANY, POLICIES } from "@/lib/config";

export const metadata: Metadata = {
  title: "Order confirmed",
  robots: { index: false, follow: false },
};

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ order?: string }>;
}) {
  const { order } = await searchParams;

  return (
    <div className="mx-auto max-w-xl px-4 py-16 text-center">
      <ClearCart />

      <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-primary/40 bg-primary-tint">
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2.5">
          <path d="M20 6 9 17l-5-5" />
        </svg>
      </div>

      <h1 className="font-display text-3xl font-semibold text-ink">Order confirmed</h1>
      <p className="mt-3 text-muted">
        Thank you for your purchase. {POLICIES.deliveryDetail}
      </p>

      {order && (
        <div className="mx-auto mt-6 inline-block rounded-xl border border-hairline bg-card px-6 py-4">
          <p className="text-xs text-muted">Order number</p>
          <p className="mt-1 font-mono text-lg text-ink">{order}</p>
        </div>
      )}

      <p className="mt-6 text-sm text-muted">
        A confirmation email with your PDF invoice is on its way. Need help? Contact us at{" "}
        <a href={`mailto:${COMPANY.email}`} className="text-primary hover:underline">
          {COMPANY.email}
        </a>{" "}
        — support {COMPANY.supportHours}.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <ButtonLink href="/account/orders">View your orders</ButtonLink>
        <ButtonLink href="/catalog" variant="secondary">
          Continue shopping
        </ButtonLink>
      </div>

      <p className="mt-6 text-xs text-muted">
        <Link href="/" className="hover:text-ink">
          Back to home
        </Link>
      </p>
    </div>
  );
}
