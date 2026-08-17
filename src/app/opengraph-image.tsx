import { ImageResponse } from "next/og";
import { COMPANY } from "@/lib/config";

export const alt = `${COMPANY.brand} — Buy CS2, Team Fortress 2 & Rust Skins`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#101114",
          backgroundImage:
            "radial-gradient(60% 80% at 80% 20%, rgba(184,240,74,0.18), transparent), radial-gradient(50% 60% at 10% 90%, rgba(124,92,255,0.20), transparent)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              background: "linear-gradient(135deg, #7C5CFF, #35E0D0, #B8F04A)",
            }}
          />
          <span style={{ fontSize: 44, fontWeight: 700, color: "#EDEFF3" }}>{COMPANY.brand}</span>
        </div>

        <div
          style={{
            marginTop: 40,
            fontSize: 72,
            fontWeight: 700,
            lineHeight: 1.05,
            color: "#EDEFF3",
            maxWidth: 900,
          }}
        >
          The vault for game skins
        </div>

        <div style={{ marginTop: 28, fontSize: 32, color: "#8A8F9C" }}>
          CS2 · Team Fortress 2 · Rust — instant delivery
        </div>
      </div>
    ),
    size,
  );
}
