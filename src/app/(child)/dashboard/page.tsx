"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { getChild } from "@/services/children";
import { getProgress } from "@/services/progress";
import { useAchievement } from "@/hooks/useAchievement";
import { useStreak } from "@/hooks/useStreak";
import { WelcomeBanner } from "@/components/dashboard/WelcomeBanner";
import { LessonCard } from "@/components/dashboard/LessonCard";
import { ProgressCard } from "@/components/dashboard/ProgressCard";
import { EmptyState } from "@/components/dashboard/EmptyState";
import { ContinueLearning } from "@/components/dashboard/ContinueLearning";
import { TodaysGoal } from "@/components/dashboard/TodaysGoal";
import { LearningStreak } from "@/components/dashboard/LearningStreak";
import { FavouriteInterest } from "@/components/dashboard/FavouriteInterest";
import { RecentAchievement } from "@/components/dashboard/RecentAchievement";
import { AchievementGrid } from "@/components/achievement/AchievementGrid";

import { Achievement } from "@/types/achievement";
import { Child, ProgressLesson } from "@/types";

function countTodayCompleted(progress: ProgressLesson[]): number {
  const today = new Date().toISOString().slice(0, 10);
  return progress.filter(
    (p) =>
      p.status === "completed" &&
      (p as ProgressLesson & { completed_at?: string | null }).completed_at?.slice(0, 10) === today,
  ).length;
}

function pickRecentUnlocked(
  achievements: readonly Achievement[],
  progress: Record<string, { status: string }>,
): Achievement | undefined {
  for (const a of achievements) {
    if (progress[a.id]?.status === "unlocked") return a;
  }
  return undefined;
}

function readChildIdFromStorage(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("childId");
}

export default function DashboardPage() {
  const router = useRouter();

  // `childId` is initialized once on first render via the lazy useState
  // initializer. This avoids the setState-in-effect pattern flagged by the
  // React Compiler.
  const [childId] = useState<string | null>(readChildIdFromStorage);
  // `loading` is true initially; we also pre-set it from the presence of
  // childId so the redirect branch doesn't need to flip it synchronously
  // inside the effect.
  const [child, setChild] = useState<Child | null>(null);
  const [progress, setProgress] = useState<ProgressLesson[]>([]);
  const [loading, setLoading] = useState(() => childId !== null);

  const achievements = useAchievement(childId);
  const streak = useStreak(childId);

  useEffect(() => {
    const storedId = childId;

    if (!storedId) {
      Promise.resolve().then(() => setLoading(false));
      router.replace("/onboarding");
      return;
    }

    let cancelled = false;
    (async () => {
      try {
        const childData = await getChild(storedId);
        if (cancelled) return;
        setChild(childData);
        streak.recordActivity(childData.id);
        const progressData = await getProgress(storedId);
        if (cancelled) return;
        setProgress(progressData);
      } catch (error) {
        console.error(error);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [router, childId, streak]);

  const handleContinue = useCallback(
    (lessonId: string) => {
      router.push(`/activity/${lessonId}`);
    },
    [router],
  );

  if (loading) {
    return (
      <main className="container mx-auto py-16">
        <p className="text-center text-muted-foreground">
          Loading dashboard...
        </p>
      </main>
    );
  }

  if (!child) {
    return (
      <main className="container mx-auto py-16">
        <EmptyState />
      </main>
    );
  }

  const completed = progress.filter((l) => l.status === "completed").length;
  const completedToday = countTodayCompleted(progress);
  const recentAchievement = pickRecentUnlocked(
    achievements.achievements,
    achievements.progress,
  );

  return (
    <main className="container mx-auto max-w-5xl space-y-8 px-4 py-10">
      <WelcomeBanner name={child.name} interest={child.interest_tag} />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <ProgressCard
          completed={completed}
          total={progress.length}
          className="sm:col-span-2 lg:col-span-2"
        />
        <TodaysGoal completedToday={completedToday} goal={1} />
        <LearningStreak days={streak.days} />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <ContinueLearning
          progress={progress}
          onContinue={handleContinue}
          className="lg:col-span-2"
        />
        <FavouriteInterest interest={child.interest_tag} />
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Today&rsquo;s Learning</h2>

        {progress.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid gap-5 md:grid-cols-3">
            {progress.map((item) => (
              <LessonCard
                key={item.lesson_id}
                title={item.lessons.title_np}
                description={item.lessons.description_np}
                status={item.status}
                onClick={() => {
                  if (item.status === "current") {
                    router.push(`/activity/${item.lessons.id}`);
                  }
                }}
              />
            ))}
          </div>
        )}
      </section>

      {recentAchievement ? (
        <RecentAchievement
          achievement={recentAchievement}
          progress={achievements.progress[recentAchievement.id]}
        />
      ) : null}

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">उपलब्धिहरू</h2>
        <AchievementGrid
          achievements={achievements.achievements}
          progress={achievements.progress}
        />
      </section>

      <div className="flex justify-end pt-2">
        <button
          type="button"
          onClick={() => router.push("/settings")}
          className="h-12 rounded-2xl border border-border px-5 text-sm text-foreground transition-all hover:bg-muted focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30"
        >
          पहुँचयोग्यता सेटिङ
        </button>
      </div>
    </main>
  );
}

