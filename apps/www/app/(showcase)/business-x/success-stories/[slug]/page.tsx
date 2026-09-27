import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Suspense } from "react"

import { getStory, stories } from "@/components/business-x/data/success-stories"
import { BusinessFrame } from "@/components/business-x/frame"
import { StoryPage } from "@/components/business-x/story-page"
import { Skeleton } from "@/components/ui/skeleton"

export function generateStaticParams() {
  return stories.map((story) => ({ slug: story.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const story = getStory(slug)
  if (!story) return {}
  return {
    title: `${story.brand} | X Business`,
    description: story.description,
  }
}

// business.x.com/en/success-stories/<slug>. The story streams inside the
// frame the way the blog post does under cache components.
export default function SuccessStoryPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  return (
    <Suspense fallback={<StoryFallback />}>
      <Story params={params} />
    </Suspense>
  )
}

async function Story({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const story = getStory(slug)
  if (!story) notFound()

  return (
    <BusinessFrame>
      <StoryPage story={story} />
    </BusinessFrame>
  )
}

// The story header's shape: title and deck lines, then the lockup box, so
// the streamed page lands without a reflow.
function StoryFallback() {
  return (
    <BusinessFrame>
      <div className="flex flex-col gap-6 pt-4 lg:pt-20">
        <div className="text-heading-48">
          <Skeleton className="h-[0.75em] w-2/5" />
        </div>
        <div className="text-heading-24">
          <Skeleton className="h-[0.75em] w-4/5" />
        </div>
        <Skeleton className="aspect-5/2 w-full" />
      </div>
    </BusinessFrame>
  )
}
