import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { LegalDoc, Clause, Lead } from "@/components/content/LegalDoc";
import { COMPANY } from "@/lib/config";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description: "How EarnerSkins collects, uses, shares and protects your personal data.",
  path: "/legal/privacy",
});

const RETENTION = [
  {
    category: "Identity and contact",
    examples: "Name, email, phone, address, date of birth",
    use: "Payment, age check, support and Account recovery",
    retention:
      "While the Account is active and, where tied to transactions or claims, generally up to 6 years afterwards",
  },
  {
    category: "Steam and delivery",
    examples: "Steam ID, Trade URL, public profile and trade status",
    use: "Authentication, delivery and dispute investigation",
    retention:
      "While the Account is active; transaction-linked records generally up to 6 years",
  },
  {
    category: "Orders and balance",
    examples: "Items, prices, receipts, refunds and balance entries",
    use: "Contract performance, accounting and claims",
    retention: "Generally 6 years after the relevant financial period or transaction",
  },
  {
    category: "Payment metadata",
    examples: "Transaction reference, status, masked card information and risk result",
    use: "Payment confirmation, refund and fraud prevention",
    retention: "Generally up to 6 years; shorter where no longer necessary",
  },
  {
    category: "Security and support",
    examples: "Operational logs, sign-in events and correspondence",
    use: "Security, troubleshooting and dispute handling",
    retention:
      "Normally up to 24 months, or longer where required for an active investigation or claim",
  },
];

export default function PrivacyPage() {
  return (
    <LegalDoc
      title="Privacy Policy"
      intro="This Privacy Policy explains how SENIOR EARNER LTD collects, uses, shares and protects personal data when customers use earnerskins.com, sign in through Steam or purchase Skins."
    >
      <Clause heading="1. Controller and contact details">
        <Lead term="Controller.">
          {COMPANY.legalName}, company number {COMPANY.regNumber}, registered in England and Wales,
          with its registered office at {COMPANY.address}, is the controller of the personal data
          described in this Policy.
        </Lead>
        <Lead term="Privacy contact.">
          Privacy questions and rights requests may be sent to {COMPANY.email}. Please write
          &ldquo;Privacy Request&rdquo; in the subject line.
        </Lead>
        <Lead term="Scope.">
          This Policy applies to earnerskins.com, Accounts, Steam Login, orders, Account Balance,
          support requests and related communications controlled by us. Steam, card issuers and other
          third parties process some data under their own privacy terms.
        </Lead>
      </Clause>

      <Clause heading="2. Personal data we collect">
        <Lead term="Data provided by the customer.">
          We collect information entered during registration, checkout, payment, Account recovery or
          support, including name, email address, telephone number, postal or billing address and date
          of birth.
        </Lead>
        <Lead term="Steam data.">
          We collect the Steam ID authenticated through Steam Login, the Steam Trade URL, relevant
          public Steam profile information and transaction or trade status needed to deliver and
          verify a Skin.
        </Lead>
        <Lead term="Order and Account data.">
          We store selected Skins, prices, currencies, order status, delivery history, refund records,
          support communications, Account Balance entries and transaction references.
        </Lead>
        <Lead term="Payment data.">
          The independent payment service provider collects card details. We receive transaction
          status and may receive limited information such as card brand, masked card digits, expiry
          information, billing details, issuer country, authentication result and fraud or risk
          status. We do not store complete card numbers or card security codes in our database.
        </Lead>
        <Lead term="Limited technical and security data.">
          The Service and its hosting infrastructure may generate limited operational logs such as IP
          address, timestamps, browser or device type, sign-in events, error information and security
          events. These logs are used for reliable operation, security, fraud prevention and
          troubleshooting, not for advertising or behavioural analytics.
        </Lead>
        <Lead term="No advertising analytics.">
          We do not use personal data for third-party advertising, cross-site tracking, audience
          profiling or general behavioural analytics. If this changes, we will update this Policy and
          obtain consent where required.
        </Lead>
      </Clause>

      <Clause heading="3. Sources of personal data">
        <Lead term="Direct collection.">
          Most personal data is collected directly from the customer when an Account is created,
          details are updated, an order or top-up is submitted, or support is contacted.
        </Lead>
        <Lead term="Steam.">
          Steam provides the authenticated Steam identifier and may provide public profile or
          trade-related information needed to connect the Account and verify delivery.
        </Lead>
        <Lead term="Payment service provider.">
          The payment service provider supplies transaction, authentication and risk information
          needed to confirm payment and manage refunds or disputes.
        </Lead>
        <Lead term="Inventory and Fulfilment Provider.">
          The confidential Inventory and Fulfilment Provider supplies inventory, delivery and
          trade-status information necessary to reserve and transfer a selected Skin. We do not
          disclose its name in this public Policy because the commercial relationship is confidential,
          but we describe its category, role and data use.
        </Lead>
      </Clause>

      <Clause heading="4. How and why we use personal data">
        <Lead term="Contract.">
          We process personal data where necessary to create and manage an Account, authenticate
          through Steam, process payment, maintain Account Balance, reserve and deliver a Skin, provide
          receipts, handle support, process refunds and enforce the Terms &amp; Conditions.
        </Lead>
        <Lead term="Legal obligations.">
          We process personal data where necessary for accounting, tax, record-keeping, sanctions
          compliance, lawful requests, consumer protection and the prevention or reporting of crime.
        </Lead>
        <Lead term="Legitimate interests.">
          We process proportionate data to secure the Service, prevent fraud and account takeover,
          investigate delivery and payment disputes, improve operational reliability, establish or
          defend legal claims and protect customers, our company and third parties. We consider and
          balance these interests against individual rights.
        </Lead>
        <Lead term="Consent.">
          Where we rely on consent for a specific privacy purpose, the request will be separate and
          clear, and consent may be withdrawn at any time. Withdrawal does not affect processing
          already carried out lawfully. Consent to immediate digital delivery under consumer law is
          separate from data-protection consent.
        </Lead>
        <Lead term="Required information.">
          Steam ID, Trade URL, email and transaction information are generally required to create the
          connected Account and perform a purchase. Payment, identity, contact or age information may
          be required for payment processing, verification, legal compliance or Account recovery. If
          required data is not provided, we may be unable to open or recover the Account or complete
          the transaction.
        </Lead>
      </Clause>

      <Clause heading="5. Data use and usual retention">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-xs">
            <thead>
              <tr className="border-b border-hairline text-left text-ink">
                <th className="py-2 pr-3 font-semibold">Data category</th>
                <th className="py-2 pr-3 font-semibold">Examples</th>
                <th className="py-2 pr-3 font-semibold">Main use</th>
                <th className="py-2 font-semibold">Usual retention</th>
              </tr>
            </thead>
            <tbody>
              {RETENTION.map((r) => (
                <tr key={r.category} className="border-b border-hairline/60 align-top">
                  <td className="py-2 pr-3 text-ink">{r.category}</td>
                  <td className="py-2 pr-3">{r.examples}</td>
                  <td className="py-2 pr-3">{r.use}</td>
                  <td className="py-2">{r.retention}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Lead term="Retention criteria.">
          The periods above are general limits rather than a promise to retain every record for the
          full period. We consider contractual need, legal and accounting duties, limitation periods,
          fraud and chargeback risk, dispute status and security requirements.
        </Lead>
        <Lead term="Deletion and anonymisation.">
          When personal data is no longer needed, we delete it, securely dispose of it or anonymise it
          so that it is no longer linked to an identifiable person, subject to backup cycles and legal
          holds.
        </Lead>
      </Clause>

      <Clause heading="6. Sharing personal data">
        <Lead term="Payment providers and financial institutions.">
          We share necessary identity, billing, order and transaction data with the payment service
          provider, card networks, acquiring institutions and card issuers to process, authenticate,
          refund and protect payments.
        </Lead>
        <Lead term="Inventory and Fulfilment Provider.">
          We share the Steam ID, Trade URL, selected Skin, order reference and delivery status, and
          other strictly necessary transaction information, so that the Skin can be reserved,
          transferred and verified.
        </Lead>
        <Lead term="Steam and game services.">
          Steam processes authentication and trades under its own terms. When the customer directs a
          transfer to a Steam account, necessary identifiers and trade information are sent through
          Steam.
        </Lead>
        <Lead term="Infrastructure and communications.">
          We may use hosting, database, security, email and customer-support providers that process
          limited personal data on our behalf under contractual and confidentiality obligations.
        </Lead>
        <Lead term="Professional advisers and authorities.">
          We may disclose data to accountants, auditors, insurers, legal advisers, courts, regulators,
          law-enforcement bodies or sanctions authorities where necessary and lawful.
        </Lead>
        <Lead term="Corporate transactions.">
          If our business or assets are reorganised, financed, sold or transferred, relevant personal
          data may be disclosed under appropriate confidentiality and data-protection safeguards.
        </Lead>
        <Lead term="No sale of personal data.">
          We do not sell personal data or share it for third-party advertising.
        </Lead>
      </Clause>

      <Clause heading="7. International transfers">
        <Lead term="Global services.">
          Steam, payment, hosting or fulfilment services may process personal data outside the United
          Kingdom. The destination depends on the customer, service provider and transaction route.
        </Lead>
        <Lead term="Safeguards.">
          Where required, we use an adequacy regulation, recognised contractual safeguards such as the
          UK International Data Transfer Agreement or Addendum, or another lawful transfer mechanism.
          Information about applicable safeguards may be requested at {COMPANY.email}, subject to
          legitimate confidentiality restrictions.
        </Lead>
      </Clause>

      <Clause heading="8. Automated checks">
        <Lead term="Fraud and payment screening.">
          The payment service provider or our security systems may automatically assess transaction,
          location, account and device signals. A high-risk result may lead to additional
          verification, delay or refusal of a payment or order.
        </Lead>
        <Lead term="Human review.">
          Where an automated decision produces a significant legal or similar effect and applicable law
          grants a right to review, the customer may contact us to request human review, provide
          additional information and contest the outcome.
        </Lead>
      </Clause>

      <Clause heading="9. Security">
        <Lead term="Measures.">
          We use proportionate administrative, contractual and technical measures intended to protect
          personal data against accidental loss, unauthorised access, alteration and disclosure. No
          internet service can guarantee absolute security.
        </Lead>
        <Lead term="Customer responsibility.">
          Customers should secure their email and Steam accounts, use Steam Guard, avoid sharing
          authentication codes and notify us promptly of suspected compromise.
        </Lead>
        <Lead term="Breach response.">
          We investigate suspected personal-data breaches and will notify affected individuals and the
          relevant regulator where required by law.
        </Lead>
      </Clause>

      <Clause heading="10. Individual rights">
        <p>Depending on the circumstances and applicable law, an individual may have the right to:</p>
        <ul>
          <li>request access to personal data and information about its use;</li>
          <li>request correction of inaccurate or incomplete data;</li>
          <li>request deletion of personal data;</li>
          <li>request restriction of processing;</li>
          <li>object to processing based on legitimate interests;</li>
          <li>receive certain data in a portable format;</li>
          <li>withdraw consent where processing is based on consent; and</li>
          <li>contest qualifying automated decisions.</li>
        </ul>
        <Lead term="Limits.">
          Rights are not absolute. We may retain or continue processing data where permitted or
          required for contracts, accounting, fraud prevention, legal claims, public interest or
          compliance obligations.
        </Lead>
        <Lead term="Identity verification.">
          Before responding, we may request reasonable information to verify identity and protect the
          Account. We will not ask for a Steam password or complete card number.
        </Lead>
        <Lead term="Response time.">
          We will respond within the period required by applicable law. Complex or numerous requests
          may take longer where the law permits, and we will explain any extension.
        </Lead>
        <Lead term="Complaints.">
          Individuals may complain to the UK Information Commissioner&rsquo;s Office at ico.org.uk. A
          person located elsewhere may also have the right to contact the competent data-protection
          authority in that jurisdiction. We encourage individuals to contact us first so we can try
          to resolve the concern.
        </Lead>
      </Clause>

      <Clause heading="11. Age and changes">
        <Lead term="Adults only.">
          The Service is intended only for persons aged 18 or older. We do not knowingly offer
          Accounts or sales to children. If we learn that a person is under 18, we may close the
          Account and delete or retain data as required by law.
        </Lead>
        <Lead term="Policy updates.">
          We may update this Policy when data practices, providers, legal requirements or the Service
          change. The revised effective date will be shown at the beginning, and material changes will
          be communicated where required.
        </Lead>
      </Clause>
    </LegalDoc>
  );
}
