"use client"

import * as React from "react"
import { IconCheck, IconChevronRight, IconCopy } from "@tabler/icons-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

// A line of activity that opens onto its detail. The line is quiet text,
// like ChatGPT's "Thought for 4s"; what it opens is an object below it.
export function Disclosure({
  label,
  icon,
  meta,
  tone = "default",
  defaultOpen = false,
  disabled = false,
  children,
}: {
  label: React.ReactNode
  icon?: React.ReactNode
  meta?: React.ReactNode
  tone?: "default" | "failed" | "live"
  defaultOpen?: boolean
  disabled?: boolean
  children?: React.ReactNode
}) {
  const row = (
    <>
      {icon ? (
        <span className="flex size-4 shrink-0 items-center justify-center [&_svg]:size-4">
          {icon}
        </span>
      ) : null}
      <span
        className={cn(
          "min-w-0 truncate",
          tone === "live" && "animate-pulse text-gray-1000"
        )}
      >
        {label}
      </span>
      {meta ? (
        <span className="shrink-0 text-label-12 text-gray-900 tabular-nums">
          {meta}
        </span>
      ) : null}
    </>
  )
  const base = cn(
    "group/disclosure flex max-w-full min-w-0 items-center gap-2 py-1 text-start text-label-14 text-gray-900",
    tone === "failed" && "text-red-900"
  )

  if (disabled || !children) return <div className={base}>{row}</div>

  return (
    <Collapsible defaultOpen={defaultOpen}>
      <CollapsibleTrigger
        className={cn(
          base,
          "rounded-sm outline-none hover:text-gray-1000 focus-visible:ring-3 focus-visible:ring-gray-600/50"
        )}
      >
        {row}
        <IconChevronRight className="size-3.5 shrink-0 opacity-0 transition-[rotate,opacity] group-hover/disclosure:opacity-100 group-focus-visible/disclosure:opacity-100 group-data-panel-open/disclosure:rotate-90 group-data-panel-open/disclosure:opacity-100 rtl:-scale-x-100" />
      </CollapsibleTrigger>
      <CollapsibleContent className="h-(--collapsible-panel-height) overflow-hidden transition-[height] duration-200 ease-out data-ending-style:h-0 data-starting-style:h-0 motion-reduce:transition-none">
        <div className="pt-1 pb-2">{children}</div>
      </CollapsibleContent>
    </Collapsible>
  )
}

// Clips long content to a teaser with a reveal at its foot.
export function Clamp({
  children,
  lines = 8,
  className,
  fade = "from-background-100",
}: {
  children: React.ReactNode
  lines?: number
  className?: string
  fade?: string
}) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [open, setOpen] = React.useState(false)
  const [overflows, setOverflows] = React.useState(false)

  React.useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const check = () => setOverflows(el.scrollHeight > el.clientHeight + 1)
    check()
    const ro = new ResizeObserver(check)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  return (
    <div className={cn("relative", className)}>
      <div
        ref={ref}
        className="overflow-hidden"
        style={open ? undefined : { maxHeight: `${lines * 1.5}rem` }}
      >
        {children}
      </div>
      {overflows || open ? (
        <div
          className={cn(
            "flex justify-center",
            !open &&
              cn(
                "absolute inset-x-0 bottom-0 items-end bg-linear-to-t to-transparent pt-10 pb-2",
                fade
              ),
            open && "pt-2"
          )}
        >
          <Button
            size="xs"
            variant="outline"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? "Show less" : "Show more"}
          </Button>
        </div>
      ) : null}
    </div>
  )
}

export function CopyButton({
  value,
  label = "Copy",
  className,
}: {
  value: string
  label?: string
  className?: string
}) {
  const [copied, setCopied] = React.useState(false)
  return (
    <Button
      size="icon-xs"
      variant="ghost"
      aria-label={label}
      className={className}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value)
          setCopied(true)
          setTimeout(() => setCopied(false), 1200)
        } catch {}
      }}
    >
      {copied ? <IconCheck /> : <IconCopy />}
    </Button>
  )
}

// A live run opens on its tail, the way a chat opens on the latest turn.
export function FollowTail({ live }: { live: boolean }) {
  const ref = React.useRef<HTMLSpanElement>(null)
  React.useEffect(() => {
    if (live) ref.current?.scrollIntoView({ block: "end" })
  }, [live])
  return <span ref={ref} aria-hidden />
}
