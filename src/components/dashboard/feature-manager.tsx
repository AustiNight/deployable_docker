import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Feature } from "@/types/content";

export type FeatureManagerProps = {
  features: Feature[];
  onChange: (next: Feature[]) => void;
};

const createFeature = (): Feature => ({
  id: `feature-${Date.now()}`,
  title: "New feature",
  description: "Describe the value proposition.",
  icon: "sparkles",
});

export const FeatureManager = ({ features, onChange }: FeatureManagerProps) => {
  const updateFeature = (index: number, partial: Partial<Feature>) => {
    const next = [...features];
    next[index] = { ...next[index], ...partial };
    onChange(next);
  };

  const removeFeature = (index: number) => {
    if (features.length <= 1) {
      return;
    }
    onChange(features.filter((_, i) => i !== index));
  };

  const addFeature = () => onChange([...features, createFeature()]);

  return (
    <Card className="border border-border/70">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Feature highlights</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {features.map((feature, index) => (
          <div key={feature.id} className="grid gap-3 rounded-lg border border-border/60 p-4">
            <div className="space-y-2">
              <Label htmlFor={`${feature.id}-title`}>Title</Label>
              <Input
                id={`${feature.id}-title`}
                value={feature.title}
                onChange={(event) => updateFeature(index, { title: event.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`${feature.id}-description`}>Description</Label>
              <Input
                id={`${feature.id}-description`}
                value={feature.description}
                onChange={(event) => updateFeature(index, { description: event.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`${feature.id}-icon`}>Icon key (Lucide)</Label>
              <Input
                id={`${feature.id}-icon`}
                value={feature.icon}
                onChange={(event) => updateFeature(index, { icon: event.target.value })}
              />
            </div>
            <div className="flex justify-end">
              <Button variant="ghost" size="sm" onClick={() => removeFeature(index)}>
                Remove feature
              </Button>
            </div>
          </div>
        ))}
        <Button variant="secondary" onClick={addFeature} className="w-full">
          Add feature
        </Button>
      </CardContent>
    </Card>
  );
};
