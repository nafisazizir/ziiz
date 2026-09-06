# ziiz

A design-system exploration. The token foundation (Geist ramp, named type
roles, materials, prose) is the product; the app is the playground that dogfoods it.

```
apps/www          Next.js playground — docs, component pages, blog, previews, registry
packages/theme    @ziiz/theme — theme.css (the design layer) + shadcn.css (slot bridge)
```

```bash
pnpm dev          # apps/www on http://localhost:3000
pnpm build
pnpm typecheck
pnpm lint
pnpm docs:check   # frontmatter, sidebar coverage, internal links
pnpm format
```

A consuming app takes the design layer with one import in its Tailwind entry:

```css
@import "tailwindcss";
@import "@ziiz/theme/theme.css";
@import "@ziiz/theme/shadcn.css"; /* only if it runs stock shadcn components */
```

Components come from the registry the app serves at `/r/<name>.json`:

```bash
npx shadcn@latest add @ziiz/button
```

## Layout of apps/www

```
components/ui        62 published components (registry:ui)
components/docs      Doc primitives: Callout, Steps, CodeBlock, CodeTabs,
                     ComponentPreview, ComponentSource (registry:component)
components/demos     Small inline demos a docs page embeds with <DemoPreview>
components/examples  Full-page example galleries, one per component (/preview/<name>)
content/docs         Foundation pages and authored component pages (MDX)
content/blog         Dated posts; /blog, /blog/<slug>, /rss.xml
scripts              build-registry, build-previews, check-docs
```

A component with no authored MDX still gets a page at `/components/<name>`:
its example gallery, installation, and the import line. Add
`content/docs/components/<name>.mdx` to take the route over.
