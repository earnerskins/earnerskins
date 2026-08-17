"use client";

import { useEffect, useRef, useState } from "react";
import { getCatalogStats, getDeals } from "@/lib/queries";
import { Section } from "@/components/ui/Section";

const STATS = (() => {
  const s = getCatalogStats();
  return [
    { value: s.items, suffix: "", label: "Skins in the vault" },
    { value: getDeals().length, suffix: "", label: "Live deals" },
    { value: s.rarities, suffix: "", label: "Rarity tiers mapped" },
    { value: 24, suffix: "/7", label: "Support, every day" },
  ];
})();

export function StatsBand() {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Section band>
      <div ref={ref} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((s) => (
          <div
            key={s.label}
            className="relative overflow-hidden rounded-xl border border-hairline bg-card p-6 text-center"
          >
            <span className="pointer-events-none absolute inset-x-6 top-0 h-px bg-foil opacity-60" />
            <p className="font-display text-4xl font-bold text-ink">
              <Counter target={s.value} run={shown} />
              <span className="text-primary">{s.suffix}</span>
            </p>
            <p className="mt-1 text-sm text-muted">{s.label}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Counter({ target, run }: { target: number; run: boolean }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!run) return;
    const duration = 1100;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, target]);
  return <>{n.toLocaleString("en-GB")}</>;
}
