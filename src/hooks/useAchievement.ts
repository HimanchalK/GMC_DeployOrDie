// hooks/useAchievement.ts
// Responsibility: small hook that loads achievement progress for a child
// and exposes an increment helper to update progress from feature code,
// plus the static achievement metadata for grids.

import { useCallback, useEffect, useRef, useState } from "react";
import {
  ACHIEVEMENTS,
  getAchievementProgress,
  incrementAchievement,
} from "@/services/achievement";
import type {
  Achievement,
  AchievementId,
  AchievementProgressRow,
} from "@/types/achievement";

type ProgressMap = Record<string, AchievementProgressRow>;

interface UseAchievementResult {
  achievements: readonly Achievement[];
  progress: ProgressMap;
  loading: boolean;
  increment: (
    childId: string,
    achievementId: AchievementId,
    by?: number,
  ) => Promise<AchievementProgressRow | undefined>;
}

export function useAchievement(childId: string | null): UseAchievementResult {
  const [progress, setProgress] = useState<ProgressMap>({});
  const [loading, setLoading] = useState(false);
  const loadedFor = useRef<string | null>(null);

  useEffect(() => {
    if (!childId) return;
    if (loadedFor.current === childId) return;
    loadedFor.current = childId;
    setLoading(true);
    getAchievementProgress(childId)
      .then((p) => setProgress(p as ProgressMap))
      .finally(() => setLoading(false));
  }, [childId]);

  const increment = useCallback(
    async (
      id: string,
      achievementId: AchievementId,
      by = 1,
    ): Promise<AchievementProgressRow | undefined> => {
      const row = await incrementAchievement(id, achievementId, by);
      if (row) setProgress((prev) => ({ ...prev, [achievementId]: row }));
      return row;
    },
    [],
  );

  return { achievements: ACHIEVEMENTS, progress, loading, increment };
}
