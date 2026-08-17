"use client";

import { useActionState, useEffect, useState, useTransition } from "react";
import {
  linkSteamAction,
  unlinkSteamAction,
  type SteamLinkState,
} from "@/actions/steam";
import type { SteamLink } from "@/lib/steam";

/**
 * Link / display the buyer's Steam account. Skins are delivered to this
 * account, so checkout requires it. Reports the linked account up via onChange
 * so the parent can gate the "Place order" button.
 */
export function SteamLinkCard({
  initial,
  onChange,
}: {
  initial: SteamLink | null;
  onChange?: (link: SteamLink | null) => void;
}) {
  const [link, setLink] = useState<SteamLink | null>(initial);
  const [state, action, pending] = useActionState<SteamLinkState, FormData>(
    linkSteamAction,
    {},
  );
  const [unlinking, startUnlink] = useTransition();

  useEffect(() => {
    if (state.ok && state.link) {
      setLink(state.link);
      onChange?.(state.link);
    }
  }, [state, onChange]);

  function unlink() {
    startUnlink(async () => {
      await unlinkSteamAction();
      setLink(null);
      onChange?.(null);
    });
  }

  if (link) {
    return (
      <div className="flex items-center gap-4 rounded-lg border border-primary/30 bg-primary-tint p-4">
        <Avatar url={link.avatarUrl} name={link.personaName} />
        <div className="min-w-0 flex-1">
          <p className="flex items-center gap-2 text-sm font-medium text-ink">
            <span className="truncate">{link.personaName}</span>
            <span className="rounded border border-success/30 bg-success/15 px-1.5 py-0.5 text-[10px] uppercase tracking-wide text-success">
              Linked
            </span>
          </p>
          <p className="font-mono text-xs text-muted">SteamID {link.steamId}</p>
        </div>
        <button
          type="button"
          onClick={unlink}
          disabled={unlinking}
          className="focus-ring shrink-0 rounded-lg border border-hairline px-3 py-1.5 text-xs text-muted transition-colors hover:text-danger disabled:opacity-50"
        >
          {unlinking ? "Removing…" : "Change"}
        </button>
      </div>
    );
  }

  return (
    <form action={action} className="space-y-3">
      <label htmlFor="tradeUrl" className="block text-sm text-ink">
        Your Steam trade URL
      </label>
      <input
        id="tradeUrl"
        name="tradeUrl"
        type="url"
        required
        placeholder="https://steamcommunity.com/tradeoffer/new/?partner=…&token=…"
        className="focus-ring w-full rounded-lg border border-hairline bg-panel px-3 py-2.5 text-sm text-ink placeholder:text-muted"
      />
      <p className="text-xs text-muted">
        Find it in Steam → Inventory → Trade Offers → “Who can send me Trade Offers?”. We pull
        your avatar and nickname from Steam automatically.
      </p>
      {state.error && (
        <p className="rounded-lg border border-danger/30 bg-danger/10 px-3 py-2 text-sm text-danger">
          {state.error}
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="focus-ring rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-ink transition-colors hover:bg-[#c6f56a] disabled:opacity-50"
      >
        {pending ? "Linking…" : "Link Steam account"}
      </button>
    </form>
  );
}

function Avatar({ url, name }: { url: string; name: string }) {
  if (url) {
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        src={url}
        alt={name}
        className="h-12 w-12 shrink-0 rounded-lg border border-hairline object-cover"
      />
    );
  }
  const initial = name.trim().charAt(0).toUpperCase() || "S";
  return (
    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-hairline bg-panel font-display text-lg text-ink">
      {initial}
    </div>
  );
}
