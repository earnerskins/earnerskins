import { cn } from "@/lib/cn";

/**
 * EarnerSkins logo — a faceted prism/gem mark refracting a thin band of
 * iridescent light, plus a Space Grotesk wordmark.
 *
 * Variants:
 *  - horizontal (default): mark + wordmark inline
 *  - stacked: mark above wordmark
 *  - mark: glyph only
 * Tones:
 *  - foil (default): iridescent refraction band
 *  - mono: single-colour (uses currentColor)
 */
export function PrismMark({
  size = 28,
  mono = false,
  className,
}: {
  size?: number;
  mono?: boolean;
  className?: string;
}) {
  const gid = mono ? "" : "sp-foil";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {!mono && (
        <defs>
          <linearGradient id={gid} x1="4" y1="6" x2="28" y2="26" gradientUnits="userSpaceOnUse">
            <stop stopColor="#A78BFA" />
            <stop offset="0.4" stopColor="#22D3EE" />
            <stop offset="0.7" stopColor="#6EE7B7" />
            <stop offset="1" stopColor="#A78BFA" />
          </linearGradient>
        </defs>
      )}
      {/* Prism body */}
      <path
        d="M16 3 L28 25 H4 Z"
        stroke={mono ? "currentColor" : "#3A3D48"}
        strokeWidth="1.6"
        strokeLinejoin="round"
        fill={mono ? "none" : "#1D1F26"}
      />
      {/* Facet edge */}
      <path
        d="M16 3 L16 25"
        stroke={mono ? "currentColor" : "#2C2F39"}
        strokeWidth="1.2"
        opacity={mono ? 0.5 : 1}
      />
      {/* Refracted iridescent light band */}
      <path
        d="M11 15 L21 15 L24.5 22 L7.5 22 Z"
        fill={mono ? "currentColor" : `url(#${gid})`}
        opacity={mono ? 0.9 : 1}
      />
      {/* Entering light ray */}
      <path
        d="M2 11 L11 15"
        stroke={mono ? "currentColor" : "#EDEFF3"}
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Logo({
  variant = "horizontal",
  mono = false,
  size = 28,
  className,
  wordmarkClassName,
}: {
  variant?: "horizontal" | "stacked" | "mark";
  mono?: boolean;
  size?: number;
  className?: string;
  wordmarkClassName?: string;
}) {
  if (variant === "mark") {
    return <PrismMark size={size} mono={mono} className={className} />;
  }
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 leading-none",
        variant === "stacked" && "flex-col gap-1.5",
        className,
      )}
    >
      <PrismMark size={size} mono={mono} />
      <span
        className={cn(
          "font-display font-semibold tracking-tight",
          mono ? "text-current" : "text-ink",
          wordmarkClassName,
        )}
        style={{ fontSize: size * 0.72 }}
      >
        Earner<span className={mono ? "" : "foil-text"}>Skins</span>
      </span>
    </span>
  );
}
