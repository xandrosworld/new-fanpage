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
  Target,
  Users,
  Video,
  X,
} from "lucide-react";
import { BrandMark } from "@/components/BrandMark";
import { cn } from "@/lib/utils";
import { useSidebarStore } from "@/store/useSidebarStore";

const primaryLinks = [
  { name: "Trang chủ", href: "/", icon: Home },
  { name: "Marketplace", href: "/resources", icon: Code2 },
  { name: "Blog", href: "/blog", icon: LayoutDashboard },
  { name: "MXH Creator", href: "/community", icon: Users },
  { name: "Reels", href: "/reels", icon: Video },
  { name: "Nhiệm vụ", href: "/tasks", icon: Target },
  { name: "Chat", href: "/chat", icon: MessageSquare },
  { name: "Creator", href: "/creator", icon: BrandMark },
];

const utilityLinks = [
  { name: "Cài đặt", href: "#", icon: Settings },
  { name: "Trợ giúp", href: "#", icon: HelpCircle },
  { name: "Quyền riêng tư", href: "#", icon: Shield },
];

type NavLink = (typeof primaryLinks)[number];

export function Sidebar() {
  const { isOpen, toggle, setIsOpen } = useSidebarStore();
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));
  const close = () => setIsOpen(false);

  return (
    <>
      <motion.aside
        id="main-sidebar"
        data-expanded={isOpen ? "true" : "false"}
        initial={false}
        animate={{ width: isOpen ? 316 : 58 }}
        transition={{ type: "spring", damping: 32, stiffness: 330 }}
        className="side-menu fixed bottom-3 left-3 top-[4.75rem] z-[45] hidden flex-col lg:flex"
        aria-label="Điều hướng chính"
      >
        <SidebarContent
          expanded={isOpen}
          isActive={isActive}
          onToggle={toggle}
          onNavigate={close}
        />
      </motion.aside>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              onClick={close}
              className="fixed inset-0 z-[60] bg-black/28 lg:hidden"
            />
            <motion.aside
              data-expanded="true"
              initial={{ x: -24, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -24, opacity: 0 }}
              transition={{ type: "spring", damping: 30, stiffness: 310 }}
              className="side-menu fixed bottom-3 left-3 top-[4.75rem] z-[70] flex w-[min(21rem,calc(100vw-1.5rem))] flex-col lg:hidden"
              aria-label="Điều hướng chính"
            >
              <SidebarContent
                expanded
                isActive={isActive}
                onToggle={close}
                onNavigate={close}
              />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function SidebarContent({
  expanded,
  isActive,
  onToggle,
  onNavigate,
}: {
  expanded: boolean;
  isActive: (href: string) => boolean;
  onToggle: () => void;
  onNavigate: () => void;
}) {
  return (
    <div className="side-menu-content flex h-full flex-col overflow-hidden p-2">
      <button
        type="button"
        onClick={onToggle}
        className={cn("side-menu-toggle", expanded ? "justify-start px-2.5" : "justify-center px-0")}
        aria-controls="main-sidebar"
        aria-expanded={expanded}
        aria-label={expanded ? "Đóng menu" : "Mở menu"}
      >
        <span className="side-menu-mark">
          {expanded ? <X className="h-[18px] w-[18px]" /> : <Menu className="h-[18px] w-[18px]" />}
        </span>
        {expanded && (
          <>
            <span className="min-w-0 flex-1 text-left">
              <span className="block truncate text-sm font-extrabold">
                Resource<span className="gradient-text">Hub</span>
              </span>
              <span className="block truncate text-[10px] font-bold uppercase text-muted-foreground">
                Marketplace + MXH
              </span>
            </span>
            <BrandMark className="h-4 w-4 text-primary" />
          </>
        )}
      </button>

      <div className="side-menu-scroll mt-3 flex-1 overflow-y-auto overflow-x-hidden">
        {expanded && (
          <div className="side-menu-promos mb-3 grid grid-cols-2 gap-2">
            <Link href="/resources" onClick={onNavigate} className="commerce-plate rounded-[8px] p-3">
              <Code2 className="mb-3 h-5 w-5 text-primary" />
              <div className="text-sm font-extrabold">Tài nguyên</div>
              <div className="mt-1 text-[11px] font-semibold text-muted-foreground">Kho bán riêng</div>
            </Link>
            <Link href="/community" onClick={onNavigate} className="social-plate rounded-[8px] p-3">
              <Users className="mb-3 h-5 w-5 text-accent" />
              <div className="text-sm font-extrabold">MXH</div>
              <div className="mt-1 text-[11px] font-semibold text-muted-foreground">Feed riêng</div>
            </Link>
          </div>
        )}

        <nav className="side-menu-nav">
          {primaryLinks.map((link) => (
            <MenuLink
              key={link.href}
              link={link}
              expanded={expanded}
              active={isActive(link.href)}
              onNavigate={onNavigate}
            />
          ))}
        </nav>

        <div className="side-menu-divider my-4 h-px bg-white/5" />

        {expanded && <div className="px-2 pb-2 text-[10px] font-bold uppercase text-muted-foreground">Studio</div>}
        <nav className="side-menu-nav">
          {utilityLinks.map((link) => (
            <MenuLink
              key={link.name}
              link={link}
              expanded={expanded}
              active={false}
              onNavigate={onNavigate}
            />
          ))}
        </nav>
      </div>

      <Link
        href="/profile/alexdev"
        onClick={onNavigate}
        title="Alex Dev"
        className={cn("side-menu-profile", expanded ? "justify-start px-2" : "justify-center px-0")}
      >
        <img
          src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
          alt="Avatar"
          className="h-9 w-9 shrink-0 rounded-[8px] object-cover"
        />
        {expanded && (
          <span className="min-w-0 flex-1">
            <span className="block truncate text-sm font-extrabold">Alex Dev</span>
            <span className="block truncate text-xs text-muted-foreground">@alexdev</span>
          </span>
        )}
      </Link>
    </div>
  );
}

function MenuLink({
  link,
  expanded,
  active,
  onNavigate,
}: {
  link: NavLink;
  expanded: boolean;
  active: boolean;
  onNavigate: () => void;
}) {
  return (
    <Link
      href={link.href}
      title={link.name}
      onClick={onNavigate}
      className={cn(
        "side-menu-link",
        expanded ? "justify-start px-2.5" : "justify-center px-0",
        active && "side-menu-link-active"
      )}
    >
      <span className="side-menu-icon">
        <link.icon className="h-[18px] w-[18px]" />
      </span>
      {expanded && <span className="truncate text-sm font-bold">{link.name}</span>}
    </Link>
  );
}
