// components/landing/Hero.tsx
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Sparkles, Users } from "lucide-react";

export function Hero() {
  return (
    <section
      className="relative min-h-[90vh] flex items-center px-4 sm:px-6 lg:px-8"
      aria-labelledby="hero-heading"
    >
      <div className="mx-auto max-w-7xl w-full grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Text Content */}
        <div className="flex flex-col gap-6 max-w-xl">
          <div className="flex flex-col gap-3">
            <Image
              src="/logo.jpeg"
              alt="Hamro Saathi logo"
              width={56}
              height={56}
              priority
              className="mb-1 rounded-xl"
            />
            <p className="text-sm font-medium tracking-wider uppercase text-primary">
              हाम्रो साथी
            </p>
            <h1
              id="hero-heading"
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.1]"
            >
              Hamro Saathi
            </h1>
            <p className="text-xl sm:text-2xl font-medium text-primary mt-1">
              A Gentle Learning Companion
            </p>
          </div>

          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-md">
            A calm, interest-based learning platform designed for children with
            autism. Thoughtfully crafted activities that adapt to each
            child&rsquo;s unique pace.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Link href="/onboarding" prefetch aria-label="Start learning">
              <Button size="lg" className="gap-2">
                <Sparkles className="h-5 w-5" />
                Start Learning
              </Button>
            </Link>
            <Link href="/parent" aria-label="For parents" prefetch>
              <Button variant="secondary" size="lg" className="gap-2">
                <Users className="h-5 w-5" />
                For Parents
              </Button>
            </Link>
          </div>

          <p className="text-xs text-muted-foreground mt-2">
            Free to try · No sign-up required for demo
          </p>
        </div>

        {/* Illustration slot — real logo, large */}
        <div
          className="hidden lg:flex items-center justify-center"
          aria-hidden="true"
        >
          <Image
            src="/logo.jpeg"
            alt=""
            width={320}
            height={320}
            className="w-full max-w-md h-auto rounded-3xl"
          />
        </div>
      </div>
    </section>
  );
}
