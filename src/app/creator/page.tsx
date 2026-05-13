"use client";

import { useState } from "react";
import { BarChart3, DollarSign, Download, FileCode, Star, Upload, Video, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export default function CreatorStudio() {
  const [activeTab, setActiveTab] = useState("Analytics");

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10">
      <header className="mb-8">
        <div className="section-kicker mb-4">Creator atelier</div>
        <h1 className="display-title text-5xl md:text-7xl">Creator Studio</h1>
        <p className="mt-4 text-muted-foreground">Quản lý tài nguyên, video và thu nhập trong một không gian làm việc gọn.</p>
      </header>

      <div className="hide-scrollbar mb-8 flex gap-2 overflow-x-auto pb-2">
        {["Analytics", "Tài nguyên", "Reels", "Tải lên"].map((tab) => (
          <button
            data-magnetic
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn("px-5 py-2.5 text-sm font-bold", activeTab === tab ? "btn-artisan" : "btn-quiet")}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "Analytics" && (
        <div className="space-y-6">
          <div className="bento-grid">
            {[
              { label: "Tổng thu nhập", value: "12,450,000đ", icon: DollarSign, note: "+15% so với tháng trước", span: "md:col-span-2", hue: "140" },
              { label: "Lượt tải tài nguyên", value: "3,420", icon: Download, note: "+5% so với tháng trước", span: "md:col-span-1", hue: "172" },
              { label: "Lượt xem Reels", value: "125.4K", icon: Video, note: "+25% so với tháng trước", span: "md:col-span-1", hue: "322" },
              { label: "Rating trung bình", value: "4.9/5.0", icon: Star, note: "Dựa trên 120 đánh giá", span: "md:col-span-2", hue: "38" },
            ].map((stat) => (
              <div key={stat.label} data-spotlight data-hue={stat.hue} className={`artisan-card reveal-up p-5 ${stat.span}`}>
                <div className="mb-5 flex items-center justify-between text-muted-foreground">
                  <span className="font-bold">{stat.label}</span>
                  <stat.icon className="h-5 w-5 text-primary" />
                </div>
                <div className="text-2xl font-extrabold">{stat.value}</div>
                <div className="mt-2 text-xs font-bold text-primary">{stat.note}</div>
              </div>
            ))}
          </div>

          <div data-spotlight data-hue="172" className="artisan-card flex h-80 flex-col items-center justify-center p-6 text-muted-foreground">
            <BarChart3 className="mb-4 h-16 w-16 opacity-25" />
            <p className="font-bold">Biểu đồ doanh thu đang được cập nhật...</p>
          </div>
        </div>
      )}

      {activeTab === "Tải lên" && (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <UploadPanel
            icon={FileCode}
            hue="172"
            title="Đăng tài nguyên mới"
            fields={["Tên tài nguyên", "Danh mục", "Giá (VNĐ)", "Mô tả"]}
            dropText="Kéo thả file source code (ZIP) vào đây"
            buttonText="Đăng tài nguyên"
          />
          <UploadPanel
            icon={Video}
            hue="322"
            title="Đăng Reels mới"
            fields={["Tiêu đề video", "Caption & Hashtags"]}
            dropText="Kéo thả video MP4 vào đây"
            buttonText="Đăng Reels"
          />
        </div>
      )}
    </div>
  );
}

function UploadPanel({
  icon: Icon,
  hue,
  title,
  fields,
  dropText,
  buttonText,
}: {
  icon: LucideIcon;
  hue: string;
  title: string;
  fields: string[];
  dropText: string;
  buttonText: string;
}) {
  return (
    <div data-spotlight data-hue={hue} className="artisan-card p-6">
      <h2 className="mb-6 flex items-center gap-2 text-xl font-extrabold">
        <Icon className="h-5 w-5 text-primary" />
        {title}
      </h2>
      <form className="space-y-4" onSubmit={(event) => event.preventDefault()}>
        {fields.map((field, index) => (
          <label key={field} className="block">
            <span className="mb-1.5 block text-sm font-bold text-muted-foreground">{field}</span>
            {field === "Mô tả" || field.includes("Caption") ? (
              <textarea rows={index === 0 ? 3 : 4} className="w-full resize-none rounded-[8px] border border-white/5 bg-white/[0.04] px-4 py-3 text-sm outline-none focus:border-primary/40" />
            ) : (
              <input className="w-full rounded-[8px] border border-white/5 bg-white/[0.04] px-4 py-3 text-sm outline-none focus:border-primary/40" />
            )}
          </label>
        ))}
        <div className="flex aspect-video cursor-pointer flex-col items-center justify-center rounded-[8px] border border-dashed border-white/12 bg-white/[0.03] p-6 text-center transition-colors hover:bg-white/[0.05]">
          <Upload className="mb-2 h-8 w-8 text-muted-foreground" />
          <p className="text-sm font-bold">{dropText}</p>
          <p className="mt-1 text-xs text-muted-foreground">Tối đa 100MB</p>
        </div>
        <button data-magnetic className="btn-artisan w-full py-3">
          {buttonText}
        </button>
      </form>
    </div>
  );
}
