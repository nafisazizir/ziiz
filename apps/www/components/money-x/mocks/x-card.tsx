"use client"

import * as React from "react"
import { IconCreditCard } from "@tabler/icons-react"

import { XLogo } from "@/components/business-x/x-logo"
import { cn } from "@/lib/utils"

// The X Card as a stand-in for the site's render: a brushed slab with the
// chip and an oversized mark on the front, the stripe and a signature strip
// on the back. Size comes from the width the caller gives it.
export function XCard({
  side = "front",
  className,
}: {
  side?: "front" | "back"
  className?: string
}) {
  return (
    <div
      className={cn(
        "[container-type:inline-size] relative aspect-[1.586] w-48 shrink-0 overflow-hidden rounded-[6%/9.5%] bg-linear-to-br from-gray-400 to-gray-600",
        className
      )}
    >
      {side === "front" ? (
        <>
          <XLogo className="absolute top-1/2 right-[-4%] size-[62%] -translate-y-1/2 text-gray-300" />
          <span className="absolute top-1/2 left-[9%] h-[20%] w-[15%] -translate-y-1/2 rounded-[18%] border border-gray-200 bg-gray-300" />
        </>
      ) : (
        <>
          <span className="absolute inset-x-0 top-[14%] h-[20%] bg-gray-900" />
          <span className="absolute top-[48%] left-[9%] h-[14%] w-[56%] bg-gray-200" />
          <span className="absolute bottom-[14%] left-[9%] h-[3%] w-[38%] bg-gray-300" />
        </>
      )}
    </div>
  )
}

const sides = ["front", "back"] as const

// "Meet the X Card": the card beside a Front / Back legend. The whole
// scene is one button that turns the card over, as on the site.
export function CardFlip() {
  const [side, setSide] = React.useState<(typeof sides)[number]>("front")

  return (
    <button
      type="button"
      aria-label={`Show the ${side === "front" ? "back" : "front"} of the card`}
      onClick={() => setSide(side === "front" ? "back" : "front")}
      className="relative flex h-[189px] w-[434px] shrink-0 items-center rounded-md outline-none focus-visible:ring-3 focus-visible:ring-gray-600/50"
    >
      <span className="absolute left-[81px] flex flex-col gap-2">
        {sides.map((item) => (
          <span
            key={item}
            className={cn(
              "flex items-center gap-1.5 text-label-12 capitalize transition-colors",
              item === side ? "text-gray-1000" : "text-gray-700"
            )}
          >
            <IconCreditCard className="size-3.5" />
            {item}
          </span>
        ))}
      </span>
      <XCard side={side} className="absolute left-[169px] w-[190px]" />
    </button>
  )
}
