import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { NavItem } from "@/types/content";

export type NavigationManagerProps = {
  navigation: NavItem[];
  onChange: (items: NavItem[]) => void;
};

const createNewItem = (index: number): NavItem => ({
  id: `link-${Date.now()}`,
  label: `Link ${index + 1}`,
  path: `/page-${index + 1}`,
});

export const NavigationManager = ({ navigation, onChange }: NavigationManagerProps) => {
  const updateItem = (index: number, partial: Partial<NavItem>) => {
    const next = [...navigation];
    next[index] = { ...next[index], ...partial };
    onChange(next);
  };

  const moveItem = (index: number, direction: "up" | "down") => {
    const next = [...navigation];
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= next.length) {
      return;
    }
    const [item] = next.splice(index, 1);
    next.splice(newIndex, 0, item);
    onChange(next);
  };

  const removeItem = (index: number) => {
    if (navigation.length <= 3) {
      return;
    }
    const next = navigation.filter((_, i) => i !== index);
    onChange(next);
  };

  const addItem = () => {
    onChange([...navigation, createNewItem(navigation.length)]);
  };

  return (
    <Card className="border border-border/70">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Navigation links</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {navigation.map((item, index) => (
          <div key={item.id} className="grid gap-3 rounded-lg border border-border/60 p-4">
            <div className="grid gap-2 sm:grid-cols-2 sm:gap-4">
              <div className="space-y-1">
                <Label htmlFor={`${item.id}-label`}>Label</Label>
                <Input
                  id={`${item.id}-label`}
                  value={item.label}
                  onChange={(event) => updateItem(index, { label: event.target.value })}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor={`${item.id}-path`}>Path</Label>
                <Input
                  id={`${item.id}-path`}
                  value={item.path}
                  onChange={(event) => updateItem(index, { path: event.target.value })}
                />
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Button size="sm" variant="outline" onClick={() => moveItem(index, "up")} disabled={index === 0}>
                Move up
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => moveItem(index, "down")}
                disabled={index === navigation.length - 1}
              >
                Move down
              </Button>
              <Button size="sm" variant="ghost" onClick={() => removeItem(index)}>
                Remove
              </Button>
            </div>
          </div>
        ))}
        <Button onClick={addItem} variant="secondary" className="w-full">
          Add navigation link
        </Button>
      </CardContent>
    </Card>
  );
};
