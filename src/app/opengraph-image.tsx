import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "GFS EPM — One Additive. Five Functions. Zero Compromise.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#020617",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px",
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
        }}
      >
        {/* Top: logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              background: "#0ea5e9",
              borderRadius: "12px",
              width: "52px",
              height: "52px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontWeight: 700,
              fontSize: "16px",
              letterSpacing: "-0.5px",
            }}
          >
            GFS
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ color: "#f1f5f9", fontWeight: 600, fontSize: "20px" }}>GFS EPM</span>
            <span style={{ color: "#94a3b8", fontSize: "13px" }}>Enhanced Performance Material</span>
          </div>
        </div>

        {/* Middle: headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ color: "#f1f5f9", fontSize: "52px", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-1px" }}>
            One additive.
            <br />
            Five functions.
            <br />
            <span style={{ color: "#0ea5e9" }}>Zero compromise.</span>
          </div>
          <div style={{ color: "#94a3b8", fontSize: "20px", maxWidth: "700px", lineHeight: 1.5 }}>
            Replaces 3–5 fuel additives in a single solution for refineries, marine, and upstream operations.
          </div>
        </div>

        {/* Bottom: metrics */}
        <div style={{ display: "flex", gap: "40px" }}>
          {[
            ["30–40%", "Sulfur reduction"],
            ["95–99%", "Combustion efficiency"],
            ["$1.50–3.00", "Per barrel all-in"],
          ].map(([val, label]) => (
            <div key={label} style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <span style={{ color: "#34d399", fontWeight: 700, fontSize: "24px" }}>{val}</span>
              <span style={{ color: "#64748b", fontSize: "13px" }}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size },
  );
}
