"use client";

import { useState } from "react";
import { tasks } from "@/data/mockData";
import { TaskCard } from "@/components/cards/TaskCard";
import { Wallet, CheckCircle2, Clock, Trophy, X, Upload } from "lucide-react";
import { cn } from "@/lib/utils";

export default function TasksPage() {
  const [activeTab, setActiveTab] = useState("Tất cả");
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [toastMessage, setToastMessage] = useState("");

  const tabs = ["Tất cả", "Xem Reels", "Chia sẻ bài viết", "Review tài nguyên", "Mời bạn bè", "Đang làm", "Chờ duyệt"];

  const handleStartTask = () => {
    setToastMessage("Nhiệm vụ đã được chuyển vào mục Đang làm!");
    setTimeout(() => setToastMessage(""), 3000);
  };

  const handleSubmitProof = () => {
    setToastMessage("Đã gửi minh chứng, vui lòng chờ admin duyệt.");
    setTimeout(() => {
      setToastMessage("");
      setSelectedTask(null);
    }, 3000);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl relative">
      {toastMessage && (
        <div className="fixed bottom-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg font-medium flex items-center gap-2 animate-in slide-in-from-bottom-5">
          <CheckCircle2 className="w-5 h-5" />
          {toastMessage}
        </div>
      )}

      {/* Header Stats */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">
          Nhiệm vụ kiếm tiền
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Hoàn thành nhiệm vụ cộng đồng, xem reels, chia sẻ tài nguyên và nhận thưởng vào ví.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-2xl p-5 relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-all"></div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center text-primary">
              <Wallet className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm font-medium text-muted-foreground">Số dư khả dụng</div>
              <div className="text-2xl font-bold text-foreground">1.250.000đ</div>
            </div>
          </div>
        </div>
        
        <div className="bg-card border border-border/50 rounded-2xl p-5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center text-green-500">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm font-medium text-muted-foreground">Đã hoàn thành</div>
              <div className="text-2xl font-bold text-foreground">28</div>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border/50 rounded-2xl p-5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-500">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm font-medium text-muted-foreground">Đang chờ duyệt</div>
              <div className="text-2xl font-bold text-foreground">4</div>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border/50 rounded-2xl p-5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-500">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm font-medium text-muted-foreground">Tổng thưởng đã nhận</div>
              <div className="text-2xl font-bold text-foreground">3.850.000đ</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto hide-scrollbar gap-2 mb-8 pb-2">
        {tabs.map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all",
              activeTab === tab 
                ? "bg-primary text-primary-foreground shadow-md" 
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Task Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {tasks.map(task => (
          <div key={task.id} onClick={() => setSelectedTask(task)} className="cursor-pointer">
            <TaskCard task={task} />
          </div>
        ))}
      </div>

      {/* Task Detail Modal */}
      {selectedTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setSelectedTask(null)}></div>
          <div className="bg-card border border-border/50 rounded-2xl shadow-2xl w-full max-w-2xl relative z-10 overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-border/50 flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                    {selectedTask.type}
                  </span>
                  <span className="text-primary font-bold">+{selectedTask.reward.toLocaleString()}đ</span>
                </div>
                <h2 className="text-2xl font-bold">{selectedTask.title}</h2>
              </div>
              <button onClick={() => setSelectedTask(null)} className="p-2 text-muted-foreground hover:bg-secondary rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1">
              <h3 className="font-semibold mb-3">Mô tả nhiệm vụ:</h3>
              <p className="text-muted-foreground text-sm mb-6 bg-secondary/30 p-4 rounded-xl">
                {selectedTask.description}
              </p>

              <h3 className="font-semibold mb-3">Hướng dẫn từng bước:</h3>
              <ol className="list-decimal list-inside space-y-3 text-sm text-muted-foreground mb-8">
                <li>Xem video/bài viết theo yêu cầu tối thiểu thời gian quy định.</li>
                <li>Tương tác: Thả tim, chia sẻ hoặc bình luận có ý nghĩa.</li>
                <li>Chụp màn hình lại làm minh chứng.</li>
                <li>Gửi minh chứng và chờ hệ thống hoặc admin duyệt (tối đa 24h).</li>
              </ol>

              <div className="border border-border/50 rounded-xl p-5 bg-secondary/10 border-dashed text-center cursor-pointer hover:bg-secondary/20 transition-colors">
                <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                <p className="font-medium">Tải lên minh chứng</p>
                <p className="text-xs text-muted-foreground mt-1">Hỗ trợ JPG, PNG (Max 5MB)</p>
              </div>
            </div>

            <div className="p-6 border-t border-border/50 bg-secondary/30 flex justify-end gap-3">
              <button 
                onClick={() => setSelectedTask(null)} 
                className="px-6 py-2.5 font-medium rounded-xl hover:bg-secondary transition-colors"
              >
                Đóng
              </button>
              <button 
                onClick={handleStartTask} 
                className="px-6 py-2.5 bg-primary text-white font-medium rounded-xl hover:bg-primary/90 transition-colors shadow-md"
              >
                Bắt đầu làm
              </button>
              <button 
                onClick={handleSubmitProof} 
                className="px-6 py-2.5 bg-green-500 text-white font-medium rounded-xl hover:bg-green-600 transition-colors shadow-md"
              >
                Gửi minh chứng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
