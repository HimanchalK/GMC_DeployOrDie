// services/accessibility.ts
// Responsibility: persists accessibility preferences in localStorage and
// applies them to <html> as data attributes / classes so global CSS can
// react. The service is backend-agnostic and runs only in the browser.

import type { AccessibilitySettings } from "@/types";

const STORAGE_KEY = "hamro:accessibility";

export const DEFAULT_ACCESSIBILITY: AccessibilitySettings = {
  calmMode: false,
  dyslexiaFont: false,
  colorblindMode: false,
  largeText: false,
  reduceMotion: false,
  muteSounds: false,
  highContrast: false,
};

function read(): AccessibilitySettings {
  if (typeof window === "undefined") return DEFAULT_ACCESSIBILITY;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return DEFAULT_ACCESSIBILITY;
  try {
    return { ...DEFAULT_ACCESSIBILITY, ...(JSON.parse(raw) as Partial<AccessibilitySettings>) };
  } catch {
    return DEFAULT_ACCESSIBILITY;
  }
}

function write(settings: AccessibilitySettings): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
}

const DATA_ATTRS = [
  "data-calm-mode",
  "data-dyslexia-font",
  "data-colorblind-mode",
  "data-large-text",
  "data-reduce-motion",
  "data-mute-sounds",
  "data-high-contrast",
] as const;

const KEYS = [
  "calmMode",
  "dyslexiaFont",
  "colorblindMode",
  "largeText",
  "reduceMotion",
  "muteSounds",
  "highContrast",
] as const;

export function applySettings(settings: AccessibilitySettings): void {
  if (typeof document === "undefined") return;
  const html = document.documentElement;
  for (let i = 0; i < KEYS.length; i += 1) {
    const value = settings[KEYS[i]];
    html.setAttribute(DATA_ATTRS[i], value ? "on" : "off");
  }
}

export function getAccessibility(): AccessibilitySettings {
  return read();
}

export function setAccessibility(
  settings: AccessibilitySettings,
): AccessibilitySettings {
  write(settings);
  applySettings(settings);
  return settings;
}
