import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Suspense } from "react"

import { DocsPage, getDocsMetadata } from "@/lib/docs-page"
import { source } from "@/lib/source"
import { Skeleton } from "@/components/ui/skeleton"

export default function Page({
  params,
}: {
  params: Promise<{ slug: string[] }>
}) {
  return (
    <Suspense fallback={<DocsFallback />}>
      <Docs params={params} />
    </Suspense>
  )
}

async function Docs({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params

  if (source.getPage(slug)) return <DocsPage slug={slug} />

  notFound()
}

// The article column keeps its measure so the shell already reads as a docs
// page while the slug-resolved content streams in.
function DocsFallback() {
  return (
    <div className="flex w-full items-start">
      <article className="mx-auto w-full max-w-196 px-1 py-10 lg:px-8 lg:pt-(--content-top)">
        <Skeleton className="h-9 w-2/3" />
        <Skeleton className="mt-4 h-5 w-full" />
        <Skeleton className="mt-2 h-5 w-4/5" />
      </article>
    </div>
  )
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
