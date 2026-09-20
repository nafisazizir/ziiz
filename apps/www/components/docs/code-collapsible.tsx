"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

// Clamps a long code block to a few lines behind a reveal control. The
// content is always rendered so the block still copies and prints in full.
// How much shows through is --code-collapsed-height, so a caller (the
// source under a component preview) can set a teaser of its own.
function CodeCollapsible({
  className,
  expandLabel = "Expand",
  collapseLabel = "Collapse",
  children,
  ...props
}: React.ComponentProps<"div"> & {
  expandLabel?: string
  collapseLabel?: string
}) {
  const [open, setOpen] = React.useState(false)
  const id = React.useId()

  return (
    <div
      data-slot="code-collapsible"
      data-state={open ? "open" : "closed"}
      className={cn("group/code-collapsible relative", className)}
      {...props}
    >
      <div
        id={id}
        data-slot="code-collapsible-content"
        className="relative overflow-hidden group-data-[state=closed]/code-collapsible:max-h-[var(--code-collapsed-height,18rem)] *:data-[slot=code-block]:mt-0"
      >
        {children}
      </div>
      <div
        aria-hidden
        data-slot="code-collapsible-scrim"
        className="pointer-events-none absolute inset-x-px bottom-px h-28 rounded-b-lg bg-linear-to-t from-background-200 to-transparent group-data-[state=open]/code-collapsible:hidden"
      />
      {/* The control rides over the scrim in a row of its own: the button is
          inline-flex, so an auto margin on it would not centre anything.
          Where it sits in that row is --code-reveal-align, so a short teaser
          can put it in the middle of the fade instead of at its foot. */}
      <div
        data-slot="code-collapsible-footer"
        className="absolute inset-0 z-10 flex [align-items:var(--code-reveal-align,flex-end)] justify-center [padding-block-end:var(--code-reveal-pad,1rem)] group-data-[state=open]/code-collapsible:static group-data-[state=open]/code-collapsible:mt-3 group-data-[state=open]/code-collapsible:p-0"
      >
        <Button
          type="button"
          variant="outline"
          size="sm"
          data-slot="code-collapsible-trigger"
          aria-expanded={open}
          aria-controls={id}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? collapseLabel : expandLabel}
        </Button>
      </div>
    </div>
  )
}

export { CodeCollapsible }
