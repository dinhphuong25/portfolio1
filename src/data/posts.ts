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
        excerpt: "Trong hành trình phát triển cá nhân, vùng an toàn là một chiếc kén êm ái nhưng đầy giới hạn. Hãy dũng cảm bước ra để tự khai phá những tiềm năng còn ẩn giấu và kiến tạo phiên bản rực rỡ nhất của chính mình.",
        date: "08 Tháng 5, 2026",
        readTime: "5 phút đọc",
        category: "Trải nghiệm",
        image: "/untitled-1555924881176370155281.jpg",
        slug: "stepping-out-of-the-safe-nest",
        tags: ["Tản mạn", "Phát triển bản thân", "Trải nghiệm"],
        isPublished: true,
        content: `
<p class="lead">Trong tâm lý học hiện đại, "vùng an toàn" (Comfort Zone) được ví như chiếc kén êm ái bảo vệ con người trước những biến động và lo âu. Nhưng ở chiều ngược lại, chiếc kén ấy cũng chính là rào cản thầm lặng ngăn con người chạm tới những chân trời mới. Việc dũng cảm bước ra khỏi ranh giới quen thuộc không phải là ván cược mạo hiểm, mà là chìa khóa duy nhất để kích hoạt tiềm năng thực sự và kiến tạo một phiên bản rực rỡ hơn của chính mình.</p>

<hr />

<h3>1. Vùng an toàn – Trú ẩn bình yên hay rào cản thầm lặng?</h3>
<p>Vùng an toàn là trạng thái tâm lý mà ở đó mọi công việc, thói quen và môi trường xung quanh đều nằm trong tầm kiểm soát. Đó có thể là một công việc bàn giấy lặp đi lặp lại 8 tiếng mỗi ngày không màng thử thách, là con đường đi làm quen thuộc không bao giờ thay đổi, hay một phong cách sống phẳng lặng không sóng gió. Ở trong vùng an toàn, chúng ta cảm thấy bình an vì không đối mặt với nguy cơ thất bại hay sự phán xét từ bên ngoài.</p>

<p>Tuy nhiên, các chuyên gia phát triển cá nhân cảnh báo rằng: <em>"Một chiếc thuyền rất an toàn khi neo đậu ở cảng, nhưng đó không phải là mục đích người ta đóng ra nó"</em>. Việc chấp nhận sự ổn định quá mức lâu dần sẽ ru ngủ ý chí, làm mai một tư duy sáng tạo và khiến con người rơi vào trạng thái trì trệ. Giống như một dòng nước đứng yên lâu ngày sẽ thành ao tù, cuộc sống nếu thiếu đi sự cọ xát với những điều mới mẻ sẽ tự tước đi cơ hội trưởng thành.</p>

<hr />

<h3>2. Hành trình 3 vùng không gian: Nơi sự bứt phá bắt đầu</h3>
<p>Theo nghiên cứu của các nhà tâm lý học hành vi, quá trình bứt phá ranh giới cá nhân được chia thành 3 vùng chuyển tiếp rõ rệt mà bất kỳ ai muốn thành công cũng phải trải qua:</p>

<ul>
  <li><strong>Vùng An Toàn (Comfort Zone):</strong> Nơi bạn cảm thấy thoải mái và kiểm soát được mọi việc, nhưng tuyệt nhiên không có bất kỳ sự tăng trưởng nào xảy ra.</li>
  <li><strong>Vùng Sợ Hãi (Fear Zone):</strong> Ngay khi vừa chớm bước ra ngoài, bạn sẽ lập tức đối mặt với sự thiếu tự tin, áp lực từ ánh nhìn người khác và những cái cớ hợp lý hóa cho sự rút lui. Rất nhiều người đã gục ngã và quay đầu ở vùng này vì để nỗi sợ che khuất tầm nhìn.</li>
  <li><strong>Vùng Học Hỏi & Trưởng Thành (Growth Zone):</strong> Nếu kiên trì vượt qua bức tường sợ hãi, bạn sẽ bước vào không gian của sự phát triển. Đây là nơi bạn tiếp thu kỹ năng mới, chinh phục thử thách thực tế, nới rộng giới hạn năng lực và tự tay thiết lập một vùng an toàn mới rộng lớn hơn.</li>
</ul>

<hr />

<h3>3. Những giá trị vô giá khi dũng cảm bứt phá</h3>
<p>Khi chủ động đẩy bản thân vượt qua những ranh giới quen thuộc, bạn sẽ thu nhận được những thành quả mang tính bước ngoặt:</p>

<p><strong>• Kích hoạt tiềm năng say ngủ:</strong> Thực tế chứng minh, não bộ con người chỉ thực sự nhạy bén và sáng tạo khi đối mặt với những bài toán chưa từng có tiền lệ. Những hoàn cảnh thách thức sẽ buộc bạn phải kích hoạt cơ chế thích nghi, khám phá ra những sức mạnh nội tại mà trước đây chưa từng nghĩ mình sở hữu.</p>

<p><strong>• Mở rộng thế giới quan và tăng độ nhạy bén:</strong> Sự va chạm với môi trường mới, công nghệ mới và những góc nhìn đa dạng sẽ đập tan các định kiến hẹp hòi. Bạn học được cách nhìn nhận vấn đề đa chiều, trở nên linh hoạt và kiên cường trước mọi biến động của cuộc sống.</p>

<p><strong>• Chạm tới niềm hạnh phúc của sự trưởng thành:</strong> Hạnh phúc đích thực không đến từ sự vô âu vô lo thụ động, mà đến từ niềm tự hào sâu sắc khi thấy bản thân ngày hôm nay đã vững vàng và tiến xa hơn chính mình của ngày hôm qua.</p>

<hr />

<h3>4. Chiến lược "Micro-steps": Bước ra ngoài một cách khôn ngoan</h3>
<p>Bước ra khỏi vùng an toàn không có nghĩa là lao đầu vào rủi ro một cách mù quáng. Báo chí và các chuyên gia tư vấn quản trị khuyên rằng sự thay đổi bền vững nhất đến từ chiến lược <em>"Micro-steps" (Những bước đi nhỏ)</em>:</p>

<ol>
  <li><strong>Bắt đầu từ những thay đổi nhỏ mỗi ngày:</strong> Thử học một kỹ năng mới 15 phút mỗi ngày, thay đổi một thói quen sinh hoạt hoặc chủ động mở lời với một đối tác mới.</li>
  <li><strong>Rèn luyện tư duy cầu tiến (Growth Mindset):</strong> Thay vì coi khó khăn là rào cản tiêu cực, hãy nhìn nhận mọi vấp ngã như một dữ liệu học hỏi để tối ưu hóa bản thân.</li>
  <li><strong>Trang bị công thức & công cụ số:</strong> Việc học hỏi các công nghệ hiện đại, tự động hóa quy trình và tư duy quản trị số sẽ cung cấp bệ phóng vững chắc giúp bạn tự tin bước vào những sân chơi lớn hơn.</li>
</ol>

<div class="callout">
  <p><strong>Lời kết:</strong> Thế giới bên ngoài vùng an toàn có thể chứa đựng những bất định, nhưng đó lại là nơi duy nhất chứa đựng những cơ hội tuyệt vời nhất. Đừng để cuộc đời trôi qua như một bản nháp mờ nhạt. Hãy hít một hơi thật sâu, dũng cảm bước ra ngoài ánh sáng và bắt đầu hành trình khai phá tiềm năng của chính bạn ngay hôm nay!</p>
</div>
        `
    }
];

export const BLOG_POSTS_EN: BlogPost[] = [
    {
        id: "1",
        title: "Stepping Out of Your Comfort Zone: Discover Your True Potential",
        excerpt: "In personal development, the comfort zone is a cozy cocoon but full of limitations. Dare to step out to unlock your hidden potential and craft your most radiant self.",
        date: "May 8, 2026",
        readTime: "5 min read",
        category: "Experience",
        image: "/untitled-1555924881176370155281.jpg",
        slug: "stepping-out-of-the-safe-nest",
        tags: ["Musings", "Growth", "Experience"],
        isPublished: true,
        content: `
<p class="lead">In modern psychology, the "Comfort Zone" is often compared to a cozy cocoon protecting individuals from anxiety and unpredictability. However, that same cocoon can quietly become a barrier holding people back from discovering new horizons. Bravely stepping beyond familiar boundaries is not a reckless gamble, but the ultimate master key to unlocking true potential and building a more fulfilled version of oneself.</p>

<hr />

<h3>1. The Comfort Zone – Peaceful Refuge or Silent Barrier?</h3>
<p>The comfort zone is a psychological state where one feels at ease and in total control. It might be a routine 8-hour desk job without challenges, a familiar commute route, or a predictable lifestyle devoid of risk. Inside this zone, we feel safe because there is no fear of failure or external judgment.</p>

<p>However, personal development experts remind us: <em>"A ship is safe in harbor, but that is not what ships are built for."</em> Accepting excessive stability over time numbs ambition, dulls creative thinking, and leads to stagnation. Just like standing water turns stale, a life without new challenges strips away opportunities for growth.</p>

<hr />

<h3>2. The 3 Psychological Zones: Where Breakthrough Begins</h3>
<p>According to behavioral scientists, pushing past personal boundaries involves 3 distinct transition zones:</p>

<ul>
  <li><strong>Comfort Zone:</strong> Safe and controlled, but zero growth occurs here.</li>
  <li><strong>Fear Zone:</strong> Stepping out immediately triggers self-doubt, excuses, and fear of others' opinions. Many give up here because fear obscures vision.</li>
  <li><strong>Growth Zone:</strong> Persevering past fear opens up the space of true learning. Here you acquire new skills, solve real problems, expand capability boundaries, and establish a vastly expanded new comfort zone.</li>
</ul>

<hr />

<h3>3. Invaluable Rewards of Pushing Boundaries</h3>
<p>When you proactively push past familiar boundaries, you reap transformative rewards:</p>

<p><strong>• Unlocking Sleeping Potential:</strong> The human brain becomes exceptionally sharp when facing unprecedented challenges. High-pressure situations force adaptation and reveal internal superpowers you never knew you possessed.</p>

<p><strong>• Expanding Worldview & Adaptability:</strong> Encountering new environments, digital tools, and diverse perspectives shatters narrow prejudices. You learn multi-dimensional problem-solving and become resilient in the face of change.</p>

<p><strong>• Experiencing True Growth Joy:</strong> Genuine happiness does not come from passive comfort, but from deep pride when realizing you are stronger and more capable than yesterday.</p>

<hr />

<h3>4. Micro-steps Strategy: Stepping Out Wisely</h3>
<p>Stepping out of your comfort zone does not mean jumping blindly into extreme risks. Management strategists suggest that sustainable growth relies on <em>Micro-steps</em>:</p>

<ol>
  <li><strong>Start small daily:</strong> Practice a new skill for 15 minutes a day, adjust a habit, or initiate a conversation with a new colleague.</li>
  <li><strong>Cultivate a Growth Mindset:</strong> Reframe stumbling blocks as valuable data points for self-optimization.</li>
  <li><strong>Arm yourself with tech & knowledge:</strong> Mastering digital automation, supply chain thinking, and modern software skills provides a solid springboard to enter larger arenas with confidence.</li>
</ol>

<div class="callout">
  <p><strong>Final Thought:</strong> The world outside your comfort zone may contain uncertainty, but it is also the only place containing extraordinary opportunities. Take a deep breath, step into the light, and unlock your true potential starting today!</p>
</div>
        `
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
