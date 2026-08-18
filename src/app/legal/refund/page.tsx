import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { LegalDoc, Clause, Lead } from "@/components/content/LegalDoc";
import { COMPANY } from "@/lib/config";

export const metadata: Metadata = pageMetadata({
  title: "Refund and Cancellation Policy",
  description:
    "When an order or Account Balance top-up may be cancelled, when a refund is available and how refunds are processed.",
  path: "/legal/refund",
});

export default function RefundPolicyPage() {
  return (
    <LegalDoc
      title="Refund and Cancellation Policy"
      intro="This Policy explains when an order or Account Balance top-up may be cancelled, when a refund is available and how refunds are processed."
    >
      <Clause heading="1. General principles">
        <Lead term="Scope.">
          This Policy applies to purchases and eligible Account Balance top-ups made through
          earnerskins.com and forms part of the Terms &amp; Conditions.
        </Lead>
        <Lead term="Mandatory rights.">
          Nothing in this Policy excludes or restricts a consumer right or remedy that cannot lawfully
          be excluded, including rights relating to digital content that is not as described, is not
          of satisfactory quality or is not supplied with reasonable care and skill.
        </Lead>
        <Lead term="Contact.">
          To request cancellation or a refund, email {COMPANY.email} and provide the Account email,
          order or transaction number, reason for the request and any relevant evidence.
        </Lead>
      </Clause>

      <Clause heading="2. Cancellation before delivery">
        <Lead term="Before supply begins.">
          An order may be cancelled for a full refund before we accept the order or begin supply,
          unless the transaction has already progressed beyond the point at which cancellation is
          technically possible.
        </Lead>
        <Lead term="Immediate delivery consent.">
          Because customers normally request delivery before the end of the 14-day statutory
          cancellation period, checkout will request express consent for immediate supply and
          acknowledgement that the ordinary cancellation right may be lost once supply of the digital
          content begins.
        </Lead>
        <Lead term="If valid consent was not obtained.">
          Where applicable law requires express consent or acknowledgement and it was not validly
          obtained, we will not rely on a contractual no-refund term to remove a cancellation right.
        </Lead>
        <Lead term="Pending direct delivery.">
          If a direct-delivery holder has not sent the offer within 12 hours or the order-specific
          period, the customer may cancel for a full refund.
        </Lead>
      </Clause>

      <Clause heading="3. When a full refund is available">
        <Lead term="Unavailable Skin.">
          A full refund will be issued if the Skin becomes unavailable before delivery and the
          customer does not expressly accept a replacement.
        </Lead>
        <Lead term="Failed delivery.">
          A full refund will be issued where delivery cannot be completed within the applicable period
          for a reason not caused by the customer.
        </Lead>
        <Lead term="Incorrect Skin.">
          If the delivered Skin does not match the material identifying attributes in the order, the
          customer should not accept the offer where possible and must contact us promptly. We will
          arrange correct delivery, replacement accepted by the customer or a full refund, as
          appropriate.
        </Lead>
        <Lead term="Duplicate or incorrect charge.">
          Any verified duplicate charge, overcharge or payment captured for a declined or cancelled
          order will be refunded in full.
        </Lead>
        <Lead term="Trade reversal.">
          If Steam reverses a completed transfer for a reason not caused by the customer, we will
          provide the same Skin, an agreed equivalent or a full refund. A cash refund will not be
          replaced with store credit without the customer&rsquo;s agreement where the law requires
          return to the original method.
        </Lead>
        <Lead term="Material breach.">
          A refund or other statutory remedy will be available where we materially fail to perform the
          contract and the applicable law entitles the customer to that remedy.
        </Lead>
      </Clause>

      <Clause heading="4. Successfully delivered Skins">
        <Lead term="Change of mind after delivery.">
          Once immediate supply has begun with the required consent and the correct Skin has been
          successfully delivered, a change of mind, accidental selection or fall in market value does
          not ordinarily create a right to a refund.
        </Lead>
        <Lead term="Inspection before acceptance.">
          The customer should inspect the sender and Skin attributes before accepting the Steam offer.
          Accepting an obviously different offer may complicate investigation but does not remove a
          mandatory legal remedy.
        </Lead>
        <Lead term="Steam or publisher action after delivery.">
          We do not ordinarily refund a validly delivered Skin merely because Steam or a game
          publisher later changes its rules, appearance, tradability, functionality or perceived
          value, unless applicable law requires otherwise or the change results from our breach.
        </Lead>
        <Lead term="Account compromise.">
          Loss caused solely by the customer&rsquo;s compromised Steam or email account is not
          automatically refundable. We will nevertheless investigate promptly and will provide any
          remedy required where our systems, negligence or contractual breach contributed to the
          loss.
        </Lead>
      </Clause>

      <Clause heading="5. Customer failure to complete delivery">
        <Lead term="Expired bot offer.">
          If a bot offer expires, the customer should request another offer. No refund will be refused
          solely because one offer expired if the Skin can still be delivered.
        </Lead>
        <Lead term="Unaccepted direct offer.">
          If the customer does not accept a correct direct-delivery offer within the displayed period,
          we may cancel the order after reasonable notice. Any refund will be processed in accordance
          with the original funding source. We do not impose an automatic percentage penalty for an
          isolated failure to accept.
        </Lead>
        <Lead term="Repeated or abusive conduct.">
          Repeated intentional failure to accept correct offers, false non-delivery claims or
          manipulation of Steam reversals may result in Account restriction. This does not affect a
          good-faith complaint or statutory right.
        </Lead>
      </Clause>

      <Clause heading="6. Account Balance top-ups">
        <Lead term="Unused top-up.">
          A customer may request cancellation of an unused card-funded Account Balance top-up within
          14 days after the top-up, subject to payment verification and any mandatory legal rules.
        </Lead>
        <Lead term="Partly used top-up.">
          If part of a top-up has been used for an accepted purchase, only the unused eligible amount
          may be refunded, and a refund may be delayed until related orders and payment risks are
          resolved.
        </Lead>
        <Lead term="Promotional credit.">
          Promotional, bonus or goodwill credit is not refundable for cash unless its specific terms
          or applicable law state otherwise.
        </Lead>
        <Lead term="Chargeback status.">
          A top-up or purchase subject to an active chargeback, reversal or fraud investigation may be
          placed on hold until the payment status is resolved.
        </Lead>
      </Clause>

      <Clause heading="7. Refund method and timing">
        <Lead term="Card payments.">
          Refunds of amounts paid by Visa or Mastercard will normally be sent to the same card through
          the payment service provider. If that method is unavailable, we will use another lawful
          method agreed with the customer.
        </Lead>
        <Lead term="Account Balance payments.">
          Amounts paid from Account Balance will normally be returned to Account Balance. Mixed
          payments will normally be refunded to the card and Account Balance in the same proportions
          used for the purchase.
        </Lead>
        <Lead term="Processing period.">
          We will issue an approved refund without undue delay and, where the statutory cancellation
          rules apply, no later than 14 days after we are informed of the cancellation or establish
          entitlement to the refund. Additional bank or card-network processing time, commonly 5 to 10
          business days, is outside our control.
        </Lead>
        <Lead term="Currency.">
          A refund is issued in the transaction currency and amount originally paid to us. We are not
          responsible for exchange-rate differences or fees charged independently by the
          customer&rsquo;s bank or card issuer.
        </Lead>
        <Lead term="Evidence and cooperation.">
          We may request reasonable evidence needed to verify delivery status, payment ownership,
          duplicate charges, account compromise or a Steam reversal. Requests will be proportionate
          and handled under the Privacy Policy.
        </Lead>
      </Clause>

      <Clause heading="8. Disputes">
        <Lead term="Internal review.">
          If a request is declined, the customer may ask for a written explanation and further review
          by replying to the decision with any additional evidence.
        </Lead>
        <Lead term="Payment disputes.">
          A customer may exercise lawful card-dispute rights. We ask customers to contact us first
          where practical so that delivery or billing issues can be resolved promptly.
        </Lead>
        <Lead term="Policy changes.">
          Changes to this Policy will not reduce refund rights attached to a transaction completed
          before the change takes effect.
        </Lead>
      </Clause>
    </LegalDoc>
  );
}
