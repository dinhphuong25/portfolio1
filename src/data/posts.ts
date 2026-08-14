export interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    date: string;
    readTime: string;
    category: string;
    image?: string;
    slug: string;
    content?: string;
    tags: string[];
    isPublished?: boolean;
}

export const BLOG_POSTS_VI: BlogPost[] = [
    {
        id: "1",
        title: "Bước ra khỏi vùng an toàn: Khai phá tiềm năng thực sự của bản thân",
        excerpt: "Vùng an toàn là nơi êm ái, nhưng không có cây cổ thụ nào lớn lên ở đó cả. Hãy dũng cảm bước ra để mở rộng lăng kính cuộc sống và gặt hái sự trưởng thành.",
        date: "08 Tháng 5, 2026",
        readTime: "4 phút đọc",
        category: "Trải nghiệm",
        image: "/untitled-1555924881176370155281.jpg",
        slug: "stepping-out-of-the-safe-nest",
        tags: ["Tản mạn", "Phát triển bản thân", "Trải nghiệm"],
        isPublished: true,
        content: `
<p class="lead">Trong hành trình chia sẻ, trải nghiệm và quan sát nhịp sống hối hả xung quanh, mình nhận ra một sự thật khá chạnh lòng: Rất nhiều người ngoài kia đang sống một cuộc đời "làng nhàng", lặp đi lặp lại một cách tẻ nhạt. Sâu thẳm bên trong, họ luôn khao khát những điều lớn lao hơn, một cuộc sống rực rỡ và trọn vẹn hơn. Nhưng rồi, guồng quay hối hả của công việc, sự trì hoãn và trên hết là nỗi sợ hãi lại kéo họ về, nhốt họ trong cái lồng kính vô hình mang tên "vùng an toàn".</p>

<p>Vùng an toàn rốt cuộc là gì mà lại có sức mạnh to lớn đến vậy? Đó là một quán cà phê quen thuộc bạn vẫn thường ngồi mỗi sáng cuối tuần, là công việc bàn giấy lặp lại 8 tiếng mỗi ngày không màng chút thử thách, là những mối quan hệ cũ kỹ dù chẳng mang lại sự phát triển nhưng lại quá khó để từ bỏ. Ở đó, chúng ta cảm thấy vô cùng dễ chịu, ấm áp và bình yên, vì mọi thứ đều nằm trong tầm kiểm soát và có thể lường trước được.</p>

<p>Nhưng bạn biết không, chính cái cảm giác "an toàn" êm ái đó lại là một chiếc bẫy ngọt ngào và nguy hiểm nhất thế gian. Chấp nhận sự ổn định quá mức đồng nghĩa với việc bạn đang tự nguyện "giậm chân tại chỗ". Nó âm thầm ru ngủ ý chí, giam cầm những ước mơ táo bạo và tước đi cơ hội để bạn chạm tới phiên bản rực rỡ nhất của chính mình.</p>

<blockquote>
  <p>Mình muốn chia sẻ với bạn một sự thật: <strong>Cuộc đời của bạn thực sự chỉ bắt đầu vào khoảnh khắc bạn dám đặt chân ra khỏi ranh giới của sự quen thuộc.</strong></p>
</blockquote>

<p>Khi dũng cảm đẩy bản thân đi qua những giới hạn vô hình ấy, bạn sẽ gặt hái được 3 trái ngọt tuyệt vời:</p>
<ul>
  <li><strong>Khám phá kho báu năng lực còn say ngủ:</strong> Kích hoạt khả năng thích nghi và tư duy sáng tạo khi đối mặt với thử thách mới.</li>
  <li><strong>Đập vỡ định kiến hẹp hòi:</strong> Mở rộng lăng kính thế giới quan và tăng khả năng thấu cảm.</li>
  <li><strong>Hạnh phúc của sự trưởng thành:</strong> Niềm vui đích thực khi thấy bản thân ngày hôm nay tốt hơn chính mình ngày hôm qua.</li>
</ul>
        `
    },
    {
        id: "2",
        title: "Các phương pháp tối ưu hóa chuỗi cung ứng trong Logistics hiện đại",
        excerpt: "Phân tích các giải pháp cắt giảm chi phí vận hành, nâng cao tỷ lệ hoàn thành đơn hàng và ứng dụng mô hình quản lý kho thông minh trong thực tế.",
        date: "12 Tháng 6, 2026",
        readTime: "6 phút đọc",
        category: "Chuỗi cung ứng",
        image: "/cac-phuong-phap-toi-uu-hoa-chuoi-cung-ung-trong-logistics-b1.jpg",
        slug: "logistics-supply-chain-optimization-2026",
        tags: ["Logistics", "Supply Chain", "Quản lý kho"],
        isPublished: false
    },
    {
        id: "3",
        title: "Ứng dụng Trí tuệ Nhân tạo (AI) và Tự động hóa trong quản lý kho bãi",
        excerpt: "Khám phá cách AI và các công cụ tự động hóa quy trình giúp chuyển đổi kho bãi truyền thống thành trung tâm phân phối số thông minh.",
        date: "20 Tháng 7, 2026",
        readTime: "5 phút đọc",
        category: "Lập trình",
        image: "/projects/ecofresh.jpg",
        slug: "ai-and-web-automation-in-supply-chain",
        tags: ["AI", "Tự động hóa", "Công nghệ"],
        isPublished: false
    },
    {
        id: "4",
        title: "Tư duy thiết kế giao diện (UI/UX) tối giản cho các ứng dụng thực tế",
        excerpt: "Nguyên lý loại bỏ các chi tiết thừa, tập trung vào trải nghiệm người dùng cốt lõi và xây dựng giao diện mượt mà trên mọi thiết bị.",
        date: "01 Tháng 8, 2026",
        readTime: "4 phút đọc",
        category: "Góc nhìn",
        image: "/projects/rapphim.jpg",
        slug: "minimalist-ui-ux-design-for-digital-products",
        tags: ["UI/UX", "Thiết kế", "Trải nghiệm"],
        isPublished: false
    }
];

export const BLOG_POSTS_EN: BlogPost[] = [
    {
        id: "1",
        title: "Stepping Out of Your Comfort Zone: Discover Your True Potential",
        excerpt: "The comfort zone is a cozy place, but no ancient trees ever grow there. Dare to step outside to expand your life horizon and harvest personal growth.",
        date: "May 8, 2026",
        readTime: "4 min read",
        category: "Experience",
        image: "/untitled-1555924881176370155281.jpg",
        slug: "stepping-out-of-the-safe-nest",
        tags: ["Musings", "Growth", "Experience"],
        isPublished: true,
        content: BLOG_POSTS_VI[0].content
    },
    {
        id: "2",
        title: "Supply Chain Optimization Strategies in Modern Logistics",
        excerpt: "Analyzing operational cost reduction techniques, order fulfillment speed enhancements, and smart warehouse management execution.",
        date: "Jun 12, 2026",
        readTime: "6 min read",
        category: "Logistics",
        image: "/cac-phuong-phap-toi-uu-hoa-chuoi-cung-ung-trong-logistics-b1.jpg",
        slug: "logistics-supply-chain-optimization-2026",
        tags: ["Logistics", "Supply Chain", "WMS"],
        isPublished: false
    },
    {
        id: "3",
        title: "Applying AI and Process Automation in Warehouse Management",
        excerpt: "Exploring how Artificial Intelligence and workflow automation tools transform traditional warehouses into intelligent digital distribution hubs.",
        date: "Jul 20, 2026",
        readTime: "5 min read",
        category: "Tech",
        image: "/projects/ecofresh.jpg",
        slug: "ai-and-web-automation-in-supply-chain",
        tags: ["AI", "Automation", "Tech"],
        isPublished: false
    },
    {
        id: "4",
        title: "Minimalist UI/UX Design Thinking for Pragmatic Applications",
        excerpt: "The core philosophy of eliminating noise, prioritizing essential user flows, and crafting frictionless digital experiences across devices.",
        date: "Aug 1, 2026",
        readTime: "4 min read",
        category: "Thoughts",
        image: "/projects/rapphim.jpg",
        slug: "minimalist-ui-ux-design-for-digital-products",
        tags: ["UI/UX", "Design", "Product"],
        isPublished: false
    }
];

export const BLOG_POSTS = BLOG_POSTS_EN; // Default

export const BLOG_CATEGORIES_EN = ["All", "Logistics", "Experience", "Tech", "Thoughts"];
export const BLOG_CATEGORIES_VI = ["Tất cả", "Chuỗi cung ứng", "Trải nghiệm", "Lập trình", "Góc nhìn"];

export const BLOG_CATEGORIES = BLOG_CATEGORIES_EN; // Default

export function getPostBySlug(slug: string, lang: 'vi' | 'en' = 'en'): BlogPost | undefined {
    const list = lang === 'vi' ? BLOG_POSTS_VI : BLOG_POSTS_EN;
    return list.find((post) => post.slug === slug);
}
