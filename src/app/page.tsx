import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Code2,
  Heart,
  MessageCircle,
  Newspaper,
  Play,
  Search,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";
import {
  blogPosts,
  feedPosts,
  reels,
  resources,
  tasks,
  users,
} from "@/data/mockData";
import { ResourceCard } from "@/components/cards/ResourceCard";
import { ReelsCard } from "@/components/cards/ReelsCard";
import { TaskCard } from "@/components/cards/TaskCard";
import { BlogCard } from "@/components/cards/BlogCard";

export default function Home() {
  const featuredResources = resources.slice(0, 5);
  const hotReels = reels.slice(0, 4);
  const topTasks = tasks.slice(0, 3);
  const latestBlogs = blogPosts.slice(0, 4);
  const editorialNotes = blogPosts.slice(4, 7);
  const communityPulse = feedPosts.slice(0, 2);
  const findUser = (userId: string) => users.find((user) => user.id === userId);
  const trendingTopics = Array.from(
    new Set([
      ...communityPulse.flatMap((post) => post.tags),
      ...editorialNotes.flatMap((post) => post.tags),
    ])
  ).slice(0, 5);
  const totalReelLikes = hotReels.reduce((sum, reel) => sum + reel.likes, 0);
  const averageTaskReward = Math.round(
    topTasks.reduce((sum, task) => sum + task.reward, 0) / topTasks.length
  );
  const formatCompactNumber = (value: number) =>
    value >= 1000 ? `${(value / 1000).toFixed(1)}K` : `${value}`;

  return (
    <div className="flex min-h-screen flex-col pb-20">
      <section className="relative overflow-hidden px-4 pb-16 pt-12 md:pt-16">
        <img
          src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=82&w=2200"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-28"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,hsl(222_34%_5%/0.96),hsl(222_34%_5%/0.74)_52%,hsl(222_34%_5%/0.52))]" />

        <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <div className="max-w-4xl">
            <div className="section-kicker mb-6">
              <Sparkles className="h-4 w-4" />
              Hai không gian bán riêng cho creator và developer
            </div>

            <h1 className="display-title max-w-5xl text-5xl text-white md:text-7xl lg:text-8xl">
              Marketplace tài nguyên và MXH creator, tách bạch nhưng chung một gu.
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/72 md:text-xl">
              ResourceHub không trộn mọi thứ vào một feed ồn ào: tài nguyên số là một
              boutique marketplace riêng, còn MXH creator là không gian kết nối, chia
              sẻ và xây dựng uy tín riêng.
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
                <div className="text-3xl font-extrabold text-white md:text-4xl">
                  {stat.value}
                </div>
                <div className="mt-2 text-xs font-bold uppercase text-muted-foreground">
                  {stat.label}
                </div>
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
              user={findUser(resource.authorId)}
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
        <div className="mx-auto grid max-w-7xl gap-12 px-4 lg:grid-cols-[minmax(0,1.08fr)_minmax(22rem,0.92fr)]">
          <div className="space-y-6">
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
                    user={findUser(reel.authorId)}
                  />
                ))}
              </div>
            </div>

            <div className="grid gap-4 xl:grid-cols-[minmax(0,1.02fr)_minmax(18rem,0.98fr)]">
              <div data-spotlight data-hue="172" className="artisan-card reveal-up p-6">
                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <div className="section-kicker mb-3">
                      <Users className="h-4 w-4" />
                      Community pulse
                    </div>
                    <h3 className="max-w-[12ch] text-3xl font-bold leading-[1.02] text-white sm:text-4xl">
                      Nhịp cộng đồng
                    </h3>
                    <p className="mt-3 max-w-[32ch] text-sm leading-6 text-muted-foreground">
                      Hai cuộc trao đổi có tín hiệu tốt để người vào sau vẫn bắt được nhịp
                      của feed.
                    </p>
                  </div>
                  <Link
                    data-magnetic
                    href="/community"
                    className="btn-quiet hidden h-10 shrink-0 items-center gap-2 whitespace-nowrap px-3 text-xs font-bold sm:inline-flex"
                  >
                    Mở feed <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>

                <div className="space-y-5">
                  {communityPulse.map((post) => {
                    const author = findUser(post.authorId);

                    return (
                      <article
                        key={post.id}
                        className="border-t border-white/5 pt-5 first:border-t-0 first:pt-0"
                      >
                        <div className="flex items-center gap-3">
                          {author && (
                            <img
                              src={author.avatar}
                              alt={author.name}
                              className="h-10 w-10 rounded-[8px] object-cover"
                            />
                          )}
                          <div className="min-w-0">
                            <div className="truncate text-sm font-bold text-white">
                              {author?.name}
                            </div>
                            <div className="text-xs font-semibold text-muted-foreground">
                              {post.timestamp}
                            </div>
                          </div>
                        </div>

                        <p className="mt-4 max-w-[58ch] text-sm leading-6 text-foreground/84 line-clamp-3">
                          {post.content}
                        </p>

                        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                          <div className="flex flex-wrap gap-2">
                            {post.tags.slice(0, 2).map((tag) => (
                              <span
                                key={tag}
                                className="rounded-[6px] border border-white/8 bg-white/[0.03] px-2.5 py-1 text-[11px] font-bold text-muted-foreground"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>

                          <div className="flex items-center gap-3 text-xs font-bold text-muted-foreground">
                            <span className="inline-flex items-center gap-1">
                              <Heart className="h-3.5 w-3.5 text-primary" />
                              {formatCompactNumber(post.likes)}
                            </span>
                            <span className="inline-flex items-center gap-1">
                              <MessageCircle className="h-3.5 w-3.5 text-accent" />
                              {post.comments}
                            </span>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>

              <div data-spotlight data-hue="44" className="artisan-card reveal-up p-6">
                <div className="section-kicker mb-3">
                  <Sparkles className="h-4 w-4" />
                  Tactic board
                </div>
                <h3 className="max-w-[12ch] text-3xl font-bold leading-[1.02] text-white sm:text-4xl">
                  Tâm điểm hôm nay
                </h3>
                <p className="mt-3 max-w-[34ch] text-sm leading-6 text-muted-foreground">
                  Nhìn nhanh những mảng đang kéo tương tác và phần thưởng để người mới có
                  thể chọn đúng lane ngay khi vào hệ sinh thái.
                </p>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-[8px] border border-white/7 bg-white/[0.03] p-4">
                    <div className="text-[10px] font-bold uppercase leading-[1.2] text-muted-foreground">
                      Lượt tim reels
                    </div>
                    <div className="mt-3 text-2xl font-extrabold text-white">
                      {formatCompactNumber(totalReelLikes)}
                    </div>
                  </div>
                  <div className="rounded-[8px] border border-white/7 bg-white/[0.03] p-4">
                    <div className="text-[10px] font-bold uppercase leading-[1.2] text-muted-foreground">
                      Thưởng trung bình
                    </div>
                    <div className="mt-3 text-2xl font-extrabold text-white">
                      +{averageTaskReward.toLocaleString("vi-VN")}đ
                    </div>
                  </div>
                </div>

                <div className="premium-rule my-6" />

                <div>
                  <div className="mb-3 text-[11px] font-bold uppercase text-muted-foreground">
                    Chủ đề đang nổi
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {trendingTopics.map((topic) => (
                      <span
                        key={topic}
                        className="rounded-[6px] border border-white/8 bg-white/[0.03] px-2.5 py-1 text-xs font-bold text-foreground/80"
                      >
                        #{topic}
                      </span>
                    ))}
                  </div>
                </div>

                <Link
                  data-magnetic
                  href="/tasks"
                  className="btn-quiet mt-6 flex w-full items-center justify-center gap-2 px-4 py-3 text-sm font-bold"
                >
                  Xem bảng nhiệm vụ <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>

          <div>
            <div className="mb-8">
              <div className="section-kicker mb-3">Reward board</div>
              <h2 className="display-title text-4xl md:text-5xl">Nhiệm vụ hot</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Các nhiệm vụ được chọn để người mới có thể bắt đầu nhanh mà vẫn có phần
                thưởng rõ ràng.
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

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.08fr)_minmax(21rem,0.92fr)]">
          <BlogCard
            key={latestBlogs[0].id}
            index={0}
            post={latestBlogs[0]}
            user={findUser(latestBlogs[0].authorId)}
            className="h-full"
            mediaClassName="aspect-[16/10] md:aspect-[16/9]"
          />

          <div data-spotlight data-hue="322" className="artisan-card reveal-up p-6">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <div className="section-kicker mb-3">
                  <Newspaper className="h-4 w-4" />
                  Editorial desk
                </div>
                <h3 className="text-2xl font-bold text-white md:text-3xl">
                  Playbook đang đáng đọc
                </h3>
              </div>
              <Link
                data-magnetic
                href="/blog"
                className="btn-quiet hidden h-10 items-center gap-2 px-3 text-xs font-bold sm:flex"
              >
                Archive <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <p className="text-sm leading-6 text-muted-foreground">
              Một lane riêng cho bài dài, case study và hướng dẫn có thể đọc ngay trong
              giờ làm, không bị trôi như feed.
            </p>

            <div className="mt-6 space-y-5">
              {editorialNotes.map((post) => {
                const author = findUser(post.authorId);

                return (
                  <Link
                    key={post.id}
                    href={`/blog/${post.id}`}
                    className="group block border-t border-white/5 pt-5 first:border-t-0 first:pt-0"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <div className="mb-2 inline-flex rounded-[6px] border border-white/8 bg-white/[0.03] px-2.5 py-1 text-[11px] font-bold text-primary">
                          {post.category}
                        </div>
                        <h3 className="text-lg font-bold leading-snug text-white transition-colors group-hover:text-primary line-clamp-2">
                          {post.title}
                        </h3>
                      </div>
                      <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                    </div>

                    <p className="mt-3 text-sm leading-6 text-muted-foreground line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="mt-4 flex items-center justify-between gap-3 text-xs font-semibold text-muted-foreground">
                      <span className="truncate">{author?.name}</span>
                      <span>{post.readTime}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {latestBlogs.slice(1).map((post, index) => (
            <BlogCard
              key={post.id}
              index={index + 1}
              post={post}
              user={findUser(post.authorId)}
              className="h-full"
              mediaClassName={
                index === 0 ? "aspect-[4/5]" : index === 1 ? "aspect-[1/1]" : undefined
              }
            />
          ))}
        </div>
      </section>
    </div>
  );
}
