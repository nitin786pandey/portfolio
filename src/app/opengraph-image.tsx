import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const alt = "Nitin Pandey · Product Manager, LLM & agentic AI";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
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
          background: "radial-gradient(700px circle at 15% 10%, rgba(124,92,255,.28), transparent 70%), #0A0B0D",
          color: "#E8EAED",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 26, color: "#C9C3FF" }}>
          <div style={{ width: 14, height: 14, borderRadius: 7, background: "#3DDC97" }} />
          Product Manager, LLM &amp; agentic AI
        </div>
        <div style={{ fontSize: 132, fontWeight: 700, letterSpacing: -5, lineHeight: 1, marginTop: 30 }}>Nitin</div>
        <div style={{ fontSize: 132, fontWeight: 700, letterSpacing: -5, lineHeight: 1, color: "#a693ff" }}>Pandey.</div>
        <div style={{ fontSize: 28, color: "#8A8F98", marginTop: 36 }}>
          PM on Manifest AI at Bik.ai · I ship agents I use every day.
        </div>
      </div>
    ),
    size,
  );
}
