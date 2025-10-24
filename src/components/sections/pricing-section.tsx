import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { PricingTier } from "@/types/content";

export const PricingSection = ({ tiers }: { tiers: PricingTier[] }) => {
  if (!tiers.length) {
    return null;
  }

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-16 md:px-6">
      <div className="grid gap-6 md:grid-cols-2">
        {tiers.map((tier) => (
          <Card
            key={tier.id}
            className={tier.featured ? "border-primary shadow-lg shadow-primary/20" : "border border-border/70"}
          >
            <CardHeader>
              <CardTitle className="flex items-baseline gap-2">
                <span className="text-2xl font-semibold">{tier.name}</span>
                <span className="text-sm text-muted-foreground">
                  {tier.cadence === "monthly" ? "per month" : "per year"}
                </span>
              </CardTitle>
              <CardDescription>{tier.description}</CardDescription>
              <p className="text-3xl font-bold text-foreground">{tier.price}</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <ul className="space-y-3 text-sm text-muted-foreground">
                {tier.features.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary/80" />
                    {item}
                  </li>
                ))}
              </ul>
              <Button className="w-full" variant={tier.featured ? "default" : "secondary"}>
                Choose Plan
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
