import type { CSSProperties } from "react";
import Link from "next/link";
import { Heart, MessageCircle, Share2, Play } from "lucide-react";

type Reel = {
  caption: string;
  thumbnail: string;
  likes: number;
  comments: number;
  shares: number;
  music: string;
};

type User = {
  name: string;
  avatar: string;
};

export function ReelsCard({ reel, user, index = 0 }: { reel: Reel; user?: User; index?: number }) {
  return (
    <article
      data-spotlight
      data-hue="292"
      style={{ "--i": index } as CSSProperties}
      className="artisan-card reveal-up group relative aspect-[9/16] overflow-hidden p-2"
    >
      <div className="artisan-media absolute inset-2">
        <img
          src={reel.thumbnail}
          alt="Reel thumbnail"
          className="h-full w-full object-cover opacity-85 transition duration-700 group-hover:scale-105 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/20 to-transparent" />
      </div>

      <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
        <div className="flex h-14 w-14 items-center justify-center rounded-[8px] border border-white/15 bg-white/15 backdrop-blur-md">
          <Play className="ml-1 h-6 w-6 fill-white text-white" />
        </div>
      </div>

      <div className="absolute bottom-4 left-4 right-4 z-10">
        <div className="mb-3 flex items-center gap-2">
          <img
            src={user?.avatar}
            alt={user?.name}
            className="h-8 w-8 rounded-[6px] border border-white/15 object-cover"
          />
          <span className="min-w-0 flex-1 truncate text-sm font-bold text-white">{user?.name}</span>
          <button
            data-magnetic
            className="rounded-[6px] border border-white/25 px-2 py-1 text-[10px] font-bold uppercase text-white transition-colors hover:bg-white/15"
          >
            Follow
          </button>
        </div>

        <p className="mb-3 text-sm leading-5 text-white/90 line-clamp-2">{reel.caption}</p>

        <div className="flex items-center justify-between gap-3">
          <p className="truncate text-xs text-white/58">{reel.music}</p>
          <div className="flex items-center gap-2 text-xs font-bold text-white/86">
            <span className="inline-flex items-center gap-1">
              <Heart className="h-3.5 w-3.5" />
              {(reel.likes / 1000).toFixed(1)}K
            </span>
            <span className="inline-flex items-center gap-1">
              <MessageCircle className="h-3.5 w-3.5" />
              {reel.comments}
            </span>
            <Share2 className="h-3.5 w-3.5" />
          </div>
        </div>
      </div>

      <Link href="/reels" className="absolute inset-0 z-0">
        <span className="sr-only">Phát reel</span>
      </Link>
    </article>
  );
}
