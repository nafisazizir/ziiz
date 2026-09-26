# @ziiz/theme

The ziiz design layer as one import-free stylesheet: the Geist-style ramp,
31 named type roles, eight materials and the `typeset` prose layer, all as
Tailwind v4 utilities and CSS custom properties. Docs and the component
registry live at [ziiz.vercel.app](https://ziiz.vercel.app).

```bash
npm install @ziiz/theme
```

```css
@import "tailwindcss";
@import "@ziiz/theme";
@import "@ziiz/theme/shadcn.css"; /* only if you run stock shadcn/ui components */
```

## Entry points

| Import                   | What it is                                                                                        |
| ------------------------ | ------------------------------------------------------------------------------------------------- |
| `@ziiz/theme`            | The design layer. Ramp tokens, type roles, materials, prose. Disables the stock Tailwind palette. |
| `@ziiz/theme/theme.css`  | The same file by its full path.                                                                   |
| `@ziiz/theme/shadcn.css` | Maps shadcn's slot names (`bg-background`, `text-muted-foreground`) onto the ramp. Optional.      |
| `@ziiz/theme/shiki`      | `ziizShikiTheme` and `ziizShikiOptions`: a Shiki theme that resolves to the ramp's CSS variables. |

## Fonts

The stylesheet expects `--font-sans` and `--font-mono` on the root. Load them
however the app loads fonts. ziiz uses Inter with `ss03` for sans and Geist
Mono for mono.

## Components

Components are not in this package. They come from the ziiz registry as
source files you own: `npx shadcn@latest add @ziiz/button`. See the
[installation guide](https://ziiz.vercel.app/installation).

## License

MIT. See [CHANGELOG.md](./CHANGELOG.md) for releases.
