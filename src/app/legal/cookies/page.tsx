import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { LegalDoc, Clause, Lead } from "@/components/content/LegalDoc";
import { COMPANY } from "@/lib/config";

export const metadata: Metadata = pageMetadata({
  title: "Cookie Policy",
  description: "The cookies and similar storage technologies used by earnerskins.com.",
  path: "/legal/cookies",
});

const COOKIES = [
  {
    category: "Authentication session",
    purpose:
      "Keeps the customer securely signed in and connects the browser session with the Account",
    duration:
      "Browser session or until sign-out; security records may persist as described in the Privacy Policy",
    status: "Strictly necessary",
  },
  {
    category: "Cart and checkout session",
    purpose: "Maintains selected Skins and checkout state while the customer moves between pages",
    duration: "Session or a limited period needed to preserve the cart",
    status: "Strictly necessary",
  },
  {
    category: "Security and fraud prevention",
    purpose: "Protects sign-in, payment and order flows and detects malicious requests",
    duration: "Session or a limited risk-management period set by the relevant provider",
    status: "Strictly necessary",
  },
  {
    category: "Cookie-choice record",
    purpose: "Remembers the customer's cookie selection so the notice is not repeatedly displayed",
    duration: "Normally up to 12 months or until cleared",
    status: "Strictly necessary for preference management",
  },
  {
    category: "Currency and appearance",
    purpose: "Remembers a currency, theme or display option selected by the user",
    duration: "Normally up to 12 months or until cleared",
    status: "Preference requested by the user",
  },
  {
    category: "Payment session",
    purpose:
      "Allows the independent payment service provider to authenticate and securely process a card payment",
    duration: "Determined by the provider and generally limited to the payment and security purpose",
    status: "Strictly necessary for requested payment",
  },
  {
    category: "Steam Login",
    purpose: "Allows Steam to authenticate the user on Steam-controlled pages",
    duration: "Determined by Steam",
    status: "Controlled by Steam on its domain",
  },
];

export default function CookiePolicyPage() {
  return (
    <LegalDoc
      title="Cookie Policy"
      intro="This Cookie Policy describes the cookies and similar storage technologies used by earnerskins.com. The Service does not use advertising or behavioural-analytics cookies."
    >
      <Clause heading="1. About cookies and similar technologies">
        <Lead term="Cookies.">
          Cookies are small text files stored by a browser. Similar technologies include local
          storage, session storage and identifiers used to maintain a secure session or remember a
          user-selected setting.
        </Lead>
        <Lead term="Controller.">
          {COMPANY.legalName} controls the first-party technologies described in this Policy. Steam
          and the independent payment service provider may set or use technologies on their own
          domains under their own privacy and cookie information.
        </Lead>
        <Lead term="Legal approach.">
          Technologies strictly necessary to provide a service requested by the user may be used
          without optional consent. If we introduce a non-essential technology, it will not be
          activated until any consent required by law has been obtained.
        </Lead>
      </Clause>

      <Clause heading="2. Technologies currently used">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-xs">
            <thead>
              <tr className="border-b border-hairline text-left text-ink">
                <th className="py-2 pr-3 font-semibold">Category</th>
                <th className="py-2 pr-3 font-semibold">Purpose</th>
                <th className="py-2 pr-3 font-semibold">Typical duration</th>
                <th className="py-2 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {COOKIES.map((c) => (
                <tr key={c.category} className="border-b border-hairline/60 align-top">
                  <td className="py-2 pr-3 text-ink">{c.category}</td>
                  <td className="py-2 pr-3">{c.purpose}</td>
                  <td className="py-2 pr-3">{c.duration}</td>
                  <td className="py-2">{c.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Lead term="Identifiers.">
          The technical names of session and security cookies may change when infrastructure or the
          payment service provider changes. Their purposes and categories remain as described above.
          The live cookie settings interface should be consulted for any identifier-specific
          information presented by the current deployment.
        </Lead>
      </Clause>

      <Clause heading="3. Technologies not used">
        <Lead term="No advertising cookies.">
          We do not use cookies to build advertising profiles, retarget users or track browsing across
          unrelated websites.
        </Lead>
        <Lead term="No general behavioural analytics.">
          We do not use optional analytics cookies to measure general browsing behaviour or create
          audience reports. Limited operational and security logs described in the Privacy Policy are
          not used for advertising analytics.
        </Lead>
        <Lead term="Future changes.">
          If optional analytics, advertising or similar technologies are introduced, this Policy and
          the cookie settings interface will be updated and prior consent will be requested where
          required.
        </Lead>
      </Clause>

      <Clause heading="4. Managing settings">
        <Lead term="Cookie settings.">
          Where a cookie-settings control is available in the website footer, it may be used to review
          or change optional choices. Strictly necessary technologies cannot be disabled through that
          control because the requested Service cannot operate reliably without them.
        </Lead>
        <Lead term="Browser controls.">
          Customers may delete or block cookies and site storage through browser settings. Blocking
          necessary technologies may prevent sign-in, cart operation, payment, Account recovery or
          delivery status from functioning correctly.
        </Lead>
        <Lead term="Steam and payment settings.">
          Technologies set on Steam or payment-provider pages are controlled by those parties. Their
          settings and policies should be reviewed directly on the relevant service.
        </Lead>
      </Clause>

      <Clause heading="5. Personal data and contact">
        <Lead term="Personal data.">
          Where a cookie or similar technology relates to an identifiable person, the Privacy Policy
          also applies and explains the purposes, legal bases, sharing, retention and individual
          rights.
        </Lead>
        <Lead term="Updates.">
          We may update this Policy when the Service, payment flow, Steam integration or legal
          requirements change. The effective date will be updated and any newly required consent will
          be requested before the relevant technology is activated.
        </Lead>
        <Lead term="Questions.">
          Questions about cookies or privacy may be sent to {COMPANY.email}.
        </Lead>
      </Clause>
    </LegalDoc>
  );
}
