import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { getPost, getPosts } from "@/components/business-x/blog"
import { BlogPost } from "@/components/business-x/blog-post"
import { BusinessFrame } from "@/components/business-x/frame"

export const dynamicParams = false

export function generateStaticParams() {
  return getPosts().map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return {}
  return {
    title: `${post.title.replaceAll(">x<", "X")} | X Business`,
    description: post.description.replaceAll(">x<", "X"),
  }
}

// business.x.com/en/blog/<slug>. The post's column is the same 1120px as the
// list's, but the site pads it 20px (24px from 768) instead of 16px, so the
// frame's cap widens to match.
export default async function BusinessXBlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()

  return (
    <BusinessFrame className="max-w-292 px-5 md:px-6">
      <BlogPost post={post} />
    </BusinessFrame>
  )
}
