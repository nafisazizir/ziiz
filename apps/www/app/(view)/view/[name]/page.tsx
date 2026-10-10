import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Suspense } from "react"

import { blockNames, getExample } from "@/lib/examples"

export function generateStaticParams() {
  return blockNames.map((name) => ({ name }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ name: string }>
}): Promise<Metadata> {
  const { name } = await params
  return { title: name, robots: { index: false } }
}

// A block on its own page, so the docs can frame it in an iframe and the
// block's viewport is the frame. No docs chrome, nothing but the example.
export default function ViewPage({
  params,
}: {
  params: Promise<{ name: string }>
}) {
  return (
    <Suspense>
      <View params={params} />
    </Suspense>
  )
}

async function View({ params }: { params: Promise<{ name: string }> }) {
  const { name } = await params
  const Example = blockNames.includes(name) ? getExample(name) : null
  if (!Example) notFound()

  return (
    <div className="bg-background-100">
      {/* eslint-disable-next-line react-hooks/static-components */}
      <Example />
    </div>
  )
}
