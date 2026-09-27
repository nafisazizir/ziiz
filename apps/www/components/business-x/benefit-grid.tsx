import { HugeiconsIcon } from "@hugeicons/react"
import type { IconSvgElement } from "@hugeicons/react"

import type { ArtProps } from "@/components/art/props"
import { XText } from "@/components/business-x/runs"
import { cn } from "@/lib/utils"

type Mark = (props: ArtProps) => React.ReactNode

export type Benefit = {
  title: string
  copy: React.ReactNode
  mark?: Mark
  icon?: IconSvgElement
  // Where the item sits on the three-column grid; the first row on
  // "Why advertise" starts one column in.
  start?: 2 | 3
}

// Short titled paragraphs under a hairline, three across from 1024px and
// two below, each with one of the 84px line-art marks at its foot (72px
// under 1024px). Text and mark are pushed apart so a row's marks sit level.
export function BenefitGrid({
  items,
  columns = 4,
  className,
}: {
  items: Benefit[]
  // Four columns of the eight-column grid, the Why X page's three wider
  // ones (single column under 768px, hairlines touching), or "thirds": items
  // three columns wide on the eight-column grid, the first row starting at
  // the third column (the takeover pages).
  columns?: 3 | 4 | "thirds"
  className?: string
}) {
  return (
    <ul
      className={cn(
        columns === 4 &&
          "grid grid-cols-2 gap-x-4 gap-y-12 lg:grid-cols-4 lg:gap-y-12",
        columns === 3 &&
          "grid grid-cols-1 gap-x-6 max-lg:gap-y-0 md:grid-cols-2 lg:grid-cols-3 lg:gap-y-14",
        columns === "thirds" &&
          "grid grid-cols-2 gap-x-4 gap-y-12 lg:grid-cols-8 lg:gap-y-12",
        className
      )}
    >
      {items.map((item) => (
        <li
          key={item.title}
          className={cn(
            "flex flex-col items-start gap-6 border-t border-gray-alpha-400 lg:gap-12",
            columns === 3 ? "max-lg:py-6 lg:pt-4" : "pt-4 lg:pt-6",
            columns === "thirds" && "lg:col-span-3",
            item.start === 2 &&
              (columns === "thirds" ? "lg:col-start-3" : "lg:col-start-2"),
            item.start === 3 && "lg:col-start-3"
          )}
        >
          <div className="flex flex-col">
            <h3 className="text-label-13 text-gray-1000">
              <XText>{item.title}</XText>
            </h3>
            <p className="text-copy-13 text-balance text-gray-900">
              {item.copy}
            </p>
          </div>
          {item.mark && (
            <div className="mt-auto grid size-18 place-items-center text-gray-1000 lg:size-27">
              <item.mark className="size-full" />
            </div>
          )}
        </li>
      ))}
    </ul>
  )
}

// The same paragraphs with a 24px icon on top instead of a mark below, in
// three columns from 1024px and two from 768px. Above 1024px the rows keep
// 32px between them; below, the hairlines run edge to edge with 24px of
// padding either side and no gap.
export function IconGrid({
  items,
  columns = 3,
  className,
}: {
  items: Benefit[]
  columns?: 2 | 3
  className?: string
}) {
  return (
    <ul
      className={cn(
        "grid grid-cols-1 gap-x-8 max-lg:gap-y-0 md:grid-cols-2 lg:gap-y-8",
        columns === 3 && "lg:grid-cols-3",
        className
      )}
    >
      {items.map((item) => (
        <li
          key={item.title}
          className="flex flex-col gap-4 border-t border-gray-alpha-400 max-lg:py-6 lg:pt-6 lg:pb-10"
        >
          {item.icon && (
            <HugeiconsIcon
              icon={item.icon}
              strokeWidth={1.5}
              className="size-6 text-gray-1000"
            />
          )}
          {item.mark && <item.mark className="size-6 text-gray-1000" />}
          <div className="flex flex-col gap-1">
            <h3 className="text-label-13 text-gray-1000">
              <XText>{item.title}</XText>
            </h3>
            <div className="flex flex-col gap-2 text-copy-13 text-gray-900 [&_a]:text-gray-1000 [&_a]:underline [&_a]:underline-offset-2">
              {item.copy}
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}
