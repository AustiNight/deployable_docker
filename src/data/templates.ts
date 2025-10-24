import type { SiteContent, SiteTemplate } from "@/types/content";

import { defaultContent } from "./fixtures";

type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends Array<infer U>
    ? Array<DeepPartial<U>>
    : T[K] extends object
      ? DeepPartial<T[K]>
      : T[K];
};

const createTemplate = (
  meta: Pick<SiteTemplate, "key" | "label" | "tagline" | "icon" | "targetUseCases">,
  overrides: DeepPartial<SiteContent>,
): SiteTemplate => ({
  ...meta,
  content: {
    ...defaultContent,
    navigation:
      (overrides.navigation as SiteContent["navigation"] | undefined) ?? defaultContent.navigation,
    brand: { ...defaultContent.brand, ...overrides.brand } as SiteContent["brand"],
    home: {
      ...defaultContent.home,
      ...overrides.home,
      hero: { ...defaultContent.home.hero, ...overrides.home?.hero } as SiteContent["home"]["hero"],
      features:
        (overrides.home?.features as SiteContent["home"]["features"] | undefined) ??
        defaultContent.home.features,
      pricing:
        (overrides.home?.pricing as SiteContent["home"]["pricing"] | undefined) ??
        defaultContent.home.pricing,
      cta: { ...defaultContent.home.cta, ...overrides.home?.cta } as SiteContent["home"]["cta"],
    },
    about: { ...defaultContent.about, ...overrides.about } as SiteContent["about"],
    contact: { ...defaultContent.contact, ...overrides.contact } as SiteContent["contact"],
    signUp: { ...defaultContent.signUp, ...overrides.signUp } as SiteContent["signUp"],
    layout: { ...defaultContent.layout, ...overrides.layout } as SiteContent["layout"],
    theme: { ...defaultContent.theme, ...overrides.theme } as SiteContent["theme"],
  },
});

export const templates: SiteTemplate[] = [
  createTemplate(
    {
      key: "restaurant",
      label: "Modern Restaurant",
      tagline: "Menus, reservations, and chef highlights ready out of the box.",
      icon: "utensils",
      targetUseCases: ["Restaurants", "Cafes", "Food trucks"],
    },
    {
      brand: {
        name: "Saffron & Slate",
        tagline: "Seasonal tasting menus with artful plating.",
        logoUrl: "/assets/templates/restaurant-logo.svg",
      },
      home: {
        hero: {
          title: "A seasonal culinary journey.",
          subtitle: "Reserve a table in under a minute.",
          description:
            "Farm-to-fork ingredients, sommelier pairings, and candle-lit ambience for any celebration.",
          imageUrl: "/assets/templates/restaurant-hero.svg",
          ctaLabel: "Book Now",
          ctaHref: "#reservation",
          layout: "imageRight",
        },
        features: [
          {
            id: "feature-menu",
            title: "Chef's menu",
            description: "Rotating tasting menu with vegan and gluten-free options.",
            icon: "chef-hat",
          },
          {
            id: "feature-ambience",
            title: "Warm ambience",
            description: "Intimate lighting, live acoustic sets, and private dining.",
            icon: "sparkle",
          },
          {
            id: "feature-reservation",
            title: "Easy reservations",
            description: "Book online or via our concierge in seconds.",
            icon: "calendar",
          },
        ],
        pricing: [
          {
            id: "prix-fixe",
            name: "Prix Fixe",
            price: "$79",
            cadence: "monthly",
            description: "Three-course seasonal selections with sommelier pairings.",
            features: ["Curated wine pairings", "Vegetarian options", "Chef meet-and-greet"],
          },
        ],
        cta: {
          heading: "Reserve your seat.",
          subheading: "Tables fill fast - lock in your reservation before the weekend rush.",
          primaryCta: { label: "Reserve", href: "#reservation" },
          secondaryCta: { label: "View Menu", href: "#menu" },
          show: true,
        },
      },
      about: {
        heading: "Inspired by global cuisines.",
        body: "Chef Lina Marquez blends Mediterranean roots with Pacific Northwest produce to craft memorable evenings.",
        imageUrl: "/assets/templates/restaurant-team.svg",
        layout: "imageLeft",
        highlights: [
          {
            id: "restaurant-h1",
            title: "Local sourcing",
            description: "Partner farms within 60 miles of our kitchen.",
            icon: "leaf",
          },
          {
            id: "restaurant-h2",
            title: "Chef's table",
            description: "Eight seats nightly with a bespoke five-course journey.",
            icon: "sparkles",
          },
        ],
      },
      contact: {
        heading: "Visit us in the heart of downtown.",
        body: "123 Culinary Ave, Suite 18 - Open Tues to Sun - 5pm to 11pm",
        email: "reservations@saffronandslate.com",
        phone: "+1 (555) 987-6543",
      },
      layout: {
        heroLayout: "imageRight",
        showPricing: false,
      },
      theme: {
        palette: "amber",
        accent: "orange",
        preset: "restaurant-warm",
        fontFamily: "DM Sans",
        radius: "1.5rem",
      },
    },
  ),
  createTemplate(
    {
      key: "portfolio",
      label: "Creative Portfolio",
      tagline: "Case studies, testimonials, and service menus built in.",
      icon: "palette",
      targetUseCases: ["Designers", "Agencies", "Consultants"],
    },
    {
      brand: {
        name: "Studio Meridian",
        tagline: "Designing brand experiences with clarity and soul.",
        logoUrl: "/assets/templates/portfolio-logo.svg",
      },
      home: {
        hero: {
          title: "Story-driven design sprints.",
          subtitle: "Brand identity and product visuals that resonate.",
          description:
            "We unpack your narrative, prototype fast, and deliver visuals that help sales teams close faster.",
          imageUrl: "/assets/templates/portfolio-hero.svg",
          ctaLabel: "View Recent Work",
          ctaHref: "/#case-studies",
          layout: "split",
        },
        features: [
          {
            id: "portfolio-feature1",
            title: "Modular systems",
            description: "We build Figma design systems that teams actually use.",
            icon: "component",
          },
          {
            id: "portfolio-feature2",
            title: "Conversion insight",
            description: "Every deliverable ties back to measurable outcomes.",
            icon: "bar-chart",
          },
          {
            id: "portfolio-feature3",
            title: "Collaborative sprints",
            description: "Clients co-create in workshops for faster alignment.",
            icon: "users",
          },
        ],
        cta: {
          heading: "Start your discovery sprint.",
          subheading: "One week from kickoff to clickable prototype.",
          primaryCta: { label: "Book Intro Call", href: "/contact" },
          secondaryCta: { label: "Download Deck", href: "#" },
          show: true,
        },
      },
      about: {
        heading: "A remote-first design collective.",
        body: "Our distributed team blends identity, product, and marketing expertise to connect customers with meaningful solutions.",
        imageUrl: "/assets/templates/portfolio-team.svg",
        layout: "imageRight",
      },
      signUp: {
        heading: "Subscribe for case-study drops.",
        body: "Get monthly breakdowns of client transformations, tools, and templates we rely on.",
      },
      layout: {
        heroAnimation: true,
        showPricing: false,
        showTestimonials: true,
      },
      theme: {
        palette: "violet",
        accent: "purple",
        preset: "portfolio-modern",
        fontFamily: "Sora",
        radius: "0.75rem",
      },
    },
  ),
  createTemplate(
    {
      key: "marketplace",
      label: "Local Marketplace",
      tagline: "Listings, seller highlights, and trust signals included.",
      icon: "store",
      targetUseCases: ["Consignment shops", "Swap meets", "Curation brands"],
    },
    {
      brand: {
        name: "Neighborly Goods",
        tagline: "A curated hub for pre-loved treasures.",
        logoUrl: "/assets/templates/marketplace-logo.svg",
      },
      home: {
        hero: {
          title: "Discover local finds from verified sellers.",
          subtitle: "Weekly drops, instant holds, and in-app messaging.",
          description:
            "We curate vintage furniture, handmade ceramics, and indie apparel sourced from trusted neighborhood sellers.",
          imageUrl: "/assets/templates/marketplace-hero.svg",
          ctaLabel: "Browse Listings",
          ctaHref: "/#listings",
          layout: "split",
        },
        features: [
          {
            id: "marketplace-feature1",
            title: "Verified sellers",
            description: "Every seller is vetted with identity checks and reviews.",
            icon: "shield-check",
          },
          {
            id: "marketplace-feature2",
            title: "Instant holds",
            description: "Reserve items with one click and arrange pick-up later.",
            icon: "clock",
          },
          {
            id: "marketplace-feature3",
            title: "Community drops",
            description: "Weekly themed drops keep inventory fresh and fun.",
            icon: "party-popper",
          },
        ],
        pricing: [
          {
            id: "free",
            name: "Free Plan",
            price: "$0",
            cadence: "monthly",
            description: "List up to 5 items per month - perfect for casual sellers.",
            features: ["Standard listing", "Community events access"],
          },
          {
            id: "pro-market",
            name: "Pro Seller",
            price: "$29",
            cadence: "monthly",
            description: "Unlock store analytics and featured placement.",
            features: ["Unlimited listings", "Featured carousel placement", "Seller analytics"],
            featured: true,
          },
        ],
      },
      contact: {
        heading: "Interested in selling?",
        body: "Tell us about your goods and we will help you onboard in a day.",
        email: "hello@neighborlygoods.com",
        phone: "+1 (555) 111-2030",
      },
      signUp: {
        heading: "Apply as a Seller",
        fields: [
          { id: "shopName", label: "Shop Name", type: "text", required: true },
          { id: "email", label: "Email", type: "email", required: true },
          {
            id: "category",
            label: "Primary Category",
            type: "select",
            options: ["Furniture", "Apparel", "Home Goods", "Art"],
          },
        ],
        body: "Unlock seller analytics, featured slots, and community support.",
        successMessage: "Thanks! A marketplace specialist will connect shortly.",
      },
      layout: {
        heroLayout: "split",
        showPricing: true,
        showTestimonials: true,
      },
      theme: {
        palette: "emerald",
        accent: "emerald",
        preset: "marketplace-fresh",
        fontFamily: "Inter",
        radius: "0.75rem",
      },
    },
  ),
];

export const templateIndex = templates.reduce<Record<string, SiteTemplate>>(
  (acc, template) => {
    acc[template.key] = template;
    return acc;
  },
  {},
);
