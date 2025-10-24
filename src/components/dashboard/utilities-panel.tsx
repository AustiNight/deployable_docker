import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { SiteContent } from "@/types/content";

export type UtilitiesPanelProps = {
  content: SiteContent;
  onReset: () => Promise<void>;
  onClearStorage: () => Promise<void>;
};

export const UtilitiesPanel = ({ content, onReset, onClearStorage }: UtilitiesPanelProps) => {
  const [status, setStatus] = useState<string | null>(null);

  const exportJson = () => {
    const blob = new Blob([JSON.stringify(content, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "moldable-clay-content.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    void (async () => {
      await onReset();
      setStatus("Content reset to defaults.");
    })();
  };

  const handleClear = () => {
    void (async () => {
      await onClearStorage();
      setStatus("Local persistence cleared.");
    })();
  };

  return (
    <Card className="border border-border/70">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Utilities</CardTitle>
        <CardDescription>Maintenance helpers for resetting and exporting data.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <Button variant="secondary" onClick={exportJson}>
          Export content as JSON
        </Button>
        <Button onClick={handleReset}>Reset to default template</Button>
        <Button variant="ghost" onClick={handleClear}>Clear IndexedDB and localStorage</Button>
        {status && <p className="text-sm text-muted-foreground">{status}</p>}
      </CardContent>
    </Card>
  );
};
