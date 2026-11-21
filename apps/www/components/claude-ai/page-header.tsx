"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar"

/** The bar across the top of the main pane. While the sidebar is closed
 *  (or a sheet, on mobile) its toggle lives here, on the same pixels as the
 *  sidebar's own: 48px tall and 12px in puts a 32px button at 12, 8. */
export function PageHeader({
  className,
  children,
}: React.ComponentProps<"header">) {
  const { open, isMobile } = useSidebar()
  return (
    <header
      className={cn(
        "sticky top-0 z-10 flex h-12 shrink-0 items-center gap-2 bg-background-100 px-3",
        className
      )}
    >
      {!open || isMobile ? <SidebarTrigger /> : null}
      {children}
    </header>
  )
}
