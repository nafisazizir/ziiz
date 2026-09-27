import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { getStory, stories } from "@/components/business-x/data/success-stories"
import { BusinessFrame } from "@/components/business-x/frame"
import { StoryPage } from "@/components/business-x/story-page"

export const dynamicParams = false

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

// business.x.com/en/success-stories/<slug>.
export default async function SuccessStoryPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const story = getStory(slug)
  if (!story) notFound()

  return (
    <BusinessFrame>
      <StoryPage story={story} />
    </BusinessFrame>
  )
}
