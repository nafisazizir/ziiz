import {
  IconAlertTriangle,
  IconBrain,
  IconCircleCheck,
  IconCircleDashed,
  IconFileText,
  IconListCheck,
  IconPencil,
  IconPuzzle,
  IconSearch,
  IconSubtask,
  IconTerminal2,
  IconWorld,
} from "@tabler/icons-react"

import { cn } from "@/lib/utils"
import { Bubble, BubbleContent } from "@/components/ui/bubble"
import { Spinner } from "@/components/ui/spinner"

import type { Run } from "../data"
import { duration } from "../format"
import type {
  PlanEntry,
  SessionUpdate,
  ToolCall,
  ToolCallContent,
} from "../types"
import { DiffHunk, diffStats } from "./diff"
import { Clamp, Disclosure, FollowTail } from "./disclosure"
import { Prose } from "./prose"

type Diff = Extract<ToolCallContent, { type: "diff" }>
type Thought = Extract<SessionUpdate, { sessionUpdate: "agent_thought_chunk" }>
type Step = ToolCall | Thought

type Item =
  | { type: "prompt"; text: string }
  | { type: "text"; text: string }
  | { type: "activity"; steps: Step[] }
  | { type: "edit"; call: ToolCall; diffs: Diff[] }
  | { type: "plan"; entries: PlanEntry[] }

// Reads the update stream into what a person scans: prose stands alone,
// edits stand alone as diffs, and everything between (thoughts, reads,
// searches, commands) folds into one line of activity per stretch.
export function toItems(updates: SessionUpdate[]): Item[] {
  const items: Item[] = []
  const activity = () => {
    const last = items[items.length - 1]
    if (last?.type === "activity") return last
    const next: Item = { type: "activity", steps: [] }
    items.push(next)
    return next
  }
  for (const u of updates) {
    switch (u.sessionUpdate) {
      case "user_message_chunk":
        items.push({ type: "prompt", text: u.content.text })
        break
      case "agent_message_chunk":
        items.push({ type: "text", text: u.content.text })
        break
      case "agent_thought_chunk":
        activity().steps.push(u)
        break
      case "plan":
        items.push({ type: "plan", entries: u.entries })
        break
      case "tool_call": {
        const diffs = (u.content ?? []).filter(
          (c): c is Diff => c.type === "diff"
        )
        if (u.kind === "edit" && diffs.length)
          items.push({ type: "edit", call: u, diffs })
        else if (u._meta.tool !== "TodoWrite") activity().steps.push(u)
      }
    }
  }
  return items
}

export function filesChanged(updates: SessionUpdate[]) {
  const files = new Map<string, Diff[]>()
  for (const u of updates)
    if (u.sessionUpdate === "tool_call" && u.kind === "edit")
      for (const c of u.content ?? [])
        if (c.type === "diff" && !c.path.startsWith("$TMPDIR"))
          files.set(c.path, [...(files.get(c.path) ?? []), c])
  return [...files].map(([path, hunks]) => ({ path, ...diffStats(hunks) }))
}

const KIND_ICON: Record<string, React.ComponentType<{ className?: string }>> = {
  read: IconFileText,
  search: IconSearch,
  execute: IconTerminal2,
  fetch: IconWorld,
  think: IconSubtask,
  edit: IconPencil,
}

function stepTitle(call: ToolCall) {
  if (/^Read file$/.test(call.title) && call.locations?.[0])
    return `Read ${call.locations[0].path}`
  return call.title.replace(/^Ran /, "")
}

function summarize(steps: Step[]) {
  const n = { read: 0, search: 0, execute: 0, fetch: 0, think: 0, other: 0 }
  let thoughts = 0
  for (const s of steps) {
    if (s.sessionUpdate === "agent_thought_chunk") thoughts++
    else n[(s.kind in n ? s.kind : "other") as keyof typeof n]++
  }
  const parts = [
    n.read && `read ${n.read} ${n.read === 1 ? "file" : "files"}`,
    n.search && `searched ${n.search} ${n.search === 1 ? "time" : "times"}`,
    n.execute && `ran ${n.execute} ${n.execute === 1 ? "command" : "commands"}`,
    n.fetch && `fetched ${n.fetch} ${n.fetch === 1 ? "page" : "pages"}`,
    n.think && `${n.think} ${n.think === 1 ? "subagent" : "subagents"}`,
    n.other && `${n.other} other ${n.other === 1 ? "step" : "steps"}`,
  ].filter(Boolean) as string[]
  if (!parts.length)
    return `Thought ${thoughts === 1 ? "once" : `${thoughts} times`}`
  const s = parts.join(", ")
  return s[0].toUpperCase() + s.slice(1)
}

function spanMs(steps: Step[]) {
  const first = Date.parse(steps[0]._meta.at)
  const last = steps[steps.length - 1]
  const end = Date.parse(last._meta.at) + (last._meta.durationMs ?? 0)
  return end - first
}

function Output({ children }: { children: string }) {
  return (
    <Clamp lines={10} fade="from-background-200">
      <pre className="px-3 py-2 text-copy-13-mono whitespace-pre-wrap text-gray-1000">
        {children}
      </pre>
    </Clamp>
  )
}

// Detail panels are objects nested in the transcript column: one radius
// step under the column's cards.
function Panel({ children }: { children: React.ReactNode }) {
  return (
    <div className="ms-6 overflow-hidden rounded-lg border border-gray-alpha-400 bg-background-200">
      {children}
    </div>
  )
}

function StepRow({
  step,
  live,
  interrupted,
}: {
  step: Step
  live: boolean
  interrupted: boolean
}) {
  if (step.sessionUpdate === "agent_thought_chunk") {
    const text = step.content.text
    return (
      <Disclosure
        icon={<IconBrain />}
        label={
          step._meta.durationMs && step._meta.durationMs > 1500
            ? `Thought for ${duration(step._meta.durationMs)}`
            : "Thought"
        }
        disabled={!text}
      >
        <Prose className="ms-6 border-s border-gray-alpha-400 ps-3 text-gray-900">
          {text}
        </Prose>
      </Disclosure>
    )
  }

  const Icon = KIND_ICON[step.kind] ?? IconPuzzle
  const running = step.status === "in_progress" || step.status === "pending"
  const failed = step.status === "failed"
  const input = (step.rawInput ?? {}) as Record<string, unknown>
  const command = typeof input.command === "string" ? input.command : null
  const prompt =
    step.kind === "think" && typeof input.prompt === "string"
      ? input.prompt
      : null
  const output = (step.content ?? [])
    .filter((c) => c.type === "content")
    .map((c) => c.content.text)
    .join("\n")
  const title = stepTitle(step)

  return (
    <Disclosure
      icon={
        running && live ? (
          <Spinner />
        ) : failed ? (
          <IconAlertTriangle />
        ) : (
          <Icon />
        )
      }
      tone={failed ? "failed" : running && live ? "live" : "default"}
      label={
        step.kind === "execute" && !step._meta.tool?.startsWith("Bash") ? (
          <span className="text-label-13-mono">{title}</span>
        ) : (
          title
        )
      }
      meta={
        running && interrupted
          ? "interrupted"
          : running
            ? null
            : duration(step._meta.durationMs)
      }
      disabled={step.kind === "read" && !failed}
    >
      {command || output || prompt ? (
        <Panel>
          {command ? (
            <pre className="border-b border-gray-alpha-400 px-3 py-2 text-copy-13-mono whitespace-pre-wrap text-gray-1000 last:border-b-0">
              <span className="text-gray-900 select-none">$ </span>
              {command}
            </pre>
          ) : null}
          {prompt ? (
            <div className="border-b border-gray-alpha-400 px-3 py-2 last:border-b-0">
              <Clamp lines={6} fade="from-background-200">
                <p className="text-copy-13 whitespace-pre-wrap text-gray-900">
                  {prompt}
                </p>
              </Clamp>
            </div>
          ) : null}
          {output ? <Output>{output}</Output> : null}
        </Panel>
      ) : null}
    </Disclosure>
  )
}

function DominantIcon({ steps }: { steps: Step[] }) {
  const count = new Map<string, number>()
  for (const s of steps)
    if (s.sessionUpdate === "tool_call")
      count.set(s.kind, (count.get(s.kind) ?? 0) + 1)
  const kind = [...count].sort((a, b) => b[1] - a[1])[0]?.[0]
  const Icon = (kind && KIND_ICON[kind]) || IconBrain
  return <Icon />
}

function Activity({
  steps,
  live,
  interrupted,
  last,
}: {
  steps: Step[]
  live: boolean
  interrupted: boolean
  last: boolean
}) {
  if (steps.length === 1)
    return <StepRow step={steps[0]} live={live} interrupted={interrupted} />
  const tail = steps[steps.length - 1]
  const working =
    live &&
    last &&
    tail.sessionUpdate === "tool_call" &&
    tail.status === "in_progress"
  return (
    <Disclosure
      icon={working ? <Spinner /> : <DominantIcon steps={steps} />}
      tone={working ? "live" : "default"}
      label={working ? stepTitle(tail as ToolCall) : summarize(steps)}
      meta={working ? null : duration(spanMs(steps))}
      defaultOpen={working}
    >
      <div className="ms-2 flex flex-col border-s border-gray-alpha-400 ps-3.5">
        {steps.map((s, i) => (
          <StepRow key={i} step={s} live={live} interrupted={interrupted} />
        ))}
      </div>
    </Disclosure>
  )
}

// An edit is an object of its own: file header over its hunks.
async function Edit({ call, diffs }: { call: ToolCall; diffs: Diff[] }) {
  const path = diffs[0].path
  const created = diffs.length === 1 && diffs[0].oldText == null
  const { add, del } = diffStats(diffs)
  return (
    <figure className="overflow-hidden rounded-xl border border-gray-alpha-400">
      <figcaption className="flex h-10 items-center gap-2 border-b border-gray-alpha-400 bg-background-200 px-4">
        <IconPencil className="size-4 shrink-0 text-gray-900" />
        <span className="min-w-0 truncate text-label-13-mono text-gray-1000">
          {path}
        </span>
        {created ? (
          <span className="text-label-12 text-gray-900">new</span>
        ) : null}
        <span className="ms-auto flex shrink-0 gap-1.5 text-label-12-mono tabular-nums">
          <span className="text-green-900">+{add}</span>
          <span className="text-red-900">−{del}</span>
        </span>
        {call.status === "failed" ? (
          <IconAlertTriangle className="size-4 text-red-900" />
        ) : null}
      </figcaption>
      <Clamp lines={14}>
        <div className="divide-y divide-gray-alpha-400 border-gray-alpha-400">
          {diffs.map((d, i) => (
            <DiffHunk
              key={i}
              path={d.path}
              oldText={d.oldText}
              newText={d.newText}
              line={d._meta?.line}
            />
          ))}
        </div>
      </Clamp>
    </figure>
  )
}

function Plan({ entries }: { entries: PlanEntry[] }) {
  const done = entries.filter((e) => e.status === "completed").length
  return (
    <Disclosure
      icon={<IconListCheck />}
      label={`Plan · ${done} of ${entries.length} done`}
      defaultOpen
    >
      <ol className="ms-6 flex flex-col gap-1.5 py-1">
        {entries.map((e, i) => (
          <li key={i} className="flex items-start gap-2 text-copy-14">
            {e.status === "completed" ? (
              <IconCircleCheck className="mt-0.5 size-4 shrink-0 text-gray-900" />
            ) : e.status === "in_progress" ? (
              <IconCircleDashed className="mt-0.5 size-4 shrink-0 text-blue-900" />
            ) : (
              <IconCircleDashed className="mt-0.5 size-4 shrink-0 text-gray-700" />
            )}
            <span
              className={cn(
                e.status === "completed"
                  ? "text-gray-900 line-through decoration-gray-600"
                  : "text-gray-1000"
              )}
            >
              {e.content}
            </span>
          </li>
        ))}
      </ol>
    </Disclosure>
  )
}

export function Transcript({
  updates,
  run,
}: {
  updates: SessionUpdate[]
  run: Run
}) {
  const live = run.status === "running" || run.status === "starting"
  const interrupted = !live
  const items = toItems(updates)
  return (
    <div className="flex flex-col gap-4">
      {items.map((item, i) => {
        const last = i === items.length - 1
        switch (item.type) {
          case "prompt":
            return (
              <Bubble key={i} variant="secondary" align="end" className="mb-4">
                <BubbleContent>
                  <Clamp lines={8} fade="from-gray-100">
                    <p className="text-copy-14 whitespace-pre-wrap">
                      {item.text}
                    </p>
                  </Clamp>
                </BubbleContent>
              </Bubble>
            )
          case "text":
            return <Prose key={i}>{item.text}</Prose>
          case "activity":
            return (
              <Activity
                key={i}
                steps={item.steps}
                live={live}
                interrupted={interrupted}
                last={last}
              />
            )
          case "edit":
            return <Edit key={i} call={item.call} diffs={item.diffs} />
          case "plan":
            return <Plan key={i} entries={item.entries} />
        }
      })}
      <FollowTail live={live} />
    </div>
  )
}
