import { Suspense } from "react"
import type { Metadata } from "next"

import { Playground } from "@/components/playground"
import { SiteHeader } from "@/components/site-header"

export const metadata: Metadata = {
  title: "Preview",
}

export default function Page() {
  return (
    <div className="flex h-svh flex-col bg-background">
      <SiteHeader />
      <Suspense>
        <Playground />
      </Suspense>
    </div>
  )
}
