import { REWRITTEN_POST_CONTENT_VI } from "./rewrittenPostContent";

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
    sourceType?: 'original' | 'curated';
    sourceName?: string;
    sourceUrl?: string;
    author?: string;
    views?: number;
    publishedAt?: string;
}

export const BLOG_POSTS_VI: BlogPost[] = [
    {
        id: "1",
        title: "Bước ra khỏi vùng an toàn: Khai phá tiềm năng thực sự của bản thân",
        excerpt: "Trong hành trình phát triển cá nhân, vùng an toàn là một chiếc kén êm ái nhưng đầy giới hạn. Hãy dũng cảm bước ra để tự khai phá những tiềm năng còn ẩn giấu và kiến tạo phiên bản rực rỡ nhất của chính mình.",
        date: "08 Tháng 5, 2026",
        readTime: "5 phút đọc",
        category: "Trải nghiệm",
        image: "/blog/stepping-out-of-the-safe-nest.jpg",
        slug: "stepping-out-of-the-safe-nest",
        tags: ["Tản mạn", "Phát triển bản thân", "Trải nghiệm"],
        isPublished: true,
        sourceType: "original",
        author: "Kim Đình Phương",
        content: `
<p class="lead">Trong tâm lý học hiện đại, "vùng an toàn" (Comfort Zone) được ví như chiếc kén êm ái bảo vệ con người trước những biến động và lo âu. Nhưng ở chiều ngược lại, chiếc kén ấy cũng chính là rào cản thầm lặng ngăn con người chạm tới những chân trời mới. Việc dũng cảm bước ra khỏi ranh giới quen thuộc không phải là ván cược mạo hiểm, mà là chìa khóa duy nhất để kích hoạt tiềm năng thực sự và kiến tạo một phiên bản rực rỡ hơn của chính mình.</p>

<p>Mình viết bài này không phải với tư cách một chuyên gia tâm lý hay một diễn giả truyền cảm hứng, mà đơn giản là một người trẻ đã từng — và vẫn đang — loay hoay tìm cách bước ra khỏi những giới hạn tự mình dựng lên. Có những giai đoạn mình sống rất "an toàn": đi làm đúng giờ, về nhà đúng giờ, lặp đi lặp lại một lịch trình quen thuộc đến mức nhắm mắt cũng đi được. Không có gì sai với điều đó, nhưng sâu thẳm bên trong luôn có một tiếng nói nhỏ hỏi rằng: <em>"Cuộc sống chỉ có vậy thôi sao?"</em></p>

<p>Vùng an toàn là trạng thái tâm lý mà ở đó mọi công việc, thói quen và môi trường xung quanh đều nằm trong tầm kiểm soát. Đó có thể là một công việc bàn giấy lặp đi lặp lại 8 tiếng mỗi ngày không màng thử thách, là con đường đi làm quen thuộc không bao giờ thay đổi, hay một phong cách sống phẳng lặng không sóng gió. Ở trong vùng an toàn, chúng ta cảm thấy bình an vì không đối mặt với nguy cơ thất bại hay sự phán xét từ bên ngoài. Nhưng các chuyên gia phát triển cá nhân cảnh báo rằng: <em>"Một chiếc thuyền rất an toàn khi neo đậu ở cảng, nhưng đó không phải là mục đích người ta đóng ra nó."</em> Việc chấp nhận sự ổn định quá mức lâu dần sẽ ru ngủ ý chí, làm mai một tư duy sáng tạo và khiến con người rơi vào trạng thái trì trệ. Giống như một dòng nước đứng yên lâu ngày sẽ thành ao tù, cuộc sống nếu thiếu đi sự cọ xát với những điều mới mẻ sẽ tự tước đi cơ hội trưởng thành.</p>

<p>Mình nhớ rất rõ cái cảm giác lần đầu tiên quyết định học lập trình — một lĩnh vực hoàn toàn xa lạ với chuyên ngành Logistics mà mình theo đuổi suốt những năm đại học. Lúc đó, xung quanh không ai hiểu tại sao mình lại muốn "rẽ ngang" như vậy. Có người hỏi: <em>"Học xong rồi có dùng được không?"</em>, có người thẳng thắn hơn: <em>"Mày biết gì về code mà học?"</em>. Những câu hỏi ấy không ác ý, nhưng chúng chạm đúng vào nỗi sợ lớn nhất của mình — nỗi sợ thất bại trước mắt mọi người.</p>

<p>Theo nghiên cứu của các nhà tâm lý học hành vi, quá trình bứt phá ranh giới cá nhân trải qua ba vùng chuyển tiếp rõ rệt. Đầu tiên là <strong>Vùng An Toàn</strong> — nơi bạn cảm thấy thoải mái và kiểm soát được mọi việc, nhưng tuyệt nhiên không có bất kỳ sự tăng trưởng nào xảy ra. Tiếp đến là <strong>Vùng Sợ Hãi</strong> — ngay khi vừa chớm bước ra ngoài, bạn lập tức đối mặt với sự thiếu tự tin, áp lực từ ánh nhìn người khác và những cái cớ hợp lý hóa cho sự rút lui. Rất nhiều người đã gục ngã và quay đầu ở vùng này vì để nỗi sợ che khuất tầm nhìn. Và cuối cùng là <strong>Vùng Học Hỏi & Trưởng Thành</strong> — nếu kiên trì vượt qua bức tường sợ hãi, bạn sẽ bước vào không gian của sự phát triển thực sự, nơi bạn tiếp thu kỹ năng mới, chinh phục thử thách thực tế và tự tay thiết lập một vùng an toàn mới rộng lớn hơn.</p>

<p>Nhìn lại hành trình của bản thân, mình đã trải qua cả ba vùng ấy không chỉ một lần. Lần đầu ngồi trước màn hình đen với dòng code <code>console.log("Hello World")</code>, mình không hiểu gì cả. Có những đêm mình muốn bỏ cuộc vì cảm giác mình quá chậm so với những người học chính quy. Nhưng rồi một ngày, khi tự tay xây được một trang web nhỏ chạy được trên trình duyệt — cái cảm giác tự hào đó, nó mạnh mẽ đến mức xóa sạch mọi nỗi nghi ngờ trước đó.</p>

<p>Khi chủ động đẩy bản thân vượt qua những ranh giới quen thuộc, bạn sẽ nhận ra những điều mà trước đây tưởng chừng không thể. Não bộ con người chỉ thực sự nhạy bén và sáng tạo khi đối mặt với những bài toán chưa từng có tiền lệ. Những hoàn cảnh thách thức buộc bạn phải kích hoạt cơ chế thích nghi, khám phá ra những sức mạnh nội tại mà trước đây chưa từng nghĩ mình sở hữu. Sự va chạm với môi trường mới, công nghệ mới và những góc nhìn đa dạng cũng sẽ đập tan các định kiến hẹp hòi, giúp bạn nhìn nhận vấn đề đa chiều hơn và trở nên linh hoạt, kiên cường trước mọi biến động. Và quan trọng nhất, hạnh phúc đích thực không đến từ sự vô âu vô lo thụ động — nó đến từ niềm tự hào sâu sắc khi thấy bản thân ngày hôm nay đã vững vàng hơn chính mình của ngày hôm qua.</p>

<p>Tất nhiên, bước ra khỏi vùng an toàn không có nghĩa là lao đầu vào rủi ro một cách mù quáng. Mình học được rằng sự thay đổi bền vững nhất đến từ những bước đi nhỏ — hay như các chuyên gia gọi là chiến lược <em>"Micro-steps"</em>. Bắt đầu từ việc học một kỹ năng mới 15 phút mỗi ngày, thay đổi một thói quen sinh hoạt nhỏ, hoặc chủ động mở lời với một đồng nghiệp mới. Rèn luyện tư duy cầu tiến bằng cách nhìn nhận mọi vấp ngã như một dữ liệu học hỏi thay vì coi đó là rào cản. Và quan trọng không kém, hãy trang bị cho mình công cụ số và tư duy công nghệ — chúng sẽ là bệ phóng vững chắc giúp bạn tự tin bước vào những sân chơi lớn hơn.</p>

<p>Giờ đây, khi nhìn lại đoạn đường đã đi, mình không hề hối hận vì đã chọn con đường khó hơn. Từ một sinh viên Logistics chỉ biết Excel, mình đã tự học lập trình, xây dựng được các sản phẩm số thực tế, và đang từng bước kết hợp hai thế mạnh Công nghệ và Chuỗi cung ứng thành một hướng đi riêng. Hành trình đó không hề suôn sẻ — nhưng chính những lần vấp ngã, loay hoay, và đứng dậy mới là thứ định hình nên con người mình hôm nay.</p>

<div class="callout">
  <p><strong>Lời kết:</strong> Thế giới bên ngoài vùng an toàn có thể chứa đựng những bất định, nhưng đó lại là nơi duy nhất chứa đựng những cơ hội tuyệt vời nhất. Đừng để cuộc đời trôi qua như một bản nháp mờ nhạt. Hãy hít một hơi thật sâu, dũng cảm bước ra ngoài ánh sáng và bắt đầu hành trình khai phá tiềm năng của chính bạn — ngay hôm nay.</p>
</div>
        `
    },
    {
        id: "2",
        title: "Xây dựng hệ thống Web hiện đại với Next.js và TypeScript: Kiến trúc thực chiến từ số 0",
        excerpt: "Những kinh nghiệm thực tế từ hành trình thiết kế, tổ chức mã nguồn và tối ưu hóa hiệu năng ứng dụng web bằng Next.js App Router, TypeScript và Tailwind CSS.",
        date: "10 Tháng 5, 2026",
        readTime: "6 phút đọc",
        category: "Lập trình",
        image: "/blog/modern-web-development-nextjs-typescript.jpg",
        slug: "modern-web-development-nextjs-typescript",
        tags: ["Next.js", "TypeScript", "Tailwind CSS", "Lập trình"],
        isPublished: true,
        sourceType: "original",
        author: "Kim Đình Phương",
        content: `
<p class="lead">Khi bắt đầu học lập trình web, chúng ta thường bị ngợp trước vô số framework và thư viện mới ra đời mỗi ngày. Tuy nhiên, việc nắm vững tư duy kiến trúc và làm chủ bộ ba <strong>Next.js, TypeScript và Tailwind CSS</strong> đã giúp mình hiện thực hóa được nhiều sản phẩm số chất lượng, từ các công cụ tiện ích nhỏ đến hệ thống quản lý hoàn chỉnh.</p>

<hr />

<h3>1. Tại sao Next.js App Router lại tạo nên bước ngoặt?</h3>
<p>Trước đây với mô hình Single Page Application (SPA) truyền thống, người dùng phải tải về toàn bộ mã nguồn JavaScript trước khi nội dung có thể hiển thị. Điều này khiến trang bị chậm (chỉ số FCP cao) và gây khó khăn lớn cho công cụ tìm kiếm (SEO).</p>

<p>Với Next.js App Router và mô hình <em>React Server Components (RSC)</em>:</p>
<ul>
  <li><strong>Zero-bundle-size components:</strong> Các component không cần tương tác động được render sẵn ở Server, gửi về HTML thuần túy, giúp kích thước bundle tải về trình duyệt giảm tới 40-60%.</li>
  <li><strong>Truy vấn dữ liệu trực tiếp:</strong> Dữ liệu từ cơ sở dữ liệu có thể gọi trực tiếp trong Server Component mà không cần tạo thêm API endpoint trung gian rườm rà.</li>
  <li><strong>Streaming & Suspense:</strong> Giao diện hiển thị tức thì các phần tĩnh, trong khi các phần dữ liệu nặng được tải ngầm và hiển thị mượt mà.</li>
</ul>

<hr />

<h3>2. Giá trị không thể thay thế của TypeScript</h3>
<p>Ban đầu khi chuyển từ JavaScript sang TypeScript, việc định nghĩa kiểu dữ liệu (types/interfaces) có thể mang lại cảm giác tốn thời gian. Nhưng khi dự án lớn dần, TypeScript chính là chiếc phao cứu sinh vững chắc nhất:</p>
<ul>
  <li><strong>Bắt lỗi ngay lúc gõ code (Compile-time):</strong> Không còn nỗi ám ảnh về lỗi <code>undefined is not a function</code> hay truy cập sai thuộc tính lúc runtime.</li>
  <li><strong>Tự động hoàn thành mã (Intellisense):</strong> Giúp việc refactor code và làm việc với các API phức tạp trở nên trực quan, tự tin và chính xác.</li>
  <li><strong>Tự tài liệu hóa (Self-documenting):</strong> Nhìn vào Interface là hiểu ngay cấu trúc dữ liệu mà không cần phải đoán mò hay đọc tài liệu rời rạc.</li>
</ul>

<hr />

<h3>3. Tư duy thiết kế giao diện với Tailwind CSS</h3>
<p>Tailwind CSS không đơn giản là viết inline styles, mà là xây dựng trên một <strong>hệ thống Design Tokens có kỷ luật</strong>:</p>
<ul>
  <li>Giữ vững sự nhất quán về khoảng cách (spacing), bảng màu (color palette) và phân cấp chữ (typography).</li>
  <li>Dễ dàng xây dựng giao diện tương thích đa thiết bị (Responsive) với các tiền tố <code>sm:</code>, <code>md:</code>, <code>lg:</code>.</li>
  <li>Hỗ trợ Dark Mode tự nhiên chỉ với class <code>dark:</code>.</li>
</ul>

<div class="callout">
  <p><strong>Lời khuyên dành cho bạn:</strong> Đừng học lập trình bằng cách xem thụ động các video hướng dẫn. Hãy bắt tay vào tự làm một dự án thực tế mà bản thân hoặc bạn bè xung quanh thực sự cần. Những lỗi bạn gặp và tự tay sửa trong quá trình đó mới chính là tài sản quý giá nhất!</p>
</div>
        `
    },
    {
        id: "3",
        title: "Ứng dụng Công nghệ và Tự động hóa trong Tối ưu hóa Vận hành Kho bãi (WMS)",
        excerpt: "Phân tích bài toán quản lý tồn kho, quy trình nhập - xuất hàng và vai trò của hệ thống quản lý kho bãi WMS trong việc giảm thiểu sai sót và cắt giảm chi phí logistics.",
        date: "11 Tháng 5, 2026",
        readTime: "7 phút đọc",
        category: "Logistics",
        image: "/blog/optimizing-warehouse-operations-wms.jpg",
        slug: "optimizing-warehouse-operations-wms",
        tags: ["Logistics", "Supply Chain", "WMS", "Tự động hóa", "Kho bãi"],
        isPublished: true,
        sourceType: "original",
        author: "Kim Đình Phương",
        content: `
<p class="lead">Trong lĩnh vực Logistics và Quản lý Chuỗi cung ứng, kho bãi không đơn thuần là nơi chứa đựng hàng hóa, mà là một "trạm trung chuyển nhịp thở" điều phối dòng chảy của cả chuỗi cung ứng. Bất kỳ sự chậm trễ hay nhầm lẫn nào trong kho cũng đều tạo ra hiệu ứng dây chuyền làm tăng chi phí và giảm mức độ hài lòng của khách hàng.</p>

<hr />

<h3>1. Những điểm nghẽn phổ biến trong quản lý kho truyền thống</h3>
<p>Nhiều doanh nghiệp vừa và nhỏ tại Việt Nam hiện nay vẫn quản lý hoạt động kho thông qua sổ sách thủ công hoặc các bảng tính Excel rời rạc. Cách làm này bộc lộ nhiều rủi ro lớn:</p>
<ul>
  <li><strong>Dữ liệu tồn kho bị trễ (Inventory Lag):</strong> Người quản lý không nắm được số lượng hàng thực tế theo thời gian thực (Real-time), dẫn đến tình trạng thiếu hàng đột ngột hoặc tồn kho quá mức gây ứ đọng vốn.</li>
  <li><strong>Sai sót khi nhặt hàng (Picking Errors):</strong> Nhân viên mất nhiều thời gian tìm kiếm vị trí sản phẩm trong kho, tỷ lệ nhặt nhầm mã sản phẩm hoặc sai số lượng cao.</li>
  <li><strong>Khó theo dõi hạn sử dụng (FEFO/FIFO):</strong> Đặc biệt đối với các mặt hàng nông sản, thực phẩm tươi sống hay dược phẩm, việc không kiểm soát tốt lô hàng (Batch) dễ dẫn đến hư hỏng, lãng phí lớn.</li>
</ul>

<hr />

<h3>2. Hệ thống WMS (Warehouse Management System) giải quyết bài toán ra sao?</h3>
<p>Một hệ thống quản lý kho bãi hiện đại như dự án <strong>EcoFresh WMS</strong> mà mình từng tham gia nghiên cứu và xây dựng tập trung vào 4 trụ cột cốt lõi:</p>

<ol>
  <li><strong>Mã vạch & QR Code hóa toàn diện:</strong> Mỗi kiện hàng và từng vị trí kệ (Bin/Rack) đều được gắn định danh số. Nhân viên kho chỉ cần quét mã bằng thiết bị cầm tay để xác nhận việc nhập, chuyển vị trí hoặc xuất hàng.</li>
  <li><strong>Tối ưu hóa đường đi nhặt hàng (Picking Route Optimization):</strong> Thuật toán tự động sắp xếp danh sách các mặt hàng cần lấy theo thứ tự đường đi ngắn nhất, giúp tiết kiệm tới 35% thời gian di chuyển trong kho.</li>
  <li><strong>Nguyên tắc FIFO (Nhập trước - Xuất trước) và FEFO (Hết hạn trước - Xuất trước):</strong> Tự động chỉ định lô hàng cần xuất kho trước, giảm thiểu tối đa tình trạng hàng hết hạn sử dụng.</li>
  <li><strong>Cảnh báo tồn kho an toàn (Safety Stock Alerts):</strong> Tự động kích hoạt thông báo khi mức tồn kho chạm ngưỡng tối thiểu để kịp thời đặt hàng mới.</li>
</ol>

<hr />

<h3>3. Giao thoa giữa Tư duy Logistics và Kỹ năng Công nghệ</h3>
<p>Lý do mình đam mê cả Logistics và Lập trình là vì hai lĩnh vực này bổ trợ cho nhau một cách hoàn hảo: <em>Tư duy Logistics giúp mình thấu hiểu bài toán nghiệp vụ, còn Lập trình cung cấp công cụ mạnh mẽ để giải quyết bài toán đó một cách tự động và tối ưu nhất.</em></p>

<div class="callout">
  <p><strong>Kết luận:</strong> Chuyển đổi số trong logistics không phải là điều gì xa vời. Đó là quá trình bắt đầu từ việc chuẩn hóa quy trình, số hóa dữ liệu từng bước và ứng dụng những công cụ công nghệ thiết thực để nâng cao năng suất mỗi ngày.</p>
</div>
        `
    },
    {
        id: "4",
        title: "AI Agent và Tự động hóa quy trình: Làn sóng định hình Chuỗi cung ứng toàn cầu",
        excerpt: "Khám phá cách các AI Agent thông minh đang tự động hóa việc dự báo nhu cầu thị trường, theo dõi hành trình đơn hàng và giải quyết các gián đoạn trong chuỗi cung ứng quốc tế.",
        date: "12 Tháng 5, 2026",
        readTime: "5 phút đọc",
        category: "AI",
        image: "/blog/ai-agents-shaping-modern-supply-chain.jpg",
        slug: "ai-agents-shaping-modern-supply-chain",
        tags: ["AI", "AI Agent", "Chuỗi cung ứng", "Tự động hóa", "TechCrunch"],
        isPublished: true,
        sourceType: "curated",
        sourceName: "TechCrunch & Vietnam Logistics Review",
        sourceUrl: "https://techcrunch.com",
        author: "Kim Đình Phương (Biên soạn)",
        content: `
<p class="lead">Trong năm 2025 - 2026, trí tuệ nhân tạo đã vượt qua giai đoạn của những chatbot hỏi đáp đơn thuần để bước vào kỷ nguyên của <strong>AI Agents (Các tác tử AI tự hành)</strong> – những hệ thống có khả năng tự động lập kế hoạch, sử dụng công cụ, phối hợp đa nhiệm và hành động độc lập để giải quyết các vấn đề phức tạp trong đời sống thực tế.</p>

<hr />

<h3>1. Sự khác biệt giữa Chatbot truyền thống và AI Agent</h3>
<p>Nếu như một chatbot LLM thông thường chỉ thụ động trả lời khi được hỏi, thì AI Agent sở hữu 4 năng lực vượt trội:</p>
<ul>
  <li><strong>Khả năng nhận thức mục tiêu (Goal-driven):</strong> Người dùng chỉ cần đưa ra mục tiêu cấp cao (ví dụ: <em>"Tìm giải pháp vận chuyển rẻ nhất và nhanh nhất cho lô hàng 10 tấn từ Hải Phòng đi Cần Thơ"</em>), Agent sẽ tự phân rã thành các bước cụ thể.</li>
  <li><strong>Sử dụng công cụ (Tool Use):</strong> Agent có thể tự gọi các API thời tiết, tra cứu giá cước tàu biển, kiểm tra lịch trình cảng và cập nhật trạng thái đơn hàng.</li>
  <li><strong>Tự sửa sai (Self-reflection):</strong> Nếu một tuyến đường bị tắc nghẽn hoặc hủy chuyến, Agent sẽ tự động đánh giá phương án dự phòng và thông báo cho người quản lý.</li>
</ul>

<hr />

<h3>2. Ba ứng dụng đột phá của AI Agent trong Chuỗi cung ứng</h3>

<p><strong>1. Dự báo nhu cầu thông minh (Dynamic Demand Forecasting):</strong> Thay vì chỉ phân tích dữ liệu lịch sử bán hàng trong quá khứ, AI Agent có thể liên tục tổng hợp dữ liệu thời tiết, xu hướng tìm kiếm trên mạng xã hội, các ngày lễ hội và biến động vĩ mô để dự báo chính xác nhu cầu sản phẩm theo từng tuần.</p>

<p><strong>2. Giám sát rủi ro chuỗi cung ứng theo thời gian thực:</strong> Khi có sự cố tắc nghẽn tại một cảng biển quốc tế hay biến động giá dầu mỏ, Agent có thể ngay lập tức phát hiện nguy cơ và đề xuất thay đổi tuyến vận chuyển thay thế trước khi sự cố ảnh hưởng đến tiến độ giao hàng.</p>

<p><strong>3. Tự động hóa thủ tục giấy tờ logistics:</strong> Xử lý chứng từ xuất nhập khẩu, vận đơn (Bill of Lading), hóa đơn thương mại (Commercial Invoice) và tờ khai hải quan với độ chính xác cao, giúp rút ngắn thời gian thông quan từ vài ngày xuống còn vài giờ.</p>

<hr />

<h3>3. Góc nhìn thực tế cho người làm công nghệ và vận hành</h3>
<p>Sự trỗi dậy của AI không làm mất đi vai trò của con người, mà nó nâng tầm người làm chuỗi cung ứng trở thành <em>những nhà điều phối chiến lược (Strategic Orchestrators)</em>. Những ai biết kết hợp tư duy logic ngành với khả năng tận dụng các công cụ AI sẽ nắm giữ lợi thế cạnh tranh vô cùng lớn.</p>

<div class="callout">
  <p><strong>Nguồn tham khảo:</strong> Bài viết được tổng hợp và phân tích dựa trên các báo cáo công nghệ mới nhất từ <strong>TechCrunch</strong> và <strong>Vietnam Logistics Review (VLR)</strong>.</p>
</div>
        `
    },
    {
        id: "5",
        title: "Hành trình từ sinh viên Logistics đến lập trình Web: Tự học hiệu quả trong kỷ nguyên số",
        excerpt: "Những kinh nghiệm thực tế đúc kết từ hành trình tự mày mò những dòng code đầu tiên, cách tận dụng công cụ AI để gia tốc học tập mà không bị lệ thuộc vào công nghệ.",
        date: "13 Tháng 5, 2026",
        readTime: "6 phút đọc",
        category: "Học tập",
        image: "/blog/self-learning-programming-from-logistics.jpg",
        slug: "self-learning-programming-from-logistics",
        tags: ["Tự học", "Lập trình", "Sinh viên", "Kỷ luật bản thân"],
        isPublished: true,
        sourceType: "original",
        author: "Kim Đình Phương",
        content: `
<p class="lead">Là một sinh viên chuyên ngành Logistics và Quản lý Chuỗi cung ứng, câu hỏi mình nhận được nhiều nhất từ bạn bè là: <em>"Tại sao lại học lập trình? Học có khó không và làm sao để cân bằng giữa việc học trên trường với việc tự học code?"</em>. Bài viết này là những chia sẻ chân thành từ trải nghiệm thực tế của chính mình.</p>

<hr />

<h3>1. Khởi đầu: Đừng để nỗi sợ "trái ngành" cản bước</h3>
<p>Rất nhiều bạn có chung suy nghĩ rằng: phải học chuyên ngành Công nghệ thông tin thì mới có thể viết code và xây dựng website. Nhưng thực tế trong kỷ nguyên Internet hiện nay, toàn bộ tri thức của nhân loại đều nằm trong tầm tay bạn thông qua các tài liệu mở, khóa học chất lượng cao và cộng đồng lập trình rộng lớn trên toàn thế giới.</p>

<p>Điều quan trọng nhất không phải là tấm bằng ghi chuyên ngành gì, mà là <strong>tư duy logic, khả năng giải quyết vấn đề và sự kiên trì theo đuổi tới cùng</strong>.</p>

<hr />

<h3>2. Phương pháp tự học có hệ thống (Structured Learning)</h3>
<p>Để không bị lạc lối trong biển thông tin, mình đã áp dụng chiến lược học tập theo 3 giai đoạn:</p>

<ol>
  <li><strong>Nắm vững nền tảng cốt lõi (Fundamentals First):</strong> Trước khi học React hay Next.js, hãy dành thời gian làm chủ HTML, CSS và JavaScript thuần (ES6+). Hiểu rõ cách trình duyệt render giao diện, cách DOM hoạt động và cơ chế bất đồng bộ (Async/Await, Promises).</li>
  <li><strong>Học qua dự án thực tế (Project-based Learning):</strong> Thay vì chỉ đọc sách lý thuyết hay xem video thụ động, mình luôn đặt ra đề bài cụ thể: xây dựng trang portfolio cá nhân, tạo một web luyện thi trắc nghiệm (như dự án HiTOEIC), hay một công cụ tính toán tiện ích (Ez Tool).</li>
  <li><strong>Đọc tài liệu chính thức (Official Documentation):</strong> Tài liệu chính thức từ Next.js, React, Tailwind CSS luôn là nguồn tin cậy và cập nhật nhanh nhất. Hãy tập thói quen đọc docs thay vì chỉ copy code trên mạng.</li>
</ol>

<hr />

<h3>3. Sử dụng AI làm đòn bẩy thông minh – Không ỷ lại</h3>
<p>Công cụ AI như Gemini hay ChatGPT là những trợ lý học tập tuyệt vời nếu bạn biết cách khai thác:</p>
<ul>
  <li><strong>Dùng AI để giải thích khái niệm trừu tượng:</strong> Yêu cầu AI giải thích một concept lập trình bằng các ví dụ thực tế gần gũi.</li>
  <li><strong>Dùng AI để tìm lỗi (Debug):</strong> Khi gặp lỗi lạ, hỏi AI về nguyên nhân cốt lõi thay vì chỉ yêu cầu sửa code mà không hiểu tại sao sai.</li>
  <li><strong>Nguyên tắc vàng:</strong> Không bao giờ dán một đoạn code vào dự án của mình nếu bạn chưa thực sự hiểu từng dòng code đó làm nhiệm vụ gì.</li>
</ul>

<div class="callout">
  <p><strong>Thông điệp gửi đến bạn:</strong> Mỗi hành trình vạn dặm đều bắt đầu từ một bước chân nhỏ. Hãy viết dòng code <code>console.log("Hello World")</code> đầu tiên ngay hôm nay và giữ vững niềm say mê học hỏi mỗi ngày!</p>
</div>
        `
    },
    {
        id: "6",
        title: "Tối ưu hóa Core Web Vitals: Bí quyết xây dựng website tải nhanh và mượt mà",
        excerpt: "Những phân tích chuyên sâu về LCP, INP, CLS và các giải pháp thực tế để một website cá nhân đạt điểm hiệu năng tối đa và tải nhanh dưới 1 giây.",
        date: "13 Tháng 5, 2026",
        readTime: "5 phút đọc",
        category: "Công nghệ",
        image: "/blog/mastering-core-web-vitals-performance.jpg",
        slug: "mastering-core-web-vitals-performance",
        tags: ["Web Performance", "Core Web Vitals", "Next.js", "SEO", "The Verge"],
        isPublished: true,
        sourceType: "curated",
        sourceName: "The Verge & Google Web Dev",
        sourceUrl: "https://www.theverge.com",
        author: "Kim Đình Phương (Biên soạn)",
        content: `
<p class="lead">Tốc độ tải trang không đơn thuần là một chỉ số kỹ thuật khô khan, mà là yếu tố quyết định trực tiếp xem người dùng có ở lại trang web của bạn hay rời đi ngay sau 2 giây đầu tiên. Google đã chính thức đưa <strong>Core Web Vitals</strong> thành tiêu chí xếp hạng tìm kiếm hàng đầu trên toàn cầu.</p>

<hr />

<h3>1. Ba chỉ số vàng của Core Web Vitals bạn bắt buộc phải biết</h3>

<ul>
  <li><strong>LCP (Largest Contentful Paint):</strong> Đo lường thời gian hiển thị phần nội dung lớn nhất trên màn hình (thường là ảnh bìa hero hoặc khối tiêu đề chính). Mục tiêu chuẩn là dưới <strong>2.5 giây</strong>.</li>
  <li><strong>INP (Interaction to Next Paint):</strong> Chỉ số mới thay thế FID, đo lường độ phản hồi của giao diện khi người dùng click chuột, bấm phím hoặc chạm vào màn hình. Mục tiêu là dưới <strong>200 mili-giây</strong>.</li>
  <li><strong>CLS (Cumulative Layout Shift):</strong> Đo lường độ ổn định thị giác – tránh tình trạng các phần tử trên trang bất ngờ nhảy vị trí khi ảnh hoặc quảng cáo tải chậm. Mục tiêu là dưới <strong>0.1</strong>.</li>
</ul>

<hr />

<h3>2. Những kỹ thuật tối ưu thực tế đã áp dụng trên dinhphuong.dev</h3>

<p><strong>1. Tối ưu hóa định dạng hình ảnh hiện đại (AVIF & WebP):</strong> Thay vì sử dụng ảnh JPEG hoặc PNG nặng nề, việc chuyển đổi sang AVIF giúp giảm tới 65% dung lượng ảnh mà vẫn giữ nguyên chất lượng hình ảnh sắc nét. Kết hợp cùng thuộc tính <code>priority</code> cho ảnh LCP đầu trang.</p>

<p><strong>2. Edge Rendering & Global CDN trên Cloudflare:</strong> Triển khai website trên nền tảng Cloudflare Workers giúp mã nguồn được phân phối tại hơn 300 trung tâm dữ liệu trên toàn cầu, đưa thời gian phản hồi máy chủ (TTFB) xuống dưới 50 mili-giây ngay tại Việt Nam.</p>

<p><strong>3. Tối ưu hóa phông chữ và CSS Critical:</strong> Loại bỏ CSS thừa, tải phông chữ hệ thống hoặc tự lưu trữ phông chữ (Self-hosted) để tránh hiện tượng nhấp nháy chữ (FOUT/FOIT).</p>

<hr />

<h3>3. Lợi ích vượt trội về SEO và Trải nghiệm người dùng</h3>
<p>Một website nhanh mang lại cảm giác chuyên nghiệp, tôn trọng thời gian của người truy cập và giữ chân độc giả lâu hơn trên từng bài viết. Đây chính là tiêu chuẩn mà mình luôn đặt ra khi xây dựng bất kỳ sản phẩm số nào.</p>

<div class="callout">
  <p><strong>Nguồn tham khảo:</strong> Tổng hợp từ tài liệu nghiên cứu hiệu năng web chính thức của <strong>Google Web Dev</strong> và các phân tích công nghệ từ <strong>The Verge</strong>.</p>
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
        image: "/blog/stepping-out-of-the-safe-nest.jpg",
        slug: "stepping-out-of-the-safe-nest",
        tags: ["Musings", "Growth", "Experience"],
        isPublished: true,
        sourceType: "original",
        author: "Kim Dinh Phuong",
        content: `
<p class="lead">In modern psychology, the "Comfort Zone" is often compared to a cozy cocoon protecting individuals from anxiety and unpredictability. However, that same cocoon can quietly become a barrier holding people back from discovering new horizons. Bravely stepping beyond familiar boundaries is not a reckless gamble, but the ultimate master key to unlocking true potential and building a more fulfilled version of oneself.</p>

<p>I'm writing this not as a psychologist or a motivational speaker, but simply as a young person who has been — and still is — figuring out how to move past the walls I built around myself. There were phases when I lived a very "safe" life: clocking in on time, clocking out on time, repeating the same routine so predictably I could do it with my eyes closed. There's nothing wrong with that, but deep down there was always a small voice asking: <em>"Is this really all there is?"</em></p>

<p>The comfort zone is a psychological state where one feels at ease and in total control. It might be a routine 8-hour desk job without challenges, a familiar commute route, or a predictable lifestyle devoid of risk. Inside this zone, we feel safe because there is no fear of failure or external judgment. But personal development experts remind us: <em>"A ship is safe in harbor, but that is not what ships are built for."</em> Accepting excessive stability over time numbs ambition, dulls creative thinking, and leads to stagnation. Just like standing water turns stale, a life without new challenges strips away opportunities for growth.</p>

<p>I remember vividly the first time I decided to learn programming — a field entirely foreign to the Logistics major I had pursued throughout university. Back then, nobody around me understood why I wanted to "switch lanes" like that. Some asked: <em>"Will you even be able to use it?"</em>, while others were more blunt: <em>"What do you know about coding?"</em>. Those questions weren't malicious, but they hit right at my biggest fear — the fear of failing in front of everyone.</p>

<p>According to behavioral scientists, pushing past personal boundaries involves three distinct transition zones. First is the <strong>Comfort Zone</strong> — safe and controlled, but where zero growth occurs. Next is the <strong>Fear Zone</strong> — stepping out immediately triggers self-doubt, excuses, and fear of others' opinions; many people give up here because fear obscures their vision. And finally, the <strong>Growth Zone</strong> — if you persevere past that wall of fear, you enter the space of true development, where you acquire new skills, solve real-world problems, and establish a vastly expanded new comfort zone.</p>

<p>Looking back at my own journey, I've passed through all three zones more than once. The first time I sat in front of a black terminal with <code>console.log("Hello World")</code>, I understood nothing. There were nights I wanted to quit because I felt impossibly slow compared to those who had studied computer science formally. But then one day, when I built a small website that actually ran in the browser — that sense of pride was so overwhelming it erased every doubt that came before.</p>

<p>When you proactively push past familiar boundaries, you discover things you once thought impossible. The human brain becomes exceptionally sharp and creative only when facing unprecedented challenges. High-pressure situations force adaptation and reveal inner strengths you never knew you possessed. Encountering new environments, digital tools, and diverse perspectives shatters narrow prejudices, helping you think in multiple dimensions and become more resilient. And most importantly, genuine happiness does not come from passive comfort — it comes from the deep pride of realizing you are stronger and more capable today than you were yesterday.</p>

<p>Of course, stepping out of your comfort zone does not mean jumping blindly into extreme risks. I've learned that the most sustainable change comes from small steps — what experts call the <em>"Micro-steps"</em> strategy. Start by practicing a new skill for 15 minutes a day, adjusting a small habit, or initiating a conversation with a new colleague. Cultivate a growth mindset by reframing every stumble as valuable learning data rather than a roadblock. And just as importantly, arm yourself with digital tools and technological thinking — they serve as a solid launchpad to enter larger arenas with confidence.</p>

<p>Now, looking back at the road I've traveled, I have no regrets about choosing the harder path. From a Logistics student who only knew Excel, I taught myself programming, built real digital products, and am gradually combining my strengths in Technology and Supply Chain into a unique direction. That journey hasn't been smooth — but it's precisely the stumbles, the confusion, and the getting back up that shaped who I am today.</p>

<div class="callout">
  <p><strong>Final Thought:</strong> The world outside your comfort zone may contain uncertainty, but it is also the only place containing extraordinary opportunities. Don't let life pass by like a faded rough draft. Take a deep breath, step into the light, and unlock your true potential — starting today.</p>
</div>
        `
    },
    {
        id: "2",
        title: "Modern Web Development with Next.js and TypeScript: Architecture from Scratch",
        excerpt: "Practical insights from designing, structuring, and optimizing web applications using Next.js App Router, TypeScript, and Tailwind CSS.",
        date: "May 10, 2026",
        readTime: "6 min read",
        category: "Programming",
        image: "/blog/modern-web-development-nextjs-typescript.jpg",
        slug: "modern-web-development-nextjs-typescript",
        tags: ["Next.js", "TypeScript", "Tailwind CSS", "Programming"],
        isPublished: true,
        sourceType: "original",
        author: "Kim Dinh Phuong",
        content: `
<p class="lead">Building modern web applications requires a disciplined architectural mindset. Mastering the stack of Next.js, TypeScript, and Tailwind CSS has empowered me to turn complex ideas into smooth, high-performing digital products.</p>

<hr />

<h3>1. The Paradigm Shift with React Server Components</h3>
<p>By leveraging Server Components, we eliminate unnecessary client-side JavaScript, deliver lightning-fast first paint, and enable seamless data fetching directly at the edge without boilerplate APIs.</p>

<hr />

<h3>2. Why TypeScript is Non-negotiable</h3>
<p>Compile-time type safety turns runtime surprises into predictable builds, enabling confident refactoring and self-documenting codebases.</p>
        `
    },
    {
        id: "3",
        title: "Applying Technology and Automation to Optimize Warehouse Management (WMS)",
        excerpt: "Analyzing inventory challenges, inbound-outbound workflows, and how modern WMS systems reduce errors and operational logistics costs.",
        date: "May 11, 2026",
        readTime: "7 min read",
        category: "Logistics",
        image: "/blog/optimizing-warehouse-operations-wms.jpg",
        slug: "optimizing-warehouse-operations-wms",
        tags: ["Logistics", "Supply Chain", "WMS", "Automation"],
        isPublished: true,
        sourceType: "original",
        author: "Kim Dinh Phuong",
        content: `
<p class="lead">Warehousing is the heartbeat of supply chain management. Integrating barcode technology, real-time inventory tracking, and picking route optimization creates unprecedented operational efficiency.</p>

<hr />

<h3>1. Overcoming Traditional Bottlenecks</h3>
<p>Replacing manual spreadsheets with automated QR-based scanning eliminates inventory lag and shipping mistakes.</p>
        `
    },
    {
        id: "4",
        title: "AI Agents and Workflow Automation: Shaping Global Supply Chain Operations",
        excerpt: "Exploring how autonomous AI agents are forecasting demand, monitoring route disruptions, and streamlining global logistics documentation.",
        date: "May 12, 2026",
        readTime: "5 min read",
        category: "AI",
        image: "/blog/ai-agents-shaping-modern-supply-chain.jpg",
        slug: "ai-agents-shaping-modern-supply-chain",
        tags: ["AI", "AI Agent", "Supply Chain", "Automation"],
        isPublished: true,
        sourceType: "curated",
        sourceName: "TechCrunch & Vietnam Logistics Review",
        sourceUrl: "https://techcrunch.com",
        author: "Kim Dinh Phuong (Curated)",
        content: `
<p class="lead">AI Agents have evolved from conversational chatbots to autonomous executors capable of orchestrating multi-step supply chain operations in real time.</p>
        `
    },
    {
        id: "5",
        title: "From Logistics Student to Web Developer: Effective Self-Learning in the Digital Age",
        excerpt: "Reflections and practical methodologies for self-learning modern software engineering alongside a non-CS major using AI tools smartly.",
        date: "May 13, 2026",
        readTime: "6 min read",
        category: "Learning",
        image: "/blog/self-learning-programming-from-logistics.jpg",
        slug: "self-learning-programming-from-logistics",
        tags: ["Self-Learning", "Programming", "Student", "Discipline"],
        isPublished: true,
        sourceType: "original",
        author: "Kim Dinh Phuong",
        content: `
<p class="lead">Non-traditional backgrounds are not limitations; they are unique superpowers that combine domain logic with software capabilities.</p>
        `
    },
    {
        id: "6",
        title: "Mastering Core Web Vitals: Secrets to Ultra-Fast Web Performance",
        excerpt: "Deep dive into LCP, INP, CLS, and practical techniques to deliver sub-second page loads globally on Cloudflare edge infrastructure.",
        date: "May 13, 2026",
        readTime: "5 min read",
        category: "Technology",
        image: "/blog/mastering-core-web-vitals-performance.jpg",
        slug: "mastering-core-web-vitals-performance",
        tags: ["Web Performance", "Core Web Vitals", "Next.js", "SEO"],
        isPublished: true,
        sourceType: "curated",
        sourceName: "The Verge & Google Web Dev",
        sourceUrl: "https://www.theverge.com",
        author: "Kim Dinh Phuong (Curated)",
        content: `
<p class="lead">Web performance is not just a technical metric; it is the ultimate user experience feature that commands user retention and search rankings.</p>
        `
    }
];

for (const post of BLOG_POSTS_VI) {
    const rewrittenContent = REWRITTEN_POST_CONTENT_VI[post.slug];
    if (rewrittenContent) {
        post.content = rewrittenContent;
    }
}

export const BLOG_POSTS = BLOG_POSTS_EN; // Default

export const BLOG_CATEGORIES_EN = ["All", "Technology", "Programming", "AI", "Logistics", "Learning", "Experience"];
export const BLOG_CATEGORIES_VI = ["Tất cả", "Công nghệ", "Lập trình", "AI", "Logistics", "Học tập", "Trải nghiệm"];

export const BLOG_CATEGORIES = BLOG_CATEGORIES_EN; // Default

export function getCategoryDisplay(category: string, lang: 'vi' | 'en'): string {
    const viIdx = BLOG_CATEGORIES_VI.findIndex((c) => c.toLowerCase() === category.toLowerCase());
    if (viIdx !== -1) {
        return lang === 'en' ? BLOG_CATEGORIES_EN[viIdx] : BLOG_CATEGORIES_VI[viIdx];
    }
    const enIdx = BLOG_CATEGORIES_EN.findIndex((c) => c.toLowerCase() === category.toLowerCase());
    if (enIdx !== -1) {
        return lang === 'en' ? BLOG_CATEGORIES_EN[enIdx] : BLOG_CATEGORIES_VI[enIdx];
    }
    return category;
}

export function getPostBySlug(slug: string, lang: 'vi' | 'en' = 'en'): BlogPost | undefined {
    const list = lang === 'vi' ? BLOG_POSTS_VI : BLOG_POSTS_EN;
    return list.find((post) => post.slug === slug);
}
