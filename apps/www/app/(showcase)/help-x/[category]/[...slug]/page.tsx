import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Suspense } from "react"

import { HelpFrame } from "@/components/business-x/frame"
import {
  HelpArticleSkeleton,
  HelpArticleView,
} from "@/components/help-x/article"
import { getArticle, getArticleParams } from "@/components/help-x/articles"

type Params = Promise<{ category: string; slug: string[] }>

export function generateStaticParams() {
  return getArticleParams()
}

export async function generateMetadata({
  params,
}: {
  params: Params
}): Promise<Metadata> {
  const { category, slug } = await params
  const article = getArticle(category, slug)
  if (!article) return {}
  return {
    title: `${article.title.replaceAll(">x<", "X")} | X Help Center`,
    description: article.description.replaceAll(">x<", "X") || undefined,
  }
}

// help.x.com/en/<category>/<article>. The band is centred in the whole of
// main, so the frame's column cap and gutter come off. The article streams
// in over its own skeleton.
export default function HelpXArticlePage({ params }: { params: Params }) {
  return (
    <Suspense
      fallback={
        <Frame>
          <HelpArticleSkeleton />
        </Frame>
      }
    >
      <Article params={params} />
    </Suspense>
  )
}

async function Article({ params }: { params: Params }) {
  const { category, slug } = await params
  const article = getArticle(category, slug)
  if (!article) notFound()

  return (
    <Frame>
      <HelpArticleView article={article} />
    </Frame>
  )
}

function Frame({ children }: { children: React.ReactNode }) {
  return <HelpFrame className="max-w-none px-0">{children}</HelpFrame>
}
