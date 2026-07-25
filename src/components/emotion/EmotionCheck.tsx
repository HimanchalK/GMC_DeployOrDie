// components/emotion/EmotionCheck.tsx
// Responsibility: pre-learning prompt that asks the child how they feel.
// Big, gentle tap targets (>=48px), reduced-motion aware, and screen-reader
// friendly. Calls back with the chosen emotion.

import { useState } from "react";
import { cn } from "@/lib/utils";
import type { Emotion } from "@/types/emotion";

interface EmotionCheckProps {
  onChoose: (emotion: Emotion) => void;
  name?: string;
  className?: string;
}

type Option = { id: Emotion; emoji: string; label_np: string };

const OPTIONS: readonly Option[] = [
  { id: "happy", emoji: "🙂", label_np: "खुशी" },
  { id: "neutral", emoji: "😐", label_np: "ठीक" },
  { id: "sad", emoji: "🙁", label_np: "दुखी" },
];

export function EmotionCheck({ onChoose, name, className }: EmotionCheckProps) {
  const [selected, setSelected] = useState<Emotion | null>(null);
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div
        className={cn(
          "flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center",
          className,
        )}
        role="status"
        aria-live="polite"
      >
        <p className="text-3xl motion-reduce:animate-none">🙏</p>
        <p className="text-lg text-muted-foreground">
          धन्यवाद। तपाईं सिक्न तयार हुनुहुन्छ।
        </p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex min-h-screen flex-col items-center justify-center gap-8 px-6 text-center",
        className,
      )}
    >
      <div className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          सिक्नु अघि
        </p>
        <h2 className="text-2xl font-heading font-medium text-foreground">
          {name ? `${name}, तपाईं कस्तो महसुस गर्दै हुनुहुन्छ?` : "तपाईं कस्तो महसुस गर्दै हुनुहुन्छ?"}
        </h2>
      </div>

      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        {OPTIONS.map((opt) => {
          const active = selected === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              aria-pressed={active}
              onClick={() => setSelected(opt.id)}
              className={cn(
                "flex h-32 w-28 sm:h-36 sm:w-36 flex-col items-center justify-center gap-2 rounded-2xl bg-card ring-1 ring-border transition-all",
                "hover:bg-muted focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30",
                active && "ring-2 ring-primary bg-primary/5",
              )}
            >
              <span aria-hidden="true" className="text-5xl">
                {opt.emoji}
              </span>
              <span className="text-sm text-foreground">{opt.label_np}</span>
            </button>
          );
        })}
      </div>

      <button
        type="button"
        disabled={!selected}
        onClick={() => {
          if (!selected) return;
          onChoose(selected);
          setSubmitted(true);
        }}
        className="h-14 min-w-56 rounded-2xl bg-primary px-6 text-lg font-medium text-primary-foreground transition-all hover:bg-primary/90 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 active:translate-y-px disabled:opacity-50"
      >
        अघि बढ्नुहोस्
      </button>
    </div>
  );
}
