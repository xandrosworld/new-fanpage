"use client";

import { useState } from "react";
import { tasks, users, walletTransactions } from "@/data/mockData";
import { Users, FileCode, Video, Target, DollarSign, LayoutDashboard, CheckCircle2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("Tổng quan");
  const withdrawRequests = walletTransactions.filter(t => t.status === "Chờ duyệt");
  const activeTasks = tasks.filter(t => t.status === "active");

  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-background">
      {/* Sidebar */}
      <div className="w-64 border-r border-border/50 p-4 bg-card/30 hidden lg:block">
        <div className="font-bold text-xl mb-8 px-2 text-primary">Admin Panel</div>
        <nav className="space-y-1">
          {["Tổng quan", "Users", "Resources", "Blog", "Reels", "Quản lý nhiệm vụ", "Duyệt minh chứng", "Duyệt rút tiền"].map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                activeTab === tab ? "bg-primary text-white" : "text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
              )}
            >
              {tab === "Tổng quan" && <LayoutDashboard className="w-4 h-4" />}
              {tab === "Users" && <Users className="w-4 h-4" />}
              {tab === "Resources" && <FileCode className="w-4 h-4" />}
              {tab === "Reels" && <Video className="w-4 h-4" />}
              {tab === "Quản lý nhiệm vụ" && <Target className="w-4 h-4" />}
              {tab === "Duyệt rút tiền" && <DollarSign className="w-4 h-4" />}
              {["Blog", "Duyệt minh chứng"].includes(tab) && <div className="w-4 h-4" />}
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-8">{activeTab}</h1>

        {activeTab === "Tổng quan" && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: "User mới", value: "1,250", icon: Users, color: "text-blue-500" },
                { label: "Resource mới", value: "85", icon: FileCode, color: "text-purple-500" },
                { label: "Nhiệm vụ active", value: activeTasks.length.toString(), icon: Target, color: "text-green-500" },
                { label: "Yêu cầu rút tiền", value: withdrawRequests.length.toString(), icon: DollarSign, color: "text-amber-500" },
              ].map(stat => (
                <div key={stat.label} className="bg-card border border-border/50 rounded-2xl p-5 shadow-sm">
                  <div className="flex justify-between items-start mb-4">
                    <stat.icon className={cn("w-6 h-6", stat.color)} />
                  </div>
                  <div className="text-3xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="bg-card border border-border/50 rounded-2xl p-6">
              <h2 className="text-lg font-bold mb-4">Hoạt động gần đây</h2>
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex items-center gap-4 pb-4 border-b border-border/50 last:border-0 last:pb-0">
                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                      <Target className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">User @alexdev vừa hoàn thành nhiệm vụ Review Tài Nguyên</div>
                      <div className="text-sm text-muted-foreground">10 phút trước</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "Duyệt rút tiền" && (
          <div className="bg-card border border-border/50 rounded-2xl overflow-hidden shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-secondary/30 text-sm">
                  <th className="p-4 font-medium">Mã GD</th>
                  <th className="p-4 font-medium">User</th>
                  <th className="p-4 font-medium">Số tiền</th>
                  <th className="p-4 font-medium">Phương thức</th>
                  <th className="p-4 font-medium">Trạng thái</th>
                  <th className="p-4 font-medium text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {withdrawRequests.map((req, idx) => (
                  <tr key={req.id} className="border-t border-border/50 text-sm">
                    <td className="p-4 text-muted-foreground">{req.txId}</td>
                    <td className="p-4 font-medium">@alexdev</td>
                    <td className="p-4 font-bold text-red-500">{Math.abs(req.amount).toLocaleString()}đ</td>
                    <td className="p-4">Ngân hàng MB Bank</td>
                    <td className="p-4">
                      <span className="px-2 py-1 bg-amber-500/10 text-amber-500 rounded text-xs font-semibold">Chờ duyệt</span>
                    </td>
                    <td className="p-4 text-right flex justify-end gap-2">
                      <button className="p-1.5 text-green-500 hover:bg-green-500/10 rounded tooltip" title="Duyệt">
                        <CheckCircle2 className="w-5 h-5" />
                      </button>
                      <button className="p-1.5 text-red-500 hover:bg-red-500/10 rounded tooltip" title="Từ chối">
                        <XCircle className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
                {withdrawRequests.length === 0 && (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-muted-foreground">Không có yêu cầu nào</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "Quản lý nhiệm vụ" && (
          <div className="space-y-6">
            <div className="flex justify-end">
              <button className="px-4 py-2 bg-primary text-white rounded-lg font-medium text-sm">
                + Tạo nhiệm vụ mới
              </button>
            </div>
            <div className="bg-card border border-border/50 rounded-2xl overflow-hidden shadow-sm">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-secondary/30 text-sm">
                    <th className="p-4 font-medium">Tên nhiệm vụ</th>
                    <th className="p-4 font-medium">Loại</th>
                    <th className="p-4 font-medium">Thưởng</th>
                    <th className="p-4 font-medium">Người tham gia</th>
                    <th className="p-4 font-medium">Trạng thái</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map((task) => (
                    <tr key={task.id} className="border-t border-border/50 text-sm">
                      <td className="p-4 font-medium">{task.title}</td>
                      <td className="p-4"><span className="px-2 py-1 bg-secondary rounded text-xs">{task.type}</span></td>
                      <td className="p-4 text-green-500 font-semibold">+{task.reward.toLocaleString()}đ</td>
                      <td className="p-4">{task.participants}</td>
                      <td className="p-4">
                        <span className={cn(
                          "px-2 py-1 rounded text-xs font-semibold",
                          task.status === "active" ? "bg-green-500/10 text-green-500" : "bg-muted text-muted-foreground"
                        )}>
                          {task.status.toUpperCase()}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
