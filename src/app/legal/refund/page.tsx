import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { LegalDoc, Clause } from "@/components/content/LegalDoc";
import { COMPANY, POLICIES } from "@/lib/config";

export const metadata: Metadata = pageMetadata({
  title: "Refund Policy",
  description: `Our ${POLICIES.refundWindowDays}-day refund window and how digital delivery affects returns.`,
  path: "/legal/refund",
});

export default function RefundPolicyPage() {
  return (
    <LegalDoc
      title="Refund Policy"
      intro={`We want you to buy with confidence. Here is exactly how refunds work at EarnerSkins.`}
    >
      <Clause heading="1. Refund window">
        <p>
          You may request a refund within {POLICIES.refundWindowDays} days of purchase for any item
          that has <strong className="text-ink">not yet been delivered</strong> to your game account.
        </p>
      </Clause>

      <Clause heading="2. Delivered digital items">
        <p>
          Because skins are digital goods delivered instantly, once an item has been delivered to
          your account it cannot be returned or refunded. This is standard for digital products and
          is in line with consumer law for items that are &ldquo;unsealed&rdquo; on delivery.
        </p>
      </Clause>

      <Clause heading="3. When we always refund">
        <ul>
          <li>An item could not be delivered for any reason.</li>
          <li>You were charged incorrectly or more than once.</li>
          <li>An order was cancelled by us due to a pricing error or unavailability.</li>
        </ul>
      </Clause>

      <Clause heading="4. How to request a refund">
        <p>
          Email {COMPANY.email} with your order number. Our support team is available{" "}
          {POLICIES.supportHours} and will confirm eligibility promptly.
        </p>
      </Clause>

      <Clause heading="5. How refunds are issued">
        <p>
          Approved refunds are returned to your original payment method, or to your EarnerSkins account
          balance if you prefer. Bank processing times may vary.
        </p>
      </Clause>
    </LegalDoc>
  );
}
