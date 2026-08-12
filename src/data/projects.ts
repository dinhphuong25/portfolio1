export const PROJECT_TAGS = [
    "Web Development",
    "React",
    "Next.js",
    "Tailwind CSS",
    "Streaming Platform",
    "UI/UX Design",
    "Fullstack",
    "Logistics",
    "Supply Chain"
] as const;

export type ProjectTag = (typeof PROJECT_TAGS)[number];

export interface Project {
    id: string;
    title: string;
    summary: string;
    role: string;
    year: number;
    thumbnail: string;
    thumbnailGradient: string;
    tags: ProjectTag[];
    caseStudyUrl?: string;
    featured: boolean;
    problem: string;
    process: string;
    solution: string;
    outcome: string;
    images: string[];
    results?: {
        label: string;
        value: string;
        chartData?: { name: string; value: number }[];
    }[];
}

export const projectsEn: Project[] = [
    {
        id: "rap-phim-chill",
        title: "Rạp Phim Chill",
        summary: "A premium movie streaming platform providing a seamless and immersive viewing experience. Built with performance and modern UI/UX design in mind.",
        role: "Lead Developer",
        year: 2026,
        thumbnail: "/projects/rapphim.jpg",
        thumbnailGradient: "bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900",
        tags: ["Web Development", "Streaming Platform", "UI/UX Design"],
        featured: true,
        problem: "Viewers often struggle with bloated, ad-heavy streaming sites that are hard to navigate and slow to load on different devices.",
        process: "Designed entirely around the user experience with a sleek dark cinematic theme, optimized media loading, and responsive architecture.",
        solution: "Developed a fast, clean, and intuitive movie streaming website that prioritizes content discovery, seamless playback, and user engagement.",
        outcome: "Successfully launched a modern streaming platform handling high-quality video content with a growing user base.",
        images: [],
        caseStudyUrl: "https://rapphimchill.pro",
    },
    {
        id: "hitoeic",
        title: "HiTOEIC / ByeTOEIC",
        summary: "A comprehensive, multi-language TOEIC exam preparation platform featuring 7,700+ practice questions, 100+ full-length mock tests, AI scoring, and spaced repetition vocabulary.",
        role: "Lead Developer",
        year: 2026,
        thumbnail: "/projects/hitoeic.jpg",
        thumbnailGradient: "bg-gradient-to-br from-blue-900 via-indigo-950 to-slate-900",
        tags: ["Web Development", "Next.js", "Fullstack", "UI/UX Design"],
        featured: true,
        problem: "TOEIC learners often deal with fragmented study materials, lack of realistic timed mock tests, and expensive preparation courses.",
        process: "Engineered a high-speed web application with 7,700+ questions, 4 listening modes, 5-language internationalization, and instant score conversion algorithms.",
        solution: "Built ByeTOEIC (HiTOEIC), a free full-featured preparation platform with 100+ mock tests, 59 grammar topics, interactive Listening & Reading modules, and spaced repetition vocabulary.",
        outcome: "Delivered an all-in-one learning platform serving thousands of students with full-length test simulation, performance analytics, and community leaderboards.",
        images: [],
        caseStudyUrl: "https://hitoeic.io.vn/",
    },
    {
        id: "ez-tool",
        title: "Ez Tool",
        summary: "A comprehensive developer utility and coding tricks hub, providing curated resources, tools, and code snippets to streamline workflow productivity.",
        role: "Lead Developer",
        year: 2026,
        thumbnail: "/projects/eztool.jpg",
        thumbnailGradient: "bg-gradient-to-br from-teal-900 via-emerald-900 to-slate-900",
        tags: ["Web Development", "Next.js", "UI/UX Design"],
        featured: true,
        problem: "Developers spend too much time searching for reliable code snippets, small utilities, and development tricks across scattered sources.",
        process: "Designed a clean, search-first tools catalog with instant copy buttons, clean syntax highlighting, and categorized navigation paths.",
        solution: "Developed Ez Tool, an interactive developers portal loaded with high-speed utility scripts, syntax cheatsheets, and productivity tricks.",
        outcome: "Created a highly visited utility catalog used by fellow students and developers to speed up their daily coding workflows.",
        images: [],
        caseStudyUrl: "https://eztool.academy",
    },
    {
        id: "ez-study",
        title: "Ez Study",
        summary: "An interactive educational platform specializing in logistics, supply chain operations, and academic subjects, offering structured lessons and resources.",
        role: "Lead Developer",
        year: 2026,
        thumbnail: "/projects/ezstudy.jpg",
        thumbnailGradient: "bg-gradient-to-br from-amber-900 via-orange-950 to-slate-900",
        tags: ["Web Development", "Logistics", "Supply Chain"],
        featured: true,
        problem: "Students lack concentrated, easy-to-understand study resources for logistics concepts, inventory formulas, and supply chain strategies.",
        process: "Mapped key academic syllabus modules, designed responsive learning views, and built interactive cheat sheets for formulas.",
        solution: "Built a dedicated, modern learning portal containing structured study materials, logistics operations articles, and academic guides.",
        outcome: "Delivered a centralized academic repository that helps students at Can Tho University of Technology study logistics concepts more effectively.",
        images: [],
        caseStudyUrl: "https://ezstudy.one",
    },
    {
        id: "nghien-phim-relax",
        title: "Nghiện Phim Relax",
        summary: "A premium movie streaming platform focused on content discovery, responsive UI/UX, and high-performance playback, offering a relaxing entertainment experience.",
        role: "Lead Developer",
        year: 2026,
        thumbnail: "/projects/nghienphim.jpg",
        thumbnailGradient: "bg-gradient-to-br from-purple-900 via-rose-900 to-slate-900",
        tags: ["Web Development", "Streaming Platform", "UI/UX Design"],
        featured: true,
        problem: "Buffering delays and disruptive ads often ruin the movie watching experience for users trying to relax.",
        process: "Designed an efficient streaming UI with fluid layout transitions, dark cinematic colors, and optimized media rendering.",
        solution: "Built a modern, user-friendly video streaming portal that plays high-quality media with no lags and clean navigations.",
        outcome: "Launched Nghiện Phim Relax successfully, providing a clean interface for users to relax and stream movies without friction.",
        images: [],
        caseStudyUrl: "https://nghienphimrelax.top",
    },
    {
        id: "wms-ecofresh",
        title: "WMS EcoFresh",
        summary: "A Warehouse Management System for cold-chain operations with secure dashboard access, real-time container temperature monitoring, and instant safety alerts.",
        role: "Fullstack Developer",
        year: 2024,
        thumbnail: "/projects/ecofresh.jpg",
        thumbnailGradient: "bg-gradient-to-br from-blue-900 via-cyan-900 to-slate-900",
        tags: ["Web Development", "Logistics", "Supply Chain"],
        featured: true,
        problem: "Cold storage teams were managing inventory, temperature logs, and alerts across disconnected tools, causing delayed responses when containers exceeded safe thresholds.",
        process: "Analyzed warehouse workflows, designed the EcoFresh login-to-dashboard experience, and mapped critical modules for inbound/outbound tracking, real-time monitoring, and alert handling.",
        solution: "Built a web-based WMS with secure authentication, centralized warehouse control, continuous container temperature visibility, and instant warning notifications for risk conditions.",
        outcome: "Operations became faster and more reliable with fewer manual steps, better traceability, and improved cold-chain safety for daily warehouse execution.",
        results: [
            { 
                label: "Inventory Accuracy", 
                value: "+99.2%", 
                chartData: [
                    { name: "Before", value: 85 },
                    { name: "After", value: 99 }
                ] 
            },
            { 
                label: "Order Fulfillment Speed", 
                value: "45% Faster",
                chartData: [
                    { name: "Manual", value: 120 },
                    { name: "WMS", value: 65 }
                ]
            }
        ],
        images: [],
        caseStudyUrl: "https://logisticsprojects.vercel.app/login",
    }
];

export const projectsVi: Project[] = [
    {
        ...projectsEn[0], // Rạp Phim Chill
        summary: "Nền tảng xem phim trực tuyến cao cấp, mang lại trải nghiệm mượt mà và sống động. Thiết kế giao diện hiện đại tối ưu hiệu suất với tên miền chính thức rapphimchill.pro.",
        role: "Trưởng nhóm phát triển",
        problem: "Người xem thường xuyên gặp khó khăn với các trang web phim chứa quá nhiều quảng cáo rác, chậm trễ và khó theo dõi trên nhiều thiết bị.",
        process: "Thiết kế xoay quanh trải nghiệm người dùng với theme điện ảnh tối màu, tối ưu hóa tải phương tiện và kiến trúc đáp ứng nhanh.",
        solution: "Phát triển web phim giao diện trực quan, ưu tiên khám phá nội dung dễ dàng, trình phát video liền mạch và mượt mà.",
        outcome: "Đã ra mắt thành công nền tảng chiếu phim ổn định tại rapphimchill.pro, xử lý phim độ phân giải cao thu hút tệp khán giả ngày càng lớn."
    },
    {
        ...projectsEn[1], // HiTOEIC
        summary: "Nền tảng luyện thi TOEIC toàn diện đa ngôn ngữ với 7.700+ câu hỏi, 100+ đề thi thử chuẩn định dạng, quy đổi điểm 990 tự động và kho từ vựng học ngắt quãng.",
        role: "Trưởng nhóm phát triển",
        problem: "Học viên TOEIC thường gặp khó khăn với tài liệu rải rác, thiếu các bộ đề thi thử bấm giờ giống thi thật và chi phí ôn thi đắt đỏ.",
        process: "Xây dựng hệ thống web tốc độ cao tích hợp 7.700+ câu hỏi, 4 chế độ luyện nghe, hỗ trợ 5 ngôn ngữ và thuật toán chấm điểm chuẩn quốc tế.",
        solution: "Phát triển nền tảng ByeTOEIC (HiTOEIC) miễn phí cung cấp 100+ đề thi thử, 59 chủ đề ngữ pháp, bài nghe/đọc giải thích chi tiết và hệ thống thẻ từ vựng thông minh.",
        outcome: "Mang lại nền tảng học tập toàn diện phục vụ hàng ngàn học viên thi thử trực tuyến, theo dõi tiến độ và đua bảng xếp hạng XP."
    },
    {
        ...projectsEn[2], // Ez Tool
        summary: "Nền tảng tổng hợp các thủ thuật phát triển web, mẹo lập trình và tài nguyên tiện ích, cung cấp các đoạn mã mẫu chất lượng cao giúp tối ưu hóa tiến độ công việc.",
        role: "Trưởng nhóm phát triển",
        problem: "Lập trình viên thường tốn nhiều thời gian tìm kiếm các đoạn mã mẫu tin cậy, công cụ tiện ích nhỏ và thủ thuật phát triển từ nhiều nguồn rải rác.",
        process: "Thiết kế danh mục công cụ sạch sẽ, ưu tiên tìm kiếm nhanh với nút sao chép mã nguồn tức thì, làm nổi bật cú pháp code và sơ đồ điều hướng rõ ràng.",
        solution: "Xây dựng cổng thông tin Ez Tool tương tác cao tích hợp sẵn các công cụ script tiện ích tốc độ cao, bảng tra cứu cú pháp và thủ thuật lập trình tối ưu hóa.",
        outcome: "Tạo nên danh mục công cụ tiện ích được nhiều lập trình viên và sinh viên truy cập thường xuyên để tăng tốc độ phát triển dự án hàng ngày."
    },
    {
        ...projectsEn[3], // Ez Study
        summary: "Nền tảng học tập tương tác chuyên sâu về Logistics, quản trị chuỗi cung ứng và nhiều lĩnh vực kiến thức học thuật đa dạng khác, cung cấp các khóa học và tài nguyên bài bản.",
        role: "Trưởng nhóm phát triển",
        problem: "Sinh viên thiếu các nguồn tài liệu học tập tập trung, dễ hiểu về các khái niệm chuỗi cung ứng, công thức tính toán tồn kho và chiến lược logistics.",
        process: "Hệ thống hóa các học phần giáo trình cốt lõi, thiết kế giao diện học tập trực quan và xây dựng công cụ tra cứu công thức nhanh nhạy.",
        solution: "Xây dựng cổng thông tin học tập chuyên nghiệp Ez Study lưu trữ các tài liệu bài giảng chọn lọc, bài viết chuyên ngành chuỗi cung ứng và hướng dẫn học thuật.",
        outcome: "Mang lại kho học liệu học thuật tập trung giúp sinh viên ngành Logistics tại Đại học Kỹ thuật - Công nghệ Cần Thơ nghiên cứu hiệu quả hơn."
    },
    {
        ...projectsEn[4], // Nghiện Phim Relax
        summary: "Nền tảng xem phim trực tuyến cao cấp tập trung vào khám phá nội dung, giao diện responsive mượt mà và trình phát hiệu năng cao, mang lại trải nghiệm giải trí thư giãn.",
        role: "Trưởng nhóm phát triển",
        problem: "Tình trạng giật lag khi tải video và quảng cáo phiền nhiễu thường phá hỏng trải nghiệm xem phim của người dùng khi muốn thư giãn.",
        process: "Thiết kế giao diện phát trực tuyến tối ưu với các hiệu ứng chuyển cảnh mượt mà, tông màu điện ảnh tối và tối ưu hóa hiển thị phương tiện.",
        solution: "Xây dựng cổng xem phim hiện đại, thân thiện, phát video chất lượng cao không giật lag và điều hướng trực quan sạch sẽ.",
        outcome: "Ra mắt thành công Nghiện Phim Relax, cung cấp giao diện tinh giản giúp người dùng thư giãn và xem phim trơn tru không gặp trở ngại."
    },
    {
        ...projectsEn[5],
        summary: "Hệ thống Quản lý Kho bãi quy trình lạnh với giao diện bảo mật, theo dõi nhiệt độ container trực tuyến thời gian thực, và cảnh báo an toàn tức thì.",
        role: "Lập trình viên Fullstack",
        problem: "Các nhóm quản lý kho lạnh phải theo dõi thủ công kho bãi thông qua nhiều công cụ ngắt kết nối, gây chậm trễ xử lý các vấn đề khẩn cấp.",
        process: "Phân tích quy trình luân chuyển kho phức tạp, thiết kế hệ thống theo dõi toàn diện từ nhận hàng, xác thực bảo mật đến cảnh báo.",
        solution: "Xây dựng hệ thống WMS nền web nhằm tập trung quản lý trên một nền tảng, tạo khả năng kiểm soát liên tục theo thời gian thực.",
        outcome: "Tối ưu hóa khả năng truy xuất, giảm công việc chân tay và đảm bảo chất lượng hệ thống kho quy trình lạnh.",
        results: [
            { 
                label: "Độ chính xác tồn kho", 
                value: "+99.2%", 
                chartData: [
                    { name: "Trước", value: 85 },
                    { name: "Sau", value: 99 }
                ] 
            },
            { 
                label: "Tốc độ xử lý đơn hàng", 
                value: "Nhanh hơn 45%",
                chartData: [
                    { name: "Thủ công", value: 120 },
                    { name: "WMS", value: 65 }
                ]
            }
        ]
    }
];

export const projects = projectsEn; // Mặc định cho những components chưa chuyển ngữ

export function getProjectById(id: string, lang: 'vi' | 'en' = 'en'): Project | undefined {
    const list = lang === 'vi' ? projectsVi : projectsEn;
    return list.find((project) => project.id === id);
}

export function getFeaturedProjects(lang: 'vi' | 'en' = 'en'): Project[] {
    const list = lang === 'vi' ? projectsVi : projectsEn;
    return list.filter((project) => project.featured);
}

export function getProjectsByTag(tag: ProjectTag, lang: 'vi' | 'en' = 'en'): Project[] {
    const list = lang === 'vi' ? projectsVi : projectsEn;
    return list.filter((project) => project.tags.includes(tag));
}

export function searchProjects(query: string, lang: 'vi' | 'en' = 'en'): Project[] {
    const list = lang === 'vi' ? projectsVi : projectsEn;
    const lowerQuery = query.toLowerCase();
    return list.filter(
        (project) =>
            project.title.toLowerCase().includes(lowerQuery) ||
            project.summary.toLowerCase().includes(lowerQuery) ||
            project.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
    );
}
