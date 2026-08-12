export interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    date: string;
    readTime: string;
    category: string;
    image?: string;
    slug: string;
    content?: string; // HTML content
    tags: string[];
}

export const BLOG_POSTS_EN: BlogPost[] = [
    {
        id: "1",
        title: "Life Truly Begins When You Step Out of Your Comfort Zone",
        excerpt: "The comfort zone is a beautiful place, but nothing ever grows there. Dare to step out to discover your true potential.",
        date: "May 8, 2026",
        readTime: "4 min read",
        category: "Life",
        image: "/untitled-1555924881176370155281.jpg",
        slug: "stepping-out-of-the-safe-nest",
        tags: ["Musings", "Growth", "Experience"],
        content: `
<p class="lead">In my journey of sharing, experiencing, and observing the hustle of life around me, I've realized a somewhat heartbreaking truth: Many people out there are living a "mediocre", endlessly repetitive, and dull life. Deep down, they always yearn for greater things, a more brilliant and fulfilling existence. But then, the rush of daily life, procrastination, and above all, fear, pull them back, locking them tightly in an invisible glass cage called the "comfort zone".</p>

<p>What exactly is the comfort zone that it wields such immense power? It's the familiar coffee shop you visit every weekend morning, the routine desk job you do 8 hours a day without any challenge, the old relationships that offer no growth but are too hard to let go. In there, we feel incredibly cozy, warm, and peaceful because everything is within our control and entirely predictable. There is no risk, no judgment from strangers, no fear of rejection, and of course, no heartbreak.</p>

<p>But you know what? That very soft feeling of "safety" is the sweetest and most dangerous trap in the world. Accepting excessive stability means you are voluntarily choosing to "stand still." It silently lulls your willpower to sleep, imprisons your bold dreams, and strips away the opportunity for you to reach the most brilliant version of yourself.</p>

<blockquote>
  <p>I want to share a truth with you, which might be a bit harsh but is the ultimate master key: <strong>Your life truly begins the exact moment you dare to step beyond the boundaries of the familiar.</strong></p>
</blockquote>

<p>Many people are hesitant to step out because they mistakenly believe that outside the "comfort zone" there are only storms, failures, and risks waiting to swallow them whole. However, if we look deeply through the lens of psychology, this journey is divided into 3 distinct spatial zones that anyone seeking success must traverse:</p>

<ul>
  <li><strong>Comfort Zone:</strong> Where you feel safe and in control, but absolutely no growth ever occurs. It's like a stagnant pond; the water is calm, but it never flows.</li>
  <li><strong>Fear Zone:</strong> The moment you timidly put one foot outside the comfort zone, you are surrounded by a lack of self-confidence, excuses to rationalize your laziness, and the fear of others' opinions and judgments. The truth is, most of us give up and turn back right at this zone because we let fear obscure our vision. But be clear-headed: The worst risks you are imagining are actually completely controllable and manageable.</li>
  <li><strong>Learning Zone:</strong> If you have enough patience and courage to push past the thick fog of fear, you will enter the learning zone. This is where you truly live: you begin to face challenges, acquire new skills, solve problems, and extend your personal boundaries. The most fascinating part is: Once you practice and become proficient in the learning zone, it automatically transforms into a new, vastly expanded "comfort zone". Life is not actually about sacrificing safety; rather, it is the process of <em>continuously expanding your comfort zone</em>.</li>
</ul>

<p>When you bravely push yourself through those invisible limits, even if the initial path is hesitant and full of scratches, you will immediately reap 3 wonderful rewards that the outside world offers:</p>

<hr />

<h3>1. Discover the sleeping treasure of your potential</h3>
<p>If you keep hiding behind the door of safety, you will only recycle old skills, habits, and tired experiences. You will be like a book with only one chapter, flipping through it every day just to read it to yourself. But when you decisively step out into the storm, accept new projects, and set foot in strange lands, you force yourself to activate the most primal human survival mechanism: learn, adapt, and evolve.</p>

<p>Certainly, every beginning is always accompanied by clumsiness and awkwardness. You might stumble bitterly, taste your first harsh failures, and sometimes hold your head doubting your own abilities. But trust me, it is exactly in those darkest, most pressured hours when you feel like giving up, that you will be amazed to discover inner "superpowers" you never thought you had. Every time you wipe your tears and stand back up to start over, you sculpt yourself to be sharper and more resilient.</p>

<hr />

<h3>2. Shatter narrow prejudices and expand your worldview</h3>
<p>Imagine your comfort zone as a dried-up well, and you are the tiny frog sitting at the bottom. Your sky is exactly the size of the well's opening; everything around you is familiar, predictable, and circular. But the world outside is an immense, incredibly deep, majestic ocean holding countless mysteries waiting to be discovered.</p>

<p>When you boldly climb out of that dark well, you will meet people with entirely different mindsets. You will collide with diverse cultures and absorb fresh perspectives that might completely contradict your core, old-fashioned beliefs.</p>

<blockquote>
  <p><em>"Colliding with the world doesn't make us smaller or weaker; on the contrary, it expands the volume of our soul to hold more empathy, tolerance, and wisdom."</em></p>
</blockquote>

<p>Those practical experiences of friction will shatter all the narrow prejudices deeply rooted in your mind. You will learn to lower your arrogant ego, looking at a problem from ten different angles instead of just stubbornly defending your sole opinion. You become as flexible as water, as open as the sky, and absolutely nothing in life can easily break you or plunge you into psychological shock anymore.</p>

<hr />

<h3>3. Touch the true happiness of growth</h3>
<p>Many people still mistakenly believe that happiness is when life flows quietly and peacefully, without worries, without ripples, and without any difficulties or challenges standing in the way. But the truth is, a life entirely devoid of storms usually only brings emptiness, blandness, and profound boredom.</p>

<p>True happiness always comes with a much higher price tag. It comes from the salty sweat of resilient effort, from sleepless nights pushing past your own limits, from the moment you burst into realization that the "you" today is much more solid and better than the "you" of yesterday. That is the radiant happiness of growth.</p>

<p>When you dare to leave the warm blanket on a freezing winter morning, you will inevitably face the bone-chilling cold of discomfort and the initial shivers of fear. But imagine the wonderful feeling when you use your own bleeding feet to reach the mountain peak after so much hardship: The crisp air fills your lungs, the magnificent view of the sunrise is captured in your sight, and a fierce surge of pride rises within. That is a state of deep peace and absolute freedom that those who always choose to stay at the foot of the mountain will never, ever be able to understand.</p>

<div class="callout">
  <p><strong>A final note sent to you:</strong> The comfort zone is indeed a very soothing and beautiful place to take shelter. But etch this into your mind: <em>No great seed will ever be able to sprout and reach high to become an ancient tree in that soil</em>. Don't let your one and only life pass by like a faded rough draft that no one remembers. Take a deep breath, accept the unsteadiness of the first steps, bravely step out into the light, and do things you have never done before. Only then will your life truly unfold and become perfectly radiant, just as it was meant to be!</p>
</div>
        `
    }
];

export const BLOG_POSTS_VI: BlogPost[] = [
    {
        id: "1",
        title: "Cuộc đời thực sự chỉ bắt đầu khi bạn dám bước ra khỏi vùng an toàn",
        excerpt: "Vùng an toàn là nơi đẹp đẽ, nhưng không có gì phát triển ở đó cả. Hãy dũng cảm bước ra để khai phá tiềm năng thực sự của bản thân.",
        date: "May 8, 2026",
        readTime: "4 min read",
        category: "Cuộc sống",
        image: "/untitled-1555924881176370155281.jpg",
        slug: "stepping-out-of-the-safe-nest",
        tags: ["Tản mạn", "Phát triển bản thân", "Trải nghiệm"],
        content: `
<p class="lead">Trong hành trình chia sẻ, trải nghiệm và quan sát nhịp sống hối hả xung quanh, mình nhận ra một sự thật khá chạnh lòng: Rất nhiều người ngoài kia đang sống một cuộc đời "làng nhàng", lặp đi lặp lại một cách tẻ nhạt. Sâu thẳm bên trong, họ luôn khao khát những điều lớn lao hơn, một cuộc sống rực rỡ và trọn vẹn hơn. Nhưng rồi, guồng quay hối hả của cơm áo gạo tiền, sự trì hoãn và trên hết là nỗi sợ hãi lại kéo họ về, nhốt họ chặt chẽ trong cái lồng kính vô hình mang tên "vùng an toàn".</p>

<p>Vùng an toàn rốt cuộc là gì mà lại có sức mạnh to lớn đến vậy? Đó là một quán cà phê quen thuộc bạn vẫn thường ngồi mỗi sáng cuối tuần, là công việc bàn giấy lặp lại 8 tiếng mỗi ngày không màng chút thử thách, là những mối quan hệ cũ kỹ dù chẳng mang lại sự phát triển nhưng lại quá khó để từ bỏ. Ở đó, chúng ta cảm thấy vô cùng dễ chịu, ấm áp và bình yên, vì mọi thứ đều nằm trong tầm kiểm soát và có thể lường trước được. Không có rủi ro, không có sự phán xét từ người lạ, không sợ bị từ chối, và tất nhiên, không có sự đổ vỡ.</p>

<p>Nhưng bạn biết không, chính cái cảm giác "an toàn" êm ái đó lại là một chiếc bẫy ngọt ngào và nguy hiểm nhất thế gian. Chấp nhận sự ổn định quá mức đồng nghĩa với việc bạn đang tự nguyện "giậm chân tại chỗ". Nó âm thầm ru ngủ ý chí, giam cầm những ước mơ táo bạo và tước đi cơ hội để bạn chạm tới phiên bản rực rỡ nhất của chính mình.</p>

<blockquote>
  <p>Mình muốn chia sẻ với bạn một sự thật, dù có thể hơi phũ phàng nhưng lại là chiếc chìa khóa vạn năng: <strong>Cuộc đời của bạn thực sự chỉ bắt đầu vào khoảnh khắc bạn dám đặt chân ra khỏi ranh giới của sự quen thuộc.</strong></p>
</blockquote>

<p>Nhiều người e ngại việc bước ra ngoài vì họ lầm tưởng rằng ngoài "vùng an toàn" chỉ có bão tố, thất bại và những rủi ro trực chờ nuốt chửng họ. Tuy nhiên, nếu nhìn nhận một cách sâu sắc dựa trên tâm lý học, hành trình này được chia thành 3 vùng không gian rất rõ ràng mà bất kỳ ai muốn thành công cũng phải đi qua:</p>

<ul>
  <li><strong>Vùng an toàn (Comfort Zone):</strong> Nơi bạn cảm thấy dễ chịu, kiểm soát được mọi thứ nhưng tuyệt nhiên không có bất kỳ sự phát triển nào xảy ra. Giống như một cái ao tù, nước tuy lặng nhưng không bao giờ chảy.</li>
  <li><strong>Vùng sợ hãi (Fear Zone):</strong> Ngay khi vừa rụt rè thò một chân ra khỏi vùng an toàn, bạn sẽ bị bủa vây bởi sự thiếu tự tin, những cái cớ trì hoãn hợp lý hóa cho sự lười biếng, và lo sợ ánh nhìn, sự đánh giá của người khác. Sự thật là, phần lớn chúng ta thường gục ngã và quay đầu lại ngay tại vùng này vì để nỗi sợ hãi che khuất tầm nhìn. Nhưng hãy tỉnh táo nhìn nhận: Những rủi ro tồi tệ nhất mà bạn đang tự mường tượng ra thực chất hoàn toàn có thể kiểm soát và khắc phục được.</li>
  <li><strong>Vùng học hỏi (Learning Zone):</strong> Nếu bạn đủ kiên nhẫn và dũng khí để bước xuyên qua màn sương mù của nỗi sợ, bạn sẽ tiến vào vùng học hỏi. Đây là lúc bạn thực sự sống: bạn bắt đầu đối mặt với thách thức, tiếp thu kỹ năng mới, giải quyết vấn đề và mở rộng ranh giới năng lực của bản thân. Điểm thú vị nhất là: Khi bạn đã rèn luyện và thành thục ở vùng học hỏi, nó sẽ tự động biến thành một "vùng an toàn" mới rộng lớn hơn rất nhiều. Cuộc sống thực ra không phải là đánh đổi hay từ bỏ sự an toàn, mà là quá trình <em>không ngừng nới rộng vùng an toàn</em> của chính mình.</li>
</ul>

<p>Khi dũng cảm đẩy bản thân đi qua những giới hạn vô hình ấy, dù chặng đường ban đầu có thể ngập ngừng và đầy vết xước, bạn sẽ ngay lập tức gặt hái được 3 trái ngọt tuyệt vời mà thế giới ngoài kia mang lại:</p>

<hr />

<h3>1. Khám phá kho báu năng lực còn đang say ngủ</h3>
<p>Nếu cứ mãi nấp sau cánh cửa an toàn, bạn sẽ chỉ xào nấu lại những kỹ năng, thói quen và kinh nghiệm đã cũ mềm. Bạn sẽ giống như một cuốn sách chỉ có đúng một chương, ngày nào cũng lật đi lật lại để tự đọc cho chính mình nghe. Nhưng khi dứt khoát bước ra ngoài gió bão, nhận lời làm những dự án mới, đặt chân đến những vùng đất xa lạ, bạn buộc bản thân phải kích hoạt cơ chế sinh tồn nguyên thủy nhất của con người: học hỏi, thích nghi và tiến hóa.</p>

<p>Chắc chắn, mọi sự khởi đầu bao giờ cũng đi kèm với sự vụng về và ngượng ngùng. Bạn có thể sẽ vấp ngã ê chề, sẽ nếm trải những thất bại cay đắng đầu tiên, sẽ có lúc ôm đầu hoài nghi năng lực của chính mình. Nhưng hãy tin mình đi, chính trong những giờ phút tăm tối, áp lực và tưởng chừng như muốn bỏ cuộc ấy, bạn sẽ kinh ngạc khi phát hiện ra những "siêu năng lực" nội tại mà bản thân chưa từng nghĩ tới. Mỗi lần bạn lau nước mắt rồi tự đứng lên làm lại từ đầu, bạn lại đẽo gọt chính mình trở nên sắc bén và kiên cường hơn.</p>

<hr />

<h3>2. Đập vỡ định kiến hẹp hòi, mở rộng lăng kính thế giới quan</h3>
<p>Hãy tưởng tượng vùng an toàn của bạn là một chiếc giếng cạn, còn bạn là chú ếch nhỏ bé ngồi dưới đáy. Bầu trời của bạn chỉ vừa bằng đúng miệng giếng, mọi diễn biến xung quanh đều thân thuộc, dễ đoán và quẩn quanh. Nhưng thế giới ngoài kia lại là một đại dương bao la, sâu thẳm, kỳ vĩ và ẩn chứa vô vàn bí ẩn chờ được khám phá.</p>

<p>Khi bạn mạnh dạn leo lên khỏi miệng giếng tăm tối ấy, bạn sẽ được gặp gỡ những con người có lối tư duy hoàn toàn khác biệt. Bạn sẽ va chạm với những nền văn hóa đa dạng, tiếp thu những góc nhìn mới mẻ thậm chí trái ngược hoàn toàn với những niềm tin cốt lõi xưa cũ của bạn.</p>

<blockquote>
  <p><em>"Sự va chạm với thế giới không hề làm ta nhỏ bé đi hay yếu đuối hơn, mà ngược lại, nó mở rộng thể tích tâm hồn ta để chứa đựng nhiều hơn sự thấu cảm, lòng bao dung và trí tuệ."</em></p>
</blockquote>

<p>Những trải nghiệm cọ xát thực tế đó sẽ phá vỡ mọi định kiến hẹp hòi đã bám rễ lâu năm trong tâm trí bạn. Bạn sẽ học được cách hạ cái tôi ngạo mạn xuống, nhìn nhận một vấn đề từ mười góc độ khác nhau thay vì chỉ khăng khăng bảo vệ ý kiến duy nhất của mình. Bạn trở nên linh hoạt như nước, cởi mở như bầu trời, và chẳng còn bất cứ điều gì ở đời có thể dễ dàng làm bạn gục ngã hay rơi vào cú sốc tâm lý nữa.</p>

<hr />

<h3>3. Chạm tay vào niềm hạnh phúc đích thực của sự trưởng thành</h3>
<p>Nhiều người vẫn luôn lầm tưởng rằng hạnh phúc là khi cuộc sống trôi qua bình lặng êm đềm, vô âu vô lo, không gợn sóng, không có khó khăn hay thử thách nào ngáng đường. Nhưng sự thật là, một cuộc sống hoàn toàn vắng bóng sóng gió thường chỉ mang lại sự trống rỗng, vô vị và nhàm chán đến tột cùng.</p>

<p>Hạnh phúc đích thực luôn có một cái giá cao hơn rất nhiều. Nó đến từ những giọt mồ hôi mặn chát của sự nỗ lực kiên cường, từ những đêm thức trắng để vượt qua giới hạn của bản thân, từ khoảnh khắc bạn vỡ òa nhận ra mình ngày hôm nay đã vững chãi và tốt hơn chính mình của ngày hôm qua. Đó chính là hạnh phúc rực rỡ của sự trưởng thành.</p>

<p>Khi dám rời bỏ chiếc chăn ấm áp vào một buổi sáng mùa đông lạnh giá, bạn chắc chắn sẽ đối mặt với cái lạnh lẽo thấu xương của sự bất tiện và những cơn run rẩy của nỗi sợ hãi ban đầu. Nhưng hãy hình dung cảm giác tuyệt vời khi bạn dùng chính đôi chân rướm máu của mình leo lên đến đỉnh núi sau bao nhọc nhằn: Bầu không khí trong lành tràn ngập lồng ngực, khung cảnh tráng lệ của bình minh thu trọn vào tầm mắt, và một niềm kiêu hãnh trào dâng mãnh liệt. Đó là một trạng thái bình an sâu sắc và tự do tuyệt đối mà những người luôn chọn ở mãi dưới chân núi sẽ không bao giờ, và mãi mãi không bao giờ có thể hiểu được.</p>

<div class="callout">
  <p><strong>Lời kết gửi đến bạn:</strong> Vùng an toàn quả thực là một nơi rất êm ái và đẹp đẽ để trú ngụ. Nhưng hãy khắc ghi điều này: <em>Sẽ không có bất kỳ hạt mầm vĩ đại nào có thể nảy nở và vươn cao trở thành cây cổ thụ ở mảnh đất đó cả</em>. Đừng để cuộc đời duy nhất của bạn trôi qua như một bản nháp mờ nhạt không ai nhớ tới. Hãy hít một hơi thật sâu, chấp nhận sự chông chênh của những bước đi đầu tiên, dũng cảm bước ra ngoài ánh sáng và làm những điều bạn chưa từng làm. Có như vậy, cuộc đời bạn mới thực sự được khai mở và rực rỡ trọn vẹn như nó vốn dĩ phải thế!</p>
</div>
        `
    }
];

export const BLOG_POSTS = BLOG_POSTS_EN; // Default

export const BLOG_CATEGORIES_EN = ["All", "Life", "Thoughts", "Experience", "Logistics"];
export const BLOG_CATEGORIES_VI = ["Tất cả", "Cuộc sống", "Chút suy tư", "Trải nghiệm", "Logistics"];

export const BLOG_CATEGORIES = BLOG_CATEGORIES_EN; // Default

export function getPostBySlug(slug: string, lang: 'vi' | 'en' = 'en'): BlogPost | undefined {
    const list = lang === 'vi' ? BLOG_POSTS_VI : BLOG_POSTS_EN;
    return list.find((post) => post.slug === slug);
}
