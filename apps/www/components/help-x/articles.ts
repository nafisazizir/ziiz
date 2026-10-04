import fs from "node:fs"
import path from "node:path"

import type { Doc } from "@/components/business-x/doc"
import categoryData from "@/components/help-x/data/categories.json"
import searchData from "@/components/help-x/data/search.json"

// help.x.com, scraped: five categories, each a run of titled sections of
// article links, and one JSON file per article under data/articles. The
// files are read at render, synchronously, so every article prerenders.
// Regenerate with apps/www/scripts/x-help.
export type HelpArticle = Doc & { category: string }

export type HelpCategory = {
  slug: string
  title: string
  sections: {
    id: string
    title: string
    description?: string
    items: { title: string; href: string }[]
  }[]
}

export type SearchEntry = { title: string; href: string; category: string }

export const categories = categoryData as HelpCategory[]

export const searchIndex = searchData as SearchEntry[]

export function getCategory(slug: string) {
  return categories.find((category) => category.slug === slug)
}

const root = path.join(process.cwd(), "components/help-x/data/articles")

// A nested slug (premium-business/ads-terms) is one file, joined with "--".
export function getArticle(
  category: string,
  slug: string[]
): HelpArticle | undefined {
  if (![category, ...slug].every((part) => /^[a-z0-9-]+$/.test(part))) return
  const file = path.join(root, category, `${slug.join("--")}.json`)
  if (!fs.existsSync(file)) return
  return JSON.parse(fs.readFileSync(file, "utf8")) as HelpArticle
}

export function getArticleParams() {
  return searchIndex.map((entry) => {
    const [category, ...slug] = entry.href.replace("/help-x/", "").split("/")
    return { category, slug }
  })
}
