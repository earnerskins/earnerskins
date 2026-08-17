import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { LegalDoc, Clause } from "@/components/content/LegalDoc";
import { COMPANY, POLICIES, NOT_AFFILIATED_DISCLAIMER } from "@/lib/config";

export const metadata: Metadata = pageMetadata({
  title: "Terms & Conditions",
  description: "The terms governing your use of the EarnerSkins store and your purchases.",
  path: "/legal/terms",
});

export default function TermsPage() {
  return (
    <LegalDoc
      title="Terms & Conditions"
      intro="Please read these terms carefully. By using EarnerSkins or placing an order, you agree to be bound by them."
    >
      <Clause heading="1. Who we are">
        <p>
          EarnerSkins is a store operated by {COMPANY.legalName}, registered at {COMPANY.address}. We
          sell digital in-game cosmetic items (&ldquo;skins&rdquo;) for CS2, Team Fortress 2 and Rust.
          You can reach us at {COMPANY.email}.
        </p>
      </Clause>

      <Clause heading="2. Eligibility">
        <p>
          You must be at least 18 years old and legally able to enter a contract to buy from us. We
          do not sell to customers in territories where we are unable to lawfully operate.
        </p>
      </Clause>

      <Clause heading="3. Orders & pricing">
        <p>
          All prices are shown in your selected currency (GBP, EUR or USD) and include all
          applicable charges — the price you see is the price you pay. An order is a request to buy;
          a contract is formed once we confirm your order by email. We reserve the right to decline
          or cancel an order and issue a full refund where an item is mispriced or unavailable.
        </p>
      </Clause>

      <Clause heading="4. Delivery">
        <p>
          {POLICIES.deliveryDetail} Delivery times may vary slightly depending on platform
          conditions outside our control. If an item cannot be delivered, we will refund it in full.
        </p>
      </Clause>

      <Clause heading="5. Refunds">
        <p>
          You may request a refund within {POLICIES.refundWindowDays} days for any item that has not
          yet been delivered to your game account. Once a digital skin has been delivered it cannot
          be returned. Full details are in our Refund Policy.
        </p>
      </Clause>

      <Clause heading="6. Acceptable use">
        <ul>
          <li>Do not use the store for fraudulent or unlawful purposes.</li>
          <li>Do not attempt to disrupt, reverse-engineer or gain unauthorised access to the site.</li>
          <li>Keep your account credentials secure; you are responsible for activity on your account.</li>
        </ul>
      </Clause>

      <Clause heading="7. Liability">
        <p>
          We provide the store with reasonable care and skill but do not exclude any liability that
          cannot lawfully be excluded. To the extent permitted by law, we are not liable for losses
          that were not reasonably foreseeable.
        </p>
      </Clause>

      <Clause heading="8. Intellectual property">
        <p>{NOT_AFFILIATED_DISCLAIMER}</p>
      </Clause>

      <Clause heading="9. Changes to these terms">
        <p>
          We may update these terms from time to time. The version in force is the one published on
          this page at the time of your order.
        </p>
      </Clause>
    </LegalDoc>
  );
}
