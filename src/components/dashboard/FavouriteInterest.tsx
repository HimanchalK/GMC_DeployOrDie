// components/dashboard/FavouriteInterest.tsx
// Responsibility: small chip that surfaces the child's chosen interest as
// their current favourite theme. Used to reaffirm "you belong here".

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Interest } from "@/types";

interface FavouriteInterestProps {
  interest: Interest;
  className?: string;
}

const META: Record<Interest, { label: string; emoji: string }> = {
  dinosaur: { label: "डायनोसोर", emoji: "🦕" },
  vehicle: { label: "सवारी", emoji: "🚗" },
  animal: { label: "जनावर", emoji: "🐾" },
};

export function FavouriteInterest({ interest, className }: FavouriteInterestProps) {
  const meta = META[interest];

  return (
    <Card className={cn("rounded-2xl bg-secondary/30", className)}>
      <CardContent className="p-5 sm:p-6 flex items-center gap-3">
        <span aria-hidden="true" className="text-2xl">
          {meta.emoji}
        </span>
        <div className="space-y-0.5">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            मनपर्ने थीम
          </p>
          <p className="font-heading text-base font-medium text-foreground">
            {meta.label}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
