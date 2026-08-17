/**
 * Pricing: SIH quotes USD; EarnerSkins stores prices in pence GBP (base currency).
 * We add a margin on top of SIH cost, then convert USD → GBP pence so that the
 * USD figure shown in the header currency switch matches our intended sell price.
 */

/** Keep in sync with CURRENCIES.USD.rate in src/lib/currency.ts. */
export const USD_PER_GBP = 1.27;

export interface PricingParams {
  /** Fractional margin, e.g. 0.07 for 7%. */
  margin: number;
  /** Absolute minimum margin in USD, e.g. 0.10. */
  minMarginAbs: number;
  usdPerGbp?: number;
}

export interface PricedResult {
  costUsd: number;
  sellUsd: number;
  pricePence: number;
  /** Set only when a genuine "below reference" deal exists. */
  oldPricePence?: number;
}

export function usdToGbpPence(usd: number, usdPerGbp = USD_PER_GBP): number {
  return Math.round((usd / usdPerGbp) * 100);
}

/**
 * Compute the customer-facing price from SIH cost.
 * `referenceUsd` (e.g. SIH `steam` price) becomes the struck-through old price
 * when it sits above our sell price — a real, defensible discount.
 */
export function priceItem(
  costUsd: number,
  referenceUsd: number | undefined,
  p: PricingParams,
): PricedResult {
  const usdPerGbp = p.usdPerGbp ?? USD_PER_GBP;
  const marginUsd = Math.max(costUsd * p.margin, p.minMarginAbs);
  const sellUsd = costUsd + marginUsd;
  const pricePence = usdToGbpPence(sellUsd, usdPerGbp);
  let oldPricePence: number | undefined;
  if (referenceUsd && referenceUsd > sellUsd * 1.02) {
    oldPricePence = usdToGbpPence(referenceUsd, usdPerGbp);
  }
  return { costUsd, sellUsd, pricePence, oldPricePence };
}
