# Brand colours

How the `lib/themes` brand files were measured (2026-11-15), so they can be
re-measured when a site changes. Declared tokens are not evidence: a
stylesheet carries many that nothing paints, so these scripts read what the
browser actually renders.

1. `measure.mjs <site> <url...>` renders each page at 1440 wide in light and
   dark (`prefers-color-scheme`), dismisses the cookie banner, scrolls so lazy
   sections mount, then reads every visible element's computed background,
   text and border colour. Translucent colours are composited onto the
   surfaces behind them, so a 60% ink is recorded as the grey it paints.
   Backgrounds are weighted by area, text by characters. Each distinct
   button is hovered for its hover state, and SVG fills are read for the
   illustration colour. Output: `<work>/<site>/raw.json` and a screenshot per
   page and scheme.
2. `report.mjs <site> [light|dark]` summarises a run: surfaces, text,
   borders, buttons with hover, colour, and illustration fills, each row with
   its count and page coverage.

```bash
cd apps/www
NPMROOT=$(npm root -g) node scripts/brand-colors/measure.mjs granola \
  https://www.granola.ai/ https://www.granola.ai/pricing
node scripts/brand-colors/report.mjs granola light
```

The work directory defaults to `.brand-colors` (set `BRAND_COLORS_WORK`) and
is ignored by git. A site that ignores `prefers-color-scheme` paints the
same in both runs; its dark theme then comes from its dark sections, found
by filtering the report to text on that section's floor.
