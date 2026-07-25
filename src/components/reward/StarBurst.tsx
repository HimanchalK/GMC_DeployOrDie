// components/reward/StarBurst.tsx
// Responsibility: displayed during a celebration moment.
// Renders a softly glowing star that pulses once and respects reduced-motion.

import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarBurstProps {
  size?: number;
  className?: string;
}

export function StarBurst({ size = 96, className }: StarBurstProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative grid place-items-center motion-reduce:animate-none",
        "animate-[starburst_900ms_ease-out_both]",
        className,
      )}
    >
      <div className="absolute inset-0 rounded-full bg-primary/15 blur-xl" />
      <Star
        className="text-primary drop-shadow-sm"
        style={{ width: size, height: size }}
        strokeWidth={1.5}
        fill="currentColor"
      />
      <style>{`
        @keyframes starburst {
          0% { transform: scale(0.4); opacity: 0; }
          35% { transform: scale(1.15); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
