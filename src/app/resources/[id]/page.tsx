"use client";

import { useState } from "react";
import { resources, users } from "@/data/mockData";
import { ArrowLeft, Star, Download, Bookmark, ExternalLink, ShieldCheck, Clock, FileCode2 } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function ResourceDetailPage({ params }: { params: { id: string } }) {
  const resource = resources.find(r => r.id === params.id) || resources[0];
  const author = users.find(u => u.id === resource.authorId);
  const [activeTab, setActiveTab] = useState("Tổng quan");

  return (
    <div className="bg-background min-h-screen pb-20">
      {/* Banner / Hero */}
      <div className="bg-card border-b border-border/50 pt-8 pb-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <Link href="/resources" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary font-medium mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Quay lại
          </Link>

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
            {/* Thumbnail */}
            <div className="w-full lg:w-1/2 aspect-video rounded-2xl overflow-hidden border border-border/50 shadow-lg relative group">
              <img src={resource.thumbnail} alt={resource.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-sm cursor-pointer">
                <div className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-full font-semibold">
                  <ExternalLink className="w-4 h-4" /> Xem Preview
                </div>
              </div>
            </div>

            {/* Info */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-secondary text-secondary-foreground text-sm font-semibold rounded-full border border-border/50">
                  {resource.category}
                </span>
                <div className="flex items-center gap-1 text-yellow-500 bg-yellow-500/10 px-2.5 py-1 rounded-full text-sm font-bold border border-yellow-500/20">
                  <Star className="w-4 h-4 fill-current" />
                  {resource.rating} (124 đánh giá)
                </div>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold mb-4">{resource.title}</h1>
              
              <p className="text-lg text-muted-foreground mb-6">
                {resource.description}
              </p>

              <div className="flex items-center gap-4 mb-8">
                <img src={author?.avatar} alt={author?.name} className="w-12 h-12 rounded-full border border-border" />
                <div>
                  <div className="text-sm text-muted-foreground">Phát triển bởi</div>
                  <div className="font-semibold flex items-center gap-1">
                    {author?.name} 
                    {author?.badge && <span className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center text-white text-[10px] font-bold ml-1">✓</span>}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-y border-border/50 mb-8">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Giá</div>
                  <div className="font-bold text-xl text-primary">{resource.price === 0 ? "Miễn phí" : `${resource.price.toLocaleString()}đ`}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Lượt tải</div>
                  <div className="font-semibold text-lg flex items-center gap-1">
                    <Download className="w-4 h-4 text-muted-foreground" /> {resource.downloads.toLocaleString()}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Cập nhật</div>
                  <div className="font-semibold text-lg flex items-center gap-1">
                    <Clock className="w-4 h-4 text-muted-foreground" /> 2 ngày trước
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Phiên bản</div>
                  <div className="font-semibold text-lg flex items-center gap-1">
                    <FileCode2 className="w-4 h-4 text-muted-foreground" /> v1.2.0
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button className="flex-1 py-4 bg-primary text-white rounded-xl font-bold text-lg hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 flex justify-center items-center gap-2">
                  <Download className="w-5 h-5" />
                  {resource.price === 0 ? "Tải về miễn phí" : "Mua ngay"}
                </button>
                <button className="px-6 py-4 border-2 border-border/50 rounded-xl font-bold hover:bg-secondary/50 transition-colors flex justify-center items-center gap-2">
                  <Bookmark className="w-5 h-5" /> Lưu lại
                </button>
              </div>
              
              <div className="flex justify-center items-center gap-2 mt-4 text-sm text-green-500 font-medium">
                <ShieldCheck className="w-4 h-4" /> Đã kiểm duyệt an toàn, không có mã độc.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Details Tabs */}
      <div className="container mx-auto px-4 max-w-6xl mt-8">
        <div className="flex overflow-x-auto hide-scrollbar gap-2 mb-8 border-b border-border/50">
          {["Tổng quan", "Tính năng", "Hướng dẫn cài đặt", "Bình luận", "Changelog"].map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-6 py-4 font-medium whitespace-nowrap transition-colors border-b-2",
                activeTab === tab ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 prose prose-lg dark:prose-invert max-w-none">
            {activeTab === "Tổng quan" && (
              <>
                <h3>Giới thiệu về {resource.title}</h3>
                <p>
                  Đây là một giải pháp toàn diện giúp bạn xây dựng ứng dụng một cách nhanh chóng. 
                  Source code được viết bằng các công nghệ hiện đại nhất, clean code, dễ dàng mở rộng và tùy biến.
                </p>
                <img src={resource.thumbnail} alt="" className="rounded-xl border border-border/50 w-full" />
                <h3>Tech Stack</h3>
                <div className="flex flex-wrap gap-2 not-prose mb-8">
                  {resource.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-secondary text-foreground text-sm font-medium rounded-lg border border-border/50">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3>Tại sao chọn tài nguyên này?</h3>
                <ul>
                  <li>Tiết kiệm 80% thời gian code từ đầu.</li>
                  <li>Thiết kế UI/UX hiện đại, responsive 100%.</li>
                  <li>Tài liệu hướng dẫn cài đặt chi tiết (Documentation).</li>
                  <li>Hỗ trợ update miễn phí trong 6 tháng.</li>
                </ul>
              </>
            )}

            {activeTab === "Hướng dẫn cài đặt" && (
              <>
                <h3>Yêu cầu hệ thống</h3>
                <ul>
                  <li>Node.js v18.17.0 trở lên</li>
                  <li>npm v9.0.0 hoặc pnpm</li>
                  <li>Git</li>
                </ul>
                <h3>Bước 1: Cài đặt dependencies</h3>
                <pre><code>npm install
# hoặc
pnpm install</code></pre>
                <h3>Bước 2: Cấu hình biến môi trường</h3>
                <p>Copy file <code>.env.example</code> thành <code>.env.local</code> và điền các thông tin cần thiết.</p>
                <pre><code>cp .env.example .env.local</code></pre>
                <h3>Bước 3: Chạy project</h3>
                <pre><code>npm run dev</code></pre>
                <p>Project sẽ chạy tại địa chỉ: <a href="http://localhost:3000">http://localhost:3000</a></p>
              </>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            <div className="bg-card border border-border/50 rounded-2xl p-6 shadow-sm">
              <h3 className="font-bold text-lg mb-4">Thông tin thêm</h3>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Bản quyền</span>
                  <span className="font-medium">Cá nhân (1 project)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Framework</span>
                  <span className="font-medium">Next.js 14, Tailwind CSS</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Dung lượng</span>
                  <span className="font-medium">4.2 MB</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Đã kiểm tra trên</span>
                  <span className="font-medium">Chrome, Safari, Edge</span>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border/50 rounded-2xl p-6 shadow-sm">
              <h3 className="font-bold text-lg mb-4">Tài nguyên liên quan</h3>
              <div className="space-y-4">
                {resources.filter(r => r.id !== resource.id).slice(0,3).map(r => (
                  <Link key={r.id} href={`/resources/${r.id}`} className="flex gap-3 group">
                    <img src={r.thumbnail} alt="" className="w-20 h-14 rounded-lg object-cover" />
                    <div>
                      <div className="text-sm font-semibold group-hover:text-primary transition-colors line-clamp-1">{r.title}</div>
                      <div className="text-xs text-primary font-bold mt-1">{r.price === 0 ? "Free" : `${r.price.toLocaleString()}đ`}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
