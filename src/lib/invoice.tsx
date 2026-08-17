import "server-only";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  renderToBuffer,
} from "@react-pdf/renderer";
import { COMPANY } from "./config";
import { formatPrice, type CurrencyCode } from "./currency";

export interface InvoiceData {
  orderNumber: string;
  date: string;
  customerName: string;
  customerEmail: string;
  currency: CurrencyCode;
  lines: { name: string; game: string; wear: string | null; pricePence: number; quantity: number }[];
  subtotalPence: number;
  serviceFeePence: number;
  totalPence: number;
}

const s = StyleSheet.create({
  page: { padding: 40, fontSize: 10, color: "#14161C", fontFamily: "Helvetica" },
  row: { flexDirection: "row", justifyContent: "space-between" },
  brand: { fontSize: 20, fontWeight: 700 },
  muted: { color: "#5B616E" },
  h2: { fontSize: 12, fontWeight: 700, marginBottom: 6, marginTop: 18 },
  th: { flexDirection: "row", borderBottom: "1px solid #E2E4EA", paddingBottom: 6, marginTop: 10 },
  td: { flexDirection: "row", paddingVertical: 6, borderBottom: "1px solid #F0F1F4" },
  cName: { width: "50%" },
  cQty: { width: "15%", textAlign: "right" },
  cPrice: { width: "35%", textAlign: "right" },
  totalRow: { flexDirection: "row", justifyContent: "flex-end", marginTop: 6 },
  totalLabel: { width: 120, textAlign: "right", marginRight: 12 },
  totalVal: { width: 90, textAlign: "right" },
});

function InvoiceDoc({ data }: { data: InvoiceData }) {
  const f = (p: number) => formatPrice(p, data.currency);
  return (
    <Document title={`EarnerSkins Invoice ${data.orderNumber}`}>
      <Page size="A4" style={s.page}>
        <View style={s.row}>
          <View>
            <Text style={s.brand}>EarnerSkins</Text>
            <Text style={s.muted}>Multi-game skins store</Text>
          </View>
          <View style={{ textAlign: "right" }}>
            <Text style={{ fontSize: 14, fontWeight: 700 }}>INVOICE</Text>
            <Text style={s.muted}>{data.orderNumber}</Text>
            <Text style={s.muted}>{data.date}</Text>
          </View>
        </View>

        <View style={{ ...s.row, marginTop: 24 }}>
          <View>
            <Text style={s.h2}>Sold by</Text>
            <Text>{COMPANY.legalName}</Text>
            <Text style={s.muted}>{COMPANY.address}</Text>
            <Text style={s.muted}>Reg: {COMPANY.regNumber}</Text>
            <Text style={s.muted}>{COMPANY.email}</Text>
            <Text style={s.muted}>{COMPANY.phone}</Text>
          </View>
          <View>
            <Text style={s.h2}>Billed to</Text>
            <Text>{data.customerName}</Text>
            <Text style={s.muted}>{data.customerEmail}</Text>
          </View>
        </View>

        <View style={s.th}>
          <Text style={{ ...s.cName, fontWeight: 700 }}>Item</Text>
          <Text style={{ ...s.cQty, fontWeight: 700 }}>Qty</Text>
          <Text style={{ ...s.cPrice, fontWeight: 700 }}>Price</Text>
        </View>
        {data.lines.map((l, i) => (
          <View style={s.td} key={i}>
            <View style={s.cName}>
              <Text>{l.name}</Text>
              <Text style={s.muted}>
                {l.game.toUpperCase()}
                {l.wear ? ` · ${l.wear}` : ""}
              </Text>
            </View>
            <Text style={s.cQty}>{l.quantity}</Text>
            <Text style={s.cPrice}>{f(l.pricePence * l.quantity)}</Text>
          </View>
        ))}

        <View style={{ ...s.totalRow, marginTop: 14 }}>
          <Text style={s.totalLabel}>Subtotal</Text>
          <Text style={s.totalVal}>{f(data.subtotalPence)}</Text>
        </View>
        {data.serviceFeePence > 0 && (
          <View style={s.totalRow}>
            <Text style={s.totalLabel}>Service fee</Text>
            <Text style={s.totalVal}>{f(data.serviceFeePence)}</Text>
          </View>
        )}
        <View style={s.totalRow}>
          <Text style={{ ...s.totalLabel, fontWeight: 700 }}>Total paid</Text>
          <Text style={{ ...s.totalVal, fontWeight: 700 }}>{f(data.totalPence)}</Text>
        </View>

        <Text style={{ ...s.muted, marginTop: 30, fontSize: 8 }}>
          All prices are inclusive. Digital skins are delivered instantly to your account. Thank you
          for shopping with EarnerSkins.
        </Text>
      </Page>
    </Document>
  );
}

export async function renderInvoicePdf(data: InvoiceData): Promise<Buffer> {
  return renderToBuffer(<InvoiceDoc data={data} />);
}
