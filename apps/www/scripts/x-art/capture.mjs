// Part of the business.x.com art pipeline. Run from apps/www with a work
// directory (default .x-art) and the global Playwright install:
//   NPMROOT=$(npm root -g) node scripts/x-art/<step>.mjs
// Steps: capture → catalogue → generate. See scripts/x-art/README.md.
const { chromium } = await import(
  `${process.env.NPMROOT ?? "/usr/local/lib/node_modules"}/playwright/index.mjs`
)
const WORK = process.env.X_ART_WORK ?? ".x-art"
process.chdir(WORK)
import fs from "node:fs"
const urls = fs.readFileSync("urls.txt", "utf8").trim().split("\n")
const browser = await chromium.launch()
const ctx = await browser.newContext({
  viewport: { width: 1512, height: 982 },
  colorScheme: "light",
  deviceScaleFactor: 1,
  userAgent:
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0 Safari/537.36",
})
fs.mkdirSync("live", { recursive: true })
for (const width of [1512, 390]) {
  for (const u of urls) {
    const f = (
      u.replace(/^https:\/\/business\.x\.com\/en\/?/, "") || "home"
    ).replace(/\//g, "__")
    const page = await ctx.newPage()
    await page.setViewportSize({ width, height: 982 })
    try {
      await page.goto(u, { waitUntil: "networkidle", timeout: 60000 })
      // accept cookies if present
      try {
        await page
          .getByRole("button", { name: /accept all/i })
          .first()
          .click({ timeout: 1500 })
      } catch {}
      const h = await page.evaluate(() => document.documentElement.scrollHeight)
      for (let y = 0; y < h + 900; y += 500) {
        await page.evaluate((y) => window.scrollTo(0, y), y)
        await page.waitForTimeout(250)
      }
      await page.waitForTimeout(3000)
      // hover feature panels + accordion clicks not needed for art
      const dump = await page.evaluate(() => {
        const out = []
        document.querySelectorAll("svg").forEach((svg) => {
          if (svg.closest("svg") !== svg) return
          const r = svg.getBoundingClientRect()
          out.push({
            outer: svg.outerHTML,
            w: r.width,
            h: r.height,
            parentCls: svg.parentElement?.className?.toString() || "",
          })
        })
        return out
      })
      fs.writeFileSync(`live/${f}@${width}.json`, JSON.stringify(dump))
      console.log(f, width, dump.length)
    } catch (e) {
      console.log("ERR", f, width, e.message.slice(0, 100))
    }
    await page.close()
  }
}
await browser.close()
