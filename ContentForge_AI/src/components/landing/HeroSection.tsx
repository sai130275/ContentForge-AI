import { memo } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Terminal } from "lucide-react";
import { APP_NAME } from "@/lib/constants";

const HeroSection = memo(() => {
  const handleGetStarted = () => {
    // TODO: Navigate to signup when implemented
    console.log("Get Started clicked");
  };

  const handleLearnMore = () => {
    // Smooth scroll to How It Works section
    const howItWorksSection = document.getElementById("how-it-works");
    howItWorksSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section 
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* Background grid pattern */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(hsl(var(--muted)/0.3)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--muted)/0.3)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,black_70%,transparent_100%)]"
        aria-hidden="true"
      />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" aria-hidden="true" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" aria-hidden="true" />

      <div className="relative z-10 container mx-auto px-6 text-center max-w-4xl">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm font-mono mb-8">
          <Terminal className="w-4 h-4" aria-hidden="true" />
          <span>AI-powered content creation for developers</span>
        </div>

        <h1 
          id="hero-heading"
          className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.1]"
        >
          Transform Content with{" "}
          <span className="text-primary">AI Intelligence</span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
          {APP_NAME} analyzes your workflow, eliminates friction, and helps you create better content faster.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            className="text-base px-8 py-6 rounded-xl font-semibold gap-2 group"
            onClick={handleGetStarted}
            aria-label="Get started with ContentForge AI"
          >
            Get Started
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="text-base px-8 py-6 rounded-xl font-semibold"
            onClick={handleLearnMore}
            aria-label="Learn how ContentForge AI works"
          >
            See how it works
          </Button>
        </div>

        {/* Terminal preview */}
        <div 
          className="mt-16 mx-auto max-w-2xl rounded-xl border bg-card/50 backdrop-blur-sm overflow-hidden shadow-2xl shadow-primary/5"
          role="img"
          aria-label="Terminal preview showing ContentForge AI analysis"
        >
          <div className="flex items-center gap-2 px-4 py-3 border-b bg-card/80">
            <div className="w-3 h-3 rounded-full bg-destructive/60" aria-hidden="true" />
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "hsl(45 93% 47% / 0.6)" }} aria-hidden="true" />
            <div className="w-3 h-3 rounded-full bg-primary/60" aria-hidden="true" />
            <span className="ml-2 text-xs text-muted-foreground font-mono">contentforge-insights.sh</span>
          </div>
          <div className="p-6 text-left font-mono text-sm space-y-2">
            <p className="text-muted-foreground">$ contentforge analyze --today</p>
            <p className="text-primary">✓ 6.2h coding · 1.8h debugging · 0.5h docs</p>
            <p className="text-accent">⚡ Bottleneck: 4 repeated auth errors</p>
            <p className="text-foreground">→ Suggestion: Add token refresh middleware</p>
            <p className="text-primary">📊 Productivity: 78/100 (+5 from yesterday)</p>
          </div>
        </div>
      </div>
    </section>
  );
});

HeroSection.displayName = "HeroSection";

export default HeroSection;
