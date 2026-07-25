// app/(parent)/layout.tsx
// Placeholder parent layout. Parent features are intentionally deferred
// (parent authentication is tracked separately in context.md).
// Kept here so future parent-only routes have a stable shared layout.

import type { ReactNode } from "react";

export default function ParentLayout({ children }: { children: ReactNode }) {
  return <div className="min-h-screen bg-background">{children}</div>;
}
