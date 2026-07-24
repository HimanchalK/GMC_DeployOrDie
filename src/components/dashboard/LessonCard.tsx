// components/dashboard/LessonCard.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Lock, CheckCircle, Play } from "lucide-react";

interface LessonCardProps {
  title: string;
  description: string;
  status: "locked" | "current" | "completed";
  onClick?: () => void;
}

const statusConfig = {
  locked: {
    icon: Lock,
    label: "Locked",
    className: "opacity-60 pointer-events-none bg-muted/50",
    badgeVariant: "outline" as const,
  },
  current: {
    icon: Play,
    label: "Start",
    className: "cursor-pointer hover:shadow-md bg-card",
    badgeVariant: "default" as const,
  },
  completed: {
    icon: CheckCircle,
    label: "Done",
    className: "bg-primary/5 cursor-default",
    badgeVariant: "secondary" as const,
  },
};

export function LessonCard({
  title,
  description,
  status,
  onClick,
}: LessonCardProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <Card
      role={status !== "locked" ? "button" : undefined}
      tabIndex={status !== "locked" ? 0 : undefined}
      onClick={status !== "locked" ? onClick : undefined}
      onKeyDown={(e) => {
        if (
          status !== "locked" &&
          onClick &&
          (e.key === "Enter" || e.key === " ")
        ) {
          e.preventDefault();
          onClick();
        }
      }}
      className={cn(
        "transition-all duration-200 border border-border rounded-2xl",
        config.className,
      )}
    >
      <CardContent className="p-5 sm:p-6 flex flex-col gap-4">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h3 className="font-medium text-foreground text-lg">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>

          <div className="flex-shrink-0 ml-4">
            <Icon
              className={cn(
                "h-6 w-6",
                status === "completed"
                  ? "text-primary"
                  : status === "current"
                    ? "text-primary"
                    : "text-muted-foreground/50",
              )}
            />
          </div>
        </div>

        <Badge
          variant={config.badgeVariant}
          className="self-start text-xs font-normal rounded-full px-3 py-0.5"
        >
          {config.label}
        </Badge>
      </CardContent>
    </Card>
  );
}
