// components/parent/InsightTile.tsx
// Responsibility: small labelled metric tile reused across Parent Insights.
// Calm, predictable, accessible. Pure presentational.

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface InsightTileProps {
  label: string;
  value: string;
  hint?: string;
  className?: string;
}

export function InsightTile({ label, value, hint, className }: InsightTileProps) {
  return (
    <Card className={cn("rounded-2xl bg-card", className)}>
      <CardContent className="p-5 sm:p-6 space-y-1">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {label}
        </p>
        <p className="text-2xl font-heading font-medium text-foreground">
          {value}
        </p>
        {hint ? (
          <p className="text-sm text-muted-foreground">{hint}</p>
        ) : null}
      </CardContent>
    </Card>
  );
}
