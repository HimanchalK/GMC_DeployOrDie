"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { getChild } from "@/services/children";
import { getProgress } from "@/services/progress";
import { initializeProgress } from "@/services/progress";
import { WelcomeBanner } from "@/components/dashboard/WelcomeBanner";
import { LessonCard } from "@/components/dashboard/LessonCard";
import { ProgressCard } from "@/components/dashboard/ProgressCard";
import { EmptyState } from "@/components/dashboard/EmptyState";

import { Child } from "@/types";

export default function DashboardPage() {
  const router = useRouter();

  const [child, setChild] = useState<Child | null>(null);
  const [progress, setProgress] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const childId = localStorage.getItem("childId");

        if (!childId) {
          router.replace("/onboarding");
          return;
        }

        const childData = await getChild(childId);
        setChild(childData);

        const progressData = await getProgress(childId);
        setProgress(progressData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, [router]);

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

  const completedLessons = progress.filter(
    (lesson) => lesson.status === "completed",
  ).length;

  return (
    <main className="container mx-auto max-w-5xl space-y-8 px-4 py-10">
      <WelcomeBanner name={child.name} interest={child.interest_tag} />

      <ProgressCard completed={completedLessons} total={progress.length} />

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Today's Learning</h2>

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
                  if (item.status !== "locked") {
                    router.push(`/${item.lessons.activity_type}`);
                  }
                }}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
