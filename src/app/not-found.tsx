import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-24 text-center">
      <Logo variant="mark" size={48} />
      <p className="eyebrow mt-6">Error 404</p>
      <h1 className="mt-2 font-display text-3xl font-semibold text-ink">
        This facet of the vault is empty
      </h1>
      <p className="mt-3 text-muted">
        The page you&apos;re looking for doesn&apos;t exist or has moved. Let&apos;s get you back to
        the skins.
      </p>
      <div className="mt-8 flex gap-3">
        <ButtonLink href="/">Back to home</ButtonLink>
        <ButtonLink href="/catalog" variant="secondary">
          Browse the vault
        </ButtonLink>
      </div>
      <div className="mt-10 flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm text-muted">
        <Link href="/game/cs2" className="hover:text-ink">CS2</Link>
        <Link href="/game/tf2" className="hover:text-ink">TF2</Link>
        <Link href="/game/rust" className="hover:text-ink">Rust</Link>
        <Link href="/faq" className="hover:text-ink">FAQ</Link>
        <Link href="/contact" className="hover:text-ink">Contact</Link>
      </div>
    </div>
  );
}
