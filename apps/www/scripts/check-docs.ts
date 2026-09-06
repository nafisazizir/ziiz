// Content lint, run before the build so a broken page fails here rather
// than halfway through prerendering.
//
//   1. Frontmatter: every MDX file has the fields its collection requires.
//   2. Nav coverage: every docs page is reachable from the sidebar, either
//      directly or as a component page.
//   3. Internal links: every `/path` or `/path#anchor` in MDX resolves to a
//      route the site serves.
//
// Exits non-zero with one line per problem.

import fs from "node:fs"
import path from "node:path"

const ROOT = process.cwd()

type Collection = {
  dir: string
  baseUrl: string
  required: string[]
}

const COLLECTIONS: Collection[] = [
  { dir: "content/docs", baseUrl: "", required: ["title", "description"] },
  {
    dir: "content/blog",
    baseUrl: "/blog",
    required: ["title", "description", "date"],
  },
]

// Routes that exist outside the content collections.
const STATIC_ROUTES = ["/", "/blog", "/components", "/preview", "/rss.xml"]

const problems: string[] = []

function walk(dir: string, out: string[] = []): string[] {
  if (!fs.existsSync(dir)) return out
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) walk(full, out)
    else if (/\.mdx?$/.test(entry.name)) out.push(full)
  }
  return out
}

function readFrontmatter(source: string): Record<string, string> | null {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  if (!match) return null
  const data: Record<string, string> = {}
  for (const line of match[1].split(/\r?\n/)) {
    const kv = line.match(/^([A-Za-z_][\w-]*):\s*(.*)$/)
    if (kv) data[kv[1]] = kv[2].replace(/^["']|["']$/g, "")
  }
  return data
}

function routeFor(collection: Collection, file: string) {
  const rel = path
    .relative(path.join(ROOT, collection.dir), file)
    .replace(/\\/g, "/")
    .replace(/\.mdx?$/, "")
    .replace(/(^|\/)index$/, "")
  return `${collection.baseUrl}/${rel}`.replace(/\/+$/, "") || "/"
}

// 1 + collect routes -------------------------------------------------------

const routes = new Set<string>(STATIC_ROUTES)
const docsRoutes: string[] = []

for (const collection of COLLECTIONS) {
  for (const file of walk(path.join(ROOT, collection.dir))) {
    const rel = path.relative(ROOT, file)
    const source = fs.readFileSync(file, "utf8")
    const data = readFrontmatter(source)
    if (!data) {
      problems.push(`${rel}: missing frontmatter`)
      continue
    }
    for (const key of collection.required) {
      if (!data[key]) problems.push(`${rel}: frontmatter is missing "${key}"`)
    }
    if (data.date && !/^\d{4}-\d{2}-\d{2}$/.test(data.date)) {
      problems.push(`${rel}: date "${data.date}" is not YYYY-MM-DD`)
    }
    const route = routeFor(collection, file)
    routes.add(route)
    if (collection.dir === "content/docs") docsRoutes.push(route)
  }
}

const registry = JSON.parse(
  fs.readFileSync(path.join(ROOT, "registry.json"), "utf8")
) as { items: { name: string; type: string }[] }
const componentRoutes = registry.items
  .filter((item) => item.type === "registry:ui")
  .map((item) => `/components/${item.name}`)
for (const route of componentRoutes) routes.add(route)

// 2 --------------------------------------------------------------------------

// The sidebar is static config plus the registry, so read the hrefs out of
// lib/config.ts rather than importing it (it pulls registry.json through
// the app's alias, which node cannot resolve here).
const config = fs.readFileSync(path.join(ROOT, "lib/config.ts"), "utf8")
const navRoutes = new Set(
  [...config.matchAll(/href:\s*"([^"]+)"/g)].map((m) => m[1])
)
for (const route of componentRoutes) navRoutes.add(route)

for (const route of docsRoutes) {
  if (!navRoutes.has(route)) {
    problems.push(`${route}: docs page is not reachable from the sidebar`)
  }
}

// 3 --------------------------------------------------------------------------

const LINK_RE = /\]\((\/[^)\s]*)\)|href=["'](\/[^"']*)["']/g

for (const collection of COLLECTIONS) {
  for (const file of walk(path.join(ROOT, collection.dir))) {
    const rel = path.relative(ROOT, file)
    const source = fs.readFileSync(file, "utf8")
    for (const match of source.matchAll(LINK_RE)) {
      const href = match[1] ?? match[2]
      const [pathname] = href.split("#")
      const clean = pathname.replace(/\/+$/, "") || "/"
      if (clean.startsWith("/preview/")) continue
      if (!routes.has(clean)) {
        problems.push(`${rel}: link to "${href}" has no route`)
      }
    }
  }
}

// ----------------------------------------------------------------------------

if (problems.length) {
  for (const problem of problems) console.error(`docs: ${problem}`)
  console.error(`docs: ${problems.length} problem(s)`)
  process.exit(1)
}

console.log(
  `docs: ${docsRoutes.length} docs pages, ${componentRoutes.length} component pages, ${routes.size} routes, links ok`
)
