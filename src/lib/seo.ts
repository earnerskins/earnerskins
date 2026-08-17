import type { Metadata } from "next";
import { COMPANY } from "./config";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

interface PageSeo {
  title: string;
  description: string;
  path?: string;
  image?: string;
}

/** Build per-page metadata with unique title, canonical, OG + Twitter. */
export function pageMetadata({ title, description, path = "/", image }: PageSeo): Metadata {
  const url = `${SITE_URL}${path}`;
  const ogImage = image ?? "/opengraph-image";
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} · ${COMPANY.brand}`,
      description,
      url,
      siteName: COMPANY.brand,
      images: [ogImage],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} · ${COMPANY.brand}`,
      description,
      images: [ogImage],
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "OnlineStore",
    name: COMPANY.brand,
    legalName: COMPANY.legalName,
    url: SITE_URL,
    email: COMPANY.email,
    telephone: COMPANY.phone,
    logo: `${SITE_URL}/icon.svg`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "20 Wenlock Road",
      addressLocality: "London",
      postalCode: "N1 7GU",
      addressCountry: "GB",
    },
    identifier: {
      "@type": "PropertyValue",
      propertyID: "UK Company Number",
      value: COMPANY.regNumber,
    },
  };
}
