// components/landing/HowItWorks.tsx
import { Circle, ArrowRight } from "lucide-react";

const steps = [
  {
    step: "1",
    title: "Choose an Interest",
    description:
      "Select what excites your child — animals, vehicles, shapes, or colours. Learning starts with curiosity.",
  },
  {
    step: "2",
    title: "Learn Through Activities",
    description:
      "Engage with calm, structured activities like matching, counting, and sequencing at a comfortable pace.",
  },
  {
    step: "3",
    title: "Track Progress",
    description:
      "Parents can view gentle progress insights, celebrating small wins and adjusting the learning path.",
  },
];

export function HowItWorks() {
  return (
    <section
      className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8"
      aria-labelledby="how-it-works-heading"
    >
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h2
            id="how-it-works-heading"
            className="text-3xl sm:text-4xl font-bold text-stone-800 tracking-tight"
          >
            How It Works
          </h2>
          <p className="mt-4 text-stone-500 max-w-lg mx-auto text-base sm:text-lg">
            Three simple steps to a calmer, more engaging learning experience.
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-4">
          {steps.map((item, index) => (
            <div
              key={item.step}
              className="flex flex-col items-center text-center flex-1 relative"
            >
              {/* Step circle */}
              <div
                className="w-16 h-16 rounded-full bg-teal-600 text-white flex items-center justify-center text-xl font-bold flex-shrink-0 shadow-sm"
                aria-hidden="true"
              >
                {item.step}
              </div>

              {/* Content */}
              <h3 className="mt-5 text-lg font-semibold text-stone-800">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-stone-500 leading-relaxed max-w-xs">
                {item.description}
              </p>

              {/* Connector arrow (hidden on mobile, shown on md+) */}
              {index < steps.length - 1 && (
                <div
                  className="hidden md:block absolute top-8 left-[calc(50%+2.5rem)] w-[calc(100%-5rem)]"
                  aria-hidden="true"
                >
                  <div className="flex items-center justify-center w-full">
                    <div className="h-[2px] bg-teal-200 flex-1" />
                    <ArrowRight className="h-4 w-4 text-teal-300 flex-shrink-0 -ml-1" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
