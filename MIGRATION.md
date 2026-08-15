# Migration state

Mutable state for the shadcn (Vega) → ziiz component migration. The
procedure itself — ground rules, decisions in force, the five passes — is
the `migrate-component` skill (`.agents/skills/migrate-component/SKILL.md`).
This file holds only what changes as the migration progresses: open
questions and the per-component decision log.

## Open questions (resolve before the component that hits them)

- Card/sidebar: material or plain border? (First in-page surface.)

## Decision log (per-component calls)

| date | component | call |
| ---- | --------- | ---- |
| 2026-08-15 | (system) | Controls are flat: Vega `shadow-xs`/`sm` deleted from all controls; elevation exists only as `material-*` on floating surfaces. |
| 2026-08-15 | (system) | No press animation: Vega's `active:*translate-y-px` nudge deleted from buttons; control transitions narrowed to colors. Functional motion (switch, accordion, overlays) untouched. |
| 2026-08-15 | (system) | Focus: shadcn's halo, kept, one signature for every control — `focus-visible:border-gray-600 focus-visible:ring-3 focus-visible:ring-gray-600/50`, a pure ramp respelling of the stock cluster (`--ring` = `--ds-gray-600`), so focus is a zero-visual-change pass. No focus tokens. The `/50` stays an opacity modifier, not a `gray-alpha-*` step: alpha's roles are backgrounds/borders/text (no halo tier), the halo should stay derived from the border color, and dark alpha steps are white-based and would brighten it. An offset ring (2px gap + 2px stroke) was prototyped at gray-600 and gray-1000 and rejected both times — don't revisit. |
| 2026-08-15 | (infra) | `cn()` merge fix, surfaced by the pilot: stock tailwind-merge classifies `text-button-12`/`text-label-14`-style roles as text *colors*, silently dropping a real color earlier in the chain (xs default button rendered white-on-white). `lib/utils.ts` now uses `extendTailwindMerge` registering all 31 type roles under the `font-size` group and the 8 `material-*` utilities as their own group. Prerequisite for every later migration. |
| 2026-08-15 | (infra) | `/dependencies` status widened: the dot and meter now require zero off-system classes of every tracked kind, not just aliases — aliases, raw type (now also `tracking-*`, `leading-*`, literal `text-[0.8rem]`), shadows (now also bare `shadow` and arbitrary `shadow-[...]`; `shadow-none` sanctioned), and a new raw-shape scan for literal radius/border values (`rounded-[2px]`, `border-[1.5px]`). The generic `rounded-*` scale, structural border widths, and token-derived arbitraries (`rounded-[min(var(--radius-md),8px)]`, `rounded-[inherit]`) stay sanctioned per decision 4. |
| 2026-08-15 | button | Migrated (pilot). Final calls: default hover `hover:bg-gray-950` — the vendor button's hover (`hsl(0,0%,22%)` light / `hsl(0,0%,80%)` dark) lands on this ramp step in both themes; destructive rebuilt as a solid fill `bg-red-800 text-white hover:bg-red-900`, settling "destructive in dark" as flat red-800 with no `/60` dims, no red focus overrides, `text-white` kept (ramp has no white utility; `text-background-100` flips to black in dark); outline flat in both themes — dark-only wash deleted per decision 7 (`bg-background-100` + `border-gray-alpha-400` + `hover:bg-gray-100`); ghost hovers the alpha ladder (`hover:bg-gray-alpha-100`, also `aria-expanded:`) per /colors' transparent-resting rule while filled variants step the solid ramp (secondary `hover:bg-gray-200`); type roles `text-button-14` base, `text-button-12` on xs; caller overrides migrated in-pass (5× `bg-muted`→`bg-gray-100`, 6× `text-muted-foreground`→`text-gray-900`, one redundant ghost-hover override deleted; `InputGroupButton`/`Addon` sites deferred to input-group). Verified on `/preview`, both themes. |
