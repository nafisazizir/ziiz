// Part of the business.x.com art pipeline. Run from apps/www with a work
// directory (default .x-art) and the global Playwright install:
//   NPMROOT=$(npm root -g) node scripts/x-art/<step>.mjs
// Steps: capture → catalogue → generate. See scripts/x-art/README.md.
// Merge live captures → unique art catalogue + contact sheet.
const { chromium } = await import(`${process.env.NPMROOT ?? "/usr/local/lib/node_modules"}/playwright/index.mjs`);
const WORK = process.env.X_ART_WORK ?? ".x-art";
process.chdir(WORK);
import fs from "node:fs";
import crypto from "node:crypto";

const norm = (t) => t
  .replace(/_R_[a-z0-9_]+_?/g, "ID")
  .replace(/style="[^"]*"/g, "").replace(/opacity="[^"]*"/g, "").replace(/stroke-dasharray="[^"]*"/g, "").replace(/-?\d+(\.\d+)?(e-?\d+)?/g, "N")
  .replace(/id="[^"]*"/g, 'id="ID"').replace(/url\(#[^)]*\)/g, "url(#ID)")
  .replace(/transform: ?rotate\([^)]*\)/g, "transform:rotate(0)")
  .replace(/stroke-dashoffset="[^"]*"/g, "")
  .replace(/\s+/g, " ");
const vb = (o) => (o.match(/viewBox="([^"]*)"/) || [])[1];
const items = new Map();
for (const f of fs.readdirSync("live")) {
  const [page, width] = f.replace(".json", "").split("@");
  const arr = JSON.parse(fs.readFileSync(`live/${f}`));
  for (const s of arr) {
    const v = vb(s.outer); if (!v) continue;
    const [, , w, h] = v.split(/\s+/).map(Number);
    if (Math.min(w, h) < 30) continue;
    if (/data-icon=/.test(s.outer)) continue;
    const key = crypto.createHash("md5").update(v + norm(s.outer)).digest("hex").slice(0, 8);
    const visible = s.w > 0 && s.h > 0;
    if (!items.has(key)) items.set(key, { key, viewBox: v, w, h, pages: new Set(), parents: new Set(), seen: [], outer: null, outerVisible: false });
    const it = items.get(key);
    it.pages.add(page); it.parents.add(s.parentCls);
    it.seen.push({ page, width: +width, rw: Math.round(s.w), rh: Math.round(s.h) });
    // prefer the outerHTML captured while visible (animations settled)
    if (!it.outer || (visible && (!it.outerVisible || +width > it.outerWidth))) { it.outer = s.outer; it.outerVisible = visible; it.outerWidth = +width; }
  }
}
const list = [...items.values()].map(it => ({ ...it, pages: [...it.pages], parents: [...it.parents] })).sort((a, b) => (b.w * b.h) - (a.w * a.h));
fs.writeFileSync("catalogue.json", JSON.stringify(list, null, 1));
console.log("unique art:", list.length, "settled-visible:", list.filter(x => x.outerVisible).length);
for (const it of list) console.log(it.key, it.viewBox, "|", it.pages.join(","), "|", it.seen.filter(s=>s.rw).map(s=>`${s.width}:${s.rw}x${s.rh}`).slice(0,3).join(" "), "| foreignObject:", (it.outer.match(/<foreignObject/g)||[]).length, "image:", (it.outer.match(/<image/g)||[]).length);

// contact sheet
fs.mkdirSync("sheet", { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 800 }, deviceScaleFactor: 1 });
const css = `:root{--x-fg-primary:#000;--x-fg-secondary:rgba(0,0,0,.6);--x-fg-tertiary:rgba(0,0,0,.3);--x-bg-primary:#fff;--x-bg-secondary:#f2f2f2;--x-bg-tertiary:#e6e6e6;--x-fg-brand:#1d9bf0;--x-bg-inputs:#fff;--font-x-vf-variable:system-ui;--font-x-vf-display-variable:system-ui}
body{margin:0;background:#f2f2f2;font-family:system-ui} .text-fg-primary{color:#000}.text-fg-secondary{color:rgba(0,0,0,.6)}.text-fg-tertiary{color:rgba(0,0,0,.3)}.text-fg-primary\\/50{color:rgba(0,0,0,.5)}
.wrap{padding:24px} svg{display:block;max-width:1100px;max-height:600px;width:auto;height:auto;overflow:visible} .opacity-0{opacity:1!important}`;
for (const it of list) {
  const outer = it.outer.replace(/<svg([^>]*)>/, (m, a) => `<svg${a.replace(/class="[^"]*"/, "").replace(/width="[^"]*"/, "").replace(/height="[^"]*"/, "")} width="${Math.min(1100, it.w * Math.min(1100 / it.w, 600 / it.h))}">`);
  await page.setContent(`<style>${css}</style><div class="wrap">${outer}</div>`);
  await page.waitForTimeout(50);
  const el = await page.$(".wrap");
  await el.screenshot({ path: `sheet/${it.key}.png` });
}
await browser.close();

const b2 = await chromium.launch();
const p2 = await b2.newPage({ viewport: { width: 1400, height: 1000 } });
fs.mkdirSync("montage", { recursive: true });
for (let i = 0; i < list.length; i += 12) {
  const chunk = list.slice(i, i + 12);
  const html = `<style>body{margin:0;background:#fff;font:12px monospace}.g{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;padding:8px}.c{border:1px solid #ddd;padding:4px}.c img{width:100%;height:200px;object-fit:contain;background:#f2f2f2}</style><div class="g">${chunk.map(it => `<div class="c"><img src="file://${process.cwd()}/sheet/${it.key}.png"><div>${it.key} ${it.viewBox} ${it.outerVisible ? "" : "(HIDDEN)"}<br>${it.pages.slice(0,2).join(", ").slice(0,60)}</div></div>`).join("")}</div>`;
  await p2.setContent(html); await p2.waitForTimeout(200);
  await p2.screenshot({ path: `montage/${String(i / 12).padStart(2, "0")}.png`, fullPage: true });
}
await b2.close();
