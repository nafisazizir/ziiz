---
name: migrate-component
description: Migrate a components/ui file from stock shadcn (Vega) to the ziiz foundations system — ramp colors, type roles, materials, focus signatures. Use when asked to migrate a component, run a migration pass, or continue the shadcn → ziiz migration.
---

# Component migration playbook

How a `components/ui` file goes from stock shadcn (Vega) to the ziiz system.
Mutable state — open questions and the per-component decision log — lives in
`MIGRATION.md` at the repo root; read it before starting and append to it when
a pass resolves something.

## Ground rules

- **One component per pass. A component is either fully migrated or
  untouched — never mixed vocabularies within a file.**
- **Never commit.** A migration pass ends with changes in the working tree
  and a summary of what was done and any judgment calls made. A human partner
  reviews and commits.
- **No migrating around open questions.** If a pass surfaces a judgment this
  playbook doesn't settle (a hover step, a material assignment, a divergence
  worth keeping), stop, resolve it with the human, log it in `MIGRATION.md`,
  then continue. A migration never lands with an unresolved issue baked in.

## Source of truth

The Foundations system, live in code:

- **`app/globals.css`** — the entire foundation, in order: the raw `--ds-*`
  ramp (the only place literal colors exist), the `:root` slot block (each
  shadcn alias and the ramp token it resolves to), the ramp exposed as
  Tailwind utilities (`bg-gray-*`, `bg-background-*`, 8 hues), the 8
  `material-*` utilities, the 31 `text-*` type roles.
- **`/colors`, `/typography`, `/materials`** — the docs pages rendering it
  (source: `app/(docs)/*/page.tsx` and the preview components they render —
  `color-scales.tsx`, `token-mapping.tsx`, `type-scale.tsx`,
  `material-scale.tsx`).
- **`/dependencies`** — the migration dashboard: per-component alias classes,
  dependents, out-of-`ui` call sites, and the canonical progress meter.

## Decisions in force

These are settled. Apply them; don't relitigate them mid-migration.

1. **Ramp-first authoring.** Migrated components speak only ramp vocabulary
   (`bg-gray-100`, `border-gray-alpha-400`, `text-gray-900`,
   `bg-background-100`) — never shadcn aliases (`bg-muted`, `text-foreground`,
   …). The aliases remain wired in `globals.css` as a compatibility layer for
   not-yet-migrated components only.
2. **Controls are flat.** Vega's `shadow-xs`/`shadow-sm` on controls is
   rejected; the border/wash carries the edge. Elevation exists only on
   floating surfaces, and only as a `material-*` utility — never a bare
   `shadow-*` class.
3. **Focus: the shadcn halo, kept, in gray, spelled in ramp vocabulary.**
   One signature for every control, click or text-entry:
   `focus-visible:border-gray-600 focus-visible:ring-3
   focus-visible:ring-gray-600/50` — the solid gray-600 border for the crisp
   edge, the translucent 3px halo for the glow. This is a pure rename of
   shadcn's `focus-visible:border-ring focus-visible:ring-3
   focus-visible:ring-ring/50` cluster (`--ring` already resolves to
   `--ds-gray-600`), so migration changes focus vocabulary, never focus
   pixels. There are no focus tokens. The `/50` is deliberate state opacity
   (decision 5's carve-out), never swapped for a `gray-alpha-*` step — the
   halo stays derived from the border color, and no alpha tier has a halo
   role. An offset ring was prototyped on the pilot and rejected; don't
   revisit.
4. **Radius: keep the generic `rounded-*` scale.** No semantic shape tokens.
   The scale resolves through `--radius: 0.875rem` (Large); migration never
   changes a component's radius classes unless they visibly break on
   `/preview` — and that's a stop-and-resolve, not a silent fix.
5. **Hover steps the ramp, never opacity-mixes.** `hover:bg-x/80` and
   `color-mix()` hovers are replaced by the adjacent hand-tuned ramp step.
6. **Input wash.** Inputs carry the `bg-gray-alpha-400/30` wash in **both**
   themes (not dark-only as stock shadcn ships it).
7. **Light and dark share the same token names.** Theming happens underneath
   the ramp; migration never adds `dark:` color overrides — if a component
   seems to need one, stop and resolve.
8. **No press animation on buttons.** Vega's `active:*translate-y-px` nudge
   (the button shifting down when pressed) is rejected — delete it wherever it
   appears. With no transform left to animate, narrow `transition-all` on
   controls to `transition-colors` (or drop it if nothing transitions).
   Functional motion is unaffected: switch thumb travel, accordion collapse,
   overlay enter/exit stay as shipped.

## Order

1. Tier 0 (leaves) on `/dependencies` first, most-depended-on first within
   the tier.
2. A composite only after every component it imports is migrated — so any
   visual diff on `/preview` belongs to the component being touched.

**Pilot pair: `button` then `input`.** Between them they force every judgment
call once; everything after is repetition.

## The five passes

### 0. Read the foundations first — required, every time

Before editing anything, read both layers of the source of truth listed
above:

- **The tokens** — the four blocks of `app/globals.css`.
- **The semantics** — the foundation docs pages `/colors`, `/typography`,
  `/materials`. They carry the reasoning the tokens alone don't: what each
  ramp tier is *for* (backgrounds vs borders vs text tiers, alpha vs solid),
  which type role fits which surface (label vs copy vs heading, when mono),
  and which material belongs to which elevation role. Judgment calls in
  passes 1–3 (a hover step, a role choice, a material assignment) are made
  against this reasoning, not just token names.

Plus `MIGRATION.md` (open questions that gate this component, prior calls,
and any dependent notes filed against this component by an earlier
migration — they are part of this pass's scope) and the component's row on
`/dependencies` (its alias classes, dependents, call sites). Every substitution in passes 1–4 must be traceable to something
read there in this session — never from memory of what shadcn or "a design
system" usually does. If the foundations don't contain what a pass needs,
that's a stop-and-resolve.

Do all five passes in one sitting per component. Passes 1, 2, and 4 are
renames with zero visual change; pass 3 carries the visible changes (shadow
removal, materials); pass 5 proves it.

### 1. Color — alias → ramp

For each alias class on the component (the `/dependencies` row lists them),
look up the ramp token that alias resolves to in the `:root` slot block of
`globals.css`, and rename to that token's utility. **The rename must resolve
to the same `var()` — this pass changes vocabulary, not color.** Don't pick a
"better" token while renaming; if the mapped token looks wrong in place,
that's a stop-and-resolve.

Then eliminate the opacity hacks (decision 5): each `hover:bg-x/80` or
`color-mix()` hover becomes a ramp step, chosen on `/preview` and logged.
Opacity kept deliberately as *state* (`disabled:opacity-50`, the focus
halo's `ring-gray-600/50`, the input wash `/30`) is fine — the rule targets
color-mixing hovers, not state opacity.

### 2. Typography — utilities → roles

Replace every size/weight/tracking cluster with one of the 31 named roles in
`globals.css` (e.g. control/label text `text-sm font-medium` →
`text-label-14`; running text → `copy-*` roles; mono → the `-mono` roles).
A migrated component contains no raw `text-sm` / `font-medium` /
`tracking-*`. If no role fits, stop and resolve — don't invent a one-off
cluster.

### 3. Shadows & materials

- **Controls** — button, input, textarea, select trigger, native-select,
  checkbox, radio, switch, toggle, toggle-group, tabs triggers, input-otp,
  input-group, button-group, slider: **delete `shadow-xs`/`shadow-sm`
  outright, no replacement** (decision 2).
- **Floating surfaces** keep elevation, but only as a material — replace the
  whole ad-hoc cluster (`bg-popover` + `border` + `rounded-*` + `shadow-*`)
  with one utility, removing every class the material now supplies:
  - tooltip → `material-tooltip`
  - dropdown-menu, context-menu, menubar, select content, combobox popup,
    popover, hover-card → `material-menu`
  - dialog, alert-dialog, sheet, drawer, command palette → `material-modal`
- **In-page surfaces** (card, sidebar): `material-base`/`material-small` vs
  plain `border-gray-alpha-400` is not yet decided — stop and resolve at the
  first such component, then log it in `MIGRATION.md`.

### 4. Shape & interaction

- **Focus — apply decision 3's signature.** Rename the shadcn focus cluster
  to its ramp spelling: `focus-visible:border-gray-600 focus-visible:ring-3
  focus-visible:ring-gray-600/50`. Pixel-identical to stock; pass 5 confirms
  no visible change on focus.
- **Radius — rename only (decision 4).** Radius classes stay exactly as
  shipped; don't redesign shape.
- **States.** Keep `disabled:`, `aria-invalid:`, `aria-expanded:` behavior;
  rename their colors per pass 1.

### 5. Verify

1. `/dependencies` — the component's row is green and the meter drops. The
   dot requires every tracked list to be empty — aliases, raw type, shadows,
   and raw shape (literal `rounded-[2px]`/`border-[1.5px]` values; the
   generic `rounded-*` scale and token-derived arbitraries stay sanctioned).
2. `/preview`, both themes — passes 1/2/4 render pixel-identical; the only
   visible diffs are pass 3's shadow/material change. Tab through the
   component to confirm focus still renders the shadcn halo unchanged.
3. Visit the out-of-`ui` call sites listed on the row. If a caller passes
   alias classes into this component via `className`, migrate those overrides
   in the same pass.
4. **Dependents** — for each dependent listed on the row, render it on
   `/preview` in every state this migration touched (rest, hover, focus,
   invalid, disabled…), both themes. Wrappers that reset or override this
   component (`border-0 bg-transparent`-style reset lists, `cn()` overrides)
   were written against the pre-migration contract: they silently miss
   anything the migration *added* (a new state class outranks a plain
   override on specificity) and keep dead resets for anything it *removed*.
   Don't fix the dependent — one component per pass — but log every
   regression and now-stale override in `MIGRATION.md` under "Dependent
   notes", with the mechanism and the intended fix, so the dependent's own
   migration pass inherits the history. If a regression is visibly broken
   (not merely off-system), stop and resolve with the human whether it
   warrants an out-of-band patch or waits for the dependent's pass.
5. `grep -n 'shadow-\|bg-muted\|bg-accent\|muted-foreground\|text-sm\|font-medium' components/ui/<name>.tsx`
   comes back clean (or only deliberate keeps, called out in the summary).

Then hand off: report the diff, the judgment calls made, and anything
stopped-and-resolved (appended to the `MIGRATION.md` decision log), and wait
for human review. No commit.
