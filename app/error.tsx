"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"

export default function ErrorPage({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string }
  unstable_retry: () => void
}) {
  React.useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-4 bg-background px-6 text-center">
      <h1 className="text-heading-24">Something went wrong</h1>
      <p className="max-w-prose text-copy-14 text-gray-900">
        {error.message || "An unexpected error occurred while rendering."}
      </p>
      {error.digest ? (
        <p className="text-label-12-mono text-gray-900">
          digest {error.digest}
        </p>
      ) : null}
      <Button variant="outline" size="sm" onClick={() => unstable_retry()}>
        Try again
      </Button>
    </div>
  )
}
