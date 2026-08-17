import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { LegalDoc, Clause } from "@/components/content/LegalDoc";
import { PaymentMarks } from "@/components/ui/PaymentMarks";
import { POLICIES } from "@/lib/config";

export const metadata: Metadata = pageMetadata({
  title: "Payment Policy",
  description: "Accepted payment methods, currencies and security at EarnerSkins.",
  path: "/legal/payment",
});

export default function PaymentPolicyPage() {
  return (
    <LegalDoc
      title="Payment Policy"
      intro="Everything you need to know about paying for your order safely."
    >
      <Clause heading="1. Accepted methods">
        <p>We accept the following payment methods, plus your EarnerSkins account balance:</p>
        <div className="pt-2">
          <PaymentMarks />
        </div>
      </Clause>

      <Clause heading="2. Currencies">
        <p>
          You can view and pay in GBP, EUR or USD. Use the currency selector in the header — prices
          update everywhere instantly and your choice is remembered on your device.
        </p>
      </Clause>

      <Clause heading="3. Security">
        <p>
          All card payments are processed over encrypted connections in line with PCI DSS standards.
          We never store your full card details.
        </p>
      </Clause>

      <Clause heading="4. Pricing & fees">
        <p>
          The price you see is the price you pay. There are no hidden charges and no separate service
          fee{POLICIES.serviceFeePence === 0 ? "" : ""}. All applicable charges are already included
          in the displayed price.
        </p>
      </Clause>

      <Clause heading="5. Account balance">
        <p>
          You can top up your balance in advance and use it to check out instantly. Every top-up and
          purchase is recorded in your transaction history.
        </p>
      </Clause>

      <Clause heading="6. Failed payments">
        <p>
          If a payment fails, your order will not be completed and no item will be delivered. You can
          simply try again with a different method.
        </p>
      </Clause>
    </LegalDoc>
  );
}
