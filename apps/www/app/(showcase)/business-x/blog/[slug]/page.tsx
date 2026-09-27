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

// Same skeleton as the post's real header: breadcrumb row hanging off
// --rail-content-top, heading-48 title lines, the 400x244 art, then the
// typeset column — so the streamed post lands without a reflow.
function PostFallback() {
  return (
    <BusinessFrame className="max-w-292 px-5 md:px-6">
      <article className="flex w-full flex-col">
        <header className="flex flex-col border-b border-gray-alpha-400 pb-6 lg:flex-row lg:items-start lg:justify-between lg:gap-4 lg:pb-30">
          <div className="flex min-w-0 flex-col lg:min-h-61 lg:max-w-180 lg:flex-1">
            <div className="flex shrink-0 items-center gap-4 pt-3 lg:pt-[calc(var(--rail-content-top)+1px)]">
              <Skeleton className="-ml-3 size-8 shrink-0 rounded-full" />
              <div className="text-label-14">
                <Skeleton className="h-[0.8em] w-28" />
              </div>
            </div>
            <div className="flex flex-1 items-end pt-6 lg:pt-8">
              <div className="text-heading-48">
                <Skeleton className="h-[0.75em] w-4/5" />
                <Skeleton className="mt-[calc(1lh-0.75em)] h-[0.75em] w-2/5" />
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
    </BusinessFrame>
  )
}
