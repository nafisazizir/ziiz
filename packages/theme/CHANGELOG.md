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
- `cn`: `cn`, `twMerge`, `typeRoles` and `materials`. A tailwind-merge that
  treats the 31 type roles as one font-size group and the eight materials as
  one group, so a later `text-copy-16` replaces an earlier `text-label-14`
  the way `text-lg` replaces `text-sm`. The stock `cn` keeps both.
- Fonts: `theme.css` no longer redeclares `--font-sans` and `--font-mono` in
  terms of themselves. An app that sets neither gets Tailwind's default
  stacks instead of the browser's serif; an app that sets them on `html` or
  `:root` still wins.
