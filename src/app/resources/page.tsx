import { resources, users } from "@/data/mockData";
import { ResourceCard } from "@/components/cards/ResourceCard";
import { Search, Filter, SlidersHorizontal, ChevronDown } from "lucide-react";

export default function ResourcesPage() {
  const categories = [
    "Tất cả",
    "Source Code",
    "Template Website",
    "Marketing Tool",
    "Script Automation",
    "UI Kit",
    "Plugin",
  ];
  const tags = ["Node.js", "React", "Next.js", "MySQL", "Facebook", "TikTok", "Automation", "Dashboard"];

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10">
      <div className="mb-12 grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
        <div>
          <div className="section-kicker mb-4">Boutique resource marketplace</div>
          <h1 className="display-title text-5xl md:text-7xl">Tài nguyên bán riêng</h1>
        </div>
        <p className="max-w-2xl text-lg leading-8 text-muted-foreground lg:justify-self-end">
          Khu này chỉ dành cho sản phẩm số: source code, template, UI kit, automation script và tool thương mại. Feed MXH, bài đăng và nhóm cộng đồng được tách sang không gian riêng.
        </p>
      </div>

      <div className="premium-rule mb-10" />

      <div className="grid gap-8 lg:grid-cols-[17rem_1fr]">
        <aside className="space-y-5">
          <div data-spotlight data-hue="172" className="artisan-card p-5">
            <div className="mb-5 flex items-center gap-2 text-lg font-extrabold">
              <Filter className="h-5 w-5 text-primary" />
              Bộ lọc
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="mb-3 text-sm font-bold text-muted-foreground">Danh mục</h3>
                <div className="space-y-2">
                  {categories.map((cat, i) => (
                    <label key={cat} className="flex cursor-pointer items-center gap-2 text-sm font-semibold">
                      <input type="radio" name="category" className="accent-primary" defaultChecked={i === 0} />
                      <span className="transition-colors hover:text-primary">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="mb-3 text-sm font-bold text-muted-foreground">Mô hình bán</h3>
                <div className="space-y-2">
                  {["Bản miễn phí", "Bản trả phí", "License thương mại"].map((item) => (
                    <label key={item} className="flex cursor-pointer items-center gap-2 text-sm font-semibold">
                      <input type="checkbox" className="accent-primary" />
                      <span className="transition-colors hover:text-primary">{item}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div data-spotlight data-hue="28" className="artisan-card p-5">
            <h3 className="mb-3 text-sm font-bold text-muted-foreground">Công nghệ</h3>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <button
                  data-magnetic
                  key={tag}
                  className="btn-quiet px-3 py-2 text-xs font-bold"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </aside>

        <main>
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="glass relative w-full rounded-[8px] sm:max-w-lg">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Tìm kiếm tài nguyên..."
                className="w-full bg-transparent py-3 pl-10 pr-4 text-sm outline-none"
              />
            </div>

            <div className="flex items-center gap-3">
              <button data-magnetic className="btn-quiet flex items-center gap-2 px-4 py-3 text-sm font-bold lg:hidden">
                <SlidersHorizontal className="h-4 w-4" />
                Lọc
              </button>
              <button data-magnetic className="btn-quiet ml-auto flex items-center gap-2 px-4 py-3 text-sm font-bold">
                Mới nhất
                <ChevronDown className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="masonry-grid">
            {resources.map((resource, index) => (
              <ResourceCard
                key={resource.id}
                index={index}
                resource={resource}
                user={users.find((u) => u.id === resource.authorId)}
                mediaClassName={index % 5 === 1 ? "aspect-[4/5]" : index % 5 === 3 ? "aspect-[1/1]" : undefined}
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
