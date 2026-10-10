import {
  IconAlertTriangle,
  IconBrandGithub,
  IconCalendarTime,
  IconHandClick,
  IconHourglass,
  IconStack2,
  IconWebhook,
} from "@tabler/icons-react"

import { cn } from "@/lib/utils"
import { Spinner } from "@/components/ui/spinner"

import {
  ACTIVE,
  GLOBAL_MAX,
  getAutomation,
  getSession,
  runs,
  runTitle,
  type Run,
} from "./data"
import {
  ago,
  duration,
  modelLabel,
  resumeCommand,
  runDuration,
  stamp,
  tokens,
} from "./format"
import { RunLayout } from "./run-layout"
import { STATUS } from "./status"
import { CopyButton } from "./transcript/disclosure"
import { filesChanged, Transcript } from "./transcript/transcript"

const TRIGGER_ICON = {
  schedule: IconCalendarTime,
  manual: IconHandClick,
  webhook: IconWebhook,
  github: IconBrandGithub,
}

export function RunView({ run }: { run: Run }) {
  const automation = getAutomation(run.automation_id)!
  const session = getSession(run.session_id)
  const files = session ? filesChanged(session.updates) : []
  const TriggerIcon = TRIGGER_ICON[run.trigger]

  return (
    <RunLayout
      automation={automation}
      title={runTitle(run)}
      status={run.status}
      hasSession={Boolean(session)}
    >
      <div className="min-h-0 flex-1 overflow-y-auto">
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 pt-5.25 pb-10 md:px-8">
          <p className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-label-13 text-gray-900">
            <TriggerIcon className="size-4" />
            {run.event?.url ? (
              <a
                href={run.event.url}
                className="text-gray-1000 underline decoration-gray-600 underline-offset-4 hover:decoration-current"
              >
                {run.event.label}
              </a>
            ) : (
              <span className="text-gray-1000">{run.event?.label}</span>
            )}
            {run.event?.missed_count ? (
              <span>· catch-up of {run.event.missed_count} missed fires</span>
            ) : null}
            <span>· {stamp(run.started_at ?? run.queued_at)}</span>
            <span>· {modelLabel(run)}</span>
          </p>

          {session ? (
            <Transcript updates={session.updates} run={run} />
          ) : (
            <NoSession run={run} />
          )}

          {session ? <Outcome run={run} files={files} /> : null}
        </div>
      </div>
      {session && run.session_id ? <ReadOnlyBar run={run} /> : null}
    </RunLayout>
  )
}

// Where the composer would be: the same object, saying why it is not one.
function ReadOnlyBar({ run }: { run: Run }) {
  const cmd = resumeCommand(run)
  return (
    <div className="mx-auto w-full max-w-3xl shrink-0 px-4 pb-4 md:px-8">
      <div className="flex items-center gap-3 rounded-xl border border-gray-alpha-400 bg-background-200 py-2 ps-4 pe-2">
        <p className="min-w-0 flex-1 truncate text-label-13 text-gray-900">
          <span className="max-sm:hidden">
            Read-only. Pick it up in a terminal with{" "}
          </span>
          <code className="text-label-13-mono text-gray-1000">{cmd}</code>
        </p>
        <CopyButton value={cmd} label="Copy resume command" />
      </div>
    </div>
  )
}

// The run's plumbing, said once and only where it is worth reading: a wait
// under a second, a first attempt or the automation's own directory say
// nothing.
function facts(run: Run) {
  const automation = getAutomation(run.automation_id)!
  const waited = run.started_at
    ? Date.parse(run.started_at) - Date.parse(run.queued_at)
    : 0
  return [
    waited >= 1000 && `waited ${duration(waited)} in queue`,
    run.attempt > 1 && `attempt ${run.attempt}`,
    automation.agent_mode,
    run.worktree_path
      ? `worktree ${run.worktree_path.split("/").pop()}`
      : run.working_dir,
  ].filter(Boolean) as string[]
}

function Facts({ run }: { run: Run }) {
  return <p className="text-label-13 text-gray-900">{facts(run).join(" · ")}</p>
}

function Outcome({
  run,
  files,
}: {
  run: Run
  files: ReturnType<typeof filesChanged>
}) {
  if (ACTIVE.includes(run.status))
    return (
      <div className="flex flex-col gap-1">
        <p className="flex items-center gap-2 text-label-14 text-gray-900">
          <Spinner className="text-blue-900" />
          Working · {duration(runDuration(run))} so far
        </p>
        <div className="ps-6">
          <Facts run={run} />
        </div>
      </div>
    )

  const bad = run.status === "failed" || run.status === "timed_out"
  return (
    <section
      className={cn(
        "overflow-hidden rounded-xl border",
        bad ? "border-red-400 bg-red-100" : "border-gray-alpha-400"
      )}
    >
      <header className="flex flex-wrap items-baseline gap-x-3 gap-y-1 px-4 py-3">
        <h2
          className={cn(
            "text-heading-14",
            bad ? "text-red-900" : "text-gray-1000"
          )}
        >
          {STATUS[run.status].label} in {duration(runDuration(run))}
        </h2>
        {run.usage ? (
          <p className="text-label-13 text-gray-900 tabular-nums">
            {tokens(run.usage.input)} in · {tokens(run.usage.output)} out · $
            {run.usage.cost_usd.toFixed(2)} at list price
          </p>
        ) : null}
        {run.exit_code != null ? (
          <p className="text-label-13-mono text-gray-900">
            exit {run.exit_code}
          </p>
        ) : null}
      </header>
      <div className="-mt-2 px-4 pb-3">
        <Facts run={run} />
      </div>
      {run.error ? (
        <p className="border-t border-red-400 px-4 py-3 text-copy-14 text-red-900">
          {run.error}
        </p>
      ) : null}
      {files.length ? (
        <ul className="border-t border-gray-alpha-400">
          {files.map((f) => (
            <li
              key={f.path}
              className="flex items-center gap-3 border-b border-gray-alpha-400 px-4 py-2 last:border-b-0"
            >
              <span className="min-w-0 flex-1 truncate text-label-13-mono text-gray-1000">
                {f.path}
              </span>
              <span className="flex shrink-0 gap-1.5 text-label-12-mono tabular-nums">
                <span className="text-green-900">+{f.add}</span>
                <span className="text-red-900">−{f.del}</span>
              </span>
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  )
}

function NoSession({ run }: { run: Run }) {
  const ahead = runs.filter(
    (r) => r.status === "queued" && r.queued_at < run.queued_at
  ).length
  const busy = runs.filter((r) => ACTIVE.includes(r.status)).length
  const copy = {
    queued: {
      icon: IconStack2,
      title: `Waiting for a slot`,
      body: `${ahead ? `${ahead} ahead in line. ` : "Next in line. "}${busy} of ${GLOBAL_MAX} slots are busy; it starts as soon as one frees up. Queued ${ago(run.queued_at)}.`,
    },
    rate_limited: {
      icon: IconHourglass,
      title: `Retrying ${ago(run.next_attempt_at)}`,
      body: `${run.error} Attempt ${run.attempt} goes back in the queue at ${stamp(run.next_attempt_at)}. This does not count against the automation's own rate limit.`,
    },
  }[run.status as "queued" | "rate_limited"] ?? {
    icon: IconAlertTriangle,
    title: "The agent never started",
    body: run.error ?? "No session was recorded for this run.",
  }
  const Icon = copy.icon
  return (
    <div className="flex flex-col items-start gap-3 rounded-xl border border-dashed border-gray-alpha-500 px-6 py-8">
      <Icon className="size-5 text-gray-900" />
      <h2 className="text-heading-16 text-gray-1000">{copy.title}</h2>
      <p className="max-w-prose text-copy-14 text-gray-900">{copy.body}</p>
    </div>
  )
}
