"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { WelcomeCard } from "@/components/onboarding/WelcomeCard";
import { ProgressIndicator } from "@/components/onboarding/ProgressIndicator";
import { NameForm } from "@/components/onboarding/NameForm";
import { InterestSelector } from "@/components/onboarding/InterestSelector";
import { createChild } from "@/services/children";

type Interest = "dinosaur" | "vehicle" | "animal";

export default function OnboardingPage() {
  const router = useRouter();

  const [step, setStep] = useState(1);

  const [name, setName] = useState("");

  const [interest, setInterest] = useState<Interest | null>(null);

  const [loading, setLoading] = useState(false);

  function handleNameContinue() {
    if (!name.trim()) return;

    setStep(2);
  }

  async function handleInterestContinue() {
    if (!interest) return;

    setLoading(true);

    try {
      const child = await createChild({
        name,
        interest_tag: interest,
      });

      localStorage.setItem("childId", child.id);

      router.push("/dashboard");
    } catch (error) {
      console.error(error);

      alert("Unable to start learning. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-6 py-16">
      <WelcomeCard
        title="Welcome to Hamro Saathi"
        description="Let's set up your learning journey in just two simple steps."
      >
        <ProgressIndicator currentStep={step} totalSteps={2} />

        {step === 1 && (
          <NameForm
            value={name}
            onChange={setName}
            onContinue={handleNameContinue}
          />
        )}

        {step === 2 && (
          <InterestSelector
            selected={interest}
            onSelect={setInterest}
            onContinue={handleInterestContinue}
          />
        )}

        {loading && (
          <p className="mt-6 text-sm text-muted-foreground">
            Creating your learning space...
          </p>
        )}
      </WelcomeCard>
    </main>
  );
}
