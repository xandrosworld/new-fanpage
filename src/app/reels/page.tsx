"use client";

import { useState } from "react";
import { reels, users } from "@/data/mockData";
import { Bookmark, Heart, MessageCircle, Plus, Share2, Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ReelsPage() {
  const [isMuted, setIsMuted] = useState(true);
  const [likedReels, setLikedReels] = useState<string[]>([]);
  const [savedReels, setSavedReels] = useState<string[]>([]);
  const [following, setFollowing] = useState<string[]>([]);

  const toggleLike = (id: string) => {
    setLikedReels((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  const toggleSave = (id: string) => {
    setSavedReels((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  const toggleFollow = (authorId: string) => {
    setFollowing((prev) => (prev.includes(authorId) ? prev.filter((id) => id !== authorId) : [...prev, authorId]));
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden bg-black text-white">
      <aside className="hidden w-64 flex-col border-r border-white/10 p-6 lg:flex">
        <div className="section-kicker mb-3">Short form</div>
        <h1 className="display-title mb-8 text-4xl text-white">Reels</h1>
        <nav className="space-y-2">
          {["Dành cho bạn", "Đang follow", "Công nghệ", "Tool MXH"].map((item, index) => (
            <button
              data-magnetic
              key={item}
              className={cn(
                "w-full rounded-[8px] px-4 py-3 text-left font-bold transition-colors",
                index === 0 ? "border border-white/10 bg-white/10" : "text-white/65 hover:bg-white/5 hover:text-white"
              )}
            >
              {item}
            </button>
          ))}
        </nav>

        <button data-magnetic className="btn-artisan mt-auto py-3">
          <Plus className="h-5 w-5" />
          Đăng Reels
        </button>
      </aside>

      <main className="hide-scrollbar flex h-full flex-1 snap-y snap-mandatory flex-col items-center overflow-y-auto px-4 py-5">
        {reels.map((reel) => {
          const author = users.find((user) => user.id === reel.authorId);
          const isLiked = likedReels.includes(reel.id);
          const isSaved = savedReels.includes(reel.id);
          const isFollowing = author ? following.includes(author.id) : false;

          return (
            <section
              key={reel.id}
              data-spotlight
              data-hue="292"
              className="artisan-card relative mb-6 flex h-[calc(100vh-7rem)] min-h-[600px] w-full max-w-[410px] snap-start snap-always overflow-hidden p-2"
            >
              <div className="artisan-media absolute inset-2">
                <img src={reel.thumbnail} alt="" className="h-full w-full object-cover opacity-90" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/92 via-black/28 to-black/12" />
              </div>

              <button
                data-magnetic
                onClick={() => setIsMuted(!isMuted)}
                className="btn-quiet absolute left-5 top-5 z-10 flex h-10 w-10 items-center justify-center bg-black/35 text-white"
              >
                {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
              </button>

              <div className="absolute bottom-5 left-5 right-20 z-10">
                <div className="mb-3 flex items-center gap-3">
                  <img src={author?.avatar} alt={author?.name} className="h-10 w-10 rounded-[8px] border border-white/20 object-cover" />
                  <div className="min-w-0 flex-1">
                    <h2 className="truncate font-extrabold">{author?.name}</h2>
                  </div>
                  <button
                    data-magnetic
                    onClick={() => author && toggleFollow(author.id)}
                    className={cn(
                      "rounded-[6px] border px-2 py-1 text-[10px] font-extrabold uppercase",
                      isFollowing ? "border-white/30 text-white/70" : "border-primary bg-primary text-primary-foreground"
                    )}
                  >
                    {isFollowing ? "Đang follow" : "Follow"}
                  </button>
                </div>
                <p className="mb-3 text-sm leading-6 text-white/90 line-clamp-3">{reel.caption}</p>
                <div className="w-fit rounded-[6px] border border-white/10 bg-white/10 px-3 py-1.5 text-xs font-bold text-white/75 backdrop-blur-md">
                  {reel.music}
                </div>
              </div>

              <div className="absolute bottom-5 right-4 z-10 flex flex-col items-center gap-4">
                <button onClick={() => toggleLike(reel.id)} className="flex flex-col items-center gap-1">
                  <span className="btn-quiet flex h-11 w-11 items-center justify-center bg-black/35">
                    <Heart className={cn("h-5 w-5", isLiked && "fill-red-500 text-red-500")} />
                  </span>
                  <span className="text-xs font-bold">{isLiked ? (reel.likes + 1).toLocaleString() : reel.likes.toLocaleString()}</span>
                </button>
                <button className="flex flex-col items-center gap-1">
                  <span className="btn-quiet flex h-11 w-11 items-center justify-center bg-black/35">
                    <MessageCircle className="h-5 w-5" />
                  </span>
                  <span className="text-xs font-bold">{reel.comments}</span>
                </button>
                <button onClick={() => toggleSave(reel.id)} className="flex flex-col items-center gap-1">
                  <span className="btn-quiet flex h-11 w-11 items-center justify-center bg-black/35">
                    <Bookmark className={cn("h-5 w-5", isSaved && "fill-amber-300 text-amber-300")} />
                  </span>
                  <span className="text-xs font-bold">{isSaved ? "Đã lưu" : "Lưu"}</span>
                </button>
                <button className="flex flex-col items-center gap-1">
                  <span className="btn-quiet flex h-11 w-11 items-center justify-center bg-black/35">
                    <Share2 className="h-5 w-5" />
                  </span>
                  <span className="text-xs font-bold">{reel.shares}</span>
                </button>
              </div>
            </section>
          );
        })}
      </main>
    </div>
  );
}
