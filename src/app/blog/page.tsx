import { blogPosts, users } from "@/data/mockData";
import { BlogCard } from "@/components/cards/BlogCard";
import { Search, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function BlogPage() {
  const featuredPost = blogPosts[0];
  const otherPosts = blogPosts.slice(1);
  const author = users.find((u) => u.id === featuredPost.authorId);
  const categories = [
    "Tất cả",
    "Node.js",
    "React",
    "Kiếm tiền online",
    "Social Media Tools",
    "Automation",
    "Case Study",
  ];

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10">
      <div className="mb-12 grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
        <div>
          <div className="section-kicker mb-4">Editorial desk</div>
          <h1 className="display-title text-5xl md:text-7xl">Blog & kiến thức</h1>
        </div>
        <p className="max-w-2xl text-lg leading-8 text-muted-foreground lg:justify-self-end">
          Ghi chú thực chiến về lập trình, creator economy và cách xây cộng đồng số có nhịp tăng trưởng bền.
        </p>
      </div>

      <Link
        href={`/blog/${featuredPost.id}`}
        data-spotlight
        data-hue="322"
        className="artisan-card reveal-up group mb-16 grid overflow-hidden p-3 lg:grid-cols-[1.25fr_0.75fr]"
      >
        <div className="artisan-media min-h-[320px] lg:min-h-[480px]">
          <img
            src={featuredPost.thumbnail}
            alt={featuredPost.title}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          />
        </div>
        <div className="flex flex-col justify-center p-5 md:p-8">
          <span className="mb-5 w-fit rounded-[6px] border border-primary/15 bg-primary/10 px-3 py-1 text-sm font-bold text-primary">
            {featuredPost.category}
          </span>
          <h2 className="display-title mb-5 text-4xl transition-colors group-hover:text-primary md:text-5xl">
            {featuredPost.title}
          </h2>
          <p className="mb-8 text-base leading-7 text-muted-foreground line-clamp-4">
            {featuredPost.excerpt}
          </p>
          <div className="mt-auto flex items-center justify-between gap-4 border-t border-white/5 pt-5">
            <div className="flex items-center gap-3">
              {author && (
                <img src={author.avatar} alt={author.name} className="h-10 w-10 rounded-[8px] object-cover" />
              )}
              <div>
                <div className="font-bold">{author?.name}</div>
                <div className="text-sm text-muted-foreground">
                  {featuredPost.date} · {featuredPost.readTime}
                </div>
              </div>
            </div>
            <ArrowUpRight className="h-5 w-5 text-primary transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
          </div>
        </div>
      </Link>

      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="hide-scrollbar flex w-full gap-2 overflow-x-auto pb-2 md:w-auto">
          {categories.map((cat, i) => (
            <button
              data-magnetic
              key={cat}
              className={
                i === 0
                  ? "btn-artisan px-4 py-2 text-sm"
                  : "btn-quiet px-4 py-2 text-sm font-bold"
              }
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="glass relative w-full rounded-[8px] md:w-72">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Tìm bài viết..."
            className="w-full bg-transparent py-3 pl-10 pr-4 text-sm outline-none"
          />
        </div>
      </div>

      <div className="masonry-grid">
        {otherPosts.map((post, index) => (
          <BlogCard
            key={post.id}
            index={index}
            post={post}
            user={users.find((u) => u.id === post.authorId)}
            mediaClassName={index % 4 === 0 ? "aspect-[4/5]" : index % 4 === 2 ? "aspect-[1/1]" : undefined}
          />
        ))}
      </div>
    </div>
  );
}
