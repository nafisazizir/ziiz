import { HugeiconsIcon } from "@hugeicons/react"
import type { IconSvgElement } from "@hugeicons/react"

import { XText } from "@/components/business-x/runs"
import { cn } from "@/lib/utils"

export type IconRow = {
  icon: IconSvgElement
  title: string
  copy: React.ReactNode
}

// Rows of a 20px icon beside a title, the copy indented under the title,
// hairlines between rows.
export function IconList({
  items,
  className,
}: {
  items: IconRow[]
  className?: string
}) {
  return (
    <ul className={cn("flex flex-col gap-6", className)}>
      {items.map((item) => (
        <li
          key={item.title}
          className="flex flex-col not-first:border-t not-first:border-gray-alpha-400 not-first:pt-6"
        >
          <div className="flex items-center gap-4">
            <HugeiconsIcon
              icon={item.icon}
              strokeWidth={1.5}
              className="size-5 shrink-0 text-gray-1000"
            />
            <h3 className="text-label-13 text-gray-1000">
              <XText>{item.title}</XText>
            </h3>
          </div>
          <div className="mt-2 flex flex-col gap-2 pl-9 text-copy-13 text-gray-900 [&_a]:text-gray-1000 [&_a]:underline [&_a]:underline-offset-2">
            {item.copy}
          </div>
        </li>
      ))}
    </ul>
  )
}

// The list in three columns beside a grey panel in five, from 1024px; below
// that the panel follows the list at the site's 690:614 ratio. The panel's
// content is inset from the top left so a mock can bleed off the bottom
// right, the way x.com's screenshots do.
export function IconListPanel({
  items,
  children,
  className,
}: {
  items: IconRow[]
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-10 lg:grid lg:grid-cols-8 lg:gap-x-4 lg:gap-y-0",
        className
      )}
    >
      <IconList items={items} className="lg:col-span-3 lg:py-6" />
      <Panel className="lg:col-span-5">{children}</Panel>
    </div>
  )
}

export function Panel({
  className,
  inset = true,
  children,
}: {
  className?: string
  inset?: boolean
  children: React.ReactNode
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-gray-100 max-lg:aspect-[690/614]",
        className
      )}
    >
      <div
        className={cn(
          "absolute inset-0",
          inset && "top-10 left-10 lg:top-20 lg:left-20"
        )}
      >
        {children}
      </div>
    </div>
  )
}
