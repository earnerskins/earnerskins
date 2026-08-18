import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { LegalDoc, Clause, Lead } from "@/components/content/LegalDoc";
import { COMPANY } from "@/lib/config";

export const metadata: Metadata = pageMetadata({
  title: "Delivery Policy",
  description:
    "How purchased skins are transferred through Steam, delivery timeframes and what happens if delivery is delayed.",
  path: "/legal/delivery",
});

export default function DeliveryPolicyPage() {
  return (
    <LegalDoc
      title="Delivery Policy"
      intro="This Delivery Policy explains how purchased Skins are transferred to customers, the timeframes that normally apply and what happens if delivery is delayed or unsuccessful."
    >
      <Clause heading="1. Scope and delivery methods">
        <Lead term="Scope.">
          This Policy applies to every Skin purchased from {COMPANY.legalName} through
          earnerskins.com and forms part of the Terms &amp; Conditions.
        </Lead>
        <Lead term="Digital delivery only.">
          Skins are delivered electronically through Steam. We do not ship any physical product.
        </Lead>
        <Lead term="Bot delivery.">
          Where the selected Skin is held by a bot operated or arranged by the Inventory and
          Fulfilment Provider, a Steam trade offer will be generated from that bot to the Steam
          account connected to the order.
        </Lead>
        <Lead term="Direct Steam delivery.">
          Where the selected Skin remains in another Steam account, the holder will send the Skin
          directly to the Steam account connected to the order. {COMPANY.legalName} remains the
          customer&rsquo;s seller and point of contact.
        </Lead>
        <Lead term="Method selection.">
          The applicable method is determined by the location and status of the selected Skin and may
          not be chosen by the customer unless the Service expressly provides that option.
        </Lead>
      </Clause>

      <Clause heading="2. Delivery requirements">
        <Lead term="Eligible Steam account.">
          The receiving Steam account must be valid, accessible to the customer and eligible to
          receive the Skin under Steam rules.
        </Lead>
        <Lead term="Correct Trade URL.">
          The Trade URL must belong to the same Steam account authenticated through the Service,
          remain valid and permit incoming offers.
        </Lead>
        <Lead term="Steam settings.">
          The customer must maintain any Steam Guard, inventory, privacy or authentication settings
          required for receipt. Steam restrictions, holds or enforcement may delay or prevent
          delivery.
        </Lead>
        <Lead term="Availability.">
          The customer should remain able to access Steam and the registered email address during the
          delivery window so that notices and the trade offer can be reviewed promptly.
        </Lead>
      </Clause>

      <Clause heading="3. Delivery timeframes">
        <Lead term="Payment must clear.">
          Delivery begins only after payment is successfully authorised, any required checks are
          complete, the order is accepted and the Skin is reserved.
        </Lead>
        <Lead term="Bot target time.">
          A bot trade offer is normally generated within 15 minutes after successful payment. High
          demand, Steam instability, security checks or provider delays may extend this period.
        </Lead>
        <Lead term="Direct-delivery target time.">
          For direct Steam delivery, the holder normally has up to 12 hours after order acceptance to
          send the correct trade offer.
        </Lead>
        <Lead term="Order-specific timer.">
          Where the order page shows a different delivery or acceptance timer, the displayed timer
          applies to that transaction. The customer should monitor the order page for current status.
        </Lead>
        <Lead term="No absolute instant-delivery promise.">
          References to fast or instant delivery describe the expected experience for eligible
          bot-held Skins and are not a guarantee that every Skin will arrive immediately.
        </Lead>
      </Clause>

      <Clause heading="4. Reviewing and accepting a trade offer">
        <Lead term="Customer review.">
          Before acceptance, the customer must verify that the offer is addressed to the correct
          Steam account and contains the exact purchased Skin, including the identifying attributes
          shown in the order.
        </Lead>
        <Lead term="Bot-offer validity.">
          A bot offer may be available for a short period, commonly around 10 to 15 minutes. If it
          expires without being accepted, the customer may request a new offer through the order page
          or contact support. Expiry alone does not transfer the Skin or complete delivery.
        </Lead>
        <Lead term="Direct-offer validity.">
          A direct-delivery offer should normally be accepted within 12 hours after it is sent,
          unless the order page specifies another period.
        </Lead>
        <Lead term="No substitutions or counter-offers.">
          The customer must not accept a substitute item or create a counter-offer. A legitimate
          delivery does not require the customer to send a Skin, money or other value through Steam.
        </Lead>
        <Lead term="Suspicious offer.">
          If the sender or item does not match the information displayed in the order, the customer
          should not accept the offer and should contact {COMPANY.email} immediately.
        </Lead>
      </Clause>

      <Clause heading="5. Completion and verification">
        <Lead term="Completed delivery.">
          Delivery is completed when Steam records the transfer and the purchased Skin appears in the
          customer&rsquo;s connected Steam inventory.
        </Lead>
        <Lead term="Automated verification.">
          The Service may use Steam data and information supplied through the Inventory and Fulfilment
          Provider to confirm whether an offer was sent, accepted, declined, expired, cancelled or
          reversed.
        </Lead>
        <Lead term="Manual verification.">
          Where automated status information is delayed or inconsistent, we may request the order
          number, Steam trade history, screenshots or other proportionate evidence needed to
          investigate.
        </Lead>
        <Lead term="Confirmation.">
          A delivery confirmation may be sent by email and recorded in the Account. Steam records
          remain relevant evidence of the actual transfer status.
        </Lead>
      </Clause>

      <Clause heading="6. Delays and unsuccessful delivery">
        <Lead term="Provider or Steam delay.">
          A delay caused by the Inventory and Fulfilment Provider, Steam outage, rate limit,
          maintenance or trade restriction will be investigated. We will provide updated information
          where reasonably available.
        </Lead>
        <Lead term="Unavailable Skin.">
          If the selected Skin becomes unavailable before delivery and cannot be supplied within the
          applicable period, we will cancel the affected order and provide a full refund. A
          replacement will be offered only with the customer&rsquo;s agreement.
        </Lead>
        <Lead term="No direct offer within 12 hours.">
          If a correct direct-delivery offer is not sent within 12 hours or the different
          order-specific period, the customer may request cancellation and a full refund. We may
          cancel automatically where the failure is confirmed.
        </Lead>
        <Lead term="Expired offer.">
          Where a bot offer expires, we will ordinarily allow it to be requested again. Where
          repeated delivery is no longer possible, the order will be cancelled and refunded.
        </Lead>
        <Lead term="Customer-caused delay.">
          If delivery cannot proceed because the customer supplied an incorrect Trade URL, changed
          Steam settings, lost access or failed to accept a correct offer, we will provide reasonable
          instructions and an opportunity to correct the issue. Repeated failure or abuse may lead to
          cancellation or Account restriction, but no automatic penalty will be charged unless
          separately disclosed and permitted by law.
        </Lead>
      </Clause>

      <Clause heading="7. Steam Trade Protection and reversals">
        <Lead term="Protection rules.">
          A transferred Skin may remain subject to Steam Trade Protection or another Steam reversal
          mechanism for the period determined by Steam. These rules are controlled by Valve
          Corporation and may change.
        </Lead>
        <Lead term="Reversal not caused by the customer.">
          If a completed transfer is reversed because of the source account, the Inventory and
          Fulfilment Provider or another circumstance not caused by the customer, {COMPANY.legalName}{" "}
          will provide, at the customer&rsquo;s choice where reasonably possible, the same Skin, an
          equivalent Skin expressly accepted by the customer, or a full refund.
        </Lead>
        <Lead term="Customer-initiated reversal.">
          If the customer initiates or procures a reversal after valid delivery, we may suspend the
          Account and investigate. A refund is not due merely because the customer reversed a valid
          trade, without prejudice to mandatory legal rights or a genuine account-compromise claim.
        </Lead>
        <Lead term="Compromised Steam account.">
          If a reversal or loss may result from account compromise, the customer should secure the
          Steam account, preserve evidence and contact both Steam Support and us promptly. Each case
          will be reviewed on its facts.
        </Lead>
      </Clause>

      <Clause heading="8. Support and remedies">
        <Lead term="Reporting a problem.">
          Delivery problems should be reported to {COMPANY.email} with the order number, connected
          Steam ID, a description of the issue and relevant screenshots where available.
        </Lead>
        <Lead term="Refunds.">
          Refund eligibility, method and timing are governed by the Refund and Cancellation Policy.
          This Delivery Policy does not limit any mandatory remedy for late, failed or non-conforming
          supply.
        </Lead>
        <Lead term="Policy changes.">
          We may update operational timeframes where Steam or supplier processes change. A change will
          not reduce rights attached to an order already accepted.
        </Lead>
      </Clause>
    </LegalDoc>
  );
}
