// components/parent/ChildOverview.tsx
// Responsibility: compact overview of a single child used by parent pages.
// Intentionally presentational — no auth, no data fetching.

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Child } from "@/types";

interface ChildOverviewProps {
  child: Child;
  completedLessons: number;
  totalLessons: number;
  currentStreak?: number;
  className?: string;
}

const INTEREST_LABEL: Record<string, { label: string; labelNp: string; emoji: string }> = {
  dinosaur: { label: "Dinosaurs", labelNp: "डायनोसोर", emoji: "🦕" },
  vehicle: { label: "Vehicles", labelNp: "सवारी", emoji: "🚗" },
  animal: { label: "Animals", labelNp: "जनावर", emoji: "🐾" },
};

export function ChildOverview({
  child,
  completedLessons,
  totalLessons,
  currentStreak = 0,
  className,
}: ChildOverviewProps) {
  const interest = INTEREST_LABEL[child.interest_tag] ?? {
    label: child.interest_tag,
    labelNp: child.interest_tag,
    emoji: "⭐",
  };

  return (
    <Card className={cn("rounded-2xl bg-card", className)}>
      <CardContent className="p-5 sm:p-6 space-y-3">
        <div className="flex items-center gap-3">
          <div
            aria-hidden="true"
            className="grid size-12 place-items-center rounded-full bg-primary/10 text-2xl"
          >
            {interest.emoji}
          </div>
          <div className="space-y-0.5">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Child · बालबालिका
            </p>
            <p className="text-lg font-heading font-medium text-foreground">
              {child.name}
            </p>
          </div>
        </div>

        <dl className="grid grid-cols-2 gap-3 pt-2">
          <Stat label="Theme · थीम" value={`${interest.label} · ${interest.labelNp}`} />
          <Stat
            label="Streak · निरन्तर"
            value={`${currentStreak} day(s) · ${currentStreak} दिन`}
          />
          <Stat
            label="Completed · पाठ सकिएको"
            value={`${completedLessons}/${totalLessons}`}
          />
          <Stat label="Interest · रुचि" value={`${interest.label} · ${interest.labelNp}`} />
        </dl>
      </CardContent>
    </Card>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-muted/40 p-3">
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className="text-sm font-medium text-foreground">{value}</dd>
    </div>
  );
}
