import Link from "next/link";
import { Clock, Users, ArrowRight } from "lucide-react";

export function TaskCard({ task }: { task: any }) {
  return (
    <div className="bg-card rounded-2xl p-5 border border-border/50 hover:border-primary/50 transition-all group flex flex-col shadow-sm hover:shadow-md">
      <div className="flex justify-between items-start mb-4">
        <span className="px-2.5 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
          {task.type}
        </span>
        {task.badge && (
          <span className="px-2.5 py-1 bg-amber-500/10 text-amber-500 text-xs font-semibold rounded-full">
            {task.badge}
          </span>
        )}
      </div>

      <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
        {task.title}
      </h3>
      
      <p className="text-muted-foreground text-sm line-clamp-2 mb-4 flex-1">
        {task.description}
      </p>

      <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground mb-5">
        <div className="flex items-center gap-1.5">
          <Clock className="w-4 h-4" />
          {task.estimatedTime}
        </div>
        <div className="flex items-center gap-1.5">
          <Users className="w-4 h-4" />
          {task.participants} người đã làm
        </div>
      </div>

      <div className="pt-4 border-t border-border/50 flex items-center justify-between mt-auto">
        <div>
          <div className="text-xs text-muted-foreground mb-0.5">Mức thưởng</div>
          <div className="font-bold text-primary text-lg">+{task.reward.toLocaleString("vi-VN")}đ</div>
        </div>
        
        <Link 
          href="/tasks"
          className="flex items-center justify-center w-10 h-10 rounded-full bg-secondary text-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
        >
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
