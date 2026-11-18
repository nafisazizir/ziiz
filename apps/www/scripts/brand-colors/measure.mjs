// Measure the colours a site actually paints. Run from apps/www with the
// global Playwright install:
//   NPMROOT=$(npm root -g) node scripts/brand-colors/measure.mjs <site> <url...>
// Writes <work>/<site>/raw.json (work defaults to .brand-colors) and a
// screenshot per page and scheme. Then report.mjs. See README.md.
import { writeFileSync, mkdirSync } from "node:fs"

const { chromium } = await import(
  `${process.env.NPMROOT ?? "/usr/local/lib/node_modules"}/playwright/index.mjs`
)
const WORK = process.env.BRAND_COLORS_WORK ?? ".brand-colors"
const [, , site, ...urls] = process.argv
const OUT = `${WORK}/${site}`
mkdirSync(OUT, { recursive: true })

const browser = await chromium.launch()
const results = []

async function dismissBanners(page) {
  for (const name of [/accept all/i, /^accept$/i, /got it/i, /agree/i]) {
    const b = page.getByRole("button", { name }).first()
    if (await b.isVisible().catch(() => false)) {
      await b.click({ timeout: 2000 }).catch(() => {})
      await page.waitForTimeout(400)
      return
    }
  }
}

async function autoScroll(page) {
  await page.evaluate(async () => {
    const h = () => document.documentElement.scrollHeight
    for (let y = 0; y < h(); y += 700) {
      window.scrollTo(0, y)
      await new Promise((r) => setTimeout(r, 120))
    }
    window.scrollTo(0, 0)
  })
  await page.waitForTimeout(600)
}

// Runs in the page. Returns raw samples; aggregation happens in node.
function collect() {
  const c = document.createElement("canvas")
  c.width = c.height = 1
  const x = c.getContext("2d", { willReadFrequently: true })
  const cache = new Map()
  const rgba = (col) => {
    if (cache.has(col)) return cache.get(col)
    x.clearRect(0, 0, 1, 1)
    x.fillStyle = "rgba(0,0,0,0)"
    x.fillStyle = col
    x.fillRect(0, 0, 1, 1)
    const d = x.getImageData(0, 0, 1, 1).data
    const v = [d[0], d[1], d[2], d[3] / 255]
    cache.set(col, v)
    return v
  }
  const over = (top, under) => {
    const a = top[3]
    return [0, 1, 2].map((i) => top[i] * a + under[i] * (1 - a)).concat(1)
  }
  const hex = (v) =>
    "#" +
    v
      .slice(0, 3)
      .map((n) => Math.round(n).toString(16).padStart(2, "0"))
      .join("")
      .toUpperCase()

  const rootBg = (() => {
    const b = rgba(getComputedStyle(document.body).backgroundColor)
    const h = rgba(getComputedStyle(document.documentElement).backgroundColor)
    return b[3] > 0
      ? over(b, h[3] > 0 ? h : [255, 255, 255, 1])
      : h[3] > 0
        ? h
        : [255, 255, 255, 1]
  })()

  // Effective background behind an element: composite its ancestors' fills.
  const bgMemo = new Map()
  const effectiveBg = (el) => {
    if (!el || el === document.documentElement) return rootBg
    if (bgMemo.has(el)) return bgMemo.get(el)
    const own = rgba(getComputedStyle(el).backgroundColor)
    const under = effectiveBg(el.parentElement)
    const v = own[3] > 0 ? over(own, under) : under
    bgMemo.set(el, v)
    return v
  }

  const roleOf = (el) => {
    const t = el.tagName.toLowerCase()
    if (t === "button" || el.getAttribute("role") === "button") return "button"
    if (t === "a") {
      const s = getComputedStyle(el)
      const filled = rgba(s.backgroundColor)[3] > 0.05
      const bordered =
        parseFloat(s.borderTopWidth) > 0 && rgba(s.borderTopColor)[3] > 0.05
      return filled || bordered ? "button" : "link"
    }
    if (/^h[1-6]$/.test(t)) return "heading"
    if (t === "input" || t === "textarea" || t === "select") return "field"
    if (el.closest("a")) return "link"
    if (el.closest("button,[role=button]")) return "button"
    return "other"
  }
  const desc = (el) =>
    el.tagName.toLowerCase() +
    (typeof el.className === "string" && el.className
      ? "." + el.className.trim().split(/\s+/).slice(0, 2).join(".")
      : "")

  const surfaces = []
  const texts = []
  const borders = []
  const controls = []
  // Illustration colour: SVG shape fills and strokes, by drawn area.
  const fills = []
  for (const el of document.querySelectorAll(
    "svg path, svg rect, svg circle, svg polygon, svg ellipse"
  )) {
    const s = getComputedStyle(el)
    if (s.display === "none" || s.visibility === "hidden") continue
    const r = el.getBoundingClientRect()
    if (r.width * r.height < 4) continue
    for (const prop of ["fill", "stroke"]) {
      const v = s[prop]
      if (!v || v === "none" || v.startsWith("url")) continue
      const c = rgba(v)
      if (c[3] < 0.08) continue
      fills.push({ hex: hex(c), area: Math.round(r.width * r.height), prop })
    }
  }
  const hidden = (el, s) =>
    s.visibility === "hidden" ||
    s.display === "none" ||
    parseFloat(s.opacity) === 0

  for (const el of document.body.querySelectorAll("*")) {
    const s = getComputedStyle(el)
    if (hidden(el, s)) continue
    const r = el.getBoundingClientRect()
    if (r.width < 1 || r.height < 1) continue
    if (el.closest("svg") && el.tagName.toLowerCase() !== "svg") continue
    const role = roleOf(el)
    const under = effectiveBg(el.parentElement)
    const own = rgba(s.backgroundColor)
    const bg = effectiveBg(el)

    if (own[3] > 0.02) {
      surfaces.push({
        hex: hex(bg),
        raw:
          own[3] < 1
            ? hex(own) +
              Math.round(own[3] * 255)
                .toString(16)
                .padStart(2, "0")
                .toUpperCase()
            : null,
        under: hex(under),
        area: Math.round(r.width * r.height),
        role,
        el: desc(el),
        radius: s.borderTopLeftRadius,
      })
    }

    const bw = parseFloat(s.borderTopWidth) || parseFloat(s.borderBottomWidth)
    const bc = rgba(
      parseFloat(s.borderTopWidth) ? s.borderTopColor : s.borderBottomColor
    )
    if (bw > 0 && bc[3] > 0.02 && s.borderTopStyle !== "none") {
      borders.push({
        hex: hex(over(bc, bg)),
        alpha: +bc[3].toFixed(3),
        on: hex(bg),
        width: bw,
        role,
        el: desc(el),
      })
    }
    const ring = s.boxShadow && s.boxShadow !== "none" ? s.boxShadow : null

    // Direct text only, so a parent does not count its children's words.
    let chars = 0
    for (const n of el.childNodes)
      if (n.nodeType === 3) chars += n.textContent.trim().length
    if (chars > 0) {
      const col = rgba(s.color)
      texts.push({
        hex: hex(over(col, bg)),
        alpha: +col[3].toFixed(3),
        on: hex(bg),
        chars,
        size: s.fontSize,
        weight: s.fontWeight,
        role,
        el: desc(el),
        sample: el.textContent.trim().slice(0, 40),
      })
    }

    const tag = el.tagName.toLowerCase()
    if (
      (tag === "button" ||
        tag === "a" ||
        el.getAttribute("role") === "button") &&
      role === "button" &&
      r.height >= 20 &&
      r.height <= 72 &&
      el.textContent.trim().length > 0
    ) {
      controls.push({
        id: controls.length,
        text: el.textContent.trim().slice(0, 30),
        bg: own[3] > 0.02 ? hex(bg) : null,
        bgAlpha: +own[3].toFixed(3),
        fg: hex(over(rgba(s.color), bg)),
        border: bw > 0 && bc[3] > 0.02 ? hex(over(bc, bg)) : null,
        on: hex(under),
        radius: s.borderTopLeftRadius,
        height: Math.round(r.height),
        ring,
      })
      el.setAttribute("data-measure-id", String(controls.length - 1))
    }
  }

  return {
    rootBg: hex(rootBg),
    htmlAttrs: [...document.documentElement.attributes].map((a) =>
      `${a.name}=${a.value}`.slice(0, 80)
    ),
    surfaces,
    texts,
    borders,
    controls,
    fills,
  }
}

function readControl(id) {
  const el = document.querySelector(`[data-measure-id="${id}"]`)
  if (!el) return null
  const c = document.createElement("canvas")
  c.width = c.height = 1
  const x = c.getContext("2d", { willReadFrequently: true })
  const rgba = (col) => {
    x.clearRect(0, 0, 1, 1)
    x.fillStyle = "rgba(0,0,0,0)"
    x.fillStyle = col
    x.fillRect(0, 0, 1, 1)
    const d = x.getImageData(0, 0, 1, 1).data
    return [d[0], d[1], d[2], d[3] / 255]
  }
  const over = (t, u) =>
    [0, 1, 2].map((i) => t[i] * t[3] + u[i] * (1 - t[3])).concat(1)
  const hex = (v) =>
    "#" +
    v
      .slice(0, 3)
      .map((n) => Math.round(n).toString(16).padStart(2, "0"))
      .join("")
      .toUpperCase()
  let under = [255, 255, 255, 1]
  const chain = []
  for (let p = el.parentElement; p; p = p.parentElement) chain.unshift(p)
  for (const p of chain) {
    const b = rgba(getComputedStyle(p).backgroundColor)
    if (b[3] > 0) under = over(b, under)
  }
  const s = getComputedStyle(el)
  const own = rgba(s.backgroundColor)
  const bg = own[3] > 0 ? over(own, under) : under
  return {
    bg: own[3] > 0.02 ? hex(bg) : null,
    fg: hex(over(rgba(s.color), bg)),
    border:
      parseFloat(s.borderTopWidth) > 0
        ? hex(over(rgba(s.borderTopColor), bg))
        : null,
  }
}

for (const scheme of ["light", "dark"]) {
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    colorScheme: scheme,
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130 Safari/537.36",
  })
  for (const url of urls) {
    const page = await ctx.newPage()
    const slug = new URL(url).pathname.replace(/\W+/g, "_") || "_"
    try {
      await page
        .goto(url, { waitUntil: "networkidle", timeout: 45000 })
        .catch(() => {})
      await page.waitForTimeout(1500)
      await dismissBanners(page)
      await autoScroll(page)
      await page.screenshot({ path: `${OUT}/${scheme}${slug}.png` })
      const data = await page.evaluate(collect)
      // Hover each distinct-looking control once.
      const seen = new Set()
      for (const ctl of data.controls) {
        const key = `${ctl.bg}|${ctl.fg}|${ctl.border}`
        if (seen.has(key) || seen.size >= 14) continue
        seen.add(key)
        const loc = page.locator(`[data-measure-id="${ctl.id}"]`)
        try {
          await loc.scrollIntoViewIfNeeded({ timeout: 1500 })
          await loc.hover({ timeout: 1500 })
          await page.waitForTimeout(450)
          ctl.hover = await page.evaluate(readControl, ctl.id)
          await page.mouse.move(2, 2)
        } catch {}
      }
      results.push({ url, scheme, ...data })
      console.log(
        `${scheme} ${url} surfaces ${data.surfaces.length} texts ${data.texts.length} controls ${data.controls.length} root ${data.rootBg}`
      )
    } catch (e) {
      console.log(`${scheme} ${url} FAILED ${e.message.split("\n")[0]}`)
    }
    await page.close()
  }
  await ctx.close()
}
await browser.close()
writeFileSync(`${OUT}/raw.json`, JSON.stringify(results))
console.log("done", site)
