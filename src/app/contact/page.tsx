import type { Metadata } from "next";
import ContactPageClient from "@/components/pages/ContactPageClient";

export const metadata: Metadata = {
    title: "Contact",
    description: "Contact Kim Đình Phương to discuss logistics projects, partnerships, or career opportunities.",
    alternates: {
        canonical: "/contact",
    },
    openGraph: {
        title: "Contact | Kim Đình Phương",
        description: "Connect and send a direct message to Kim Đình Phương.",
        url: "/contact",
        images: ["/opengraph-image"],
    },
};

export default function ContactPage() {
    return <ContactPageClient />;
}
