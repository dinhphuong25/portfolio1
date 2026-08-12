import { ImageResponse } from "next/og";
import { profileData } from "@/data/profile";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "80px",
          backgroundColor: "#0b0f19", // deep dark slate
          backgroundImage: `
            radial-gradient(circle at 90% 10%, rgba(99, 102, 241, 0.15) 0%, transparent 60%),
            radial-gradient(circle at 10% 90%, rgba(6, 182, 212, 0.12) 0%, transparent 60%),
            linear-gradient(135deg, #0b0f19 0%, #111827 50%, #1e1b4b 100%)
          `,
        }}
      >
        {/* Left Side: Brand & Bio & Badges */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
            width: "60%",
          }}
        >
          {/* Top Branding & Location */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span
              style={{
                backgroundColor: "rgba(99, 102, 241, 0.15)",
                color: "#818cf8",
                padding: "8px 16px",
                borderRadius: "30px",
                fontSize: "18px",
                fontWeight: 600,
                border: "1px solid rgba(99, 102, 241, 0.3)",
              }}
            >
              PORTFOLIO
            </span>
            <span
              style={{
                color: "#94a3b8",
                fontSize: "18px",
                fontWeight: 500,
              }}
            >
              📍 Can Tho, Vietnam 🇻🇳
            </span>
          </div>

          {/* Core Info */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "20px" }}>
            <h1
              style={{
                fontSize: "76px",
                fontWeight: 800,
                color: "#ffffff",
                lineHeight: 1.1,
                letterSpacing: "-0.04em",
                margin: 0,
              }}
            >
              {profileData.name}
            </h1>
            <h2
              style={{
                fontSize: "30px",
                fontWeight: 600,
                color: "#38bdf8", // Sky blue accent
                margin: 0,
              }}
            >
              {profileData.title}
            </h2>
            <p
              style={{
                fontSize: "22px",
                color: "#94a3b8",
                lineHeight: 1.5,
                margin: 0,
                maxWidth: "580px",
              }}
            >
              Logistics & Supply Chain management student focusing on process optimization, WMS solutions, and smart distribution systems.
            </p>
          </div>

          {/* Badges */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "20px" }}>
            {profileData.skills.slice(0, 4).map((skill, index) => (
              <span
                key={index}
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  color: "#cbd5e1",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  padding: "6px 14px",
                  borderRadius: "8px",
                  fontSize: "15px",
                  fontWeight: 600,
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Right Side: Stylized Avatar Card */}
        <div
          style={{
            width: "35%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              padding: "8px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #6366f1 0%, #38bdf8 50%, #ec4899 100%)",
              boxShadow: "0 20px 50px rgba(99, 102, 241, 0.3)",
              display: "flex",
            }}
          >
            <div
              style={{
                padding: "8px",
                borderRadius: "50%",
                backgroundColor: "#0b0f19",
                display: "flex",
              }}
            >
              <div
                style={{
                  width: "220px",
                  height: "220px",
                  borderRadius: "50%",
                  backgroundColor: "#1e293b",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                }}
              >
                {/* Fallback stylized graphics since next/og cannot easily render local next/image assets direct relative paths */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span style={{ fontSize: "72px", fontWeight: "bold", color: "#ffffff", letterSpacing: "-0.05em" }}>
                    KP
                  </span>
                  <span style={{ fontSize: "14px", fontWeight: 600, color: "#818cf8", marginTop: "4px", letterSpacing: "0.1em" }}>
                    VERIFIED PROFILE
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Branding Bar */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            left: "80px",
            right: "80px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            paddingTop: "24px",
          }}
        >
          <span style={{ fontSize: "20px", color: "#818cf8", fontWeight: 600 }}>
            {profileData.website.replace("https://", "")}
          </span>
          <span style={{ fontSize: "18px", color: "#475569" }}>
            © {new Date().getFullYear()} • Built with Next.js & Tailwind
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
