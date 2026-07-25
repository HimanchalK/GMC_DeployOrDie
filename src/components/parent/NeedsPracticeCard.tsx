// components/parent/NeedsPracticeCard.tsx
// Responsibility: list of areas where the child needs more practice, shown to
// the parent. Pure presentational, takes labelled rows.

import { AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { StrengthRow } from "@/types/parent";

interface NeedsPracticeCardProps {
  rows: readonly StrengthRow[];
  className?: string;
}

export function NeedsPracticeCard({ rows, className }: NeedsPracticeCardProps) {
  return (
    <Card className={cn("rounded-2xl bg-card", className)}>
      <CardContent className="p-5 sm:p-6 space-y-3">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground flex items-center gap-1.5">
          <AlertCircle className="size-3.5" strokeWidth={1.5} />
          Needs Practice · अभ्यास आवश्यक
        </p>

        {rows.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No special weaknesses right now · हाल कुनै विशेष कमजोरी छैन।
          </p>
        ) : (
          <ul className="space-y-2">
            {rows.map((r) => (
              <li
                key={r.label}
                className="flex items-center justify-between rounded-xl bg-muted/40 p-3"
              >
                <span className="text-sm text-foreground">{r.label}</span>
                <span className="text-xs text-muted-foreground tabular-nums">
                  {r.count} times · पटक
                </span>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
