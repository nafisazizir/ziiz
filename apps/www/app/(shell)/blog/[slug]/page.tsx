import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Suspense } from "react"

import { getBlogPost, getBlogPosts } from "@/lib/blog"
import {
  BlogPostHeader,
  BlogPostHeaderSkeleton,
} from "@/components/blog/blog-post-header"
import { TypesetSkeleton } from "@/components/text-skeleton"
import { getMDXComponents } from "@/mdx-components"

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
// 720px prose column, the same as a docs article. The fallback is the same
// article with the header's skeleton and an article's opening as bars, so
// the streamed post lands without a reflow.
export default function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  return (
    <Suspense
      fallback={
        <Article aria-hidden header={<BlogPostHeaderSkeleton />}>
          <TypesetSkeleton />
        </Article>
      }
    >
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
    <Article header={<BlogPostHeader post={post} />}>
      <Content components={getMDXComponents()} />
    </Article>
  )
}

function Article({
  header,
  children,
  ...props
}: React.ComponentProps<"article"> & { header: React.ReactNode }) {
  return (
    <article className="flex w-full flex-col" {...props}>
      {header}
      <div className="typeset mx-auto w-full max-w-180 pt-12 pb-30">
        {children}
      </div>
    </article>
  )
}
