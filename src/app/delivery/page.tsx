import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { ButtonLink } from "@/components/ui/Button";
import { POLICIES, COMPANY } from "@/lib/config";

export const metadata: Metadata = pageMetadata({
  title: "Delivery",
  description: `${POLICIES.deliveryPromise} on every skin — here's how EarnerSkins delivery works.`,
  path: "/delivery",
});

const STEPS = [
  {
    title: "Place your order",
    body: "Add skins to your cart and check out with card or your account balance. The price you see is the price you pay.",
  },
  {
    title: "Instant delivery",
    body: POLICIES.deliveryDetail,
  },
  {
    title: "Enjoy in-game",
    body: "Your new skin is ready to equip. A confirmation email with a PDF invoice lands in your inbox automatically.",
  },
];

export default function DeliveryPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <header className="mb-10 text-center">
        <p className="eyebrow mb-2">How it works</p>
        <h1 className="font-display text-3xl font-semibold text-ink md:text-4xl">
          {POLICIES.deliveryPromise}, every time
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-muted">
          Skins are digital, so there is no shipping and no waiting. Here is exactly what happens
          after you buy.
        </p>
      </header>

      <ol className="grid gap-4 md:grid-cols-3">
        {STEPS.map((s, i) => (
          <li key={s.title} className="rounded-xl border border-hairline bg-card p-6">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-primary/40 bg-primary-tint font-mono text-sm text-primary">
              {i + 1}
            </span>
            <h2 className="mt-4 font-display text-lg font-semibold text-ink">{s.title}</h2>
            <p className="mt-2 text-sm text-muted">{s.body}</p>
          </li>
        ))}
      </ol>

      <div className="mt-10 grid gap-4 rounded-xl border border-hairline bg-card p-6 sm:grid-cols-3">
        <Fact label="Delivery speed" value={POLICIES.deliveryPromise} />
        <Fact label="Refund window" value={`${POLICIES.refundWindowDays} days (pre-delivery)`} />
        <Fact label="Support" value={`Available ${POLICIES.supportHours}`} />
      </div>

      <div className="mt-10 text-center">
        <p className="mb-4 text-sm text-muted">
          Questions before you buy? Our team is here {POLICIES.supportHours} at {COMPANY.email}.
        </p>
        <ButtonLink href="/catalog">Browse the vault</ButtonLink>
      </div>
    </div>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-muted">{label}</p>
      <p className="mt-1 font-medium text-ink">{value}</p>
    </div>
  );
}
