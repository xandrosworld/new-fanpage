"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Code2, Video, Target, Users, MessageSquare, 
  LayoutDashboard, Sparkles, X, Home, Settings, HelpCircle, Shield
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useSidebarStore } from "@/store/useSidebarStore";

const sidebarLinks = [
  { name: "Trang chủ", href: "/", icon: Home },
  { name: "Tài nguyên", href: "/resources", icon: Code2 },
  { name: "Blog", href: "/blog", icon: LayoutDashboard },
  { name: "Cộng đồng", href: "/community", icon: Users },
  { name: "Reels", href: "/reels", icon: Video },
  { name: "Nhiệm vụ", href: "/tasks", icon: Target },
  { name: "Chat", href: "/chat", icon: MessageSquare },
  { name: "Creator", href: "/creator", icon: Sparkles },
];

const bottomLinks = [
  { name: "Cài đặt", href: "#", icon: Settings },
  { name: "Trợ giúp", href: "#", icon: HelpCircle },
  { name: "Quyền riêng tư", href: "#", icon: Shield },
];

export function Sidebar() {
  const { isOpen, setIsOpen } = useSidebarStore();
  const pathname = usePathname();

  // Đóng sidebar khi chuyển trang
  useEffect(() => {
    setIsOpen(false);
  }, [pathname, setIsOpen]);

  // Khóa cuộn trang khi mở sidebar
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay nền tối mờ */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-[60] bg-background/80 backdrop-blur-sm"
          />

          {/* Nội dung Sidebar trượt từ trái */}
          <motion.div
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 250 }}
            className="fixed top-0 left-0 bottom-0 z-[70] w-72 bg-card border-r border-border flex flex-col shadow-2xl"
          >
            {/* Header Sidebar */}
            <div className="h-14 flex items-center px-4 border-b border-border/50 justify-between flex-shrink-0">
              <Link href="/" className="flex items-center gap-2 group" onClick={() => setIsOpen(false)}>
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white shadow-md">
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m22 8-6 4 6 4V8Z"/><rect width="14" height="12" x="2" y="6" rx="2" ry="2"/></svg>
                </div>
                <span className="font-bold text-base tracking-tight">
                  Resource<span className="text-primary">Hub</span>
                </span>
              </Link>
              <button 
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-secondary text-muted-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Danh sách Link chính */}
            <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1 scrollbar-thin">
              {sidebarLinks.map((link) => {
                const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href + "/"));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group",
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
                    )}
                  >
                    <link.icon className={cn(
                      "w-5 h-5 transition-colors",
                      isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                    )} />
                    {link.name}
                  </Link>
                );
              })}
              
              <div className="my-4 border-t border-border/50" />
              
              <div className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Khác
              </div>
              {bottomLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-secondary/80 hover:text-foreground transition-all duration-200 group"
                >
                  <link.icon className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Thông tin User ở cuối Sidebar */}
            <div className="p-4 border-t border-border/50 flex-shrink-0 bg-background/50">
              <Link href="/profile/alexdev" className="flex items-center gap-3 p-2 rounded-xl hover:bg-secondary transition-colors" onClick={() => setIsOpen(false)}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://i.pravatar.cc/150?u=a042581f4e29026024d" alt="Avatar" className="w-10 h-10 rounded-full object-cover ring-2 ring-primary/20" />
                <div className="flex-1 overflow-hidden">
                  <p className="text-sm font-semibold truncate">Alex Dev</p>
                  <p className="text-xs text-muted-foreground truncate">@alexdev</p>
                </div>
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
