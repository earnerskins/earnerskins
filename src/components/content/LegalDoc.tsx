import type { ReactNode } from "react";
import { COMPANY } from "@/lib/config";

export const LEGAL_EFFECTIVE_DATE = "18 August 2026";

export function LegalDoc({
  title,
  intro,
  effectiveDate = LEGAL_EFFECTIVE_DATE,
  children,
}: {
  title: string;
  intro?: string;
  effectiveDate?: string;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <header className="mb-8 border-b border-hairline pb-6">
        <p className="eyebrow mb-2">Legal</p>
        <h1 className="font-display text-3xl font-semibold text-ink md:text-4xl">{title}</h1>
        {intro && <p className="mt-3 text-muted">{intro}</p>}
        <p className="mt-4 text-xs text-muted">Effective date: {effectiveDate}</p>
        <p className="mt-1 text-xs text-muted">
          {COMPANY.legalName} · Company number {COMPANY.regNumber} · Registered in England and Wales ·{" "}
          {COMPANY.address}
        </p>
      </header>
      <div className="space-y-6 text-sm leading-relaxed text-muted [&_a]:text-primary [&_a:hover]:underline [&_h2]:font-display [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-ink [&_li]:ml-4 [&_li]:list-disc [&_ul]:space-y-1.5">
        {children}
      </div>
      <footer className="mt-10 border-t border-hairline pt-6 text-xs text-muted">
        Questions about this policy? Email{" "}
        <a href={`mailto:${COMPANY.email}`} className="text-primary hover:underline">
          {COMPANY.email}
        </a>
        .
      </footer>
    </div>
  );
}

export function Clause({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <section className="space-y-2.5">
      <h2>{heading}</h2>
      {children}
    </section>
  );
}

/** A paragraph that opens with a bold lead-in term, e.g. "Acceptance. …". */
export function Lead({ term, children }: { term: string; children: ReactNode }) {
  return (
    <p>
      <strong className="text-ink">{term}</strong> {children}
    </p>
  );
}
