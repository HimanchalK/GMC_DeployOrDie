// hooks/useAccessibility.ts
// Responsibility: small hook exposing the current accessibility settings,
// toggling individual flags, and persisting+applying changes.

import { useCallback, useEffect, useState } from "react";
import {
  DEFAULT_ACCESSIBILITY,
  getAccessibility,
  setAccessibility,
} from "@/services/accessibility";
import type { AccessibilitySettings } from "@/types";

interface UseAccessibilityResult {
  settings: AccessibilitySettings;
  update: (next: Partial<AccessibilitySettings>) => void;
  toggle: (key: keyof AccessibilitySettings) => void;
  reset: () => void;
}

const readInitial = (): AccessibilitySettings =>
  typeof window === "undefined"
    ? DEFAULT_ACCESSIBILITY
    : getAccessibility();

export function useAccessibility(): UseAccessibilityResult {
  const [settings, setSettings] = useState<AccessibilitySettings>(readInitial);

  // re-apply settings when the hook mounts (handles SPA navigation)
  useEffect(() => {
    Promise.resolve().then(() => {
      setSettings(getAccessibility());
    });
  }, []);

  const update = useCallback((next: Partial<AccessibilitySettings>) => {
    setSettings((prev) => ({ ...prev, ...next }));
  }, []);

  // persist + apply side effects through a dedicated effect keyed on settings.
  useEffect(() => {
    setAccessibility(settings);
  }, [settings]);

  const toggle = useCallback((key: keyof AccessibilitySettings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  const reset = useCallback(() => {
    setSettings(DEFAULT_ACCESSIBILITY);
  }, []);

  return { settings, update, toggle, reset };
}
