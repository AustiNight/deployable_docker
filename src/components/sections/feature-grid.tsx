import { Card, CardContent } from "@/components/ui/card";
import { resolveIcon } from "@/data/icon-map";
import type { Feature } from "@/types/content";
import { useAnimatedReveal } from "@/utils/animations";export const FeatureGrid = ({ features }: { features: Feature[] }) => {
  const containerRef = useAnimatedReveal<HTMLDivElement>();

  return (
    <section
      ref={containerRef}
      className="mx-auto w-full max-w-6xl px-4 py-12 md:px-6"
    >
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => {
          const Icon = resolveIcon(feature.icon);
          return (
            <Card key={feature.id} className="border border-border/70 bg-card/80 backdrop-blur">
              <CardContent className="flex flex-col gap-4 p-6">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </span>
                <div className="space-y-2">
                  <h3 className="font-display text-lg font-semibold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
};

