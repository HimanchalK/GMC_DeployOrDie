// hooks/useAnalytics.ts
// Responsibility: small hook that exposes analytics summary + a few
// recording helpers used by feature code. Pure additive.

import { useCallback, useEffect, useRef, useState } from "react";
import {
  computeAnalyticsSummary,
  recordActivityAttempt,
  recordSessionEnd,
  recordSessionStart,
} from "@/services/analytics";
import type { AnalyticsSummary } from "@/types/analytics";

interface UseAnalyticsResult {
  summary: AnalyticsSummary | null;
  loading: boolean;
  recordAttempt: (attempt: {
    readonly child_id: string;
    readonly lesson_id: string;
    readonly activity_type: "matching" | "counting" | "sequencing";
    readonly is_correct: boolean;
    readonly lesson_item_id?: string | null;
  }) => Promise<void>;
  startSession: (params: { childId: string; lessonId: string }) => Promise<void>;
  endSession: (params: { score: number; total: number }) => Promise<void>;
}

export function useAnalytics(childId: string | null): UseAnalyticsResult {
  const [summary, setSummary] = useState<AnalyticsSummary | null>(null);
  const [loading, setLoading] = useState(false);
  const loadedFor = useRef<string | null>(null);
  const activeSessionId = useRef<string | null>(null);

  useEffect(() => {
    if (!childId || loadedFor.current === childId) return;
    loadedFor.current = childId;
    let cancelled = false;
    Promise.resolve()
      .then(async () => {
        if (!childId) return;
        if (!cancelled) setLoading(true);
        const data = await computeAnalyticsSummary(childId);
        if (!cancelled) setSummary(data);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [childId]);

  const recordAttempt = useCallback(async (attempt: {
    readonly child_id: string;
    readonly lesson_id: string;
    readonly activity_type: "matching" | "counting" | "sequencing";
    readonly is_correct: boolean;
    readonly lesson_item_id?: string | null;
  }) => {
    void recordActivityAttempt({
      ...attempt,
      lesson_item_id: attempt.lesson_item_id ?? null,
      attempted_at: new Date().toISOString(),
    });
  }, []);

  const startSession = useCallback(async (params: {
    childId: string;
    lessonId: string;
  }) => {
    const row = await recordSessionStart(params);
    if (row) activeSessionId.current = row.id;
  }, []);

  const endSession = useCallback(async (params: {
    score: number;
    total: number;
  }) => {
    const id = activeSessionId.current;
    if (!id) return;
    await recordSessionEnd({ sessionId: id, ...params });
    activeSessionId.current = null;
  }, []);

  return { summary, loading, recordAttempt, startSession, endSession };
}
