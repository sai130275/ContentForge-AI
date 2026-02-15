import { memo } from "react";
import { Activity, Brain, Rocket, LucideIcon } from "lucide-react";

interface Step {
  icon: LucideIcon;
  step: string;
  title: string;
  description: string;
  color: string;
  bgColor: string;
  borderColor: string;
}

const steps: Step[] = [
  {
    icon: Activity,
    step: "01",
    title: "Capture",
    description: "Log your activity manually, sync from GitHub, or connect VS Code. We track what matters.",
    color: "text-primary",
    bgColor: "bg-primary/10",
    borderColor: "border-primary/20",
  },
  {
    icon: Brain,
    step: "02",
    title: "Analyze",
    description: "AI detects bottlenecks, patterns, and friction in your workflow — not just time spent.",
    color: "text-accent",
    bgColor: "bg-accent/10",
    borderColor: "border-accent/20",
  },
  {
    icon: Rocket,
    step: "03",
    title: "Recommend",
    description: "Get a personalized daily plan with high-impact tasks, learning goals, and reflections.",
    color: "text-primary",
    bgColor: "bg-primary/10",
    borderColor: "border-primary/20",
  },
];

const HowItWorksSection = memo(() => {
  return (
    <section 
      id="how-it-works"
      className="py-24 px-6"
      aria-labelledby="how-it-works-heading"
    >
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-16">
          <p className="text-primary font-mono text-sm tracking-widest uppercase mb-3">
            How it Works
          </p>
          <h2 
            id="how-it-works-heading"
            className="text-3xl md:text-4xl font-bold"
          >
            Three steps to{" "}
            <span className="text-primary">smarter shipping</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <article
                key={step.step}
                className={`relative rounded-2xl border ${step.borderColor} ${step.bgColor} p-8 transition-all hover:scale-[1.02] hover:shadow-lg`}
              >
                <span 
                  className={`font-mono text-5xl font-bold ${step.color} opacity-20 absolute top-4 right-6`}
                  aria-hidden="true"
                >
                  {step.step}
                </span>
                <div 
                  className={`w-12 h-12 rounded-xl ${step.bgColor} flex items-center justify-center mb-5`}
                  aria-hidden="true"
                >
                  <Icon className={`w-6 h-6 ${step.color}`} />
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
});

HowItWorksSection.displayName = "HowItWorksSection";

export default HowItWorksSection;
