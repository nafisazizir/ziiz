import type { Metadata } from "next"
import { notFound } from "next/navigation"
import {
  IconBrandGithub,
  IconCalendarTime,
  IconHandClick,
  IconPlayerPlay,
  IconWebhook,
} from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { BASE } from "@/components/autoed/base"
import {
  automations,
  getAutomation,
  runs,
  type Trigger,
} from "@/components/autoed/data"
import { ago, cron, duration } from "@/components/autoed/format"
import { List, Page, Section } from "@/components/autoed/page"
import { RunRow } from "@/components/autoed/run-row"

export function generateStaticParams() {
  return automations.map((a) => ({ id: a.id }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const a = getAutomation((await params).id)
  return a ? { title: a.name } : {}
}

// A value inside a sentence: one line, read as a unit, so a pill.
function Token({
  children,
  mono,
}: {
  children: React.ReactNode
  mono?: boolean
}) {
  return (
    <span
      className={
        "inline-flex h-6 items-center rounded-full bg-blue-100 px-2.5 text-blue-900 " +
        (mono ? "text-label-12-mono" : "text-label-13")
      }
    >
      {children}
    </span>
  )
}

const ICON = {
  schedule: IconCalendarTime,
  manual: IconHandClick,
  webhook: IconWebhook,
  github: IconBrandGithub,
}

function TriggerLine({ t, id }: { t: Trigger; id: string }) {
  const Icon = ICON[t.kind]
  return (
    <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5 px-4 py-3 text-label-13 text-gray-900">
      <Icon className="size-4 text-gray-1000" />
      {t.kind === "schedule" ? (
        <>
          <Token>{cron(t.config.cron)}</Token>in<Token>{t.config.tz}</Token>
          <span className="text-label-12-mono text-gray-700">
            {t.config.cron}
          </span>
        </>
      ) : t.kind === "github" ? (
        <>
          <Token>{t.config.events.join(", ")}</Token>in repo
          <Token mono>{t.config.repo}</Token>
          {t.config.filter ? (
            <>
              and<Token mono>{t.config.filter}</Token>
            </>
          ) : null}
          polled every
          <Token>{duration((t.config.intervalSec ?? 300) * 1000)}</Token>
        </>
      ) : t.kind === "webhook" ? (
        <>
          POST<Token mono>/hooks/{t.id}</Token>with
          <Token>{t.config.hmac ? "HMAC signature" : "X-Autoed-Secret"}</Token>
        </>
      ) : (
        <>
          <Token>Run now</Token>from this page or
          <Token mono>autoed run {id}</Token>
        </>
      )}
    </div>
  )
}

function Field({
  label,
  description,
  children,
}: {
  label: string
  description?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-3">
      <div className="flex min-w-0 flex-col gap-0.5">
        <span className="text-label-14 text-gray-1000">{label}</span>
        {description ? (
          <span className="text-copy-13 text-gray-900">{description}</span>
        ) : null}
      </div>
      <div className="text-label-14 text-gray-1000">{children}</div>
    </div>
  )
}

export default async function AutomationPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const a = getAutomation((await params).id)
  if (!a) notFound()
  const history = runs.filter((r) => r.automation_id === a.id)
  const mono = "text-label-13-mono"
  return (
    <Page
      title={a.name}
      crumbs={[{ label: "Automations", href: `${BASE}/automations` }]}
      description={
        a.next_fire_at && a.enabled
          ? `Next run ${ago(a.next_fire_at)}`
          : a.enabled
            ? "Runs when triggered"
            : "Paused"
      }
      actions={
        <div className="flex items-center gap-3">
          <Switch defaultChecked={a.enabled} aria-label="Enabled" />
          <Button variant="outline">Edit</Button>
          <Button>
            <IconPlayerPlay data-icon="inline-start" />
            Run now
          </Button>
        </div>
      }
    >
      <Section
        title="Triggers"
        description="Run automation when any of these conditions are met."
      >
        <List>
          {a.triggers.map((t) => (
            <TriggerLine key={t.id} t={t} id={a.id} />
          ))}
        </List>
      </Section>

      <Section
        title="Agent definition"
        description="What happens when a trigger fires."
      >
        <List>
          <Field
            label="Backend"
            description="A CLI already logged in on this Mac"
          >
            {a.backend === "claude" ? "Claude Code" : "Devin CLI"}
          </Field>
          <Field label="Model">{a.model}</Field>
          <Field
            label="Agent mode"
            description="Permission mode passed to the CLI"
          >
            <span className={mono}>{a.agent_mode}</span>
          </Field>
          <Field label="Working directory">
            <span className={mono}>{a.working_dir}</span>
          </Field>
          <Field
            label="Isolated worktree"
            description="A git worktree per run under ~/.autoed/worktrees"
          >
            <Switch
              defaultChecked={a.isolate_worktree}
              aria-label="Isolated worktree"
            />
          </Field>
          <Field
            label="Continue session"
            description="Resume the last successful session"
          >
            <Switch
              defaultChecked={a.continue_session}
              aria-label="Continue session"
            />
          </Field>
          <div className="flex flex-col gap-2 px-4 py-3">
            <span className="text-label-14 text-gray-1000">Instructions</span>
            <pre className="rounded-lg border border-gray-alpha-400 bg-background-200 px-4 py-3 text-copy-13-mono whitespace-pre-wrap text-gray-1000">
              {a.instructions}
            </pre>
          </div>
        </List>
      </Section>

      <Section title="Limits">
        <List>
          <Field label="Timeout">{duration(a.timeout_sec * 1000)}</Field>
          <Field label="Concurrent runs">{a.max_concurrent}</Field>
          <Field label="Rate limit">
            {a.rate_limit
              ? `${a.rate_limit.count} per ${duration(a.rate_limit.window_sec * 1000)}`
              : "None"}
          </Field>
          <Field
            label="Catch-up"
            description="Fires missed while the Mac was asleep or off"
          >
            <span className="capitalize">{a.catchup_policy}</span>
          </Field>
        </List>
      </Section>

      {a.allowed_tools.length || a.disallowed_tools.length ? (
        <Section title="Tools">
          <List>
            {a.allowed_tools.length ? (
              <Field label="Allowed">
                <span className="flex flex-wrap justify-end gap-1.5">
                  {a.allowed_tools.map((t) => (
                    <Token key={t} mono>
                      {t}
                    </Token>
                  ))}
                </span>
              </Field>
            ) : null}
            {a.disallowed_tools.length ? (
              <Field label="Disallowed">
                <span className="flex flex-wrap justify-end gap-1.5">
                  {a.disallowed_tools.map((t) => (
                    <Token key={t} mono>
                      {t}
                    </Token>
                  ))}
                </span>
              </Field>
            ) : null}
          </List>
        </Section>
      ) : null}

      <Section title="Notifications">
        <List>
          <Field label="macOS notification">
            <Switch
              defaultChecked={Boolean(a.notify.macos)}
              aria-label="macOS notification"
            />
          </Field>
          <Field label="Webhook">
            {a.notify.webhook ? (
              <span className={mono}>{a.notify.webhook.url}</span>
            ) : (
              <span className="text-gray-900">None</span>
            )}
          </Field>
        </List>
      </Section>

      <Section title="Runs">
        {history.length ? (
          <List>
            {history.map((r) => (
              <RunRow key={r.id} run={r} showAutomation={false} />
            ))}
          </List>
        ) : (
          <p className="text-copy-14 text-gray-900">No runs yet.</p>
        )}
      </Section>
    </Page>
  )
}
