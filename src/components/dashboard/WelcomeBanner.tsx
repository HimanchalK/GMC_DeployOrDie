// components/dashboard/WelcomeBanner.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";

interface WelcomeBannerProps {
  name: string;
  interest: "dinosaur" | "vehicle" | "animal";
}

const interestMap: Record<string, { label: string; emoji: string }> = {
  dinosaur: { label: "Dinosaurs", emoji: "🦕" },
  vehicle: { label: "Vehicles", emoji: "🚗" },
  animal: { label: "Animals", emoji: "🐾" },
};

export function WelcomeBanner({ name, interest }: WelcomeBannerProps) {
  const { label, emoji } = interestMap[interest];

  return (
    <Card className="w-full rounded-2xl border-none bg-card shadow-subtle">
      <CardContent className="p-6 sm:p-8 space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl font-semibold text-foreground">
              Hello, {name}!
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base">
              Ready for today’s learning adventure?
            </p>
          </div>

          <Badge
            variant="secondary"
            className="text-sm px-4 py-2 rounded-full bg-muted hover:bg-muted"
          >
            <span className="mr-1.5 text-base" aria-hidden="true">
              {emoji}
            </span>
            {label}
          </Badge>
        </div>

        <p className="text-sm text-muted-foreground border-t border-border pt-4">
          <Sparkles className="inline-block h-4 w-4 mr-1.5 text-amber-500" />
          You’re doing great! Pick an activity below to keep learning.
        </p>
      </CardContent>
    </Card>
  );
}
