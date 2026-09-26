import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Suspense } from "react"

import { getPost, getPosts } from "@/components/business-x/blog"
import { BlogPost } from "@/components/business-x/blog-post"
import { BusinessFrame } from "@/components/business-x/frame"
import { Skeleton } from "@/components/ui/skeleton"

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
export default function BusinessXBlogPostPage({
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
  const post = getPost(slug)
  if (!post) notFound()

  return (
    <BusinessFrame className="max-w-292 px-5 md:px-6">
      <BlogPost post={post} />
    </BusinessFrame>
  )
}

function PostFallback() {
  return (
    <BusinessFrame className="max-w-292 px-5 md:px-6">
      <Skeleton className="mt-20 h-9 w-2/3" />
      <Skeleton className="mt-4 h-5 w-full" />
      <Skeleton className="mt-2 h-5 w-4/5" />
    </BusinessFrame>
  )
}
