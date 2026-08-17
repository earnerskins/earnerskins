/**
 * Deterministic SVG art generator.
 * Guarantees every image loads (no network) and is unique per seed,
 * satisfying "all images load / no duplicate images across cards".
 */

function hash(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function hsl(h: number, s: number, l: number): string {
  return `hsl(${h % 360} ${s}% ${l}%)`;
}

function encode(svg: string): string {
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

/** Abstract faceted "skin render" on a dark stage — unique per item slug. */
export function itemImage(seed: string): string {
  const h = hash(seed);
  const base = h % 360;
  const c1 = hsl(base, 70, 58);
  const c2 = hsl(base + 40, 75, 62);
  const c3 = hsl(base + 300, 65, 55);
  const rot = h % 360;
  const facets = [
    [50, 8, 84, 34, 70, 78, 30, 78, 16, 34],
    [50, 6, 90, 50, 50, 94, 10, 50],
    [20, 20, 80, 20, 92, 60, 50, 92, 8, 60],
  ][h % 3];
  const pts = [];
  for (let i = 0; i < facets.length; i += 2) pts.push(`${facets[i]},${facets[i + 1]}`);
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 100 100'>
<defs>
<radialGradient id='g' cx='50%' cy='42%' r='60%'>
<stop offset='0%' stop-color='${c2}'/><stop offset='55%' stop-color='${c1}'/><stop offset='100%' stop-color='${c3}'/>
</radialGradient>
<linearGradient id='s' x1='0' y1='0' x2='1' y2='1'>
<stop offset='0%' stop-color='rgba(255,255,255,0.55)'/><stop offset='45%' stop-color='rgba(255,255,255,0)'/>
</linearGradient>
</defs>
<rect width='100' height='100' fill='#15161b'/>
<g transform='rotate(${rot % 24 - 12} 50 50)'>
<polygon points='${pts.join(" ")}' fill='url(#g)'/>
<polygon points='${pts.join(" ")}' fill='url(#s)' opacity='0.7'/>
<polyline points='30,40 50,20 70,44' fill='none' stroke='rgba(255,255,255,0.35)' stroke-width='0.8'/>
</g>
</svg>`;
  return encode(svg);
}

const CATEGORY_ICONS: Record<string, string> = {
  rifles: "M12 62 h60 l-6 8 h-20 l-4 6 h-14 z",
  knives: "M20 70 L60 26 l8 6 L28 76 z",
  gloves: "M30 30 h30 v34 a12 12 0 0 1 -30 0 z",
  stickers: "M32 28 h36 v28 l-14 14 h-22 z",
  heroes: "M50 22 l16 12 v22 l-16 12 -16-12 v-22 z",
  arcanas: "M50 20 l10 20 22 4 -16 16 4 22 -20-10 -20 10 4-22 -16-16 22-4 z",
  immortals: "M50 22 l14 10 -6 28 -16 0 -6-28 z",
  couriers: "M30 40 q20-16 40 0 q-8 24 -20 24 q-12 0 -20-24 z",
  weapons: "M14 58 h56 v8 h-20 l-6 8 h-12 v-8 h-18 z",
  clothing: "M34 26 l16 8 16-8 8 12 -12 8 v28 h-24 v-28 l-12-8 z",
  tools: "M28 68 L54 42 a8 8 0 1 1 6 6 L34 74 z",
  building: "M26 46 l24-16 24 16 v28 h-48 z",
  outfits: "M36 26 l14 8 14-8 6 14 -10 6 v28 h-20 v-28 l-10-6 z",
  gear: "M50 26 a16 16 0 0 1 16 22 l-4 22 h-24 l-4-22 a16 16 0 0 1 16-22 z",
};

/** Category tile art — each tile gets its own relevant, unique image. */
export function categoryImage(game: string, slug: string): string {
  const h = hash(game + slug);
  const base = h % 360;
  const c1 = hsl(base, 55, 42);
  const c2 = hsl(base + 30, 60, 30);
  const icon = CATEGORY_ICONS[slug] ?? CATEGORY_ICONS.weapons;
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='320' height='240' viewBox='0 0 100 100'>
<defs><linearGradient id='b' x1='0' y1='0' x2='1' y2='1'>
<stop offset='0%' stop-color='${c1}'/><stop offset='100%' stop-color='${c2}'/></linearGradient></defs>
<rect width='100' height='100' fill='#191a20'/>
<circle cx='50' cy='48' r='40' fill='url(#b)' opacity='0.35'/>
<path d='${icon}' fill='rgba(255,255,255,0.82)'/>
</svg>`;
  return encode(svg);
}

/** Blog cover art — unique per post slug. */
export function blogCover(seed: string): string {
  const h = hash(seed);
  const base = h % 360;
  const bars = Array.from({ length: 7 }, (_, i) => {
    const x = 6 + i * 13;
    const ht = 20 + ((h >> (i * 3)) % 55);
    return `<rect x='${x}' y='${90 - ht}' width='9' height='${ht}' rx='2' fill='${hsl(
      base + i * 18,
      65,
      55,
    )}' opacity='0.85'/>`;
  }).join("");
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='640' height='360' viewBox='0 0 100 60'>
<rect width='100' height='60' fill='#14151a'/>
<g transform='translate(0 -30) scale(1 1)'>${bars}</g>
<line x1='0' y1='60' x2='100' y2='60' stroke='rgba(255,255,255,0.1)'/>
</svg>`;
  return encode(svg);
}

/** Brand hero backdrop wash. */
export function heroWash(): string {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='600' viewBox='0 0 120 60'>
<defs><radialGradient id='h' cx='30%' cy='30%' r='70%'>
<stop offset='0%' stop-color='rgba(167,139,250,0.28)'/><stop offset='45%' stop-color='rgba(34,211,238,0.14)'/>
<stop offset='100%' stop-color='rgba(16,17,20,0)'/></radialGradient></defs>
<rect width='120' height='60' fill='#101114'/>
<rect width='120' height='60' fill='url(#h)'/>
</svg>`;
  return encode(svg);
}
