// app/api/social-story/route.ts
// Placeholder social-story endpoint.
// Phase 1+ work uses reward system only; AI social story generation is
// intentionally deferred. Exposed as a stub so the route is a valid module
// until the real implementation lands.

import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    { message: "social-story endpoint is not implemented yet" },
    { status: 501 },
  );
}
