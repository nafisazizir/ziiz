import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { componentDescriptions } from "@/lib/component-meta"
import { DocsPage, getDocsMetadata } from "@/lib/docs-page"
import { getRegistryItem, getRegistryItems } from "@/lib/registry"
import { source } from "@/lib/source"
import { ComponentPage } from "@/components/component-page"

export const dynamicParams = false

function componentFor(slug: string[]) {
  if (slug.length !== 2 || slug[0] !== "components") return null
  const item = getRegistryItem(slug[1])
  return item?.type === "registry:ui" ? item : null
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string[] }>
}) {
  const { slug } = await params

  if (source.getPage(slug)) return <DocsPage slug={slug} />

  const item = componentFor(slug)
  if (item) return <ComponentPage item={item} />

  notFound()
}

export function generateStaticParams() {
  const authored = source.generateParams().filter(({ slug }) => slug.length > 1)
  const seen = new Set(authored.map(({ slug }) => slug.join("/")))
  const generic = getRegistryItems("registry:ui")
    .map((item) => ({ slug: ["components", item.name] }))
    .filter(({ slug }) => !seen.has(slug.join("/")))
  return [...authored, ...generic]
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>
}): Promise<Metadata> {
  const { slug } = await params

  if (source.getPage(slug)) return getDocsMetadata(slug)

  const item = componentFor(slug)
  if (item) {
    return { title: item.title, description: componentDescriptions[item.name] }
  }

  return {}
}
