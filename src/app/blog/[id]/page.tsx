"use client";

import { useParams } from "next/navigation";
import { blogPosts, users } from "@/data/mockData";
import { ArrowLeft, Bookmark, Calendar, Clock, Heart, MessageCircle, Share2 } from "lucide-react";
import Link from "next/link";

export default function BlogDetailPage() {
  const params = useParams<{ id: string }>();
  const post = blogPosts.find((item) => item.id === params.id) || blogPosts[0];
  const author = users.find((user) => user.id === post.authorId);

  return (
    <div className="bg-background pb-20">
      <div className="mx-auto max-w-5xl px-4 py-10">
        <Link
          data-magnetic
          href="/blog"
          className="btn-quiet mb-8 inline-flex items-center gap-2 px-4 py-3 text-sm font-bold"
        >
          <ArrowLeft className="h-4 w-4" />
          Quay lại Blog
        </Link>

        <header className="mb-10">
          <span className="mb-5 inline-flex rounded-[6px] border border-primary/15 bg-primary/10 px-3 py-1 text-sm font-bold text-primary">
            {post.category}
          </span>
          <h1 className="display-title max-w-4xl text-5xl md:text-7xl">{post.title}</h1>

          <div className="mt-8 flex flex-wrap items-center gap-6 border-y border-white/5 py-4 text-muted-foreground">
            <div className="flex items-center gap-3">
              <img src={author?.avatar} alt={author?.name} className="h-10 w-10 rounded-[8px] object-cover" />
              <div className="font-bold text-foreground">{author?.name}</div>
            </div>
            <div className="flex items-center gap-1.5 text-sm">
              <Calendar className="h-4 w-4" /> {post.date}
            </div>
            <div className="flex items-center gap-1.5 text-sm">
              <Clock className="h-4 w-4" /> {post.readTime}
            </div>
          </div>
        </header>
      </div>

      <div className="mx-auto mb-12 max-w-6xl px-4">
        <div data-spotlight data-hue="322" className="artisan-card p-3">
          <div className="artisan-media aspect-video">
            <img src={post.thumbnail} alt={post.title} className="h-full w-full object-cover" />
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-5xl flex-col gap-10 px-4 lg:flex-row">
        <aside className="hidden h-fit flex-col items-center gap-3 lg:flex lg:sticky lg:top-24">
          {[
            { icon: Heart, label: "124" },
            { icon: MessageCircle, label: "18" },
            { icon: Bookmark, label: "" },
            { icon: Share2, label: "" },
          ].map((action) => (
            <button
              data-magnetic
              key={action.icon.name}
              className="btn-quiet flex h-12 w-12 flex-col items-center justify-center text-muted-foreground hover:text-primary"
            >
              <action.icon className="h-5 w-5" />
              {action.label && <span className="mt-0.5 text-[10px] font-bold">{action.label}</span>}
            </button>
          ))}
        </aside>

        <article className="artisan-card prose prose-lg max-w-none flex-1 p-6 leading-8 dark:prose-invert prose-headings:font-bold prose-a:text-primary md:p-10">
          <p className="lead text-xl font-semibold text-muted-foreground">{post.excerpt}</p>

          <h2>1. Giới thiệu</h2>
          <p>
            Đây là bản ghi chú thực chiến dành cho creator và developer muốn xây sản phẩm có cộng đồng thật. Trọng tâm không chỉ là công nghệ, mà còn là nhịp trải nghiệm, cách người dùng khám phá giá trị và lý do họ quay lại.
          </p>

          <blockquote>
            &ldquo;Sáng tạo là một hệ thống cần được chăm sóc mỗi ngày.&rdquo; - {author?.name}
          </blockquote>

          <h2>2. Cách triển khai</h2>
          <p>
            Bắt đầu từ một luồng nhỏ nhưng rõ: người dùng tìm thấy tài nguyên, hiểu giá trị, lưu lại, thử nghiệm và chia sẻ phản hồi. Mỗi bước nên có một tín hiệu thị giác riêng để giảm cảm giác chung chung.
          </p>
          <ul>
            <li>Phác thảo hierarchy nội dung trước khi chọn component.</li>
            <li>Giữ card ít viền, dùng ánh sáng và chất liệu để phân tầng.</li>
            <li>Ưu tiên micro-interaction có mục đích thay vì animation dày đặc.</li>
            <li>Kiểm tra lại typography trên mobile, đặc biệt với tiếng Việt có dấu.</li>
          </ul>

          <pre><code className="language-javascript">{`function initCommunity() {
  const signals = ["read", "save", "share"];
  return signals.map((signal) => track(signal));
}`}</code></pre>

          <h2>3. Kết luận</h2>
          <p>
            Một giao diện tốt không cần phô trương. Nó cần tạo cảm giác được biên tập kỹ, để người dùng tin rằng sản phẩm phía sau cũng được xây dựng cẩn thận như vậy.
          </p>
        </article>
      </div>
    </div>
  );
}
