"use client";

import { useState } from "react";
import { Upload, FileCode, Video, BarChart3, DollarSign, Download, Star } from "lucide-react";
import { cn } from "@/lib/utils";

export default function CreatorStudio() {
  const [activeTab, setActiveTab] = useState("Analytics");

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">
          Creator Studio
        </h1>
        <p className="text-muted-foreground">Quản lý tài nguyên, video và theo dõi thu nhập của bạn.</p>
      </div>

      <div className="flex gap-4 mb-8 overflow-x-auto hide-scrollbar pb-2">
        {["Analytics", "Tài nguyên", "Reels", "Tải lên"].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "px-5 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all",
              activeTab === tab 
                ? "bg-primary text-primary-foreground shadow-md" 
                : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "Analytics" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-card border border-border/50 rounded-2xl p-5 shadow-sm">
              <div className="flex justify-between items-center mb-4 text-muted-foreground">
                <span className="font-medium">Tổng thu nhập</span>
                <DollarSign className="w-5 h-5 text-green-500" />
              </div>
              <div className="text-2xl font-bold">12,450,000đ</div>
              <div className="text-xs text-green-500 font-medium mt-2">+15% so với tháng trước</div>
            </div>
            
            <div className="bg-card border border-border/50 rounded-2xl p-5 shadow-sm">
              <div className="flex justify-between items-center mb-4 text-muted-foreground">
                <span className="font-medium">Lượt tải tài nguyên</span>
                <Download className="w-5 h-5 text-blue-500" />
              </div>
              <div className="text-2xl font-bold">3,420</div>
              <div className="text-xs text-green-500 font-medium mt-2">+5% so với tháng trước</div>
            </div>

            <div className="bg-card border border-border/50 rounded-2xl p-5 shadow-sm">
              <div className="flex justify-between items-center mb-4 text-muted-foreground">
                <span className="font-medium">Lượt xem Reels</span>
                <Video className="w-5 h-5 text-purple-500" />
              </div>
              <div className="text-2xl font-bold">125.4K</div>
              <div className="text-xs text-green-500 font-medium mt-2">+25% so với tháng trước</div>
            </div>

            <div className="bg-card border border-border/50 rounded-2xl p-5 shadow-sm">
              <div className="flex justify-between items-center mb-4 text-muted-foreground">
                <span className="font-medium">Rating trung bình</span>
                <Star className="w-5 h-5 text-yellow-500" />
              </div>
              <div className="text-2xl font-bold">4.9/5.0</div>
              <div className="text-xs text-muted-foreground mt-2">Dựa trên 120 đánh giá</div>
            </div>
          </div>

          <div className="bg-card border border-border/50 rounded-2xl p-6 h-80 flex flex-col justify-center items-center text-muted-foreground shadow-sm">
            <BarChart3 className="w-16 h-16 mb-4 opacity-20" />
            <p>Biểu đồ doanh thu đang được cập nhật...</p>
          </div>
        </div>
      )}

      {activeTab === "Tải lên" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Upload Resource Form */}
          <div className="bg-card border border-border/50 rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <FileCode className="w-5 h-5 text-primary" /> Đăng tài nguyên mới
            </h2>
            <form className="space-y-4" onSubmit={e => e.preventDefault()}>
              <div>
                <label className="block text-sm font-medium mb-1.5">Tên tài nguyên</label>
                <input type="text" className="w-full bg-secondary/50 border border-border/50 rounded-xl px-4 py-2.5 outline-none focus:border-primary/50 text-sm" placeholder="VD: Next.js Blog Template" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5">Danh mục</label>
                  <select className="w-full bg-secondary/50 border border-border/50 rounded-xl px-4 py-2.5 outline-none focus:border-primary/50 text-sm appearance-none">
                    <option>Source Code</option>
                    <option>Template Website</option>
                    <option>Tool MXH</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Giá (VNĐ)</label>
                  <input type="text" className="w-full bg-secondary/50 border border-border/50 rounded-xl px-4 py-2.5 outline-none focus:border-primary/50 text-sm" placeholder="Để trống nếu miễn phí" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Mô tả</label>
                <textarea rows={4} className="w-full bg-secondary/50 border border-border/50 rounded-xl px-4 py-2.5 outline-none focus:border-primary/50 text-sm resize-none" placeholder="Mô tả chi tiết tính năng..."></textarea>
              </div>
              <div className="border-2 border-dashed border-border/50 rounded-xl p-6 text-center hover:bg-secondary/20 transition-colors cursor-pointer">
                <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                <p className="font-medium text-sm">Kéo thả file source code (ZIP) vào đây</p>
                <p className="text-xs text-muted-foreground mt-1">Max 50MB</p>
              </div>
              <button className="w-full py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-colors">
                Đăng tài nguyên
              </button>
            </form>
          </div>

          {/* Upload Reels Form */}
          <div className="bg-card border border-border/50 rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Video className="w-5 h-5 text-purple-500" /> Đăng Reels mới
            </h2>
            <form className="space-y-4" onSubmit={e => e.preventDefault()}>
              <div>
                <label className="block text-sm font-medium mb-1.5">Tiêu đề video</label>
                <input type="text" className="w-full bg-secondary/50 border border-border/50 rounded-xl px-4 py-2.5 outline-none focus:border-primary/50 text-sm" placeholder="VD: Hướng dẫn cài đặt clone TikTok" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Caption & Hashtags</label>
                <textarea rows={3} className="w-full bg-secondary/50 border border-border/50 rounded-xl px-4 py-2.5 outline-none focus:border-primary/50 text-sm resize-none" placeholder="Hãy viết caption thu hút... #coding #tutorial"></textarea>
              </div>
              <div className="border-2 border-dashed border-border/50 rounded-xl p-6 text-center hover:bg-secondary/20 transition-colors cursor-pointer aspect-video flex flex-col justify-center items-center">
                <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                <p className="font-medium text-sm">Kéo thả video MP4 vào đây</p>
                <p className="text-xs text-muted-foreground mt-1">Tỷ lệ 9:16, Max 100MB</p>
              </div>
              <button className="w-full py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition-colors">
                Đăng Reels
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
