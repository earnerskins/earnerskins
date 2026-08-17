import { EXCLUDED_COUNTRIES } from "./config";

// A practical country list. Excluded countries are filtered out at export.
const ALL_COUNTRIES = [
  "United Kingdom", "Ireland", "United States", "Canada", "Australia", "New Zealand",
  "Austria", "Belgium", "Bulgaria", "Croatia", "Cyprus", "Czechia", "Denmark",
  "Estonia", "Finland", "France", "Germany", "Greece", "Hungary", "Iceland",
  "Italy", "Latvia", "Liechtenstein", "Lithuania", "Luxembourg", "Malta",
  "Netherlands", "Norway", "Poland", "Portugal", "Romania", "Slovakia", "Slovenia",
  "Spain", "Sweden", "Switzerland", "Ukraine", "Japan", "South Korea", "Singapore",
  "Hong Kong", "Taiwan", "Malaysia", "Thailand", "Philippines", "Indonesia", "India",
  "United Arab Emirates", "Saudi Arabia", "Qatar", "Israel", "Turkey", "South Africa",
  "Brazil", "Argentina", "Chile", "Colombia", "Mexico", "Peru", "Uruguay",
] as const;

const excluded = new Set<string>(EXCLUDED_COUNTRIES);

export const COUNTRIES: string[] = ALL_COUNTRIES.filter((c) => !excluded.has(c)).sort();

export function isCountryAllowed(name: string): boolean {
  return COUNTRIES.includes(name);
}
