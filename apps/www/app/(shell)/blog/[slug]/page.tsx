import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

import { formatDate, getBlogPost, getBlogPosts } from "@/lib/blog"
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
    <article className="typeset">
      <header data-not-typeset className="flex flex-col gap-4">
        <Link
          href="/blog"
          className="text-label-13 text-gray-900 hover:text-gray-1000"
        >
          ← Blog
        </Link>
        <h1 className="text-heading-40 text-gray-1000">{post.data.title}</h1>
        <p className="text-copy-18 text-gray-900">{post.data.description}</p>
        <p className="text-label-13 text-gray-900">
          <span>{post.data.author}</span>
          <span aria-hidden> · </span>
          <time dateTime={post.data.date}>{formatDate(post.data.date)}</time>
        </p>
      </header>
      <hr className="mt-10! lg:mt-10!" />
      <Content components={getMDXComponents()} />
    </article>
  )
}
