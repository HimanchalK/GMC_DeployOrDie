// types/parent.ts
// Responsibility: shared prop shapes used by the parent-facing UI surfaces
// (Phase 4 + Phase 9) so components stay self-documenting and remain
// backend-agnostic until real analytics tables land.

export interface RecentLesson {
  readonly lessonId: string;
  readonly title_np: string;
  readonly activity_type: "matching" | "counting" | "sequencing";
  readonly status: "completed" | "current" | "locked";
  readonly score?: number;
  readonly total?: number;
  readonly completedAt?: string | null;
}

export interface WeeklyActivityPoint {
  readonly date: string;
  readonly correct: number;
  readonly total: number;
}

export interface StrengthRow {
  readonly label: string;
  readonly count: number;
}

export interface InsightSummary {
  readonly mostPlayedTheme: string | null;
  readonly weeklyProgress: number;
  readonly averageAccuracy: number;
  readonly timeLearningMinutes: number;
  readonly favouriteActivity: string | null;
  readonly recentSessions: readonly RecentLesson[];
}
