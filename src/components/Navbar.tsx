"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Code2, Video, Target, Users, MessageSquare, 
  Search, Moon, Sun, Menu, X, LayoutDashboard, Wallet, Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Tài nguyên", href: "/resources", icon: Code2 },
  { name: "Blog", href: "/blog", icon: LayoutDashboard },
  { name: "Cộng đồng", href: "/community", icon: Users },
  { name: "Reels", href: "/reels", icon: Video },
  { name: "Nhiệm vụ", href: "/tasks", icon: Target },
  { name: "Chat", href: "/chat", icon: MessageSquare },
];

export function Navbar() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 inset-x-0 z-40 transition-all duration-300",
          isScrolled
            ? "bg-background/90 backdrop-blur-xl border-b border-border/60 shadow-lg shadow-black/5"
            : "bg-background/70 backdrop-blur-md border-b border-transparent"
        )}
      >
        <div className="container mx-auto px-4 h-14 flex items-center gap-2">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group flex-shrink-0 mr-3">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white shadow-md shadow-primary/30 group-hover:shadow-primary/50 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m22 8-6 4 6 4V8Z"/><rect width="14" height="12" x="2" y="6" rx="2" ry="2"/></svg>
            </div>
            <span className="font-bold text-base tracking-tight hidden sm:block">
              Resource<span className="text-primary">Hub</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-0.5 flex-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200",
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                  )}
                >
                  <link.icon className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>{link.name}</span>
                  {isActive && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-lg bg-primary/10 border border-primary/20 -z-10"
                      transition={{ type: "spring", stiffness: 400, damping: 35 }}
                    />
                  )}
                </Link>
              );
            })}
            <Link
              href="/creator"
              className={cn(
                "relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ml-1",
                pathname === "/creator"
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
              )}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Creator</span>
              {pathname === "/creator" && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-lg bg-primary/10 border border-primary/20 -z-10"
                  transition={{ type: "spring", stiffness: 400, damping: 35 }}
                />
              )}
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-1.5 ml-auto">
            {/* Expandable Search */}
            <div className="relative hidden md:flex items-center">
              <AnimatePresence>
                {searchOpen && (
                  <motion.input
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 180, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    type="text"
                    placeholder="Tìm kiếm..."
                    autoFocus
                    onBlur={() => setSearchOpen(false)}
                    className="h-8 pl-3 pr-8 rounded-full bg-secondary/70 border border-border/60 focus:border-primary/50 outline-none text-sm"
                  />
                )}
              </AnimatePresence>
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center transition-colors flex-shrink-0",
                  searchOpen
                    ? "absolute right-0 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                )}
              >
                <Search className="w-4 h-4" />
              </button>
            </div>

            {/* Theme toggle */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
            )}

            {/* Wallet chip */}
            <Link
              href="/wallet"
              className="hidden sm:flex items-center gap-1.5 h-7 px-2.5 rounded-full bg-secondary/80 border border-border/50 text-xs font-semibold hover:bg-secondary hover:border-primary/40 transition-all"
            >
              <Wallet className="w-3.5 h-3.5 text-primary" />
              <span>1.25M</span>
            </Link>

            {/* Avatar */}
            <Link
              href="/profile/alexdev"
              className="w-7 h-7 rounded-full overflow-hidden ring-2 ring-transparent hover:ring-primary/60 transition-all flex-shrink-0"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            </Link>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground ml-1"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-14 z-30 bg-background/95 backdrop-blur-xl border-b border-border shadow-xl lg:hidden"
          >
            <div className="p-4 flex flex-col gap-1.5">
              <div className="relative mb-3">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Tìm kiếm..."
                  className="w-full h-10 pl-9 pr-4 rounded-xl bg-secondary/50 border border-transparent focus:border-primary/50 outline-none text-sm"
                />
              </div>

              {[...navLinks, { name: "Creator Studio", href: "/creator", icon: Sparkles }].map((link) => {
                const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-2.5 rounded-xl font-medium transition-colors text-sm",
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-secondary/70 hover:text-foreground"
                    )}
                  >
                    <link.icon className="w-4 h-4" />
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
