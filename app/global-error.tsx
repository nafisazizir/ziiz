"use client"

import * as React from "react"

import "./globals.css"

// Replaces the root layout when it is the layout itself that throws, so it has
// to render its own html/body.
export default function GlobalError({
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
    <html lang="en">
      <body className="antialiased">
        <title>Something went wrong — ziiz</title>
        <div className="flex min-h-svh flex-col items-center justify-center gap-4 px-6 text-center">
          <h1 className="text-heading-24">Something went wrong</h1>
          <p className="max-w-prose text-copy-14 text-gray-900">
            {error.message || "An unexpected error occurred while rendering."}
          </p>
          {error.digest ? (
            <p className="text-label-12-mono text-gray-900">
              digest {error.digest}
            </p>
          ) : null}
          <button
            type="button"
            className="rounded-md border px-3 py-1.5 text-button-14"
            onClick={() => unstable_retry()}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  )
}
