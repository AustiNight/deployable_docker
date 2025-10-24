import { useNavigate } from "react-router-dom";

import { FeatureManager } from "@/components/dashboard/feature-manager";
import { HeroEditor } from "@/components/dashboard/hero-editor";
import { LayoutToggles } from "@/components/dashboard/layout-toggles";
import { NavigationManager } from "@/components/dashboard/navigation-manager";
import { TemplateGallery } from "@/components/dashboard/template-gallery";
import { ThemeControls } from "@/components/dashboard/theme-controls";
import { UtilitiesPanel } from "@/components/dashboard/utilities-panel";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useAuthStore } from "@/state/auth-store";
import { useContentStore } from "@/state/content-store";
import { persistence } from "@/state/persistence/indexed-db";

export const DashboardPage = () => {
  const navigate = useNavigate();
  const content = useContentStore((state) => state.content);
  const selectedTemplate = useContentStore((state) => state.selectedTemplate);
  const updateNavigation = useContentStore((state) => state.updateNavigation);
  const updateHero = useContentStore((state) => state.updateHero);
  const updateLayout = useContentStore((state) => state.updateLayout);
  const updateTheme = useContentStore((state) => state.updateTheme);
  const updateContent = useContentStore((state) => state.updateContent);
  const applyTemplate = useContentStore((state) => state.applyTemplate);
  const resetContent = useContentStore((state) => state.reset);
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = (): void => {
    void (async () => {
      try {
        await logout();
        void navigate("/");
      } catch (error) {
        console.error("Failed to log out", error);
      }
    })();
  };

  const updateAbout = (partial: Partial<typeof content.about>) => {
    updateContent({ about: { ...content.about, ...partial } });
  };

  const updateCTA = (partial: Partial<typeof content.home.cta>) => {
    updateContent({ home: { ...content.home, cta: { ...content.home.cta, ...partial } } });
  };

  const updateContact = (partial: Partial<typeof content.contact>) => {
    updateContent({ contact: { ...content.contact, ...partial } });
  };

  const updateSignUp = (partial: Partial<typeof content.signUp>) => {
    updateContent({ signUp: { ...content.signUp, ...partial } });
  };

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-10 md:px-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="font-display text-3xl font-semibold text-foreground">Content dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Manage navigation, hero content, templates, and theme tokens. Changes persist to IndexedDB automatically.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="secondary" onClick={() => {
            void navigate("/");
          }}>
            View site
          </Button>
          <Button
            variant="ghost"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </div>

      <Tabs defaultValue="content" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="utilities">Utilities</TabsTrigger>
        </TabsList>
        <TabsContent value="content" className="mt-6 space-y-6">
          <NavigationManager navigation={content.navigation} onChange={updateNavigation} />
          <HeroEditor hero={content.home.hero} onChange={updateHero} />
          <FeatureManager
            features={content.home.features}
            onChange={(next) =>
              updateContent({ home: { ...content.home, features: next } })
            }
          />
          <Card className="border border-border/70">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">About hero</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="about-heading">Heading</Label>
                <Input
                  id="about-heading"
                  value={content.about.heading}
                  onChange={(event) => updateAbout({ heading: event.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="about-image">Image URL</Label>
                <Input
                  id="about-image"
                  value={content.about.imageUrl}
                  onChange={(event) => updateAbout({ imageUrl: event.target.value })}
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="about-body">Body</Label>
                <Textarea
                  id="about-body"
                  value={content.about.body}
                  onChange={(event) => updateAbout({ body: event.target.value })}
                />
              </div>
            </CardContent>
          </Card>
          <Card className="border border-border/70">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Call to action</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="cta-heading">Heading</Label>
                <Input
                  id="cta-heading"
                  value={content.home.cta.heading}
                  onChange={(event) => updateCTA({ heading: event.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cta-subheading">Subheading</Label>
                <Textarea
                  id="cta-subheading"
                  value={content.home.cta.subheading}
                  onChange={(event) => updateCTA({ subheading: event.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cta-primary-label">Primary CTA label</Label>
                <Input
                  id="cta-primary-label"
                  value={content.home.cta.primaryCta.label}
                  onChange={(event) =>
                    updateCTA({ primaryCta: { ...content.home.cta.primaryCta, label: event.target.value } })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cta-primary-href">Primary CTA link</Label>
                <Input
                  id="cta-primary-href"
                  value={content.home.cta.primaryCta.href}
                  onChange={(event) =>
                    updateCTA({ primaryCta: { ...content.home.cta.primaryCta, href: event.target.value } })
                  }
                />
              </div>
            </CardContent>
          </Card>
          <Card className="border border-border/70">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Contact details</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="contact-email">Email</Label>
                <Input
                  id="contact-email"
                  value={content.contact.email}
                  onChange={(event) => updateContact({ email: event.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-phone">Phone</Label>
                <Input
                  id="contact-phone"
                  value={content.contact.phone}
                  onChange={(event) => updateContact({ phone: event.target.value })}
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="contact-address">Address</Label>
                <Textarea
                  id="contact-address"
                  value={content.contact.address}
                  onChange={(event) => updateContact({ address: event.target.value })}
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="contact-map">Map embed URL</Label>
                <Input
                  id="contact-map"
                  value={content.contact.mapEmbedUrl}
                  onChange={(event) => updateContact({ mapEmbedUrl: event.target.value })}
                />
              </div>
            </CardContent>
          </Card>
          <Card className="border border-border/70">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Sign up intro</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="signup-heading">Heading</Label>
                <Input
                  id="signup-heading"
                  value={content.signUp.heading}
                  onChange={(event) => updateSignUp({ heading: event.target.value })}
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="signup-body">Body</Label>
                <Textarea
                  id="signup-body"
                  value={content.signUp.body}
                  onChange={(event) => updateSignUp({ body: event.target.value })}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="mt-6 space-y-6">
          <LayoutToggles layout={content.layout} onChange={updateLayout} />
          <ThemeControls theme={content.theme} onChange={updateTheme} />
        </TabsContent>

        <TabsContent value="templates" className="mt-6 space-y-6">
          <TemplateGallery
            selectedTemplate={selectedTemplate}
            onSelect={(key) => void applyTemplate(key)}
          />
        </TabsContent>

        <TabsContent value="utilities" className="mt-6 space-y-6">
          <UtilitiesPanel
            content={content}
            onReset={async () => {
              await resetContent();
            }}
            onClearStorage={async () => {
              await persistence.clear();
            }}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};
































