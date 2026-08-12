import { Suspense } from "react"

import { Playground } from "@/components/playground"

export default function Page() {
  return (
    <Suspense>
      <Playground />
    </Suspense>
  )
}
