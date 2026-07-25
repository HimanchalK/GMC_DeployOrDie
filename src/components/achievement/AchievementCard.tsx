// components/achievement/AchievementCard.tsx
// Responsibility: a single achievement tile, showing locked/in-progress/
// unlocked visual states plus a small progress ring toward the goal.

import { Lock, Sparkles, Star, Trophy, Flame, Compass } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type {
  Achievement,
  AchievementProgressRow,
  AchievementStatus,
} from "@/types/achievement";

interface AchievementCardProps {
  achievement: Achievement;
  progress?: AchievementProgressRow["progress"];
  status: AchievementStatus;
  className?: string;
}

const ICONS = {
  star: Star,
  icon: Star,
  trophy: Trophy,
  flame: Flame,
  sparkles: Sparkles,
  compass: Compass,
} as const;

export function AchievementCard({
  achievement,
  progress = 0,
  status,
  className,
}: AchievementCardProps) {
  const Icon = ICONS[achievement.icon as keyof typeof ICONS] ?? Star;
  const unlocked = status === "unlocked";

  return (
    <Card
      size="sm"
      className={cn(
        "rounded-2xl ring-1",
        unlocked ? "ring-primary/20" : "ring-border",
        status === "locked" && "opacity-70",
        className,
      )}
    >
      <CardContent className="flex flex-col gap-3 p-4">
        <div className="flex items-start justify-between">
          <div
            className={cn(
              "grid size-10 place-items-center rounded-xl",
              unlocked ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground",
            )}
            aria-hidden="true"
          >
            {status === "locked" ? (
              <Lock className="size-5" strokeWidth={1.5} />
            ) : (
              <Icon className="size-5" fill={unlocked ? "currentColor" : "none"} strokeWidth={1.5} />
            )}
          </div>

          <span
            className={cn(
              "text-xs font-medium",
              unlocked ? "text-primary" : "text-muted-foreground",
            )}
          >
            {unlocked ? "सकियो" : status === "in_progress" ? "प्रगति" : "बन्द"}
          </span>
        </div>

        <div className="space-y-0.5">
          <p className="font-medium text-foreground">{achievement.title_np}</p>
          <p className="text-sm text-muted-foreground">
            {achievement.description_np}
          </p>
        </div>

        {status !== "locked" && (
          <div className="space-y-1">
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary transition-all"
                style={{
                  width: `${Math.min(100, (progress / achievement.goal) * 100)}%`,
                }}
              />
            </div>
            <p className="text-xs text-muted-foreground" aria-live="polite">
              {progress} / {achievement.goal}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
