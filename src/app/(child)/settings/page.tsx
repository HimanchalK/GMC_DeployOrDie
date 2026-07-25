// app/(child)/settings/page.tsx
// Responsibility: dedicated route for the child's accessibility settings.
// Reachable from the dashboard via a settings link. Includes a back button
// so a child can always return to the previous screen.

"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { AccessibilitySettings } from "@/components/settings/AccessibilitySettings";

export default function SettingsPage() {
  const router = useRouter();

  function handleBack() {
    // Prefer native history when available so we return exactly where
    // we came from (dashboard, but could be deep-linked from elsewhere).
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push("/dashboard");
    }
  }

  return (
    <main className="container mx-auto max-w-2xl px-4 py-10 space-y-8">
      <div>
        <button
          type="button"
          onClick={handleBack}
          className="inline-flex h-12 items-center gap-2 rounded-2xl border border-border px-4 text-sm text-foreground transition-all hover:bg-muted focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30"
          aria-label="Go back to previous screen"
        >
          <ArrowLeft className="h-5 w-5" strokeWidth={1.5} />
          Back · फर्कनुहोस्
        </button>
      </div>

      <AccessibilitySettings />
    </main>
  );
}
