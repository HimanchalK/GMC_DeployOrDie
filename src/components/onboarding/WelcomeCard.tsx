// components/onboarding/WelcomeCard.tsx
import { Card, CardContent } from "@/components/ui/card";

interface WelcomeCardProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export function WelcomeCard({
  title,
  description,
  children,
}: WelcomeCardProps) {
  return (
    <Card className="w-full max-w-md mx-auto rounded-2xl shadow-card">
      <CardContent className="flex flex-col items-center text-center p-8 sm:p-10 space-y-6">
        {/* Title & description */}
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
            {title}
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground max-w-sm">
            {description}
          </p>
        </div>

        {/* Slot for form / interactive content */}
        <div className="w-full">{children}</div>
      </CardContent>
    </Card>
  );
}
