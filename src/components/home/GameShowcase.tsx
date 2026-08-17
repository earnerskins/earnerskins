import Link from "next/link";
import { getGames, getItemsByGame } from "@/lib/queries";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ItemRail } from "@/components/catalog/ItemGrid";

export function GameShowcase() {
  const games = getGames();
  return (
    <>
      {games.map((game, idx) => {
        const items = getItemsByGame(game.slug).slice(0, 8);
        return (
          <Section key={game.slug} band={idx % 2 === 1}>
            <SectionHeading
              eyebrow={game.tagline}
              title={`${game.name} skins`}
              href={`/game/${game.slug}`}
              hrefLabel={`Shop ${game.name}`}
            />
            <div className="mb-4 flex flex-wrap gap-2">
              {game.categories.map((c) => (
                <Link
                  key={c.slug}
                  href={`/game/${game.slug}?category=${c.slug}`}
                  className="focus-ring rounded-lg border border-hairline bg-card px-3 py-1.5 text-xs text-muted hover:border-primary/50 hover:text-ink"
                >
                  {c.name}
                </Link>
              ))}
            </div>
            <ItemRail items={items} />
          </Section>
        );
      })}
    </>
  );
}
