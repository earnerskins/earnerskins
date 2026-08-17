import Link from "next/link";
import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

export function Section({
  children,
  className,
  band,
}: {
  children: ReactNode;
  className?: string;
  band?: boolean;
}) {
  return (
    <section className={cn(band && "section-grain border-y border-hairline bg-panel/40", className)}>
      <div className="mx-auto max-w-7xl px-4 py-12 md:py-16">{children}</div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  href,
  hrefLabel = "View all",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  href?: string;
  hrefLabel?: string;
}) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4">
      <div>
        {eyebrow && <p className="eyebrow mb-2">{eyebrow}</p>}
        <h2 className="font-display text-2xl font-semibold text-ink md:text-3xl">{title}</h2>
        {description && <p className="mt-2 max-w-2xl text-sm text-muted">{description}</p>}
      </div>
      {href && (
        <Link
          href={href}
          className="focus-ring shrink-0 whitespace-nowrap text-sm text-primary hover:underline"
        >
          {hrefLabel} →
        </Link>
      )}
    </div>
  );
}
