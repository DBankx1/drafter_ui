import CallToActionSection from "@/components/landing/home/cta";
import PricingCard from "@/components/landing/pricing/pricing-card";
import PricingHeader from "@/components/landing/pricing/pricing-header";
import { PRICING_TIERS } from "@/lib/landing-constants";

function PricingPage() {
  return (
    <main className="flex flex-col space-y-20 py-16">
      <div className="flex flex-col items-center space-y-20">
        <PricingHeader />
        <section className="grid gap-2 lg:grid-cols-3">
          {PRICING_TIERS.map((tier) => (
            <PricingCard
              key={tier.title}
              title={tier.title}
              featured={tier.featured}
              description={tier.description}
              frequency={tier.frequency}
              featuresHeader={tier.featuresHeader}
              price={tier.price}
              ctaText={tier.ctaText}
              features={tier.features}
            />
          ))}
        </section>
      </div>
      <CallToActionSection />
    </main>
  );
}

export default PricingPage;
