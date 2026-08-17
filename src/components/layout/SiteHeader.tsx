"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { Logo } from "@/components/brand/Logo";
import { getGames } from "@/lib/queries";
import { CURRENCY_ORDER, CURRENCIES } from "@/lib/currency";
import { useCurrency } from "@/components/providers/CurrencyProvider";
import { useTheme } from "@/components/providers/ThemeProvider";
import { useCart } from "@/components/providers/CartProvider";
import { useWishlist } from "@/components/providers/WishlistProvider";
import { HeaderSearch } from "./HeaderSearch";
import { MiniCart } from "./MiniCart";
import { Price } from "@/components/ui/Price";

interface HeaderUser {
  firstName: string;
  balancePence: number;
}

const REASSURANCE = [
  "Instant delivery on every skin",
  "Official store · buy direct",
  "Skins delivered to your Steam account",
  "24/7 support",
];

const GAMES = getGames();
const NAV = [
  ...GAMES.map((g) => ({ type: "game" as const, slug: g.slug, name: g.name, game: g })),
  { type: "link" as const, slug: "deals", name: "Deals", href: "/deals" },
  { type: "link" as const, slug: "new", name: "New arrivals", href: "/new" },
];

export function SiteHeader({ user }: { user: HeaderUser | null }) {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [openMega, setOpenMega] = useState<string | null>(null);
  const [drawer, setDrawer] = useState(false);
  const [reassurance, setReassurance] = useState(0);
  const pathname = usePathname();

  const { currency, setCurrency, locale } = useCurrency();
  const { theme, toggle } = useTheme();
  const { count: cartCount } = useCart();
  const { count: wishCount } = useWishlist();

  const homeHref = user ? "/account" : "/";

  useEffect(() => setDrawer(false), [pathname]);
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 8);
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? Math.min(100, (y / h) * 100) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    const t = setInterval(() => setReassurance((i) => (i + 1) % REASSURANCE.length), 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <header className="sticky top-0 z-50">
      {/* Prismatic foil top line — brand signature */}
      <div className="h-0.5 w-full bg-foil bg-[length:200%_auto] animate-foil-pan" aria-hidden />

      {/* Slim utility strip */}
      <div className="border-b border-hairline bg-panel/95 backdrop-blur">
        <div className="mx-auto flex h-9 max-w-7xl items-center justify-between px-4 text-xs">
          <p className="flex items-center gap-2 text-muted" aria-live="polite">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
            </span>
            {REASSURANCE[reassurance]}
          </p>
          <div className="flex items-center gap-3">
            <div
              className="hidden items-center gap-0.5 rounded-full border border-hairline bg-card p-0.5 sm:flex"
              role="group"
              aria-label="Currency"
            >
              {CURRENCY_ORDER.map((c) => (
                <button
                  key={c}
                  onClick={() => setCurrency(c)}
                  className={cn(
                    "focus-ring rounded-full px-2 py-0.5 font-mono text-[11px] transition-colors",
                    currency === c ? "bg-primary text-primary-ink" : "text-muted hover:text-ink",
                  )}
                  aria-pressed={currency === c}
                >
                  {CURRENCIES[c].symbol} {c}
                </button>
              ))}
            </div>
            <span className="hidden font-mono text-[11px] text-muted md:inline" aria-label="Locale">
              {locale}
            </span>
            <button
              onClick={toggle}
              className="focus-ring rounded-full border border-hairline bg-card p-1.5 text-muted hover:text-ink"
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              {theme === "dark" ? <SunIcon /> : <MoonIcon />}
            </button>
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div
        className={cn(
          "relative border-b border-hairline bg-base/85 backdrop-blur transition-shadow",
          scrolled && "shadow-vault",
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3">
          <button
            className="focus-ring -ml-1 rounded-lg border border-hairline bg-card p-1.5 text-ink lg:hidden"
            onClick={() => setDrawer(true)}
            aria-label="Open menu"
          >
            <MenuIcon />
          </button>

          <Link href={homeHref} className="focus-ring shrink-0" aria-label="EarnerSkins home">
            <Logo size={26} />
          </Link>

          <div className="hidden flex-1 md:block">
            <HeaderSearch />
          </div>

          <div className="ml-auto flex items-center gap-1.5">
            {user && (
              <Link
                href="/account/wallet"
                className="focus-ring mr-1 hidden items-center gap-2 rounded-full border border-primary/30 bg-primary-tint px-3 py-1.5 sm:flex"
              >
                <span className="font-mono text-[10px] uppercase tracking-wide text-muted">
                  Balance
                </span>
                <Price pence={user.balancePence} size="sm" className="text-primary" />
              </Link>
            )}

            <div className="flex items-center gap-0.5 rounded-full border border-hairline bg-card p-0.5">
              <Link
                href="/account"
                className="focus-ring rounded-full p-2 text-muted hover:bg-panel hover:text-ink"
                aria-label="Account"
              >
                <UserIcon />
              </Link>

              <Link
                href="/wishlist"
                className="focus-ring relative rounded-full p-2 text-muted hover:bg-panel hover:text-ink"
                aria-label={`Wishlist, ${wishCount} items`}
              >
                <HeartIcon />
                {wishCount > 0 && <Dot>{wishCount}</Dot>}
              </Link>

              <MiniCart>
                <span className="relative inline-flex rounded-full p-2 text-muted hover:bg-panel hover:text-ink">
                  <CartIcon />
                  {cartCount > 0 && <Dot>{cartCount}</Dot>}
                </span>
              </MiniCart>
            </div>
          </div>
        </div>

        {/* Mobile search */}
        <div className="px-4 pb-3 md:hidden">
          <HeaderSearch />
        </div>

        {/* Game-first nav row */}
        <nav
          aria-label="Primary"
          className="hidden border-t border-hairline lg:block"
          onMouseLeave={() => setOpenMega(null)}
        >
          <div className="mx-auto flex max-w-7xl items-center gap-1.5 px-4 py-1.5">
            {NAV.map((entry) => {
              const active =
                entry.type === "game"
                  ? pathname.startsWith(`/game/${entry.slug}`)
                  : pathname.startsWith((entry as { href: string }).href);
              if (entry.type === "link") {
                return (
                  <Link
                    key={entry.slug}
                    href={entry.href}
                    onMouseEnter={() => setOpenMega(null)}
                    className={cn(
                      "focus-ring rounded-full px-3.5 py-1.5 text-sm transition-colors",
                      active
                        ? "bg-primary-tint text-primary"
                        : "text-muted hover:bg-card hover:text-ink",
                    )}
                  >
                    {entry.name}
                  </Link>
                );
              }
              const hot = active || openMega === entry.slug;
              return (
                <div key={entry.slug} className="static">
                  <Link
                    href={`/game/${entry.slug}`}
                    onMouseEnter={() => setOpenMega(entry.slug)}
                    aria-expanded={openMega === entry.slug}
                    className={cn(
                      "focus-ring inline-flex items-center gap-1 rounded-full px-3.5 py-1.5 text-sm transition-colors",
                      hot ? "bg-primary-tint text-primary" : "text-muted hover:bg-card hover:text-ink",
                    )}
                  >
                    {entry.name}
                    <ChevronIcon className={openMega === entry.slug ? "rotate-180" : ""} />
                  </Link>
                </div>
              );
            })}
          </div>

          {openMega && <MegaPanel slug={openMega} onClose={() => setOpenMega(null)} />}
        </nav>

        {/* Scroll progress — subtle prismatic sliver at the header base */}
        <div
          className="absolute bottom-0 left-0 h-0.5 bg-foil transition-[width] duration-150"
          style={{ width: `${progress}%` }}
          aria-hidden
        />
      </div>

      {/* Mobile drawer */}
      {drawer && <MobileDrawer onClose={() => setDrawer(false)} homeHref={homeHref} />}
    </header>
  );
}

function MegaPanel({ slug, onClose }: { slug: string; onClose: () => void }) {
  const game = GAMES.find((g) => g.slug === slug);
  if (!game) return null;
  const featured = game.categories[0];
  return (
    <div
      className="absolute inset-x-0 top-full border-y border-hairline bg-panel/98 shadow-vault backdrop-blur"
      onMouseLeave={onClose}
    >
      <span className="foil-divider absolute inset-x-0 top-0" aria-hidden />
      <div className="mx-auto grid max-w-7xl grid-cols-4 gap-6 px-4 py-6">
        <div className="col-span-2">
          <p className="eyebrow mb-3">{game.name} categories</p>
          <div className="grid grid-cols-2 gap-2">
            {game.categories.map((c) => (
              <Link
                key={c.slug}
                href={`/game/${game.slug}?category=${c.slug}`}
                className="focus-ring flex items-center gap-3 rounded-lg border border-hairline bg-card p-2.5 hover:border-primary/50"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={c.imageUrl} alt="" className="h-10 w-12 rounded object-cover" />
                <span className="text-sm text-ink">{c.name}</span>
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className="eyebrow mb-3">Rarity</p>
          <div className="flex flex-col gap-1">
            {game.rarities.slice(0, 6).map((r) => (
              <Link
                key={r.slug}
                href={`/game/${game.slug}?rarity=${r.slug}`}
                className="focus-ring flex items-center gap-2 rounded px-2 py-1 text-sm text-muted hover:text-ink"
              >
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ background: r.glow, boxShadow: `0 0 6px ${r.glow}` }}
                />
                {r.name}
              </Link>
            ))}
          </div>
        </div>
        <Link
          href={`/game/${game.slug}`}
          className="focus-ring facet-cut group relative flex flex-col justify-end overflow-hidden rounded-xl border border-hairline bg-card p-4"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={featured.imageUrl}
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-40 transition-opacity group-hover:opacity-60"
          />
          <div className="relative">
            <p className="eyebrow">Featured</p>
            <p className="font-display text-ink">Shop all {game.name}</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

function MobileDrawer({
  onClose,
  homeHref,
}: {
  onClose: () => void;
  homeHref: string;
}) {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <button
        className="absolute inset-0 bg-black/60"
        aria-label="Close menu"
        onClick={onClose}
      />
      <div className="absolute inset-y-0 left-0 w-80 max-w-[85vw] overflow-y-auto border-r border-hairline bg-panel p-4">
        <span className="foil-divider absolute inset-x-0 top-0" aria-hidden />
        <div className="mb-4 flex items-center justify-between">
          <Link href={homeHref} onClick={onClose}>
            <Logo size={24} />
          </Link>
          <button onClick={onClose} className="focus-ring rounded p-1 text-muted" aria-label="Close">
            <CloseIcon />
          </button>
        </div>
        <div className="flex flex-col">
          {GAMES.map((g) => (
            <div key={g.slug} className="border-b border-hairline">
              <button
                className="focus-ring flex w-full items-center justify-between py-3 text-left text-ink"
                onClick={() => setOpen((o) => (o === g.slug ? null : g.slug))}
                aria-expanded={open === g.slug}
              >
                {g.name}
                <ChevronIcon className={open === g.slug ? "rotate-180" : ""} />
              </button>
              {open === g.slug && (
                <div className="flex flex-col gap-1 pb-3 pl-2">
                  <Link href={`/game/${g.slug}`} onClick={onClose} className="py-1.5 text-sm text-primary">
                    Shop all {g.name}
                  </Link>
                  {g.categories.map((c) => (
                    <Link
                      key={c.slug}
                      href={`/game/${g.slug}?category=${c.slug}`}
                      onClick={onClose}
                      className="py-1.5 text-sm text-muted"
                    >
                      {c.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <Link href="/deals" onClick={onClose} className="border-b border-hairline py-3 text-ink">
            Deals
          </Link>
          <Link href="/new" onClick={onClose} className="border-b border-hairline py-3 text-ink">
            New arrivals
          </Link>
          <Link href="/account" onClick={onClose} className="py-3 text-ink">
            Account
          </Link>
        </div>
      </div>
    </div>
  );
}

function Dot({ children }: { children: React.ReactNode }) {
  return (
    <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 font-mono text-[10px] font-bold text-primary-ink">
      {children}
    </span>
  );
}

/* Icons */
function icon(path: React.ReactNode) {
  return (cn?: string) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={cn}>
      {path}
    </svg>
  );
}
const MenuIcon = () => icon(<><path d="M3 6h18M3 12h18M3 18h18" /></>)("");
const CloseIcon = () => icon(<><path d="M6 6l12 12M18 6L6 18" /></>)("");
const UserIcon = () => icon(<><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>)("");
const HeartIcon = () => icon(<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8z" />)("");
const CartIcon = () => icon(<><circle cx="9" cy="20" r="1" /><circle cx="18" cy="20" r="1" /><path d="M3 4h2l2.4 12.5a1 1 0 0 0 1 .8h8.7a1 1 0 0 0 1-.8L21 8H6" /></>)("");
const SunIcon = () => icon(<><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M19 5l-1.5 1.5M6.5 17.5L5 19" /></>)("");
const MoonIcon = () => icon(<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />)("");
function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={cn("transition-transform", className)}>
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}
