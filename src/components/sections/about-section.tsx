import { Card, CardContent } from "@/components/ui/card";
import { resolveIcon } from "@/data/icon-map";
import type { AboutSection as AboutSectionType } from "@/types/content";
import { useAnimatedReveal } from "@/utils/animations";
import { cn } from "@/utils/cn";export const AboutSection = ({ section }: { section: AboutSectionType }) => {
  const sectionRef = useAnimatedReveal<HTMLDivElement>();
  return (
    <section
      ref={sectionRef}
      className="mx-auto w-full max-w-6xl px-4 py-16 md:px-6"
    >
      <div
        className={cn(
          "grid gap-10 md:grid-cols-2 md:items-center",
          section.layout === "imageLeft" && "md:[&>div:first-child]:order-last"
        )}
      >
        <div className="space-y-4">
          <h2 className="font-display text-3xl font-semibold text-foreground">{section.heading}</h2>
          <p className="text-base text-muted-foreground">{section.body}</p>
        </div>
        <div className="relative h-72 w-full overflow-hidden rounded-[var(--radius)] border border-border bg-gradient-to-br from-secondary/30 to-background shadow-lg">
          <img src={section.imageUrl} alt={section.heading} className="h-full w-full object-cover object-center" />
        </div>
      </div>
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {section.highlights.map((highlight) => {
          const Icon = resolveIcon(highlight.icon);
          return (
            <Card key={highlight.id} className="border border-border/70">
              <CardContent className="flex gap-4 p-6">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
                  <Icon className="h-5 w-5" />
                </span>
                <div className="space-y-1">
                  <h3 className="font-display text-lg font-semibold">{highlight.title}</h3>
                  <p className="text-sm text-muted-foreground">{highlight.description}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
};

