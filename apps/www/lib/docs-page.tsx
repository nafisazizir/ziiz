import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { getMDXComponents } from "@/mdx-components"
import { source } from "@/lib/source"

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

  return (
    <>
      <h1>{page.data.title}</h1>
      <p>{page.data.description}</p>
      <Content components={getMDXComponents()} />
    </>
  )
}
