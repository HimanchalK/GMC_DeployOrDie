// components/parent/InsightsGrid.tsx
// Responsibility: layout that renders Parent Insights (Phase 9) tiles.
// Takes the InsightSummary defined in types/parent and produces a
// consistent responsive grid.

import { RecentLessons } from "./RecentLessons";
import { InsightTile } from "./InsightTile";
import { ProgressChart } from "./ProgressChart";
import type { InsightSummary, WeeklyActivityPoint } from "@/types/parent";

interface InsightsGridProps {
  summary: InsightSummary;
  weekly: readonly WeeklyActivityPoint[];
  className?: string;
}

const ACTIVITY_LABEL: Record<string, string> = {
  matching: "Matching · म्याचिङ",
  counting: "Counting · गणना",
  sequencing: "Sequencing · अनुक्रम",
};

export function InsightsGrid({
  summary,
  weekly,
  className,
}: InsightsGridProps) {
  return (
    <div className={"grid gap-4 sm:grid-cols-2 lg:grid-cols-3 " + (className ?? "")}>
      <InsightTile
        label="Most Played Theme · धेरै खेलिएको थीम"
        value={summary.mostPlayedTheme ?? "—"}
      />
      <InsightTile
        label="Weekly Progress · साप्ताहिक प्रगति"
        value={`${summary.weeklyProgress}%`}
      />
      <InsightTile
        label="Average Accuracy · औसत शुद्धता"
        value={`${Math.round(summary.averageAccuracy * 100)}%`}
      />
      <InsightTile
        label="Time Learning · सिकेको समय"
        value={`${summary.timeLearningMinutes} min · मिनेट`}
      />
      <InsightTile
        label="Favourite Activity · मनपर्ने गतिविधि"
        value={
          summary.favouriteActivity
            ? ACTIVITY_LABEL[summary.favouriteActivity] ?? summary.favouriteActivity
            : "—"
        }
      />
      <ProgressChart points={weekly} />
      <RecentLessons lessons={summary.recentSessions} className="sm:col-span-2 lg:col-span-3" />
    </div>
  );
}
