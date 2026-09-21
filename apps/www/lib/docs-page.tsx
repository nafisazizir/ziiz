import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { getMDXComponents } from "@/mdx-components"
import { source } from "@/lib/source"
import {
  DocsTocDisclosure,
  DocsTocProvider,
  DocsTocRail,
} from "@/components/docs-toc"

export function getDocsMetadata(slug: string[]): Metadata {
  const page = source.getPage(slug)
  if (!page) return {}

  return {
    title: page.data.title,
    description: page.data.description,
  }
}

export function DocsPage({ slug }: { slug: string[] }) {
  const page = source.getPage(slug)
  if (!page) notFound()

  const Content = page.data.body

  // The article sits between the sidebar and the rail, so the two rails
  // match and the prose stays centred. The toc renders in both places: the
  // rail on a wide viewport, a disclosure above the prose under it.
  return (
    <DocsTocProvider toc={page.data.toc}>
      <div className="flex w-full items-start">
        <article className="typeset mx-auto w-full max-w-2xl px-1 py-10 lg:px-8">
          <h1>{page.data.title}</h1>
          <p>{page.data.description}</p>
          <DocsTocDisclosure />
          <Content components={getMDXComponents()} />
        </article>
        <DocsTocRail />
      </div>
    </DocsTocProvider>
  )
}
