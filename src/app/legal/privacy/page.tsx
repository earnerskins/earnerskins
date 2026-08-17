import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { LegalDoc, Clause } from "@/components/content/LegalDoc";
import { COMPANY } from "@/lib/config";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description: "How EarnerSkins collects, uses and protects your personal information.",
  path: "/legal/privacy",
});

export default function PrivacyPage() {
  return (
    <LegalDoc
      title="Privacy Policy"
      intro="This policy explains what personal information we collect, why we collect it, and the choices you have."
    >
      <Clause heading="1. Information we collect">
        <ul>
          <li>Account details: name, email, phone, date of birth and address.</li>
          <li>Order details: the items you buy and your transaction history.</li>
          <li>Technical data: cookies and basic device information needed to run the store.</li>
        </ul>
      </Clause>

      <Clause heading="2. How we use your information">
        <ul>
          <li>To create and manage your account.</li>
          <li>To process orders, deliver items and send confirmations and invoices.</li>
          <li>To provide customer support and keep the store secure.</li>
          <li>To meet our legal and compliance obligations.</li>
        </ul>
      </Clause>

      <Clause heading="3. Payment data">
        <p>
          Card payments are processed over encrypted, PCI DSS-compliant connections. We do not store
          full card numbers on our servers.
        </p>
      </Clause>

      <Clause heading="4. Sharing">
        <p>
          We do not sell your personal information. We share it only with service providers who help
          us operate the store (such as payment and email providers), and where required by law.
        </p>
      </Clause>

      <Clause heading="5. Retention">
        <p>
          We keep your information for as long as your account is active and as needed to meet legal,
          accounting and reporting requirements.
        </p>
      </Clause>

      <Clause heading="6. Your rights">
        <p>
          You may request access to, correction of, or deletion of your personal data. To exercise
          these rights, email {COMPANY.email}.
        </p>
      </Clause>

      <Clause heading="7. Cookies">
        <p>
          We use a small number of cookies to run the store and remember your preferences. See our
          <a href="/legal/cookies"> Cookie Policy</a> for details and controls.
        </p>
      </Clause>
    </LegalDoc>
  );
}
