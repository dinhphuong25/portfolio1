import type { Metadata } from "next";
import HomeClient from "@/components/pages/HomeClient";

export const metadata: Metadata = {
  title: "Kim Đình Phương | Portfolio",
  description:
    "Portfolio của Kim Đình Phương - Sinh viên ngành Logistics và Quản lý chuỗi cung ứng với niềm đam mê công nghệ thông tin và lập trình web.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Kim Đình Phương | Portfolio",
    description:
      "Khám phá hồ sơ cá nhân và các dự án phát triển web của Kim Đình Phương.",
    url: "/",
    images: ["/opengraph-image"],
  },
  twitter: {
    title: "Kim Đình Phương | Portfolio",
    description:
      "Khám phá hồ sơ cá nhân và các sản phẩm công nghệ của Kim Đình Phương.",
    images: ["/twitter-image"],
  },
};

export default function Home() {
  return <HomeClient />;
}
