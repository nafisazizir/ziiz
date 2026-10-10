import Link from "next/link"
import { IconChevronRight } from "@tabler/icons-react"

import { BASE } from "./base"
import { getAutomation, runTitle, type Run } from "./data"
import { ago, duration, runDuration } from "./format"
import { StatusIcon, STATUS } from "./status"

export function RunRow({
  run,
  meta,
  showAutomation = true,
}: {
  run: Run
  meta?: React.ReactNode
  showAutomation?: boolean
}) {
  const automation = getAutomation(run.automation_id)!
  const title = runTitle(run)
  const ms = runDuration(run)
  return (
    <Link
      href={`${BASE}/runs/${run.id}`}
      className="group flex items-center gap-3 px-4 py-3 transition-colors outline-none hover:bg-gray-alpha-100 focus-visible:bg-gray-alpha-100 active:bg-gray-alpha-200"
    >
      <StatusIcon status={run.status} />
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="truncate text-label-14 text-gray-1000">{title}</span>
        <span className="truncate text-label-13 text-gray-900">
          {[
            showAutomation && automation.name !== title && automation.name,
            STATUS[run.status].label,
            run.event?.label,
          ]
            .filter(Boolean)
            .join(" · ")}
        </span>
      </div>
      <span className="shrink-0 text-end text-label-13 text-gray-900 tabular-nums">
        {meta ??
          (run.finished_at && ms && ms >= 1000
            ? `${duration(ms)} · ${ago(run.finished_at)}`
            : run.finished_at
              ? ago(run.finished_at)
              : ago(run.started_at ?? run.queued_at))}
      </span>
      <IconChevronRight className="size-4 shrink-0 text-gray-700 group-hover:text-gray-1000 rtl:-scale-x-100" />
    </Link>
  )
}
