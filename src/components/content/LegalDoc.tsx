import type { ReactNode } from "react";
import { COMPANY } from "@/lib/config";

export function LegalDoc({
  title,
  intro,
  children,
}: {
  title: string;
  intro?: string;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <header className="mb-8 border-b border-hairline pb-6">
        <p className="eyebrow mb-2">Legal</p>
        <h1 className="font-display text-3xl font-semibold text-ink md:text-4xl">{title}</h1>
        {intro && <p className="mt-3 text-muted">{intro}</p>}
        <p className="mt-4 text-xs text-muted">
          {COMPANY.legalName} · {COMPANY.address} · Company registration {COMPANY.regNumber}
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
