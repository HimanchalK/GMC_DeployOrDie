// services/achievement.ts
// Responsibility: data access for achievements.
// Mirrors a future Supabase `achievement_progress` table.
// Until the table exists, falls back to mocked per-child progress so the UI
// keeps rendering without backend changes.

import { createClient } from "@/lib/supabase/client";
import type {
  Achievement,
  AchievementId,
  AchievementProgressRow,
  AchievementStatus,
} from "@/types/achievement";

const supabase = createClient();
const TABLE = "achievement_progress";

export const ACHIEVEMENTS: readonly Achievement[] = [
  {
    id: "first_lesson",
    title_np: "पहिलो पाठ",
    description_np: "आफ्नो पहिलो पाठ सकाउनुहोस्",
    icon: "star",
    goal: 1,
    kind: "lesson_count",
  },
  {
    id: "completed_theme",
    title_np: "थीम समाप्त",
    description_np: "एउटा पूरै थीम पूरा गर्नुहोस्",
    icon: "trophy",
    goal: 3,
    kind: "themes",
  },
  {
    id: "streak_3",
    title_np: "३ दिन निरन्तर",
    description_np: "लगातार तीन दिन सिक्नुहोस्",
    icon: "flame",
    goal: 3,
    kind: "streak_days",
  },
  {
    id: "perfect_score",
    title_np: "उत्कृष्ट अंक",
    description_np: "कुनै गल्ती बिना पाठ सकाउनुहोस्",
    icon: "sparkles",
    goal: 1,
    kind: "perfect_score",
  },
  {
    id: "explorer",
    title_np: "अन्वेषक",
    description_np: "हरेक प्रकारको गतिविधि अनुभव गर्नुहोस्",
    icon: "compass",
    goal: 3,
    kind: "activity_types",
  },
] as const;

export function getAchievementById(id: AchievementId): Achievement | undefined {
  return ACHIEVEMENTS.find((a) => a.id === id);
}

function statusFromProgress(value: number, goal: number): AchievementStatus {
  if (value >= goal) return "unlocked";
  if (value > 0) return "in_progress";
  return "locked";
}

export async function getAchievementProgress(
  childId: string,
): Promise<Record<AchievementId, AchievementProgressRow>> {
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .eq("child_id", childId);

  const rows = (data ?? []) as AchievementProgressRow[];

  if (error) {
    // graceful mocked fallback when table is absent
    return mockedProgress(childId);
  }

  const byId: Record<AchievementId, AchievementProgressRow> = {} as never;
  for (const a of ACHIEVEMENTS) {
    const existing = rows.find((r) => r.achievement_id === a.id);
    byId[a.id] =
      existing ?? mockRow(childId, a.id, 0, statusFromProgress(0, a.goal));
  }
  return byId;
}

export async function incrementAchievement(
  childId: string,
  achievementId: AchievementId,
  by: number,
): Promise<AchievementProgressRow | undefined> {
  const achievement = getAchievementById(achievementId);
  if (!achievement) return undefined;

  const current = await getAchievementProgress(childId);
  const row = current[achievementId];
  const nextValue = Math.min(row.progress + by, achievement.goal);
  const status = statusFromProgress(nextValue, achievement.goal);
  const updatedAt = new Date().toISOString();

  const { error } = await supabase.from(TABLE).upsert(
    {
      child_id: childId,
      achievement_id: achievementId,
      progress: nextValue,
      status,
      updated_at: updatedAt,
    },
    { onConflict: "child_id,achievement_id" },
  );

  if (error) return undefined;

  return mockRow(childId, achievementId, nextValue, status);
}

function mockedProgress(
  childId: string,
): Record<AchievementId, AchievementProgressRow> {
  const out = {} as Record<AchievementId, AchievementProgressRow>;
  for (const a of ACHIEVEMENTS) {
    out[a.id] = mockRow(childId, a.id, 0, "locked");
  }
  return out;
}

function mockRow(
  childId: string,
  achievementId: AchievementId,
  progress: number,
  status: AchievementStatus,
): AchievementProgressRow {
  return {
    id: `${childId}:${achievementId}`,
    child_id: childId,
    achievement_id: achievementId,
    progress,
    status,
    updated_at: new Date().toISOString(),
  };
}
