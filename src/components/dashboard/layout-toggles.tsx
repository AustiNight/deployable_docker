import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import type { LayoutToggles as LayoutToggleState } from "@/types/content";

export type LayoutToggleProps = {
  layout: LayoutToggleState;
  onChange: (value: Partial<LayoutToggleState>) => void;
};

const toggles = [
  { key: "heroAnimation", label: "Animate hero section" },
  { key: "showFeatures", label: "Show feature highlights" },
  { key: "showPricing", label: "Display pricing tiers" },
  { key: "showContactForm", label: "Expose contact form" },
  { key: "showTestimonials", label: "Include testimonials section" },
] as const;

export const LayoutToggles = ({ layout, onChange }: LayoutToggleProps) => {
  return (
    <Card className="border border-border/70">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Layout toggles</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {toggles.map((item) => (
          <div key={item.key} className="flex items-center justify-between rounded-md border border-border/60 p-3">
            <div className="space-y-1">
              <Label>{item.label}</Label>
            </div>
            <Switch
              checked={layout[item.key]}
              onCheckedChange={(checked) => onChange({ [item.key]: checked })}
            />
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
