"use client"

import * as React from "react"
import { ArrowDown01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  AnchorProvider,
  TOCItem,
  useActiveAnchor,
  type TOCItemType,
} from "fumadocs-core/toc"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

// The page's section list, in two shapes. On a wide viewport it is the right
// rail, a sibling of the sidebar with the same sticky frame and the same
// group label. Under that it folds into a disclosure at the head of the
// article, since the rail has nowhere to go. The provider wraps the page so
// both read one observer, and the rail is always mounted so the prose keeps
// its centre on a page with no sections.

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
          className="-mx-2 h-full scrollbar-none overflow-y-auto px-2 py-10"
        >
          <div className="flex h-8 items-center text-label-13 text-gray-900">
            On this page
          </div>
          <TocList items={items} className="mt-1" />
        </nav>
      ) : null}
    </aside>
  )
}

export function DocsTocDisclosure() {
  const items = React.use(TocContext)
  const [open, setOpen] = React.useState(false)
  const active = useActiveAnchor()
  const current = items.find((item) => item.url === `#${active}`)

  if (items.length === 0) return null

  return (
    <Collapsible
      open={open}
      onOpenChange={setOpen}
      data-slot="docs-toc"
      className="not-typeset mt-6 mb-8 border-b border-gray-alpha-400 pb-3 lg:hidden"
    >
      <CollapsibleTrigger
        render={<Button variant="ghost" size="sm" />}
        className="-ml-2.5 gap-1.5 text-gray-900 hover:text-gray-1000 aria-expanded:text-gray-1000"
      >
        On this page
        {current && !open ? (
          <span className="max-w-48 truncate text-gray-1000">
            {current.title}
          </span>
        ) : null}
        <HugeiconsIcon
          icon={ArrowDown01Icon}
          strokeWidth={2}
          aria-hidden
          className="text-gray-700 transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-aria-expanded/button:rotate-180"
        />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <TocList
          items={items}
          className="pt-2 pb-1"
          onNavigate={() => setOpen(false)}
        />
      </CollapsibleContent>
    </Collapsible>
  )
}

// A plain list: the active entry reads as the one in gray-1000, like the
// sidebar's current page, with no rule or marker beside it.
function TocList({
  items,
  className,
  onNavigate,
}: {
  items: TOCItemType[]
  className?: string
  onNavigate?: () => void
}) {
  return (
    <ul className={cn("flex flex-col", className)}>
      {items.map((item) => (
        <li key={item.url} className="flex">
          <TOCItem
            href={item.url}
            onClick={onNavigate}
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
