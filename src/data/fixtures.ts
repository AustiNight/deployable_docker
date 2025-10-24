import type { SiteContent } from "@/types/content";

export const defaultContent: SiteContent = {
  brand: {
    name: "Moldable Clay",
    tagline: "Prototype-ready web experiences in under 30 seconds.",
    logoUrl: "/assets/logo-mark.svg",
  },
  navigation: [
    { id: "home", label: "Home", path: "/" },
    { id: "about", label: "About Us", path: "/about" },
    { id: "contact", label: "Contact Us", path: "/contact" },
    { id: "signup", label: "Sign Up", path: "/signup" },
    { id: "login", label: "Login", path: "/login" },
  ],
  home: {
    hero: {
      title: "Mold the perfect MVP in minutes.",
      subtitle: "Launch ready-to-edit experiences without backend plumbing.",
      description:
        "Choose a template, tweak the copy, swap imagery, and hand clients a real, clickable prototype they can react to.",
      imageUrl: "/assets/hero-default.svg",
      ctaLabel: "Explore Templates",
      ctaHref: "/dashboard",
      layout: "split",
    },
    features: [
      {
        id: "features-speed",
        title: "30 second previews",
        description:
          "Deploy hot-reload ready previews to client review environments in half a minute.",
        icon: "zap",
      },
      {
        id: "features-offline",
        title: "Offline-first storage",
        description:
          "All changes persist to IndexedDB for instant local demos with optional cloud sync.",
        icon: "database",
      },
      {
        id: "features-templates",
        title: "Template presets",
        description:
          "Swap between restaurant, portfolio, and marketplace layouts without rework.",
        icon: "layers",
      },
    ],
    pricing: [
      {
        id: "starter",
        name: "Starter",
        price: "$0",
        cadence: "monthly",
        description: "Perfect for showcasing prototypes and internal demos.",
        features: ["Local-first editing", "3 reusable sections", "One-click theme swap"],
      },
      {
        id: "pro",
        name: "Pro",
        price: "$19",
        cadence: "monthly",
        description: "Accelerate freelancing handoffs and client workshops.",
        features: [
          "Unlimited templates",
          "Team-ready theme tokens",
          "Export to GitHub Pages",
        ],
        featured: true,
      },
    ],
    cta: {
      heading: "Need polished copy fast?",
      subheading:
        "Import target industry boilerplates and keep iterating with content slots.",
      primaryCta: {
        label: "Launch Dashboard",
        href: "/dashboard",
      },
      secondaryCta: {
        label: "View Docs",
        href: "#",
      },
      show: true,
    },
  },
  about: {
    heading: "A creative playground for gig-ready sites.",
    body: "Moldable Clay streamlines the part of freelancing clients love most: seeing their ideas come alive. Seeded layouts, beautiful defaults, and flexible content controls get you from scope to preview in record time.",
    imageUrl: "/assets/about-hero.svg",
    layout: "imageRight",
    highlights: [
      {
        id: "about-highlight-speed",
        title: "Rapid ideation",
        description: "Template swapping and theme tokens keep momentum high.",
        icon: "rocket",
      },
      {
        id: "about-highlight-quality",
        title: "Professional polish",
        description: "Shipped with shadcn UI, Lucide icons, and responsive defaults.",
        icon: "sparkles",
      },
    ],
  },
  contact: {
    heading: "Let's build your next digital experience.",
    body: "Drop a message with your project scope, preferred timeline, and any assets. We'll reply within one business day with a next-step plan.",
    email: "hello@moldableclay.dev",
    phone: "+1 (555) 123-4567",
    address: "Remote-first, serving clients worldwide",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345094143!2d144.95592531591732!3d-37.81720937975171!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDQ5JzAyLjAiUyAxNDTCsDU3JzI0LjIiRQ!5e0!3m2!1sen!2sau!4v1631028897825!5m2!1sen!2sau",
    successMessage: "Thanks for reaching out! Expect a response within 24 hours.",
  },
  signUp: {
    heading: "Create your fast-track workspace.",
    body: "Sign up to save personalized templates, export fixtures, and share prototypes with clients instantly.",
    successMessage: "Welcome aboard! The dashboard just unlocked more controls.",
    fields: [
      {
        id: "name",
        label: "Full Name",
        type: "text",
        required: true,
        placeholder: "Jane Doe",
      },
      {
        id: "email",
        label: "Email Address",
        type: "email",
        required: true,
        placeholder: "you@example.com",
      },
      {
        id: "industry",
        label: "Primary Industry",
        type: "select",
        options: ["Hospitality", "Professional Services", "Ecommerce", "Other"],
      },
    ],
  },
  layout: {
    heroAnimation: true,
    showFeatures: true,
    showPricing: true,
    showContactForm: true,
    showTestimonials: false,
    heroLayout: "split",
  },
  theme: {
    palette: "slate",
    accent: "orange",
    radius: "0.75rem",
    fontFamily: "Inter",
    preset: "modern-default",
  },
};
