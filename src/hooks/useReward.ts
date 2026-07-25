// hooks/useReward.ts
// Responsibility: small helper hook that exposes reward helpers to components.
// Keeps the surrounding loading/awarding state predictable.

import { useCallback, useEffect, useRef, useState } from "react";
import { awardReward, getRewardsForChild } from "@/services/reward";
import type { Reward, RewardId } from "@/types/reward";

interface UseRewardResult {
  earned: Reward[];
  loading: boolean;
  refresh: (childId: string) => Promise<void>;
  award: (
    childId: string,
    rewardId: RewardId,
  ) => Promise<{ awarded: boolean; reward: Reward | undefined }>;
}

export function useReward(childId: string | null): UseRewardResult {
  const [earned, setEarned] = useState<Reward[]>([]);
  const [loading, setLoading] = useState(false);
  const loadedFor = useRef<string | null>(null);

  const refresh = useCallback(async (id: string) => {
    setLoading(true);
    try {
      const data = await getRewardsForChild(id);
      setEarned(data);
    } finally {
      setLoading(false);
    }
  }, []);

  const award = useCallback(
    async (id: string, rewardId: RewardId) => {
      const result = await awardReward(id, rewardId);
      if (result.awarded && result.reward) {
        setEarned((prev) =>
          prev.some((r) => r.id === result.reward!.id)
            ? prev
            : [...prev, result.reward!],
        );
      }
      return result;
    },
    [],
  );

  useEffect(() => {
    if (!childId) return;
    if (loadedFor.current === childId) return;
    loadedFor.current = childId;
    void refresh(childId);
  }, [childId, refresh]);

  return { earned, loading, refresh, award };
}
