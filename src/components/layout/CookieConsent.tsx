"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

const KEY = "earnerskins.cookie-consent";

/**
 * First-visit cookie banner. A floating "Cookie settings" button lets the user
 * reopen and change their choice at any time (persistent management).
 */
export function CookieConsent() {
  const [decided, setDecided] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(KEY);
    setDecided(!!saved);
    if (!saved) setOpen(true);
  }, []);

  const choose = (value: "all" | "essential") => {
    localStorage.setItem(KEY, value);
    setDecided(true);
    setOpen(false);
  };

  return (
    <>
      {open && (
        <div
          role="dialog"
          aria-label="Cookie consent"
          className="fixed inset-x-0 bottom-0 z-[60] border-t border-hairline bg-panel/98 backdrop-blur"
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 md:flex-row md:items-center md:justify-between">
            <p className="max-w-2xl text-sm text-muted">
              We use cookies to keep you signed in, remember your cart and currency, and improve the
              store. See our{" "}
              <Link href="/legal/cookies" className="text-primary hover:underline">
                Cookie Policy
              </Link>
              .
            </p>
            <div className="flex shrink-0 gap-2">
              <Button variant="secondary" size="sm" onClick={() => choose("essential")}>
                Essential only
              </Button>
              <Button size="sm" onClick={() => choose("all")}>
                Accept all
              </Button>
            </div>
          </div>
        </div>
      )}

      {decided && !open && (
        <button
          onClick={() => setOpen(true)}
          className="focus-ring fixed bottom-4 left-4 z-[55] rounded-full border border-hairline bg-panel/90 p-2.5 text-muted shadow-vault backdrop-blur hover:text-ink"
          aria-label="Cookie settings"
          title="Cookie settings"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5Z" />
            <circle cx="9" cy="12" r="1" /><circle cx="14" cy="15" r="1" /><circle cx="15" cy="9" r="1" />
          </svg>
        </button>
      )}
    </>
  );
}
