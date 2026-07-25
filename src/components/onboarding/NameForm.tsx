// components/onboarding/NameForm.tsx
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface NameFormProps {
  value: string;
  onChange: (value: string) => void;
  onContinue: () => void;
}

export function NameForm({ value, onChange, onContinue }: NameFormProps) {
  return (
    <div className="w-full space-y-5">
      <div className="space-y-2">
        <h2 className="text-xl font-medium text-foreground">
          What&rsquo;s your name?
        </h2>
        <p className="text-sm text-muted-foreground">
          We&rsquo;ll use this to personalise your learning space.
        </p>
      </div>

      <Input
        type="text"
        placeholder="Enter your name"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-14 text-lg rounded-xl border-muted-foreground/20 bg-background px-5 focus-visible:ring-primary"
        aria-label="Your name"
        autoComplete="given-name"
      />

      <Button
        onClick={onContinue}
        size="lg"
        className="w-full sm:w-auto text-base"
      >
        Continue
        <ArrowRight className="ml-2 h-5 w-5" />
      </Button>
    </div>
  );
}
