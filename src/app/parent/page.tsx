// app/(parent)/page.tsx
// Responsibility: parent landing/dashboard. UI-only per Phase 4 + Phase 9.
// Uses InsightsGrid (Phase 9) plus Phase 4 detail components. Until real
// analytics services return data, shows mock data so the layout is stable.

"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { ChildOverview } from "@/components/parent/ChildOverview";
import { ProgressChart } from "@/components/parent/ProgressChart";
import { WeeklyActivity } from "@/components/parent/WeeklyActivity";
import { StrengthsCard } from "@/components/parent/StrengthsCard";
import { NeedsPracticeCard } from "@/components/parent/NeedsPracticeCard";
import { InsightsGrid } from "@/components/parent/InsightsGrid";
import type { InsightSummary, WeeklyActivityPoint } from "@/types/parent";
import type { Child } from "@/types";

const MOCK_CHILD: Child = {
  id: "demo-child",
  name: "Aarav",
  interest_tag: "dinosaur",
  parent_id: null,
  created_at: new Date().toISOString(),
};

const MOCK_WEEK: WeeklyActivityPoint[] = [
  { date: "2026-07-20", correct: 4, total: 5 },
  { date: "2026-07-21", correct: 3, total: 4 },
  { date: "2026-07-22", correct: 5, total: 5 },
  { date: "2026-07-23", correct: 2, total: 4 },
  { date: "2026-07-24", correct: 3, total: 3 },
  { date: "2026-07-25", correct: 4, total: 5 },
];

const MOCK_SUMMARY: InsightSummary = {
  mostPlayedTheme: "डायनोसोर",
  weeklyProgress: 65,
  averageAccuracy: 0.78,
  timeLearningMinutes: 42,
  favouriteActivity: "matching",
  recentSessions: [
    {
      lessonId: "l1",
      title_np: "म्याचिङ — डायनोसोर",
      activity_type: "matching",
      status: "completed",
      score: 4,
      total: 4,
      completedAt: "2026-07-25T10:21:00Z",
    },
    {
      lessonId: "l2",
      title_np: "गणना — डायनोसोर",
      activity_type: "counting",
      status: "completed",
      score: 3,
      total: 5,
      completedAt: "2026-07-24T08:11:00Z",
    },
  ],
};

const MOCK_STRENGTHS = [{ label: "म्याचिङ", count: 8 }];
const MOCK_NEEDS = [{ label: "गणना प्रश्न ३", count: 3 }];

export default function ParentPage() {
  const router = useRouter();
  const weekly = useMemo(() => MOCK_WEEK, []);

  return (
    <main className="container mx-auto max-w-5xl space-y-6 px-4 py-10">
      <div>
        <button
          type="button"
          onClick={() => router.push("/")}
          className="inline-flex h-12 items-center gap-2 rounded-2xl border border-border px-4 text-sm text-foreground transition-all hover:bg-muted focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30"
          aria-label="Back to home"
        >
          <ArrowLeft className="h-5 w-5" strokeWidth={1.5} />
          Back to Home · गृहपृष्ठमा फर्कनुहोस्
        </button>
      </div>

      <div className="space-y-2">
        <p className="text-sm uppercase tracking-wide text-primary">
          Parent Dashboard · अभिभावक ड्यासबोर्ड
        </p>
        <h1 className="text-2xl font-heading font-semibold text-foreground">
          Your child&rsquo;s progress · तपाईंको बालबालिकाको प्रगति
        </h1>
        <p className="text-sm text-muted-foreground">
          This view uses demo data for now. Real data will be connected via
          the Phase 10 analytics tables when they land. · हाल यो दृश्य डेमो
          डाटाले भरिएको छ। Phase 10 को एनालिटिक्स तालिका उपलब्ध भएपछि वास्तविक
          डाटा जोडिनेछ।
        </p>
      </div>

      <ChildOverview
        child={MOCK_CHILD}
        completedLessons={2}
        totalLessons={3}
        currentStreak={3}
      />

      <div className="grid gap-4 lg:grid-cols-3">
        <ProgressChart points={weekly} className="lg:col-span-2" />
        <WeeklyActivity points={weekly} />
      </div>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Insights · इनसाइट्स</h2>
        <InsightsGrid summary={MOCK_SUMMARY} weekly={weekly} />
      </section>

      <div className="grid gap-4 lg:grid-cols-2">
        <StrengthsCard strengths={MOCK_STRENGTHS} />
        <NeedsPracticeCard rows={MOCK_NEEDS} />
      </div>
    </main>
  );
}
