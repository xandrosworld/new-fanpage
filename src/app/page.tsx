import Link from "next/link";
import {
  ArrowRight,
  Code2,
  Play,
  Search,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";
import { resources, blogPosts, reels, tasks, users } from "@/data/mockData";
import { ResourceCard } from "@/components/cards/ResourceCard";
import { ReelsCard } from "@/components/cards/ReelsCard";
import { TaskCard } from "@/components/cards/TaskCard";
import { BlogCard } from "@/components/cards/BlogCard";

export default function Home() {
  const featuredResources = resources.slice(0, 5);
  const hotReels = reels.slice(0, 4);
  const topTasks = tasks.slice(0, 3);
  const latestBlogs = blogPosts.slice(0, 4);

  return (
    <div className="flex min-h-screen flex-col pb-20">
      <section className="relative min-h-[calc(100vh-4rem)] overflow-hidden px-4 pb-16 pt-24 md:pt-28">
        <img
          src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=82&w=2200"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-28"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,hsl(222_34%_5%/0.96),hsl(222_34%_5%/0.74)_52%,hsl(222_34%_5%/0.52))]" />

        <div className="relative z-10 mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
          <div className="max-w-4xl pt-10 md:pt-20">
            <div className="section-kicker mb-6">
              <Sparkles className="h-4 w-4" />
              Hai không gian bán riêng cho creator và developer
            </div>

            <h1 className="display-title max-w-5xl text-5xl text-white md:text-7xl lg:text-8xl">
              Marketplace tài nguyên và MXH creator, tách bạch nhưng chung một gu.
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/72 md:text-xl">
              ResourceHub không trộn mọi thứ vào một feed ồn ào: tài nguyên số là một boutique marketplace riêng, còn MXH creator là không gian kết nối, chia sẻ và xây dựng uy tín riêng.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link
                data-magnetic
                href="/resources"
                className="btn-artisan px-7 py-4 text-base"
              >
                <Code2 className="h-5 w-5" />
                Vào marketplace
              </Link>
              <Link
                data-magnetic
                href="/community"
                className="btn-quiet px-7 py-4 text-base font-extrabold text-white"
              >
                <Users className="h-5 w-5" />
                Mở MXH creator
              </Link>
            </div>

            <div className="mt-8 grid max-w-2xl gap-3 sm:grid-cols-2">
              <Link href="/resources" className="commerce-plate group rounded-[8px] p-4">
                <div className="mb-5 flex items-center justify-between">
                  <Code2 className="h-5 w-5 text-primary" />
                  <ArrowRight className="h-4 w-4 text-white/40 transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                </div>
                <div className="font-extrabold text-white">Tài nguyên bán riêng</div>
                <p className="mt-2 text-sm leading-6 text-white/60">
                  Source, template, UI kit và script được đặt như sản phẩm thương mại.
                </p>
              </Link>
              <Link href="/community" className="social-plate group rounded-[8px] p-4">
                <div className="mb-5 flex items-center justify-between">
                  <Users className="h-5 w-5 text-accent" />
                  <ArrowRight className="h-4 w-4 text-white/40 transition-transform group-hover:translate-x-1 group-hover:text-accent" />
                </div>
                <div className="font-extrabold text-white">MXH bán riêng</div>
                <p className="mt-2 text-sm leading-6 text-white/60">
                  Feed, profile, nhóm và tương tác creator tách khỏi khu mua bán.
                </p>
              </Link>
            </div>

            <div className="mt-12 max-w-2xl">
              <div className="glass flex items-center gap-3 rounded-[8px] p-2">
                <Search className="ml-3 h-5 w-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Tìm source code, template, bài viết, người dùng..."
                  className="min-w-0 flex-1 bg-transparent px-2 py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground md:text-base"
                />
                <button data-magnetic className="btn-artisan px-5 py-3 text-sm">
                  Tìm kiếm
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-6 gap-3 pb-4 lg:pb-10">
            {[
              { label: "Sản phẩm số", value: "12K+", span: "col-span-4", hue: "172" },
              { label: "Creator", value: "3.5K", span: "col-span-2", hue: "28" },
              { label: "Nhiệm vụ xong", value: "2.4K", span: "col-span-3", hue: "322" },
              { label: "Feed MXH", value: "180", span: "col-span-3", hue: "44" },
            ].map((stat) => (
              <div
                key={stat.label}
                data-spotlight
                data-hue={stat.hue}
                className={`artisan-card reveal-up p-5 ${stat.span}`}
              >
                <div className="text-3xl font-extrabold text-white md:text-4xl">{stat.value}</div>
                <div className="mt-2 text-xs font-bold uppercase text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-20">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <div className="section-kicker mb-3">
              <TrendingUp className="h-4 w-4" />
              Curated drop
            </div>
            <h2 className="display-title text-4xl md:text-6xl">Marketplace tài nguyên</h2>
          </div>
          <Link
            data-magnetic
            href="/resources"
            className="btn-quiet hidden items-center gap-2 px-4 py-3 text-sm font-bold sm:flex"
          >
            Xem tất cả <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="bento-grid stagger-children">
          {featuredResources.map((resource, index) => (
            <ResourceCard
              key={resource.id}
              index={index}
              resource={resource}
              user={users.find((u) => u.id === resource.authorId)}
              className={
                index === 0
                  ? "md:col-span-4 lg:col-span-3"
                  : index === 1
                    ? "md:col-span-2 lg:col-span-3"
                    : "md:col-span-2"
              }
              mediaClassName={index === 0 ? "md:aspect-[16/9]" : undefined}
            />
          ))}
        </div>
      </section>

      <section className="border-y border-white/5 bg-white/[0.025] py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 lg:grid-cols-[1.25fr_0.75fr]">
          <div>
            <div className="mb-8 flex items-end justify-between gap-4">
              <div>
                <div className="section-kicker mb-3">
                  <Play className="h-4 w-4 fill-current" />
                  Video ngắn
                </div>
                <h2 className="display-title text-4xl md:text-5xl">MXH đang lên</h2>
              </div>
              <Link href="/reels" className="text-sm font-bold text-primary hover:underline">
                Xem thêm
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {hotReels.map((reel, index) => (
                <ReelsCard
                  key={reel.id}
                  index={index}
                  reel={reel}
                  user={users.find((u) => u.id === reel.authorId)}
                />
              ))}
            </div>
          </div>

          <div>
            <div className="mb-8">
              <div className="section-kicker mb-3">Reward board</div>
              <h2 className="display-title text-4xl md:text-5xl">Nhiệm vụ hot</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Các nhiệm vụ được chọn để người mới có thể bắt đầu nhanh mà vẫn có phần thưởng rõ ràng.
              </p>
            </div>
            <div className="space-y-4">
              {topTasks.map((task, index) => (
                <TaskCard key={task.id} index={index} task={task} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-24">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <div className="section-kicker mb-3">Field notes</div>
            <h2 className="display-title text-4xl md:text-6xl">Bài viết mới nhất</h2>
          </div>
          <Link
            data-magnetic
            href="/blog"
            className="btn-quiet hidden items-center gap-2 px-4 py-3 text-sm font-bold sm:flex"
          >
            Đọc tất cả <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="masonry-grid">
          {latestBlogs.map((post, index) => (
            <BlogCard
              key={post.id}
              index={index}
              post={post}
              user={users.find((u) => u.id === post.authorId)}
              mediaClassName={index === 1 ? "aspect-[4/5]" : index === 2 ? "aspect-[1/1]" : undefined}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
