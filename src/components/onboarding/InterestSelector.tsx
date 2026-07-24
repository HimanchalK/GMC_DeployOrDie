// components/onboarding/InterestSelector.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Car, PawPrint, ArrowRight } from "lucide-react";

type Interest = "dinosaur" | "vehicle" | "animal";

interface InterestSelectorProps {
  selected: Interest | null;
  onSelect: (interest: Interest) => void;
  onContinue: () => void;
}

const interests: {
  id: Interest;
  title: string;
  subtitle: string;
  icon: React.ElementType;
}[] = [
  {
    id: "dinosaur",
    title: "Dinosaurs",
    subtitle: "Explore the prehistoric world",
    icon: PawPrint,
  },
  {
    id: "vehicle",
    title: "Vehicles",
    subtitle: "Cars, trucks, and things that go",
    icon: Car,
  },
  {
    id: "animal",
    title: "Animals",
    subtitle: "Meet creatures big and small",
    icon: PawPrint,
  },
];

export function InterestSelector({
  selected,
  onSelect,
  onContinue,
}: InterestSelectorProps) {
  return (
    <div className="w-full space-y-6">
      <div className="space-y-2">
        <h2 className="text-xl font-medium text-foreground">
          What do you like most?
        </h2>
        <p className="text-sm text-muted-foreground">
          Pick one interest to start your learning adventure.
        </p>
      </div>

      {/* Interest cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {interests.map(({ id, title, subtitle, icon: Icon }) => (
          <Card
            key={id}
            role="button"
            tabIndex={0}
            aria-pressed={selected === id}
            onClick={() => onSelect(id)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onSelect(id);
              }
            }}
            className={cn(
              "cursor-pointer transition-all duration-200 hover:shadow-md focus-visible:ring-2 focus-visible:ring-primary",
              selected === id
                ? "border-primary bg-primary/5 shadow-card ring-1 ring-primary/30"
                : "border-border bg-card hover:bg-accent/30",
            )}
          >
            <CardContent className="flex flex-col items-center text-center p-6 space-y-3">
              <div
                className={cn(
                  "p-4 rounded-2xl transition-colors",
                  selected === id
                    ? "bg-primary/10 text-primary"
                    : "bg-muted text-muted-foreground",
                )}
              >
                <Icon className="h-8 w-8" />
              </div>
              <div>
                <h3 className="font-medium text-foreground">{title}</h3>
                <p className="text-sm text-muted-foreground">{subtitle}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Continue button */}
      <Button
        onClick={onContinue}
        disabled={!selected}
        size="lg"
        className="w-full sm:w-auto text-base"
      >
        Continue
        <ArrowRight className="ml-2 h-5 w-5" />
      </Button>
    </div>
  );
}
