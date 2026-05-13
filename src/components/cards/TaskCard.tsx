import type { CSSProperties } from "react";
import Link from "next/link";
import { Clock, Users, ArrowRight } from "lucide-react";

type Task = {
  title: string;
  description: string;
  type: string;
  reward: number;
  estimatedTime: string;
  participants: number;
  badge?: string;
};

export function TaskCard({ task, index = 0 }: { task: Task; index?: number }) {
  return (
    <article
      data-spotlight
      data-hue="38"
      style={{ "--i": index } as CSSProperties}
      className="artisan-card reveal-up group flex h-full flex-col p-5 transition-transform duration-300 hover:-translate-y-1"
    >
      <div className="mb-5 flex items-start justify-between gap-4">
        <span className="rounded-[6px] border border-primary/15 bg-primary/10 px-2.5 py-1 text-xs font-bold text-primary">
          {task.type}
        </span>
        {task.badge && (
          <span className="rounded-[6px] border border-amber-400/15 bg-amber-400/10 px-2.5 py-1 text-xs font-bold text-amber-300">
            {task.badge}
          </span>
        )}
      </div>

      <h3 className="mb-3 text-lg font-bold leading-snug transition-colors group-hover:text-primary line-clamp-2">
        {task.title}
      </h3>

      <p className="mb-5 flex-1 text-sm leading-6 text-muted-foreground line-clamp-3">
        {task.description}
      </p>

      <div className="mb-5 space-y-2 text-xs font-semibold text-muted-foreground">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-primary" />
          {task.estimatedTime}
        </div>
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-accent" />
          {task.participants} người đã làm
        </div>
      </div>

      <div className="mt-auto flex items-center justify-between border-t border-white/5 pt-4">
        <div>
          <div className="mb-1 text-xs text-muted-foreground">Mức thưởng</div>
          <div className="text-xl font-extrabold text-primary">
            +{task.reward.toLocaleString("vi-VN")}đ
          </div>
        </div>

        <Link
          data-magnetic
          href="/tasks"
          className="btn-quiet z-20 flex h-10 w-10 items-center justify-center text-foreground"
          aria-label="Xem nhiệm vụ"
        >
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}
