export interface SocialLink {
  platform: string;
  url: string;
  label: string;
}

export interface ProfileData {
  name: string;
  title: string;
  tagline: string;
  location: {
    city: string;
    country: string;
    countryCode: string;
  };
  avatar: string;
  email: string;
  website: string;
  portfolio: string;
  socialLinks: SocialLink[];
  about: string[];
  skills: string[];
  tools: string[];
}

export const profileData: ProfileData = {
  name: "Kim Đình Phương",
  title: "Founder @ Hi Tech - All In One | Web Developer",
  tagline: "Founder của hệ sinh thái số Hi Tech - All In One, đam mê xây dựng các sản phẩm web hiện đại, UI/UX tối ưu và giải pháp tiện ích.",
  location: {
    city: "Can Tho",
    country: "Vietnam",
    countryCode: "vn",
  },
  avatar: "/avatar.jpg",
  email: "contact@dinhphuong.dev",
  website: "https://dinhphuong.dev",
  portfolio: "@kimdinhphuong",
  socialLinks: [
    { platform: "Facebook", url: "https://www.facebook.com/dinhphuongkim250705/", label: "dinhphuongkim250705" },
    { platform: "LinkedIn", url: "https://www.linkedin.com/in/kimdinhphuong/", label: "kimdinhphuong" },
    { platform: "Instagram", url: "https://www.instagram.com/xxjdark_/", label: "@xxjdark_" },
    { platform: "TikTok", url: "https://www.tiktok.com/@jdark_xx", label: "@jdark_xx" },
    { platform: "GitHub", url: "https://github.com/kimdinhphuong", label: "@kimdinhphuong" },
  ],
  about: [
    "Hello! I am Kim Dinh Phuong — a web developer and the Founder of Hi Tech - All In One.",
    "Driven by a strong passion for software engineering and creative digital platforms, I focus on building high-performance web applications, developer tools, and smart digital products that serve real everyday needs.",
    "Through the Hi Tech - All In One ecosystem, I build and operate impactful projects such as HiTOEIC, Ez Tool, and Hi Phim, applying modern technologies like Next.js, TypeScript, Tailwind CSS, and AI automation.",
    "My long-term aspiration is to scale the Hi Tech - All In One ecosystem into a comprehensive all-in-one digital hub, continuously innovating and delivering delightful user experiences.",
    "I believe in continuous learning, pragmatic code craftsmanship, and fostering meaningful collaborations with developers and tech enthusiasts.",
  ],
  skills: [
    "Supply Chain Management",
    "Inventory Planning",
    "Logistics Optimization",
    "Transportation Management",
    "Warehouse Operations",
    "Data Analysis",
    "Project Management",
    "Strategic Planning",
    "Cost Analysis",
    "Process Improvement",
  ],
  tools: [
    "Microsoft Excel",
    "SAP ERP",
    "Tableau",
    "Power BI",
    "AutoCAD",
    "WMS Software",
    "Google Analytics",
    "Microsoft Project",
    "Notion",
    "Slack",
  ],
};
