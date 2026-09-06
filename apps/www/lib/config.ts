import registry from "@/registry.json"

import { componentDescriptions } from "@/lib/component-meta"

// Client-safe: reads the manifest, never the built items (lib/registry.ts
// touches the filesystem and stays on the server).
const uiItems = registry.items.filter((item) => item.type === "registry:ui")

export const siteConfig = {
  name: "ziiz",
  description: "A design-system exploration.",
  // Production host, without a trailing slash. Vercel sets the env; local
  // builds fall back to the dev server.
  url: process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000",
  navItems: [
    {
      href: "/",
      label: "Docs",
    },
    {
      href: "/blog",
      label: "Blog",
    },
    {
      href: "/preview",
      label: "Preview",
    },
  ],
  startItems: [{ name: "Installation", href: "/installation" }],
  foundationItems: [
    { name: "Colors", href: "/colors" },
    { name: "Typography", href: "/typography" },
    { name: "Materials", href: "/materials" },
    { name: "Prose", href: "/prose" },
    { name: "Dependencies", href: "/dependencies" },
  ],
  componentItems: uiItems.map((item) => ({
    name: item.title,
    href: `/components/${item.name}`,
    description: componentDescriptions[item.name],
  })),
}
