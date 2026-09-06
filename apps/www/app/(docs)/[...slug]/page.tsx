import type { Metadata } from "next"

import { DocsPage, getDocsMetadata } from "@/lib/docs-page"
import { source } from "@/lib/source"

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string[] }>
}) {
  const { slug } = await params
  return <DocsPage slug={slug} />
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
  return getDocsMetadata(slug)
}
