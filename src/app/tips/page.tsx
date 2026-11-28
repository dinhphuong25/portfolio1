import type { Metadata } from "next";
import TipsPageClient from "@/components/pages/TipsPageClient";

export const metadata: Metadata = {
    title: "Chia sẻ thủ thuật | Kim Đình Phương",
    description: "Kho tàng mẹo vặt, thủ thuật công nghệ, tối ưu quy trình và những bài học thực chiến hữu ích.",
    alternates: {
        canonical: "/tips",
    },
    openGraph: {
        title: "Chia sẻ thủ thuật | Guides & Tips | Kim Đình Phương",
        description: "Kho tàng mẹo vặt, thủ thuật công nghệ, tối ưu quy trình và những bài học thực chiến hữu ích.",
        url: "/tips",
        images: ["/opengraph-image"],
    },
};

export default function TipsPage() {
    return <TipsPageClient />;
}
