import { getHighTierVault } from "@/lib/queries";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ItemGrid } from "@/components/catalog/ItemGrid";

export function HighTierVault() {
  const items = getHighTierVault(4);
  return (
    <Section>
      <div className="rounded-2xl border border-hairline bg-gradient-to-b from-card to-panel p-6 md:p-8">
        <SectionHeading
          eyebrow="Intensified glow · foil finish"
          title="High-Tier Vault"
          description="Our most valuable pieces, spotlit on the vault stage. Each carries an intensified rarity glow and the signature holo-foil sweep."
          href="/catalog?sort=price-desc"
          hrefLabel="See the vault"
        />
        <ItemGrid items={items} premium />
      </div>
    </Section>
  );
}
