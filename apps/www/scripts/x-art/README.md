# X art pipeline

How `components/art` was produced from business.x.com (2026-09-26), so the
settled drawings can be re-captured when the site changes.

1. `capture.mjs` opens every URL in `<work>/urls.txt` at 1512 and 390 wide,
   scrolls so the reveal animations run, then dumps each page's inline SVGs
   with their settled attributes to `<work>/live/*.json`. The server HTML
   holds the pre-animation state (collapsed lines, `scale(0)`), so a plain
   curl is not enough.
2. `catalogue.mjs` merges the captures, dedupes structurally, prefers the
   visible capture of each drawing, and writes `<work>/catalogue.json` plus
   a contact sheet in `<work>/sheet` and `<work>/montage`.
3. `generate.mjs` turns the entries named in `manifest.json` (plus the 11
   blog card SVGs in `<work>/cardart`, light files) into TSX: attributes
   camel-cased, x.com colour variables mapped to ziiz tokens, clip and mask
   ids scoped with `useId`, `foreignObject` labels rewritten as `<text>`,
   photos replaced by grey placeholder rects. Then run prettier.

The help.x.com pieces (`help/`) were added on 2026-10-04 from a capture of
that site alone: put its URLs in `urls.txt`, run capture and catalogue, add
the entries to `manifest.json`, then `X_ART_ONLY=help node
scripts/x-art/generate.mjs`. That writes only that category's components and
leaves `index.ts` to be extended by hand, since the business.x.com captures
are not kept.

`<work>` defaults to `apps/www/.x-art` (gitignored); set `X_ART_WORK` to
move it. Playwright comes from the global npm root (`NPMROOT`).
