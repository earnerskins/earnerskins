import { POLICIES, COMPANY } from "./config";

export interface FaqItem {
  q: string;
  a: string;
  category: string;
}

export const FAQS: FaqItem[] = [
  {
    category: "Delivery",
    q: "How fast is delivery?",
    a: `Delivery is instant. Because skins are digital items, they are delivered to your account moments after your payment is confirmed — there is no shipping wait.`,
  },
  {
    category: "Delivery",
    q: "Which games do you cover?",
    a: "We sell skins for CS2, Team Fortress 2 and Rust. Each game has its own categories and rarity scale, all browsable from the top navigation.",
  },
  {
    category: "Payment",
    q: "What payment methods do you accept?",
    a: "We accept Visa and Mastercard. All payments are processed over encrypted, PCI DSS-compliant connections.",
  },
  {
    category: "Payment",
    q: "Which currencies can I pay in?",
    a: "You can view and pay in GBP, EUR or USD. Use the currency selector in the header — prices update everywhere instantly and your choice is remembered.",
  },
  {
    category: "Payment",
    q: "Are there any hidden fees?",
    a: "No. The price you see is the price you pay. All applicable charges are already included in the displayed price.",
  },
  {
    category: "Refunds",
    q: "What is your refund policy?",
    a: `You can request a refund within ${POLICIES.refundWindowDays} days for any item that has not yet been delivered to your game account. Once a digital skin has been delivered, it cannot be returned. See our Refund Policy for full details.`,
  },
  {
    category: "Account",
    q: "How does my account balance work?",
    a: "You can top up your account balance and use it to check out instantly. Every top-up and purchase is recorded in your transaction history.",
  },
  {
    category: "Account",
    q: "Is my information secure?",
    a: "Yes. We store your details securely and never share your payment information. Enable two-factor authentication on your game account for extra protection.",
  },
  {
    category: "Support",
    q: "How do I contact support?",
    a: `Our support team is available ${POLICIES.supportHours}. Email us at ${COMPANY.email} or use the contact page and we'll get back to you quickly.`,
  },
];

export const HOME_FAQS = FAQS.slice(0, 5);
