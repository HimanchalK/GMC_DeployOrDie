import { LandingHeader } from "@/components/landing/LandingHeader";
import { Accessibility } from "@/components/landing/Accessibility";
import { CTA } from "@/components/landing/CTA";
import { Features } from "@/components/landing/Features";
import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";

export default function Home() {
  return (
    <main>
      <LandingHeader />
      <Hero />
      <Features />
      <HowItWorks />
      <Accessibility />
      <CTA />
    </main>
  );
}
