// components/reward/RewardCard.tsx
// Responsibility: card showing a reward, its title, and short description.
// Used on the dashboard "recent achievement" slot.

import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Reward } from "@/types/reward";

interface RewardCardProps {
  reward: Reward;
  earned?: boolean;
  className?: string;
}

export function RewardCard({ reward, earned = true, className }: RewardCardProps) {
  return (
    <Card
      size="sm"
      className={cn("rounded-2xl", !earned && "opacity-70", className)}
      aria-label={`${reward.title_np}`}
    >
      <CardContent className="flex items-center gap-3 p-4">
        <div
          className={cn(
            "grid size-10 place-items-center rounded-xl",
            earned ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground",
          )}
        >
          <Star
            className="size-5"
            fill={earned ? "currentColor" : "none"}
            strokeWidth={1.5}
          />
        </div>
        <div className="space-y-0.5">
          <p className="font-medium text-foreground">{reward.title_np}</p>
          <p className="text-sm text-muted-foreground">
            {reward.description_np}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
