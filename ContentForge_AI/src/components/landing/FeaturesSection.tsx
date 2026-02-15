import { memo } from "react";
import { BarChart3, Brain, CalendarCheck, GraduationCap, LucideIcon } from "lucide-react";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: BarChart3,
    title: "Productivity Dashboard",
    description: "Visualize your coding, debugging, and docs time with real-time charts and a daily productivity score.",
  },
  {
    icon: Brain,
    title: "AI Insights",
    description: "Surface bottlenecks, repeated errors, and actionable suggestions — powered by real AI analysis.",
  },
  {
    icon: CalendarCheck,
    title: "Daily Action Plan",
    description: "AI-generated high-impact tasks for tomorrow, so you wake up with a clear direction.",
  },
  {
    icon: GraduationCap,
    title: "Learning Goals",
    description: "Personalized 30–60 minute learning tasks based on the gaps AI detects in your workflow.",
  },
];

const FeaturesSection = memo(() => {
  return (
    <section 
      className="py-24 px-6 bg-card/50"
      aria-labelledby="features-heading"
    >
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-16">
          <p className="text-primary font-mono text-sm tracking-widest uppercase mb-3">
            What You Get
          </p>
          <h2 
            id="features-heading"
            className="text-3xl md:text-4xl font-bold"
          >
            Everything you need to{" "}
            <span className="text-primary">level up</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <article
                key={feature.title}
                className="group rounded-2xl border bg-card p-8 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
              >
                <div 
                  className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors"
                  aria-hidden="true"
                >
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
});

FeaturesSection.displayName = "FeaturesSection";

export default FeaturesSection;
