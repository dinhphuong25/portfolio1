import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px",
          background:
            "linear-gradient(135deg, rgb(15, 23, 42) 0%, rgb(30, 41, 59) 55%, rgb(67, 56, 202) 100%)",
          color: "white",
          fontFamily: "Inter, Arial, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            fontSize: "30px",
            opacity: 0.92,
          }}
        >
          <div
            style={{
              width: "14px",
              height: "14px",
              borderRadius: "9999px",
              background: "rgb(129, 140, 248)",
            }}
          />
          Kim Đình Phương Portfolio
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <div
            style={{
              fontSize: "72px",
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              maxWidth: "1020px",
            }}
          >
            Logistics • Supply Chain • Product Mindset
          </div>
          <div
            style={{
              fontSize: "34px",
              opacity: 0.88,
              maxWidth: "1000px",
              lineHeight: 1.35,
            }}
          >
            Student profile, projects, tutorials, and practical insights by Kim Đình Phương
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: "28px",
            opacity: 0.9,
          }}
        >
          kimdinhphuong.dev
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
