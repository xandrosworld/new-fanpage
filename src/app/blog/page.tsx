import { blogPosts, users } from "@/data/mockData";
import { BlogCard } from "@/components/cards/BlogCard";
import { Search } from "lucide-react";
import Link from "next/link";

export default function BlogPage() {
  const featuredPost = blogPosts[0];
  const otherPosts = blogPosts.slice(1);
  const categories = ["Tất cả", "Node.js", "React", "Kiếm tiền online", "Social Media Tools", "Automation", "Case Study"];

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-12 text-center max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog & Kiến thức</h1>
        <p className="text-muted-foreground text-lg">
          Cập nhật những kiến thức mới nhất về lập trình, MXH và cách kiếm tiền online dành cho creator.
        </p>
      </div>

      {/* Featured Post */}
      <div className="mb-16">
        <Link href={`/blog/${featuredPost.id}`} className="group flex flex-col lg:flex-row gap-8 bg-card rounded-3xl overflow-hidden border border-border/50 hover:border-primary/50 transition-colors shadow-sm">
          <div className="lg:w-3/5 overflow-hidden">
            <img 
              src={featuredPost.thumbnail} 
              alt={featuredPost.title} 
              className="w-full h-full object-cover min-h-[300px] lg:min-h-[400px] transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          <div className="lg:w-2/5 p-8 flex flex-col justify-center">
            <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-semibold rounded-full w-fit mb-4">
              {featuredPost.category}
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 group-hover:text-primary transition-colors leading-tight">
              {featuredPost.title}
            </h2>
            <p className="text-muted-foreground text-lg mb-8 line-clamp-3">
              {featuredPost.excerpt}
            </p>
            <div className="flex items-center gap-3 mt-auto">
              {users.find(u => u.id === featuredPost.authorId) && (
                <img src={users.find(u => u.id === featuredPost.authorId)?.avatar} alt="" className="w-10 h-10 rounded-full" />
              )}
              <div>
                <div className="font-semibold">{users.find(u => u.id === featuredPost.authorId)?.name}</div>
                <div className="text-sm text-muted-foreground">{featuredPost.date} • {featuredPost.readTime}</div>
              </div>
            </div>
          </div>
        </Link>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          {/* Categories & Search */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
            <div className="flex overflow-x-auto hide-scrollbar gap-2 w-full md:w-auto pb-2">
              {categories.map((cat, i) => (
                <button 
                  key={cat}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${i === 0 ? 'bg-primary text-white' : 'bg-secondary text-foreground hover:bg-secondary/80'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
            
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Tìm kiếm bài viết..." 
                className="w-full pl-9 pr-4 py-2 rounded-full bg-secondary/50 border-none outline-none focus:ring-2 focus:ring-primary/20 text-sm"
              />
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {otherPosts.map(post => (
              <BlogCard key={post.id} post={post} user={users.find(u => u.id === post.authorId)} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
