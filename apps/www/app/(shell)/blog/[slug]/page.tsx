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

// Same skeleton as BlogPostHeader + the prose column: icon-sm ghost, a
// breadcrumb bar, heading-48 title lines, the label-13 byline and the
// 400x244 art — so the streamed post lands without a reflow.
function PostFallback() {
  return (
    <article className="flex w-full flex-col">
      <header className="flex flex-col border-b border-gray-alpha-400 pb-6 lg:flex-row lg:items-start lg:justify-between lg:gap-4 lg:pb-30">
        <div className="flex min-w-0 flex-col lg:min-h-61 lg:max-w-180 lg:flex-1">
          <div className="flex shrink-0 items-center gap-4 pt-3 lg:pt-10">
            <Skeleton className="-ml-3 size-8 shrink-0 rounded-full" />
            <div className="text-label-14">
              <Skeleton className="h-[0.8em] w-28" />
            </div>
          </div>
          <div className="flex flex-1 flex-col justify-end gap-4 pt-6 lg:pt-8">
            <div className="text-heading-48">
              <Skeleton className="h-[0.75em] w-4/5" />
              <Skeleton className="mt-[calc(1lh-0.75em)] h-[0.75em] w-2/5" />
            </div>
            <div className="text-label-13">
              <Skeleton className="h-[0.85em] w-44" />
            </div>
          </div>
        </div>
        <Skeleton className="mt-6 aspect-2/1 w-full shrink-0 lg:mt-0 lg:aspect-auto lg:h-61 lg:w-100" />
      </header>
      <div className="typeset mx-auto w-full max-w-180 pt-12 pb-30">
        <p>
          <Skeleton className="h-[1em] w-full" />
        </p>
        <p>
          <Skeleton className="h-[1em] w-full" />
        </p>
        <p>
          <Skeleton className="h-[1em] w-4/6" />
        </p>
      </div>
    </article>
  )
}
