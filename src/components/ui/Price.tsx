"use client";

import { cn } from "@/lib/cn";
import { useCurrency } from "@/components/providers/CurrencyProvider";

export function Price({
  pence,
  className,
  size = "md",
}: {
  pence: number;
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const { format } = useCurrency();
  const sizes = { sm: "text-sm", md: "text-base", lg: "text-2xl" };
  return (
    <span className={cn("font-mono tabular-nums text-ink", sizes[size], className)}>
      {format(pence)}
    </span>
  );
}

export function PriceWithOld({
  pence,
  oldPence,
  size = "md",
  className,
}: {
  pence: number;
  oldPence?: number | null;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const { format } = useCurrency();
  const sizes = { sm: "text-sm", md: "text-base", lg: "text-2xl" };
  return (
    <span className={cn("flex items-baseline gap-2", className)}>
      <span className={cn("font-mono tabular-nums font-medium text-primary", sizes[size])}>
        {format(pence)}
      </span>
      {oldPence && oldPence > pence ? (
        <span className="font-mono text-xs text-muted line-through">{format(oldPence)}</span>
      ) : null}
    </span>
  );
}
