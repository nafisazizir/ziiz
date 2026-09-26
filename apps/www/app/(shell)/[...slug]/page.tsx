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

// Mirrors DocsPage's geometry: real typeset elements so the roles set the
// line boxes and the flow margins come for free — a bar at ~cap height where
// each run of text will land.
function DocsFallback() {
  return (
    <div className="flex w-full items-start">
      <article className="typeset mx-auto w-full max-w-196 px-1 py-10 lg:px-8 lg:pt-(--content-top)">
        <h1>
          <Skeleton className="h-[0.8em] w-3/5" />
        </h1>
        <p>
          <Skeleton className="h-[1em] w-full" />
        </p>
        <p>
          <Skeleton className="h-[1em] w-5/6" />
        </p>
        <h2>
          <Skeleton className="h-[0.8em] w-2/5" />
        </h2>
        <p>
          <Skeleton className="h-[1em] w-full" />
        </p>
        <p>
          <Skeleton className="h-[1em] w-full" />
        </p>
        <p>
          <Skeleton className="h-[1em] w-4/6" />
        </p>
        <div className="mt-(--typeset-flow)">
          <Skeleton className="aspect-[16/7] w-full" />
        </div>
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
