import { memo } from "react";
import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import Footer from "@/components/landing/Footer";

const Index = memo(() => {
  return (
    <div className="min-h-screen dark bg-background text-foreground">
      <Navbar />
      <main className="pt-16">
        <HeroSection />
        <HowItWorksSection />
        <FeaturesSection />
      </main>
      <Footer />
    </div>
  );
});

Index.displayName = "Index";

export default Index;
