# Color ramps

How the palette is generated, why it is shaped the way it is, and what to do
when you bring a new colour in.

Implementation: `lib/color-ramp.ts`. The library of finished palettes is
`lib/palettes.ts`, live at `/playground`: pick one, preview it, copy its
tokens or wear it across the site (`lib/site-palette.ts`).

---

## 1. The mental model

A ramp is ten steps from a **floor** to a **ceiling**.

- **Floor**: `background-100`, the page. Dark's floor is its darkest colour;
  light's floor is its lightest. Either way it is where the eye rests.
- **Ceiling**: `gray-1000`, the strongest ink.
- **Anchors**: steps **700** (solid fill) and **800** (hover). These are the
  brand colours. Everything else is derived.

The axis the system actually works in is **contrast against the floor**, not
lightness. Contrast rises monotonically from step 100 to 1000 in both themes,
which is why one set of rules serves light and dark. Lightness only rises in
dark; in light it falls.

| steps   | role               | derived from    |
| ------- | ------------------ | --------------- |
| 100–200 | subtle background  | the floor       |
| 300–400 | subtle border      | the floor       |
| 500–600 | border             | floor → solid   |
| **700** | **solid fill**     | **anchor**      |
| **800** | **hover**          | **anchor**      |
| 900     | text               | hover → ceiling |
| 1000    | high-contrast text | the ceiling     |

---

## 2. The formula

### The span factor

Moving an endpoint rescales the whole ramp by one number:

```
k = (CR_ceiling_new − 1) / (CR_ceiling_now − 1)
CR[step] = 1 + (CR_shipped[step] − 1) × k
```

Then solve lightness for that contrast. `k = 1` at the shipped endpoints, so
nothing moves until you move something.

**Interpolate in contrast space, never in lightness space.** Proportional
lightness puts `gray-100` twelve points off where it belongs; contrast space
puts it within two. Near the floor a small lightness difference carries large
perceptual weight, so the proportional position has to be measured in the thing
the eye reads.

### Per-step lightness

```
100–500   shared scale + TINT_LIFT[step]
600       scale[500] + 0.6 × (solid − scale[500])
700       anchor.solid
800       anchor.hover
900       past the hover step, at least TEXT_LIFT away from it; in light,
          never more than TEXT_DEPTH below gray-900
1000      the ceiling
```

The shared scale is the gray spine remapped onto the new endpoints.

### Chroma

```
C = UNIFORM_CHROMA[step] × chromaLimit(L, H)
```

Always a **fraction of the gamut limit**, never an absolute. That is what makes
the ramps uniform: every hue sits equally far out toward its own boundary. An
absolute chroma means teal is clipped while purple is left pale.

Two bounds on that fraction:

```
C = saturation × min(UNIFORM_CHROMA[step] × chromaLimit(L, H), TINT_CEILING[step])
```

- **`TINT_CEILING`** caps steps 100–500 in absolute chroma. Near yellow-green
  the gamut balloons at high lightness, so the edge is a highlighter, not a
  wash: uncapped, `green-500` is `#00F55E` against a shipped `#82EB8D`. Each
  cap is the second-highest of the seven shipped chromas at that step, the
  percentile that fits them best (mean error 0.009 → 0.003 in light).
- **`TINT_GAP`** keeps consecutive tints at least 0.66 L apart. The lifts are
  absolute, so a compressed span can otherwise land 100 and 200 on one colour.
- **`saturation`** is an optional per-anchor fraction, 1 by default. A palette
  whose secondary hues are deliberately muted (Granola's sit at 0.5–0.77)
  sets it below 1; its brand anchor stays on the edge. In light it skips the
  subtle steps 100–300: near white the gamut edge is already narrow, and
  muting them a second time washes a highlight out to nothing (Oat's milk
  chocolate tint went from C 0.027 to 0.017). Dark tints have room and stay
  muted.

### Tinted neutrals

An optional `NeutralTint { hue, strength }` gives the neutrals a cast. A
tinted gray rides a **fixed fraction of the gamut edge**, the same rule as the
hue ramps at a far smaller fraction:

```
C_neutral = strength × chromaLimit(L, hue)
```

Fitted against Tailwind's eight tinted neutrals and Granola's oats, one
fraction per ramp beats a constant chroma for seven of the nine, at about half
the error. Measured strengths, for calibration:

| zinc | Granola | stone | mist | gray | slate |
| ---- | ------- | ----- | ---- | ---- | ----- |
| 0.06 | 0.046   | 0.07  | 0.13 | 0.19 | 0.29  |

The edge closes at pure white and pure black, so those floors and ceilings
stay pure whatever the strength. For `gray-1000` (and the primary button,
which is `gray-1000`) to carry the hue, the ceiling has to sit off black.

**The tint never moves contrast.** Chroma shifts luminance at equal OKLab L
(blue down, yellow up), so each tinted step is re-solved for the luminance its
pure-gray step had. Every text pair keeps its ratio exactly.

Alpha follows the tint. Each alpha step is solved for **the least opacity and
the ink at it** that composite exactly onto the solid step over the floor,
channel by channel in gamma space. Least opacity means the most saturated ink,
which is how a 6% hairline keeps its cast. With no tint this reduces to black
ink in light and white in dark, as shipped.

### Hue

Constant per ramp, except warm hues past the anchor:

```
H = anchor.hue + WARM_ROTATION[step] × warmth(H)
```

`warmth()` is ~1 at yellow and ~0 by 30°/150°, so amber turns −10.9° and blue
turns 0.0°.

---

## 3. Bringing in a new colour

Add one row to `ANCHORS` in `color-ramp.ts`:

```ts
violet: { hue: 293.0, solid: 54.1, hover: 48.1 },
```

Three numbers, shared by both themes. Then:

**Pick `hue`**: convert your brand hex to OKLCH and take the angle.

**Pick `solid`**: start at the hue's **sRGB gamut cusp**, the lightness at
which it carries the most chroma. Five of the seven shipped anchors sit within
two points of their cusp. The cusp is where a hue looks most like itself, which
is why this is the default rather than a fixed value.

| hue       | cusp L   | shipped 700 |
| --------- | -------- | ----------- |
| purple    | 57.5     | 55.5        |
| blue      | 59.5     | 57.6        |
| red       | 63.0     | 62.6        |
| pink      | 64.5     | 63.5        |
| **amber** | **81.0** | **81.9**    |
| green     | 87.0     | **64.6**    |
| teal      | 89.5     | **64.9**    |

Green and teal are the deliberate exceptions, pulled 22–25 points _below_ their
cusps; a cusp-lightness green is a lime, too bright to carry a brand. If your
hue sits between roughly 100° and 180°, expect to override the cusp downward.

**Pick `hover`**: 4 to 7 points below `solid`. The shipped ramps average 6.

**Then check the generated ramp for:**

- White text on 700. If it fails 4.5:1, that hue needs dark text as its
  on-colour; this is normal for warm hues and is what amber does.
- Step 900. It must sit further from the floor than 800, unless the anchor
  is dark enough that TEXT_DEPTH stops it (see Findings).
- Whether 1000 still reads as your hue, or has gone neutral.

---

## 4. The brand ramp

A brand colour gets a palette of its own beside the seven named hues, never
in place of one. Red stays red whatever the brand, so a colour that sits
between hues (a clay somewhere between red, orange and amber) needs no
forcing. The palette has a human name (Olive), but the
tokens are always `--ds-brand-*`, so anything written against them works for
every brand:

```
--ds-brand-100 … 1000    a hue ramp; 700 is the brand colour exactly
--ds-brand-950           where gray's 950 sits between its 900 and 1000
--ds-brand-alpha-*       solved like gray-alpha: lands on the solid step
--ds-brand-on            text on brand-700: white at 4.5:1, else black
```

Pass it as `uniformPalette(…, brand)`, a `Brand { name, anchor }`.

### Where the brand goes

`gray-1000` says two things in components/ui today: _do this_ (the primary
button) and _this is on_ (a checked box, a switch, a slider's fill). A brand
theme has to split them. Granola's app shows where, measured from
screenshots of its settings, folder and note views (2026-11-15): every
colour on a control answers one of four questions.

| The colour says                  | Paint                   | Granola's app                                                                        |
| -------------------------------- | ----------------------- | ------------------------------------------------------------------------------------ |
| structure, and where you are     | gray, carrying the tint | nav selected #E9E9E1, active tab #EEEDE6, row hover #EEEEE5, on #F7F7F1              |
| do this: the one command         | ink, a `gray-1000` fill | Share, Upgrade, Connect Gmail, all #292929                                           |
| this is on: a state the user set | brand                   | switch #5B6F00, Shared #5B6F00 on #E5E7D3, selected turn ring #5B6F00, count #B2C147 |
| this means something             | its named hue           | Move to trash #B12A04, New #212CAB on #EAF4FE                                        |

The test is whether the user set it or can do it. Set: brand. Can do: ink
for the one primary command, gray for the rest. Where you are (the current
page, the active tab, the highlighted menu item) is gray, because it changes
with every click and records nothing the user chose. A selection that
actions apply to is a state the user set, so it is brand: Granola's nav is
gray and its selected transcript turn is olive, and both are right.

The command stays ink for two reasons. Ink clears 4.5:1 on every floor
whatever the brand, while a brand-700 often cannot carry white: a clay like
#D97757 manages 3.1:1, so its brand-on is black. And the brand only means _on_ while nothing
you can press is painted with it.

Granola breaks its own line four times, and those are what reads as mess:

- Resume is a command in olive text (#5B7001), beside gray ghosts like
  Copy link and the recipe chips.
- Sign out is #E64017, a brighter red than the trash's #B12A04, on an
  action that loses nothing.
- Remove from folder is red on a red wash (#B43416 on #FFE7E2); the note
  survives it. Only Move to trash loses anything.
- New is blue and Beta is gray: one kind of badge in two families.

Share turning from ink to an olive Shared is not one of them: that is the
rule, a command becoming a state.

In ziiz terms:

| Role                                                 | Stock                                           | Brand theme                                      |
| ---------------------------------------------------- | ----------------------------------------------- | ------------------------------------------------ |
| checked: checkbox, radio, switch; slider, progress   | `gray-1000` fill, `950` hover, `background-100` | `brand-700`, `800` hover, `brand-on`             |
| pressed toggle                                       | `gray-alpha-200`, text `gray-1000`              | `brand-alpha-200`, text `brand-1000`             |
| selection: selected items, `<mark>`, a count of them | gray                                            | `brand-700` ring or fill, `brand-alpha-200` wash |
| primary button, default badge                        | `gray-1000` fill                                | unchanged: ink                                   |
| secondary, outline, ghost; tabs, nav, menu, hover    | gray                                            | unchanged, tinted by the neutral tint            |
| focus ring                                           | `gray-600`                                      | unchanged: it has to show around a brand fill    |
| danger, info, success                                | red, blue, green                                | unchanged                                        |

So the brand reaches every component through the tint, and reaches
attention only through state. For components/ui to do this without knowing
about brands, theme.css would define `--ds-brand-*` defaulting to the gray
each role uses today (`brand-700` to `gray-1000`, `brand-800` to `gray-950`,
`brand-on` to `background-100`, `brand-alpha-*` and `brand-1000` to their
gray steps), and the on-state classes in switch, checkbox, radio-group,
slider, progress and toggle would move to `brand-*`. Stock output stays
identical and a brand theme overrides the variables. Not done: it is a
minor bump of the theme package. `ThemePreview` applies it with `var()`.

### Which colour is the brand

The colour the product is recognised by: its mark, which on a marketing
site is often also the fill of its call to action (granola.ai's olive does
both; in the app, the action is ink). When the two differ, the mark is the brand and the interactive colour keeps its named
ramp: claude.ai's clay fills only the spark, so it is the brand, and its
blue links and banner stay on blue. Record the source on the brand, with
the measurement as evidence; never take it from a declared token.

## 5. Seeding a palette from one colour

`seedTheme(hex, { strength, matchSaturation })` in `lib/seed-palette.ts`. Live
as the Custom card on `/playground`, which always matches saturation.

- The seed's **hue tints the grays** at `strength`. Every component in
  `components/ui` speaks gray, so the kit follows without being edited.
- The seed **is the brand ramp's 700**, hover 6 below, saturation its own
  fraction of the edge. Its L is clamped into 40–88: below that it merges
  with text, above it is a tint, not a fill.
- **On-colour** is white where it holds 4.5:1 on the solid, else dark. Pastel
  seeds take dark text, as amber does.
- With `matchSaturation`, the named ramps take the seed's saturation, so a
  pastel seed gives a pastel family. Their hues never move.

## 6. Making a new palette

Change the floor and ceiling. That is the whole interface.

**Match `k` across themes**, or one theme will feel crisper than the other:

```
dark    #0F0F0F / #E1E1E1    k = 0.807
light   #FAFAFA / #242424    k = 0.820
```

**Do not mirror the endpoints between themes.** Swapping dark's pair into light
matches `k` exactly, but light and dark are not perceptually symmetric: lifting
a dark floor 17 points off black reads as _soft_, while dropping a light page
to `#E1E1E1` reads as _dingy_, and it drags every tint down with it
(`blue-100` becomes `#C5DCFF`, a real blue rather than a wash).

**Match `k` by softening the ink instead.** Hold the light page near-white and
lighten the ceiling. `#242424` instead of `#1A1A1A` buys the same compression
and keeps `blue-100` at `#EBF3FF`.

### The library

Every palette on `/playground` is a recipe in `lib/palettes.ts`: endpoints,
a tint per theme, and optionally anchors and a brand. The page shows only
the result; how each recipe was arrived at lives here.

- **Oat** (2026-11-18) is designed, not measured: milk chocolate `#795533`
  on a page halfway between warm paper and Cursor's olive cream (hue 84 at
  0.11), softened hues, amber moved to gold, an espresso dark. It is the
  palette that forced `TEXT_DEPTH` and the light-tint saturation rule.
- **Graphite** (2026-11-20) is measured from claude.ai's live `--cds-*`
  tokens in both modes: pure gray, page `#FFFFFF` and `#191919`, ink at
  90% and 93% (`#191919`, `#EFEFEF`), sidebar `#FAFAFA` and `#1F1F1F`,
  which the generator lands on exactly as `background-200`. No brand: clay
  `#D97757` marks only the logo, and Claude's on-colour is its blue, so the
  ziiz ink on-states stand. Each hue's 700 and 800 are fitted to the app's
  fill and fill hover (blue `#257DE0`, amber `#FBB315`, green `#10A122`,
  aqua as teal `#019C7F`, violet as purple `#785EE8`, magenta as pink
  `#CE447D`). Red is the light-mode fill `#C83839` in both themes, since
  700 cannot vary by theme; white on it is 5.1:1. Not carried over: dark
  menus lifted to `#303030` (ziiz materials paint `background-100`) and
  the 4% dark hairline.
- **Custom** is one colour and a strength, through `seedTheme`.

To add one, add a recipe to `LIBRARY`. To base one on a real product,
measure it with `scripts/brand-colors` and fit the recipe to what it
reports.

### Limits

- A dark floor above **~22% L** collides with the tints, though under the
  contrast-space rule steps are defined as ratios _above_ the floor, so they
  cannot invert. They just stop being distinguishable.
- Raising the dark floor costs contrast everywhere: `CR_new ≈ CR_old × 0.91`
  at `#0F0F0F`. Re-check anything that was already marginal.
- 700 and 800 do **not** move with the endpoints, so their contrast against the
  background drops passively. That is the cost of theme-invariant anchors.

---

## 7. Findings

Things that were not obvious, in rough order of how much trouble they caused.

### 700 and 800 are identical in light and dark

Not approximately: exactly, in lightness and hue angle. Only chroma is nudged.

```
blue    700  57.61 / 57.61      amber   700  81.87 / 81.87
```

A primary button is literally the same colour in both themes, and everything
else in the ramp moves around it. This is the single most distinctive property
of the system, and it is why porting the generator to light cost almost
nothing: half the input data was already shared.

### Gray is the spine, not the tint ladder

Hue tints sit systematically _above_ gray at the same step, and all seven ramps
agree closely:

| step  | 100  | 200  | 300  | 400  | 500  |
| ----- | ---- | ---- | ---- | ---- | ---- |
| dark  | +0.6 | +1.9 | +3.2 | +4.2 | +1.9 |
| light | +0.9 | +2.4 | +2.2 | −2.1 | +0.9 |

Putting colored tints exactly on the gray value costs lightness, and for a
high-cusp hue **lightness is chroma**: green and teal lost 10–15% of their
saturation before this was restored. Light dips negative at 400 because
`gray-400` is itself anomalously lighter than `gray-300`.

### 900 climbs past 800, until a dark anchor

True in all seven shipped ramps. A hue whose anchor is high (amber at 77)
will fold back below its own hover step if 900 is pinned to a shared scale,
and a ramp that reverses there reads as muddy rather than merely dark.

A dark anchor breaks the other way. Oat's milk chocolate hovers at L42, so
900 had to land at L41: darker than gray-900 (L57), with so little chroma
that a brand highlight read as ink. In light, `TEXT_DEPTH` (7) stops 900 that
far below gray-900 instead, so it folds back past 800 to L50 at C 0.085.
The shipped ramps never reach it (their gray-900 is L51; the lowest hover,
purple, is 48.6), and dark is untouched, where 900 already climbs above the
hover.

### Warm hues rotate toward orange, and it buys saturation

A darkened yellow reads as olive at its own hue angle. Rotating toward orange
fixes the identity _and_ gains chroma, because sRGB is wider that way at high
lightness:

```
amber-800 at H 76.5   Cmax 0.162   #EEA400
amber-800 at H 64.5   Cmax 0.173   #FE9A00
```

It is lightness-dependent, so it is not a fixed offset: at the 700 anchor the
same rotation _loses_ chroma (0.132) and washes the colour out. Rotation
applies at 800 and below-the-anchor steps only.

**Do not derive it by maximising chroma.** That ignores hue identity and turns
`blue-800` into indigo. Gate it on the warm band instead.

### The shipped ramps are authored outside sRGB

Most steps declare more chroma than sRGB can show and get clipped at paint
time: teal by 33%, purple under by 20–30%. Riding the computed gamut edge is
both more uniform and closer to what actually reached the screen.

### Gray alpha does not track solid gray

At the same step number the two diverge: `gray-alpha-600` flattens to L 81.3
against `gray-600` at 73.2, eight points apart. Swapping one for the other is
not a neutral change despite the matching names. The generator solves opacity
to land on the scale, so in generated palettes they match exactly.

### Two non-monotonicities are real and should survive

- **`gray-400` is lighter than `gray-300`** in light. A quirk, but load-bearing
  for anything using 300/400 as a pair.
- **800 dips below 700** in dark. Not jitter; it is the solid/hover pair, and
  smoothing it destroys the relationship.

The contrast-space remap preserves both automatically, since it preserves
ordering. Do not "fix" them.

### Known issue: white on the destructive button misses 4.5:1

`Button` `destructive` hardcodes `text-white` on `red-700`, which assumes
the solid is dark enough to carry white. It is not, even as shipped:

| red-700               | white  | black |
| --------------------- | ------ | ----- |
| ziiz `#FC0035`        | 4.04:1 | 5.2:1 |
| a muted red `#CB6462` | 3.79:1 | 5.5:1 |
| an orange `#EB6834`   | 3.2:1  | 6.6:1 |

Left as is on 2026-11-15, by choice. The fix on the table was a
contrast-picked on-colour utility in theme.css (minor bump), which would
turn the default Delete to black text. Moving the fill to `red-800` keeps
white at 4.8:1 as shipped but still fails on muted themed reds. The
`/playground` previews put `brand-on` on the brand solid, so they show the
difference beside the stock button.

### Every element on a painted surface needs that surface's colours

A hairline hardcoded to `rgb(255 255 255 / 0.07)` is invisible on a light
floor. Anything drawn over an explicitly-painted surface (hairlines, labels,
overlaid text) has to derive from that surface, not from the page theme.

---

## 8. Reference

| constant            | what it is                                     |
| ------------------- | ---------------------------------------------- |
| `ANCHORS`           | the editable table: hue, solid, hover per ramp |
| `CURRENT_ENDPOINTS` | the shipped floor/ceiling, per theme           |
| `UNIFORM_CHROMA`    | fraction of the gamut edge each step rides     |
| `TINT_LIFT`         | how far tints sit off gray                     |
| `TINT_CEILING`      | absolute chroma cap on steps 100–500           |
| `TINT_GAP`          | minimum step between consecutive tints         |
| `WARM_ROTATION`     | orange rotation at 800/900/1000                |
| `TEXT_LIFT`         | minimum separation from 800 to 900             |
| `TEXT_DEPTH`        | how far light 900 may sit below gray-900       |
| `BORDER_T`          | where 600 sits between tint and solid          |

| function                                                 |                                    |
| -------------------------------------------------------- | ---------------------------------- |
| `uniformPalette(theme, floor, ceiling, anchors?, tint?)` | generate a palette                 |
| `paletteTokens(palette)`                                 | every `--ds-*` token, gray-950 too |
| `currentPalette(theme)`                                  | the shipped tokens, for comparison |
| `chromaLimit(L, H)`                                      | the sRGB gamut edge                |
| `hexToOklch` / `oklchToHex`                              | conversion                         |
| `contrastRatio` / `relativeLuminance`                    | WCAG                               |

Numbers in this document were measured from the seven ramps in
`packages/theme/theme.css`, not chosen.
