/**
 * Single source of truth for company data & business values.
 * Every page, legal doc, footer, and checkout reads from here so numbers
 * never diverge. Replace the placeholders when real details are available.
 */
export const COMPANY = {
  brand: "EarnerSkins",
  legalName: "SENIOR EARNER LTD",
  address: "20 Wenlock Road, London, England, N1 7GU",
  regNumber: "15605122",
  email: "info@earnerskins.com",
  phone: "+44 7474 626593",
  supportHours: "24/7",
} as const;

/** Consistent business promises — referenced everywhere. */
export const POLICIES = {
  deliveryPromise: "Instant delivery",
  deliveryDetail: "Digital skins are delivered to your account instantly after payment.",
  refundWindowDays: 14,
  serviceFeePence: 0, // no separate service fee; kept here so it's identical everywhere
  supportHours: COMPANY.supportHours,
} as const;

/**
 * Countries excluded from registration (sanctions / compliance).
 * Kept as a config constant so it's trivial to extend.
 */
export const EXCLUDED_COUNTRIES = ["Russia", "Belarus", "Iran", "North Korea"] as const;

/** Region defaults — project is UK-first (GBP primary, +44 phones). */
export const REGION = {
  phoneCode: "+44",
  phonePlaceholder: "+44 7700 900000",
  primaryCurrency: "GBP" as const,
} as const;

export const NOT_AFFILIATED_DISCLAIMER =
  "EarnerSkins is an independent store and is not affiliated with, endorsed by, or sponsored by Valve Corporation or Facepunch Studios. All game names, trademarks, and images are the property of their respective owners.";
