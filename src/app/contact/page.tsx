import type { Metadata } from "next";
import ContactPageClient from "@/components/pages/ContactPageClient";

export const metadata: Metadata = {
    title: "Contact",
    description: "Contact Dinh Phuong to discuss logistics projects, partnerships, or career opportunities.",
    alternates: {
        canonical: "/contact",
    },
    openGraph: {
        title: "Contact | Đình Phương",
        description: "Connect and send a direct message to Dinh Phuong.",
        url: "/contact",
        images: ["/opengraph-image"],
    },
};

export default function ContactPage() {
    return <ContactPageClient />;
}
