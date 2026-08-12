import type { Metadata } from "next";
import HomeClient from "@/components/pages/HomeClient";

export const metadata: Metadata = {
  title: "Home | Kim Đình Phương",
  description:
    "Portfolio of Kim Đình Phương - a third-year Logistics student focused on supply chain optimization and warehouse operations.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Kim Đình Phương - Logistics Profile",
    description:
      "Explore profile, experience, and featured projects in logistics, supply chain, and warehouse operations.",
    url: "/",
    images: ["/opengraph-image"],
  },
  twitter: {
    title: "Kim Đình Phương - Logistics Profile",
    description:
      "Explore Kim Đình Phương's profile and logistics projects.",
    images: ["/twitter-image"],
  },
};

export default function Home() {
  return <HomeClient />;
}
