// The site as text, for agents: what /llms.txt, /llms-full.txt and
// /llms.mdx/<path> serve. Pages come from the same two collections the
// site renders; the markdown is the processed form fumadocs keeps when
// `includeProcessedMarkdown` is on (see source.config.ts).

import { getBlogPosts } from "@/lib/blog"
import { siteConfig } from "@/lib/config"
import { source } from "@/lib/source"

export const REGISTRY_TEMPLATE =
  "https://raw.githubusercontent.com/nafisazizir/ziiz/main/apps/www/public/r/{name}.json"

type Page = ReturnType<typeof source.getPages>[number]

// The reading order: the guide, then the foundation in the order the
// sidebar lists it, then every component page alphabetically.
const FOUNDATION = [
  "installation",
  "colors",
  "typography",
  "materials",
  "prose",
]

export function getDocsPages(): Page[] {
  const pages = source.getPages()
  const bySlug = new Map(pages.map((page) => [page.slugs.join("/"), page]))
  const foundation = FOUNDATION.map((slug) => bySlug.get(slug)).filter(
    (page): page is Page => page !== undefined
  )
  const components = pages
    .filter((page) => page.slugs[0] === "components")
    .sort((a, b) => a.url.localeCompare(b.url))
  return [...foundation, ...components]
}

export function absolute(url: string) {
  return `${siteConfig.url}${url}`
}

export function markdownUrl(url: string) {
  return `${siteConfig.url}/llms.mdx${url}`
}

// One page as a self-describing markdown document.
export async function pageMarkdown(page: {
  url: string
  data: {
    title: string
    description: string
    getText: (type: "raw" | "processed") => Promise<string>
  }
}) {
  const body = await page.data.getText("processed")
  return `# ${page.data.title}

> ${page.data.description}

Source: ${absolute(page.url)}

${body.trim()}
`
}

export function llmsIndex() {
  const docs = getDocsPages()
  const line = (page: {
    url: string
    data: { title: string; description: string }
  }) =>
    `- [${page.data.title}](${absolute(page.url)}): ${page.data.description} (markdown: ${markdownUrl(page.url)})`

  const foundation = docs
    .filter((page) => page.slugs[0] !== "components")
    .map(line)
  const components = docs
    .filter((page) => page.slugs[0] === "components")
    .map(line)
  const blog = getBlogPosts().map(line)

  return `# ${siteConfig.name}

> ${siteConfig.description} The token foundation (a ten-step color ramp, 31 named type roles, eight materials and a prose layer) ships as the npm package @ziiz/theme. The components ship as a shadcn registry served from GitHub.

Setup for an app: add the registry to components.json and run \`npx shadcn@latest add @ziiz/theme --overwrite\`, then \`npx shadcn@latest add @ziiz/<name>\` for components. The guide below has the details.

- Registry URL template: ${REGISTRY_TEMPLATE}
- Agent skill (installs to .agents/skills/ziiz/): \`npx shadcn@latest add @ziiz/skill\`
- Every doc page as one markdown file: ${siteConfig.url}/llms-full.txt

## Guide and foundation

${foundation.join("\n")}

## Components

${components.join("\n")}

## Blog

${blog.join("\n")}
`
}

export async function llmsFull() {
  const sections = await Promise.all(getDocsPages().map(pageMarkdown))
  return `<!-- ${siteConfig.name}: every guide, foundation and component page as markdown. Index: ${siteConfig.url}/llms.txt -->

${sections.join("\n---\n\n")}`
}
