import type { Metadata } from "next";
import HomeClient from "@/components/pages/HomeClient";

export const metadata: Metadata = {
  title: "Kim Đình Phương | Founder @ Hi Tech - All In One",
  description:
    "Portfolio của Kim Đình Phương - Founder @ Hi Tech - All In One. Khám phá các dự án web hiện đại, nền tảng số và công cụ tiện ích cho cộng đồng.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Kim Đình Phương | Founder @ Hi Tech - All In One",
    description:
      "Khám phá hồ sơ cá nhân và các dự án phát triển web, hệ sinh thái số Hi Tech - All In One của Kim Đình Phương.",
    url: "/",
    images: ["/opengraph-image"],
  },
  twitter: {
    title: "Kim Đình Phương | Founder @ Hi Tech - All In One",
    description:
      "Khám phá hồ sơ cá nhân và các sản phẩm số của Kim Đình Phương.",
    images: ["/twitter-image"],
  },
};

export default function Home() {
  return <HomeClient />;
}
