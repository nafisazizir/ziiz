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
        { name: "X Business clone", href: "/business-x" },
        { name: "X art", href: "/playground/x-art" },
        { name: "Inset check", href: "/playground/inset" },
      ],
    },
    // Generated from content/docs/components by scripts/build-registry.ts.
    { label: "Components", items: componentItems },
    { label: "Blog", items: [{ name: "All posts", href: "/blog" }] },
  ],
}

const navHrefs = siteConfig.navGroups.flatMap((group) =>
  group.items.map((item) => item.href)
)

function covers(pathname: string, href: string) {
  return pathname === href || (href !== "/" && pathname.startsWith(`${href}/`))
}

// A nested page keeps its parent's entry marked (a blog post lights up "All
// posts") unless a longer entry claims it, so /playground/inset marks "Inset
// check" alone and not the palette generator that lives at /playground.
export function isActiveHref(pathname: string, href: string) {
  return (
    covers(pathname, href) &&
    !navHrefs.some(
      (other) => other.length > href.length && covers(pathname, other)
    )
  )
}
