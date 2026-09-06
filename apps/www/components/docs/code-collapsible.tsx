"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

// Clamps a long code block to a few lines behind an Expand control. The
// content is always rendered so the block still copies and prints in full.
function CodeCollapsible({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
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
        className="relative overflow-hidden group-data-[state=closed]/code-collapsible:max-h-72 *:data-[slot=code-block]:mt-0"
      >
        {children}
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-px bottom-px h-28 rounded-b-lg bg-linear-to-t from-background-200 to-transparent group-data-[state=open]/code-collapsible:hidden"
      />
      <Button
        type="button"
        variant="outline"
        size="sm"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((o) => !o)}
        className="absolute inset-x-0 bottom-4 z-10 mx-auto w-fit group-data-[state=open]/code-collapsible:static group-data-[state=open]/code-collapsible:mt-3"
      >
        {open ? "Collapse" : "Expand"}
      </Button>
    </div>
  )
}

export { CodeCollapsible }
