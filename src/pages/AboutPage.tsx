import { AboutSection } from "@/components/sections/about-section";
import { FeatureGrid } from "@/components/sections/feature-grid";
import { useContentStore } from "@/state/content-store";

export const AboutPage = () => {
  const about = useContentStore((state) => state.content.about);
  const features = useContentStore((state) => state.content.home.features);

  return (
    <div className="flex flex-col gap-12">
      <AboutSection section={about} />
      <FeatureGrid features={features} />
    </div>
  );
};
