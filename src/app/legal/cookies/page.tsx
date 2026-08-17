import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { LegalDoc, Clause } from "@/components/content/LegalDoc";

export const metadata: Metadata = pageMetadata({
  title: "Cookie Policy",
  description: "The cookies EarnerSkins uses and how to control them.",
  path: "/legal/cookies",
});

export default function CookiePolicyPage() {
  return (
    <LegalDoc
      title="Cookie Policy"
      intro="We keep cookies to a minimum. This page explains what we use and how to manage your choices."
    >
      <Clause heading="1. What cookies are">
        <p>
          Cookies are small text files stored on your device that help a website function and
          remember your preferences.
        </p>
      </Clause>

      <Clause heading="2. Cookies we use">
        <ul>
          <li>
            <strong className="text-ink">Essential</strong> — required to run the store, keep you
            signed in and remember your cart.
          </li>
          <li>
            <strong className="text-ink">Preferences</strong> — remember your currency, theme and
            cookie consent choice.
          </li>
        </ul>
        <p>
          We do not use advertising or cross-site tracking cookies. Your currency and theme choices
          are stored locally on your device.
        </p>
      </Clause>

      <Clause heading="3. Managing cookies">
        <p>
          You can reopen the cookie banner at any time using the &ldquo;Cookie settings&rdquo;
          control in the site footer, and you can clear cookies through your browser settings.
          Blocking essential cookies may stop parts of the store from working.
        </p>
      </Clause>
    </LegalDoc>
  );
}
