// services/streak.ts
// Responsibility: small read/update helper for the daily learning streak.
// Mirrors a future Supabase `daily_streaks` table.
// Until that table exists, persists streak data in localStorage so the
// dashboard still shows a meaningful number without breaking the architecture.

import type { Child } from "@/types";

const KEY_PREFIX = "streak:";
const DAY_MS = 24 * 60 * 60 * 1000;

export interface StreakState {
  readonly lastActiveDate: string;
  readonly days: number;
  readonly history: readonly string[];
}

function readState(childId: string): StreakState | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(`${KEY_PREFIX}${childId}`);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as StreakState;
  } catch {
    return null;
  }
}

function writeState(childId: string, state: StreakState): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(`${KEY_PREFIX}${childId}`, JSON.stringify(state));
}

function ymd(d: Date | string): string {
  const date = typeof d === "string" ? new Date(d) : d;
  return date.toISOString().slice(0, 10);
}

export function getStreak(childId: string): number {
  const state = readState(childId);
  if (!state) return 0;

  const today = ymd(new Date());
  const yesterday = ymd(new Date(Date.now() - DAY_MS));
  if (state.lastActiveDate === today || state.lastActiveDate === yesterday) {
    return state.days;
  }
  // both dates passed - streak broken, but stale is fine
  if (state.days > 0 && state.lastActiveDate < yesterday) return 0;
  return state.days;
}

export function recordStreakActivity(childId: string): StreakState {
  const today = ymd(new Date());
  const existing = readState(childId);

  let history: string[];
  let days = 1;

  if (existing) {
    history = existing.history.filter((d) => d !== today);
    const yesterday = ymd(new Date(Date.now() - DAY_MS));
    if (existing.lastActiveDate === yesterday) {
      days = existing.days + 1;
    } else if (existing.lastActiveDate === today) {
      days = existing.days;
    } else {
      days = 1;
    }
  } else {
    history = [];
  }

  history.push(today);

  const state: StreakState = {
    lastActiveDate: today,
    days,
    history: history.slice(-30),
  };
  writeState(childId, state);
  return state;
}

export function resetStreak(childId: string): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(`${KEY_PREFIX}${childId}`);
}

export async function getStreakForChild(child: Child): Promise<number> {
  return getStreak(child.id);
}
