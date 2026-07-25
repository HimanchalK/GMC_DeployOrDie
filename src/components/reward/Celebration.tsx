// components/reward/Celebration.tsx
// Responsibility: on-screen celebration overlay shown when a child earns a
// reward. Gentle, brief, accessible, reduced-motion aware.

import { useEffect } from "react";
import { Star } from "lucide-react";
import { Confetti } from "./Confetti";
import { StarBurst } from "./StarBurst";
import { cn } from "@/lib/utils";

interface CelebrationProps {
  title: string;
  message?: string;
  onClose?: () => void;
  autoCloseMs?: number;
  className?: string;
}

export function Celebration({
  title,
  message,
  onClose,
  autoCloseMs = 3500,
  className,
}: CelebrationProps) {
  useEffect(() => {
    if (!onClose || autoCloseMs <= 0) return;
    const t = setTimeout(onClose, autoCloseMs);
    return () => clearTimeout(t);
  }, [onClose, autoCloseMs]);

  return (
    <div
      role="alertdialog"
      aria-live="assertive"
      aria-label={title}
      className={cn(
        "fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/40 px-6 text-center backdrop-blur-[1px]",
        "motion-reduce:backdrop-blur-none",
        className,
      )}
    >
      <Confetti pieces={18} />
      <StarBurst size={104} />
      <div className="relative mt-6 space-y-1">
        <p className="text-2xl font-heading text-foreground">{title}</p>
        {message ? (
          <p className="text-sm text-muted-foreground">{message}</p>
        ) : null}
      </div>
      {onClose ? (
        <button
          type="button"
          onClick={onClose}
          className="mt-6 inline-flex h-12 min-w-48 items-center justify-center gap-2 rounded-2xl bg-primary px-5 text-base font-medium text-primary-foreground transition-all hover:bg-primary/90 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 active:translate-y-px"
        >
          <Star className="size-4" fill="currentColor" strokeWidth={1.5} />
          जारी राख्नुहोस्
        </button>
      ) : null}
    </div>
  );
}
