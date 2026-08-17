import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

const GAME_LABEL: Record<string, string> = {
  cs2: "CS2",
  tf2: "TF2",
  rust: "Rust",
};

const GAME_COLOR: Record<string, string> = {
  cs2: "text-game-cs2 border-game-cs2/40 bg-game-cs2/10",
  tf2: "text-game-tf2 border-game-tf2/40 bg-game-tf2/10",
  rust: "text-game-rust border-game-rust/40 bg-game-rust/10",
};

export function GameChip({ game, className }: { game: string; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wide",
        GAME_COLOR[game] ?? "text-muted border-hairline",
        className,
      )}
    >
      {GAME_LABEL[game] ?? game}
    </span>
  );
}

export function RarityDot({ glow, className }: { glow: string; className?: string }) {
  return (
    <span
      className={cn("inline-block h-2 w-2 rounded-full", className)}
      style={{ backgroundColor: glow, boxShadow: `0 0 8px ${glow}` }}
      aria-hidden="true"
    />
  );
}

export function RarityBadge({
  name,
  glow,
  className,
}: {
  name: string;
  glow: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-[11px]",
        className,
      )}
      style={{ borderColor: `${glow}55`, color: glow }}
    >
      <RarityDot glow={glow} />
      {name}
    </span>
  );
}

export function Badge({
  children,
  tone = "default",
  className,
}: {
  children: ReactNode;
  tone?: "default" | "primary" | "foil" | "success" | "danger";
  className?: string;
}) {
  const tones = {
    default: "bg-card text-muted border-hairline",
    primary: "bg-primary-tint text-primary border-primary/30",
    foil: "bg-foil text-black border-transparent font-semibold",
    success: "bg-success/15 text-success border-success/30",
    danger: "bg-danger/15 text-danger border-danger/30",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-2 py-0.5 text-[11px] font-medium",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("eyebrow", className)}>{children}</p>;
}
