// Any docs page or blog post as markdown: /llms.mdx/colors,
// /llms.mdx/components/button, /llms.mdx/blog/<slug>.

import { cacheLife } from "next/cache"
import { NextResponse } from "next/server"

import { blogSource, getBlogPosts } from "@/lib/blog"
import { pageMarkdown } from "@/lib/llms"
import { source } from "@/lib/source"

export function generateStaticParams() {
  const docs = source.generateParams()
  const blog = getBlogPosts().map((post) => ({ slug: ["blog", ...post.slugs] }))
  return [...docs, ...blog]
}

async function getPageMarkdown(slug: string[]) {
  "use cache"
  cacheLife("max")

  const page =
    slug[0] === "blog"
      ? blogSource.getPage(slug.slice(1))
      : source.getPage(slug)
  if (!page) return null

  return pageMarkdown(page)
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  const { slug } = await params
  const markdown = await getPageMarkdown(slug)
  if (!markdown) return new NextResponse("Not found", { status: 404 })

  return new NextResponse(markdown, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  })
}
