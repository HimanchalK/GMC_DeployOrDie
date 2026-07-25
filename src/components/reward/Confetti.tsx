// components/reward/Confetti.tsx
// Responsibility: gentle, reduced-motion aware confetti burst.
// Pure CSS animation (no third-party libraries).
// Honors the user's prefers-reduced-motion setting.
// Pieces are generated deterministically (no Math.random during render)
// to keep render pure for the React Compiler.

import { useMemo } from "react";
import { cn } from "@/lib/utils";

interface ConfettiProps {
  pieces?: number;
  className?: string;
}

interface Piece {
  readonly left: number;
  readonly delay: number;
  readonly duration: number;
  readonly color: string;
  readonly rotate: number;
}

const COLORS = [
  "bg-primary",
  "bg-secondary",
  "bg-accent",
  "bg-foreground/40",
];

// Tiny deterministic PRNG (mulberry32) so the burst is varied yet stable
// across renders, keeping render pure.
function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return function next() {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function Confetti({ pieces = 14, className }: ConfettiProps) {
  const items = useMemo<Piece[]>(() => {
    const rand = mulberry32(pieces * 2654435761);
    return Array.from({ length: pieces }, () => {
      const r = rand();
      const r2 = rand();
      const r3 = rand();
      const r4 = rand();
      const r5 = rand();
      return {
        left: r * 100,
        delay: r2 * 0.6,
        duration: 1.6 + r3 * 1.4,
        color: COLORS[Math.floor(r4 * COLORS.length)],
        rotate: r5 * 360,
      };
    });
  }, [pieces]);

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 overflow-visible motion-reduce:hidden",
        className,
      )}
    >
      {items.map((p, i) => (
        <span
          key={i}
          style={{
            left: `${p.left}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            transform: `rotate(${p.rotate}deg)`,
          }}
          className={cn(
            "absolute top-1/2 h-2 w-2 rounded-[2px] opacity-80",
            p.color,
            "animate-[confetti-fall_2s_ease-out_forwards]",
          )}
        />
      ))}
      <style>{`
        @keyframes confetti-fall {
          0% { transform: translateY(-20px) scale(0.6); opacity: 0; }
          15% { opacity: 0.9; }
          100% { transform: translateY(120px) scale(1); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
