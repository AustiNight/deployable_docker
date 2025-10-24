import { SignUpForm } from "@/components/forms/signup-form";
import { Card, CardContent } from "@/components/ui/card";
import type { SignUpSection as SignUpSectionType } from "@/types/content";
import { useAnimatedReveal } from "@/utils/animations";export const SignupSection = ({ section }: { section: SignUpSectionType }) => {
  const sectionRef = useAnimatedReveal<HTMLDivElement>();
  return (
    <section
      ref={sectionRef}
      className="mx-auto w-full max-w-4xl px-4 py-16 md:px-6"
    >
      <Card className="border border-border/70">
        <CardContent className="grid gap-6 p-8 md:grid-cols-2">
          <div className="space-y-4">
            <h2 className="font-display text-3xl font-semibold text-foreground">{section.heading}</h2>
            <p className="text-base text-muted-foreground">{section.body}</p>
          </div>
          <SignUpForm section={section} />
        </CardContent>
      </Card>
    </section>
  );
};

