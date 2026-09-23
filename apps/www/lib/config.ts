import { componentItems } from "@/lib/component-nav"

export const siteConfig = {
  name: "ziiz",
  description: "A design-system exploration.",
  // Production host, without a trailing slash. Vercel sets the env; local
  // builds fall back to the dev server.
  url: process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000",
  // The site's navigation, in order. The sidebar and the mobile menu are two
  // renderings of this one list, so neither can drift from the other.
  navGroups: [
    {
      label: "Getting started",
      items: [{ name: "Installation", href: "/installation" }],
    },
    {
      label: "Foundation",
      items: [
        { name: "Colors", href: "/colors" },
        { name: "Typography", href: "/typography" },
        { name: "Materials", href: "/materials" },
        { name: "Prose", href: "/prose" },
      ],
    },
    {
      label: "Playground",
      items: [
        { name: "Palette generator", href: "/playground" },
        { name: "Button shape", href: "/playground/button-shape" },
      ],
    },
    // Generated from content/docs/components by scripts/build-registry.ts.
    { label: "Components", items: componentItems },
    { label: "Blog", items: [{ name: "All posts", href: "/blog" }] },
  ],
}

export type NavItem = { name: string; href: string }
