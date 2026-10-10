import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { getRun, runs, runTitle } from "@/components/autoed/data"
import { RunView } from "@/components/autoed/run-view"

export function generateStaticParams() {
  return runs.map((run) => ({ id: run.id }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const run = getRun((await params).id)
  return run ? { title: runTitle(run) } : {}
}

export default async function RunPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const run = getRun((await params).id)
  if (!run) notFound()
  return <RunView run={run} />
}
