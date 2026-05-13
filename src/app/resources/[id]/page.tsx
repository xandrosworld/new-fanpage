"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { resources, users } from "@/data/mockData";
import { ArrowLeft, Bookmark, Clock, Download, FileCode2, ShieldCheck, Star } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function ResourceDetailPage() {
  const params = useParams<{ id: string }>();
  const resource = resources.find((item) => item.id === params.id) || resources[0];
  const author = users.find((user) => user.id === resource.authorId);
  const [activeTab, setActiveTab] = useState("Tổng quan");

  return (
    <div className="min-h-screen bg-background pb-20">
      <section className="border-b border-white/5 px-4 py-10">
        <div className="mx-auto max-w-6xl">
          <Link data-magnetic href="/resources" className="btn-quiet mb-8 inline-flex items-center gap-2 px-4 py-3 text-sm font-bold">
            <ArrowLeft className="h-4 w-4" />
            Quay lại
          </Link>

          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div data-spotlight data-hue="172" className="artisan-card p-3">
              <div className="artisan-media aspect-video">
                <img src={resource.thumbnail} alt={resource.title} className="h-full w-full object-cover" />
              </div>
            </div>

            <div>
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <span className="rounded-[6px] border border-white/8 bg-white/[0.04] px-3 py-1 text-sm font-bold">
                  {resource.category}
                </span>
                <div className="flex items-center gap-1 rounded-[6px] border border-amber-300/15 bg-amber-300/10 px-2.5 py-1 text-sm font-bold text-amber-300">
                  <Star className="h-4 w-4 fill-current" />
                  {resource.rating} (124 đánh giá)
                </div>
              </div>

              <h1 className="display-title mb-5 text-5xl md:text-6xl">{resource.title}</h1>
              <p className="mb-6 text-lg leading-8 text-muted-foreground">{resource.description}</p>

              <div className="mb-8 flex items-center gap-4">
                <img src={author?.avatar} alt={author?.name} className="h-12 w-12 rounded-[8px] border border-white/10 object-cover" />
                <div>
                  <div className="text-sm text-muted-foreground">Phát triển bởi</div>
                  <div className="font-extrabold">{author?.name}</div>
                </div>
              </div>

              <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  { label: "Giá", value: resource.price === 0 ? "Miễn phí" : `${resource.price.toLocaleString()}đ` },
                  { label: "Lượt tải", value: resource.downloads.toLocaleString(), icon: Download },
                  { label: "Cập nhật", value: "2 ngày trước", icon: Clock },
                  { label: "Phiên bản", value: "v1.2.0", icon: FileCode2 },
                ].map((item) => (
                  <div key={item.label} className="rounded-[8px] border border-white/5 bg-white/[0.03] p-3">
                    <div className="mb-1 text-xs font-bold text-muted-foreground">{item.label}</div>
                    <div className="flex items-center gap-1 text-sm font-extrabold">
                      {item.icon && <item.icon className="h-4 w-4 text-primary" />}
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button data-magnetic className="btn-artisan flex-1 py-4 text-base">
                  <Download className="h-5 w-5" />
                  {resource.price === 0 ? "Tải miễn phí" : "Mua ngay"}
                </button>
                <button data-magnetic className="btn-quiet px-6 py-4 font-extrabold">
                  <Bookmark className="h-5 w-5" />
                  Lưu lại
                </button>
              </div>

              <div className="mt-4 flex items-center gap-2 text-sm font-bold text-primary">
                <ShieldCheck className="h-4 w-4" />
                Đã kiểm duyệt an toàn, không có mã độc.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-8 max-w-6xl px-4">
        <div className="hide-scrollbar mb-8 flex gap-2 overflow-x-auto border-b border-white/5 pb-2">
          {["Tổng quan", "Tính năng", "Hướng dẫn cài đặt", "Bình luận", "Changelog"].map((tab) => (
            <button
              data-magnetic
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn("px-4 py-2 text-sm font-bold", activeTab === tab ? "btn-artisan" : "btn-quiet")}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="grid gap-10 lg:grid-cols-[1fr_20rem]">
          <article className="artisan-card prose prose-lg max-w-none p-6 leading-8 dark:prose-invert md:p-8">
            {activeTab === "Tổng quan" && (
              <>
                <h2>Giới thiệu về {resource.title}</h2>
                <p>
                  Đây là tài nguyên được đóng gói để bạn triển khai nhanh nhưng vẫn dễ mở rộng. Cấu trúc thư mục rõ, UI responsive và tài liệu đủ để đội nhỏ có thể tùy biến ngay.
                </p>
                <div className="not-prose my-6 overflow-hidden rounded-[8px] border border-white/5">
                  <img src={resource.thumbnail} alt="" className="w-full object-cover" />
                </div>
                <h3>Tech stack</h3>
                <div className="not-prose mb-8 flex flex-wrap gap-2">
                  {resource.tags.map((tag) => (
                    <span key={tag} className="rounded-[6px] border border-white/5 bg-white/[0.04] px-3 py-1 text-sm font-bold">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3>Tại sao chọn tài nguyên này?</h3>
                <ul>
                  <li>Tiết kiệm thời gian dựng nền tảng ban đầu.</li>
                  <li>Thiết kế dễ điều chỉnh theo thương hiệu riêng.</li>
                  <li>Có hướng dẫn cài đặt và cập nhật miễn phí trong 6 tháng.</li>
                </ul>
              </>
            )}

            {activeTab === "Hướng dẫn cài đặt" && (
              <>
                <h2>Yêu cầu hệ thống</h2>
                <ul>
                  <li>Node.js v18.17.0 trở lên</li>
                  <li>npm v9.0.0 hoặc pnpm</li>
                  <li>Git</li>
                </ul>
                <h3>Cài đặt dependencies</h3>
                <pre><code>npm install</code></pre>
                <h3>Chạy project</h3>
                <pre><code>npm run dev</code></pre>
              </>
            )}
          </article>

          <aside className="space-y-6">
            <div data-spotlight data-hue="28" className="artisan-card p-5">
              <h3 className="mb-4 font-extrabold">Thông tin thêm</h3>
              <div className="space-y-4 text-sm">
                {[
                  ["Bản quyền", "Cá nhân (1 project)"],
                  ["Framework", "Next.js, Tailwind CSS"],
                  ["Dung lượng", "4.2 MB"],
                  ["Đã kiểm tra", "Chrome, Safari, Edge"],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between gap-4">
                    <span className="text-muted-foreground">{label}</span>
                    <span className="text-right font-bold">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div data-spotlight data-hue="172" className="artisan-card p-5">
              <h3 className="mb-4 font-extrabold">Tài nguyên liên quan</h3>
              <div className="space-y-4">
                {resources.filter((item) => item.id !== resource.id).slice(0, 3).map((item) => (
                  <Link key={item.id} href={`/resources/${item.id}`} className="group flex gap-3">
                    <img src={item.thumbnail} alt="" className="h-14 w-20 rounded-[6px] object-cover" />
                    <div>
                      <div className="text-sm font-bold transition-colors line-clamp-1 group-hover:text-primary">{item.title}</div>
                      <div className="mt-1 text-xs font-extrabold text-primary">
                        {item.price === 0 ? "Free" : `${item.price.toLocaleString()}đ`}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
