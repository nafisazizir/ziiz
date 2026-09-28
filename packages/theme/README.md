# ziiz

The ziiz design layer as one import-free stylesheet: the Geist-style ramp,
31 named type roles, eight materials and the `typeset` prose layer, all as
Tailwind v4 utilities and CSS custom properties. Docs and the component
registry live at [ziiz.vercel.app](https://ziiz.vercel.app).

Beta preview: 0.x minors may break things, patches will not.

```bash
npm install ziiz
```

```css
@import "tailwindcss";
@import "ziiz";
@import "ziiz/shadcn.css"; /* only if you run stock shadcn/ui components */
```

## Entry points

| Import            | What it is                                                                                         |
| ----------------- | -------------------------------------------------------------------------------------------------- |
| `ziiz`            | The design layer. Ramp tokens, type roles, materials, prose. Disables the stock Tailwind palette.  |
| `ziiz/theme.css`  | The same file by its full path.                                                                    |
| `ziiz/shadcn.css` | Maps shadcn's slot names (`bg-background`, `text-muted-foreground`) onto the ramp. Optional.       |
| `ziiz/cn`         | `cn`, `twMerge`, `typeRoles`, `materials`: a class merger that knows the type roles and materials. |
| `ziiz/shiki`      | `ziizShikiTheme` and `ziizShikiOptions`: a Shiki theme that resolves to the ramp's CSS variables.  |

## Fonts

Set `--font-sans` and `--font-mono` on `html` or `:root`, however the app
loads fonts (next/font's `variable` option does this). ziiz uses Inter with
`ss03` for sans and Geist Mono for mono. An app that sets neither gets
Tailwind's default stacks.

## cn

Type roles are single utilities (`text-label-14`, `text-copy-16`), so the
stock `cn` does not know they conflict: it keeps both, and stylesheet order
decides which one paints. This `cn` is built on the `cn` package with the
31 roles as one font-size group and the eight `material-*` utilities as
another, so the last one in the class list wins. Re-export it from the
app's `lib/utils.ts`; the registry's `utils` item does exactly that.

```ts
export { cn } from "ziiz/cn"
```

## Components

Components are not in this package. They come from the ziiz registry as
source files you own: `npx shadcn@latest add @ziiz/button`. See the
[installation guide](https://ziiz.vercel.app/installation).

## License

MIT. See [CHANGELOG.md](./CHANGELOG.md) for releases.
