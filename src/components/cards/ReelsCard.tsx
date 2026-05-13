import Link from "next/link";
import { Heart, MessageCircle, Share2, Play } from "lucide-react";

export function ReelsCard({ reel, user }: { reel: any, user?: any }) {
  return (
    <div className="relative aspect-[9/16] rounded-2xl overflow-hidden group bg-slate-900 border border-border/50">
      <img 
        src={reel.thumbnail} 
        alt="Reel thumbnail" 
        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
      />
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

      {/* Play Icon Center */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center pointer-events-none">
          <Play className="w-6 h-6 text-white ml-1 fill-white" />
        </div>
      </div>

      <div className="absolute bottom-0 inset-x-0 p-4">
        <div className="flex items-end justify-between">
          <div className="flex-1 pr-4">
            <div className="flex items-center gap-2 mb-2">
              <img src={user?.avatar} alt={user?.name} className="w-8 h-8 rounded-full border border-white/20" />
              <span className="font-semibold text-white text-sm">{user?.name}</span>
              <button className="px-2 py-0.5 rounded-full border border-white/40 text-[10px] font-medium text-white hover:bg-white/20 transition-colors">
                Follow
              </button>
            </div>
            <p className="text-white/90 text-sm line-clamp-2 mb-2">{reel.caption}</p>
            <p className="text-white/60 text-xs flex items-center gap-1">
              <span className="w-3 h-3 animate-pulse bg-primary rounded-full inline-block"></span>
              {reel.music}
            </p>
          </div>

          <div className="flex flex-col gap-4 items-center mb-2">
            <button className="flex flex-col items-center gap-1 group/btn">
              <div className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center group-hover/btn:bg-primary/50 transition-colors">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="text-white text-xs font-medium">{(reel.likes / 1000).toFixed(1)}K</span>
            </button>
            <button className="flex flex-col items-center gap-1 group/btn">
              <div className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center group-hover/btn:bg-white/30 transition-colors">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <span className="text-white text-xs font-medium">{reel.comments}</span>
            </button>
            <button className="flex flex-col items-center gap-1 group/btn">
              <div className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center group-hover/btn:bg-white/30 transition-colors">
                <Share2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-white text-xs font-medium">{reel.shares}</span>
            </button>
          </div>
        </div>
      </div>
      
      <Link href={`/reels`} className="absolute inset-0 z-0">
        <span className="sr-only">Play Reel</span>
      </Link>
    </div>
  );
}
