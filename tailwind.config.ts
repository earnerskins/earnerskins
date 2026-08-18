import type { Config } from "tailwindcss";

/**
 * EarnerSkins "Prismatic Vault" design tokens.
 * All colors live here — no ad-hoc hex values in components.
 * Dark is primary; a `.light` class variant swaps the base tokens.
 */
// Tokens are CSS variables (hex), so Tailwind can't inject an alpha channel the
// usual way. Wrapping in color-mix makes opacity modifiers (e.g. bg-panel/98)
// resolve correctly; with no modifier <alpha-value> defaults to 1 (fully opaque).
const alpha = (v: string) => `color-mix(in srgb, ${v} calc(<alpha-value> * 100%), transparent)`;

const config: Config = {
  darkMode: ["class", '[data-theme="light"]'],
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Vault surfaces (dark, primary)
        base: alpha("var(--c-base)"),
        panel: alpha("var(--c-panel)"),
        card: alpha("var(--c-card)"),
        hairline: alpha("var(--c-hairline)"),
        // Text
        ink: alpha("var(--c-ink)"),
        muted: alpha("var(--c-muted)"),
        // Brand primary — acid mint
        primary: {
          DEFAULT: "#B8F04A",
          tint: "rgba(184,240,74,0.12)",
          soft: "rgba(184,240,74,0.22)",
          ink: "#0C1400",
        },
        // Semantics
        success: "#4ADE80",
        danger: "#F87171",
        warning: "#FBBF24",
        // Per-game accent chips (muted, quieter than rarity)
        game: {
          cs2: "#E8A33D",
          tf2: "#B8703B",
          rust: "#9C6B4A",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "ui-monospace", "monospace"],
      },
      backgroundImage: {
        // Signature holo-foil gradient — used sparingly.
        foil: "linear-gradient(100deg, #A78BFA 0%, #22D3EE 38%, #6EE7B7 68%, #A78BFA 100%)",
        "foil-sweep":
          "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.35) 48%, rgba(167,139,250,0.35) 52%, transparent 70%)",
        grain:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E\")",
      },
      boxShadow: {
        vault: "0 1px 0 0 rgba(255,255,255,0.03) inset, 0 12px 40px -12px rgba(0,0,0,0.6)",
        "glow-sm": "0 0 24px -6px var(--rarity-glow, transparent)",
        "glow-lg": "0 0 60px -10px var(--rarity-glow, transparent)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      letterSpacing: {
        eyebrow: "0.22em",
      },
      keyframes: {
        "foil-sweep": {
          "0%": { transform: "translateX(-120%)" },
          "100%": { transform: "translateX(120%)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "pulse-glow": {
          "0%,100%": { opacity: "0.65" },
          "50%": { opacity: "1" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "orb-float": {
          "0%,100%": { transform: "translate3d(0,0,0) scale(1)" },
          "50%": { transform: "translate3d(0,-24px,0) scale(1.08)" },
        },
        "beam-drift": {
          "0%": { transform: "translateX(-8%) rotate(0deg)", opacity: "0.5" },
          "50%": { opacity: "0.9" },
          "100%": { transform: "translateX(8%) rotate(4deg)", opacity: "0.5" },
        },
        "foil-pan": {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "foil-sweep": "foil-sweep 1.1s ease-in-out",
        "fade-up": "fade-up 0.5s ease-out both",
        shimmer: "shimmer 1.6s linear infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        marquee: "marquee 40s linear infinite",
        "marquee-slow": "marquee 150s linear infinite",
        "orb-float": "orb-float 12s ease-in-out infinite",
        "beam-drift": "beam-drift 14s ease-in-out infinite",
        "foil-pan": "foil-pan 6s linear infinite",
        "spin-slow": "spin-slow 22s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
