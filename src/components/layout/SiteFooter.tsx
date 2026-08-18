import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { PaymentMarks } from "@/components/ui/PaymentMarks";
import { COMPANY, NOT_AFFILIATED_DISCLAIMER } from "@/lib/config";

const COLUMNS = [
  {
    title: "Shop by game",
    links: [
      { label: "CS2 skins", href: "/game/cs2" },
      { label: "TF2 skins", href: "/game/tf2" },
      { label: "Rust skins", href: "/game/rust" },
      { label: "Deals", href: "/deals" },
      { label: "New arrivals", href: "/new" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "FAQ", href: "/faq" },
      { label: "Delivery", href: "/delivery" },
      { label: "Refunds", href: "/legal/refund" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms & Conditions", href: "/legal/terms" },
      { label: "Delivery Policy", href: "/legal/delivery" },
      { label: "Refund & Cancellation", href: "/legal/refund" },
      { label: "Payment Policy", href: "/legal/payment" },
      { label: "Privacy Policy", href: "/legal/privacy" },
      { label: "Cookie Policy", href: "/legal/cookies" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="section-grain border-t border-hairline bg-panel">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-5">
          <div className="md:col-span-1">
            <Logo size={26} />
            <p className="mt-3 max-w-xs text-sm text-muted">
              A collector&apos;s vault for game skins. Browse and buy across CS2, Team Fortress 2 and
              Rust with instant delivery.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <p className="eyebrow mb-3">{col.title}</p>
              <ul className="space-y-2">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="focus-ring text-sm text-muted transition-colors hover:text-ink"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-6 border-t border-hairline pt-6 md:flex-row md:items-start md:justify-between">
          <div className="text-xs leading-relaxed text-muted">
            <p className="text-ink">{COMPANY.legalName}</p>
            <p>{COMPANY.address}</p>
            <p>Company registration: {COMPANY.regNumber}</p>
            <p>
              <a href={`mailto:${COMPANY.email}`} className="hover:text-ink">
                {COMPANY.email}
              </a>{" "}
              · Support {COMPANY.supportHours}
            </p>
          </div>
          <PaymentMarks className="flex items-center gap-2 md:justify-end" />
        </div>

        <div className="mt-6 border-t border-hairline pt-6">
          <p className="max-w-3xl text-[11px] leading-relaxed text-muted">
            {NOT_AFFILIATED_DISCLAIMER}
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-muted">
            <span>© {new Date().getFullYear()} {COMPANY.legalName}. All rights reserved.</span>
            <Link href="/legal/terms" className="hover:text-ink">Terms</Link>
            <Link href="/legal/privacy" className="hover:text-ink">Privacy</Link>
            <Link href="/legal/cookies" className="hover:text-ink">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
