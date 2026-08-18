import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { LegalDoc, Clause, Lead } from "@/components/content/LegalDoc";
import { PaymentMarks } from "@/components/ui/PaymentMarks";
import { COMPANY } from "@/lib/config";

export const metadata: Metadata = pageMetadata({
  title: "Payment Policy",
  description: "Accepted payment methods, Account Balance, payment checks, pricing and security.",
  path: "/legal/payment",
});

export default function PaymentPolicyPage() {
  return (
    <LegalDoc
      title="Payment Policy"
      intro="This Payment Policy describes accepted payment methods, Account Balance, payment checks, pricing and payment-related refunds."
    >
      <Clause heading="1. Accepted payment methods">
        <Lead term="Cards.">
          Eligible purchases and Account Balance top-ups may be paid using Visa or Mastercard, subject
          to availability in the customer&rsquo;s country and acceptance by the payment service
          provider and card issuer.
        </Lead>
        <Lead term="Account Balance.">
          Eligible purchases may also be paid from available Account Balance. The Service may allow a
          combination of Account Balance and card payment.
        </Lead>
        <Lead term="No unsupported methods.">
          Cash, bank transfer, cryptocurrency, payment through Steam and any method not displayed at
          checkout are not accepted unless we expressly introduce them and update this Policy.
        </Lead>
        <div className="pt-1">
          <PaymentMarks />
        </div>
      </Clause>

      <Clause heading="2. Payment processing and security">
        <Lead term="Independent processor.">
          Card payments are handled by an independent payment service provider. Its systems may
          collect card information, billing details, device or risk signals and authentication results
          for payment processing, fraud prevention and legal compliance.
        </Lead>
        <Lead term="Card data.">
          {COMPANY.legalName} does not store complete card numbers or card security codes in its
          database. Limited payment information such as payment status, transaction reference, card
          brand, expiry information or masked card digits may be received where necessary to manage
          transactions and support.
        </Lead>
        <Lead term="Authentication.">
          A card issuer or payment service provider may require 3-D Secure, a one-time code, app
          approval or another authentication step. Failure to complete authentication may result in a
          declined or cancelled payment.
        </Lead>
        <Lead term="Security communication.">
          We will not ask by email or chat for a full card number, card security code, Steam password
          or one-time authentication code. Customers should report suspicious requests to{" "}
          {COMPANY.email}.
        </Lead>
      </Clause>

      <Clause heading="3. Prices and currencies">
        <Lead term="Supported currencies.">
          The Service may display and process prices in GBP, EUR and USD. Availability may depend on
          location, card and Service settings.
        </Lead>
        <Lead term="Final amount.">
          The total amount charged by us, including any fee or tax collected by us, will be displayed
          immediately before the customer submits the order or top-up.
        </Lead>
        <Lead term="Currency conversion.">
          If the card account is denominated in another currency, the card issuer may convert the
          transaction and charge a conversion or cross-border fee. Those rates and fees are determined
          by the issuer, not by us.
        </Lead>
        <Lead term="Obvious errors.">
          We may decline or cancel a transaction affected by an obvious price, currency, balance or
          technical error before delivery. A captured payment will be refunded in full.
        </Lead>
      </Clause>

      <Clause heading="4. Authorisation and payment status">
        <Lead term="Authorisation.">
          Submitting payment authorises the payment service provider and card issuer to process the
          displayed amount. An authorisation hold is not always a completed charge.
        </Lead>
        <Lead term="Pending payments.">
          A payment may remain pending while authentication, fraud, sanctions or technical checks are
          completed. Delivery will not begin until we receive sufficient confirmation that payment
          succeeded.
        </Lead>
        <Lead term="Declined payment.">
          A payment may be declined by the card issuer, payment service provider or us. We may not
          receive the detailed reason. The customer should confirm available funds and billing
          information or contact the card issuer before trying again.
        </Lead>
        <Lead term="Duplicate authorisations.">
          If an unsuccessful attempt creates more than one pending authorisation, the issuer will
          normally release unused holds automatically. A duplicate captured payment will be refunded
          once verified.
        </Lead>
        <Lead term="Receipts.">
          A transaction confirmation or receipt may be provided by email or through the Account.
          Customers should retain it for their records.
        </Lead>
      </Clause>

      <Clause heading="5. Account Balance">
        <Lead term="Nature and purpose.">
          Account Balance is intended as limited store credit for purchases through earnerskins.com.
          It is not intended to function as a bank account, savings product or general payment or
          withdrawal service.
        </Lead>
        <Lead term="Funding.">
          Balance may be added by card top-up, refund, promotional credit or manual adjustment. A
          top-up becomes available only after the underlying payment is confirmed.
        </Lead>
        <Lead term="Use restrictions.">
          Account Balance may not be sold, transferred to another Account, exchanged outside the
          Service, used to purchase cash or used for unlawful activity.
        </Lead>
        <Lead term="No interest.">
          Account Balance does not earn interest or increase in value merely because it remains
          unused.
        </Lead>
        <Lead term="No ordinary withdrawal.">
          Account Balance is not ordinarily withdrawable for cash. Unused card-funded top-ups may be
          refundable in the circumstances stated in the Refund and Cancellation Policy or where
          required by law.
        </Lead>
        <Lead term="Promotional balance.">
          Promotional or bonus credit may be subject to separate eligibility, use and expiry terms
          displayed when it is issued. It cannot be refunded for cash unless required by law.
        </Lead>
        <Lead term="Corrections.">
          We may correct an Account Balance entry created by a duplicate credit, cancelled payment,
          chargeback, technical error or fraud. We will keep an audit record and provide an
          explanation on request, subject to security and legal limitations.
        </Lead>
      </Clause>

      <Clause heading="6. Fraud prevention and restrictions">
        <Lead term="Verification.">
          We or the payment service provider may check identity, age, address, card ownership,
          location, transaction history and risk signals where proportionate to process a payment,
          recover an Account, prevent fraud or comply with law.
        </Lead>
        <Lead term="Restricted countries and persons.">
          Payments will not be accepted from restricted territories or from persons or payment
          instruments subject to applicable sanctions or other legal prohibitions.
        </Lead>
        <Lead term="Order limits.">
          We may apply reasonable transaction, top-up, frequency or Account Balance limits for
          security, fraud prevention, legal compliance and operational risk. Applicable limits will be
          shown where they affect a transaction.
        </Lead>
        <Lead term="Suspicious activity.">
          We may hold, reject or refund a payment and restrict the Account where there is a reasonable
          suspicion of stolen payment details, account takeover, sanctions evasion, abusive
          chargebacks or another unlawful activity.
        </Lead>
      </Clause>

      <Clause heading="7. Refunds and chargebacks">
        <Lead term="Refund method.">
          Card-funded refunds are normally returned to the original card. Account Balance payments are
          normally returned to Account Balance. Mixed payments are normally refunded proportionately.
        </Lead>
        <Lead term="Processing time.">
          After we issue a card refund, the card issuer may take additional time to display it. Common
          processing time is 5 to 10 business days, although the actual period depends on the issuer
          and network.
        </Lead>
        <Lead term="Good-faith disputes.">
          Nothing in this Policy prevents a customer from raising a legitimate payment dispute.
          Customers should provide accurate information and must not seek both a direct refund and a
          chargeback for the same amount.
        </Lead>
        <Lead term="Abusive chargebacks.">
          Knowingly false, duplicate or abusive chargebacks may lead to Account restriction and
          recovery of reasonable documented losses where permitted by law.
        </Lead>
        <Lead term="Support.">
          Payment questions should be sent to {COMPANY.email} with the transaction reference. Do not
          send complete card details or security codes.
        </Lead>
      </Clause>
    </LegalDoc>
  );
}
