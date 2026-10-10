# @nafisazizir/ziiz

## 0.2.0

- Squircle corners. `theme.css` sets `corner-shape` on every element, so
  each `rounded-*` corner draws as a squircle in browsers that support
  `corner-shape` and typed arithmetic. Others keep the round corner.
  `rounded-full` and a `--radius` of 4rem or more (the
  `[--radius:9999px]` pill) stay round. Write `[corner-shape:round]` to opt
  one element out.
- `--radius-scale` multiplies the `rounded-*` scale. It is 1, and 1.4 where
  squircles draw, because a squircle reads tighter than a round corner at
  the same radius. Set it to 1 to keep the round radii under squircles.
- A rounder scale. The `sm` to `xl` multipliers on `--radius` are 1, 1.3,
  1.5 and 1.6 (they were 0.6, 0.8, 1 and 1.4): 19.6, 25.5, 29.4 and
  31.4px where squircles draw. Buttons, fields, tabs and menu items from
  24px to 40px tall now draw as capsules. `2xl` to `4xl` are unchanged.
- The radius caps in Button, Checkbox, InputGroup, Kbd, Nav and
  Questionnaire (`rounded-[min(var(--radius-md),10px)]` and the like), and
  Sonner's toast radius, follow `--radius-scale`. Components installed
  earlier keep their unscaled caps.
- Badge now uses `rounded-full`. A Badge installed earlier still has
  `rounded-4xl` and draws a squircle capsule; change it to `rounded-full`
  for round ends.

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
- `.` resolves to `theme.css`, so `@import "@nafisazizir/ziiz"` is the same as
  `@import "@nafisazizir/ziiz/theme.css"`.
- `cn`: `cn`, `twMerge`, `typeRoles` and `materials`, built on the `cn`
  package (`createCn`/`createTwMerge` from `cn/config`). The merger treats
  the 31 type roles as one font-size group and the eight materials as one
  group, so a later `text-copy-16` replaces an earlier `text-label-14` the
  way `text-lg` replaces `text-sm`. The stock `cn` keeps both.
- Fonts: `theme.css` does not redeclare `--font-sans` or `--font-mono`. An
  app that sets neither gets Tailwind's default stacks; an app that sets
  them on `html` or `:root` wins.
