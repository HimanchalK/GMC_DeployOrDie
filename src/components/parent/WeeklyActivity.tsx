// components/parent/WeeklyActivity.tsx
// Responsibility: small summary card showing how many lessons were
// completed in the current week, plus today's contribution.

import { CalendarDays } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { WeeklyActivityPoint } from "@/types/parent";

interface WeeklyActivityProps {
  points: readonly WeeklyActivityPoint[];
  className?: string;
}

function summarize(points: readonly WeeklyActivityPoint[]) {
  const totalCorrect = points.reduce((s, p) => s + p.correct, 0);
  const totalAttempts = points.reduce((s, p) => s + p.total, 0);
  const today = new Date().toISOString().slice(0, 10);
  const todayPoint = points.find((p) => p.date === today);
  return {
    totalCorrect,
    totalAttempts,
    today: todayPoint?.correct ?? 0,
  };
}

export function WeeklyActivity({ points, className }: WeeklyActivityProps) {
  const summary = summarize(points);

  return (
    <Card className={cn("rounded-2xl bg-card", className)}>
      <CardContent className="p-5 sm:p-6 flex items-start justify-between gap-3">
        <div className="space-y-1">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground flex items-center gap-1.5">
            <CalendarDays className="size-3.5" strokeWidth={1.5} />
            Weekly Activity · साप्ताहिक क्रियाकलाप
          </p>
          <p className="text-2xl font-heading font-medium text-foreground">
            {summary.totalCorrect} correct · सही
          </p>
          <p className="text-sm text-muted-foreground">
            Today: {summary.today} correct · आज: {summary.today} सही
          </p>
        </div>
        <div className="text-right space-y-0.5">
          <p className="text-xs text-muted-foreground">
            Total Attempts · कुल प्रयास
          </p>
          <p className="text-sm font-medium text-foreground tabular-nums">
            {summary.totalAttempts}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
