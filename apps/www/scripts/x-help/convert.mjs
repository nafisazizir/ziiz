// Part of the help.x.com / money.x.com article pipeline. Run from apps/www
// with a work directory (default .x-help) and the global Playwright install:
//   NPMROOT=$(npm root -g) node scripts/x-help/<step>.mjs
// Steps: scrape → convert. See scripts/x-help/README.md.
//
// Turns <work>/raw into the data the clone renders: one JSON document per
// help article and money document (components/business-x/doc.ts is the
// shape), the category index and the search index.
import fs from "node:fs"
import path from "node:path"

const { chromium } = await import(
  `${process.env.NPMROOT ?? "/usr/local/lib/node_modules"}/playwright/index.mjs`
)
const APP = process.cwd()
const HELP = path.join(APP, "components/help-x/data")
const MONEY = path.join(APP, "components/money-x/data/docs")
process.chdir(process.env.X_HELP_WORK ?? ".x-help")

const CATEGORIES = {
  "using-x": "Using >x<",
  "managing-your-account": "Managing your Account",
  "safety-and-security": "Safety and Security",
  "rules-and-policies": "Rules and Policies",
  "business-and-advertising": "Business and Advertising",
  resources: "Resources",
}
// help.x.com redirects this one to money.x.com's FAQ.
const MOVED = { "using-x/x-money-faqs": "/money-x/faq" }

const files = []
const walk = (dir) => {
  for (const name of fs.readdirSync(dir)) {
    const file = path.join(dir, name)
    if (fs.statSync(file).isDirectory()) walk(file)
    else if (file.endsWith(".json")) files.push(file)
  }
}
walk("raw/help")
const helpPaths = files.map((file) => file.slice("raw/help/".length, -5))
const moneySlugs = fs.readdirSync("raw/money").map((name) => name.slice(0, -5))
const known = {
  help: [
    ...helpPaths.filter((p) => !MOVED[p]),
    ...Object.keys(CATEGORIES).filter((slug) => slug !== "resources"),
  ],
  money: moneySlugs,
}

// Runs in the page. Returns { title, description, crumbs, toc, blocks, warnings }.
const CONVERT = ({ site, tabs, accordions, known, fallbackTitle }) => {
  const moved = { "using-x/x-money-faqs": "/money-x/faq" }
  const warnings = []
  const helpSet = new Set(known.help),
    moneySet = new Set(known.money)
  const link = (href) => {
    if (!href) return "#"
    if (href.startsWith("#")) return href
    let u
    try {
      u = new URL(
        href,
        site === "help" ? "https://help.x.com/en/" : "https://money.x.com/en/"
      )
    } catch {
      return href
    }
    const hash = u.hash || ""
    const p = u.pathname
      .replace(/\.html$/, "")
      .replace(/\/$/, "")
      .replace(/^\/(en|en-us)(?=\/|$)/, "")
      .replace(/^\//, "")
    if (
      u.host === "help.x.com" ||
      u.host === "help.twitter.com" ||
      u.host === "support.x.com"
    ) {
      if (p === "") return "/help-x" + hash
      if (moved[p]) return moved[p] + hash
      if (helpSet.has(p)) return `/help-x/${p}${hash}`
      if (p === "forms") return "/help-x/forms"
      return `https://help.x.com/en/${p}${u.search}${hash}`
    }
    if (u.host === "money.x.com" || u.host === "money-support.x.com") {
      const s = p.replace(/^i\//, "")
      if (s === "") return "/money-x" + hash
      if (s === "legal") return "/money-x/legal"
      if (moneySet.has(s)) return `/money-x/${s}${hash}`
      return u.href
    }
    return u.href
  }
  const isX = (el) => el.tagName === "SPAN" && el.textContent === ">x<"
  const push = (out, r) => {
    if (typeof r === "string") {
      if (!r) return
      if (typeof out[out.length - 1] === "string") out[out.length - 1] += r
      else out.push(r)
    } else out.push(r)
  }
  const inline = (node, out = []) => {
    for (const n of node.childNodes) {
      if (n.nodeType === 3) {
        push(out, n.textContent.replace(/[ \t\r\n ]+/g, " "))
        continue
      }
      if (n.nodeType !== 1) continue
      const tag = n.tagName.toLowerCase()
      if (tag === "br") push(out, "\n")
      else if (isX(n)) push(out, ">x<")
      else if (tag === "strong" || tag === "b") {
        const r = inline(n)
        if (r.length) push(out, { b: r })
      } else if (tag === "em" || tag === "i") {
        const r = inline(n)
        if (r.length) push(out, { i: r })
      } else if (tag === "a") {
        const r = inline(n)
        if (r.length) push(out, { a: link(n.getAttribute("href")), r })
      } else if (tag === "code") push(out, { code: n.textContent })
      else if (tag === "sup") {
        const r = inline(n)
        if (r.length) push(out, { sup: r })
      } else if (tag !== "svg" && tag !== "img" && tag !== "input")
        inline(n, out)
    }
    return out
  }
  const trim = (runs) => {
    if (typeof runs[0] === "string") runs[0] = runs[0].replace(/^\s+/, "")
    const l = runs.length - 1
    if (typeof runs[l] === "string") runs[l] = runs[l].replace(/\s+$/, "")
    return runs.filter((r) => r !== "")
  }
  const runsOf = (el) => trim(inline(el))
  const BLOCK = new Set([
    "P",
    "UL",
    "OL",
    "DIV",
    "FIGURE",
    "TABLE",
    "H2",
    "H3",
    "H4",
    "H5",
    "ASIDE",
    "SECTION",
    "PRE",
    "BLOCKQUOTE",
  ])
  const mixed = (el) => {
    // children may mix inline nodes and block elements (li, td)
    const blocks = []
    let buf = document.createElement("span")
    const flush = () => {
      const r = runsOf(buf)
      if (r.length) blocks.push({ type: "p", runs: r })
      buf = document.createElement("span")
    }
    for (const n of [...el.childNodes]) {
      if (n.nodeType === 1 && BLOCK.has(n.tagName)) {
        flush()
        blocks.push(...block(n))
      } else buf.appendChild(n.cloneNode(true))
    }
    flush()
    return blocks
  }
  const children = (el) => [...el.children].flatMap(block)
  const fragment = (html) => {
    const d = document.createElement("div")
    d.innerHTML = html
    return d
  }
  const table = (t) => ({
    type: "table",
    rows: [...t.querySelectorAll("tr")].map((tr) =>
      [...tr.children].map((c) => {
        const cell = { blocks: mixed(c) }
        if (c.tagName === "TH") cell.header = true
        if (c.colSpan > 1) cell.colSpan = c.colSpan
        if (c.rowSpan > 1) cell.rowSpan = c.rowSpan
        return cell
      })
    ),
  })
  let accIndex = 0
  const block = (el) => {
    const tag = el.tagName.toLowerCase()
    const cls = el.getAttribute("class") || ""
    const has = (c) => cls.split(/\s+/).includes(c)
    if (tag === "p") {
      const runs = runsOf(el)
      if (!runs.length) return []
      return [
        has("text-h4-help")
          ? { type: "p", lead: true, runs }
          : { type: "p", runs },
      ]
    }
    if (/^h[2-6]$/.test(tag)) {
      const runs = runsOf(el)
      if (!runs.length) return []
      const b = { type: "heading", level: Math.min(4, +tag[1]), runs }
      if (el.id) b.id = el.id
      return [b]
    }
    if (tag === "ul" && has("accordion-list")) {
      const src = accordions[accIndex++] || []
      return [
        {
          type: "accordion",
          items: src.map((it) => ({
            id: it.id || undefined,
            q: runsOf(fragment(it.qHtml)),
            blocks: children(fragment(it.html)),
          })),
        },
      ]
    }
    if (tag === "ul" || tag === "ol") {
      const b = {
        type: "list",
        ordered: tag === "ol",
        items: [...el.children]
          .filter((c) => c.tagName === "LI")
          .map(mixed)
          .filter((i) => i.length),
      }
      if (tag === "ol" && el.start > 1) b.start = el.start
      return b.items.length ? [b] : []
    }
    if (tag === "aside") {
      const t = el.querySelector("p.text-h4-help")
      const body = el.querySelector(".text-body-help-article")
      const b = { type: "note", blocks: body ? children(body) : [] }
      if (t) b.title = runsOf(t)
      return [b]
    }
    if (tag === "figure" && has("help-code-snippet")) {
      const code = el.querySelector("code")
      const lines = [...code.querySelectorAll(".sh__line")].map((l) =>
        l.textContent.replace(/\n$/, "")
      )
      return [
        {
          type: "code",
          language: code.getAttribute("data-language") || undefined,
          code: lines.length ? lines.join("\n") : code.textContent,
        },
      ]
    }
    if (tag === "figure") {
      const cap = el.querySelector("figcaption")
      const v = el.querySelector("video")
      if (v)
        return [
          {
            type: "video",
            label: (v.getAttribute("aria-label") || "").trim() || undefined,
          },
        ]
      const img = el.querySelector("img")
      if (img) {
        const b = {
          type: "image",
          w: +img.getAttribute("width") || 16,
          h: +img.getAttribute("height") || 9,
          alt: img.getAttribute("alt") || "",
        }
        const m = (img.getAttribute("style") || "").match(
          /(?:^|;)\s*height:\s*(\d+)px/
        )
        if (m) b.maxHeight = +m[1]
        if (cap && runsOf(cap).length) b.caption = runsOf(cap)
        return [b]
      }
      const t = el.querySelector("table")
      if (t) return [table(t)]
      warnings.push("figure? " + el.outerHTML.slice(0, 200))
      return []
    }
    if (tag === "table") return [table(el)]
    if (tag === "div" && (has("help-data-table") || has("help-table"))) {
      const t = el.querySelector("table")
      const b = table(t)
      if (el.id) b.id = el.id
      return [b]
    }
    if (tag === "div" && has("help-cta-row")) {
      return [
        {
          type: "ctas",
          items: [...el.querySelectorAll("a")].map((a) => ({
            label: a.textContent.trim(),
            href: link(a.getAttribute("href")),
            primary:
              /bg-button-primary\b/.test(a.getAttribute("class") || "") ||
              undefined,
          })),
        },
      ]
    }
    if (tag === "div" && el.querySelector(":scope .react-tweet-theme"))
      return [{ type: "post" }]
    if (tag === "div" && has("help-card-list")) {
      return [
        {
          type: "cards",
          id: el.id || undefined,
          items: [...el.querySelectorAll("li")].map((li) => {
            const spans = [...li.querySelectorAll("span > span")]
            const a = li.querySelector("a")
            const it = { title: runsOf(spans[0] || li) }
            if (spans[1]) it.body = runsOf(spans[1])
            if (a) it.href = link(a.getAttribute("href"))
            return it
          }),
        },
      ]
    }
    if (tag === "div" && has("rounded-2xl")) {
      return [
        {
          type: "follow",
          items: [...el.querySelectorAll("li")].map((li) => {
            const s = li.querySelectorAll("span > span")
            return {
              name: s[0]?.textContent.trim(),
              handle: s[1]?.textContent.trim(),
              href: li.querySelector("a")?.getAttribute("href"),
            }
          }),
        },
      ]
    }
    if (tag === "div" && has("bg-bg-secondary")) {
      const title = el.querySelector("span.text-h4-help")
      const key = el.getAttribute("data-tabs-key")
      const b = { type: "tabs", title: title ? runsOf(title) : [], tabs: [] }
      if (el.id) b.id = el.id
      if (key) {
        const t = tabs.find((t) => t.key === key)
        b.tabs = t.labels.map((label, i) => ({
          label,
          blocks: children(fragment(t.panels[i])),
        }))
      } else {
        const panel = el.querySelector('[role="tabpanel"]') || el.children[1]
        b.tabs = [{ label: "", blocks: panel ? children(panel) : [] }]
        if (!panel) warnings.push("panel? " + el.outerHTML.slice(0, 200))
      }
      return [b]
    }
    if (tag === "section" || tag === "div" || tag === "blockquote") {
      if (tag === "div" && cls && !/^(flex|space-y|w-full)/.test(cls))
        warnings.push("div." + cls.slice(0, 80))
      return [...el.childNodes].some(
        (n) => n.nodeType === 3 && n.textContent.trim()
      )
        ? mixed(el)
        : children(el)
    }
    if (tag === "pre") return [{ type: "code", code: el.textContent }]
    // Inline content standing where a block should: a paragraph of its own.
    if (["span", "a", "strong", "b", "em", "i"].includes(tag)) {
      const holder = document.createElement("span")
      holder.appendChild(el.cloneNode(true))
      const runs = runsOf(holder)
      return runs.length ? [{ type: "p", runs }] : []
    }
    warnings.push("unknown <" + tag + "." + cls.slice(0, 60) + ">")
    return []
  }
  const body = document.querySelector(".help-article-body, .legal-rich-text")
  if (!body) {
    // The older help.x.com design: headline, rich-text and anchor components in page order.
    const els = [
      ...document.querySelectorAll(
        ".b01-headline :is(h1,h2,h3), .b02-v2, .b09[id]"
      ),
    ]
    const title = els.find((e) => e.tagName === "H1")
    const blocks = []
    let pendingId
    for (const el of els) {
      if (el === title) continue
      if (el.classList.contains("b09")) {
        pendingId = el.id
        continue
      }
      const bs = el.classList.contains("b02-v2")
        ? children(el)
        : [{ type: "heading", level: 2, runs: runsOf(el) }]
      if (pendingId && bs[0]?.type === "heading") {
        bs[0].id = pendingId
        pendingId = undefined
      }
      blocks.push(...bs)
    }
    const list = document.querySelector(".u11__breadcrumbs-list")
    const crumbs = list
      ? [...list.querySelectorAll("li")].map((li) => {
          const a = li.querySelector("a")
          return a
            ? { title: runsOf(a).join(""), href: link(a.getAttribute("href")) }
            : { title: runsOf(li).join("") }
        })
      : []
    const toc = blocks
      .filter((b) => b.type === "heading" && b.id && b.level === 2)
      .map((b) => ({
        id: b.id,
        title:
          b.runs.map((r) => (typeof r === "string" ? r : "")).join("") ||
          document.getElementById(b.id)?.textContent ||
          b.id,
        depth: 0,
      }))
    return {
      title: title ? runsOf(title).join("") : fallbackTitle,
      description: "",
      crumbs,
      toc,
      blocks,
      warnings: warnings.filter((w) => !w.startsWith("div.")),
    }
  }
  const h1 = document.querySelector("h1")
  const header = document.querySelector("header")
  const desc = header?.querySelector("h1 + p") || header?.querySelector("p")
  const crumbs = [
    ...document.querySelectorAll('nav[aria-label="Breadcrumb"] li'),
  ].map((li) => {
    const a = li.querySelector("a")
    const t = a || li.querySelector("span")
    return a
      ? { title: runsOf(a).join(""), href: link(a.getAttribute("href")) }
      : { title: runsOf(t).join("") }
  })
  const tocNav = document.querySelector(
    'aside nav[aria-label="Table of contents"]'
  )
  const toc = tocNav
    ? [...tocNav.querySelectorAll("a")].map((a) => ({
        id: a.getAttribute("href").slice(1),
        title: runsOf(a).join(""),
        depth: /\bpl-/.test(a.className) ? 1 : 0,
      }))
    : []
  return {
    title: runsOf(h1).join(""),
    description: desc ? runsOf(desc).join("") : "",
    crumbs,
    toc,
    blocks: children(body),
    warnings,
  }
}

const browser = await chromium.launch()
const page = await browser.newPage()
const warnings = {}

async function convert(site, file, out, extra) {
  const raw = JSON.parse(fs.readFileSync(file, "utf8"))
  await page.setContent(`<main>${raw.html}</main>`)
  const doc = await page.evaluate(CONVERT, {
    site,
    tabs: raw.tabs ?? [],
    accordions: raw.accordions ?? [],
    known,
    fallbackTitle: raw.title.split(" | ")[0],
  })
  if (doc.warnings.length) warnings[raw.path] = doc.warnings
  delete doc.warnings
  fs.mkdirSync(path.dirname(out), { recursive: true })
  fs.writeFileSync(out, JSON.stringify({ ...extra, ...doc }))
  return doc
}

// Articles. A nested slug (premium-business/ads-terms) is one file, its
// segments joined with "--".
fs.rmSync(path.join(HELP, "articles"), { recursive: true, force: true })
const search = []
for (const p of helpPaths) {
  if (MOVED[p]) continue
  const [category, ...slug] = p.split("/")
  const doc = await convert(
    "help",
    `raw/help/${p}.json`,
    path.join(HELP, "articles", category, `${slug.join("--")}.json`),
    { category, slug: slug.join("/") }
  )
  search.push({
    title: doc.title,
    href: `/help-x/${p}`,
    category: CATEGORIES[category],
  })
}
fs.writeFileSync(path.join(HELP, "search.json"), JSON.stringify(search))

// money.x.com's documents.
fs.rmSync(MONEY, { recursive: true, force: true })
for (const slug of moneySlugs) {
  await convert(
    "money",
    `raw/money/${slug}.json`,
    path.join(MONEY, `${slug}.json`),
    {
      slug,
    }
  )
}

// The category pages: titled sections of article links.
const articlePaths = new Set(helpPaths)
const categories = []
for (const slug of Object.keys(CATEGORIES)) {
  const file = `raw/categories/${slug}.html`
  if (!fs.existsSync(file)) continue
  await page.setContent(
    fs.readFileSync(file, "utf8").replace(/<script[\s\S]*?<\/script>/g, "")
  )
  const category = await page.evaluate(() => {
    const text = (el) => el.textContent.replace(/\s+/g, " ").trim()
    const article = document.querySelector("main article")
    return {
      title: text(article.querySelector("h2")),
      sections: [...article.querySelectorAll("h3[id]")].map((heading) => {
        const copy = heading.parentElement.querySelector("p")
        return {
          id: heading.id,
          title: text(heading),
          description: copy ? text(copy) : undefined,
          items: [
            ...heading.parentElement.parentElement.querySelectorAll(
              "ol > li > a"
            ),
          ].map((a) => ({
            title: text(a.querySelector("span > span:last-child")),
            href: a.getAttribute("href"),
          })),
        }
      }),
    }
  })
  for (const section of category.sections) {
    for (const item of section.items) {
      const url = new URL(item.href, "https://help.x.com")
      const p = url.pathname.replace(/^\/en\//, "").replace(/^\/|\/$/g, "")
      if (MOVED[p]) item.href = MOVED[p]
      else if (url.host === "help.x.com" && articlePaths.has(p))
        item.href = `/help-x/${p}${url.hash}`
      else item.href = url.href
    }
  }
  categories.push({ slug, ...category })
}
fs.writeFileSync(path.join(HELP, "categories.json"), JSON.stringify(categories))

await browser.close()
console.log(
  "help articles",
  search.length,
  "money documents",
  moneySlugs.length
)
for (const [p, list] of Object.entries(warnings)) console.log("WARN", p, list)
