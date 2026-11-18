// Summarise a measure.mjs run: what a site paints, by role and weight.
//   node scripts/brand-colors/report.mjs <site> [light|dark]
// Sections: surfaces by area, text by characters, borders by count, buttons
// with their measured hover, colour (chroma above 0.04) and illustration
// fills. Every row carries its count and the number of pages it was on.
import { readFileSync } from "node:fs"

const WORK = process.env.BRAND_COLORS_WORK ?? ".brand-colors"
const [, , site, scheme = "light"] = process.argv
const pages = JSON.parse(readFileSync(`${WORK}/${site}/raw.json`, "utf8"))
  .filter((p) => p.scheme === scheme)
  .map((p) => ({ ...p, path: new URL(p.url).pathname }))

function chromaOf(hex) {
  const lin = (c) =>
    c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
  const [r, g, b] = [1, 3, 5].map((i) =>
    lin(parseInt(hex.slice(i, i + 2), 16) / 255)
  )
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b)
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b)
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b)
  const A = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s
  const B = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s
  return Math.hypot(A, B)
}

function tally(items, key, weight, note) {
  const rows = new Map()
  for (const it of items) {
    const k = key(it)
    const row = rows.get(k) ?? {
      k,
      w: 0,
      n: 0,
      pages: new Set(),
      notes: new Map(),
    }
    row.w += weight(it)
    row.n++
    row.pages.add(it.path)
    const x = note(it)
    row.notes.set(x, (row.notes.get(x) ?? 0) + 1)
    rows.set(k, row)
  }
  return [...rows.values()].sort((a, b) => b.w - a.w)
}

function print(title, rows, unit, limit = 20) {
  console.log(`--- ${title}`)
  for (const r of rows.slice(0, limit)) {
    const notes = [...r.notes.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([x, c]) => `${x}×${c}`)
      .join("  ")
    console.log(
      `${r.k.padEnd(34)} ${String(Math.round(r.w)).padStart(9)}${unit} n${String(r.n).padStart(4)} p${r.pages.size}  ${notes}`
    )
  }
}

const all = (field) =>
  pages.flatMap((p) => (p[field] ?? []).map((x) => ({ ...x, path: p.path })))

console.log(
  `##### ${site} ${scheme} · ${pages.length} pages · roots ${[...new Set(pages.map((p) => p.rootBg))].join(" ")}`
)
print(
  "surfaces by area (painted colour, raw if translucent)",
  tally(
    all("surfaces"),
    (s) => s.hex + (s.raw ? ` (${s.raw})` : ""),
    (s) => s.area / 1000,
    (s) => `${s.role}:${s.el.slice(0, 26)}`
  ),
  "k"
)
print(
  "text by characters (painted colour · alpha · on)",
  tally(
    all("texts"),
    (t) => `${t.hex} a${t.alpha} on ${t.on}`,
    (t) => t.chars,
    (t) => `${t.role}/${t.size}/${t.weight}`
  ),
  "c"
)
print(
  "borders by count",
  tally(
    all("borders"),
    (b) => `${b.hex} a${b.alpha} on ${b.on}`,
    () => 1,
    (b) => `${b.role}:${b.width}`
  ),
  "",
  12
)
print(
  "buttons (bg / text / border / radius / height → hover)",
  tally(
    all("controls"),
    (c) =>
      `${c.bg ?? "none"}/${c.fg}/${c.border ?? "-"}/${c.radius}/${c.height}`,
    () => 1,
    (c) =>
      `"${c.text.slice(0, 16)}"${c.hover ? ` → ${c.hover.bg ?? "none"}/${c.hover.fg}/${c.hover.border ?? "-"}` : ""}`
  ),
  "",
  16
)
const coloured = [
  ...all("surfaces").map((s) => ({
    ...s,
    w: s.area / 1000,
    kind: `bg:${s.role}`,
  })),
  ...all("texts").map((t) => ({
    ...t,
    w: t.chars,
    kind: `text:${t.role}:"${t.sample.slice(0, 14)}"`,
  })),
].filter((x) => chromaOf(x.hex) > 0.04)
print(
  "colour (chroma > 0.04)",
  tally(
    coloured,
    (x) => x.hex,
    (x) => x.w,
    (x) => x.kind
  ),
  "",
  16
)
print(
  "illustration fills by area",
  tally(
    all("fills"),
    (f) => f.hex,
    (f) => f.area / 1000,
    (f) => f.prop
  ),
  "k",
  12
)
