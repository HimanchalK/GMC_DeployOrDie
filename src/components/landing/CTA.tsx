// components/landing/CTA.tsx
// Responsibility: bottom-of-landing call-to-action. "Start Learning" routes
// to /onboarding. If a child session already exists, the dashboard itself
// handles continuing (see dashboard redirect).

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export function CTA() {
  return (
    <section
      className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8"
      aria-labelledby="cta-heading"
    >
      <div className="mx-auto max-w-2xl text-center">
        <h2
          id="cta-heading"
          className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground"
        >
          Ready to Begin?
        </h2>
        <p className="mt-4 text-base sm:text-lg leading-relaxed max-w-md mx-auto text-muted-foreground">
          A calm, supportive space for your child to learn and grow. Start
          exploring today — at your own pace.
        </p>
        <div className="mt-8">
          <Link href="/onboarding" prefetch>
            <Button size="lg" className="gap-2" aria-label="Start learning">
              <Sparkles className="h-5 w-5" />
              Start Learning
            </Button>
          </Link>
        </div>
        <p className="mt-4 text-xs text-muted-foreground">
          No credit card required · Free demo available
        </p>
      </div>
    </section>
  );
}
