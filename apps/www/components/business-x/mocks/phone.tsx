import { HugeiconsIcon } from "@hugeicons/react"
import {
  BatteryFullIcon,
  SignalFull01Icon,
  Wifi01Icon,
} from "@hugeicons/core-free-icons"

import { cn } from "@/lib/utils"

// A phone at a fixed 300x620, so a screen composed of ziiz components can
// be zoomed into any panel. The frame is drawn with the ink colour and the
// screen is the page surface; the status bar keeps the site's 9:41.
export function Phone({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <div
      className={cn(
        "relative flex h-155 w-75 shrink-0 flex-col overflow-hidden rounded-[2.75rem] border-[6px] border-gray-1000 bg-background-100 text-gray-1000 shadow-[0_0_0_1px_var(--ds-gray-alpha-400)]",
        className
      )}
    >
      <div className="flex h-12 shrink-0 items-center justify-between px-6 pt-2 text-label-13">
        <span>9:41</span>
        <span
          aria-hidden
          className="absolute top-2.5 left-1/2 h-7 w-24 -translate-x-1/2 rounded-full bg-gray-1000"
        />
        <span className="flex items-center gap-1">
          <HugeiconsIcon
            icon={SignalFull01Icon}
            strokeWidth={2}
            className="size-3.5"
          />
          <HugeiconsIcon
            icon={Wifi01Icon}
            strokeWidth={2}
            className="size-3.5"
          />
          <HugeiconsIcon
            icon={BatteryFullIcon}
            strokeWidth={2}
            className="size-4"
          />
        </span>
      </div>
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
        {children}
      </div>
      <span
        aria-hidden
        className="absolute bottom-2 left-1/2 h-1 w-28 -translate-x-1/2 rounded-full bg-gray-1000"
      />
    </div>
  )
}
