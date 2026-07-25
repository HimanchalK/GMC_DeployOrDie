// types/reward.ts
// Responsibility: shared types for the reward system.
// Covers identifiers, reward kinds, and the persisted reward_history row shape
// (Supabase table assumed by details.md Phase 10).

export type RewardId =
  | "first_lesson"
  | "perfect_score"
  | "completed_theme"
  | "streak_3"
  | "explorer";

export type RewardKind =
  | "star" // generic achievement star
  | "badge" // earned badge
  | "celebration"; // on-screen celebration moment

export interface Reward {
  readonly id: RewardId;
  readonly kind: RewardKind;
  readonly title_np: string;
  readonly description_np: string;
  readonly icon: string;
}

export interface RewardHistoryRow {
  readonly id: string;
  readonly child_id: string;
  readonly reward_id: RewardId;
  readonly earned_at: string;
}
