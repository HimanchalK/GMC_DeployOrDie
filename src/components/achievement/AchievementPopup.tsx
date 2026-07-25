// components/achievement/AchievementPopup.tsx
// Responsibility: ephemeral popup shown the moment an achievement transitions
// to "unlocked". Subtle, accessible, reduced-motion aware.

import { useEffect } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Achievement } from "@/types/achievement";

interface AchievementPopupProps {
  achievement: Achievement;
  onClose?: () => void;
  autoCloseMs?: number;
  className?: string;
}

export function AchievementPopup({
  achievement,
  onClose,
  autoCloseMs = 4000,
  className,
}: AchievementPopupProps) {
  useEffect(() => {
    if (!onClose || autoCloseMs <= 0) return;
    const t = setTimeout(onClose, autoCloseMs);
    return () => clearTimeout(t);
  }, [onClose, autoCloseMs]);

  return (
    <div
      role="alert"
      aria-live="assertive"
      className={cn(
        "fixed left-1/2 top-6 z-50 -translate-x-1/2",
        "mx-4 max-w-sm rounded-2xl bg-card px-5 py-4 text-foreground shadow-lg ring-1 ring-primary/20",
        "motion-reduce:animate-none",
        "animate-[popup-in_300ms_ease-out_both]",
        className,
      )}
    >
      <div className="flex items-start gap-3">
        <div
          aria-hidden="true"
          className="grid size-9 place-items-center rounded-xl bg-primary/10 text-primary"
        >
          <Star className="size-5" fill="currentColor" strokeWidth={1.5} />
        </div>
        <div className="space-y-0.5">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            नयाँ उपलब्धि
          </p>
          <p className="font-heading text-base font-medium">{achievement.title_np}</p>
          <p className="text-sm text-muted-foreground">
            {achievement.description_np}
          </p>
        </div>
      </div>
      {onClose ? (
        <button
          type="button"
          onClick={onClose}
          className="mt-3 w-full rounded-xl border border-border px-3 py-2 text-sm text-foreground transition-all hover:bg-muted focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30"
        >
          बन्द गर्नुहोस्
        </button>
      ) : null}
      <style>{`
        @keyframes popup-in {
          0% { transform: translate(-50%, -8px); opacity: 0; }
          100% { transform: translate(-50%, 0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
