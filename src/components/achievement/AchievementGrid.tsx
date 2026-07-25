// components/achievement/AchievementGrid.tsx
// Responsibility: responsive grid of AchievementCards. Keeps row layout
// predictable and accessible; each card is labelled individually.

import { AchievementCard } from "./AchievementCard";
import type {
  Achievement,
  AchievementProgressRow,
} from "@/types/achievement";

interface AchievementGridProps {
  achievements: readonly Achievement[];
  progress: Record<string, AchievementProgressRow>;
  className?: string;
}

export function AchievementGrid({
  achievements,
  progress,
  className,
}: AchievementGridProps) {
  return (
    <div className={"grid gap-4 sm:grid-cols-2 lg:grid-cols-3 " + (className ?? "")}>
      {achievements.map((a) => {
        const row = progress[a.id];
        return (
          <AchievementCard
            key={a.id}
            achievement={a}
            progress={row?.progress ?? 0}
            status={row?.status ?? "locked"}
          />
        );
      })}
    </div>
  );
}
