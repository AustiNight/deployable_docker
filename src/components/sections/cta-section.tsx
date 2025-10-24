import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { CTASection as CTASectionType } from "@/types/content";
import { useAnimatedReveal } from "@/utils/animations";export const CTASection = ({ section }: { section: CTASectionType }) => {
  const sectionRef = useAnimatedReveal<HTMLDivElement>(section.show);

  if (!section.show) {
    return null;
  }

  return (
    <section
      ref={sectionRef}
      className="mx-auto w-full max-w-6xl px-4 pb-16 md:px-6"
    >
      <Card className="relative overflow-hidden border-primary/40 bg-gradient-to-r from-primary/10 via-accent/20 to-background">
        <CardContent className="flex flex-col gap-6 p-8 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl space-y-2">
            <h2 className="font-display text-3xl font-semibold text-foreground">{section.heading}</h2>
            <p className="text-base text-muted-foreground">{section.subheading}</p>
          </div>
          <div className="flex flex-col gap-3 md:flex-row">
            <Button asChild size="lg">
              <Link to={section.primaryCta.href}>{section.primaryCta.label}</Link>
            </Button>
            <Button asChild size="lg" variant="ghost">
              <Link to={section.secondaryCta.href}>{section.secondaryCta.label}</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

