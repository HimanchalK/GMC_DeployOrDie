import { useEffect, useState } from "react";
import { getLessonById, getLessonItems } from "@/services/lessons";
import { Lesson, LessonItem } from "@/types/activity";

export function useLesson(
  lessonId: string,
  interestTag: string | null | undefined,
) {
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [items, setItems] = useState<LessonItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (interestTag === undefined) return; // still resolving, don't fetch yet

    let cancelled = false;

    async function load() {
      setLoading(true);
      try {
        const [lessonData, itemsData] = await Promise.all([
          getLessonById(lessonId),
          getLessonItems(lessonId, interestTag),
        ]);

        if (!cancelled) {
          setLesson(lessonData);
          setItems(itemsData);
        }
      } catch (err) {
        if (!cancelled) setError(err as Error);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [lessonId, interestTag]);

  return { lesson, items, loading, error };
}
