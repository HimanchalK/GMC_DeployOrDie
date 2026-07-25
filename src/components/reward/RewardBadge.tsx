// components/reward/RewardBadge.tsx
// Responsibility: small pill used to show an earned reward.
// Reusable, accessible, styled with the design tokens only.

import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Reward } from "@/types/reward";

interface RewardBadgeProps {
  reward: Reward;
  earned?: boolean;
  className?: string;
}

export function RewardBadge({
  reward,
  earned = true,
  className,
}: RewardBadgeProps) {
  return (
    <Badge
      variant={earned ? "default" : "outline"}
      className={cn(
        "rounded-full px-3 py-1 text-xs font-medium",
        !earned && "opacity-60",
        className,
      )}
      aria-label={`${reward.title_np}${earned ? " (earned)" : " (locked)"}`}
    >
      <Star
        className="h-3 w-3"
        fill={earned ? "currentColor" : "none"}
        strokeWidth={1.5}
      />
      {reward.title_np}
    </Badge>
  );
}
