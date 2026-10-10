import type { Metadata } from "next"
import { IconPlus } from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import { AutomationsList } from "@/components/autoed/automations-list"
import { automations, runs } from "@/components/autoed/data"
import { ago, modelLabel, triggerLabel } from "@/components/autoed/format"
import { Page } from "@/components/autoed/page"

export const metadata: Metadata = { title: "Automations" }

export default function AutomationsPage() {
  const rows = automations.map((a) => {
    const last = runs.find((r) => r.automation_id === a.id)
    return {
      id: a.id,
      name: a.name,
      enabled: a.enabled,
      trigger: a.triggers[0].kind,
      triggers: a.triggers.map(triggerLabel).join(" · "),
      model: modelLabel(a),
      last: last
        ? {
            status: last.status,
            when: ago(last.finished_at ?? last.started_at ?? last.queued_at),
          }
        : null,
      next: a.next_fire_at ? ago(a.next_fire_at) : null,
    }
  })
  return (
    <Page
      title="Automations"
      description="Triggers that start an agent run on this Mac, with the subscriptions it is already logged in to."
      actions={
        <Button>
          <IconPlus data-icon="inline-start" />
          Create automation
        </Button>
      }
    >
      <AutomationsList rows={rows} />
    </Page>
  )
}
