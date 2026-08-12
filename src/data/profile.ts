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
  title: "3rd Year Logistics Student",
  tagline: "I'm a Logistics student at Can Tho University of Technology.",
  location: {
    city: "Can Tho",
    country: "Vietnam",
    countryCode: "vn",
  },
  avatar: "/avatar 2.jpg",
  email: "kimdinhphuong205@gmail.com",
  website: "https://kimdinhphuong.dev",
  portfolio: "@kimdinhphuong",
  socialLinks: [
    { platform: "Facebook", url: "https://www.facebook.com/dinhphuongkim250705/", label: "dinhphuongkim250705" },
    { platform: "LinkedIn", url: "https://www.linkedin.com/in/kimdinhphuong/", label: "kimdinhphuong" },
    { platform: "Instagram", url: "https://www.instagram.com/_kimdinhphuong/", label: "@_kimdinhphuong" },
    { platform: "TikTok", url: "https://www.tiktok.com/@kimdinhphuong_", label: "@kimdinhphuong_" },
    { platform: "GitHub", url: "https://github.com/kimdinhphuong", label: "@kimdinhphuong" },
  ],
  about: [
    "Hello! I am Kim Dinh Phuong, a 3rd-year student majoring in Supply Chain Management and Logistics at Can Tho University of Technology.",
    "I am passionate about combining logistics with technology to solve practical management and operational challenges. Alongside my specialized knowledge, I spend significant time researching and developing skills in web design, web development, Artificial Intelligence (AI), process automation, and building workflow tools.",
    "I believe technology is the key to driving digital transformation in supply chains. Therefore, I actively take on personal projects to apply what I've learned into practical solutions — ranging from websites and management systems to learning and productivity applications.",
    "My goal is to become a Tech-driven Supply Chain Specialist, capable of bridging logistics domain expertise with digital solutions to optimize processes, enhance operational efficiency, and deliver sustainable value for businesses.",
    "Beyond my academic studies, I continuously research emerging trends in Supply Chain, AI, Web Development, UI/UX, and Digital Transformation, while constantly honing my skills through hands-on projects and self-directed learning.",
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
