# @ziiz/theme

The ziiz design layer as one import-free stylesheet: the Geist-style ramp,
31 named type roles, eight materials and the `typeset` prose layer, all as
Tailwind v4 utilities and CSS custom properties.

```bash
npm install @ziiz/theme
```

```css
@import "tailwindcss";
@import "@ziiz/theme/theme.css";
@import "@ziiz/theme/shadcn.css"; /* only if you run stock shadcn/ui components */
```

## Entry points

| Import                   | What it is                                                                                        |
| ------------------------ | ------------------------------------------------------------------------------------------------- |
| `@ziiz/theme/theme.css`  | The design layer. Ramp tokens, type roles, materials, prose. Disables the stock Tailwind palette. |
| `@ziiz/theme/shadcn.css` | Maps shadcn's slot names (`bg-background`, `text-muted-foreground`) onto the ramp. Optional.      |
| `@ziiz/theme/shiki`      | `ziizShikiTheme` and `ziizShikiOptions`: a Shiki theme that resolves to the ramp's CSS variables. |

## Fonts

The stylesheet expects `--font-sans` and `--font-mono` on the root. Load them
however the app loads fonts. ziiz uses Inter with `cv05` and `ss03` for sans
and Geist Mono for mono.

## Components

Components are not in this package. They come from the ziiz registry as
source files you own: `npx shadcn@latest add @ziiz/button`. See the
[installation guide](https://github.com/nafisazizir/ziiz/blob/main/apps/www/content/docs/installation.mdx).
