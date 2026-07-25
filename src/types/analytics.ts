// types/analytics.ts
// Responsibility: shared types for the additive analytics layer (Phase 10).
// Mirrors future Supabase tables `activity_attempts`, `session_history`,
// `analytics`. Pure additive; existing services are untouched.

export interface ActivityAttemptRow {
  readonly id: string;
  readonly child_id: string;
  readonly lesson_id: string;
  readonly lesson_item_id: string | null;
  readonly activity_type: "matching" | "counting" | "sequencing";
  readonly is_correct: boolean;
  readonly attempted_at: string;
}

export interface SessionHistoryRow {
  readonly id: string;
  readonly child_id: string;
  readonly lesson_id: string;
  readonly started_at: string;
  readonly ended_at: string | null;
  readonly score: number;
  readonly total: number;
}

export interface AnalyticsSummary {
  readonly child_id: string;
  readonly total_attempts: number;
  readonly correct_attempts: number;
  readonly total_sessions: number;
  readonly most_played_theme: string | null;
  readonly average_accuracy: number;
  readonly time_learning_minutes: number;
  readonly favourite_activity: string | null;
}
