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
    }
];

export const BLOG_POSTS = BLOG_POSTS_EN; // Default

export const BLOG_CATEGORIES_EN = ["All", "Experience"];
export const BLOG_CATEGORIES_VI = ["Tất cả", "Trải nghiệm"];

export const BLOG_CATEGORIES = BLOG_CATEGORIES_EN; // Default

export function getPostBySlug(slug: string, lang: 'vi' | 'en' = 'en'): BlogPost | undefined {
    const list = lang === 'vi' ? BLOG_POSTS_VI : BLOG_POSTS_EN;
    return list.find((post) => post.slug === slug);
}
