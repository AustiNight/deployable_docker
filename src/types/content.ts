export type NavItem = {
  id: string;
  label: string;
  path: string;
  description?: string;
};

export type HeroLayout = "split" | "centered" | "imageLeft" | "imageRight";

export type HeroContent = {
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  ctaLabel: string;
  ctaHref: string;
  layout: HeroLayout;
};

export type Feature = {
  id: string;
  title: string;
  description: string;
  icon: string;
};

export type PricingTier = {
  id: string;
  name: string;
  price: string;
  cadence: "monthly" | "annually";
  description: string;
  features: string[];
  featured?: boolean;
};

export type CTASection = {
  heading: string;
  subheading: string;
  primaryCta: {
    label: string;
    href: string;
  };
  secondaryCta: {
    label: string;
    href: string;
  };
  show: boolean;
};

export type AboutSection = {
  heading: string;
  body: string;
  imageUrl: string;
  layout: HeroLayout;
  highlights: Feature[];
};

export type ContactSection = {
  heading: string;
  body: string;
  email: string;
  phone: string;
  address: string;
  mapEmbedUrl: string;
  successMessage: string;
};

export type SignUpSection = {
  heading: string;
  body: string;
  successMessage: string;
  fields: Array<{
    id: string;
    label: string;
    type: "text" | "email" | "tel" | "select";
    required?: boolean;
    placeholder?: string;
    options?: string[];
  }>;
};

export type LayoutToggles = {
  heroAnimation: boolean;
  showFeatures: boolean;
  showPricing: boolean;
  showContactForm: boolean;
  showTestimonials: boolean;
  heroLayout: HeroLayout;
};

export type ThemeTokens = {
  palette: "slate" | "emerald" | "amber" | "violet";
  accent: "orange" | "purple" | "blue" | "emerald";
  radius: "0.5rem" | "0.75rem" | "1.5rem";
  fontFamily: "Inter" | "DM Sans" | "Sora";
};

export type SiteContent = {
  brand: {
    name: string;
    tagline: string;
    logoUrl: string;
  };
  navigation: NavItem[];
  home: {
    hero: HeroContent;
    features: Feature[];
    pricing: PricingTier[];
    cta: CTASection;
  };
  about: AboutSection;
  contact: ContactSection;
  signUp: SignUpSection;
  layout: LayoutToggles;
  theme: ThemeTokens & {
    preset: string;
  };
};

export type TemplateMeta = {
  key: string;
  label: string;
  tagline: string;
  icon: string;
  targetUseCases: string[];
};

export type SiteTemplate = TemplateMeta & {
  content: SiteContent;
};
