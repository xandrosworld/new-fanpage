import Link from "next/link";
import { ArrowRight, Search, Play, Users, Code2, Sparkles, TrendingUp } from "lucide-react";
import { resources, blogPosts, reels, tasks, users } from "@/data/mockData";
import { ResourceCard } from "@/components/cards/ResourceCard";
import { ReelsCard } from "@/components/cards/ReelsCard";
import { TaskCard } from "@/components/cards/TaskCard";
import { BlogCard } from "@/components/cards/BlogCard";

export default function Home() {
  const featuredResources = resources.slice(0, 4);
  const hotReels = reels.slice(0, 4);
  const topTasks = tasks.slice(0, 3);
  const latestBlogs = blogPosts.slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen pb-20">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 inset-x-0 h-[500px] overflow-hidden -z-10">
          <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[100%] rounded-full bg-primary/20 blur-[120px]" />
          <div className="absolute top-[20%] -right-[10%] w-[40%] h-[80%] rounded-full bg-purple-500/20 blur-[120px]" />
        </div>

        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6 border border-primary/20">
            <Sparkles className="w-4 h-4" />
            <span>Nền tảng số 1 dành cho Creator & Developer</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 max-w-4xl mx-auto leading-tight">
            Chia sẻ mã nguồn, tài nguyên MXH và <span className="gradient-text">cộng đồng creator</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Khám phá source code, template, tool, blog, reels, nhiệm vụ kiếm tiền và kết nối với cộng đồng trong một không gian hiện đại.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link href="/resources" className="w-full sm:w-auto px-8 py-4 bg-primary text-primary-foreground hover:bg-primary/90 rounded-full font-semibold transition-all shadow-lg shadow-primary/30 flex items-center justify-center gap-2 text-lg">
              <Code2 className="w-5 h-5" />
              Khám phá tài nguyên
            </Link>
            <Link href="/community" className="w-full sm:w-auto px-8 py-4 bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-full font-semibold transition-all flex items-center justify-center gap-2 text-lg">
              <Users className="w-5 h-5" />
              Vào cộng đồng
            </Link>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary via-purple-500 to-pink-500 rounded-full blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative flex items-center glass rounded-full p-2">
              <Search className="w-6 h-6 text-muted-foreground ml-4" />
              <input 
                type="text" 
                placeholder="Tìm source code, template, bài viết, người dùng, nhiệm vụ..." 
                className="flex-1 bg-transparent border-none outline-none px-4 py-3 text-foreground placeholder:text-muted-foreground"
              />
              <button className="px-6 py-2 bg-primary text-white rounded-full font-medium">Tìm kiếm</button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-10 border-y border-border/50 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-border/50">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-foreground mb-2">12,000+</div>
              <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Tài nguyên</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-foreground mb-2">3,500+</div>
              <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Thành viên</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-foreground mb-2">2,400+</div>
              <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Nhiệm vụ xong</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-foreground mb-2">180+</div>
              <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Reels</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Resources */}
      <section className="py-20 container mx-auto px-4">
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="flex items-center gap-2 text-primary font-medium mb-2">
              <TrendingUp className="w-5 h-5" />
              <span>Trending</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">Tài nguyên nổi bật</h2>
          </div>
          <Link href="/resources" className="hidden sm:flex items-center gap-2 text-primary font-medium hover:underline">
            Xem tất cả <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredResources.map(resource => (
            <ResourceCard 
              key={resource.id} 
              resource={resource} 
              user={users.find(u => u.id === resource.authorId)} 
            />
          ))}
        </div>
      </section>

      {/* Reels & Tasks */}
      <section className="py-20 bg-secondary/20 border-y border-border/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Hot Reels */}
            <div className="lg:col-span-2">
              <div className="flex items-end justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-bold mb-2 flex items-center gap-2">
                    <Play className="w-6 h-6 text-primary fill-primary" />
                    Reels đang hot
                  </h2>
                  <p className="text-muted-foreground">Video ngắn về công nghệ và kiếm tiền</p>
                </div>
                <Link href="/reels" className="text-primary font-medium hover:underline text-sm">Xem thêm</Link>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {hotReels.map(reel => (
                  <ReelsCard key={reel.id} reel={reel} user={users.find(u => u.id === reel.authorId)} />
                ))}
              </div>
            </div>

            {/* Top Tasks */}
            <div>
              <div className="flex items-end justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-bold mb-2">Nhiệm vụ hot</h2>
                  <p className="text-muted-foreground">Hoàn thành để nhận tiền thưởng</p>
                </div>
                <Link href="/tasks" className="text-primary font-medium hover:underline text-sm">Tất cả</Link>
              </div>
              <div className="flex flex-col gap-4">
                {topTasks.map(task => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process / How it works */}
      <section className="py-24 container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Quy trình đơn giản</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Tham gia và bắt đầu kiếm tiền cùng cộng đồng MXH Resource Hub chỉ với 4 bước</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-border z-0">
            <div className="h-full bg-primary w-1/3"></div>
          </div>
          
          {[
            { step: 1, title: "Tạo tài khoản", desc: "Đăng ký miễn phí và xác thực hồ sơ creator của bạn" },
            { step: 2, title: "Khám phá tài nguyên", desc: "Tải source code, tool và tham gia thảo luận cộng đồng" },
            { step: 3, title: "Làm nhiệm vụ", desc: "Xem reels, chia sẻ bài viết để nhận thưởng" },
            { step: 4, title: "Rút tiền về ví", desc: "Rút tiền thưởng về tài khoản ngân hàng hoặc Momo" },
          ].map((item) => (
            <div key={item.step} className="relative z-10 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-card border-4 border-background flex items-center justify-center text-xl font-bold shadow-lg text-primary mb-6 ring-2 ring-primary/20">
                {item.step}
              </div>
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-muted-foreground text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Latest Blog */}
      <section className="py-20 container mx-auto px-4">
        <div className="flex items-end justify-between mb-10">
          <h2 className="text-3xl md:text-4xl font-bold">Bài viết mới nhất</h2>
          <Link href="/blog" className="hidden sm:flex items-center gap-2 text-primary font-medium hover:underline">
            Đọc tất cả blog <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {latestBlogs.map(post => (
            <BlogCard key={post.id} post={post} user={users.find(u => u.id === post.authorId)} />
          ))}
        </div>
      </section>
    </div>
  );
}
