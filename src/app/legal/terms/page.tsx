import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { LegalDoc, Clause, Lead } from "@/components/content/LegalDoc";
import { COMPANY } from "@/lib/config";

export const metadata: Metadata = pageMetadata({
  title: "Terms & Conditions",
  description: "The terms governing your use of the EarnerSkins store and your purchases.",
  path: "/legal/terms",
});

export default function TermsPage() {
  return (
    <LegalDoc
      title="Terms & Conditions"
      intro="These Terms & Conditions govern access to earnerskins.com and purchases of digital in-game cosmetic items from SENIOR EARNER LTD."
    >
      <Clause heading="1. About these Terms">
        <Lead term="Acceptance.">
          By creating an account, accessing the Service or placing an order, you confirm that you
          have read and agree to these Terms &amp; Conditions and the policies incorporated into
          them. If you do not agree, you must not use the Service.
        </Lead>
        <Lead term="Contracting company.">
          The Service is operated by {COMPANY.legalName}, company number {COMPANY.regNumber},
          registered in England and Wales, with its registered office at {COMPANY.address}.
          References to &ldquo;EarnerSkins&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo; and
          &ldquo;our&rdquo; mean {COMPANY.legalName}.
        </Lead>
        <Lead term="Contact.">
          Questions, complaints and legal notices may be sent to {COMPANY.email}. Please include
          sufficient information for us to identify the relevant account or order.
        </Lead>
      </Clause>

      <Clause heading="2. Definitions">
        <ul>
          <li>
            <strong className="text-ink">Account</strong> means the customer profile used to access
            the Service, including any profile authenticated through Steam Login.
          </li>
          <li>
            <strong className="text-ink">Account Balance</strong> means prepaid or promotional store
            credit recorded in an Account and usable only for eligible purchases through the Service.
          </li>
          <li>
            <strong className="text-ink">Inventory and Fulfilment Provider</strong> means the
            confidential third-party provider that supplies inventory information and may facilitate
            delivery through its technology, bots or participating Steam accounts. The
            provider&rsquo;s identity and commercial arrangements are confidential.
          </li>
          <li>
            <strong className="text-ink">Skin</strong> means a digital in-game cosmetic item or
            associated right of access or use that is transferable through Steam, subject to Steam
            rules and the rules of the relevant game publisher.
          </li>
          <li>
            <strong className="text-ink">Service</strong> means earnerskins.com, associated Account
            functionality, the Skin catalog, checkout, Account Balance, customer support and related
            services supplied by us.
          </li>
        </ul>
      </Clause>

      <Clause heading="3. Eligibility and availability">
        <Lead term="Age requirement.">
          You must be at least 18 years old and legally capable of entering into a binding contract.
          By using the Service, you represent that you satisfy these requirements.
        </Lead>
        <Lead term="Personal use.">
          The Service is intended for individual customers purchasing Skins for lawful personal use.
          You must contact us before using the Service for business, resale or professional trading
          purposes.
        </Lead>
        <Lead term="Restricted territories.">
          The Service is not available to persons located in, ordinarily resident in, or using a
          payment method or Steam account associated with certain territories, including Afghanistan,
          Belarus, Central African Republic, Cuba, Democratic Republic of the Congo, Haiti, Iran,
          Iraq, Mali, Myanmar (Burma), North Korea, Russia, Somalia, South Sudan, Sudan, Syria,
          Venezuela, Yemen and Zimbabwe.
        </Lead>
        <Lead term="Additional restrictions.">
          We may restrict access where required by applicable law, sanctions, a court or regulator,
          Steam, a game publisher, our payment service provider or the Inventory and Fulfilment
          Provider. You must not use a proxy, VPN or false information to evade a restriction.
        </Lead>
        <Lead term="Local law.">
          You are responsible for ensuring that your use of the Service and acquisition of Skins is
          lawful in your location. We do not represent that the Service is appropriate or available
          in every jurisdiction.
        </Lead>
      </Clause>

      <Clause heading="4. Accounts and Steam Login">
        <Lead term="Registration information.">
          You must provide accurate, current and complete information and keep it updated. We may
          request reasonable verification where necessary to process a payment, prevent fraud,
          recover an Account or meet legal obligations.
        </Lead>
        <Lead term="Steam authentication.">
          Steam Login authenticates your Steam identity. We do not ask for or store your Steam
          password. Steam credentials must be entered only on an authentic Steam-controlled page.
        </Lead>
        <Lead term="One person, one Account.">
          You must not create or control multiple Accounts to evade restrictions, promotional limits,
          fraud controls, payment disputes or a suspension.
        </Lead>
        <Lead term="Account security.">
          You are responsible for protecting your email account, device, Steam account, Steam Guard
          and other authentication methods. Notify us promptly if you suspect unauthorised access.
        </Lead>
        <Lead term="Trade URL.">
          You must provide a valid Steam Trade URL associated with the Steam account authenticated
          through the Service. We are not responsible for delay or failed delivery caused by an
          inaccurate, expired or unauthorised Trade URL, but we will provide the remedies described
          in the Delivery Policy and Refund and Cancellation Policy.
        </Lead>
      </Clause>

      <Clause heading="5. Nature of Skins and third-party services">
        <Lead term="Digital nature.">
          Skins are digital items used within third-party games and services. No physical goods are
          shipped.
        </Lead>
        <Lead term="Rights supplied.">
          Your purchase gives you the rights associated with the relevant Skin as recognised within
          Steam and the applicable game. Valve Corporation or the relevant publisher may characterise
          those rights as licensed, revocable or subject to platform rules rather than as ownership
          of physical property.
        </Lead>
        <Lead term="Steam rules.">
          You must comply with the Steam Subscriber Agreement, Steam trading rules and any relevant
          game terms. We cannot amend or waive rules imposed by Valve Corporation or a game
          publisher.
        </Lead>
        <Lead term="Independent service.">
          EarnerSkins is independent and is not affiliated with, endorsed by or sponsored by Valve
          Corporation, Facepunch Studios or any other game publisher. Trade names, game names, images
          and marks belong to their respective owners.
        </Lead>
        <Lead term="External changes.">
          Steam, a game publisher or the Inventory and Fulfilment Provider may change trading rules,
          protection periods, technical requirements or item availability. We will use reasonable
          efforts to minimise disruption but cannot guarantee that third-party systems will remain
          unchanged or continuously available.
        </Lead>
      </Clause>

      <Clause heading="6. Orders and contract formation">
        <Lead term="Product information.">
          We take reasonable care to display the correct Skin, game, condition, exterior, float,
          pattern, stickers and other available attributes. The identifying information shown at
          checkout forms part of your order.
        </Lead>
        <Lead term="Invitation to order.">
          A catalog listing is an invitation to place an order and not a binding offer. Availability
          may change because inventory information is supplied through a third-party API and Steam
          transfers may occur outside our control.
        </Lead>
        <Lead term="Submitting an order.">
          By selecting a Skin, confirming the total price and activating the button that clearly
          indicates an obligation to pay, you submit an offer to purchase the identified Skin from{" "}
          {COMPANY.legalName}.
        </Lead>
        <Lead term="Acknowledgement and acceptance.">
          An automated acknowledgement confirms receipt but does not by itself accept the order. A
          contract is formed when we confirm acceptance and reservation of the Skin, begin delivery,
          or otherwise expressly confirm that the order has been accepted, whichever occurs first.
        </Lead>
        <Lead term="Availability checks.">
          We may decline or cancel an order before delivery if the Skin is unavailable, incorrectly
          described, incorrectly priced, subject to a Steam restriction, affected by suspected fraud
          or cannot lawfully be supplied. Any captured payment will be refunded in accordance with
          the Refund and Cancellation Policy.
        </Lead>
        <Lead term="Order records.">
          Order information and the version of these Terms in force at the time of purchase will be
          made available through the Account, by email or in another durable form that can be
          retained.
        </Lead>
      </Clause>

      <Clause heading="7. Prices, payment and Account Balance">
        <Lead term="Displayed price.">
          The total price payable to us will be shown before the order is submitted. It includes
          charges collected by us for that purchase. Your card issuer or bank may separately charge
          currency conversion or other fees outside our control.
        </Lead>
        <Lead term="Currencies.">
          Prices may be displayed and paid in GBP, EUR or USD, subject to availability. The
          transaction currency selected at checkout is final for that order.
        </Lead>
        <Lead term="Cards.">
          We accept eligible Visa and Mastercard cards. Card payments are processed by an independent
          payment service provider. We do not store complete card numbers or card security codes in
          our database.
        </Lead>
        <Lead term="Account Balance.">
          Account Balance may be purchased with an eligible card or issued as a refund, adjustment or
          promotion. It may be used only for eligible purchases, is not transferable between users,
          does not earn interest and cannot ordinarily be withdrawn for cash except where required by
          law or expressly allowed by the Payment Policy.
        </Lead>
        <Lead term="Payment checks.">
          A payment or order may be delayed, declined or cancelled for authentication, sanctions,
          fraud-prevention, chargeback-risk or legal checks. We may request proportionate additional
          information but will not ask you to disclose a full card number or Steam password by email.
        </Lead>
      </Clause>

      <Clause heading="8. Immediate supply and cancellation">
        <Lead term="Express request for immediate supply.">
          Skins are normally supplied before the end of the statutory 14-day cancellation period.
          Before we begin immediate supply, checkout will ask you to expressly request that supply
          begin and acknowledge that, once supply of the digital content has begun, your ordinary
          right to cancel may be lost to the extent permitted by law.
        </Lead>
        <Lead term="No waiver of mandatory remedies.">
          Immediate-supply consent does not remove any right or remedy that cannot lawfully be
          excluded, including remedies where a Skin is not as described, delivery fails or the
          contract is otherwise breached.
        </Lead>
      </Clause>

      <Clause heading="9. Delivery">
        <Lead term="Delivery methods.">
          A Skin may be delivered by a bot operated or arranged by the Inventory and Fulfilment
          Provider or directly from the Steam account holding the selected Skin. The delivery method
          depends on where the Skin is held.
        </Lead>
        <Lead term="Timing.">
          Bot offers are normally generated within 15 minutes after successful payment. Direct Steam
          delivery may take up to 12 hours for an offer to be sent. These are target times rather
          than absolute guarantees, and any different time shown for a specific order will apply.
        </Lead>
        <Lead term="Acceptance.">
          You must review and accept the correct Steam trade offer within the period shown in the
          order. Direct-delivery offers normally remain available for up to 12 hours. A bot offer may
          expire sooner and may need to be requested again.
        </Lead>
        <Lead term="Completion.">
          Delivery is completed when the purchased Skin is transferred to and appears in the Steam
          inventory linked to the order, subject to any applicable Steam Trade Protection or reversal
          process.
        </Lead>
        <Lead term="Detailed rules.">
          The Delivery Policy forms part of these Terms and explains delivery prerequisites, delays,
          expired offers, verification, failed delivery and Steam reversals.
        </Lead>
      </Clause>

      <Clause heading="10. Customer responsibilities and trade safety">
        <Lead term="Review before acceptance.">
          Before accepting a trade offer, verify the sender, recipient, item name, asset attributes
          and all contents of the offer. Do not accept a different item, a counter-offer or a request
          to send another item or payment.
        </Lead>
        <Lead term="No additional payment through Steam.">
          A legitimate delivery offer for a completed order will not require you to transfer money,
          cryptocurrency, gift cards, another Skin, your Steam API key or your Steam password.
        </Lead>
        <Lead term="Steam readiness.">
          You must maintain an eligible Steam account, a valid Trade URL and any authentication or
          inventory settings reasonably required to receive the Skin. Restrictions caused by Steam
          Guard, trade holds, account limitations or platform enforcement may delay or prevent
          delivery.
        </Lead>
        <Lead term="Suspicious offers.">
          Do not accept an offer that does not match the order. Take screenshots where appropriate
          and contact {COMPANY.email} promptly.
        </Lead>
      </Clause>

      <Clause heading="11. Refunds and payment disputes">
        <Lead term="Refund rules.">
          Cancellation, failed delivery, incorrect items, duplicate charges, Steam reversals and
          other refund situations are governed by the Refund and Cancellation Policy.
        </Lead>
        <Lead term="Original payment method.">
          Unless the law permits otherwise and you expressly choose another method, a card-funded
          refund will be made to the original card. Amounts paid from Account Balance will be
          returned to Account Balance, and mixed payments will normally be refunded proportionately.
        </Lead>
        <Lead term="Chargebacks.">
          Contact us before initiating a chargeback so that we can investigate. Fraudulent, abusive
          or duplicate disputes may result in Account restriction and recovery of reasonable,
          documented losses where permitted by law. Nothing in this clause prevents a good-faith
          dispute or the exercise of a legal right.
        </Lead>
      </Clause>

      <Clause heading="12. Acceptable use">
        <p>You must not use the Service to:</p>
        <ul>
          <li>commit fraud, money laundering, sanctions evasion or any other unlawful act;</li>
          <li>use stolen cards, unauthorised payment instruments or compromised Accounts;</li>
          <li>
            misrepresent identity, age, location, payment ownership or Steam account ownership;
          </li>
          <li>
            interfere with, overload, scrape, reverse engineer or obtain unauthorised access to the
            Service or its API connections;
          </li>
          <li>use bots, scripts or automated purchasing tools without our written permission;</li>
          <li>
            manipulate prices, exploit errors or place orders without a genuine intention to complete
            them;
          </li>
          <li>submit false complaints, false delivery claims or abusive chargebacks; or</li>
          <li>infringe intellectual property, privacy or other rights.</li>
        </ul>
        <Lead term="Error exploitation.">
          If you become aware of an obvious pricing, balance or technical error, you must not exploit
          it and should notify us. We may correct the error, cancel affected orders and reverse
          incorrectly credited Account Balance, while respecting completed transactions and mandatory
          consumer rights.
        </Lead>
      </Clause>

      <Clause heading="13. Suspension and termination">
        <Lead term="Protective action.">
          We may temporarily restrict an Account or order where reasonably necessary to investigate
          suspected fraud, security compromise, sanctions exposure, payment disputes, prohibited
          activity or a material breach of these Terms.
        </Lead>
        <Lead term="Notice and review.">
          Where lawful and reasonably practicable, we will explain the reason and allow you to
          provide relevant information. Immediate action may be taken where delay could expose us, a
          customer or a third party to harm.
        </Lead>
        <Lead term="Account closure.">
          You may request closure by emailing {COMPANY.email}. Closure does not cancel completed
          purchases, chargebacks, refunds, legal retention duties or unresolved claims.
        </Lead>
        <Lead term="Balance on closure.">
          Cash-funded Account Balance will be handled in accordance with the Payment Policy and
          applicable law. Promotional credits may expire on closure where their promotional terms
          permit. We will not confiscate eligible customer funds merely because an Account is closed.
        </Lead>
      </Clause>

      <Clause heading="14. Intellectual property">
        <Lead term="Our materials.">
          The Service, its original text, software, design, databases, arrangement and EarnerSkins
          branding are owned by or licensed to {COMPANY.legalName} and are protected by applicable
          intellectual property laws.
        </Lead>
        <Lead term="Limited permission.">
          We grant you a personal, limited, revocable, non-exclusive and non-transferable permission
          to use the Service for lawful purchases in accordance with these Terms.
        </Lead>
        <Lead term="Third-party materials.">
          Game artwork, Skin imagery, game names, Steam marks and other third-party content remain
          the property of their respective owners and are used for identification and informational
          purposes.
        </Lead>
      </Clause>

      <Clause heading="15. Service availability and liability">
        <Lead term="Reasonable care.">
          We will provide the Service with reasonable care and skill. We do not promise uninterrupted
          operation, constant inventory, a particular resale value, future tradability or continued
          support for any Skin by Steam or a game publisher.
        </Lead>
        <Lead term="Price changes.">
          Skin prices may be volatile. We are not responsible for a change in perceived or resale
          value after a valid purchase, but this does not affect remedies for an incorrect
          description or failed delivery.
        </Lead>
        <Lead term="Foreseeable loss.">
          If we breach these Terms, we are responsible for loss or damage that is a foreseeable
          result of that breach or our failure to use reasonable care and skill. We are not
          responsible for loss that was not foreseeable when the contract was formed.
        </Lead>
        <Lead term="Personal-use limitation.">
          Because the Service is supplied for personal use, we are not responsible for business
          losses such as lost profit, lost revenue, lost opportunity or business interruption, except
          where applicable law provides otherwise.
        </Lead>
        <Lead term="Liability that is not excluded.">
          Nothing in these Terms excludes or limits liability for death or personal injury caused by
          negligence, fraud or fraudulent misrepresentation, breach of mandatory consumer rights, or
          any other liability that cannot lawfully be excluded or limited.
        </Lead>
        <Lead term="Third-party fault.">
          We are not responsible for a Steam account compromise, false trade offer or user action
          that is not caused by our breach or negligence. We remain responsible for our own
          obligations as seller, including the remedies expressly stated in these Terms and the
          incorporated policies.
        </Lead>
      </Clause>

      <Clause heading="16. Changes, law and complaints">
        <Lead term="Changes to the Service.">
          We may update the Service and these Terms for legal, security, operational or commercial
          reasons. Changes will not retroactively reduce rights attached to an order already
          accepted.
        </Lead>
        <Lead term="Current version.">
          The effective date appears at the beginning of these Terms. Material changes will be
          communicated through the Service, by email or another reasonable method before they take
          effect where required.
        </Lead>
        <Lead term="Governing law.">
          These Terms and purchases are governed by the laws of England and Wales. If you are a
          consumer resident elsewhere, you retain any mandatory protections given by the law of your
          country of residence.
        </Lead>
        <Lead term="Courts.">
          The courts of England and Wales will have jurisdiction, but a consumer may also bring
          proceedings in the courts of the place where the consumer lives where mandatory law allows.
        </Lead>
        <Lead term="Complaints.">
          Send complaints to {COMPANY.email} with the order number and relevant evidence. We will
          acknowledge and investigate the complaint within a reasonable period and provide a written
          outcome.
        </Lead>
        <Lead term="Severability.">
          If any provision is found invalid or unenforceable, it will be applied to the maximum
          lawful extent and the remaining provisions will continue in effect.
        </Lead>
        <Lead term="No waiver.">
          A delay in enforcing a right does not waive that right. A waiver is effective only if
          clearly communicated in writing.
        </Lead>
        <Lead term="Entire agreement.">
          These Terms, the order confirmation and the incorporated policies form the agreement
          between you and us concerning the Service and each purchase, subject to any mandatory
          statement or representation that applicable law treats as part of the contract.
        </Lead>
      </Clause>
    </LegalDoc>
  );
}
