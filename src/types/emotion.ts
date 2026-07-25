// types/emotion.ts
// Responsibility: shared types for the pre-learning emotion check.
// Mirrors a future `mood_logs` Supabase table assumed by details.md Phase 10.

export type Emotion = "happy" | "neutral" | "sad";

export interface EmotionCheckResult {
  readonly child_id: string;
  readonly emotion: Emotion;
  readonly noted_at: string;
  readonly lesson_id?: string;
}
