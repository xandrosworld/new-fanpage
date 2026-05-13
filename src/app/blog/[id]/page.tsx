"use client";

import { blogPosts, users } from "@/data/mockData";
import { ArrowLeft, Clock, Calendar, Share2, Heart, Bookmark, MessageCircle } from "lucide-react";
import Link from "next/link";

export default function BlogDetailPage({ params }: { params: { id: string } }) {
  // Mock current post (fallback to first post if not found)
  const post = blogPosts.find(p => p.id === params.id) || blogPosts[0];
  const author = users.find(u => u.id === post.authorId);

  return (
    <div className="bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link href="/blog" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary font-medium mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Quay lại Blog
        </Link>

        {/* Post Header */}
        <div className="mb-8">
          <div className="flex gap-2 mb-4">
            <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-semibold rounded-full">
              {post.category}
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-6">{post.title}</h1>
          
          <div className="flex flex-wrap items-center gap-6 text-muted-foreground border-y border-border/50 py-4">
            <div className="flex items-center gap-3">
              <img src={author?.avatar} alt={author?.name} className="w-10 h-10 rounded-full" />
              <div className="font-semibold text-foreground">{author?.name}</div>
            </div>
            <div className="flex items-center gap-1.5 text-sm">
              <Calendar className="w-4 h-4" /> {post.date}
            </div>
            <div className="flex items-center gap-1.5 text-sm">
              <Clock className="w-4 h-4" /> {post.readTime}
            </div>
          </div>
        </div>
      </div>

      {/* Cover Image */}
      <div className="w-full max-w-5xl mx-auto px-4 mb-12">
        <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-lg border border-border/50">
          <img src={post.thumbnail} alt={post.title} className="w-full h-full object-cover" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 pb-20 flex flex-col lg:flex-row gap-12">
        {/* Left Action Bar (Sticky) */}
        <div className="hidden lg:flex flex-col items-center gap-4 sticky top-24 h-fit">
          <button className="w-12 h-12 rounded-full border border-border/50 bg-card flex flex-col items-center justify-center text-muted-foreground hover:text-red-500 hover:border-red-500/50 transition-colors group">
            <Heart className="w-5 h-5 group-hover:fill-red-500" />
            <span className="text-[10px] font-medium mt-0.5">124</span>
          </button>
          <button className="w-12 h-12 rounded-full border border-border/50 bg-card flex flex-col items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors group">
            <MessageCircle className="w-5 h-5 group-hover:fill-primary" />
            <span className="text-[10px] font-medium mt-0.5">18</span>
          </button>
          <button className="w-12 h-12 rounded-full border border-border/50 bg-card flex items-center justify-center text-muted-foreground hover:text-yellow-500 hover:border-yellow-500/50 transition-colors group">
            <Bookmark className="w-5 h-5 group-hover:fill-yellow-500" />
          </button>
          <div className="w-8 h-px bg-border/50 my-2"></div>
          <button className="w-12 h-12 rounded-full border border-border/50 bg-card flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors group">
            <Share2 className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <article className="flex-1 prose prose-lg dark:prose-invert prose-headings:font-bold prose-a:text-primary max-w-none">
          <p className="lead text-xl text-muted-foreground font-medium mb-8">
            {post.excerpt}
          </p>
          
          <h2>1. Giới thiệu</h2>
          <p>
            Đây là nội dung demo cho bài viết. Trong thực tế, nội dung này sẽ được render từ Markdown hoặc một trình soạn thảo văn bản giàu tính năng (Rich Text Editor). Hệ thống đang được thiết kế để hỗ trợ tốt nhất cho trải nghiệm đọc trên cả mobile và desktop.
          </p>
          
          <blockquote>
            "Sáng tạo là không có giới hạn. Việc sở hữu một cộng đồng tốt sẽ giúp sản phẩm của bạn tiến xa hơn." — {author?.name}
          </blockquote>

          <h2>2. Cách thực hiện</h2>
          <p>Dưới đây là một số bước cơ bản bạn có thể tham khảo:</p>
          <ul>
            <li>Lên ý tưởng và wireframe cho UI/UX</li>
            <li>Chọn Tech Stack phù hợp (Next.js, Tailwind, Node.js)</li>
            <li>Xây dựng các Component dùng chung (Button, Card, Modal)</li>
            <li>Phát triển các tính năng cốt lõi (Auth, CRUD, Chat)</li>
          </ul>

          <pre><code className="language-javascript">{`// Ví dụ code snippet
function initCommunity() {
  console.log("Community started!");
  const users = loadUsers();
  setupSockets(users);
}

initCommunity();`}</code></pre>

          <h2>3. Kết luận</h2>
          <p>
            Hy vọng bài viết này mang lại giá trị cho bạn. Đừng quên thả tim và lưu bài viết để đọc lại khi cần. Nếu có thắc mắc, hãy để lại bình luận bên dưới nhé!
          </p>
        </article>
      </div>
    </div>
  );
}
