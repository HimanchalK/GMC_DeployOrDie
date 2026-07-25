// components/landing/Hero.tsx
import Link from "next/link";
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

        {/* Illustration */}
        <div
          className="hidden lg:flex items-center justify-center"
          aria-hidden="true"
        >
          <HeroIllustration />
        </div>
      </div>
    </section>
  );
}

function HeroIllustration() {
  return (
    <svg
      viewBox="0 0 400 340"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-md h-auto"
      role="img"
      aria-label="A child sitting calmly with learning blocks and a book"
    >
      {/* Soft background circle */}
      <circle cx="200" cy="170" r="150" fill="#F5F0E8" />

      {/* Simple, calm figure */}
      {/* Body */}
      <ellipse cx="200" cy="260" rx="55" ry="40" fill="#D4C8B8" />
      {/* Head */}
      <circle cx="200" cy="170" r="38" fill="#E8DDD0" />
      {/* Hair */}
      <ellipse cx="200" cy="152" rx="40" ry="28" fill="#C4B5A0" />
      {/* Calm eyes */}
      <ellipse cx="188" cy="168" rx="5" ry="6" fill="#8B7D6B" />
      <ellipse cx="212" cy="168" rx="5" ry="6" fill="#8B7D6B" />
      {/* Gentle smile */}
      <path
        d="M 190 182 Q 200 192 210 182"
        stroke="#8B7D6B"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />

      {/* Learning blocks */}
      <rect
        x="275"
        y="215"
        width="38"
        height="38"
        rx="8"
        fill="#5D8A8A"
        opacity="0.85"
      />
      <text x="285" y="240" fill="white" fontSize="16" fontWeight="600">
        A
      </text>

      <rect
        x="300"
        y="185"
        width="38"
        height="38"
        rx="8"
        fill="#9CAF88"
        opacity="0.85"
      />
      <text x="310" y="210" fill="white" fontSize="16" fontWeight="600">
        3
      </text>

      {/* Open book */}
      <g transform="translate(80, 210)">
        <path
          d="M 0 15 Q 25 5 50 15 L 50 60 Q 25 50 0 60 Z"
          fill="#FDF8F0"
          stroke="#D4C8B8"
          strokeWidth="1.5"
        />
        <path
          d="M 50 15 Q 75 5 100 15 L 100 60 Q 75 50 50 60 Z"
          fill="#FDF8F0"
          stroke="#D4C8B8"
          strokeWidth="1.5"
        />
      </g>

      {/* Small stars/sparkles for calm positivity */}
      <circle cx="320" cy="150" r="3" fill="#D4A574" opacity="0.6" />
      <circle cx="85" cy="140" r="2.5" fill="#D4A574" opacity="0.5" />
      <circle cx="310" cy="260" r="2" fill="#D4A574" opacity="0.4" />
    </svg>
  );
}
