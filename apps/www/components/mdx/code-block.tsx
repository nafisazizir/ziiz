"use client"

import * as React from "react"
import { Copy01Icon, Tick02Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

import { Button } from "@/components/ui/button"

export function CodeBlock(props: React.ComponentPropsWithoutRef<"pre">) {
  const preRef = React.useRef<HTMLPreElement>(null)
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)
  const [copied, setCopied] = React.useState(false)

  React.useEffect(
    () => () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    },
    []
  )

  async function copy() {
    const value = preRef.current?.textContent
    if (!value) return

    try {
      await navigator.clipboard.writeText(value)
    } catch {
      return
    }

    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setCopied(true)
    timeoutRef.current = setTimeout(() => setCopied(false), 1200)
  }

  return (
    <div className="typeset-code">
      <pre
        {...props}
        ref={preRef}
        role="region"
        tabIndex={0}
        aria-label={props["aria-label"] ?? "Scrollable code block"}
      />
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        aria-label={copied ? "Copied" : "Copy code"}
        data-copy-button
        onClick={() => void copy()}
      >
        <HugeiconsIcon
          icon={copied ? Tick02Icon : Copy01Icon}
          strokeWidth={2}
          data-icon="inline-start"
        />
        <span className="sr-only" aria-live="polite">
          {copied ? "Copied" : ""}
        </span>
      </Button>
    </div>
  )
}
