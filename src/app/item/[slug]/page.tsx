import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Script from "next/script";
import { getItemBySlug, getSimilarItems } from "@/lib/queries";
import { ITEMS } from "@/lib/catalog-data";
import { pageMetadata, SITE_URL } from "@/lib/seo";
import { COMPANY, POLICIES } from "@/lib/config";
import { GameChip } from "@/components/ui/Badge";
import { PriceWithOld } from "@/components/ui/Price";
import { AddToCartButton } from "@/components/catalog/AddToCartButton";
import { WishlistButton } from "@/components/catalog/WishlistButton";
import { ItemGrid } from "@/components/catalog/ItemGrid";
import { Section, SectionHeading } from "@/components/ui/Section";

export function generateStaticParams() {
  return ITEMS.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = getItemBySlug(slug);
  if (!item) return {};
  return pageMetadata({
    title: item.name,
    description: `${item.name} — ${item.rarityName} ${item.gameName} skin. ${item.description}`,
    path: `/item/${slug}`,
    image: item.imageUrl,
  });
}

export default async function ItemPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getItemBySlug(slug);
  if (!item) notFound();
  const similar = getSimilarItems(item);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: item.name,
    description: item.description,
    image: `${SITE_URL}${item.imageUrl}`,
    category: `${item.gameName} / ${item.categoryName}`,
    brand: { "@type": "Brand", name: COMPANY.brand },
    offers: {
      "@type": "Offer",
      priceCurrency: "GBP",
      price: (item.pricePence / 100).toFixed(2),
      availability: "https://schema.org/InStock",
      seller: { "@type": "Organization", name: COMPANY.legalName },
    },
  };

  const readouts: [string, string][] = [
    ["Game", item.gameName],
    ["Category", item.categoryName],
    ["Rarity", item.rarityName],
  ];
  if (item.hasWear && item.wear) readouts.push(["Wear", item.wear]);
  if (item.floatValue != null) readouts.push(["Float", item.floatValue.toFixed(6)]);
  if (item.pattern != null) readouts.push(["Pattern", String(item.pattern)]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <Script
        id="product-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav className="mb-6 flex items-center gap-2 text-xs text-muted" aria-label="Breadcrumb">
        <Link href="/catalog" className="hover:text-ink">Catalog</Link>
        <span>/</span>
        <Link href={`/game/${item.gameSlug}`} className="hover:text-ink">{item.gameName}</Link>
        <span>/</span>
        <span className="text-ink">{item.name}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-2">
        <div
          className="rarity-stage foil-card facet-cut relative overflow-hidden rounded-2xl border bg-card p-6 shadow-vault"
          style={{ borderColor: `${item.rarityGlow}55`, ["--rarity-glow" as string]: item.rarityGlow }}
        >
          <span className="absolute inset-x-0 top-0 h-1" style={{ background: item.rarityGlow }} aria-hidden />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={item.imageUrl}
            alt={`${item.name} — ${item.rarityName} ${item.gameName} ${item.categoryName}`}
            className="mx-auto aspect-[4/3] w-full rounded-xl object-cover"
          />
        </div>

        <div>
          <div className="flex items-center gap-2">
            <GameChip game={item.gameSlug} />
            <span className="font-mono text-[11px] uppercase tracking-wide" style={{ color: item.rarityGlow }}>
              {item.rarityName}
            </span>
            {item.isNew && (
              <span className="rounded-md border border-primary/30 bg-primary-tint px-1.5 py-0.5 font-mono text-[10px] uppercase text-primary">
                New
              </span>
            )}
          </div>
          <h1 className="mt-2 font-display text-3xl font-semibold text-ink">{item.name}</h1>
          <p className="mt-3 text-muted">{item.description}</p>

          <div className="mt-6 flex items-center gap-4">
            <PriceWithOld pence={item.pricePence} oldPence={item.oldPricePence} size="lg" />
            <span className="inline-flex items-center gap-1.5 rounded-md border border-success/30 bg-success/10 px-2 py-1 text-xs text-success">
              <span className="h-1.5 w-1.5 rounded-full bg-success" /> {POLICIES.deliveryPromise}
            </span>
          </div>

          <div className="mt-6 flex gap-3">
            <AddToCartButton item={item} className="flex-1" />
            <WishlistButton slug={item.slug} className="h-auto w-12" />
          </div>

          {/* Full data readout */}
          <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-hairline bg-hairline">
            {readouts.map(([k, v]) => (
              <div key={k} className="bg-card px-4 py-3">
                <dt className="font-mono text-[10px] uppercase tracking-wide text-muted">{k}</dt>
                <dd className="mt-0.5 font-mono text-sm text-ink">{v}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-6 rounded-xl border border-hairline bg-panel p-4 text-xs text-muted">
            Sold by {COMPANY.legalName}. Digital delivery to your account is instant after payment.
            Questions? <Link href="/contact" className="text-primary hover:underline">Contact support</Link> ({COMPANY.supportHours}).
          </div>
        </div>
      </div>

      {similar.length > 0 && (
        <Section className="!px-0">
          <SectionHeading
            eyebrow="You may also like"
            title={`More ${item.gameName} skins`}
            href={`/game/${item.gameSlug}`}
          />
          <ItemGrid items={similar} />
        </Section>
      )}
    </div>
  );
}
