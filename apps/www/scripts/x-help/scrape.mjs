// Part of the help.x.com / money.x.com article pipeline. Run from apps/www
// with a work directory (default .x-help) and the global Playwright install:
//   NPMROOT=$(npm root -g) node scripts/x-help/<step>.mjs
// Steps: scrape → convert. See scripts/x-help/README.md.
//
// Saves the settled markup of every page to <work>/raw. A page already on
// disk is skipped, so a run that Cloudflare interrupts can be resumed.
import fs from "node:fs"
import path from "node:path"

const { chromium } = await import(
  `${process.env.NPMROOT ?? "/usr/local/lib/node_modules"}/playwright/index.mjs`
)
const WORK = process.env.X_HELP_WORK ?? ".x-help"
fs.mkdirSync(WORK, { recursive: true })
process.chdir(WORK)

const CATEGORIES = [
  "using-x",
  "managing-your-account",
  "safety-and-security",
  "rules-and-policies",
  "business-and-advertising",
]
// Linked from the footer and the home page, in no category.
const EXTRA = ["resources/accessibility", "resources/glossary"]

// One browser and one context for the whole run: help.x.com sits behind a
// Cloudflare check that a second browser trips.
const browser = await chromium.launch()
const ctx = await browser.newContext({
  viewport: { width: 1512, height: 900 },
  colorScheme: "light",
  userAgent:
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0 Safari/537.36",
})

async function visit(page, url) {
  for (let attempt = 0; attempt < 5; attempt++) {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 })
    await page.waitForTimeout(2000)
    if (!(await page.title()).includes("Just a moment")) return
    await page.waitForTimeout(6000 + attempt * 8000)
  }
  throw new Error(`blocked: ${url}`)
}

// The page's main column, with every accordion answer and every device
// tab's panel captured: the site mounts only the open one.
const CAPTURE = async () => {
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
  const body = document.querySelector(".help-article-body, .legal-rich-text")
  const accordions = []
  const tabs = []
  if (body) {
    for (const list of body.querySelectorAll(".accordion-list")) {
      const items = []
      for (const li of list.children) {
        const button = li.querySelector("button")
        for (let tries = 0; tries < 6; tries++) {
          if (button.getAttribute("aria-expanded") !== "true") button.click()
          await sleep(400)
          if (li.querySelector("section")?.children.length) break
        }
        items.push({
          id: li.id,
          qHtml: button.querySelector("span").innerHTML,
          html: li.querySelector("section")?.innerHTML ?? "",
        })
      }
      accordions.push(items)
    }
    let n = 0
    for (const list of body.querySelectorAll('[role="tablist"]')) {
      const box = list.closest(".bg-bg-secondary")
      const key = `tabs-${n++}`
      box.setAttribute("data-tabs-key", key)
      const labels = []
      const panels = []
      for (const tab of list.querySelectorAll('[role="tab"]')) {
        tab.click()
        await sleep(150)
        labels.push(tab.innerText.trim())
        panels.push(box.querySelector('[role="tabpanel"]')?.innerHTML ?? "")
      }
      tabs.push({ key, labels, panels })
    }
  }
  const main = document.querySelector("main").cloneNode(true)
  main.querySelectorAll("footer, script, style").forEach((e) => e.remove())
  return {
    title: document.title,
    finalUrl: location.href,
    legacy: !body,
    html: main.innerHTML,
    tabs,
    accordions,
  }
}

async function save(page, url, file, meta) {
  if (fs.existsSync(file)) return
  await visit(page, url)
  const data = await page.evaluate(CAPTURE)
  fs.mkdirSync(path.dirname(file), { recursive: true })
  fs.writeFileSync(file, JSON.stringify({ ...meta, ...data }))
}

// 1. The category pages, which also list every article.
const page = await ctx.newPage()
const articles = new Set(EXTRA)
fs.mkdirSync("raw/categories", { recursive: true })
for (const category of CATEGORIES) {
  await visit(page, `https://help.x.com/en/${category}`)
  fs.writeFileSync(`raw/categories/${category}.html`, await page.content())
  const hrefs = await page.evaluate(() =>
    [...document.querySelectorAll("main article a[href]")].map((a) => a.href)
  )
  for (const href of hrefs) {
    const url = new URL(href)
    const parts = url.pathname
      .replace(/^\/en\//, "/")
      .split("/")
      .filter(Boolean)
    if (url.host === "help.x.com" && parts.length > 1)
      articles.add(parts.join("/"))
  }
  console.log(category, hrefs.length)
}

// 2. The articles, three tabs of the one context at a time.
const queue = [...articles]
let done = 0
async function worker() {
  const page = await ctx.newPage()
  for (let p = queue.shift(); p; p = queue.shift()) {
    try {
      await save(page, `https://help.x.com/en/${p}`, `raw/help/${p}.json`, {
        path: p,
      })
    } catch (error) {
      console.log("FAIL", p, error.message.slice(0, 100))
    }
    if (++done % 50 === 0) console.log("articles", done, "of", articles.size)
  }
  await page.close()
}
await Promise.all([worker(), worker(), worker()])

// 3. money.x.com's documents, from its sitemap: everything but the landing
// and the legal index, which the clone builds by hand.
const sitemap = await (await fetch("https://money.x.com/sitemap.xml")).text()
for (const [, url] of sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)) {
  if (/\/en$|\/i\/legal$/.test(url)) continue
  const slug = url.split("/").pop()
  await save(page, url, `raw/money/${slug}.json`, { path: slug })
}

await browser.close()
console.log("scraped", articles.size, "articles")
