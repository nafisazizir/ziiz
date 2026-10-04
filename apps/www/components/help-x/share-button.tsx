"use client"

import * as React from "react"
import { IconCheck, IconShare3 } from "@tabler/icons-react"

import { Button } from "@/components/ui/button"

// "Share this Article": the system share sheet where there is one, the
// page's address on the clipboard where there is not.
export function ShareButton({ title }: { title: string }) {
  const [copied, setCopied] = React.useState(false)

  React.useEffect(() => {
    if (!copied) return
    const timer = setTimeout(() => setCopied(false), 2000)
    return () => clearTimeout(timer)
  }, [copied])

  async function share() {
    const url = window.location.href
    try {
      if (navigator.share) await navigator.share({ title, url })
      else {
        await navigator.clipboard.writeText(url)
        setCopied(true)
      }
    } catch {}
  }

  return (
    <Button variant="secondary" shape="rounded" size="sm" onClick={share}>
      {copied ? "Link copied" : "Share this Article"}
      {copied ? (
        <IconCheck data-icon="inline-end" />
      ) : (
        <IconShare3 data-icon="inline-end" />
      )}
    </Button>
  )
}
