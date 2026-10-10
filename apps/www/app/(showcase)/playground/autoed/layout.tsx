import type { Metadata } from "next"

import {
  lastActivity,
  runs,
  runTitle,
  getAutomation,
  NOW,
} from "@/components/autoed/data"
import { AutoedShell } from "@/components/autoed/shell"

export const metadata: Metadata = {
  title: { default: "autoed", template: "%s · autoed" },
  description:
    "A read-only mock of autoed, local agent automations, built from stock ziiz components.",
}

function short(ms: number) {
  const m = Math.round((NOW - ms) / 60000)
  if (m < 1) return "now"
  if (m < 60) return `${m}m`
  if (m < 1440) return `${Math.round(m / 60)}h`
  return `${Math.round(m / 1440)}d`
}

// autoed's web UI as an agent app: a sidebar of runs by last activity, each
// run a read-only transcript replayed from its backend's session store.
export default function AutoedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const sidebar = [...runs]
    .sort((a, b) => lastActivity(b) - lastActivity(a))
    .map((run) => ({
      id: run.id,
      title: runTitle(run),
      automation: getAutomation(run.automation_id)!.name,
      status: run.status,
      when: short(lastActivity(run)),
    }))

  return <AutoedShell runs={sidebar}>{children}</AutoedShell>
}
