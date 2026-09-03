# ziiz

A design-system exploration. The token foundation (Geist ramp, named type
roles, materials) is the product; the app is the playground that dogfoods it.

```
apps/www          Next.js playground — docs pages, component examples, previews
packages/theme    @ziiz/theme — theme.css (the design layer) + shadcn.css (slot bridge)
```

```bash
pnpm dev          # apps/www on http://localhost:3000
pnpm build
pnpm typecheck
pnpm lint
pnpm format
```

A consuming app takes the design layer with one import in its Tailwind entry:

```css
@import "tailwindcss";
@import "@ziiz/theme/theme.css";
@import "@ziiz/theme/shadcn.css"; /* only if it runs stock shadcn components */
```

Components live in `apps/www/components/ui` until the registry lands.
