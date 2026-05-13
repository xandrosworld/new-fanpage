import type { CSSProperties } from "react";
import Link from "next/link";
import { Clock, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type BlogCardProps = {
  post: {
    id: string;
    title: string;
    excerpt: string;
    thumbnail: string;
    readTime: string;
    category: string;
  };
  user?: {
    name: string;
    avatar: string;
  };
  className?: string;
  mediaClassName?: string;
  index?: number;
};

export function BlogCard({
  post,
  user,
  className,
  mediaClassName,
  index = 0,
}: BlogCardProps) {
  return (
    <Link
      href={`/blog/${post.id}`}
      data-spotlight
      data-hue="322"
      style={{ "--i": index } as CSSProperties}
      className={cn(
        "artisan-card reveal-up group block p-3 transition-transform duration-300 hover:-translate-y-1",
        className
      )}
    >
      <div className={cn("artisan-media relative aspect-[16/10]", mediaClassName)}>
        <img
          src={post.thumbnail}
          alt={post.title}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
        <span className="absolute left-3 top-3 rounded-[6px] border border-white/10 bg-black/34 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-md">
          {post.category}
        </span>
      </div>

      <div className="flex min-h-[220px] flex-col p-2 pt-5">
        <div className="mb-3 flex items-start justify-between gap-4">
          <h3 className="text-xl font-bold leading-tight transition-colors group-hover:text-primary line-clamp-3">
            {post.title}
          </h3>
          <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
        </div>

        <p className="mb-5 text-sm leading-6 text-muted-foreground line-clamp-3">
          {post.excerpt}
        </p>

        <div className="mt-auto flex items-center justify-between border-t border-white/5 pt-4">
          <div className="flex min-w-0 items-center gap-2">
            {user && (
              <img
                src={user.avatar}
                alt={user.name}
                className="h-7 w-7 rounded-[6px] object-cover"
              />
            )}
            <span className="truncate text-sm font-semibold text-muted-foreground">
              {user?.name}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
            <Clock className="h-3.5 w-3.5" />
            {post.readTime}
          </div>
        </div>
      </div>
    </Link>
  );
}
