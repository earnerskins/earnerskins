"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getFeaturedItems, getHighTierVault, getCatalogStats } from "@/lib/queries";
import { GameChip, Eyebrow } from "@/components/ui/Badge";
import { PriceWithOld } from "@/components/ui/Price";
import { AddToCartButton } from "@/components/catalog/AddToCartButton";
import { ButtonLink } from "@/components/ui/Button";

const FEATURED = (() => {
  const f = getFeaturedItems();
  return (f.length >= 3 ? f : getHighTierVault(6)).slice(0, 5);
})();
const STATS = getCatalogStats();

export function Hero() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const hero = FEATURED[active];

  useEffect(() => {
    if (paused || FEATURED.length < 2) return;
    const t = setInterval(() => setActive((i) => (i + 1) % FEATURED.length), 4200);
    return () => clearInterval(t);
  }, [paused]);

  return (
    <section className="relative overflow-hidden border-b border-hairline bg-base">
      {/* Decorative prismatic backdrop */}
      <div className="prism-beams" aria-hidden />
      <div className="prism-grid absolute inset-0" aria-hidden />
      <div
        className="orb h-72 w-72 bg-[#A78BFA]"
        style={{ top: "-4rem", left: "-3rem" }}
        aria-hidden
      />
      <div
        className="orb h-64 w-64 bg-[#22D3EE]"
        style={{ bottom: "-5rem", right: "10%", animationDelay: "3s" }}
        aria-hidden
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-24">
        <div className="animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-hairline bg-panel/70 px-3 py-1 backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            <Eyebrow className="!text-ink">Live vault · instant delivery</Eyebrow>
          </span>

          <h1 className="mt-4 font-display text-4xl font-bold leading-[1.05] text-ink md:text-6xl">
            Collect skins as{" "}
            <span className="foil-text animate-foil-pan">pure light</span>.
          </h1>
          <p className="mt-4 max-w-md text-muted">
            A prismatic vault for CS2, Team Fortress 2 and Rust skins — priced live,
            delivered straight to your Steam account the moment you pay.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/catalog" size="lg">
              Explore the vault
            </ButtonLink>
            <ButtonLink href="/deals" variant="secondary" size="lg">
              View deals
            </ButtonLink>
          </div>

          {/* Live catalog stats — real numbers, no placeholders */}
          <dl className="mt-10 grid max-w-md grid-cols-3 gap-3">
            <Stat value={STATS.items} label="Skins in stock" />
            <Stat value={STATS.games} label="Games" />
            <Stat value={STATS.rarities} label="Rarity tiers" />
          </dl>
        </div>

        {/* Interactive featured showcase */}
        {hero && (
          <div
            className="relative"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {/* Slow-spinning prism ring behind the card */}
            <div
              className="animate-spin-slow absolute inset-0 -z-0 mx-auto my-auto h-[110%] w-[110%] rounded-full opacity-40 blur-2xl"
              style={{
                background:
                  "conic-gradient(from 0deg, #A78BFA, #22D3EE, #B8F04A, #A78BFA)",
              }}
              aria-hidden
            />

            <div
              key={hero.slug}
              className="foil-card facet-cut rarity-stage relative z-10 animate-fade-up overflow-hidden rounded-2xl border bg-card p-6 shadow-vault"
              style={{
                borderColor: `${hero.rarityGlow}55`,
                ["--rarity-glow" as string]: hero.rarityGlow,
              }}
            >
              <span
                className="absolute inset-x-0 top-0 h-1"
                style={{ background: hero.rarityGlow }}
                aria-hidden
              />
              <Link href={`/item/${hero.slug}`} className="focus-ring block">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={hero.imageUrl}
                  alt={`${hero.name} — featured ${hero.gameName} skin`}
                  className="mx-auto aspect-[4/3] w-full rounded-xl object-cover"
                />
              </Link>
              <div className="mt-4 flex items-center gap-2">
                <GameChip game={hero.gameSlug} />
                <span
                  className="font-mono text-[11px] uppercase tracking-wide"
                  style={{ color: hero.rarityGlow }}
                >
                  {hero.rarityName}
                </span>
              </div>
              <h2 className="mt-1 font-display text-xl text-ink">{hero.name}</h2>
              <div className="mt-3 flex items-center justify-between">
                <PriceWithOld pence={hero.pricePence} oldPence={hero.oldPricePence} size="lg" />
                <AddToCartButton item={hero} />
              </div>
            </div>

            {/* Thumbnail selector */}
            {FEATURED.length > 1 && (
              <div className="relative z-10 mt-4 flex items-center justify-center gap-2">
                {FEATURED.map((it, i) => (
                  <button
                    key={it.slug}
                    onClick={() => setActive(i)}
                    aria-label={`Show ${it.name}`}
                    aria-pressed={i === active}
                    className={`focus-ring h-12 w-14 overflow-hidden rounded-lg border transition-all ${
                      i === active
                        ? "border-primary ring-2 ring-primary/40"
                        : "border-hairline opacity-60 hover:opacity-100"
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={it.imageUrl} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <hr className="foil-divider relative" />
    </section>
  );
}

function Stat({ value, label }: { value: number; label: string }) {
  return (
    <div className="rounded-xl border border-hairline bg-panel/60 px-3 py-2.5 backdrop-blur">
      <dd className="font-display text-2xl font-semibold text-ink">
        {value.toLocaleString("en-GB")}
      </dd>
      <dt className="mt-0.5 text-[11px] text-muted">{label}</dt>
    </div>
  );
}
