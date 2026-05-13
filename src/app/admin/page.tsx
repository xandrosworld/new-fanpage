"use client";

import { useState } from "react";
import { tasks, walletTransactions } from "@/data/mockData";
import { CheckCircle2, DollarSign, FileCode, LayoutDashboard, Target, Users, Video, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("Tổng quan");
  const withdrawRequests = walletTransactions.filter((item) => item.status === "Chờ duyệt");
  const activeTasks = tasks.filter((item) => item.status === "active");

  const tabs = ["Tổng quan", "Users", "Resources", "Blog", "Reels", "Quản lý nhiệm vụ", "Duyệt minh chứng", "Duyệt rút tiền"];

  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-background">
      <aside className="hidden w-64 border-r border-white/5 bg-white/[0.025] p-4 lg:block">
        <div className="section-kicker mb-3">Admin</div>
        <div className="display-title mb-8 px-2 text-3xl">Panel</div>
        <nav className="space-y-1">
          {tabs.map((tab) => {
            const Icon =
              tab === "Tổng quan" ? LayoutDashboard :
              tab === "Users" ? Users :
              tab === "Resources" ? FileCode :
              tab === "Reels" ? Video :
              tab === "Quản lý nhiệm vụ" ? Target :
              tab === "Duyệt rút tiền" ? DollarSign :
              null;
            return (
              <button
                data-magnetic
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-[8px] px-3 py-3 text-left text-sm font-bold transition-colors",
                  activeTab === tab ? "border border-primary/20 bg-primary/10 text-primary" : "text-muted-foreground hover:bg-white/[0.04] hover:text-foreground"
                )}
              >
                {Icon ? <Icon className="h-4 w-4" /> : <span className="h-4 w-4" />}
                {tab}
              </button>
            );
          })}
        </nav>
      </aside>

      <main className="flex-1 overflow-y-auto p-6 md:p-8">
        <h1 className="display-title mb-8 text-4xl">{activeTab}</h1>

        {activeTab === "Tổng quan" && (
          <div className="space-y-8">
            <div className="bento-grid">
              {[
                { label: "User mới", value: "1,250", icon: Users, span: "md:col-span-2", hue: "172" },
                { label: "Resource mới", value: "85", icon: FileCode, span: "md:col-span-1", hue: "322" },
                { label: "Nhiệm vụ active", value: activeTasks.length.toString(), icon: Target, span: "md:col-span-1", hue: "140" },
                { label: "Yêu cầu rút tiền", value: withdrawRequests.length.toString(), icon: DollarSign, span: "md:col-span-2", hue: "38" },
              ].map((stat) => (
                <div key={stat.label} data-spotlight data-hue={stat.hue} className={`artisan-card p-5 ${stat.span}`}>
                  <stat.icon className="mb-5 h-6 w-6 text-primary" />
                  <div className="mb-1 text-3xl font-extrabold">{stat.value}</div>
                  <div className="text-sm font-bold text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>

            <div data-spotlight data-hue="172" className="artisan-card p-6">
              <h2 className="mb-4 text-lg font-extrabold">Hoạt động gần đây</h2>
              <div className="space-y-4">
                {["User @alexdev vừa hoàn thành nhiệm vụ Review Tài Nguyên", "Seller @mianguyen cập nhật UI Kit mới", "Yêu cầu rút tiền WD-008-001 đang chờ duyệt"].map((item) => (
                  <div key={item} className="flex items-center gap-4 border-b border-white/5 pb-4 last:border-0 last:pb-0">
                    <div className="flex h-10 w-10 items-center justify-center rounded-[8px] bg-white/[0.04] text-primary">
                      <Target className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-bold">{item}</div>
                      <div className="text-sm text-muted-foreground">10 phút trước</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "Duyệt rút tiền" && (
          <AdminTable
            headers={["Mã GD", "User", "Số tiền", "Phương thức", "Trạng thái", "Thao tác"]}
            empty="Không có yêu cầu nào"
          >
            {withdrawRequests.map((req) => (
              <tr key={req.id} className="border-t border-white/5 text-sm">
                <td className="p-4 text-muted-foreground">{req.txId}</td>
                <td className="p-4 font-bold">@alexdev</td>
                <td className="p-4 font-extrabold text-red-400">{Math.abs(req.amount).toLocaleString()}đ</td>
                <td className="p-4">Ngân hàng MB Bank</td>
                <td className="p-4">
                  <span className="rounded-[6px] bg-amber-400/10 px-2 py-1 text-xs font-bold text-amber-300">Chờ duyệt</span>
                </td>
                <td className="flex justify-end gap-2 p-4 text-right">
                  <button data-magnetic className="btn-quiet flex h-8 w-8 items-center justify-center text-green-400" title="Duyệt">
                    <CheckCircle2 className="h-5 w-5" />
                  </button>
                  <button data-magnetic className="btn-quiet flex h-8 w-8 items-center justify-center text-red-400" title="Từ chối">
                    <XCircle className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </AdminTable>
        )}

        {activeTab === "Quản lý nhiệm vụ" && (
          <div className="space-y-6">
            <div className="flex justify-end">
              <button data-magnetic className="btn-artisan px-4 py-3 text-sm">+ Tạo nhiệm vụ mới</button>
            </div>
            <AdminTable headers={["Tên nhiệm vụ", "Loại", "Thưởng", "Người tham gia", "Trạng thái"]}>
              {tasks.map((task) => (
                <tr key={task.id} className="border-t border-white/5 text-sm">
                  <td className="p-4 font-bold">{task.title}</td>
                  <td className="p-4"><span className="rounded-[6px] bg-white/[0.04] px-2 py-1 text-xs font-bold">{task.type}</span></td>
                  <td className="p-4 font-extrabold text-primary">+{task.reward.toLocaleString()}đ</td>
                  <td className="p-4">{task.participants}</td>
                  <td className="p-4">
                    <span className={cn("rounded-[6px] px-2 py-1 text-xs font-bold", task.status === "active" ? "bg-green-400/10 text-green-300" : "bg-white/[0.04] text-muted-foreground")}>
                      {task.status.toUpperCase()}
                    </span>
                  </td>
                </tr>
              ))}
            </AdminTable>
          </div>
        )}
      </main>
    </div>
  );
}

function AdminTable({
  headers,
  children,
  empty,
}: {
  headers: string[];
  children: React.ReactNode;
  empty?: string;
}) {
  return (
    <div data-spotlight data-hue="172" className="artisan-card overflow-hidden">
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="bg-white/[0.035] text-sm text-muted-foreground">
            {headers.map((header) => (
              <th key={header} className="p-4 font-bold last:text-right">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {children || (
            <tr>
              <td colSpan={headers.length} className="p-8 text-center text-muted-foreground">{empty}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
