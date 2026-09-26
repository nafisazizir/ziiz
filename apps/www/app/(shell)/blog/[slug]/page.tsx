import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { getBlogPost, getBlogPosts } from "@/lib/blog"
import { BlogPostHeader } from "@/components/blog/blog-post-header"
import { getMDXComponents } from "@/mdx-components"

export const dynamicParams = false

export function generateStaticParams() {
  return getBlogPosts().map((post) => ({ slug: post.slugs[0] }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) return {}

  return {
    title: post.data.title,
    description: post.data.description,
    openGraph: {
      type: "article",
      title: post.data.title,
      description: post.data.description,
      publishedTime: post.data.date,
      authors: [post.data.author],
      url: post.url,
    },
  }
}

// The header keeps the list's geometry; the body is one typeset run in the
// 720px prose column, the same as a docs article.
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) notFound()

  const Content = post.data.body

  return (
    <article className="flex w-full flex-col">
      <BlogPostHeader post={post} />
      <div className="typeset mx-auto w-full max-w-180 pt-12 pb-30">
        <Content components={getMDXComponents()} />
      </div>
    </article>
  )
}
