// types/achievement.ts
// Responsibility: shared types for the achievement system.
// `AchievementProgressRow` mirrors a future Supabase `achievement_progress`
// table assumed by details.md Phase 10.

export type AchievementId =
  | "first_lesson"
  | "completed_theme"
  | "streak_3"
  | "perfect_score"
  | "explorer";

export type AchievementStatus = "locked" | "in_progress" | "unlocked";

export interface Achievement {
  readonly id: AchievementId;
  readonly title_np: string;
  readonly description_np: string;
  readonly icon: string;
  readonly goal: number;
  readonly kind: "lesson_count" | "streak_days" | "perfect_score" | "themes" | "activity_types";
}

export interface AchievementProgressRow {
  readonly id: string;
  readonly child_id: string;
  readonly achievement_id: AchievementId;
  readonly progress: number;
  readonly status: AchievementStatus;
  readonly updated_at: string;
}
