import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { availableTemplates } from "@/state/content-store";

export type TemplateGalleryProps = {
  selectedTemplate: string;
  onSelect: (key: string) => void;
};

export const TemplateGallery = ({ selectedTemplate, onSelect }: TemplateGalleryProps) => {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {availableTemplates.map((template) => {
        const isActive = template.key === selectedTemplate;
        return (
          <Card
            key={template.key}
            className={isActive ? "border-primary shadow-lg shadow-primary/20" : "border border-border/70"}
          >
            <CardHeader className="space-y-2">
              <div className="flex items-center gap-2">
                <CardTitle>{template.label}</CardTitle>
                {isActive && <Badge variant="accent">Active</Badge>}
              </div>
              <CardDescription>{template.tagline}</CardDescription>
              <div className="flex flex-wrap gap-2">
                {template.targetUseCases.map((useCase) => (
                  <Badge key={useCase} variant="secondary">
                    {useCase}
                  </Badge>
                ))}
              </div>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Swap to load seeded copy, imagery, and tokens for this template.
              </p>
              <Button onClick={() => onSelect(template.key)} variant={isActive ? "secondary" : "default"}>
                {isActive ? "Active" : "Use template"}
              </Button>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
