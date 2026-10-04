import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Suspense } from "react"

import { MoneyFrame } from "@/components/business-x/frame"
import { MoneyDoc, MoneyDocSkeleton } from "@/components/money-x/doc-page"
import { docSlugs, getDoc } from "@/components/money-x/docs"

type Params = Promise<{ doc: string }>

export function generateStaticParams() {
  return docSlugs.map((doc) => ({ doc }))
}

export async function generateMetadata({
  params,
}: {
  params: Params
}): Promise<Metadata> {
  const doc = getDoc((await params).doc)
  if (!doc) return {}
  return { title: `${doc.title} | X Money` }
}

// money.x.com/en/i/<document>: the FAQ and the legal terms. The document
// streams in over its own skeleton.
export default function MoneyXDocPage({ params }: { params: Params }) {
  return (
    <Suspense
      fallback={
        <MoneyFrame>
          <MoneyDocSkeleton />
        </MoneyFrame>
      }
    >
      <Document params={params} />
    </Suspense>
  )
}

async function Document({ params }: { params: Params }) {
  const { doc: slug } = await params
  const doc = getDoc(slug)
  if (!doc) notFound()

  return (
    <MoneyFrame>
      <MoneyDoc doc={doc} support={slug === "faq"} />
    </MoneyFrame>
  )
}
