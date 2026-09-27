import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Suspense } from "react"

import { getStory, stories } from "@/components/business-x/data/success-stories"
import { BusinessFrame } from "@/components/business-x/frame"
import {
  StoryPage,
  StoryPageSkeleton,
} from "@/components/business-x/story-page"

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
// frame over its own skeleton, the way the blog post does.
export default function SuccessStoryPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  return (
    <Suspense
      fallback={
        <BusinessFrame>
          <StoryPageSkeleton />
        </BusinessFrame>
      }
    >
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
