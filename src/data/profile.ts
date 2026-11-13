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
  title: "Logistics & Web Development",
  tagline: "Sinh viên ngành Logistics & Quản lý chuỗi cung ứng với niềm đam mê công nghệ thông tin và lập trình web.",
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
    { platform: "Facebook", url: "https://www.facebook.com/kimdinhphuongg/", label: "kimdinhphuongg" },
    { platform: "LinkedIn", url: "https://www.linkedin.com/in/dinhphuongg/", label: "dinhphuongg" },
    { platform: "Instagram", url: "https://www.instagram.com/dinhphuongg_", label: "@dinhphuongg_" },
    { platform: "TikTok", url: "https://www.tiktok.com/@_dinhphuongg", label: "@_dinhphuongg" },
    { platform: "GitHub", url: "https://github.com/kimdinhphuong", label: "@kimdinhphuong" },
  ],
  about: [
    "Hello everyone! I am Kim Dinh Phuong, currently a student majoring in Logistics and Supply Chain Management. Beyond my academic field, I have a deep passion for information technology, software development, and the fascinating world of coding.",
    "I have always been intrigued by how an idea can turn into a real-world product through logical thinking and programming skills. To me, code is not just syntax and commands, but a way to solve problems, generate value, and bring creative ideas to life.",
    "Despite studying Logistics, I consistently see a powerful connection between this discipline and technology — from supply chain management and workflow optimization to operations automation and data analysis.",
    "I aspire to combine the analytical mindset of a Logistics student with my passion for coding to create pragmatic technology solutions that simplify everyday work, optimize processes, and deliver better user experiences.",
    "Continuous learning – Embracing challenges – Relentlessly creating and turning ideas into tangible products.",
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
