export interface Tutorial {
    id: string;
    slug: string;
    title: string;
    description: string;
    thumbnail: string;
    category: string;
    type: 'video' | 'article';
    tags: string[];
    date: string;
    duration?: string; // For videos: "12:34"
    readTime?: string; // For articles: "5 min read"
    videoUrl?: string; // YouTube embed URL
    content?: string; // Markdown content for articles
    featured?: boolean;
}

export const tutorialCategoriesEn = [
    'All',
    'Web Development',
    'Logistics',
    'Tools & Software',
    'Career Tips',
] as const;

export const tutorialCategoriesVi = [
    'Tất cả',
    'Lập trình Web',
    'Logistics',
    'Công Cụ',
    'Mẹo Nghề Nghiệp',
] as const;

export const tutorialCategories = tutorialCategoriesEn; // Mặc định

export const tutorialsEn: Tutorial[] = [
    {
        id: "tut-logistics-1",
        slug: "optimizing-supply-chain-costs",
        title: "Optimizing Supply Chain Costs in 2026: An Interactive Guide",
        description: "Understanding the hidden costs in your logistics network and how to calculate optimal freight routes.",
        thumbnail: "/cac-phuong-phap-toi-uu-hoa-chuoi-cung-ung-trong-logistics-b1.jpg",
        category: "Logistics",
        type: "article",
        tags: ["Logistics", "Optimization", "Calculator"],
        date: "May 9, 2026",
        readTime: "5 min read",
        content: `
<p class="lead">In the fast-paced world of modern logistics, understanding and controlling transportation costs is more critical than ever. Freight rates fluctuate, fuel prices are volatile, and customer expectations for faster delivery times continue to rise.</p>

<p>One of the most fundamental skills for any supply chain professional is the ability to quickly estimate freight costs across different lanes and modes. While enterprise TMS (Transportation Management Systems) handle the heavy lifting, having a quick mental model—or a handy tool—is invaluable during negotiations or rapid planning sessions.</p>

<h3>The Basic Freight Cost Formula</h3>
<p>At its core, estimating the base transportation cost involves three primary variables:</p>
<ul>
    <li><strong>Weight/Volume:</strong> Usually measured in kilograms or dimensional weight.</li>
    <li><strong>Distance:</strong> The total route distance in kilometers or miles.</li>
    <li><strong>Base Rate:</strong> The negotiated or market rate per unit of weight per unit of distance.</li>
</ul>

<p>Try out the interactive Logistics Cost Calculator below to see how adjusting these variables impacts the total estimated freight cost for a single shipment leg.</p>

[LogisticsCalculator]

<div class="callout">
  <p><strong>Pro Tip:</strong> Notice how sensitive the total cost is to the Base Rate. Negotiating even a few cents off your contract rate can yield massive savings across thousands of shipments annually.</p>
</div>

<p>Of course, real-world logistics pricing includes accessorials like fuel surcharges, layovers, liftgate fees, and dimensional weight pricing adjustments. However, mastering the baseline calculation gives you a strong foundation for supply chain cost modeling.</p>
        `,
        featured: true
    }
];

export const tutorialsVi: Tutorial[] = [
    {
        id: "tut-logistics-1",
        slug: "optimizing-supply-chain-costs",
        title: "Tối ưu hóa Chi phí Chuỗi cung ứng 2026: Hướng dẫn Tương tác",
        description: "Hiểu rõ các chi phí ẩn trong mạng lưới logistics của bạn và cách tính toán tuyến đường vận chuyển tối ưu.",
        thumbnail: "/cac-phuong-phap-toi-uu-hoa-chuoi-cung-ung-trong-logistics-b1.jpg",
        category: "Logistics",
        type: "article",
        tags: ["Logistics", "Tối ưu hóa", "Công cụ"],
        date: "May 9, 2026",
        readTime: "5 min read",
        content: `
<p class="lead">Trong thế giới logistics hiện đại và nhịp độ nhanh, việc hiểu và kiểm soát chi phí vận tải trở nên quan trọng hơn bao giờ hết. Cước phí vận tải biến động, giá nhiên liệu không ổn định và kỳ vọng của khách hàng về thời gian giao hàng ngày càng tăng.</p>

<p>Một trong những kỹ năng cơ bản nhất đối với bất kỳ chuyên gia chuỗi cung ứng nào là khả năng ước tính nhanh chi phí vận tải trên các tuyến đường và phương thức khác nhau. Mặc dù các hệ thống TMS (Quản lý Vận tải) doanh nghiệp xử lý phần lớn công việc nặng nhọc, việc có một công cụ tính toán nhanh trong tay là vô giá trong các cuộc đàm phán hoặc lập kế hoạch gấp.</p>

<h3>Công thức Tính Chi phí Vận tải Cơ bản</h3>
<p>Về cốt lõi, việc ước tính chi phí vận chuyển cơ bản bao gồm ba biến số chính:</p>
<ul>
    <li><strong>Trọng lượng/Thể tích:</strong> Thường được đo bằng kilogam hoặc trọng lượng thể tích.</li>
    <li><strong>Khoảng cách:</strong> Tổng khoảng cách tuyến đường tính bằng kilomet hoặc dặm.</li>
    <li><strong>Đơn giá cơ bản:</strong> Mức giá đàm phán hoặc giá thị trường trên mỗi đơn vị trọng lượng và khoảng cách.</li>
</ul>

<p>Hãy thử nghiệm Công cụ Tính Chi phí Logistics tương tác dưới đây để xem việc điều chỉnh các biến số này ảnh hưởng như thế nào đến tổng chi phí ước tính cho một chặng vận chuyển.</p>

[LogisticsCalculator]

<div class="callout">
  <p><strong>Mẹo nhỏ:</strong> Hãy chú ý xem tổng chi phí nhạy cảm như thế nào với Đơn giá cơ bản. Việc đàm phán giảm chỉ một vài cent trong giá hợp đồng cũng có thể mang lại khoản tiết kiệm khổng lồ cho hàng ngàn chuyến hàng mỗi năm.</p>
</div>

<p>Tất nhiên, giá cả logistics trong thực tế bao gồm nhiều phụ phí như phụ phí nhiên liệu, phí lưu bãi, phí nâng hạ... Tuy nhiên, việc nắm vững cách tính toán cơ bản sẽ mang lại cho bạn một nền tảng vững chắc để lập mô hình chi phí chuỗi cung ứng hiệu quả.</p>
        `,
        featured: true
    }
];

export const tutorials: Tutorial[] = tutorialsEn;

export function getTutorialBySlug(slug: string, lang: 'vi' | 'en' = 'en'): Tutorial | undefined {
    const list = lang === 'vi' ? tutorialsVi : tutorialsEn;
    return list.find(tutorial => tutorial.slug === slug);
}

export function getTutorialsByCategory(category: string, lang: 'vi' | 'en' = 'en'): Tutorial[] {
    const list = lang === 'vi' ? tutorialsVi : tutorialsEn;
    const all = lang === 'vi' ? 'Tất cả' : 'All';
    if (category === all) return list;
    return list.filter(tutorial => tutorial.category === category);
}

export function searchTutorials(query: string, lang: 'vi' | 'en' = 'en'): Tutorial[] {
    const list = lang === 'vi' ? tutorialsVi : tutorialsEn;
    const lowerQuery = query.toLowerCase();
    return list.filter(
        tutorial =>
            tutorial.title.toLowerCase().includes(lowerQuery) ||
            tutorial.description.toLowerCase().includes(lowerQuery) ||
            tutorial.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    );
}
