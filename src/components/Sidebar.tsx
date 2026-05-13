"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  Code2,
  HelpCircle,
  Home,
  LayoutDashboard,
  MessageSquare,
  Settings,
  Shield,
  Sparkles,
  Target,
  Users,
  Video,
  X,
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

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-[60] bg-background/72 backdrop-blur-xl"
          />

          <motion.aside
            id="main-sidebar"
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{ type: "spring", damping: 28, stiffness: 250 }}
            className="artisan-card fixed bottom-3 left-3 top-3 z-[70] flex w-[min(22rem,calc(100vw-1.5rem))] flex-col p-0"
          >
            <div className="flex h-16 shrink-0 items-center justify-between border-b border-white/5 px-4">
              <Link href="/" className="flex items-center gap-3" onClick={() => setIsOpen(false)}>
                <div className="flex h-9 w-9 items-center justify-center rounded-[8px] border border-white/10 bg-white/[0.04] text-primary">
                  <Sparkles className="h-4 w-4" />
                </div>
                <span className="font-extrabold">
                  Resource<span className="gradient-text">Hub</span>
                </span>
              </Link>
              <button
                type="button"
                data-magnetic
                onClick={() => setIsOpen(false)}
                className="btn-quiet flex h-9 w-9 items-center justify-center text-muted-foreground hover:text-foreground"
                aria-label="Đóng menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-3 py-4">
              <nav className="space-y-1">
                {sidebarLinks.map((link) => {
                  const isActive =
                    pathname === link.href || (link.href !== "/" && pathname.startsWith(`${link.href}/`));
                  return (
                    <Link
                      key={link.href}
                      data-magnetic
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "flex items-center gap-3 rounded-[8px] px-3 py-3 text-sm font-bold transition-colors",
                        isActive
                          ? "border border-primary/20 bg-primary/10 text-primary"
                          : "text-muted-foreground hover:bg-white/[0.04] hover:text-foreground"
                      )}
                    >
                      <link.icon className="h-5 w-5" />
                      {link.name}
                    </Link>
                  );
                })}
              </nav>

              <div className="my-5 h-px bg-white/5" />

              <div className="px-3 pb-2 text-xs font-bold uppercase text-muted-foreground">
                Studio
              </div>
              <nav className="space-y-1">
                {bottomLinks.map((link) => (
                  <Link
                    key={link.name}
                    data-magnetic
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 rounded-[8px] px-3 py-3 text-sm font-bold text-muted-foreground transition-colors hover:bg-white/[0.04] hover:text-foreground"
                  >
                    <link.icon className="h-4 w-4" />
                    {link.name}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="shrink-0 border-t border-white/5 p-4">
              <Link
                href="/profile/alexdev"
                className="flex items-center gap-3 rounded-[8px] p-2 transition-colors hover:bg-white/[0.04]"
                onClick={() => setIsOpen(false)}
              >
                <img
                  src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                  alt="Avatar"
                  className="h-11 w-11 rounded-[8px] object-cover"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-extrabold">Alex Dev</p>
                  <p className="truncate text-xs text-muted-foreground">@alexdev</p>
                </div>
              </Link>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
