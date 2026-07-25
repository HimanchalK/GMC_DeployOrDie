// components/dashboard/RecentAchievement.tsx
// Responsibility: surfaces the most recently earned achievement next to the
// learning list. Quiet reminder of progress already made.

import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Achievement, AchievementProgressRow } from "@/types/achievement";

interface RecentAchievementProps {
  achievement: Achievement | null;
  progress?: AchievementProgressRow | undefined;
  className?: string;
}

export function RecentAchievement({
  achievement,
  progress,
  className,
}: RecentAchievementProps) {
  if (!achievement) return null;

  return (
    <Card className={cn("rounded-2xl bg-card", className)}>
      <CardContent className="p-5 sm:p-6 flex items-center gap-3">
        <div
          aria-hidden="true"
          className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary"
        >
          <Star className="size-5" fill="currentColor" strokeWidth={1.5} />
        </div>
        <div className="space-y-0.5">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            हालैको उपलब्धि
          </p>
          <p className="font-heading text-base font-medium text-foreground">
            {achievement.title_np}
          </p>
          {progress ? (
            <p className="text-sm text-muted-foreground">
              {progress.progress} / {achievement.goal}
            </p>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}
