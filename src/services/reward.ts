// services/reward.ts
// Responsibility: data access for the reward system.
// Mirrors a future Supabase `reward_history` table.
// Until the table exists, falls back to in-memory mocked data so the rest of
// the app keeps working without backend changes.

import { createClient } from "@/lib/supabase/client";
import type { Reward, RewardId, RewardHistoryRow } from "@/types/reward";

const supabase = createClient();

export const REWARDS: readonly Reward[] = [
  {
    id: "first_lesson",
    kind: "celebration",
    title_np: "पहिलो पाठ सकाउनु भयो",
    description_np: "तपाईंले आफ्नो पहिलो पाठ पूरा गर्नुभयो",
    icon: "star",
  },
  {
    id: "perfect_score",
    kind: "badge",
    title_np: "उत्कृष्ट अंक",
    description_np: "कुनै गल्ती बिना सबै प्रश्न सही",
    icon: "sparkles",
  },
  {
    id: "completed_theme",
    kind: "badge",
    title_np: "थीम समाप्त",
    description_np: "एउटा पूरै थीम पूरा गर्नुभयो",
    icon: "trophy",
  },
  {
    id: "streak_3",
    kind: "badge",
    title_np: "३ दिन निरन्तर",
    description_np: "लगातार तीन दिन सिक्नुभयो",
    icon: "flame",
  },
  {
    id: "explorer",
    kind: "badge",
    title_np: "अन्वेषक",
    description_np: "हरेक प्रकारको गतिविधि अनुभव गर्नुभयो",
    icon: "compass",
  },
] as const;

const TABLE = "reward_history";

export function getRewardById(id: RewardId): Reward | undefined {
  return REWARDS.find((r) => r.id === id);
}

export async function getRewardsForChild(childId: string): Promise<Reward[]> {
  const { data, error } = await supabase
    .from(TABLE)
    .select("reward_id")
    .eq("child_id", childId);

  if (error) {
    // graceful fallback when table is absent
    return [];
  }

  const ids = (data as Pick<RewardHistoryRow, "reward_id">[]).map(
    (r) => r.reward_id,
  );
  return REWARDS.filter((r) => ids.includes(r.id));
}

export async function hasEarnedReward(
  childId: string,
  rewardId: RewardId,
): Promise<boolean> {
  const { data, error } = await supabase
    .from(TABLE)
    .select("reward_id")
    .eq("child_id", childId)
    .eq("reward_id", rewardId)
    .maybeSingle();

  if (error) return false;
  return Boolean(data);
}

export async function awardReward(
  childId: string,
  rewardId: RewardId,
): Promise<{ awarded: boolean; reward: Reward | undefined }> {
  const reward = getRewardById(rewardId);

  if (await hasEarnedReward(childId, rewardId)) {
    return { awarded: false, reward };
  }

  const { error } = await supabase
    .from(TABLE)
    .insert({
      child_id: childId,
      reward_id: rewardId,
      earned_at: new Date().toISOString(),
    });

  if (error) {
    // missing table => silently ignore so the app keeps working
    return { awarded: false, reward };
  }

  return { awarded: true, reward };
}
