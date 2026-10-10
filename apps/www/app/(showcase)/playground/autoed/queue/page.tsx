import type { Metadata } from "next"

import { ACTIVE, GLOBAL_MAX, runs } from "@/components/autoed/data"
import { ago, stamp } from "@/components/autoed/format"
import { List, Page, Section } from "@/components/autoed/page"
import { RunRow } from "@/components/autoed/run-row"

export const metadata: Metadata = { title: "Queue" }

export default function QueuePage() {
  const running = runs.filter((r) => ACTIVE.includes(r.status))
  const queued = runs
    .filter((r) => r.status === "queued")
    .sort((a, b) => a.queued_at.localeCompare(b.queued_at))
  const limited = runs.filter((r) => r.status === "rate_limited")
  const slots = Array.from({ length: GLOBAL_MAX }, (_, i) => running[i])

  return (
    <Page
      title="Queue"
      description={`${running.length} of ${GLOBAL_MAX} slots busy. The oldest queued run whose automation is under its own limits starts as soon as a slot frees up.`}
    >
      <Section title="Slots">
        <List>
          {slots.map((run, i) =>
            run ? (
              <RunRow
                key={run.id}
                run={run}
                meta={`slot ${i + 1} · ${ago(run.started_at)}`}
              />
            ) : (
              <p key={i} className="px-4 py-3 text-label-14 text-gray-900">
                Slot {i + 1} idle
              </p>
            )
          )}
        </List>
      </Section>

      <Section title="Queued" description="In dispatch order.">
        {queued.length ? (
          <List>
            {queued.map((run, i) => (
              <RunRow
                key={run.id}
                run={run}
                meta={`#${i + 1} · ${ago(run.queued_at)}`}
              />
            ))}
          </List>
        ) : (
          <p className="text-copy-14 text-gray-900">Nothing waiting.</p>
        )}
      </Section>

      <Section
        title="Rate limited"
        description="Hit a subscription usage limit. They requeue at the reset time and do not spend the automation's own budget."
      >
        <List>
          {limited.map((run) => (
            <RunRow
              key={run.id}
              run={run}
              meta={`retries ${stamp(run.next_attempt_at)}`}
            />
          ))}
        </List>
      </Section>
    </Page>
  )
}
