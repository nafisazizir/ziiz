// Part of the business.x.com art pipeline. Run from apps/www with a work
// directory (default .x-art) and the global Playwright install:
//   NPMROOT=$(npm root -g) node scripts/x-art/<step>.mjs
// Steps: capture → catalogue → generate. See scripts/x-art/README.md.
// manifest.json: [{ file, name, category, source, note?, variants: [{ variant, key }] }]
// key → catalogue entry (settled outerHTML). Emits apps/www/components/art/<file>.tsx + index.ts.
const { chromium } = await import(`${process.env.NPMROOT ?? "/usr/local/lib/node_modules"}/playwright/index.mjs`);
const WORK = process.env.X_ART_WORK ?? ".x-art";
process.chdir(WORK);
import fs from "node:fs";
const OUT = process.argv[2] ?? "../components/art";
const manifest = JSON.parse(fs.readFileSync(new URL("./manifest.json", import.meta.url), "utf8"));
const catalogue = Object.fromEntries(JSON.parse(fs.readFileSync("catalogue.json", "utf8")).map(c => [c.key, c]));
const cardart = Object.fromEntries(fs.readdirSync("cardart").filter(f => f.endsWith(".light.svg")).map(f => [f, fs.readFileSync(`cardart/${f}`, "utf8")]));

const TOKENS = {
  "var(--x-fg-primary)": "currentColor",
  "var(--x-fg-primary, #09090b)": "currentColor",
  "var(--x-fg-secondary)": "var(--ds-gray-900)",
  "var(--x-fg-secondary, #70707b)": "var(--ds-gray-900)",
  "var(--x-fg-tertiary)": "var(--ds-gray-600)",
  "var(--x-fg-brand)": "var(--ds-blue-700)",
  "var(--x-bg-primary)": "var(--ds-background-100)",
  "var(--x-bg-secondary)": "var(--ds-gray-100)",
  "var(--x-bg-tertiary)": "var(--ds-gray-200)",
  "var(--x-bg-inputs)": "var(--ds-background-100)",
  "var(--x-border-normal)": "var(--ds-gray-alpha-300)",
  "var(--x-border-hover)": "var(--ds-gray-alpha-500)",
  "var(--x-illustration-panel)": "var(--ds-gray-200)",
  "var(--x-illustration-track)": "var(--ds-gray-300)",
  "var(--color-black-a10)": "var(--ds-gray-alpha-300)",
  "var(--color-black-a20)": "var(--ds-gray-alpha-500)",
  "var(--color-black)": "currentColor",
  "var(--text-meta)": "10px",
  "var(--text-meta-mobile)": "16px",
  "var(--text-meta--font-weight)": "500",
  "var(--text-meta--letter-spacing)": "0.1px",
  "var(--color-white)": "var(--ds-background-100)",
  "rgba(0, 0, 0, 1)": "currentColor",
  "rgba(255, 255, 255, 1)": "var(--ds-background-100)",
  // static card art (light files)
  "black": "currentColor", "#000": "currentColor", "#000000": "currentColor",
  "white": "var(--ds-background-100)", "#fff": "var(--ds-background-100)", "#FFFFFF": "var(--ds-background-100)", "#ffffff": "var(--ds-background-100)",
  "#F2F2F2": "var(--ds-gray-100)", "#f2f2f2": "var(--ds-gray-100)",
};
const CLASS = { "text-fg-primary": "", "text-fg-secondary": "text-gray-900", "text-fg-tertiary": "text-gray-600", "text-fg-primary/50": "text-gray-1000/50" };

const browser = await chromium.launch();
const page = await browser.newPage();

// Serialise a DOM subtree to JSX. Runs in the browser.
const toJsx = async (html) => {
  html = html
    .replace(/class="fill-neutral-0 dark:fill-neutral-1100"/g, 'fill="var(--ds-gray-100)"')
    .replace(/class="fill-\[#09090b\] dark:fill-\[#f6f6f4\]"/g, 'fill="currentColor"')
    .replace(/class="([^"]*)\bopacity-0\b([^"]*)"/g, 'class="$1$2" opacity="0"')
    .replace(/\bstroke-\[([\d.]+)px\]/g, "");
  await page.setContent(`<div id="root">${html}</div>`);
  return page.evaluate(([TOKENS, CLASS]) => {
    const camel = (a) => {
      if (a === "class") return "className";
      if (a.startsWith("xlink:")) return "xlinkHref";
      if (a.startsWith("xml:")) return "xml" + a[4].toUpperCase() + a.slice(5);
      if (a.startsWith("data-") || a.startsWith("aria-")) return a;
      if (a === "tabindex") return "tabIndex";
      return a.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
    };
    const ids = new Set();
    document.querySelectorAll("[id]").forEach(e => ids.add(e.id));
    const referenced = new Set();
    document.querySelectorAll("*").forEach(e => { for (const a of e.attributes) { const m = a.value.match(/url\(#([^)]+)\)/) || (a.name.endsWith("href") && a.value.match(/^#(.+)$/)); if (m) referenced.add(m[1]); } });
    let usesId = false;
    const idRef = (v) => v.replace(/url\(#([^)]+)\)/g, (_, i) => { usesId = true; return `url(#\${id}-${slug(i)})`; });
    const slug = (s) => s.replace(/^_R_[a-z0-9]+_-?/, "").replace(/[^a-zA-Z0-9]+/g, "-").replace(/^-|-$/g, "") || "ref";
    const token = (v) => { const bare = v.replace(/var\((--[a-z-]+), [^)]+\)/g, "var($1)"); return TOKENS[bare] ?? bare.replace(/var\(--(x|color|text)-[a-z-]+\)/g, m => TOKENS[m] ?? m); };
    const isLoop = (t) => /rotate\(\d/.test(t);
    const identity = (t) => /^(none|scale\(1\)|scaleX\(1\)|scaleY\(1\)|rotate\(0(deg)?\)|translate\(0(px)?(, ?0(px)?)?\)|translateX\(0(px)?\)|translateY\(0(px)?\)|scale\(1, ?1\)|scale\(1\) translate\(0px, 0px\)|translate\(0px, 0px\) scale\(1\))$/.test(t.trim());
    const styleObj = (s) => {
      const o = {};
      for (const d of s.split(";")) { const i = d.indexOf(":"); if (i < 0) continue; const k = d.slice(0, i).trim(), v = d.slice(i + 1).trim(); if (!k || k.startsWith("-")) continue; o[k] = v; }
      if (o.transform && (identity(o.transform) || isLoop(o.transform))) delete o.transform;
      if (o.opacity === "1") delete o.opacity;
      if (o["font-family"]) delete o["font-family"];
      if (o["letter-spacing"] === "normal") delete o["letter-spacing"];
      return o;
    };
    const esc = (t) => JSON.stringify(t);
    const attrs = (el) => {
      const out = [];
      for (const a of el.attributes) {
        let n = a.name, v = a.value;
        if (n === "xmlns" || n.startsWith("xmlns:")) continue;
        if (n === "id") { if (!referenced.has(v)) continue; usesId = true; out.push(`id={\`\${id}-${slug(v)}\`}`); continue; }
        if (n === "style") {
          const o = styleObj(v); const keys = Object.keys(o); if (!keys.length) continue;
          out.push(`style={{ ${keys.map(k => `${camel(k)}: ${esc(token(o[k]))}`).join(", ")} }}`); continue;
        }
        if (n === "class") {
          v = v.split(/\s+/).filter(Boolean).map(c => CLASS[c] ?? c).filter(Boolean).filter(c => /^text-gray-/.test(c)).join(" ");
          if (!v) continue;
        }
        if (n === "stroke-dashoffset" && !el.hasAttribute("pathLength")) continue; // loop phase
        if (n === "opacity" && v === "1") continue;
        if (n.endsWith("href") && /^#/.test(v)) { usesId = true; out.push(`${camel(n)}={\`#\${id}-${slug(v.slice(1))}\`}`); continue; }
        v = token(v);
        if (/url\(#/.test(v)) { out.push(`${camel(n)}={\`${idRef(v)}\`}`); continue; }
        if (n === "pathLength") { out.push(`pathLength={${v}}`); continue; }
        out.push(`${camel(n)}=${esc(v)}`);
      }
      return out.length ? " " + out.join(" ") : "";
    };
    const walk = (node) => {
      if (node.nodeType === 3) { const t = node.textContent; return t.trim() ? `{${esc(t)}}` : ""; }
      if (node.nodeType !== 1) return "";
      const tag = node.namespaceURI === "http://www.w3.org/2000/svg" ? node.tagName : node.tagName.toLowerCase();
      if (tag === "title" || tag === "desc") return "";
      if (tag === "a") { for (const n of ["href", "tabindex", "aria-label", "style", "target", "rel"]) node.removeAttribute(n); }
      if (tag === "image") {
        const a = ["x", "y", "width", "height"].filter(k => node.hasAttribute(k)).map(k => `${k}=${esc(node.getAttribute(k))}`).join(" ");
        return `<rect ${a} fill="var(--ds-gray-300)" data-placeholder="image" />`;
      }
      if (tag === "foreignObject") {
        const x = +node.getAttribute("x"), y = +node.getAttribute("y"), h = +node.getAttribute("height");
        const div = node.firstElementChild; const st = div?.getAttribute("style") || "";
        const fs = +(st.match(/font-size:(\d+)/) || [0, 13])[1], lh = +(st.match(/line-height:(\d+)/) || [0, fs * 1.5])[1];
        const spans = [...node.querySelectorAll("span")].filter(s => !/opacity:0/.test(s.getAttribute("style") || "") && !s.querySelector("span"));
        const parts = spans.length ? spans : [div];
        const lines = []; let cur = [];
        for (const s of parts) { const w = (s.getAttribute("style") || "").match(/font-weight:(\d+)/)?.[1]; const c = /x-fg-secondary/.test(s.getAttribute("style") || "") ? "var(--ds-gray-900)" : null; const txt = s.textContent.replace(/ /g, " "); const segs = txt.split("\n"); segs.forEach((t, i) => { if (i > 0) { lines.push(cur); cur = []; } if (t.trim()) cur.push({ t, w, c }); }); }
        lines.push(cur);
        const n = lines.length; const y0 = y + (h - lh * n) / 2 + lh * 0.72;
        const body = lines.map((l, i) => `<tspan x=${esc(String(x))} y=${esc(String(+(y0 + i * lh).toFixed(2)))}>${l.map(p => (p.w || p.c) ? `<tspan${p.w ? ` fontWeight=${esc(p.w)}` : ""}${p.c ? ` fill=${esc(p.c)}` : ""}>${esc(p.t) ? `{${esc(p.t)}}` : ""}</tspan>` : `{${esc(p.t)}}`).join("")}</tspan>`).join("");
        return `<text fill="currentColor" fontSize=${esc(String(fs))}${/font-weight:5/.test(st) ? ' fontWeight="500"' : ""} data-part="label">${body}</text>`;
      }
      const kids = [...node.childNodes].map(walk).join("");
      const t = tag === "a" ? "g" : tag;
      return kids ? `<${t}${attrs(node)}>${kids}</${t}>` : `<${t}${attrs(node)} />`;
    };
    const svg = document.querySelector("#root > svg");
    // root: keep viewBox + fill + preserveAspectRatio only
    const keep = ["viewBox", "fill", "preserveAspectRatio", "shape-rendering"];
    const rootAttrs = [...svg.attributes].filter(a => keep.includes(a.name)).map(a => `${camel(a.name)}=${esc(a.value)}`).join(" ");
    const inner = [...svg.childNodes].map(walk).join("");
    return { jsx: `<svg ${rootAttrs} aria-hidden="true" {...props}>${inner}</svg>`, usesId };
  }, [TOKENS, CLASS]);
};

fs.mkdirSync(OUT, { recursive: true });
const index = [];
for (const m of manifest) {
  const fns = [];
  let anyId = false;
  for (const v of m.variants) {
    const html = v.key.endsWith(".svg") ? cardart[v.key] : catalogue[v.key].outer;
    if (!html) throw new Error("missing " + v.key);
    const { jsx, usesId } = await toJsx(html);
    anyId ||= usesId;
    fns.push({ variant: v.variant, jsx, usesId });
  }
  const single = fns.length === 1;
  const vtype = single ? "" : fns.map(f => JSON.stringify(f.variant)).join(" | ");
  const body = single
    ? `export function ${m.name}(props: ArtProps) {\n${fns[0].usesId ? "  const id = React.useId()\n" : ""}  return ${fns[0].jsx}\n}`
    : `export function ${m.name}({ variant = ${JSON.stringify(fns[0].variant)}, ...props }: ArtProps & { variant?: ${vtype} }) {\n${anyId ? "  const id = React.useId()\n" : ""}${fns.map((f, i) => `  ${i ? "" : ""}if (variant === ${JSON.stringify(f.variant)}) return ${f.jsx}\n`).join("")}  return null\n}`;
  const src = `${anyId ? 'import * as React from "react"\n\n' : ""}import type { ArtProps } from "../props"\n\n// ${m.note || `Ported from business.x.com — ${m.source}.`}\n${body}\n`;
  fs.mkdirSync(`${OUT}/${m.file}`.replace(/\/[^/]+$/, ""), { recursive: true });
  fs.writeFileSync(`${OUT}/${m.file}.tsx`, src);
  index.push({ ...m, variants: m.variants.map((v, i) => ({ variant: v.variant, viewBox: v.key.endsWith(".svg") ? "0 0 398 245" : catalogue[v.key].viewBox })) });
}
fs.writeFileSync("index.json", JSON.stringify(index, null, 1));
const label = (n) => n.replace(/^Blog/, "").replace(/([a-z])([A-Z])/g, "$1 $2").replace(/^(.)(.*)$/, (m, a, b) => a + b.toLowerCase());
const cats = { banners: "Banners", sections: "Sections", marks: "Marks", cards: "Cards", mocks: "Mocks", blog: "Blog cards" };
const ts = `${index.map(m => `import { ${m.name} } from "./${m.file}"`).join("\n")}

export type ArtCategory = keyof typeof categories

export const categories = {
  banners: { label: "Banners", note: "Page heroes. Wide is the 1118×462 desktop crop; narrow the 404×242 phone crop, its own drawing." },
  sections: { label: "Sections", note: "Backdrops for a section: the specialist form, the closing CTA, the footer." },
  marks: { label: "Marks", note: "84-unit feature icons on a -6 -6 84 84 canvas; 0.5 strokes." },
  cards: { label: "Cards", note: "Illustrations that sit above a card's title." },
  mocks: { label: "Mocks", note: "Product mocks drawn as vectors; photos became grey placeholders." },
  blog: { label: "Blog cards", note: "The 11 patterns the blog rotates behind its cards, 398×245." },
} as const

export type ArtEntry = {
  name: string
  label: string
  category: ArtCategory
  source: string
  variants: { variant: string; viewBox: string }[]
  Component: (props: import("./props").ArtProps & { variant?: never }) => React.ReactNode
}

export const art = [
${index.map(m => `  {
    name: ${JSON.stringify(m.name)},
    label: ${JSON.stringify(label(m.name))},
    category: ${JSON.stringify(m.category)},
    source: ${JSON.stringify(m.source)},
    variants: ${JSON.stringify(m.variants)},
    Component: ${m.name},
  },`).join("\n")}
] satisfies ArtEntry[]

export {
${index.map(m => `  ${m.name},`).join("\n")}
}
`;
fs.writeFileSync(`${OUT}/index.ts`, ts);
await browser.close();
console.log("generated", manifest.length);
