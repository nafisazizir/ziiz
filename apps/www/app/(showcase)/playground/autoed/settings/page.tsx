import type { Metadata } from "next"
import { IconAlertTriangle, IconCircleCheck } from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import { GLOBAL_MAX } from "@/components/autoed/data"
import { List, Page, Section } from "@/components/autoed/page"

export const metadata: Metadata = { title: "Settings" }

function Row({
  label,
  description,
  children,
}: {
  label: string
  description?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1 px-4 py-3">
      <div className="flex min-w-0 flex-col gap-0.5">
        <span className="text-label-14 text-gray-1000">{label}</span>
        {description ? (
          <span className="text-copy-13 text-gray-900">{description}</span>
        ) : null}
      </div>
      <div className="flex items-center gap-2 text-label-13 text-gray-1000">
        {children}
      </div>
    </div>
  )
}

function Check({ ok, children }: { ok: boolean; children: React.ReactNode }) {
  return (
    <span className="flex items-center gap-1.5">
      {ok ? (
        <IconCircleCheck className="size-4 text-green-900" />
      ) : (
        <IconAlertTriangle className="size-4 text-amber-900" />
      )}
      {children}
    </span>
  )
}

const mono = "text-label-13-mono"

export default function SettingsPage() {
  return (
    <Page
      title="Settings"
      description="What autoed doctor found on this Mac. Edit ~/.autoed/config.json to change it."
      actions={<Button variant="outline">Run doctor</Button>}
    >
      <Section title="Backends">
        <List>
          <Row
            label="Claude Code"
            description="Runs claude -p with a scrubbed environment"
          >
            <span className={mono}>~/.local/bin/claude</span>
            <span className="text-gray-900">2.1.282</span>
            <Check ok>Logged in</Check>
          </Row>
          <Row
            label="Devin CLI"
            description="Bundled with Devin.app; sessions land in Devin Desktop"
          >
            <span className={mono}>Devin.app/…/devin</span>
            <span className="text-gray-900">1.42.0</span>
            <Check ok>Logged in</Check>
          </Row>
          <Row label="GitHub" description="Polls with gh api, no inbound port">
            <span className={mono}>/opt/homebrew/bin/gh</span>
            <Check ok>nafisazizir</Check>
          </Row>
        </List>
      </Section>

      <Section title="Engine">
        <List>
          <Row label="Address">
            <span className={mono}>127.0.0.1:4848</span>
          </Row>
          <Row label="Concurrent runs" description="Across every automation">
            {GLOBAL_MAX}
          </Row>
          <Row label="Data directory">
            <span className={mono}>~/.autoed</span>
          </Row>
          <Row label="Log retention">30 days</Row>
          <Row
            label="LaunchAgent"
            description="Starts the engine at login and restarts it if it dies"
          >
            <Check ok>Loaded</Check>
          </Row>
        </List>
      </Section>

      <Section title="Environment">
        <List>
          <Row
            label="ANTHROPIC_API_KEY"
            description="If set, Claude Code bills API credits instead of the subscription"
          >
            <Check ok>Not set</Check>
          </Row>
          <Row label="Sleep" description="pmset sleep 0, autorestart 1">
            <Check ok>Never sleeps</Check>
          </Row>
          <Row
            label="Automatic login"
            description="Needed so the LaunchAgent comes back after a power cut"
          >
            <Check ok={false}>Off</Check>
          </Row>
        </List>
      </Section>
    </Page>
  )
}
