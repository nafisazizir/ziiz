import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { getMDXComponents } from "@/mdx-components"
import { source } from "@/lib/source"
import { DocsTocProvider, DocsTocRail } from "@/components/docs-toc"

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
  // match and the prose stays centred. 784 less the lg padding is the same
  // 720px measure a blog post uses. The toc is the rail alone, so it drops
  // away with the rail on a narrow viewport.
  return (
    <DocsTocProvider toc={page.data.toc}>
      <div className="flex w-full items-start">
        <article className="typeset mx-auto w-full max-w-196 px-1 py-10 lg:px-8">
          <h1>{page.data.title}</h1>
          <p>{page.data.description}</p>
          <Content components={getMDXComponents()} />
        </article>
        <DocsTocRail />
      </div>
    </DocsTocProvider>
  )
}
