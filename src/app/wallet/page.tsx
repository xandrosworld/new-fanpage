"use client";

import { useState } from "react";
import { walletTransactions } from "@/data/mockData";
import { ArrowDownLeft, ArrowUpRight, CheckCircle2, Clock, Wallet as WalletIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export default function WalletPage() {
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("bank");
  const [toastMessage, setToastMessage] = useState("");

  const handleWithdraw = (event: React.FormEvent) => {
    event.preventDefault();
    if (parseInt(amount.replace(/\D/g, "")) < 100000) {
      alert("Số tiền rút tối thiểu là 100.000đ");
      return;
    }
    setToastMessage("Yêu cầu rút tiền đã được gửi, admin sẽ xử lý trong 24-48h.");
    setAmount("");
    setTimeout(() => setToastMessage(""), 5000);
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10">
      {toastMessage && (
        <div className="fixed right-4 top-20 z-50 flex items-center gap-2 rounded-[8px] bg-green-500 px-5 py-3 font-bold text-white shadow-2xl">
          <CheckCircle2 className="h-5 w-5" />
          {toastMessage}
        </div>
      )}

      <header className="mb-8">
        <div className="section-kicker mb-4">Wallet room</div>
        <h1 className="display-title text-5xl md:text-7xl">Ví của tôi</h1>
        <p className="mt-4 text-muted-foreground">Quản lý thu nhập và yêu cầu rút tiền trong một bảng điều khiển gọn.</p>
      </header>

      <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-3">
        <div data-spotlight data-hue="172" className="artisan-card md:col-span-2 p-8 text-white">
          <div className="mb-10 flex items-center gap-2 text-white/80">
            <WalletIcon className="h-6 w-6" />
            <span className="font-bold">Số dư khả dụng</span>
          </div>
          <div className="text-5xl font-extrabold md:text-7xl">
            1.250.000<span className="text-3xl">đ</span>
          </div>
          <div className="mt-8 grid gap-4 border-t border-white/10 pt-6 sm:grid-cols-2">
            <div>
              <div className="mb-1 text-sm text-white/60">Đang chờ duyệt</div>
              <div className="flex items-center gap-1 text-lg font-extrabold">
                <Clock className="h-4 w-4" /> 320.000đ
              </div>
            </div>
            <div>
              <div className="mb-1 text-sm text-white/60">Đã rút thành công</div>
              <div className="flex items-center gap-1 text-lg font-extrabold">
                <CheckCircle2 className="h-4 w-4" /> 2.600.000đ
              </div>
            </div>
          </div>
        </div>

        <div data-spotlight data-hue="28" className="artisan-card p-6">
          <h2 className="mb-6 flex items-center gap-2 text-xl font-extrabold">
            <ArrowUpRight className="h-5 w-5 text-primary" />
            Rút tiền
          </h2>
          <form onSubmit={handleWithdraw} className="space-y-4">
            <label className="block">
              <span className="mb-1.5 block text-sm font-bold text-muted-foreground">Số tiền muốn rút</span>
              <div className="relative">
                <input
                  type="text"
                  value={amount}
                  onChange={(event) => setAmount(event.target.value)}
                  placeholder="Tối thiểu 100.000"
                  className="w-full rounded-[8px] border border-white/5 bg-white/[0.04] px-4 py-3 text-lg font-bold outline-none focus:border-primary/40"
                  required
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-muted-foreground">VNĐ</span>
              </div>
            </label>

            <div>
              <span className="mb-1.5 block text-sm font-bold text-muted-foreground">Phương thức</span>
              <div className="grid grid-cols-2 gap-2">
                {[
                  ["bank", "Ngân hàng"],
                  ["momo", "Momo"],
                ].map(([value, label]) => (
                  <button
                    data-magnetic
                    type="button"
                    key={value}
                    onClick={() => setMethod(value)}
                    className={cn("px-3 py-3 text-sm font-bold", method === value ? "btn-artisan" : "btn-quiet")}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              {method === "bank" ? (
                <>
                  <input type="text" placeholder="Ngân hàng" className="w-full rounded-[8px] border border-white/5 bg-white/[0.04] px-4 py-3 text-sm outline-none" required />
                  <input type="text" placeholder="Số tài khoản" className="w-full rounded-[8px] border border-white/5 bg-white/[0.04] px-4 py-3 text-sm outline-none" required />
                  <input type="text" placeholder="Tên chủ tài khoản" className="w-full rounded-[8px] border border-white/5 bg-white/[0.04] px-4 py-3 text-sm outline-none" required />
                </>
              ) : (
                <>
                  <input type="text" placeholder="Số điện thoại Momo" className="w-full rounded-[8px] border border-white/5 bg-white/[0.04] px-4 py-3 text-sm outline-none" required />
                  <input type="text" placeholder="Tên chủ ví" className="w-full rounded-[8px] border border-white/5 bg-white/[0.04] px-4 py-3 text-sm outline-none" required />
                </>
              )}
            </div>

            <button data-magnetic type="submit" className="btn-artisan w-full py-3.5">
              Gửi yêu cầu rút tiền
            </button>
          </form>
        </div>
      </div>

      <div data-spotlight data-hue="322" className="artisan-card overflow-hidden p-6">
        <h2 className="mb-6 text-xl font-extrabold">Lịch sử giao dịch</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-white/5 text-sm text-muted-foreground">
                <th className="pb-4 pl-4 font-bold">Loại giao dịch</th>
                <th className="pb-4 font-bold">Mã GD</th>
                <th className="pb-4 font-bold">Thời gian</th>
                <th className="pb-4 font-bold">Số tiền</th>
                <th className="pb-4 pr-4 font-bold">Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {walletTransactions.map((tx, index) => (
                <tr key={tx.id} className={cn("border-b border-white/5 text-sm last:border-0", index % 2 === 0 && "bg-white/[0.025]")}>
                  <td className="py-4 pl-4">
                    <div className="flex items-center gap-3">
                      <div className={cn("flex h-10 w-10 items-center justify-center rounded-[8px]", tx.amount > 0 ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400")}>
                        {tx.amount > 0 ? <ArrowDownLeft className="h-5 w-5" /> : <ArrowUpRight className="h-5 w-5" />}
                      </div>
                      <span className="font-bold">{tx.type}</span>
                    </div>
                  </td>
                  <td className="py-4 text-muted-foreground">{tx.txId}</td>
                  <td className="py-4 text-muted-foreground">{tx.time}</td>
                  <td className={cn("py-4 font-extrabold", tx.amount > 0 ? "text-green-400" : "text-red-400")}>
                    {tx.amount > 0 ? "+" : ""}{tx.amount.toLocaleString()}đ
                  </td>
                  <td className="py-4 pr-4">
                    <span className="rounded-[6px] border border-white/5 bg-white/[0.04] px-3 py-1 text-xs font-bold">
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
