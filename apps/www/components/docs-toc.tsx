"use client"

import * as React from "react"
import { AnchorProvider, TOCItem, type TOCItemType } from "fumadocs-core/toc"

import { cn } from "@/lib/utils"

// The page's section list as the right rail, a sibling of the sidebar with
// the same sticky frame and the same group label. Below that breakpoint the
// rail has nowhere to go, so the page carries no section list at all. The
// provider wraps the page so the rail reads one observer, and the rail is
// always mounted so the prose keeps its centre on a page with no sections.

const MAX_DEPTH = 3

const TocContext = React.createContext<TOCItemType[]>([])

export function DocsTocProvider({
  toc,
  children,
}: {
  toc: TOCItemType[]
  children: React.ReactNode
}) {
  const items = React.useMemo(
    () => toc.filter((item) => item.depth > 1 && item.depth <= MAX_DEPTH),
    [toc]
  )

  return (
    <TocContext value={items}>
      <AnchorProvider toc={items} single>
        {children}
      </AnchorProvider>
    </TocContext>
  )
}

export function DocsTocRail() {
  const items = React.use(TocContext)

  return (
    <aside
      data-slot="docs-toc"
      className="sticky top-(--header-height) hidden h-[calc(100svh-var(--header-height))] w-60 shrink-0 lg:block"
    >
      {items.length > 0 ? (
        <nav
          aria-label="On this page"
          className="-mx-2 h-full scrollbar-none overflow-y-auto px-2 pt-(--content-top) pb-10"
        >
          <div className="flex h-8 items-center text-heading-14 text-gray-1000">
            On this page
          </div>
          <TocList items={items} className="mt-1" />
        </nav>
      ) : null}
    </aside>
  )
}

// A plain list: the active entry reads as the one in gray-1000, like the
// sidebar's current page, with no rule or marker beside it.
function TocList({
  items,
  className,
}: {
  items: TOCItemType[]
  className?: string
}) {
  return (
    <ul className={cn("flex flex-col", className)}>
      {items.map((item) => (
        <li key={item.url} className="flex">
          <TOCItem
            href={item.url}
            data-depth={item.depth}
            className={cn(
              "flex min-h-7 w-full items-center py-1 pr-2 text-label-13 text-gray-900 no-underline transition-colors duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] outline-none hover:text-gray-1000 focus-visible:rounded-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600 data-[active=true]:text-gray-1000",
              "data-[depth=3]:pl-3"
            )}
          >
            {item.title}
          </TOCItem>
        </li>
      ))}
    </ul>
  )
}
