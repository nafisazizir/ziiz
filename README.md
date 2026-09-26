# ziiz

A design-system exploration. The token foundation (Geist ramp, named type
roles, materials, prose) is the product; the app is the playground that dogfoods it.
Live docs: https://ziiz.vercel.app

```
apps/www          Next.js app: foundation docs, blog, registry
packages/theme    @ziiz/theme: theme.css (the design layer) + shadcn.css (slot bridge)
```

```bash
pnpm dev          # apps/www on http://localhost:3000
pnpm build
pnpm typecheck
pnpm lint
pnpm docs:check   # frontmatter, sidebar coverage, internal links
pnpm format
```

A consuming app points `components.json` at the registry, served straight
from this repo, then takes the design layer and the components from it:

```json
{
  "registries": {
    "@ziiz": "https://raw.githubusercontent.com/nafisazizir/ziiz/main/apps/www/public/r/{name}.json"
  }
}
```

```bash
npx shadcn@latest add @ziiz/theme --overwrite   # @ziiz/theme, the stylesheets, cn
npx shadcn@latest add @ziiz/button
```

The full setup, fonts and dark mode included, is at
https://ziiz.vercel.app/installation.

## Registry

`apps/www/public/r/` is the built registry and is committed on purpose:
raw.githubusercontent.com serves it, so there is no deploy between a merge
and an install. Regenerate it after touching `components/ui`,
`components/docs`, `hooks` or `content/docs/components`, and commit the
result; CI fails when it is stale.

```bash
pnpm --filter www registry:build
```

## Layout of apps/www

```
components/ui        62 published components (registry:ui)
components/docs      Doc primitives: Callout, Steps, CodeBlock, CodeTabs,
                     ComponentPreview, ComponentSource (registry:component)
content/docs         Foundation pages (MDX)
content/blog         Dated posts; /blog, /blog/<slug>, /rss.xml
scripts              build-registry, check-docs
```

## Releasing @ziiz/theme

1. Bump `version` in `packages/theme/package.json` and add the entry to
   `packages/theme/CHANGELOG.md`.
2. Commit, then tag and push: `git tag theme-v<version> && git push origin theme-v<version>`.
3. `.github/workflows/release.yml` builds and publishes to npm with provenance.
   It needs an `NPM_TOKEN` repository secret (a granular automation token
   for the `@ziiz` scope).
