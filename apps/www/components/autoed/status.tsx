import {
  IconCircleCheck,
  IconCircleDashed,
  IconCircleMinus,
  IconCircleX,
  IconClockX,
  IconHourglass,
} from "@tabler/icons-react"

import { cn } from "@/lib/utils"
import { Spinner } from "@/components/ui/spinner"

import type { RunStatus } from "./data"

export const STATUS: Record<
  RunStatus,
  { label: string; tone: "gray" | "blue" | "green" | "red" | "amber" }
> = {
  queued: { label: "Queued", tone: "gray" },
  starting: { label: "Starting", tone: "blue" },
  running: { label: "Running", tone: "blue" },
  succeeded: { label: "Succeeded", tone: "green" },
  failed: { label: "Failed", tone: "red" },
  timed_out: { label: "Timed out", tone: "red" },
  cancelled: { label: "Cancelled", tone: "gray" },
  rate_limited: { label: "Rate limited", tone: "amber" },
}

const TONE = {
  gray: "text-gray-900",
  blue: "text-blue-900",
  green: "text-green-900",
  red: "text-red-900",
  amber: "text-amber-900",
}

export function StatusIcon({
  status,
  className,
}: {
  status: RunStatus
  className?: string
}) {
  const c = cn("size-4 shrink-0", TONE[STATUS[status].tone], className)
  switch (status) {
    case "starting":
    case "running":
      return <Spinner className={c} aria-label={STATUS[status].label} />
    case "succeeded":
      return <IconCircleCheck className={c} aria-label="Succeeded" />
    case "failed":
      return <IconCircleX className={c} aria-label="Failed" />
    case "timed_out":
      return <IconClockX className={c} aria-label="Timed out" />
    case "cancelled":
      return <IconCircleMinus className={c} aria-label="Cancelled" />
    case "rate_limited":
      return <IconHourglass className={c} aria-label="Rate limited" />
    case "queued":
      return <IconCircleDashed className={c} aria-label="Queued" />
  }
}

// A status as a token: one line, read as a unit, so it is a pill.
export function StatusPill({
  status,
  className,
}: {
  status: RunStatus
  className?: string
}) {
  const { label, tone } = STATUS[status]
  return (
    <span
      className={cn(
        "inline-flex h-6 shrink-0 items-center gap-1.5 rounded-full ps-1.5 pe-2.5 text-label-12",
        {
          gray: "bg-gray-100 text-gray-1000",
          blue: "bg-blue-100 text-blue-900",
          green: "bg-green-100 text-green-900",
          red: "bg-red-100 text-red-900",
          amber: "bg-amber-100 text-amber-900",
        }[tone],
        className
      )}
    >
      <StatusIcon status={status} className="size-3.5 text-current" />
      {label}
    </span>
  )
}
