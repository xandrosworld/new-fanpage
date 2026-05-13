import type { CSSProperties } from "react";
import Link from "next/link";
import { Star, Download, Bookmark } from "lucide-react";
import { cn } from "@/lib/utils";

type ResourceCardProps = {
  resource: {
    id: string;
    title: string;
    description: string;
    thumbnail: string;
    price: number;
    downloads: number;
    rating: number;
    tags: string[];
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

export function ResourceCard({
  resource,
  user,
  className,
  mediaClassName,
  index = 0,
}: ResourceCardProps) {
  const hue = resource.price === 0 ? "172" : "28";

  return (
    <article
      data-spotlight
      data-hue={hue}
      style={{ "--i": index } as CSSProperties}
      className={cn(
        "artisan-card reveal-up group relative flex h-full flex-col p-3 transition-transform duration-300 hover:-translate-y-1",
        className
      )}
    >
      <div className={cn("artisan-media relative aspect-[4/3]", mediaClassName)}>
        <img
          src={resource.thumbnail}
          alt={resource.title}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/58 via-black/10 to-transparent" />
        <div className="absolute left-3 top-3 flex gap-2">
          <span className="rounded-[6px] border border-white/10 bg-black/32 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-md">
            {resource.category}
          </span>
        </div>
        <button
          data-magnetic
          className="btn-quiet absolute right-3 top-3 z-20 h-8 w-8 text-muted-foreground hover:text-primary"
          aria-label="Lưu tài nguyên"
        >
          <Bookmark className="h-4 w-4" />
        </button>
      </div>

      <div className="flex flex-1 flex-col p-2 pt-4">
        <div className="mb-3 flex items-start justify-between gap-4">
          <h3 className="text-lg font-bold leading-snug transition-colors group-hover:text-primary">
            {resource.title}
          </h3>
          <div className="flex items-center gap-1 rounded-[6px] bg-amber-400/10 px-2 py-1 text-xs font-bold text-amber-300">
            <Star className="h-3.5 w-3.5 fill-current" />
            {resource.rating}
          </div>
        </div>

        <p className="mb-5 flex-1 text-sm leading-6 text-muted-foreground line-clamp-3">
          {resource.description}
        </p>

        <div className="mb-5 flex flex-wrap gap-2">
          {resource.tags.slice(0, 3).map((tag: string) => (
            <span
              key={tag}
              className="rounded-[6px] border border-white/5 bg-white/[0.035] px-2 py-1 text-xs font-semibold text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-center justify-between border-t border-white/5 pt-4">
          <div className="flex min-w-0 items-center gap-2">
            {user && (
              <img
                src={user.avatar}
                alt={user.name}
                className="h-7 w-7 rounded-[6px] object-cover"
              />
            )}
            <span className="truncate text-xs font-semibold text-muted-foreground">
              {user?.name || "Creator"}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Download className="h-3.5 w-3.5" />
              {resource.downloads}
            </div>
            <div className="font-bold text-primary">
              {resource.price === 0 ? "Free" : `${resource.price.toLocaleString("vi-VN")}đ`}
            </div>
          </div>
        </div>
      </div>

      <Link href={`/resources/${resource.id}`} className="absolute inset-0 z-10">
        <span className="sr-only">Xem tài nguyên</span>
      </Link>
    </article>
  );
}
