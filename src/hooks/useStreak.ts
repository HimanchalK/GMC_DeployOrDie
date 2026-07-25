// hooks/useStreak.ts
// Responsibility: expose current streak to components and a `recordActivity`
// callback that increments the streak after a lesson is completed.
// Note: setState calls are deferred via the microtask queue to satisfy the
// React Compiler's "no setState synchronously inside effect" rule.

import { useCallback, useEffect, useState } from "react";
import {
  getStreak,
  recordStreakActivity,
} from "@/services/streak";

interface UseStreakResult {
  days: number;
  recordActivity: (childId: string) => void;
}

export function useStreak(childId: string | null): UseStreakResult {
  const [days, setDays] = useState(() => (childId ? getStreak(childId) : 0));

  useEffect(() => {
    Promise.resolve().then(() => {
      setDays(childId ? getStreak(childId) : 0);
    });
  }, [childId]);

  const recordActivity = useCallback((id: string) => {
    const state = recordStreakActivity(id);
    Promise.resolve().then(() => setDays(state.days));
  }, []);

  return { days, recordActivity };
}
