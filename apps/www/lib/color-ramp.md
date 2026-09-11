# Color ramps

How the palette is generated, why it is shaped the way it is, and what to do
when you bring a new colour in.

Implementation: `lib/color-ramp.ts`. Live tool: `/playground`.

---

## 1. The mental model

A ramp is ten steps from a **floor** to a **ceiling**.

- **Floor** — `background-100`, the page. Dark's floor is its darkest colour;
  light's floor is its lightest. Either way it is where the eye rests.
- **Ceiling** — `gray-1000`, the strongest ink.
- **Anchors** — steps **700** (solid fill) and **800** (hover). These are the
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
900       past the hover step, at least TEXT_LIFT away from it
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

**Pick `hue`** — convert your brand hex to OKLCH and take the angle.

**Pick `solid`** — start at the hue's **sRGB gamut cusp**, the lightness at
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
cusps — a cusp-lightness green is a lime, too bright to carry a brand. If your
hue sits between roughly 100° and 180°, expect to override the cusp downward.

**Pick `hover`** — 4 to 7 points below `solid`. The shipped ramps average 6.

**Then check the generated ramp for:**

- White text on 700. If it fails 4.5:1, that hue needs dark text as its
  on-colour — this is normal for warm hues and is what amber does.
- Step 900. It must sit further from the floor than 800.
- Whether 1000 still reads as your hue, or has gone neutral.

---

## 4. Making a new palette

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

### Limits

- A dark floor above **~22% L** collides with the tints — though under the
  contrast-space rule steps are defined as ratios _above_ the floor, so they
  cannot invert. They just stop being distinguishable.
- Raising the dark floor costs contrast everywhere: `CR_new ≈ CR_old × 0.91`
  at `#0F0F0F`. Re-check anything that was already marginal.
- 700 and 800 do **not** move with the endpoints, so their contrast against the
  background drops passively. That is the cost of theme-invariant anchors.

---

## 5. Findings

Things that were not obvious, in rough order of how much trouble they caused.

### 700 and 800 are identical in light and dark

Not approximately — exactly, in lightness and hue angle. Only chroma is nudged.

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
high-cusp hue **lightness is chroma** — green and teal lost 10–15% of their
saturation before this was restored. Light dips negative at 400 because
`gray-400` is itself anomalously lighter than `gray-300`.

### 900 always climbs past 800

True in all seven ramps. A hue whose anchor is high — amber at 77 — will fold
back below its own hover step if 900 is pinned to a shared scale, and a ramp
that reverses there reads as muddy rather than merely dark.

### Warm hues rotate toward orange, and it buys saturation

A darkened yellow reads as olive at its own hue angle. Rotating toward orange
fixes the identity _and_ gains chroma, because sRGB is wider that way at high
lightness:

```
amber-800 at H 76.5   Cmax 0.162   #EEA400
amber-800 at H 64.5   Cmax 0.173   #FE9A00
```

It is lightness-dependent, so it is not a fixed offset — at the 700 anchor the
same rotation _loses_ chroma (0.132) and washes the colour out. Rotation
applies at 800 and below-the-anchor steps only.

**Do not derive it by maximising chroma.** That ignores hue identity and turns
`blue-800` into indigo. Gate it on the warm band instead.

### The shipped ramps are authored outside sRGB

Most steps declare more chroma than sRGB can show and get clipped at paint
time — teal by 33%, purple under by 20–30%. Riding the computed gamut edge is
both more uniform and closer to what actually reached the screen.

### Gray alpha does not track solid gray

At the same step number the two diverge — `gray-alpha-600` flattens to L 81.3
against `gray-600` at 73.2, eight points apart. Swapping one for the other is
not a neutral change despite the matching names. The generator solves opacity
to land on the scale, so in generated palettes they match exactly.

### Two non-monotonicities are real and should survive

- **`gray-400` is lighter than `gray-300`** in light. A quirk, but load-bearing
  for anything using 300/400 as a pair.
- **800 dips below 700** in dark. Not jitter — it is the solid/hover pair, and
  smoothing it destroys the relationship.

The contrast-space remap preserves both automatically, since it preserves
ordering. Do not "fix" them.

### Every element on a painted surface needs that surface's colours

A hairline hardcoded to `rgb(255 255 255 / 0.07)` is invisible on a light
floor. Anything drawn over an explicitly-painted surface — hairlines, labels,
overlaid text — has to derive from that surface, not from the page theme.

---

## 6. Reference

| constant            | what it is                                     |
| ------------------- | ---------------------------------------------- |
| `ANCHORS`           | the editable table: hue, solid, hover per ramp |
| `CURRENT_ENDPOINTS` | the shipped floor/ceiling, per theme           |
| `UNIFORM_CHROMA`    | fraction of the gamut edge each step rides     |
| `TINT_LIFT`         | how far tints sit off gray                     |
| `WARM_ROTATION`     | orange rotation at 800/900/1000                |
| `TEXT_LIFT`         | minimum separation from 800 to 900             |
| `BORDER_T`          | where 600 sits between tint and solid          |

| function                                          |                                    |
| ------------------------------------------------- | ---------------------------------- |
| `uniformPalette(theme, floor, ceiling, anchors?)` | generate a palette                 |
| `currentPalette(theme)`                           | the shipped tokens, for comparison |
| `chromaLimit(L, H)`                               | the sRGB gamut edge                |
| `hexToOklch` / `oklchToHex`                       | conversion                         |
| `contrastRatio` / `relativeLuminance`             | WCAG                               |

Numbers in this document were measured from the seven ramps in
`packages/theme/theme.css`, not chosen.
