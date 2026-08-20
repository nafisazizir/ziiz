export type NavItem = { name: string; href: string }

export type NavGroup = { label: string; items: NavItem[] }

export const siteConfig = {
  name: "ziiz",
  description: "A design-system exploration.",
  navItems: [
    {
      href: "/",
      label: "Docs",
    },
    {
      href: "/preview",
      label: "Preview",
    },
  ],
  /** Rendered by both the docs sidebar and the mobile nav. */
  docsGroups: [
    {
      label: "Foundation",
      items: [
        { name: "Colors", href: "/colors" },
        { name: "Typography", href: "/typography" },
        { name: "Materials", href: "/materials" },
      ],
    },
    {
      label: "Components",
      items: [{ name: "Dependencies", href: "/dependencies" }],
    },
  ] satisfies NavGroup[],
}
