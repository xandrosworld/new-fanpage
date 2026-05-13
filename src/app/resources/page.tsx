import { resources, users } from "@/data/mockData";
import { ResourceCard } from "@/components/cards/ResourceCard";
import { Search, Filter, SlidersHorizontal, ChevronDown } from "lucide-react";

export default function ResourcesPage() {
  const categories = [
    "Tất cả", "Source Code", "Template Website", "Tool MXH", "Script Automation", "UI Kit", "Plugin"
  ];
  const tags = ["Node.js", "React", "Next.js", "MySQL", "Facebook", "TikTok", "Automation", "Dashboard"];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-10 text-center max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Kho tài nguyên</h1>
        <p className="text-muted-foreground text-lg">
          Source code, template, tool MXH và script automation được cộng đồng chia sẻ.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <div className="w-full lg:w-64 flex-shrink-0 space-y-6">
          <div className="flex items-center gap-2 font-semibold text-lg pb-2 border-b border-border/50">
            <Filter className="w-5 h-5" />
            Bộ lọc
          </div>
          
          <div>
            <h3 className="font-medium mb-3">Danh mục</h3>
            <div className="space-y-2">
              {categories.map((cat, i) => (
                <label key={cat} className="flex items-center gap-2 text-sm cursor-pointer group">
                  <input type="radio" name="category" className="accent-primary" defaultChecked={i === 0} />
                  <span className="group-hover:text-primary transition-colors">{cat}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-3">Loại tài nguyên</h3>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm cursor-pointer group">
                <input type="checkbox" className="accent-primary rounded" />
                <span className="group-hover:text-primary transition-colors">Miễn phí</span>
              </label>
              <label className="flex items-center gap-2 text-sm cursor-pointer group">
                <input type="checkbox" className="accent-primary rounded" />
                <span className="group-hover:text-primary transition-colors">Trả phí</span>
              </label>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-3">Công nghệ</h3>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <button key={tag} className="px-3 py-1.5 rounded-md bg-secondary text-secondary-foreground text-xs font-medium hover:bg-primary hover:text-primary-foreground transition-colors">
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Top Bar */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-8">
            <div className="relative w-full sm:max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Tìm kiếm tài nguyên..." 
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-secondary/50 border border-transparent focus:border-primary/50 focus:bg-background outline-none transition-all"
              />
            </div>
            
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-secondary rounded-lg text-sm font-medium">
                <SlidersHorizontal className="w-4 h-4" />
                Lọc
              </button>
              <button className="flex items-center gap-2 px-4 py-2.5 bg-secondary rounded-lg text-sm font-medium whitespace-nowrap ml-auto">
                Mới nhất
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            {resources.map(resource => (
              <ResourceCard 
                key={resource.id} 
                resource={resource} 
                user={users.find(u => u.id === resource.authorId)} 
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
