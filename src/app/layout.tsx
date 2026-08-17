import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { COMPANY } from "@/lib/config";
import { SITE_URL, organizationJsonLd } from "@/lib/seo";
import { AppProviders } from "@/components/providers/AppProviders";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { CookieConsent } from "@/components/layout/CookieConsent";
import { getCurrentUser } from "@/lib/auth";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${COMPANY.brand} — Buy CS2, Team Fortress 2 & Rust Skins`,
    template: `%s · ${COMPANY.brand}`,
  },
  description:
    "EarnerSkins is a store for game skins across CS2, Team Fortress 2 and Rust. Browse a curated vault of finishes, knives, Unusuals and more with instant delivery.",
  applicationName: COMPANY.brand,
  keywords: [
    "CS2 skins",
    "Counter-Strike 2 skins",
    "Team Fortress 2 skins",
    "TF2 unusuals",
    "Rust skins",
    "buy game skins",
    "instant skin delivery",
    "skin marketplace",
    COMPANY.brand,
  ],
  authors: [{ name: COMPANY.brand, url: SITE_URL }],
  creator: COMPANY.brand,
  publisher: COMPANY.legalName,
  alternates: { canonical: "/" },
  category: "shopping",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    type: "website",
    siteName: COMPANY.brand,
    title: `${COMPANY.brand} — Buy CS2, Team Fortress 2 & Rust Skins`,
    description:
      "A curated vault of CS2, Team Fortress 2 and Rust skins with instant delivery to your Steam account.",
    url: SITE_URL,
    locale: "en_GB",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: `${COMPANY.brand} — Buy CS2, Team Fortress 2 & Rust Skins`,
    description:
      "A curated vault of CS2, Team Fortress 2 and Rust skins with instant delivery to your Steam account.",
    images: ["/opengraph-image"],
  },
};

export const viewport: Viewport = {
  themeColor: "#101114",
  colorScheme: "dark light",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <Script
          id="org-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
        />
        <AppProviders>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-ink"
          >
            Skip to content
          </a>
          <SiteHeader user={user} />
          <main id="main" className="min-h-[60vh]">
            {children}
          </main>
          <SiteFooter />
          <CookieConsent />
        </AppProviders>
      </body>
    </html>
  );
}
