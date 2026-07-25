// components/dashboard/ProgressCard.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface ProgressCardProps {
  completed: number;
  total: number;
  className?: string;
}

export function ProgressCard({ completed, total, className }: ProgressCardProps) {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  const getEncouragement = () => {
    if (percentage === 0) return "Time to start your first lesson!";
    if (percentage < 50) return "You’re making steady progress.";
    if (percentage < 100) return "You’re more than halfway there!";
    return "All lessons completed! Amazing work!";
  };

  return (
    <Card className={cn("w-full rounded-2xl bg-card shadow-subtle", className)}>
      <CardContent className="p-6 sm:p-8 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-foreground">
              Your Progress
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              {completed} of {total} lessons completed
            </p>
          </div>
          <span className="text-3xl font-bold text-primary">{percentage}%</span>
        </div>

        <Progress value={percentage} className="h-2.5 rounded-full" />

        <p className="text-sm text-muted-foreground italic">
          {getEncouragement()}
        </p>
      </CardContent>
    </Card>
  );
}
