import visa from "@/app/assets/visa.svg";
import mastercard from "@/app/assets/mastercard.svg";
import pciDss from "@/app/assets/pci-dss.svg";

/**
 * Official Visa, Mastercard and PCI DSS marks, served from the brand SVG assets
 * in `src/app/assets`. Rendered on their own white chips so they stay crisp and
 * full-colour on any surface (dark footer included).
 */
const MARKS = [
  { src: visa.src, label: "Visa" },
  { src: mastercard.src, label: "Mastercard" },
  { src: pciDss.src, label: "PCI DSS Compliant" },
] as const;

export function PaymentMarks({ className }: { className?: string }) {
  return (
    <div className={className ?? "flex items-center gap-2"}>
      {MARKS.map((m) => (
        <span
          key={m.label}
          className="inline-flex h-8 items-center rounded-md border border-hairline bg-white px-2 shadow-sm"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={m.src} alt={m.label} className="h-4 w-auto" />
        </span>
      ))}
    </div>
  );
}
