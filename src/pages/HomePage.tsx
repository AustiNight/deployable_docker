import { CTASection } from "@/components/sections/cta-section";
import { FeatureGrid } from "@/components/sections/feature-grid";
import { HeroSection } from "@/components/sections/hero-section";
import { PricingSection } from "@/components/sections/pricing-section";
import { useContentStore } from "@/state/content-store";

export const HomePage = () => {
  const home = useContentStore((state) => state.content.home);
  const layout = useContentStore((state) => state.content.layout);

  return (
    <div className="flex flex-col gap-16">
      <HeroSection content={home.hero} />
      {layout.showFeatures && <FeatureGrid features={home.features} />}
      {layout.showPricing && <PricingSection tiers={home.pricing} />}
      <CTASection section={home.cta} />
    </div>
  );
};
