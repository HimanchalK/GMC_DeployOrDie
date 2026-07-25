// components/dashboard/ContinueLearning.tsx
// Responsibility: shortcut card that hands the child a single primary CTA
// to resume the lesson that is `status == "current"`. Falls back to a quiet
// "all caught up" state when nothing is current.

import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { ProgressLesson } from "@/types";

interface ContinueLearningProps {
  progress: ProgressLesson[];
  onContinue: (lessonId: string) => void;
  className?: string;
}

export function ContinueLearning({
  progress,
  onContinue,
  className,
}: ContinueLearningProps) {
  const current = progress.find((p) => p.status === "current");

  if (!current) {
    return (
      <Card className={cn("rounded-2xl bg-card", className)}>
        <CardContent className="p-5 sm:p-6">
          <p className="font-medium text-foreground">सबै पाठ सकियो!</p>
          <p className="text-sm text-muted-foreground">
            तपाईंले उपलब्ध सबै पाठ पूरा गर्नुभयो। राम्रो काम!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      role="button"
      tabIndex={0}
      onClick={() => onContinue(current.lessons.id)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onContinue(current.lessons.id);
        }
      }}
      className={cn(
        "cursor-pointer rounded-2xl bg-primary/5 ring-1 ring-primary/20 transition-all hover:bg-primary/10 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30",
        className,
      )}
    >
      <CardContent className="p-5 sm:p-6 flex items-center justify-between gap-4">
        <div className="space-y-1">
          <p className="text-xs font-medium uppercase tracking-wide text-primary">
            जारी राख्नुहोस्
          </p>
          <p className="text-lg font-heading font-medium text-foreground">
            {current.lessons.title_np}
          </p>
          {current.lessons.description_np ? (
            <p className="text-sm text-muted-foreground line-clamp-1">
              {current.lessons.description_np}
            </p>
          ) : null}
        </div>
        <ArrowRight className="size-6 text-primary" strokeWidth={1.5} />
      </CardContent>
    </Card>
  );
}
