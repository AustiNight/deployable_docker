import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { AccentKey, PaletteKey } from "@/data/theme-tokens";
import { themePresets } from "@/data/themes";
import type { SiteContent } from "@/types/content";

export type ThemeControlsProps = {
  theme: SiteContent["theme"];
  onChange: (updater: (theme: SiteContent["theme"]) => SiteContent["theme"]) => void;
};

const paletteOptions: Array<{ value: PaletteKey; label: string }> = [
  { value: "slate", label: "Slate" },
  { value: "emerald", label: "Emerald" },
  { value: "amber", label: "Amber" },
  { value: "violet", label: "Violet" },
];

const accentOptions: Array<{ value: AccentKey; label: string }> = [
  { value: "orange", label: "Orange" },
  { value: "purple", label: "Purple" },
  { value: "blue", label: "Blue" },
  { value: "emerald", label: "Emerald" },
];

const radiusOptions: Array<{ value: SiteContent["theme"]["radius"]; label: string }> = [
  { value: "0.5rem", label: "Compact" },
  { value: "0.75rem", label: "Default" },
  { value: "1.5rem", label: "Rounded" },
];

const fontOptions: Array<{ value: SiteContent["theme"]["fontFamily"]; label: string }> = [
  { value: "Inter", label: "Inter" },
  { value: "DM Sans", label: "DM Sans" },
  { value: "Sora", label: "Sora" },
];

export const ThemeControls = ({ theme, onChange }: ThemeControlsProps) => {
  return (
    <Card className="border border-border/70">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Theme tokens</CardTitle>
        <CardDescription>Palette and token adjustments apply immediately to the preview.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label>Preset</Label>
          <Select
            value={theme.preset}
            onValueChange={(value) => {
              const next = themePresets.find((item) => item.key === value);
              if (!next) {
                return;
              }

              onChange((current) => ({
                ...current,
                preset: value,
                palette: next.paletteKey,
                accent: next.accent,
                radius: next.radius,
                fontFamily: next.fontFamily,
              }));
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Choose preset" />
            </SelectTrigger>
            <SelectContent>
              {themePresets.map((item) => (
                <SelectItem key={item.key} value={item.key}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Palette</Label>
          <Select
            value={theme.palette}
            onValueChange={(value) =>
              onChange((current) => ({
                ...current,
                palette: value as PaletteKey,
              }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select palette" />
            </SelectTrigger>
            <SelectContent>
              {paletteOptions.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Accent</Label>
          <Select
            value={theme.accent}
            onValueChange={(value) =>
              onChange((current) => ({
                ...current,
                accent: value as AccentKey,
              }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Accent color" />
            </SelectTrigger>
            <SelectContent>
              {accentOptions.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Corner radius</Label>
          <Select
            value={theme.radius}
            onValueChange={(value) =>
              onChange((current) => ({
                ...current,
                radius: value as SiteContent["theme"]["radius"],
              }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Radius" />
            </SelectTrigger>
            <SelectContent>
              {radiusOptions.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Font family</Label>
          <Select
            value={theme.fontFamily}
            onValueChange={(value) =>
              onChange((current) => ({
                ...current,
                fontFamily: value as SiteContent["theme"]["fontFamily"],
              }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Font family" />
            </SelectTrigger>
            <SelectContent>
              {fontOptions.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};
