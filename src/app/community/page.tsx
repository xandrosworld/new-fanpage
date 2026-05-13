import { feedPosts, users, tasks } from "@/data/mockData";
import {
  Code,
  FileText,
  Heart,
  Image,
  MessageCircle,
  MoreHorizontal,
  Send,
  Share2,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";

export default function CommunityPage() {
  const currentUser = users[0];

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10">
      <header className="mb-10 grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
        <div>
          <div className="section-kicker mb-4">Community lounge</div>
          <h1 className="display-title text-5xl md:text-7xl">Cộng đồng</h1>
        </div>
        <p className="max-w-2xl text-lg leading-8 text-muted-foreground lg:justify-self-end">
          Một bảng tin gọn và có chất liệu để creator chia sẻ source, hỏi kinh nghiệm và tìm cộng tác viên.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[17rem_1fr_18rem]">
        <aside className="hidden space-y-6 lg:block">
          <div data-spotlight data-hue="172" className="artisan-card p-4">
            <div className="mb-5 flex items-center gap-3 border-b border-white/5 pb-4">
              <img src={currentUser.avatar} alt={currentUser.name} className="h-12 w-12 rounded-[8px] object-cover" />
              <div>
                <h3 className="font-extrabold">{currentUser.name}</h3>
                <p className="text-xs text-muted-foreground">@{currentUser.username}</p>
              </div>
            </div>
            <nav className="space-y-1">
              {["Bảng tin", "Nhóm của tôi", "Tài nguyên đã lưu", "Reels đã lưu", "Nhiệm vụ đang làm"].map((item, index) => (
                <button
                  data-magnetic
                  key={item}
                  className={`w-full rounded-[8px] px-3 py-3 text-left text-sm font-bold transition-colors ${
                    index === 0 ? "border border-primary/20 bg-primary/10 text-primary" : "text-muted-foreground hover:bg-white/[0.04] hover:text-foreground"
                  }`}
                >
                  {item}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        <main className="space-y-6">
          <div data-spotlight data-hue="28" className="artisan-card p-4">
            <div className="mb-4 flex gap-3">
              <img src={currentUser.avatar} alt={currentUser.name} className="h-10 w-10 rounded-[8px] object-cover" />
              <textarea
                placeholder="Bạn muốn chia sẻ gì với cộng đồng?"
                className="min-h-12 flex-1 resize-none rounded-[8px] border border-white/5 bg-white/[0.035] px-4 py-3 text-sm outline-none transition-all focus:min-h-28 focus:border-primary/30"
              />
            </div>
            <div className="flex items-center justify-between border-t border-white/5 pt-3">
              <div className="flex items-center gap-1">
                {[
                  { icon: Image, title: "Thêm ảnh" },
                  { icon: Code, title: "Thêm code" },
                  { icon: FileText, title: "Thêm file" },
                ].map((item) => (
                  <button data-magnetic key={item.title} className="btn-quiet flex h-9 w-9 items-center justify-center text-muted-foreground" title={item.title}>
                    <item.icon className="h-5 w-5" />
                  </button>
                ))}
              </div>
              <button data-magnetic className="btn-artisan px-4 py-2 text-sm">
                Đăng bài <Send className="h-4 w-4" />
              </button>
            </div>
          </div>

          {feedPosts.map((post, index) => {
            const author = users.find((user) => user.id === post.authorId);
            return (
              <article key={post.id} data-spotlight data-hue={index % 2 ? "322" : "172"} className="artisan-card reveal-up overflow-hidden">
                <div className="p-5">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Link href={`/profile/${author?.username}`}>
                        <img src={author?.avatar} alt={author?.name} className="h-10 w-10 rounded-[8px] object-cover" />
                      </Link>
                      <div>
                        <Link href={`/profile/${author?.username}`} className="font-extrabold hover:text-primary">
                          {author?.name}
                        </Link>
                        <div className="text-xs text-muted-foreground">{post.timestamp}</div>
                      </div>
                    </div>
                    <button data-magnetic className="btn-quiet flex h-9 w-9 items-center justify-center text-muted-foreground">
                      <MoreHorizontal className="h-5 w-5" />
                    </button>
                  </div>

                  <p className="mb-4 whitespace-pre-line text-sm leading-7">{post.content}</p>

                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span key={tag} className="rounded-[6px] border border-primary/10 bg-primary/10 px-2 py-1 text-xs font-bold text-primary">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {post.image && (
                  <div className="border-y border-white/5 bg-white/[0.02]">
                    <img src={post.image} alt="Post" className="max-h-[28rem] w-full object-cover" />
                  </div>
                )}

                <div className="flex items-center justify-between p-3 px-5">
                  <div className="flex items-center gap-1">
                    <button data-magnetic className="btn-quiet flex items-center gap-2 px-3 py-2 text-sm font-bold text-muted-foreground hover:text-primary">
                      <Heart className="h-4 w-4" />
                      {post.likes}
                    </button>
                    <button data-magnetic className="btn-quiet flex items-center gap-2 px-3 py-2 text-sm font-bold text-muted-foreground">
                      <MessageCircle className="h-4 w-4" />
                      {post.comments}
                    </button>
                  </div>
                  <button data-magnetic className="btn-quiet flex items-center gap-2 px-3 py-2 text-sm font-bold text-muted-foreground">
                    <Share2 className="h-4 w-4" />
                    Share
                  </button>
                </div>
              </article>
            );
          })}
        </main>

        <aside className="hidden space-y-6 lg:block">
          <div data-spotlight data-hue="28" className="artisan-card p-5">
            <h3 className="mb-4 flex items-center gap-2 border-b border-white/5 pb-3 font-extrabold">
              <TrendingUp className="h-4 w-4 text-primary" />
              Chủ đề nổi bật
            </h3>
            <div className="space-y-3">
              {["#Nodejs", "#Nextjs", "#React", "#Automation", "#Marketplace"].map((tag) => (
                <div key={tag} className="flex items-center justify-between text-sm">
                  <span className="font-bold">{tag}</span>
                  <span className="text-xs text-muted-foreground">1.2k posts</span>
                </div>
              ))}
            </div>
          </div>

          <div data-spotlight data-hue="172" className="artisan-card p-5">
            <h3 className="mb-4 border-b border-white/5 pb-3 font-extrabold">Nhiệm vụ thưởng cao</h3>
            <div className="space-y-4">
              {tasks.filter((task) => task.badge === "Thưởng cao").map((task) => (
                <Link key={task.id} href="/tasks" className="block group">
                  <div className="mb-1 text-sm font-bold leading-5 transition-colors group-hover:text-primary line-clamp-2">
                    {task.title}
                  </div>
                  <div className="text-xs font-extrabold text-primary">+{task.reward.toLocaleString()}đ</div>
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
