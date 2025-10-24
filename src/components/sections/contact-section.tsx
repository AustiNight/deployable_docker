import { ContactForm } from "@/components/forms/contact-form";
import { Card, CardContent } from "@/components/ui/card";
import type { ContactSection as ContactSectionType } from "@/types/content";
import { useAnimatedReveal } from "@/utils/animations";export const ContactSection = ({ section }: { section: ContactSectionType }) => {
  const sectionRef = useAnimatedReveal<HTMLDivElement>();
  return (
    <section
      ref={sectionRef}
      className="mx-auto w-full max-w-6xl px-4 py-16 md:px-6"
    >
      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-6">
          <h2 className="font-display text-3xl font-semibold text-foreground">{section.heading}</h2>
          <p className="text-base text-muted-foreground">{section.body}</p>
          <div className="space-y-3 text-sm text-muted-foreground">
            <p>
              <span className="font-semibold text-foreground">Email:</span> {section.email}
            </p>
            <p>
              <span className="font-semibold text-foreground">Phone:</span> {section.phone}
            </p>
            <p>
              <span className="font-semibold text-foreground">Address:</span> {section.address}
            </p>
          </div>
          <Card className="overflow-hidden border border-border/70">
            <CardContent className="p-0">
              <iframe
                title="map"
                src={section.mapEmbedUrl}
                loading="lazy"
                className="h-60 w-full border-0"
              />
            </CardContent>
          </Card>
        </div>
        <Card className="border border-border/70">
          <CardContent className="p-6">
            <ContactForm section={section} />
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

