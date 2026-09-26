// Any docs page or blog post as markdown: /llms.mdx/colors,
// /llms.mdx/components/button, /llms.mdx/blog/<slug>.

import { NextResponse } from "next/server"

import { blogSource, getBlogPosts } from "@/lib/blog"
import { pageMarkdown } from "@/lib/llms"
import { source } from "@/lib/source"

export const dynamic = "force-static"
export const dynamicParams = false

export function generateStaticParams() {
  const docs = source.generateParams()
  const blog = getBlogPosts().map((post) => ({ slug: ["blog", ...post.slugs] }))
  return [...docs, ...blog]
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  const { slug } = await params
  const page =
    slug[0] === "blog"
      ? blogSource.getPage(slug.slice(1))
      : source.getPage(slug)
  if (!page) return new NextResponse("Not found", { status: 404 })

  return new NextResponse(await pageMarkdown(page), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  })
}
