import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Apple touch icon (180x180) generated from the EarnerSkins prism mark.
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#101114",
        }}
      >
        <svg width="132" height="132" viewBox="0 0 32 32" fill="none">
          <path d="M16 5 L27 25 H5 Z" fill="#1D1F26" stroke="#3A3D48" strokeWidth="1.4" strokeLinejoin="round" />
          <path d="M16 5 L16 25" stroke="#2C2F39" strokeWidth="1" />
          <path d="M11.5 16 L20.5 16 L23.5 22 L8.5 22 Z" fill="#6EE7B7" />
          <path d="M3 12 L11.5 16" stroke="#EDEFF3" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
      </div>
    ),
    { ...size },
  );
}
