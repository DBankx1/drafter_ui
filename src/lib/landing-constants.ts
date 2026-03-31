import type { NavigationItem } from "@/types/navigation-item";
import { ArrowDownUp, Chromium, FileCodeCorner } from "lucide-react";

export const PUBLIC_NAV_ITEMS: NavigationItem[] = [
  {
    name: "solutions",
    href: "/solutions",
    type: "dropdown",
    subItems: [
      {
        icon: FileCodeCorner,
        title: "Embed",
        href: "/solutions/embed",
        description:
          "Embed a customizable chat agent into your website or application",
      },
      {
        icon: ArrowDownUp,
        title: "API",
        href: "/solutions/api",
        description:
          "RESTful API access that allows you to interact with the platform",
      },
      {
        icon: Chromium,
        title: "Extension",
        href: "/solutions/browser-extension",
        status: "coming soon",
        description:
          "A browser extension that generates proposals from your conversations",
      },
    ],
  },
  { name: "Pricing", href: "/pricing", type: "link" },
  { name: "About", href: "/about", type: "link" },
];

export const PRICING_TIERS = [
  {
    title: "Tester",
    price: "Free",
    frequency: "/month",
    description:
      "Good for individuals looking to try out the platform and being their journey to gain more leads",
    featuresHeader: "Free forever",
    features: [
      "AI-powered visitor chat",
      "Basic proposal drafts",
      "Dashboard access",
      "Community support",
    ],
    ctaText: "Get Started",
    featured: false,
  },
  {
    title: "Starter",
    price: "$19",
    description:
      "For small businesses and freelancers looking to automate their proposal processes",
    frequency: "/month",
    featuresHeader: "Everything in Tester, plus:",
    features: [
      "Custom pricing lists",
      "Monthly performance reports",
      "Email alerts",
    ],
    ctaText: "Get Started",
    featured: true,
  },
  {
    title: "Pro",
    price: "$29",
    description:
      "The most advanced AI-powered proposal tool solution for large enterprise organizations",
    frequency: "/month",
    featuresHeader: "Everything in Starter, plus:",
    features: ["API access", "CRM integrations", "Priority support"],
    ctaText: "Contact Sales",
    featured: false,
  },
];

export const logos = [
  {
    name: "Vercel",
    src: "/images/clients/vercel.svg",
  },
  {
    name: "Upwork",
    src: "/images/clients/upwork.svg",
  },
  {
    name: "Taskrabbit",
    src: "/images/clients/taskrabbit.svg",
  },
  {
    name: "Alpine",
    src: "/images/clients/alpine.svg",
  },
  {
    name: "Amazon",
    src: "/images/clients/amazon.svg",
  },
  {
    name: "Rhombus",
    src: "/logos/rhombus.svg",
  },
];
