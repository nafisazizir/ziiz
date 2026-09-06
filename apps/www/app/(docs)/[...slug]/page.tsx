import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { DocsPage, getDocsMetadata } from "@/lib/docs-page"
import { source } from "@/lib/source"

export const dynamicParams = false

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string[] }>
}) {
  const { slug } = await params

  if (source.getPage(slug)) return <DocsPage slug={slug} />

  notFound()
}

export function generateStaticParams() {
  return source.generateParams().filter(({ slug }) => slug.length > 1)
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>
}): Promise<Metadata> {
  const { slug } = await params

  if (source.getPage(slug)) return getDocsMetadata(slug)

  return {}
}
