import Link from "next/link";
import { Clock } from "lucide-react";

export function BlogCard({ post, user }: { post: any, user?: any }) {
  return (
    <Link href={`/blog/${post.id}`} className="group flex flex-col gap-4">
      <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-border/50">
        <img 
          src={post.thumbnail} 
          alt={post.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-1 text-xs font-medium bg-background/80 backdrop-blur-md rounded-full text-foreground border border-border/50">
            {post.category}
          </span>
        </div>
      </div>

      <div className="flex flex-col flex-1">
        <h3 className="font-semibold text-xl mb-2 group-hover:text-primary transition-colors line-clamp-2 leading-tight">
          {post.title}
        </h3>
        
        <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between mt-auto pt-2">
          <div className="flex items-center gap-2">
            {user && <img src={user.avatar} alt={user.name} className="w-6 h-6 rounded-full" />}
            <span className="text-sm font-medium text-muted-foreground">{user?.name}</span>
          </div>
          
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
            <Clock className="w-3.5 h-3.5" />
            {post.readTime}
          </div>
        </div>
      </div>
    </Link>
  );
}
