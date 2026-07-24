// components/landing/CTA.tsx
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
          className="text-3xl sm:text-4xl font-bold text-stone-800 tracking-tight"
        >
          Ready to Begin?
        </h2>
        <p className="mt-4 text-stone-500 text-base sm:text-lg leading-relaxed max-w-md mx-auto">
          A calm, supportive space for your child to learn and grow. Start
          exploring today — at your own pace.
        </p>
        <div className="mt-8">
          <Button size={"lg"} className="gap-2">
            <Sparkles className="h-5 w-5" />
            Start Learning
          </Button>
        </div>
        <p className="mt-4 text-xs text-stone-400">
          No credit card required · Free demo available
        </p>
      </div>
    </section>
  );
}
