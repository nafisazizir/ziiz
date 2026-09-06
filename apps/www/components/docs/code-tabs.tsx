"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Tabs } from "@/components/ui/tabs"

const CHANGE_EVENT = "ziiz:code-tabs"

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback)
  window.addEventListener(CHANGE_EVENT, callback)
  return () => {
    window.removeEventListener("storage", callback)
    window.removeEventListener(CHANGE_EVENT, callback)
  }
}

function read(storageKey: string) {
  try {
    return window.localStorage.getItem(storageKey)
  } catch {
    return null
  }
}

function write(storageKey: string, value: string) {
  try {
    window.localStorage.setItem(storageKey, value)
  } catch {
    // Storage is unavailable; the selection still applies until reload.
  }
  window.dispatchEvent(new Event(CHANGE_EVENT))
}

// Tabs whose selection is remembered across pages and shared between every
// CodeTabs on the page, so a reader who picks "Manual" once sees the manual
// steps everywhere. Storage is per key; the default key covers the
// installation tabs.
function CodeTabs({
  storageKey = "ziiz:code-tabs",
  defaultValue = "cli",
  className,
  ...props
}: React.ComponentProps<typeof Tabs> & {
  storageKey?: string
  defaultValue?: string
}) {
  const stored = React.useSyncExternalStore(
    subscribe,
    () => read(storageKey),
    () => null
  )

  return (
    <Tabs
      data-slot="code-tabs"
      value={stored ?? defaultValue}
      onValueChange={(next) => write(storageKey, String(next))}
      className={cn(
        "mt-(--typeset-flow,1.5rem) gap-0 *:data-[slot=tabs-list]:mb-2",
        className
      )}
      {...props}
    />
  )
}

export { CodeTabs }
