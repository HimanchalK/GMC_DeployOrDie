// components/parent/StrengthsCard.tsx
// Responsibility: list of strengths (areas where the child excels) shown to
// the parent. Pure presentational, takes labelled rows.

import { TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { StrengthRow } from "@/types/parent";

interface StrengthsCardProps {
  strengths: readonly StrengthRow[];
  className?: string;
}

export function StrengthsCard({ strengths, className }: StrengthsCardProps) {
  return (
    <Card className={cn("rounded-2xl bg-card", className)}>
      <CardContent className="p-5 sm:p-6 space-y-3">
        <p className="text-xs font-medium uppercase tracking-wide text-primary flex items-center gap-1.5">
          <TrendingUp className="size-3.5" strokeWidth={1.5} />
          Strengths · सशक्त पक्ष
        </p>

        {strengths.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No data available yet · अहिले कुनै डाटा उपलब्ध छैन।
          </p>
        ) : (
          <ul className="space-y-2">
            {strengths.map((s) => {
              const max = Math.max(...strengths.map((x) => x.count), 1);
              return (
                <li key={s.label} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground">{s.label}</span>
                    <span className="text-xs text-muted-foreground tabular-nums">
                      {s.count}
                    </span>
                  </div>
                  <div
                    className="h-2 overflow-hidden rounded-full bg-muted"
                    role="progressbar"
                    aria-valuenow={s.count}
                    aria-valuemin={0}
                    aria-valuemax={max}
                  >
                    <div
                      className="h-full rounded-full bg-primary"
                      style={{ width: `${(s.count / max) * 100}%` }}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
