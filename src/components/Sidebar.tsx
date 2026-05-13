"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  Code2,
  HelpCircle,
  Home,
  LayoutDashboard,
  Menu,
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
  { name: "Marketplace tài nguyên", href: "/resources", icon: Code2 },
  { name: "Blog", href: "/blog", icon: LayoutDashboard },
  { name: "MXH cộng đồng", href: "/community", icon: Users },
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

  const isActive = (href: string) => pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));

  return (
    <>
      <aside className="side-rail hidden lg:flex" aria-label="Điều hướng nhanh">
        <button
          type="button"
          data-magnetic
          onClick={() => setIsOpen(!isOpen)}
          className={cn("side-rail-button", isOpen && "border-primary/30 bg-primary/10 text-primary")}
          aria-controls="main-sidebar"
          aria-expanded={isOpen}
          aria-label={isOpen ? "Đóng menu" : "Mở menu"}
        >
          {isOpen ? <X className="h-[18px] w-[18px]" /> : <Menu className="h-[18px] w-[18px]" />}
        </button>

        <nav className="flex flex-1 flex-col items-center gap-2">
          {sidebarLinks.map((link) => (
            <Link
              key={link.href}
              data-magnetic
              href={link.href}
              title={link.name}
              className={cn("side-rail-link", isActive(link.href) && "side-rail-link-active")}
            >
              <link.icon className="h-[18px] w-[18px]" />
            </Link>
          ))}
        </nav>

        <nav className="flex flex-col items-center gap-2">
          {bottomLinks.map((link) => (
            <Link key={link.name} data-magnetic href={link.href} title={link.name} className="side-rail-link">
              <link.icon className="h-4 w-4" />
            </Link>
          ))}
        </nav>
      </aside>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[60] bg-black/20 lg:bg-transparent"
            />

            <motion.aside
              id="main-sidebar"
              initial={{ x: -28, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -28, opacity: 0 }}
              transition={{ type: "spring", damping: 30, stiffness: 310 }}
              className="artisan-card fixed bottom-3 left-3 top-[4.75rem] z-[70] flex w-[min(23rem,calc(100vw-1.5rem))] flex-col p-0 lg:left-[5.25rem] lg:top-[5.25rem]"
            >
              <div className="flex h-16 shrink-0 items-center justify-between border-b border-white/5 px-4">
                <Link href="/" className="flex items-center gap-3" onClick={() => setIsOpen(false)}>
                  <div className="flex h-9 w-9 items-center justify-center rounded-[8px] border border-white/10 bg-white/[0.04] text-primary">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="block font-extrabold">
                      Resource<span className="gradient-text">Hub</span>
                    </span>
                    <span className="text-[11px] font-bold uppercase text-muted-foreground">Marketplace + MXH</span>
                  </div>
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
                <div className="mb-4 grid grid-cols-2 gap-2">
                  <Link
                    href="/resources"
                    onClick={() => setIsOpen(false)}
                    className="commerce-plate rounded-[8px] p-3"
                  >
                    <Code2 className="mb-3 h-5 w-5 text-primary" />
                    <div className="text-sm font-extrabold">Tài nguyên</div>
                    <div className="mt-1 text-[11px] font-semibold text-muted-foreground">Kho bán riêng</div>
                  </Link>
                  <Link
                    href="/community"
                    onClick={() => setIsOpen(false)}
                    className="social-plate rounded-[8px] p-3"
                  >
                    <Users className="mb-3 h-5 w-5 text-accent" />
                    <div className="text-sm font-extrabold">MXH</div>
                    <div className="mt-1 text-[11px] font-semibold text-muted-foreground">Feed riêng</div>
                  </Link>
                </div>

                <nav className="space-y-1">
                  {sidebarLinks.map((link) => (
                    <Link
                      key={link.href}
                      data-magnetic
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "flex items-center gap-3 rounded-[8px] px-3 py-3 text-sm font-bold transition-colors",
                        isActive(link.href)
                          ? "border border-primary/20 bg-primary/10 text-primary"
                          : "text-muted-foreground hover:bg-white/[0.04] hover:text-foreground"
                      )}
                    >
                      <link.icon className="h-5 w-5" />
                      {link.name}
                    </Link>
                  ))}
                </nav>

                <div className="my-5 h-px bg-white/5" />

                <div className="px-3 pb-2 text-xs font-bold uppercase text-muted-foreground">Studio</div>
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
    </>
  );
}
