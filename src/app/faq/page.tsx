import type { Metadata } from "next";
import Script from "next/script";
import { pageMetadata } from "@/lib/seo";
import { FAQS } from "@/lib/faq";
import { FaqAccordion } from "@/components/ui/Accordion";

export const metadata: Metadata = pageMetadata({
  title: "FAQ",
  description: "Answers about delivery, payment, refunds and accounts at EarnerSkins.",
  path: "/faq",
});

export default function FaqPage() {
  const categories = [...new Set(FAQS.map((f) => f.category))];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <Script
        id="faq-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="mb-8">
        <p className="eyebrow mb-2">Help centre</p>
        <h1 className="font-display text-3xl font-semibold text-ink md:text-4xl">
          Frequently asked questions
        </h1>
        <p className="mt-2 text-muted">
          Everything about buying skins, delivery, payment and your account.
        </p>
      </header>

      <div className="space-y-8">
        {categories.map((cat) => (
          <section key={cat}>
            <h2 className="eyebrow mb-3">{cat}</h2>
            <FaqAccordion items={FAQS.filter((f) => f.category === cat)} />
          </section>
        ))}
      </div>
    </div>
  );
}
