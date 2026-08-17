import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { ButtonLink } from "@/components/ui/Button";
import { COMPANY, POLICIES, NOT_AFFILIATED_DISCLAIMER } from "@/lib/config";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description: "EarnerSkins is a curated store for game skins across CS2, Team Fortress 2 and Rust.",
  path: "/about",
});

const VALUES = [
  {
    title: "Curated, not crowded",
    body: "We hand-pick finishes worth owning across every game, so the vault stays high-signal instead of an endless wall of duplicates.",
  },
  {
    title: "Transparent pricing",
    body: "The price you see is the price you pay, in your chosen currency. No hidden fees, ever.",
  },
  {
    title: "Instant, secure delivery",
    body: `${POLICIES.deliveryPromise} on every order, with card payments secured to PCI DSS standards.`,
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <header className="mb-10">
        <p className="eyebrow mb-2">Our story</p>
        <h1 className="font-display text-3xl font-semibold text-ink md:text-4xl">
          A collector&apos;s vault for game skins
        </h1>
      </header>

      <div className="space-y-5 text-[15px] leading-relaxed text-ink/90">
        <p>
          EarnerSkins was built for players who care about how their loadout looks. We are a store —
          not a marketplace — which means every skin you see is sold by us directly, curated for
          quality, and delivered instantly to your account.
        </p>
        <p>
          We cover three games: CS2, Team Fortress 2 and Rust. Each has its own categories and rarity
          scale, rendered as light and glow so the finishes that matter stand out. Whether you are
          chasing a low-float knife, an Unusual effect or a limited Rust finish, the vault is
          designed to help you find it fast and buy it with confidence.
        </p>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {VALUES.map((v) => (
          <div key={v.title} className="rounded-xl border border-hairline bg-card p-5">
            <h2 className="font-display text-base font-semibold text-ink">{v.title}</h2>
            <p className="mt-2 text-sm text-muted">{v.body}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-xl border border-hairline bg-card p-6 text-sm text-muted">
        <p className="eyebrow mb-2">The company</p>
        <p className="text-ink">{COMPANY.legalName}</p>
        <p>{COMPANY.address}</p>
        <p>Company registration: {COMPANY.regNumber}</p>
        <p className="mt-3 text-xs leading-relaxed">{NOT_AFFILIATED_DISCLAIMER}</p>
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        <ButtonLink href="/catalog">Browse the vault</ButtonLink>
        <ButtonLink href="/contact" variant="secondary">
          Contact us
        </ButtonLink>
      </div>
    </div>
  );
}
