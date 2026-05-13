import { feedPosts, users, resources, tasks } from "@/data/mockData";
import { Image, Code, FileText, Send, Heart, MessageCircle, Share2, MoreHorizontal, Link as LinkIcon, TrendingUp } from "lucide-react";
import Link from "next/link";

export default function CommunityPage() {
  const currentUser = users[0];

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Sidebar */}
        <div className="hidden lg:block space-y-6">
          <div className="bg-card rounded-2xl p-4 border border-border/50">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border/50">
              <img src={currentUser.avatar} alt="Avatar" className="w-12 h-12 rounded-full ring-2 ring-primary/20" />
              <div>
                <h3 className="font-semibold">{currentUser.name}</h3>
                <p className="text-xs text-muted-foreground">@{currentUser.username}</p>
              </div>
            </div>
            <nav className="space-y-1">
              {[
                { name: "Bảng tin", active: true },
                { name: "Nhóm của tôi" },
                { name: "Tài nguyên đã lưu" },
                { name: "Reels đã lưu" },
                { name: "Nhiệm vụ đang làm" },
                { name: "Người đang theo dõi" },
              ].map(item => (
                <button key={item.name} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${item.active ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-secondary hover:text-foreground'}`}>
                  {item.name}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Feed */}
        <div className="lg:col-span-2 space-y-6">
          {/* Composer */}
          <div className="bg-card rounded-2xl p-4 border border-border/50 shadow-sm">
            <div className="flex gap-3 mb-4">
              <img src={currentUser.avatar} alt="Avatar" className="w-10 h-10 rounded-full" />
              <textarea 
                placeholder="Bạn muốn chia sẻ gì với cộng đồng?"
                className="flex-1 bg-secondary/30 rounded-xl px-4 py-2.5 outline-none resize-none h-12 min-h-[3rem] focus:min-h-[6rem] transition-all border border-transparent focus:border-primary/30"
              />
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-border/50">
              <div className="flex items-center gap-1">
                <button className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-colors tooltip" title="Thêm ảnh">
                  <Image className="w-5 h-5" />
                </button>
                <button className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-colors" title="Thêm code">
                  <Code className="w-5 h-5" />
                </button>
                <button className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-colors" title="Thêm file">
                  <FileText className="w-5 h-5" />
                </button>
              </div>
              <button className="px-4 py-1.5 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 flex items-center gap-2 text-sm shadow-sm">
                Đăng bài
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Posts Feed */}
          {feedPosts.map(post => {
            const author = users.find(u => u.id === post.authorId);
            return (
              <div key={post.id} className="bg-card rounded-2xl border border-border/50 overflow-hidden shadow-sm">
                <div className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Link href={`/profile/${author?.username}`}>
                        <img src={author?.avatar} alt={author?.name} className="w-10 h-10 rounded-full hover:ring-2 hover:ring-primary/50 transition-all" />
                      </Link>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <Link href={`/profile/${author?.username}`} className="font-semibold hover:underline">
                            {author?.name}
                          </Link>
                          {author?.badge && (
                            <span className="px-1.5 py-0.5 bg-blue-500/10 text-blue-500 text-[10px] font-bold rounded">
                              PRO
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-muted-foreground">{post.timestamp}</div>
                      </div>
                    </div>
                    <button className="p-2 text-muted-foreground hover:bg-secondary rounded-full">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </div>

                  <p className="mb-4 whitespace-pre-line text-sm">{post.content}</p>

                  {post.tags && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map(tag => (
                        <span key={tag} className="text-xs text-primary bg-primary/10 px-2 py-1 rounded-md font-medium hover:bg-primary/20 cursor-pointer">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {post.image && (
                  <div className="w-full bg-secondary/20 border-y border-border/50">
                    <img src={post.image} alt="Post image" className="w-full max-h-96 object-cover" />
                  </div>
                )}

                <div className="p-2 px-4 border-t border-border/50 flex items-center justify-between bg-secondary/10">
                  <div className="flex items-center gap-1">
                    <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors text-sm font-medium group">
                      <Heart className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      {post.likes}
                    </button>
                    <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-muted-foreground hover:bg-secondary transition-colors text-sm font-medium">
                      <MessageCircle className="w-4 h-4" />
                      {post.comments}
                    </button>
                  </div>
                  <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-muted-foreground hover:bg-secondary transition-colors text-sm font-medium">
                    <Share2 className="w-4 h-4" />
                    Share
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Sidebar */}
        <div className="hidden lg:block space-y-6">
          <div className="bg-card rounded-2xl p-4 border border-border/50">
            <h3 className="font-semibold mb-4 pb-2 border-b border-border/50 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              Chủ đề nổi bật
            </h3>
            <div className="space-y-3">
              {["#Nodejs", "#Nextjs14", "#React", "#Automation", "#Marketplace"].map(tag => (
                <div key={tag} className="flex items-center justify-between text-sm group cursor-pointer">
                  <span className="font-medium group-hover:text-primary transition-colors">{tag}</span>
                  <span className="text-xs text-muted-foreground">1.2k posts</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card rounded-2xl p-4 border border-border/50">
            <h3 className="font-semibold mb-4 pb-2 border-b border-border/50">Nhiệm vụ thưởng cao</h3>
            <div className="space-y-4">
              {tasks.filter(t => t.badge === "Thưởng cao").map(task => (
                <Link key={task.id} href="/tasks" className="block group">
                  <div className="text-sm font-medium group-hover:text-primary transition-colors mb-1 line-clamp-2">{task.title}</div>
                  <div className="text-xs font-bold text-green-500">+{task.reward.toLocaleString()}đ</div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
