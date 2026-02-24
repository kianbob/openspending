import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "OpenSpending — Follow the Federal Dollar";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #1e3a5f 0%, #2563eb 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "60px 80px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "24px",
            gap: "16px",
          }}
        >
          <div
            style={{
              width: "56px",
              height: "56px",
              background: "rgba(255,255,255,0.2)",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "24px",
              fontWeight: 700,
            }}
          >
            OS
          </div>
          <span
            style={{
              color: "rgba(255,255,255,0.8)",
              fontSize: "28px",
              fontWeight: 600,
            }}
          >
            OpenSpending
          </span>
        </div>
        <div
          style={{
            fontSize: "60px",
            fontWeight: 700,
            color: "white",
            lineHeight: 1.1,
            marginBottom: "24px",
          }}
        >
          Follow the Federal Dollar
        </div>
        <div
          style={{
            fontSize: "28px",
            color: "rgba(191,219,254,0.9)",
            lineHeight: 1.4,
          }}
        >
          $6.75T in spending · 97 agencies · Contractors, grants & waste
        </div>
        <div
          style={{
            fontSize: "18px",
            color: "rgba(191,219,254,0.6)",
            marginTop: "32px",
          }}
        >
          Data from USASpending.gov · openspending.us
        </div>
      </div>
    ),
    { ...size }
  );
}
