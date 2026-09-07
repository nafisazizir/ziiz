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
  ],
  startItems: [{ name: "Installation", href: "/installation" }],
  foundationItems: [
    { name: "Colors", href: "/colors" },
    { name: "Typography", href: "/typography" },
    { name: "Materials", href: "/materials" },
    { name: "Prose", href: "/prose" },
  ],
}
