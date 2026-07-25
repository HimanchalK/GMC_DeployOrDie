// components/dashboard/TodaysGoal.tsx
// Responsibility: small goal row on the dashboard.
// Shows completed-of-target lessons for today. Goal target is gentle (1 by
// default) and predictable, not gamified.

import { CheckCircle2, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

interface TodaysGoalProps {
  completedToday: number;
  goal?: number;
  className?: string;
}

export function TodaysGoal({
  completedToday,
  goal = 1,
  className,
}: TodaysGoalProps) {
  const met = completedToday >= goal;

  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-2xl bg-card px-5 py-4 ring-1 ring-border",
        className,
      )}
      aria-live="polite"
    >
      {met ? (
        <CheckCircle2 className="size-6 text-primary" strokeWidth={1.5} />
      ) : (
        <Circle className="size-6 text-muted-foreground" strokeWidth={1.5} />
      )}
      <div className="space-y-0.5">
        <p className="font-medium text-foreground">आजको लक्ष्य</p>
        <p className="text-sm text-muted-foreground">
          {met
            ? "लक्ष्य पूरा भयो। राम्रो!"
            : `${completedToday}/${goal} पाठ सकाउनुहोस्`}
        </p>
      </div>
    </div>
  );
}
