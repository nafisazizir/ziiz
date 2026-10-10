import type { Metadata } from "next"
import Link from "next/link"
import { IconChevronRight } from "@tabler/icons-react"

import { BASE } from "@/components/autoed/base"
import {
  ACTIVE,
  automations,
  NOW,
  runs,
  WAITING,
} from "@/components/autoed/data"
import { ago, triggerLabel } from "@/components/autoed/format"
import { List, Page, Section } from "@/components/autoed/page"
import { RunRow } from "@/components/autoed/run-row"

export const metadata: Metadata = { title: "Overview" }

const DAY = 86_400_000

export default function OverviewPage() {
  const now = runs.filter(
    (r) => ACTIVE.includes(r.status) || WAITING.includes(r.status)
  )
  const attention = runs.filter(
    (r) => r.status === "failed" || r.status === "timed_out"
  )
  const week = runs.filter((r) => NOW - Date.parse(r.queued_at) < 7 * DAY)
  const ok = week.filter((r) => r.status === "succeeded").length
  const next = automations
    .filter((a) => a.enabled && a.next_fire_at)
    .sort((a, b) => a.next_fire_at!.localeCompare(b.next_fire_at!))

  const stats = [
    { label: "Runs this week", value: week.length },
    {
      label: "Succeeded",
      value: `${Math.round((ok / Math.max(1, week.length)) * 100)}%`,
    },
    { label: "Needs attention", value: attention.length },
    { label: "Next run", value: ago(next[0]?.next_fire_at ?? null) },
  ]

  return (
    <Page
      title="Overview"
      description="What the engine on spare-mac.local is doing, and what it did."
    >
      <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-gray-alpha-400 bg-gray-alpha-400 md:grid-cols-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="flex flex-col gap-1 bg-background-100 px-5 py-4"
          >
            <dt className="text-label-13 text-gray-900">{s.label}</dt>
            <dd className="text-heading-24 text-gray-1000 tabular-nums">
              {s.value}
            </dd>
          </div>
        ))}
      </dl>

      <Section
        title="Now"
        description="Running, queued and waiting out a usage limit."
      >
        <List>
          {now.map((run) => (
            <RunRow key={run.id} run={run} />
          ))}
        </List>
      </Section>

      <Section
        title="Needs attention"
        description="Failed or timed out in the last week."
      >
        <List>
          {attention.map((run) => (
            <RunRow key={run.id} run={run} />
          ))}
        </List>
      </Section>

      <Section title="Up next">
        <List>
          {next.map((a) => (
            <Link
              key={a.id}
              href={`${BASE}/automations/${a.id}`}
              className="group flex items-center gap-3 px-4 py-3 transition-colors outline-none hover:bg-gray-alpha-100 focus-visible:bg-gray-alpha-100 active:bg-gray-alpha-200"
            >
              <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                <span className="truncate text-label-14 text-gray-1000">
                  {a.name}
                </span>
                <span className="truncate text-label-13 text-gray-900">
                  {a.triggers.map(triggerLabel).join(" · ")}
                </span>
              </div>
              <span className="shrink-0 text-label-13 text-gray-900 tabular-nums">
                {ago(a.next_fire_at)}
              </span>
              <IconChevronRight className="size-4 shrink-0 text-gray-700 group-hover:text-gray-1000 rtl:-scale-x-100" />
            </Link>
          ))}
        </List>
      </Section>
    </Page>
  )
}
