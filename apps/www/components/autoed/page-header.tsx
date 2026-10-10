"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar"

// The bar across the top of the main pane: a tile, so square and hairlined.
// The sidebar toggle lives in the sidebar while it is open and moves here
// when it closes.
export function PageHeader({
  bare = false,
  className,
  children,
}: React.ComponentProps<"header"> & { bare?: boolean }) {
  const { open, isMobile } = useSidebar()
  // A bar with nothing to say but the page title would repeat the h1, so a
  // bare one stays empty and unruled. It still holds its height: the first
  // line below it sits level with the sidebar's first row on every page.
  return (
    <header
      className={cn(
        "sticky top-0 z-10 flex h-13 shrink-0 items-center gap-2 border-b border-gray-alpha-400 bg-background-100 px-3 md:px-4",
        bare && "border-transparent",
        className
      )}
    >
      {!open || isMobile ? <SidebarTrigger className="-ms-1" /> : null}
      {bare ? null : children}
    </header>
  )
}
