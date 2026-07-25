// components/dashboard/LearningStreak.tsx
// Responsibility: subtle streak indicator (only shows when > 0).
// Streaks are computed from mock data via the streak service until the
// Supabase daily_streaks table is available.

import { Flame } from "lucide-react";
import { cn } from "@/lib/utils";

interface LearningStreakProps {
  days: number;
  className?: string;
}

export function LearningStreak({ days, className }: LearningStreakProps) {
  if (days <= 0) return null;

  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-2xl bg-card px-4 py-3 ring-1 ring-border",
        className,
      )}
      aria-label={`${days} दिन निरन्तर सिक्दै`}
    >
      <Flame className="size-5 text-primary" strokeWidth={1.5} />
      <p className="text-sm font-medium text-foreground">
        {days} {days === 1 ? "दिन" : "दिन"} निरन्तर
      </p>
    </div>
  );
}
