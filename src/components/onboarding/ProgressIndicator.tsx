// components/onboarding/ProgressIndicator.tsx
import { cn } from "@/lib/utils";

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export function ProgressIndicator({
  currentStep,
  totalSteps,
}: ProgressIndicatorProps) {
  return (
    <div
      className="flex items-center justify-center gap-4 py-6"
      aria-label="Onboarding progress"
    >
      {/* Step count text */}
      <p className="text-sm text-muted-foreground">
        Step {currentStep} of {totalSteps}
      </p>

      {/* Dots */}
      <div className="flex items-center gap-2" aria-hidden="true">
        {Array.from({ length: totalSteps }, (_, i) => (
          <div
            key={i}
            className={cn(
              "h-3 w-3 rounded-full transition-colors duration-300",
              i < currentStep
                ? "bg-primary"
                : i === currentStep
                  ? "bg-primary ring-2 ring-primary/30"
                  : "bg-muted",
            )}
          />
        ))}
      </div>
    </div>
  );
}
