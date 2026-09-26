import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Suspense } from "react"

import { getBlogPost, getBlogPosts } from "@/lib/blog"
import { BlogPostHeader } from "@/components/blog/blog-post-header"
import { getMDXComponents } from "@/mdx-components"
import { Skeleton } from "@/components/ui/skeleton"

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
export default function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  return (
    <Suspense fallback={<PostFallback />}>
      <Post params={params} />
    </Suspense>
  )
}

async function Post({ params }: { params: Promise<{ slug: string }> }) {
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

function PostFallback() {
  return (
    <article className="mx-auto flex w-full max-w-180 flex-col pt-12 pb-30">
      <Skeleton className="h-9 w-2/3" />
      <Skeleton className="mt-4 h-5 w-full" />
      <Skeleton className="mt-2 h-5 w-4/5" />
    </article>
  )
}
