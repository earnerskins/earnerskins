"use client";

import Link from "next/link";
import { useState } from "react";
import { getGames } from "@/lib/queries";
import { Section, SectionHeading } from "@/components/ui/Section";

const GAMES = getGames();

/** Interactive rarity explorer — cross-game rarity mapped as light. */
export function RarityExplorer() {
  const [game, setGame] = useState(GAMES[0].slug);
  const current = GAMES.find((g) => g.slug === game)!;
  return (
    <Section>
      <SectionHeading
        eyebrow="Rarity as light"
        title="Explore rarity across games"
        description="Each game has its own rarity scale — we map them onto one coherent light spectrum so cross-game rarity always feels consistent."
      />
      <div className="mb-6 flex flex-wrap gap-2">
        {GAMES.map((g) => (
          <button
            key={g.slug}
            onClick={() => setGame(g.slug)}
            className={`focus-ring rounded-lg border px-3 py-1.5 text-sm ${
              game === g.slug
                ? "border-primary bg-primary-tint text-primary"
                : "border-hairline bg-card text-muted hover:text-ink"
            }`}
          >
            {g.name}
          </button>
        ))}
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {current.rarities.map((r) => (
          <Link
            key={r.slug}
            href={`/game/${game}?rarity=${r.slug}`}
            className="rarity-stage focus-ring group relative flex items-center justify-between overflow-hidden rounded-xl border border-hairline bg-card p-4 transition-transform hover:-translate-y-0.5"
            style={{ ["--rarity-glow" as string]: r.glow, borderColor: `${r.glow}33` }}
          >
            <div>
              <p className="font-display text-ink">{r.name}</p>
              <p className="font-mono text-[11px] text-muted">Tier {r.tier}</p>
            </div>
            <span
              className="h-8 w-8 rounded-full transition-all group-hover:scale-110"
              style={{ background: r.glow, boxShadow: `0 0 20px ${r.glow}` }}
            />
          </Link>
        ))}
      </div>
    </Section>
  );
}
