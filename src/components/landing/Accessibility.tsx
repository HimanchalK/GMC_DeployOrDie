// components/landing/Accessibility.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Moon, Type, Palette } from "lucide-react";

const accessibilityFeatures = [
  {
    icon: Moon,
    title: "Calm Mode",
    description:
      "Reduced motion, softened colours, and minimal transitions. Designed to prevent sensory overload and keep focus on learning.",
  },
  {
    icon: Type,
    title: "Dyslexia-Friendly Font",
    description:
      "We use clear, widely-spaced letterforms that improve readability for children with dyslexia and visual processing differences.",
  },
  {
    icon: Palette,
    title: "Colourblind-Safe Palette",
    description:
      "Every colour in our interface is tested for contrast and chosen to remain distinguishable across all common forms of colour blindness.",
  },
];

export function Accessibility() {
  return (
    <section
      className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-stone-50/50"
      aria-labelledby="accessibility-heading"
    >
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h2
            id="accessibility-heading"
            className="text-3xl sm:text-4xl font-bold text-stone-800 tracking-tight"
          >
            Accessibility First
          </h2>
          <p className="mt-4 text-stone-500 max-w-lg mx-auto text-base sm:text-lg">
            Built for neurodiversity. Every detail is designed to be calm,
            clear, and inclusive.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6">
          {accessibilityFeatures.map((feature) => (
            <Card key={feature.title}>
              <CardContent className="flex flex-col items-center text-center gap-4 p-6">
                <div className="w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center">
                  <feature.icon className="h-7 w-7 text-amber-600" />
                </div>
                <h3 className="text-base font-semibold text-stone-800">
                  {feature.title}
                </h3>
                <p className="text-sm text-stone-500 leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <p className="text-center text-xs text-stone-400 mt-10 max-w-md mx-auto">
          We follow WCAG 2.1 AA guidelines and continuously test with
          neurodivergent users to ensure our platform remains truly accessible.
        </p>
      </div>
    </section>
  );
}
