// components/parent/RecentLessons.tsx
// Responsibility: scrollable list of the most recent lessons for a child.
// Pure presentational; takes already-shaped data.

import { CheckCircle, Play, Lock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { RecentLesson } from "@/types/parent";

interface RecentLessonsProps {
  lessons: readonly RecentLesson[];
  className?: string;
}

function formatDate(iso?: string | null): string {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleDateString("ne-NP", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return iso;
  }
}

const ACTIVITY_LABEL: Record<RecentLesson["activity_type"], string> = {
  matching: "Matching · म्याचिङ",
  counting: "Counting · गणना",
  sequencing: "Sequencing · अनुक्रम",
};

export function RecentLessons({ lessons, className }: RecentLessonsProps) {
  return (
    <Card className={cn("rounded-2xl bg-card", className)}>
      <CardContent className="p-5 sm:p-6 space-y-3">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Recent Lessons · हालका पाठहरू
        </p>

        {lessons.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No lessons yet · अहिले कुनै पाठ छैन।
          </p>
        ) : (
          <ul className="space-y-2">
            {lessons.map((l) => (
              <li
                key={l.lessonId}
                className="flex items-center gap-3 rounded-xl bg-muted/40 p-3"
              >
                <div
                  aria-hidden="true"
                  className={cn(
                    "grid size-9 place-items-center rounded-xl",
                    l.status === "completed"
                      ? "bg-primary/10 text-primary"
                      : l.status === "current"
                        ? "bg-foreground/5 text-foreground"
                        : "bg-muted text-muted-foreground",
                  )}
                >
                  {l.status === "completed" ? (
                    <CheckCircle className="size-5" strokeWidth={1.5} />
                  ) : l.status === "current" ? (
                    <Play className="size-5" strokeWidth={1.5} />
                  ) : (
                    <Lock className="size-5" strokeWidth={1.5} />
                  )}
                </div>
                <div className="min-w-0 flex-1 space-y-0.5">
                  <p className="truncate text-sm font-medium text-foreground">
                    {l.title_np}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {ACTIVITY_LABEL[l.activity_type]}
                    {typeof l.score === "number" && typeof l.total === "number"
                      ? ` · ${l.score}/${l.total}`
                      : ""}
                  </p>
                </div>
                <p className="text-xs text-muted-foreground tabular-nums">
                  {formatDate(l.completedAt)}
                </p>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
