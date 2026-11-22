import type { Metadata } from "next";
import HomeClient from "@/components/pages/HomeClient";

export const metadata: Metadata = {
  title: "Đình Phương | Portfolio",
  description:
    "Portfolio của Đình Phương - Sinh viên ngành Logistics và Quản lý chuỗi cung ứng với niềm đam mê công nghệ thông tin và lập trình web.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Đình Phương | Portfolio",
    description:
      "Khám phá hồ sơ cá nhân và các dự án phát triển web của Đình Phương.",
    url: "/",
    images: ["/opengraph-image"],
  },
  twitter: {
    title: "Đình Phương | Portfolio",
    description:
      "Khám phá hồ sơ cá nhân và các sản phẩm công nghệ của Đình Phương.",
    images: ["/twitter-image"],
  },
};

export default function Home() {
  return <HomeClient />;
}
