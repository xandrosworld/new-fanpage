import Link from "next/link";
import { Star, Download, Bookmark } from "lucide-react";
import { cn } from "@/lib/utils";

export function ResourceCard({ resource, user }: { resource: any, user?: any }) {
  return (
    <div className="group flex flex-col bg-card rounded-2xl overflow-hidden border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={resource.thumbnail} 
          alt={resource.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="px-2.5 py-1 text-xs font-medium bg-background/80 backdrop-blur-md rounded-full border border-border/50 text-foreground">
            {resource.category}
          </span>
        </div>
        <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-background/80 backdrop-blur-md flex items-center justify-center text-muted-foreground hover:text-primary transition-colors border border-border/50">
          <Bookmark className="w-4 h-4" />
        </button>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-4 mb-3">
          <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-primary transition-colors">
            {resource.title}
          </h3>
          <div className="flex items-center gap-1 text-yellow-500 bg-yellow-500/10 px-2 py-0.5 rounded-full text-xs font-medium">
            <Star className="w-3.5 h-3.5 fill-current" />
            {resource.rating}
          </div>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">
          {resource.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {resource.tags.slice(0, 3).map((tag: string) => (
            <span key={tag} className="text-xs px-2 py-1 rounded-md bg-secondary text-secondary-foreground font-medium">
              {tag}
            </span>
          ))}
        </div>

        <div className="h-px bg-border/50 mb-4" />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {user && (
              <img src={user.avatar} alt={user.name} className="w-6 h-6 rounded-full" />
            )}
            <span className="text-xs font-medium text-muted-foreground">{user?.name || "User"}</span>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Download className="w-3.5 h-3.5" />
              {resource.downloads}
            </div>
            <div className="font-semibold text-primary">
              {resource.price === 0 ? "Free" : `${resource.price.toLocaleString("vi-VN")}đ`}
            </div>
          </div>
        </div>
      </div>
      
      <Link href={`/resources/${resource.id}`} className="absolute inset-0 z-10">
        <span className="sr-only">View Resource</span>
      </Link>
    </div>
  );
}
