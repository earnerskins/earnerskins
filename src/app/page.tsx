import { redirect } from "next/navigation";
import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { getNewItems, getDeals, getHighTierVault } from "@/lib/queries";
import { HOME_FAQS } from "@/lib/faq";
import { Hero } from "@/components/home/Hero";
import { VaultTicker } from "@/components/home/VaultTicker";
import { GameShowcase } from "@/components/home/GameShowcase";
import { HighTierVault } from "@/components/home/HighTierVault";
import { NewAndDeals } from "@/components/home/NewAndDeals";
import { RarityExplorer } from "@/components/home/RarityExplorer";
import { StatsBand } from "@/components/home/StatsBand";
import { Benefits } from "@/components/home/Benefits";
import { Section, SectionHeading } from "@/components/ui/Section";
import { FaqAccordion } from "@/components/ui/Accordion";

export default async function HomePage() {
  // A logged-in user never lands on the public homepage.
  const user = await getCurrentUser();
  if (user) redirect("/account");

  const vaultRail = getHighTierVault(10);
  const dealsRail = getDeals();

  return (
    <>
      <Hero />

      {/* Live ticker rail — decorative, pauses on hover */}
      <div className="border-b border-hairline bg-panel/40 py-4">
        <VaultTicker items={vaultRail} />
      </div>

      <GameShowcase />
      <HighTierVault />

      {/* Second, reversed ticker for movement between bands */}
      {dealsRail.length > 0 && (
        <div className="border-y border-hairline bg-base py-4">
          <VaultTicker items={dealsRail} reverse />
        </div>
      )}

      <NewAndDeals newItems={getNewItems()} deals={dealsRail} />
      <RarityExplorer />
      <StatsBand />
      <Benefits />

      <Section>
        <SectionHeading
          eyebrow="Good to know"
          title="Frequently asked"
          href="/faq"
          hrefLabel="Full FAQ"
        />
        <div className="mx-auto max-w-3xl">
          <FaqAccordion items={HOME_FAQS} />
          <p className="mt-4 text-center text-sm text-muted">
            Still have a question?{" "}
            <Link href="/contact" className="text-primary hover:underline">
              Contact our team
            </Link>
            .
          </p>
        </div>
      </Section>
    </>
  );
}
