import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Suspense } from "react"

import { HelpFrame } from "@/components/business-x/frame"
import { categories, getCategory } from "@/components/help-x/articles"
import { HelpCategoryView } from "@/components/help-x/category"

export function generateStaticParams() {
  return categories.map((category) => ({ category: category.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>
}): Promise<Metadata> {
  const category = getCategory((await params).category)
  if (!category) return {}
  return {
    title: `${category.title.replaceAll(">x<", "X")} | X Help Center`,
  }
}

// help.x.com/en/<category>.
export default function HelpXCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>
}) {
  return (
    <Suspense fallback={<HelpFrame>{null}</HelpFrame>}>
      <Category params={params} />
    </Suspense>
  )
}

async function Category({ params }: { params: Promise<{ category: string }> }) {
  const category = getCategory((await params).category)
  if (!category) notFound()

  return (
    <HelpFrame>
      <HelpCategoryView category={category} />
    </HelpFrame>
  )
}
