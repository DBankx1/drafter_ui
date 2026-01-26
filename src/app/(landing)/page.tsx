import CallToActionSection from "@/components/landing/home/cta";
import FeaturesSection from "@/components/landing/home/features";
import HeroSection from "@/components/landing/home/hero-section";
import HowItWorksSection from "@/components/landing/home/how-it-works";
import UseCasesSection from "@/components/landing/home/use-cases";

function HomePage() {
  return (
    <main className="flex flex-col">
      <HeroSection />
      <HowItWorksSection />
      <UseCasesSection />
      <FeaturesSection />
      <CallToActionSection />
    </main>
  );
}

export default HomePage;
