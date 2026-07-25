// components/parent/ProgressChart.tsx
// Responsibility: minimal inline bar chart rendered with design tokens only
// (no charting library). Shows weekly activity out of total answers.

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { WeeklyActivityPoint } from "@/types/parent";

interface ProgressChartProps {
  points: readonly WeeklyActivityPoint[];
  className?: string;
}

function dayLabel(iso: string): string {
  const d = new Date(iso);
  const daysNp = ["आइत", "सोम", "मंगल", "बुध", "बिही", "शुक्र", "शनि"];
  const daysEn = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const i = d.getDay();
  return `${daysEn[i] ?? ""} · ${daysNp[i] ?? ""}`;
}

export function ProgressChart({ points, className }: ProgressChartProps) {
  const maxTotal = Math.max(1, ...points.map((p) => p.total || 0));

  return (
    <Card className={cn("rounded-2xl bg-card", className)}>
      <CardContent className="p-5 sm:p-6 space-y-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Weekly Progress · साप्ताहिक प्रगति
          </p>
          <p className="text-lg font-heading font-medium text-foreground">
            This Week · हालको हप्ता
          </p>
        </div>

        {points.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No data available yet · अहिले कुनै डाटा छैन।
          </p>
        ) : (
          <ul className="space-y-2">
            {points.map((p) => {
              const ratio = p.total / maxTotal;
              const correctRatio =
                p.total > 0 ? Math.min(1, p.correct / p.total) : 0;
              return (
                <li key={p.date} className="flex items-center gap-3">
                  <span className="w-24 text-xs text-muted-foreground">
                    {dayLabel(p.date)}
                  </span>
                  <div
                    role="progressbar"
                    aria-valuenow={p.correct}
                    aria-valuemin={0}
                    aria-valuemax={p.total}
                    aria-label={`${p.correct} of ${p.total} correct · ${p.correct}/${p.total} सही`}
                    className="relative h-2.5 flex-1 overflow-hidden rounded-full bg-muted"
                  >
                    <div
                      className="absolute inset-y-0 left-0 rounded-full bg-primary/30"
                      style={{ width: `${ratio * 100}%` }}
                    />
                    <div
                      className="absolute inset-y-0 left-0 rounded-full bg-primary"
                      style={{ width: `${ratio * correctRatio * 100}%` }}
                    />
                  </div>
                  <span className="w-14 text-right text-xs text-muted-foreground tabular-nums">
                    {p.correct}/{p.total}
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
