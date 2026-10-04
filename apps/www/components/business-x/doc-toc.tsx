"use client"

import * as React from "react"
import { AnchorProvider, TOCItem } from "fumadocs-core/toc"
import { IconChevronDown } from "@tabler/icons-react"

import type { DocHeading } from "@/components/business-x/doc"
import { XText } from "@/components/business-x/runs"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { cn } from "@/lib/utils"

// An article's section list, twice: a sticky rail beside the column from
// 1024px and, below that, a bar pinned under the header that drops the same
// list. Both read one scroll observer, the docs shell's, so the section in
// view is the one in ink. The bar shares the frame's edge fade's layer and
// comes after it, so the fade never washes it out.
const TocContext = React.createContext<DocHeading[]>([])

export function DocTocProvider({
  toc,
  children,
}: {
  toc: DocHeading[]
  children: React.ReactNode
}) {
  const items = React.useMemo(
    () =>
      toc.map((item) => ({
        title: item.title,
        url: `#${item.id}`,
        depth: item.depth + 2,
      })),
    [toc]
  )

  return (
    <TocContext value={toc}>
      <AnchorProvider toc={items} single>
        {children}
      </AnchorProvider>
    </TocContext>
  )
}

export function DocTocRail({ className }: { className?: string }) {
  const toc = React.use(TocContext)
  if (toc.length === 0) return null

  return (
    <nav
      aria-label="Table of contents"
      className={cn("min-h-0 scrollbar-none overflow-y-auto", className)}
    >
      <TocList toc={toc} className="gap-3 text-label-13" />
    </nav>
  )
}

export function DocTocBar({ className }: { className?: string }) {
  const toc = React.use(TocContext)
  const [open, setOpen] = React.useState(false)
  if (toc.length === 0) return null

  return (
    <Collapsible
      open={open}
      onOpenChange={setOpen}
      className={cn(
        "sticky top-(--header-height) z-30 bg-gray-200 lg:hidden",
        className
      )}
    >
      <CollapsibleTrigger className="group/toc flex min-h-13 w-full items-center justify-between gap-4 px-6 py-4 text-left text-label-16 text-gray-1000 outline-none focus-visible:ring-3 focus-visible:ring-gray-600/50 md:px-14">
        Table of contents
        <IconChevronDown className="size-4 shrink-0 transition-transform group-data-panel-open/toc:rotate-180" />
      </CollapsibleTrigger>
      <CollapsibleContent className="absolute inset-x-0 top-full max-h-[min(28.75rem,calc(100dvh-8rem))] overflow-y-auto overscroll-contain bg-gray-200 px-6 pt-4 pb-6 md:px-14">
        <nav aria-label="Table of contents">
          <TocList
            toc={toc}
            className="gap-3 text-copy-16"
            onNavigate={() => setOpen(false)}
          />
        </nav>
      </CollapsibleContent>
    </Collapsible>
  )
}

function TocList({
  toc,
  className,
  onNavigate,
}: {
  toc: DocHeading[]
  className?: string
  onNavigate?: () => void
}) {
  return (
    <ul className={cn("flex flex-col", className)}>
      {toc.map((item) => (
        <li key={item.id}>
          <TOCItem
            href={`#${item.id}`}
            onClick={onNavigate}
            className={cn(
              "block text-gray-900 transition-colors outline-none hover:text-gray-1000 focus-visible:rounded-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600 data-[active=true]:text-gray-1000",
              item.depth > 0 && "pl-3"
            )}
          >
            <XText>{item.title}</XText>
          </TOCItem>
        </li>
      ))}
    </ul>
  )
}
