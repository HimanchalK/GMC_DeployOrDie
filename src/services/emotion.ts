// services/emotion.ts
// Responsibility: data access for the pre-learning emotion check.
// Mirrors a future Supabase `mood_logs` table.
// Until that table exists, persists the child's most recent emotion
// locally (per-child) so the UI keeps behaving.

import { createClient } from "@/lib/supabase/client";
import type { Emotion, EmotionCheckResult } from "@/types/emotion";

const supabase = createClient();
const TABLE = "mood_logs";
const KEY_PREFIX = "mood:";

interface StoredMood {
  emotion: Emotion;
  noted_at: string;
}

function read(childId: string): StoredMood | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(`${KEY_PREFIX}${childId}`);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as StoredMood;
  } catch {
    return null;
  }
}

function write(childId: string, mood: StoredMood): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(
    `${KEY_PREFIX}${childId}`,
    JSON.stringify(mood),
  );
}

export async function recordEmotion(
  childId: string,
  emotion: Emotion,
  lessonId?: string,
): Promise<EmotionCheckResult> {
  const result: EmotionCheckResult = {
    child_id: childId,
    emotion,
    noted_at: new Date().toISOString(),
    lesson_id: lessonId,
  };

  // try to persist to Supabase when the table exists
  const { error } = await supabase.from(TABLE).insert(result).select();

  // always keep a local mirror so the UI keeps working without the table
  write(childId, { emotion, noted_at: result.noted_at });

  if (error) return result;
  return result;
}

export async function getLatestEmotion(
  childId: string,
): Promise<Emotion | null> {
  const { data, error } = await supabase
    .from(TABLE)
    .select("emotion, noted_at")
    .eq("child_id", childId)
    .order("noted_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) return read(childId)?.emotion ?? null;
  if (!data) return read(childId)?.emotion ?? null;
  return (data as { emotion: Emotion }).emotion;
}
