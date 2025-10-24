import { Link } from "react-router-dom";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { HeroContent } from "@/types/content";
import { useAnimatedReveal } from "@/utils/animations";export const HeroSection = ({ content }: { content: HeroContent }) => {
  const heroRef = useAnimatedReveal<HTMLDivElement>(content.layout !== "centered");

  return (
    <section ref={heroRef} className="relative mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-16 md:flex-row md:items-center md:px-6 md:py-20">
      <div className="flex flex-1 flex-col gap-6">
        <Badge variant="secondary" className="w-fit uppercase tracking-wide">
          {content.subtitle}
        </Badge>
        <h1 className="font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          {content.title}
        </h1>
        <p className="max-w-2xl text-lg text-muted-foreground">{content.description}</p>
        <div className="flex flex-wrap items-center gap-3">
          <Button size="lg" asChild>
            <Link to={content.ctaHref}>{content.ctaLabel}</Link>
          </Button>
          <Button variant="ghost" size="lg" className="text-sm text-muted-foreground hover:text-foreground">
            Learn more
          </Button>
        </div>
      </div>
      <div className="flex flex-1 justify-center md:justify-end">
        <div className="relative h-72 w-full max-w-md overflow-hidden rounded-[var(--radius)] border border-border bg-gradient-to-br from-primary/10 via-accent/20 to-background shadow-lg">
          <img
            src={content.imageUrl}
            alt={content.title}
            className="h-full w-full object-cover object-center"
          />
        </div>
      </div>
    </section>
  );
};

