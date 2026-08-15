# Migration state

Mutable state for the shadcn (Vega) → ziiz component migration. The
procedure itself — ground rules, decisions in force, the five passes — is
the `migrate-component` skill (`.agents/skills/migrate-component/SKILL.md`).
This file holds only what changes as the migration progresses: open
questions and the per-component decision log.

## Open questions (resolve before the component that hits them)

- Default button hover: which ramp step replaces `hover:bg-primary/80`?
  (Resolve during the `button` pilot, on `/preview`.)
- Destructive in dark: dim to `/60` or keep flat red-800? (First
  destructive-heavy component.)
- Card/sidebar: material or plain border? (First in-page surface.)

## Decision log (per-component calls)

| date | component | call |
| ---- | --------- | ---- |
| 2026-08-15 | (system) | Controls are flat: Vega `shadow-xs`/`sm` deleted from all controls; elevation exists only as `material-*` on floating surfaces. |
| 2026-08-15 | (system) | No press animation: Vega's `active:*translate-y-px` nudge deleted from buttons; control transitions narrowed to colors. Functional motion (switch, accordion, overlays) untouched. |
| 2026-08-15 | (system) | Focus: two-signature system adopted (replacing an earlier "keep shadcn's halo" deferral), in gray, composed inline from ring utilities — offset ring `ring-2 ring-gray-600 ring-offset-2 ring-offset-background-100` on click controls, halo `ring-3 ring-gray-600/50` on fields. No focus tokens: same-day `--ds-focus-halo` mint, `--shadow-focus-ring` exposure, and a blue→gray re-point of `--ds-focus-ring` were all reverted (token stays vendor-verbatim, unused); shadcn `ring-ring/50` cluster deleted on migration. |
