"use client";

import { useState } from "react";
import { reels, users } from "@/data/mockData";
import { Heart, MessageCircle, Share2, Bookmark, Plus, Volume2, VolumeX, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ReelsPage() {
  const [activeReelIndex, setActiveReelIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [likedReels, setLikedReels] = useState<string[]>([]);
  const [savedReels, setSavedReels] = useState<string[]>([]);
  const [following, setFollowing] = useState<string[]>([]);

  const toggleLike = (id: string) => {
    setLikedReels(prev => prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]);
  };

  const toggleSave = (id: string) => {
    setSavedReels(prev => prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]);
  };

  const toggleFollow = (authorId: string) => {
    setFollowing(prev => prev.includes(authorId) ? prev.filter(id => id !== authorId) : [...prev, authorId]);
  };

  return (
    <div className="bg-black text-white h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden">
      
      {/* Left Sidebar (Desktop) */}
      <div className="hidden lg:flex w-64 h-full flex-col p-6 border-r border-white/10">
        <h2 className="text-xl font-bold mb-6">Reels</h2>
        <nav className="space-y-2 mb-8">
          <button className="w-full flex items-center gap-3 px-4 py-3 bg-white/10 rounded-xl font-medium">Dành cho bạn</button>
          <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 rounded-xl font-medium text-white/70 transition-colors">Đang follow</button>
          <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 rounded-xl font-medium text-white/70 transition-colors">Công nghệ</button>
          <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 rounded-xl font-medium text-white/70 transition-colors">Tool MXH</button>
        </nav>
        
        <div className="mt-auto">
          <button className="w-full py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 flex items-center justify-center gap-2">
            <Plus className="w-5 h-5" /> Đăng Reels
          </button>
        </div>
      </div>

      {/* Main Feed */}
      <div className="flex-1 h-full overflow-y-auto snap-y snap-mandatory hide-scrollbar flex flex-col items-center py-4 sm:py-6">
        {reels.map((reel, index) => {
          const author = users.find(u => u.id === reel.authorId);
          const isLiked = likedReels.includes(reel.id);
          const isSaved = savedReels.includes(reel.id);
          const isFollowing = author && following.includes(author.id);

          return (
            <div 
              key={reel.id} 
              className="snap-start snap-always w-full max-w-[400px] h-[calc(100vh-6rem)] sm:h-[80vh] min-h-[600px] mb-6 flex relative bg-slate-900 sm:rounded-2xl overflow-hidden"
            >
              {/* Video Player Mock */}
              <div className="absolute inset-0 z-0">
                <img src={reel.thumbnail} alt="" className="w-full h-full object-cover opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/10"></div>
                {/* Simulated play button for mock */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center cursor-pointer animate-pulse">
                    <div className="w-0 h-0 border-t-8 border-t-transparent border-l-[12px] border-l-white border-b-8 border-b-transparent ml-1"></div>
                  </div>
                </div>
              </div>

              {/* Top Bar */}
              <div className="absolute top-4 inset-x-4 z-10 flex justify-between items-center">
                <button 
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-2 bg-black/40 backdrop-blur-md rounded-full text-white hover:bg-black/60 transition"
                >
                  {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </button>
              </div>

              {/* Bottom Info */}
              <div className="absolute bottom-4 left-4 right-16 z-10">
                <div className="flex items-center gap-3 mb-3">
                  <img src={author?.avatar} alt={author?.name} className="w-10 h-10 rounded-full border border-white/20" />
                  <div>
                    <h3 className="font-semibold flex items-center gap-2">
                      {author?.name}
                      <button 
                        onClick={() => author && toggleFollow(author.id)}
                        className={cn(
                          "px-2 py-0.5 rounded border text-[10px] font-bold uppercase transition-colors",
                          isFollowing ? "bg-transparent border-white/40 text-white/70" : "bg-primary border-primary text-white"
                        )}
                      >
                        {isFollowing ? "Đang follow" : "Follow"}
                      </button>
                    </h3>
                  </div>
                </div>
                <p className="text-sm text-white/90 mb-2 line-clamp-3">{reel.caption}</p>
                <div className="flex items-center gap-2 text-xs font-medium bg-white/10 backdrop-blur-md w-fit px-3 py-1.5 rounded-full">
                  <div className="w-3 h-3 flex items-center justify-center bg-primary rounded-full animate-spin">
                    <div className="w-1 h-1 bg-white rounded-full"></div>
                  </div>
                  {reel.music}
                </div>
              </div>

              {/* Right Action Bar */}
              <div className="absolute bottom-4 right-2 z-10 flex flex-col gap-4 items-center">
                <button onClick={() => toggleLike(reel.id)} className="flex flex-col items-center gap-1 group">
                  <div className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center group-hover:bg-black/60 transition-colors">
                    <Heart className={cn("w-6 h-6 transition-all", isLiked ? "fill-red-500 text-red-500 scale-110" : "text-white")} />
                  </div>
                  <span className="text-xs font-semibold">{isLiked ? (reel.likes + 1).toLocaleString() : reel.likes.toLocaleString()}</span>
                </button>

                <button className="flex flex-col items-center gap-1 group">
                  <div className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center group-hover:bg-black/60 transition-colors">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xs font-semibold">{reel.comments}</span>
                </button>

                <button onClick={() => toggleSave(reel.id)} className="flex flex-col items-center gap-1 group">
                  <div className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center group-hover:bg-black/60 transition-colors">
                    <Bookmark className={cn("w-6 h-6 transition-all", isSaved ? "fill-yellow-500 text-yellow-500 scale-110" : "text-white")} />
                  </div>
                  <span className="text-xs font-semibold">{isSaved ? "Đã lưu" : "Lưu"}</span>
                </button>

                <button className="flex flex-col items-center gap-1 group">
                  <div className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center group-hover:bg-black/60 transition-colors">
                    <Share2 className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xs font-semibold">{reel.shares}</span>
                </button>
                
                <button className="w-12 h-12 rounded-full mt-2 overflow-hidden border-2 border-white/20 animate-[spin_4s_linear_infinite]">
                  <img src={author?.avatar} alt="music" className="w-full h-full object-cover" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
      
      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
