# @ziiz/theme

## 0.1.0

First release.

- `theme.css`: the design layer. The Geist-style ramp as `--ds-*` tokens and
  Tailwind v4 utilities, the stock Tailwind palette disabled, the radius and
  shadow scales, 31 named type roles, eight `material-*` utilities, the
  `typeset` prose layer and the code block chrome.
- `shadcn.css`: the optional slot bridge that maps shadcn/ui's names
  (`bg-background`, `text-muted-foreground`, `--sidebar-*`, `--chart-*`) onto
  the ramp.
- `shiki`: `ziizShikiTheme` and `ziizShikiOptions`, a Shiki theme that
  resolves to the ramp's CSS variables so highlighted code follows the page
  theme.
- `.` resolves to `theme.css`, so `@import "@ziiz/theme"` is the same as
  `@import "@ziiz/theme/theme.css"`.
