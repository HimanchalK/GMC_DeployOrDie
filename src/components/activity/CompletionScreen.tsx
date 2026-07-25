// components/activity/CompletionScreen.tsx
// Responsibility: shown once a lesson is finished. Adds a gentle reward
// celebration when the child achieved a perfect score, otherwise renders the
// standard completion UI. Uses existing design tokens only.

import { useState } from "react";
import { Celebration } from "@/components/reward/Celebration";
import { StarBurst } from "@/components/reward/StarBurst";

interface CompletionScreenProps {
  score: number;
  total: number;
  onContinue: () => void;
}

export function CompletionScreen({ score, total, onContinue }: CompletionScreenProps) {
  const perfect = total > 0 && score === total;
  const [dismissed, setDismissed] = useState(false);

  if (perfect && !dismissed) {
    return (
      <Celebration
        title="उत्कृष्ट अंक!"
        message="सबै प्रश्न सही भयो"
        onClose={() => setDismissed(true)}
        autoCloseMs={4000}
      />
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6 p-6 text-center">
      <StarBurst size={88} className="motion-reduce:animate-none" />
      <p className="text-2xl font-heading text-foreground">पाठ पूरा भयो!</p>
      <p className="text-lg text-muted-foreground">
        {score} / {total}
      </p>
      <button
        type="button"
        onClick={onContinue}
        className="h-14 w-full max-w-sm rounded-2xl bg-primary px-5 text-lg text-primary-foreground transition-all hover:bg-primary/90 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 active:translate-y-px"
      >
        ड्यासबोर्डमा फर्कनुहोस्
      </button>
    </div>
  );
}
