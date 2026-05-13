"use client";

import { useState } from "react";
import { users, avatarFrames, feedPosts } from "@/data/mockData";
import { MapPin, Link as LinkIcon, Calendar, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ProfilePage({ params }: { params: { username: string } }) {
  // Mock current profile
  const profile = users.find(u => u.username === params.username) || users[0];
  
  const [activeFrame, setActiveFrame] = useState(profile.frameId);
  const [activeTab, setActiveTab] = useState("Bài viết");

  return (
    <div className="bg-background min-h-screen">
      {/* Cover Photo & Header */}
      <div className="relative">
        <div className="h-64 md:h-80 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        </div>

        <div className="container mx-auto px-4 max-w-5xl relative">
          <div className="flex flex-col md:flex-row md:items-end gap-6 -mt-20 md:-mt-16 mb-8 relative z-10">
            {/* Avatar with Frame */}
            <div className="relative w-36 h-36 md:w-44 md:h-44 flex-shrink-0">
              <div 
                className="absolute -inset-2 rounded-full z-0"
                style={{ 
                  background: activeFrame ? avatarFrames.find(f => f.id === activeFrame)?.image : 'transparent',
                  padding: '4px'
                }}
              >
                <div className="w-full h-full bg-background rounded-full"></div>
              </div>
              <img 
                src={profile.avatar} 
                alt={profile.name} 
                className="w-full h-full rounded-full object-cover relative z-10 border-4 border-background" 
              />
              {profile.badge && (
                <div className="absolute bottom-2 right-2 z-20 bg-blue-500 text-white rounded-full p-1 border-2 border-background">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
              )}
            </div>

            {/* Profile Info */}
            <div className="flex-1 pb-4">
              <h1 className="text-3xl font-bold flex items-center gap-2">
                {profile.name}
                {profile.badge && (
                  <span className="text-xs font-semibold px-2 py-0.5 bg-blue-500/10 text-blue-500 rounded border border-blue-500/20 align-middle">
                    {profile.badge}
                  </span>
                )}
              </h1>
              <p className="text-muted-foreground font-medium mb-3">@{profile.username}</p>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                {profile.bio && <div>{profile.bio}</div>}
                {profile.location && (
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" /> {profile.location}
                  </div>
                )}
                {profile.website && (
                  <div className="flex items-center gap-1">
                    <LinkIcon className="w-4 h-4" /> <a href={profile.website} className="text-primary hover:underline">{new URL(profile.website).hostname}</a>
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" /> Tham gia Thg 5, 2026
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pb-4">
              <button className="px-6 py-2 bg-primary text-white font-medium rounded-xl hover:bg-primary/90 transition-colors">
                Theo dõi
              </button>
              <button className="px-6 py-2 bg-secondary font-medium rounded-xl hover:bg-secondary/80 transition-colors">
                Nhắn tin
              </button>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="flex gap-8 py-4 border-y border-border/50 mb-8 overflow-x-auto hide-scrollbar">
            <div><span className="font-bold text-lg">{profile.followers.toLocaleString()}</span> <span className="text-muted-foreground">Người theo dõi</span></div>
            <div><span className="font-bold text-lg">{profile.following.toLocaleString()}</span> <span className="text-muted-foreground">Đang theo dõi</span></div>
            <div><span className="font-bold text-lg">45</span> <span className="text-muted-foreground">Tài nguyên</span></div>
            <div><span className="font-bold text-lg">12</span> <span className="text-muted-foreground">Bài viết</span></div>
          </div>

          {/* Main Content Area */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Sidebar */}
            <div className="space-y-6">
              {/* About Card */}
              <div className="bg-card rounded-2xl p-5 border border-border/50">
                <h3 className="font-bold text-lg mb-4">Giới thiệu</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Fullstack developer đam mê open source và chia sẻ kiến thức. Thường xuyên cập nhật các template và tool mới nhất.
                </p>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Lượt tải tài nguyên</span>
                    <span className="font-semibold">12,450</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Rating trung bình</span>
                    <span className="font-semibold text-yellow-500">4.9 ★</span>
                  </div>
                </div>
              </div>

              {/* Avatar Frames */}
              <div className="bg-card rounded-2xl p-5 border border-border/50">
                <h3 className="font-bold text-lg mb-4 text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">
                  Khung Avatar cá nhân
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {avatarFrames.map(frame => (
                    <div 
                      key={frame.id}
                      onClick={() => setActiveFrame(frame.id)}
                      className={cn(
                        "p-3 rounded-xl border text-center cursor-pointer transition-all",
                        activeFrame === frame.id ? "border-primary bg-primary/5" : "border-border/50 hover:bg-secondary/50"
                      )}
                    >
                      <div 
                        className="w-12 h-12 mx-auto rounded-full mb-2 p-1"
                        style={{ background: frame.image }}
                      >
                        <div className="w-full h-full bg-background rounded-full border-2 border-background"></div>
                      </div>
                      <div className="text-xs font-medium">{frame.name}</div>
                      {activeFrame === frame.id && <div className="text-[10px] text-primary mt-1">Đang dùng</div>}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Feed Area */}
            <div className="lg:col-span-2">
              <div className="flex gap-2 mb-6 border-b border-border/50">
                {["Bài viết", "Tài nguyên", "Reels", "Nhiệm vụ", "Đánh giá"].map(tab => (
                  <button 
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={cn(
                      "px-4 py-3 text-sm font-medium border-b-2 transition-colors",
                      activeTab === tab ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Fake Feed Content */}
              <div className="space-y-6">
                {feedPosts.filter(p => p.authorId === profile.id).map(post => (
                  <div key={post.id} className="bg-card rounded-2xl border border-border/50 p-5">
                    <div className="flex items-center gap-3 mb-4">
                      <img src={profile.avatar} alt="" className="w-10 h-10 rounded-full" />
                      <div>
                        <div className="font-semibold">{profile.name}</div>
                        <div className="text-xs text-muted-foreground">{post.timestamp}</div>
                      </div>
                    </div>
                    <p className="mb-4 text-sm">{post.content}</p>
                    {post.image && <img src={post.image} alt="" className="w-full rounded-xl mb-4" />}
                    <div className="text-sm text-muted-foreground">
                      {post.likes} Likes • {post.comments} Comments
                    </div>
                  </div>
                ))}
                {feedPosts.filter(p => p.authorId === profile.id).length === 0 && (
                  <div className="text-center py-12 text-muted-foreground">
                    Chưa có bài viết nào
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
