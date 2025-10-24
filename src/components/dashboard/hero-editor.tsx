import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { HeroContent } from "@/types/content";

export type HeroEditorProps = {
  hero: HeroContent;
  onChange: (value: Partial<HeroContent>) => void;
};

export const HeroEditor = ({ hero, onChange }: HeroEditorProps) => {
  return (
    <Card className="border border-border/70">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Home hero</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="hero-title">Title</Label>
          <Input
            id="hero-title"
            value={hero.title}
            onChange={(event) => onChange({ title: event.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="hero-subtitle">Eyebrow</Label>
          <Input
            id="hero-subtitle"
            value={hero.subtitle}
            onChange={(event) => onChange({ subtitle: event.target.value })}
          />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="hero-description">Description</Label>
          <Textarea
            id="hero-description"
            value={hero.description}
            onChange={(event) => onChange({ description: event.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="hero-image">Image URL</Label>
          <Input
            id="hero-image"
            value={hero.imageUrl}
            onChange={(event) => onChange({ imageUrl: event.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="hero-layout">Layout</Label>
          <Select
            value={hero.layout}
            onValueChange={(value) => onChange({ layout: value as HeroContent["layout"] })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Choose layout" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="split">Split</SelectItem>
              <SelectItem value="centered">Centered</SelectItem>
              <SelectItem value="imageLeft">Image left</SelectItem>
              <SelectItem value="imageRight">Image right</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="hero-cta-label">CTA label</Label>
          <Input
            id="hero-cta-label"
            value={hero.ctaLabel}
            onChange={(event) => onChange({ ctaLabel: event.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="hero-cta-href">CTA link</Label>
          <Input
            id="hero-cta-href"
            value={hero.ctaHref}
            onChange={(event) => onChange({ ctaHref: event.target.value })}
          />
        </div>
      </CardContent>
    </Card>
  );
};
