"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { avatarFrames, feedPosts, users } from "@/data/mockData";
import { Calendar, CheckCircle2, Link as LinkIcon, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ProfilePage() {
  const params = useParams<{ username: string }>();
  const profile = users.find((user) => user.username === params.username) || users[0];
  const [activeFrame, setActiveFrame] = useState(profile.frameId);
  const [activeTab, setActiveTab] = useState("Bài viết");
  const posts = feedPosts.filter((post) => post.authorId === profile.id);

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="relative">
        <div className="h-72 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&q=80&w=1800"
            alt=""
            className="h-full w-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/35 to-transparent" />
        </div>

        <div className="relative mx-auto -mt-24 max-w-5xl px-4">
          <div data-spotlight data-hue="172" className="artisan-card mb-8 p-5 md:p-6">
            <div className="flex flex-col gap-6 md:flex-row md:items-end">
              <div className="relative h-36 w-36 shrink-0">
                <div
                  className="absolute -inset-2 rounded-[12px]"
                  style={{ background: activeFrame ? avatarFrames.find((frame) => frame.id === activeFrame)?.image : "transparent" }}
                />
                <img src={profile.avatar} alt={profile.name} className="relative h-full w-full rounded-[10px] border-4 border-background object-cover" />
                {profile.badge && (
                  <div className="absolute bottom-2 right-2 rounded-[6px] border-2 border-background bg-blue-500 p-1 text-white">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                )}
              </div>

              <div className="flex-1">
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <h1 className="display-title text-4xl md:text-5xl">{profile.name}</h1>
                  {profile.badge && (
                    <span className="rounded-[6px] border border-blue-400/20 bg-blue-400/10 px-2 py-1 text-xs font-bold text-blue-300">
                      {profile.badge}
                    </span>
                  )}
                </div>
                <p className="mb-4 font-bold text-muted-foreground">@{profile.username}</p>
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  {profile.bio && <span>{profile.bio}</span>}
                  {profile.location && (
                    <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {profile.location}</span>
                  )}
                  {profile.website && (
                    <span className="flex items-center gap-1">
                      <LinkIcon className="h-4 w-4" />
                      <a href={profile.website} className="text-primary hover:underline">{new URL(profile.website).hostname}</a>
                    </span>
                  )}
                  <span className="flex items-center gap-1"><Calendar className="h-4 w-4" /> Tham gia Thg 5, 2026</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button data-magnetic className="btn-artisan px-5 py-3">Theo dõi</button>
                <button data-magnetic className="btn-quiet px-5 py-3 font-bold">Nhắn tin</button>
              </div>
            </div>
          </div>

          <div className="mb-8 grid grid-cols-2 gap-3 md:grid-cols-4">
            {[
              ["Người theo dõi", profile.followers.toLocaleString()],
              ["Đang theo dõi", profile.following.toLocaleString()],
              ["Tài nguyên", "45"],
              ["Bài viết", "12"],
            ].map(([label, value]) => (
              <div key={label} className="artisan-card p-4">
                <div className="text-2xl font-extrabold">{value}</div>
                <div className="text-sm font-bold text-muted-foreground">{label}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[18rem_1fr]">
            <aside className="space-y-6">
              <div data-spotlight data-hue="28" className="artisan-card p-5">
                <h3 className="mb-4 text-lg font-extrabold">Giới thiệu</h3>
                <p className="mb-4 text-sm leading-6 text-muted-foreground">
                  Fullstack developer đam mê open source và chia sẻ kiến thức. Thường xuyên cập nhật template và tool mới.
                </p>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">Lượt tải</span><span className="font-bold">12,450</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Rating</span><span className="font-bold text-amber-300">4.9 sao</span></div>
                </div>
              </div>

              <div data-spotlight data-hue="322" className="artisan-card p-5">
                <h3 className="mb-4 text-lg font-extrabold">Khung Avatar</h3>
                <div className="grid grid-cols-2 gap-3">
                  {avatarFrames.map((frame) => (
                    <button
                      key={frame.id}
                      onClick={() => setActiveFrame(frame.id)}
                      className={cn(
                        "rounded-[8px] border p-3 text-center transition-colors",
                        activeFrame === frame.id ? "border-primary bg-primary/10" : "border-white/5 hover:bg-white/[0.04]"
                      )}
                    >
                      <div className="mx-auto mb-2 h-12 w-12 rounded-[8px] p-1" style={{ background: frame.image }}>
                        <div className="h-full w-full rounded-[6px] bg-background" />
                      </div>
                      <div className="text-xs font-bold">{frame.name}</div>
                    </button>
                  ))}
                </div>
              </div>
            </aside>

            <main>
              <div className="hide-scrollbar mb-6 flex gap-2 overflow-x-auto border-b border-white/5 pb-2">
                {["Bài viết", "Tài nguyên", "Reels", "Nhiệm vụ", "Đánh giá"].map((tab) => (
                  <button
                    data-magnetic
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={cn("px-4 py-2 text-sm font-bold", activeTab === tab ? "btn-artisan" : "btn-quiet")}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="space-y-6">
                {posts.map((post) => (
                  <article key={post.id} data-spotlight data-hue="172" className="artisan-card p-5">
                    <div className="mb-4 flex items-center gap-3">
                      <img src={profile.avatar} alt={profile.name} className="h-10 w-10 rounded-[8px] object-cover" />
                      <div>
                        <div className="font-extrabold">{profile.name}</div>
                        <div className="text-xs text-muted-foreground">{post.timestamp}</div>
                      </div>
                    </div>
                    <p className="mb-4 text-sm leading-7">{post.content}</p>
                    {post.image && <img src={post.image} alt="" className="mb-4 w-full rounded-[8px]" />}
                    <div className="text-sm font-bold text-muted-foreground">{post.likes} Likes · {post.comments} Comments</div>
                  </article>
                ))}
                {posts.length === 0 && (
                  <div className="artisan-card p-12 text-center font-bold text-muted-foreground">Chưa có bài viết nào</div>
                )}
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
