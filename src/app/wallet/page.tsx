"use client";

import { useState } from "react";
import { walletTransactions } from "@/data/mockData";
import { Wallet as WalletIcon, ArrowUpRight, ArrowDownLeft, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export default function WalletPage() {
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("bank");
  const [toastMessage, setToastMessage] = useState("");

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    if (parseInt(amount.replace(/\D/g, "")) < 100000) {
      alert("Số tiền rút tối thiểu là 100.000đ");
      return;
    }
    setToastMessage("Yêu cầu rút tiền đã được gửi, admin sẽ xử lý trong 24–48h.");
    setAmount("");
    setTimeout(() => setToastMessage(""), 5000);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg font-medium flex items-center gap-2 animate-in slide-in-from-top-5">
          <CheckCircle2 className="w-5 h-5" />
          {toastMessage}
        </div>
      )}

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Ví của tôi</h1>
        <p className="text-muted-foreground">Quản lý thu nhập và yêu cầu rút tiền</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {/* Main Balance Card */}
        <div className="md:col-span-2 bg-gradient-to-br from-primary to-purple-600 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl shadow-primary/20">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div className="flex items-center gap-2 mb-8 opacity-90">
              <WalletIcon className="w-6 h-6" />
              <span className="font-medium text-lg">Số dư khả dụng</span>
            </div>
            <div>
              <div className="text-5xl md:text-6xl font-bold tracking-tight mb-2">1.250.000<span className="text-3xl">đ</span></div>
              <div className="flex items-center gap-6 mt-6 pt-6 border-t border-white/20">
                <div>
                  <div className="text-sm opacity-80 mb-1">Đang chờ duyệt</div>
                  <div className="font-semibold text-lg flex items-center gap-1">
                    <Clock className="w-4 h-4" /> 320.000đ
                  </div>
                </div>
                <div>
                  <div className="text-sm opacity-80 mb-1">Đã rút thành công</div>
                  <div className="font-semibold text-lg flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> 2.600.000đ
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Withdraw Form Card */}
        <div className="bg-card border border-border/50 rounded-3xl p-6 shadow-sm">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <ArrowUpRight className="w-5 h-5 text-primary" /> Rút tiền
          </h2>
          <form onSubmit={handleWithdraw} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1.5 text-muted-foreground">Số tiền muốn rút</label>
              <div className="relative">
                <input 
                  type="text" 
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Tối thiểu 100.000" 
                  className="w-full bg-secondary/50 border border-border/50 rounded-xl px-4 py-3 outline-none focus:border-primary/50 transition-colors font-medium text-lg"
                  required
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 font-medium text-muted-foreground">VNĐ</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5 text-muted-foreground">Phương thức</label>
              <div className="grid grid-cols-2 gap-2">
                <button type="button" onClick={() => setMethod("bank")} className={cn("py-2.5 rounded-xl text-sm font-medium border transition-colors", method === "bank" ? "border-primary bg-primary/10 text-primary" : "border-border/50 bg-secondary/30")}>Ngân hàng</button>
                <button type="button" onClick={() => setMethod("momo")} className={cn("py-2.5 rounded-xl text-sm font-medium border transition-colors", method === "momo" ? "border-[#A50064] bg-[#A50064]/10 text-[#A50064]" : "border-border/50 bg-secondary/30")}>Momo</button>
              </div>
            </div>

            {method === "bank" ? (
              <div className="space-y-3">
                <input type="text" placeholder="Ngân hàng (VD: Vietcombank)" className="w-full bg-secondary/50 border border-border/50 rounded-xl px-4 py-2.5 outline-none focus:border-primary/50 text-sm" required />
                <input type="text" placeholder="Số tài khoản" className="w-full bg-secondary/50 border border-border/50 rounded-xl px-4 py-2.5 outline-none focus:border-primary/50 text-sm" required />
                <input type="text" placeholder="Tên chủ tài khoản" className="w-full bg-secondary/50 border border-border/50 rounded-xl px-4 py-2.5 outline-none focus:border-primary/50 text-sm" required />
              </div>
            ) : (
              <div className="space-y-3">
                <input type="text" placeholder="Số điện thoại Momo" className="w-full bg-secondary/50 border border-border/50 rounded-xl px-4 py-2.5 outline-none focus:border-primary/50 text-sm" required />
                <input type="text" placeholder="Tên chủ ví" className="w-full bg-secondary/50 border border-border/50 rounded-xl px-4 py-2.5 outline-none focus:border-primary/50 text-sm" required />
              </div>
            )}

            <button type="submit" className="w-full py-3.5 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-colors shadow-md mt-2">
              Gửi yêu cầu rút tiền
            </button>
          </form>
        </div>
      </div>

      {/* Transaction History */}
      <div className="bg-card border border-border/50 rounded-3xl p-6 shadow-sm overflow-hidden">
        <h2 className="text-xl font-bold mb-6">Lịch sử giao dịch</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border/50 text-muted-foreground text-sm">
                <th className="pb-4 font-medium pl-4">Loại giao dịch</th>
                <th className="pb-4 font-medium">Mã GD</th>
                <th className="pb-4 font-medium">Thời gian</th>
                <th className="pb-4 font-medium">Số tiền</th>
                <th className="pb-4 font-medium pr-4">Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {walletTransactions.map((tx, idx) => (
                <tr key={tx.id} className={cn("border-b border-border/50 last:border-0 hover:bg-secondary/20 transition-colors", idx % 2 === 0 ? "bg-secondary/10" : "")}>
                  <td className="py-4 pl-4">
                    <div className="flex items-center gap-3">
                      <div className={cn("w-10 h-10 rounded-full flex items-center justify-center", tx.amount > 0 ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500")}>
                        {tx.amount > 0 ? <ArrowDownLeft className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
                      </div>
                      <span className="font-medium">{tx.type}</span>
                    </div>
                  </td>
                  <td className="py-4 text-sm text-muted-foreground">{tx.txId}</td>
                  <td className="py-4 text-sm text-muted-foreground">{tx.time}</td>
                  <td className={cn("py-4 font-bold", tx.amount > 0 ? "text-green-500" : "text-red-500")}>
                    {tx.amount > 0 ? "+" : ""}{tx.amount.toLocaleString()}đ
                  </td>
                  <td className="py-4 pr-4">
                    <span className={cn(
                      "px-3 py-1 text-xs font-semibold rounded-full",
                      tx.status === "Thành công" ? "bg-green-500/10 text-green-500" : 
                      tx.status === "Chờ duyệt" ? "bg-amber-500/10 text-amber-500" : "bg-red-500/10 text-red-500"
                    )}>
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
