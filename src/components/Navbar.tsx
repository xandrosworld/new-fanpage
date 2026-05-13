"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { AnimatePresence, motion } from "framer-motion";
import {
  Code2,
  LayoutDashboard,
  Menu,
  MessageSquare,
  Moon,
  Search,
  Sparkles,
  Sun,
  Target,
  Users,
  Video,
  Wallet,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useSidebarStore } from "@/store/useSidebarStore";

const navLinks = [
  { name: "Marketplace", href: "/resources", icon: Code2 },
  { name: "Blog", href: "/blog", icon: LayoutDashboard },
  { name: "MXH", href: "/community", icon: Users },
  { name: "Reels", href: "/reels", icon: Video },
  { name: "Nhiệm vụ", href: "/tasks", icon: Target },
  { name: "Chat", href: "/chat", icon: MessageSquare },
];

export function Navbar() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { isOpen: isSidebarOpen, setIsOpen: setSidebarOpen } = useSidebarStore();

  useEffect(() => {
    queueMicrotask(() => setMounted(true));
    const handleScroll = () => setIsScrolled(window.scrollY > 18);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-300",
        isScrolled ? "border-b border-white/5 bg-background/78 backdrop-blur-2xl" : "bg-background/42 backdrop-blur-md"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-2 px-4">
        <button
          type="button"
          data-magnetic
          onClick={() => setSidebarOpen(true)}
          className="btn-quiet mr-1 flex h-9 w-9 shrink-0 items-center justify-center text-muted-foreground hover:text-foreground lg:hidden"
          aria-controls="main-sidebar"
          aria-expanded={isSidebarOpen}
          aria-label="Mở menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        <Link href="/" className="group mr-4 flex shrink-0 items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-[8px] border border-white/10 bg-white/[0.04] text-primary shadow-[0_18px_45px_hsl(172_67%_50%/0.16)]">
            <Sparkles className="h-4 w-4" />
          </div>
          <span className="hidden text-base font-extrabold sm:block">
            Resource<span className="gradient-text">Hub</span>
          </span>
        </Link>

        <nav className="hidden flex-1 items-center gap-1 lg:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                data-magnetic
                href={link.href}
                className={cn(
                  "relative flex items-center gap-1.5 rounded-[8px] px-3 py-2 text-sm font-bold transition-colors",
                  isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                )}
              >
                <link.icon className="h-3.5 w-3.5 shrink-0" />
                <span>{link.name}</span>
                {isActive && (
                  <motion.div
                    layoutId="nav-active-artisan"
                    className="absolute inset-0 -z-10 rounded-[8px] border border-primary/20 bg-primary/10"
                    transition={{ type: "spring", stiffness: 420, damping: 36 }}
                  />
                )}
              </Link>
            );
          })}
          <Link
            data-magnetic
            href="/creator"
            className={cn(
              "relative ml-1 flex items-center gap-1.5 rounded-[8px] px-3 py-2 text-sm font-bold transition-colors",
              pathname === "/creator" ? "text-primary" : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Creator</span>
            {pathname === "/creator" && (
              <motion.div
                layoutId="nav-active-artisan"
                className="absolute inset-0 -z-10 rounded-[8px] border border-primary/20 bg-primary/10"
                transition={{ type: "spring", stiffness: 420, damping: 36 }}
              />
            )}
          </Link>
        </nav>

        <div className="ml-auto flex items-center gap-1.5">
          <div className="relative hidden items-center md:flex">
            <AnimatePresence>
              {searchOpen && (
                <motion.input
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 210, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  type="text"
                  placeholder="Tìm nhanh..."
                  autoFocus
                  onBlur={() => setSearchOpen(false)}
                  className="h-9 rounded-[8px] border border-white/7 bg-white/[0.04] pl-3 pr-9 text-sm outline-none focus:border-primary/40"
                />
              )}
            </AnimatePresence>
            <button
              data-magnetic
              onClick={() => setSearchOpen(!searchOpen)}
              className={cn(
                "btn-quiet flex h-9 w-9 shrink-0 items-center justify-center",
                searchOpen ? "absolute right-0 text-primary" : "text-muted-foreground hover:text-foreground"
              )}
              aria-label="Tìm kiếm"
            >
              <Search className="h-4 w-4" />
            </button>
          </div>

          {mounted && (
            <button
              data-magnetic
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="btn-quiet flex h-9 w-9 items-center justify-center text-muted-foreground hover:text-foreground"
              aria-label="Đổi giao diện"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
          )}

          <Link
            data-magnetic
            href="/wallet"
            className="btn-quiet hidden h-9 items-center gap-1.5 px-3 text-xs font-extrabold sm:flex"
          >
            <Wallet className="h-3.5 w-3.5 text-primary" />
            <span>1.25M</span>
          </Link>

          <Link
            href="/profile/alexdev"
            className="ml-1 h-9 w-9 shrink-0 overflow-hidden rounded-[8px] border border-white/10 transition-all hover:border-primary/60"
          >
            <img
              src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
              alt="Avatar"
              className="h-full w-full object-cover"
            />
          </Link>
        </div>
      </div>
    </header>
  );
}
