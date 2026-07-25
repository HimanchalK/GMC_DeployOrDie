import { useEffect, useState } from "react";
import { getLessonById, getLessonItems } from "@/services/lessons";
import { Lesson, LessonItem } from "@/types/activity";

export function useLesson(lessonId: string) {
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [items, setItems] = useState<LessonItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      try {
        const [lessonData, itemsData] = await Promise.all([
          getLessonById(lessonId),
          getLessonItems(lessonId),
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
  }, [lessonId]);

  return { lesson, items, loading, error };
}
