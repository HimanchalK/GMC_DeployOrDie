// hooks/useEmotion.ts
// Responsibility: small hook that loads the latest mood for a child and
// exposes record() to save a new emotion check.

import { useCallback, useEffect, useState } from "react";
import { getLatestEmotion, recordEmotion } from "@/services/emotion";
import type { Emotion } from "@/types/emotion";

interface UseEmotionResult {
  emotion: Emotion | null;
  loading: boolean;
  record: (
    childId: string,
    emotion: Emotion,
    lessonId?: string,
  ) => Promise<void>;
}

export function useEmotion(childId: string | null): UseEmotionResult {
  const [emotion, setEmotion] = useState<Emotion | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const deferred = Promise.resolve().then(() => {
      if (cancelled) return;
      if (!childId) {
        setLoading(false);
        return;
      }
      setLoading(true);
      getLatestEmotion(childId)
        .then((last) => {
          if (!cancelled) setEmotion(last);
        })
        .catch(() => {
          if (!cancelled) setEmotion(null);
        })
        .finally(() => {
          if (!cancelled) setLoading(false);
        });
    });
    void deferred;
    return () => {
      cancelled = true;
    };
  }, [childId]);

  const record = useCallback(async (id: string, e: Emotion, lessonId?: string) => {
    await recordEmotion(id, e, lessonId);
    setEmotion(e);
  }, []);

  return { emotion, loading, record };
}
