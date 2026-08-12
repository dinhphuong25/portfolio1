import { ImageResponse } from "next/og";
import { getProjectById } from "@/data/projects";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = getProjectById(id);

  const title = project?.title ?? "Project";
  const subtitle = project?.summary ?? "Case study and project details";

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
          background: "linear-gradient(135deg, #0f172a 0%, #0f766e 100%)",
          color: "white",
          fontFamily: "Inter, Arial, sans-serif",
        }}
      >
        <div style={{ fontSize: 30, opacity: 0.9 }}>Projects • Kim Đình Phương</div>
        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <div style={{ fontSize: 68, fontWeight: 800, lineHeight: 1.06, letterSpacing: "-0.02em" }}>{title}</div>
          <div style={{ fontSize: 30, opacity: 0.9, lineHeight: 1.3 }}>{subtitle}</div>
        </div>
        <div style={{ fontSize: 26, opacity: 0.85 }}>kimdinhphuong.dev/projects/{id}</div>
      </div>
    ),
    size
  );
}
