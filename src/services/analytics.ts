// services/analytics.ts
// Responsibility: additive analytics data access for Phase 10.
// Mirrors future Supabase tables `activity_attempts` and `session_history`.
// Until those tables exist, calls gracefully no-op so existing flow keeps
// working without backend changes.

import { createClient } from "@/lib/supabase/client";
import type {
  ActivityAttemptRow,
  AnalyticsSummary,
  SessionHistoryRow,
} from "@/types/analytics";

const supabase = createClient();

const ATTEMPTS_TABLE = "activity_attempts";
const SESSIONS_TABLE = "session_history";

export async function recordActivityAttempt(
  attempt: Omit<ActivityAttemptRow, "id">,
): Promise<ActivityAttemptRow | null> {
  const { data, error } = await supabase
    .from(ATTEMPTS_TABLE)
    .insert(attempt)
    .select()
    .single();

  if (error) return null;
  return data as ActivityAttemptRow;
}

export async function recordSessionStart(params: {
  childId: string;
  lessonId: string;
}): Promise<SessionHistoryRow | null> {
  const row = {
    child_id: params.childId,
    lesson_id: params.lessonId,
    started_at: new Date().toISOString(),
    ended_at: null,
    score: 0,
    total: 0,
  };
  const { data, error } = await supabase
    .from(SESSIONS_TABLE)
    .insert(row)
    .select()
    .single();

  if (error) return null;
  return data as SessionHistoryRow;
}

export async function recordSessionEnd(params: {
  sessionId: string;
  score: number;
  total: number;
}): Promise<void> {
  await supabase
    .from(SESSIONS_TABLE)
    .update({
      ended_at: new Date().toISOString(),
      score: params.score,
      total: params.total,
    })
    .eq("id", params.sessionId);
}

export async function getSessionHistory(
  childId: string,
): Promise<SessionHistoryRow[]> {
  const { data, error } = await supabase
    .from(SESSIONS_TABLE)
    .select("*")
    .eq("child_id", childId)
    .order("started_at", { ascending: false })
    .limit(20);

  if (error) return [];
  return (data ?? []) as SessionHistoryRow[];
}

export async function getActivityAttempts(
  childId: string,
): Promise<ActivityAttemptRow[]> {
  const { data, error } = await supabase
    .from(ATTEMPTS_TABLE)
    .select("*")
    .eq("child_id", childId)
    .order("attempted_at", { ascending: false })
    .limit(100);

  if (error) return [];
  return (data ?? []) as ActivityAttemptRow[];
}

export async function computeAnalyticsSummary(
  childId: string,
): Promise<AnalyticsSummary> {
  const [attempts, sessions] = await Promise.all([
    getActivityAttempts(childId),
    getSessionHistory(childId),
  ]);

  const total = attempts.length;
  const correct = attempts.filter((a) => a.is_correct).length;
  const accuracy = total > 0 ? correct / total : 0;

  // most played activity type from attempts
  const counts: Record<string, number> = {};
  for (const a of attempts) {
    counts[a.activity_type] = (counts[a.activity_type] ?? 0) + 1;
  }
  const sorted = Object.entries(counts).sort((x, y) => y[1] - x[1]);
  const favouriteActivity = sorted[0]?.[0] ?? null;

  // time learning in minutes (from session durations)
  let timeMs = 0;
  for (const s of sessions) {
    if (!s.ended_at) continue;
    const start = new Date(s.started_at).getTime();
    const end = new Date(s.ended_at).getTime();
    if (end > start) timeMs += end - start;
  }
  const timeMinutes = Math.max(1, Math.round(timeMs / 60000));

  return {
    child_id: childId,
    total_attempts: total,
    correct_attempts: correct,
    total_sessions: sessions.length,
    most_played_theme: null, // requires joining lessons; future enhancement
    average_accuracy: accuracy,
    time_learning_minutes: timeMinutes,
    favourite_activity: favouriteActivity,
  };
}
