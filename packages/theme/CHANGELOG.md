# ziiz

## 0.1.0

First release, a beta preview. Expect breaking changes in 0.x minors.

- `theme.css`: the design layer. The Geist-style ramp as `--ds-*` tokens and
  Tailwind v4 utilities, the stock Tailwind palette disabled, the radius and
  shadow scales, 31 named type roles, eight `material-*` utilities, the
  `typeset` prose layer and the code block chrome. The prose `details`
  marker is the Tabler chevron, matching the components.
- `shadcn.css`: the optional slot bridge that maps shadcn/ui's names
  (`bg-background`, `text-muted-foreground`, `--sidebar-*`, `--chart-*`) onto
  the ramp.
- `shiki`: `ziizShikiTheme` and `ziizShikiOptions`, a Shiki theme that
  resolves to the ramp's CSS variables so highlighted code follows the page
  theme.
- `.` resolves to `theme.css`, so `@import "ziiz"` is the same as
  `@import "ziiz/theme.css"`.
- `cn`: `cn`, `twMerge`, `typeRoles` and `materials`, built on the `cn`
  package (`createCn`/`createTwMerge` from `cn/config`). The merger treats
  the 31 type roles as one font-size group and the eight materials as one
  group, so a later `text-copy-16` replaces an earlier `text-label-14` the
  way `text-lg` replaces `text-sm`. The stock `cn` keeps both.
- Fonts: `theme.css` does not redeclare `--font-sans` or `--font-mono`. An
  app that sets neither gets Tailwind's default stacks; an app that sets
  them on `html` or `:root` wins.
