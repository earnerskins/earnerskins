import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { ContactForm } from "@/components/content/ContactForm";
import { COMPANY, POLICIES } from "@/lib/config";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description: `Get in touch with the EarnerSkins team. Support available ${POLICIES.supportHours}.`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <header className="mb-8">
        <p className="eyebrow mb-2">We&apos;re here to help</p>
        <h1 className="font-display text-3xl font-semibold text-ink md:text-4xl">Contact us</h1>
        <p className="mt-2 text-muted">
          Questions about an order, delivery or your account? Reach out and we&apos;ll get back to
          you quickly.
        </p>
      </header>

      <div className="grid gap-8 md:grid-cols-[1fr_280px]">
        <ContactForm />

        <aside className="space-y-6">
          <div className="rounded-xl border border-hairline bg-card p-5">
            <p className="eyebrow mb-3">Direct</p>
            <dl className="space-y-3 text-sm">
              <div>
                <dt className="text-muted">Email</dt>
                <dd>
                  <a href={`mailto:${COMPANY.email}`} className="text-primary hover:underline">
                    {COMPANY.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-muted">Support hours</dt>
                <dd className="text-ink">{POLICIES.supportHours}</dd>
              </div>
            </dl>
          </div>

          <div className="rounded-xl border border-hairline bg-card p-5 text-sm">
            <p className="eyebrow mb-3">Registered office</p>
            <address className="not-italic leading-relaxed text-muted">
              {COMPANY.legalName}
              <br />
              {COMPANY.address}
            </address>
          </div>

          <p className="text-xs text-muted">
            Looking for quick answers? Check the{" "}
            <Link href="/faq" className="text-primary hover:underline">
              FAQ
            </Link>
            .
          </p>
        </aside>
      </div>
    </div>
  );
}
