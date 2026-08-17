import { Section } from "@/components/ui/Section";

const BENEFITS = [
  {
    title: "Instant delivery",
    body: "Digital skins land in your account moments after payment — no waiting, no shipping.",
    icon: (
      <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8Z" />
    ),
  },
  {
    title: "Official store",
    body: "You buy direct from EarnerSkins. No third-party sellers, no guesswork.",
    icon: <path d="M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7l8-4Z" />,
  },
  {
    title: "Secure payment",
    body: "Card payments are processed over encrypted, PCI DSS-compliant connections.",
    icon: (
      <>
        <rect x="3" y="6" width="18" height="12" rx="2" />
        <path d="M3 10h18" />
      </>
    ),
  },
  {
    title: "24/7 support",
    body: "Questions about an order or a skin? Our team is here around the clock.",
    icon: (
      <>
        <path d="M4 12a8 8 0 0 1 16 0v5a2 2 0 0 1-2 2h-2v-6h4M8 19H6a2 2 0 0 1-2-2v-5h4v7Z" />
      </>
    ),
  },
];

export function Benefits() {
  return (
    <Section band>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {BENEFITS.map((b) => (
          <div key={b.title} className="rounded-xl border border-hairline bg-card p-5">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-tint text-primary">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
                {b.icon}
              </svg>
            </span>
            <h3 className="mt-3 font-display text-ink">{b.title}</h3>
            <p className="mt-1 text-sm text-muted">{b.body}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
