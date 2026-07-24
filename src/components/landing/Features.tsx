// components/landing/Features.tsx
import { Card, CardContent } from "@/components/ui/card";
import {
  Heart,
  Eye,
  Calculator,
  ListOrdered,
  LayoutDashboard,
  MessageCircle,
} from "lucide-react";

const features = [
  {
    icon: Heart,
    title: "Interest-Based Learning",
    description:
      "Activities adapt to each child's unique interests, keeping them engaged and motivated at their own pace.",
  },
  {
    icon: Eye,
    title: "Visual Matching",
    description:
      "Clear, predictable visual matching exercises that build pattern recognition and cognitive skills gently.",
  },
  {
    icon: Calculator,
    title: "Interactive Counting",
    description:
      "Simple, distraction-free counting activities with visual supports and immediate, calm feedback.",
  },
  {
    icon: ListOrdered,
    title: "Sequencing Activities",
    description:
      "Step-by-step sequencing exercises that help build logical thinking and daily routine skills.",
  },
  {
    icon: LayoutDashboard,
    title: "Parent Dashboard",
    description:
      "A separate, private dashboard for parents to monitor progress, view insights, and adjust settings.",
  },
  {
    icon: MessageCircle,
    title: "AI Social Stories",
    description:
      "Personalized social stories generated to help children navigate everyday social situations with confidence.",
  },
];

export function Features() {
  return (
    <section
      className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-stone-50/50"
      aria-labelledby="features-heading"
    >
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2
            id="features-heading"
            className="text-3xl sm:text-4xl font-bold text-stone-800 tracking-tight"
          >
            Thoughtfully Designed Features
          </h2>
          <p className="mt-4 text-stone-500 max-w-lg mx-auto text-base sm:text-lg">
            Every feature is crafted with care, prioritizing clarity,
            predictability, and calm engagement.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <Card key={feature.title} className="group">
              <CardContent className="flex flex-col gap-4 p-6">
                <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center flex-shrink-0">
                  <feature.icon className="h-6 w-6 text-teal-600" />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-lg font-semibold text-stone-800">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-stone-500 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
