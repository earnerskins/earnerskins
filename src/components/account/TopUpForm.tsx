"use client";

import { useActionState } from "react";
import { topUpAction, type TopUpState } from "@/actions/account";
import { useCurrency } from "@/components/providers/CurrencyProvider";
import { CURRENCIES } from "@/lib/currency";
import { Button } from "@/components/ui/Button";

const PRESETS = [10, 25, 50, 100];

export function TopUpForm() {
  const { currency } = useCurrency();
  const symbol = CURRENCIES[currency].symbol;
  const [state, action, pending] = useActionState<TopUpState, FormData>(topUpAction, {});

  return (
    <form action={action} className="space-y-4">
      <input type="hidden" name="currency" value={currency} />

      <div>
        <label htmlFor="amount" className="mb-1.5 block text-sm text-ink">
          Amount to add ({currency})
        </label>
        <div className="relative">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 font-mono text-muted">
            {symbol}
          </span>
          <input
            id="amount"
            name="amount"
            type="number"
            min="1"
            step="0.01"
            required
            placeholder="25.00"
            className="focus-ring w-full rounded-lg border border-hairline bg-panel py-2.5 pl-8 pr-3 font-mono text-ink placeholder:text-muted"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {PRESETS.map((p) => (
          <button
            key={p}
            type="button"
            onClick={(e) => {
              const input = e.currentTarget.form?.elements.namedItem("amount") as HTMLInputElement;
              if (input) input.value = String(p);
            }}
            className="focus-ring rounded-lg border border-hairline bg-panel px-3 py-1.5 text-sm text-muted transition-colors hover:border-primary/60 hover:text-ink"
          >
            {symbol}
            {p}
          </button>
        ))}
      </div>

      {state.error && (
        <p className="rounded-lg border border-danger/30 bg-danger/10 px-3 py-2 text-sm text-danger">
          {state.error}
        </p>
      )}
      {state.ok && state.message && (
        <p className="rounded-lg border border-primary/30 bg-primary-tint px-3 py-2 text-sm text-primary">
          {state.message}
        </p>
      )}

      <Button type="submit" disabled={pending} className="w-full">
        {pending ? "Processing…" : "Add funds"}
      </Button>

      <p className="text-center text-xs text-muted">
        Funds are added to your balance instantly and can be used at checkout.
      </p>
    </form>
  );
}
