import { ImageResponse } from "next/og";
import { getTutorialBySlug } from "@/data/tutorials";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tutorial = getTutorialBySlug(slug);

  const title = tutorial?.title ?? "Tutorial";
  const subtitle = tutorial?.description ?? "Learning content and practical guides";

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
          background: "linear-gradient(135deg, #111827 0%, #4338ca 100%)",
          color: "white",
          fontFamily: "Inter, Arial, sans-serif",
        }}
      >
        <div style={{ fontSize: 30, opacity: 0.9 }}>Tutorials • Kim Đình Phương</div>
        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <div style={{ fontSize: 68, fontWeight: 800, lineHeight: 1.06, letterSpacing: "-0.02em" }}>{title}</div>
          <div style={{ fontSize: 30, opacity: 0.9, lineHeight: 1.3 }}>{subtitle}</div>
        </div>
        <div style={{ fontSize: 26, opacity: 0.85 }}>kimdinhphuong.dev/tut/{slug}</div>
      </div>
    ),
    size
  );
}
