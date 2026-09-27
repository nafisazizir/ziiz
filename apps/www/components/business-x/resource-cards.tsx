import Link from "next/link"

import type { ArtProps } from "@/components/art/props"
import { XText } from "@/components/business-x/runs"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export type Resource = {
  title: string
  copy: string
  href: string
  action?: string
  art?: (props: ArtProps) => React.ReactNode
  // Anything else to draw in the panel (a phone, a mock) instead of art.
  panel?: React.ReactNode
}

// "Product used", "Further reading": three cards from 768px, each a 17:10
// grey panel with a card drawing, then a title, two lines and a pill pushed
// to the bottom so a row ends level.
export function ResourceCards({
  items,
  panelRatio = "17/10",
  className,
}: {
  items: Resource[]
  // The panel's ratio; the two-up "Further reading" grids use 5:4.
  panelRatio?: "17/10" | "5/4"
  className?: string
}) {
  return (
    <ul
      className={cn(
        "grid grid-cols-1 gap-8 md:auto-rows-fr md:grid-cols-3 md:gap-4",
        items.length === 2 && "md:grid-cols-2",
        className
      )}
    >
      {items.map((item) => {
        const external = /^https?:/.test(item.href)
        return (
          <li key={item.title} className="flex flex-col gap-2">
            <div
              className={cn(
                "relative flex items-center justify-center overflow-hidden bg-gray-100 p-4 text-gray-1000 lg:p-6",
                panelRatio === "5/4" ? "aspect-5/4" : "aspect-17/10"
              )}
            >
              {item.panel ??
                (item.art && <item.art className="max-h-full max-w-full" />)}
            </div>
            <div className="flex flex-1 flex-col gap-4">
              <div className="flex flex-col gap-1">
                <p className="text-label-13 text-gray-1000">
                  <XText>{item.title}</XText>
                </p>
                <p className="text-copy-13 text-gray-900">
                  <XText>{item.copy}</XText>
                </p>
              </div>
              <Button
                shape="rounded"
                size="sm"
                variant="secondary"
                className="mt-auto w-min"
                nativeButton={false}
                render={
                  external ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    />
                  ) : (
                    <Link href={item.href} />
                  )
                }
              >
                {item.action ?? "Read more"}
              </Button>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
