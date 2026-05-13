"use client";

import { useState } from "react";
import { tasks } from "@/data/mockData";
import { TaskCard } from "@/components/cards/TaskCard";
import { CheckCircle2, Clock, Trophy, Upload, Wallet, X } from "lucide-react";
import { cn } from "@/lib/utils";

type TaskItem = (typeof tasks)[number];

export default function TasksPage() {
  const [activeTab, setActiveTab] = useState("Tất cả");
  const [selectedTask, setSelectedTask] = useState<TaskItem | null>(null);
  const [toastMessage, setToastMessage] = useState("");

  const tabs = ["Tất cả", "Xem Reels", "Chia sẻ bài viết", "Review tài nguyên", "Mời bạn bè", "Đang làm", "Chờ duyệt"];

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(""), 3000);
  };

  const handleSubmitProof = () => {
    showToast("Đã gửi minh chứng, vui lòng chờ admin duyệt.");
    setTimeout(() => setSelectedTask(null), 300);
  };

  return (
    <div className="relative mx-auto w-full max-w-7xl px-4 py-10">
      {toastMessage && (
        <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-[8px] border border-green-400/20 bg-green-500 px-5 py-3 font-bold text-white shadow-2xl">
          <CheckCircle2 className="h-5 w-5" />
          {toastMessage}
        </div>
      )}

      <header className="mb-10 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
        <div>
          <div className="section-kicker mb-4">Reward atelier</div>
          <h1 className="display-title text-5xl md:text-7xl">Nhiệm vụ kiếm tiền</h1>
        </div>
        <p className="max-w-2xl text-lg leading-8 text-muted-foreground lg:justify-self-end">
          Hoàn thành nhiệm vụ cộng đồng, xem reels, chia sẻ tài nguyên và nhận thưởng vào ví với luồng duyệt rõ ràng.
        </p>
      </header>

      <div className="mb-10 grid grid-cols-1 gap-4 md:grid-cols-6">
        {[
          { label: "Số dư khả dụng", value: "1.250.000đ", icon: Wallet, span: "md:col-span-2", hue: "172" },
          { label: "Đã hoàn thành", value: "28", icon: CheckCircle2, span: "md:col-span-1", hue: "140" },
          { label: "Chờ duyệt", value: "4", icon: Clock, span: "md:col-span-1", hue: "38" },
          { label: "Tổng thưởng", value: "3.850.000đ", icon: Trophy, span: "md:col-span-2", hue: "322" },
        ].map((stat) => (
          <div key={stat.label} data-spotlight data-hue={stat.hue} className={`artisan-card reveal-up p-5 ${stat.span}`}>
            <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-[8px] border border-white/10 bg-white/[0.04] text-primary">
              <stat.icon className="h-5 w-5" />
            </div>
            <div className="text-sm font-bold text-muted-foreground">{stat.label}</div>
            <div className="mt-1 text-2xl font-extrabold">{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="hide-scrollbar mb-8 flex gap-2 overflow-x-auto pb-2">
        {tabs.map((tab) => (
          <button
            data-magnetic
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "px-4 py-2 text-sm font-bold",
              activeTab === tab ? "btn-artisan" : "btn-quiet"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="bento-grid stagger-children">
        {tasks.map((task, index) => (
          <div
            key={task.id}
            role="button"
            tabIndex={0}
            onClick={() => setSelectedTask(task)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") setSelectedTask(task);
            }}
            className={cn("text-left", index === 0 || index === 4 ? "md:col-span-3" : "md:col-span-2")}
          >
            <TaskCard task={task} index={index} />
          </div>
        ))}
      </div>

      {selectedTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <button
            aria-label="Đóng chi tiết nhiệm vụ"
            className="absolute inset-0 bg-background/78 backdrop-blur-xl"
            onClick={() => setSelectedTask(null)}
          />
          <div data-spotlight data-hue="38" className="artisan-card relative z-10 flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden">
            <div className="flex items-start justify-between border-b border-white/5 p-6">
              <div>
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <span className="rounded-[6px] border border-primary/15 bg-primary/10 px-2.5 py-1 text-xs font-bold text-primary">
                    {selectedTask.type}
                  </span>
                  <span className="font-extrabold text-primary">+{selectedTask.reward.toLocaleString()}đ</span>
                </div>
                <h2 className="text-2xl font-extrabold">{selectedTask.title}</h2>
              </div>
              <button data-magnetic onClick={() => setSelectedTask(null)} className="btn-quiet flex h-9 w-9 items-center justify-center">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <h3 className="mb-3 font-bold">Mô tả nhiệm vụ</h3>
              <p className="mb-6 rounded-[8px] border border-white/5 bg-white/[0.03] p-4 text-sm leading-6 text-muted-foreground">
                {selectedTask.description}
              </p>

              <h3 className="mb-3 font-bold">Hướng dẫn từng bước</h3>
              <ol className="mb-8 list-decimal space-y-3 pl-5 text-sm leading-6 text-muted-foreground">
                <li>Xem hoặc tương tác đúng yêu cầu tối thiểu.</li>
                <li>Chụp màn hình hoặc chuẩn bị link làm minh chứng.</li>
                <li>Gửi minh chứng và chờ admin duyệt trong tối đa 24 giờ.</li>
              </ol>

              <div className="rounded-[8px] border border-dashed border-white/12 bg-white/[0.03] p-6 text-center transition-colors hover:bg-white/[0.05]">
                <Upload className="mx-auto mb-2 h-8 w-8 text-muted-foreground" />
                <p className="font-bold">Tải lên minh chứng</p>
                <p className="mt-1 text-xs text-muted-foreground">Hỗ trợ JPG, PNG, tối đa 5MB</p>
              </div>
            </div>

            <div className="flex flex-col justify-end gap-3 border-t border-white/5 p-6 sm:flex-row">
              <button data-magnetic onClick={() => setSelectedTask(null)} className="btn-quiet px-5 py-3 font-bold">
                Đóng
              </button>
              <button data-magnetic onClick={() => showToast("Nhiệm vụ đã được chuyển vào mục Đang làm.")} className="btn-artisan px-5 py-3">
                Bắt đầu làm
              </button>
              <button data-magnetic onClick={handleSubmitProof} className="btn-quiet px-5 py-3 font-bold text-primary">
                Gửi minh chứng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
