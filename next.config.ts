import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

initOpenNextCloudflareForDev();

const nextConfig: NextConfig = {
  compress: true,
  experimental: {
    optimizePackageImports: ["framer-motion", "recharts", "lucide-react"],
  },
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 64, 96, 128, 256],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    remotePatterns: [
      {
        protocol: "https",
        hostname: "flagcdn.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cafefcdn.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**.techcrunch.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "techcrunch.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**.vox-cdn.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.vox-cdn.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.arstechnica.net",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**.vnecdn.net",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "vlr.vn",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "vla.com.vn",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
