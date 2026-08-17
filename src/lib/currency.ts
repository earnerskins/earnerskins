/**
 * Currency system. GBP is the base/primary; all prices are stored in pence GBP.
 * Switching currency in the header converts + reformats prices everywhere.
 */
export type CurrencyCode = "GBP" | "EUR" | "USD";

export interface CurrencyMeta {
  code: CurrencyCode;
  symbol: string;
  locale: string;
  label: string;
  /** Units of this currency per 1 GBP. */
  rate: number;
}

export const CURRENCIES: Record<CurrencyCode, CurrencyMeta> = {
  GBP: { code: "GBP", symbol: "£", locale: "en-GB", label: "British Pound", rate: 1 },
  EUR: { code: "EUR", symbol: "€", locale: "en-IE", label: "Euro", rate: 1.17 },
  USD: { code: "USD", symbol: "$", locale: "en-US", label: "US Dollar", rate: 1.27 },
};

export const CURRENCY_ORDER: CurrencyCode[] = ["GBP", "EUR", "USD"];

/** Convert a base GBP pence amount to a display currency and format it. */
export function formatPrice(pence: number, code: CurrencyCode): string {
  const meta = CURRENCIES[code];
  const value = (pence / 100) * meta.rate;
  const safe = Number.isFinite(value) ? value : 0;
  return new Intl.NumberFormat(meta.locale, {
    style: "currency",
    currency: meta.code,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(safe);
}

/** Convert a user-entered display-currency amount back to base GBP pence. */
export function toBasePence(amount: number, code: CurrencyCode): number {
  const meta = CURRENCIES[code];
  if (!Number.isFinite(amount) || amount < 0) return 0;
  return Math.round((amount / meta.rate) * 100);
}
