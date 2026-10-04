import fs from "node:fs"
import path from "node:path"

import type { Doc } from "@/components/business-x/doc"
import { legalDocs } from "@/components/money-x/legal"

// money.x.com's documents, scraped: the FAQ and the legal terms, one JSON
// file each under data/docs, read synchronously so every page prerenders.
// Regenerate with apps/www/scripts/x-help.
const root = path.join(process.cwd(), "components/money-x/data/docs")

// The FAQ, the documents the legal index lists, and the direct deposit
// offer, which the site links from its copy only.
export const docSlugs = [
  "faq",
  ...legalDocs.flatMap((doc) => (doc.slug ? [doc.slug] : [])),
  "direct-deposit-bonus",
]

export function getDoc(slug: string): Doc | undefined {
  if (!/^[a-z0-9-]+$/.test(slug)) return
  const file = path.join(root, `${slug}.json`)
  if (!fs.existsSync(file)) return
  return JSON.parse(fs.readFileSync(file, "utf8")) as Doc
}
