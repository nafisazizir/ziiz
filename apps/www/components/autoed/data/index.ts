// autoed's rows (src/types.ts in the autoed repo) with the JSON columns
// decoded, paired with real sessions from this machine. Times hang off a
// fixed NOW so relative labels render the same on the server and client.

import buttonShape from "./sessions/button-shape.json"
import emDashes from "./sessions/em-dashes.json"
import iconsTabler from "./sessions/icons-tabler.json"
import stateAudit from "./sessions/state-audit.json"
import themeContrast from "./sessions/theme-contrast.json"
import tocMobile from "./sessions/toc-mobile.json"
import visibilitySmoke from "./sessions/visibility-smoke.json"
import xTokens from "./sessions/x-tokens.json"
import type { Session } from "../types"

export const NOW = Date.parse("2026-10-10T05:00:00Z")

export type BackendId = "claude" | "devin"
export type RunStatus =
  | "queued"
  | "starting"
  | "running"
  | "succeeded"
  | "failed"
  | "timed_out"
  | "cancelled"
  | "rate_limited"

export type Trigger =
  | { id: string; kind: "schedule"; config: { cron: string; tz: string } }
  | { id: string; kind: "manual"; config: Record<string, never> }
  | { id: string; kind: "webhook"; config: { hmac?: boolean } }
  | {
      id: string
      kind: "github"
      config: {
        repo: string
        events: string[]
        filter?: string
        intervalSec?: number
      }
    }

export type Automation = {
  id: string
  name: string
  enabled: boolean
  backend: BackendId
  model: string
  agent_mode: string
  instructions: string
  working_dir: string
  isolate_worktree: boolean
  continue_session: boolean
  timeout_sec: number
  max_concurrent: number
  rate_limit: { count: number; window_sec: number } | null
  catchup_policy: "coalesce" | "replay" | "skip"
  notify: { macos?: boolean; webhook?: { url: string; template: string } }
  allowed_tools: string[]
  disallowed_tools: string[]
  triggers: Trigger[]
  next_fire_at: string | null
}

export type Run = {
  id: string
  automation_id: string
  status: RunStatus
  trigger: Trigger["kind"]
  event?: { label: string; url?: string; missed_count?: number }
  queued_at: string
  started_at: string | null
  finished_at: string | null
  backend: BackendId
  model: string
  session_id: string | null
  working_dir: string
  worktree_path: string | null
  exit_code: number | null
  error: string | null
  attempt: number
  next_attempt_at: string | null
  usage?: { input: number; output: number; cost_usd: number }
}

const ZIIZ = "~/Documents/personal/ziiz"

export const automations: Automation[] = [
  {
    id: "issue-fixer",
    name: "Issue fixer",
    enabled: true,
    backend: "claude",
    model: "opus",
    agent_mode: "acceptEdits",
    instructions: `An issue labelled autoed was opened in {{event.payload.repo}}.

{{event.payload.body}}

Work in the checked-out worktree. Keep the change to what the issue asks, run \`pnpm typecheck && pnpm lint\`, and leave the result uncommitted for review.`,
    working_dir: ZIIZ,
    isolate_worktree: true,
    continue_session: false,
    timeout_sec: 3600,
    max_concurrent: 1,
    rate_limit: { count: 10, window_sec: 3600 },
    catchup_policy: "replay",
    notify: { macos: true },
    allowed_tools: ["Bash(pnpm:*)", "Bash(git diff:*)"],
    disallowed_tools: ["Bash(git push:*)", "Bash(gh pr merge:*)"],
    triggers: [
      {
        id: "t-gh",
        kind: "github",
        config: {
          repo: "nafisazizir/ziiz",
          events: ["issue"],
          filter: "label:autoed",
          intervalSec: 300,
        },
      },
    ],
    next_fire_at: "2026-10-10T05:03:00Z",
  },
  {
    id: "state-audit",
    name: "State audit",
    enabled: true,
    backend: "devin",
    model: "swe-2-high",
    agent_mode: "accept-edits",
    instructions: `Audit hover, active and selected states across components/ui against the ramp ladder in the migrate-component skill. Propose the rungs that are off, then apply them.`,
    working_dir: ZIIZ,
    isolate_worktree: false,
    continue_session: false,
    timeout_sec: 5400,
    max_concurrent: 1,
    rate_limit: null,
    catchup_policy: "coalesce",
    notify: { macos: true },
    allowed_tools: [],
    disallowed_tools: [],
    triggers: [
      {
        id: "t-sa",
        kind: "schedule",
        config: { cron: "0 14 * * 6", tz: "Australia/Sydney" },
      },
      { id: "t-sa-m", kind: "manual", config: {} },
    ],
    next_fire_at: "2026-10-17T03:00:00Z",
  },
  {
    id: "copy-lint",
    name: "Copy lint",
    enabled: true,
    backend: "claude",
    model: "sonnet",
    agent_mode: "acceptEdits",
    instructions: `Sweep the repo for copy that breaks the house style: em dashes, title case headings, "simply" and "just". Rewrite each sentence rather than swapping the character, and never touch generated files.`,
    working_dir: ZIIZ,
    isolate_worktree: true,
    continue_session: false,
    timeout_sec: 3600,
    max_concurrent: 1,
    rate_limit: null,
    catchup_policy: "coalesce",
    notify: {
      macos: true,
      webhook: { url: "https://ntfy.sh/ziiz-autoed", template: "ntfy" },
    },
    allowed_tools: [],
    disallowed_tools: ["Bash(git push:*)"],
    triggers: [
      {
        id: "t-cl",
        kind: "schedule",
        config: { cron: "0 22 * * *", tz: "Australia/Sydney" },
      },
    ],
    next_fire_at: "2026-10-10T11:00:00Z",
  },
  {
    id: "migrations",
    name: "Migration runner",
    enabled: true,
    backend: "claude",
    model: "fable",
    agent_mode: "acceptEdits",
    instructions: `{{event.payload.task}}

Prefer the official codemod or CLI when one exists, then finish by hand. Run the registry build and typecheck before you stop.`,
    working_dir: ZIIZ,
    isolate_worktree: true,
    continue_session: false,
    timeout_sec: 7200,
    max_concurrent: 1,
    rate_limit: null,
    catchup_policy: "skip",
    notify: { macos: true },
    allowed_tools: [],
    disallowed_tools: [],
    triggers: [
      { id: "t-mr", kind: "manual", config: {} },
      { id: "t-mr-w", kind: "webhook", config: { hmac: true } },
    ],
    next_fire_at: null,
  },
  {
    id: "theme-check",
    name: "Theme contrast check",
    enabled: true,
    backend: "claude",
    model: "sonnet",
    agent_mode: "acceptEdits",
    instructions: `Check background-100 and gray-1000 in both themes against the brief, adjust packages/theme if they drift, and rebuild.`,
    working_dir: ZIIZ,
    isolate_worktree: false,
    continue_session: false,
    timeout_sec: 1800,
    max_concurrent: 1,
    rate_limit: null,
    catchup_policy: "coalesce",
    notify: { macos: true },
    allowed_tools: [],
    disallowed_tools: [],
    triggers: [
      {
        id: "t-tc",
        kind: "schedule",
        config: { cron: "0 9 * * 1-5", tz: "Australia/Sydney" },
      },
    ],
    next_fire_at: "2026-10-12T22:00:00Z",
  },
  {
    id: "token-dump",
    name: "Token dump",
    enabled: false,
    backend: "devin",
    model: "swe-2-high",
    agent_mode: "accept-edits",
    instructions: `Store the posted token dump somewhere sensible in the repo for later comparison.

{{event.payload}}`,
    working_dir: ZIIZ,
    isolate_worktree: false,
    continue_session: false,
    timeout_sec: 1800,
    max_concurrent: 1,
    rate_limit: null,
    catchup_policy: "replay",
    notify: {},
    allowed_tools: [],
    disallowed_tools: [],
    triggers: [{ id: "t-td", kind: "webhook", config: {} }],
    next_fire_at: null,
  },
  {
    id: "smoke",
    name: "Visibility smoke test",
    enabled: true,
    backend: "claude",
    model: "haiku",
    agent_mode: "dontAsk",
    instructions: `Reply with exactly the sentence: Automation visibility test OK. Do not use any tools.`,
    working_dir: ZIIZ,
    isolate_worktree: false,
    continue_session: false,
    timeout_sec: 120,
    max_concurrent: 1,
    rate_limit: null,
    catchup_policy: "skip",
    notify: {},
    allowed_tools: [],
    disallowed_tools: [],
    triggers: [
      {
        id: "t-sm",
        kind: "schedule",
        config: { cron: "0 */6 * * *", tz: "Australia/Sydney" },
      },
    ],
    next_fire_at: "2026-10-10T08:00:00Z",
  },
]

const base = {
  working_dir: ZIIZ,
  worktree_path: null,
  exit_code: null,
  error: null,
  attempt: 1,
  next_attempt_at: null,
}

export const runs: Run[] = [
  {
    ...base,
    id: "01m4j7q2c4ka91",
    automation_id: "issue-fixer",
    status: "queued",
    trigger: "github",
    event: {
      label: "Issue #41 opened",
      url: "https://github.com/nafisazizir/ziiz/issues/41",
    },
    queued_at: "2026-10-10T04:58:12Z",
    started_at: null,
    finished_at: null,
    backend: "claude",
    model: "opus",
    session_id: null,
  },
  {
    ...base,
    id: "01m4j6x8v1pq3d",
    automation_id: "state-audit",
    status: "running",
    trigger: "manual",
    event: { label: "Run now" },
    queued_at: "2026-10-10T04:41:00Z",
    started_at: "2026-10-10T04:41:02Z",
    finished_at: null,
    backend: "devin",
    model: "swe-2-high",
    session_id: "state-audit",
  },
  {
    ...base,
    id: "01m4j5r0h7mb2c",
    automation_id: "issue-fixer",
    status: "succeeded",
    trigger: "github",
    event: {
      label: "Issue #38 opened",
      url: "https://github.com/nafisazizir/ziiz/issues/38",
    },
    queued_at: "2026-10-10T03:12:40Z",
    started_at: "2026-10-10T03:12:42Z",
    finished_at: "2026-10-10T03:15:58Z",
    backend: "claude",
    model: "opus",
    session_id: "button-shape",
    worktree_path: "~/.autoed/worktrees/01m4j5r0h7mb2c",
    exit_code: 0,
    usage: { input: 182_400, output: 6_120, cost_usd: 1.94 },
  },
  {
    ...base,
    id: "01m4j4c9t2wz8f",
    automation_id: "copy-lint",
    status: "rate_limited",
    trigger: "schedule",
    event: { label: "Daily at 22:00", missed_count: 2 },
    queued_at: "2026-10-10T02:00:00Z",
    started_at: "2026-10-10T02:00:03Z",
    finished_at: null,
    backend: "claude",
    model: "sonnet",
    session_id: null,
    error: "Claude usage limit reached. Resets at 3:30pm.",
    attempt: 2,
    next_attempt_at: "2026-10-10T05:30:00Z",
  },
  {
    ...base,
    id: "01m4j3k1n5ye7a",
    automation_id: "theme-check",
    status: "timed_out",
    trigger: "schedule",
    event: { label: "Weekdays at 09:00" },
    queued_at: "2026-10-09T22:00:00Z",
    started_at: "2026-10-09T22:00:02Z",
    finished_at: "2026-10-09T22:30:02Z",
    backend: "claude",
    model: "sonnet",
    session_id: "theme-contrast",
    exit_code: 143,
    error: "Timed out after 30m. The process group was killed.",
  },
  {
    ...base,
    id: "01m4j2f6b3rd0k",
    automation_id: "migrations",
    status: "succeeded",
    trigger: "manual",
    event: { label: "Run now" },
    queued_at: "2026-10-09T08:20:00Z",
    started_at: "2026-10-09T08:20:01Z",
    finished_at: "2026-10-09T09:07:44Z",
    backend: "claude",
    model: "fable",
    session_id: "icons-tabler",
    worktree_path: "~/.autoed/worktrees/01m4j2f6b3rd0k",
    exit_code: 0,
    usage: { input: 2_904_000, output: 61_300, cost_usd: 22.6 },
  },
  {
    ...base,
    id: "01m4j1w4s8hc6m",
    automation_id: "issue-fixer",
    status: "succeeded",
    trigger: "github",
    event: {
      label: "Issue #35 opened",
      url: "https://github.com/nafisazizir/ziiz/issues/35",
    },
    queued_at: "2026-10-09T05:41:00Z",
    started_at: "2026-10-09T05:41:03Z",
    finished_at: "2026-10-09T05:43:51Z",
    backend: "claude",
    model: "opus",
    session_id: "toc-mobile",
    worktree_path: "~/.autoed/worktrees/01m4j1w4s8hc6m",
    exit_code: 0,
    usage: { input: 164_200, output: 4_480, cost_usd: 1.71 },
  },
  {
    ...base,
    id: "01m4j0p7e2gx4n",
    automation_id: "copy-lint",
    status: "succeeded",
    trigger: "schedule",
    event: { label: "Daily at 22:00" },
    queued_at: "2026-10-08T11:00:00Z",
    started_at: "2026-10-08T11:00:02Z",
    finished_at: "2026-10-08T11:38:10Z",
    backend: "claude",
    model: "sonnet",
    session_id: "em-dashes",
    worktree_path: "~/.autoed/worktrees/01m4j0p7e2gx4n",
    exit_code: 0,
    usage: { input: 1_120_000, output: 38_900, cost_usd: 4.02 },
  },
  {
    ...base,
    id: "01m4hz3d9q1v5b",
    automation_id: "smoke",
    status: "failed",
    trigger: "schedule",
    event: { label: "Every 6 hours" },
    queued_at: "2026-10-08T02:00:00Z",
    started_at: "2026-10-08T02:00:01Z",
    finished_at: "2026-10-08T02:00:01Z",
    backend: "claude",
    model: "haiku",
    session_id: null,
    exit_code: 127,
    error:
      "spawn claude ENOENT. No claude binary on PATH, ~/.local/bin, /opt/homebrew/bin or the npm global bin.",
  },
  {
    ...base,
    id: "01m4hy8k0t6j2r",
    automation_id: "smoke",
    status: "succeeded",
    trigger: "schedule",
    event: { label: "Every 6 hours" },
    queued_at: "2026-10-07T20:00:00Z",
    started_at: "2026-10-07T20:00:01Z",
    finished_at: "2026-10-07T20:00:09Z",
    backend: "claude",
    model: "haiku",
    session_id: "visibility-smoke",
    exit_code: 0,
    usage: { input: 9_800, output: 12, cost_usd: 0.01 },
  },
  {
    ...base,
    id: "01m4hx1c5w9e3p",
    automation_id: "token-dump",
    status: "succeeded",
    trigger: "webhook",
    event: { label: "POST /hooks/t-td" },
    queued_at: "2026-10-06T09:12:00Z",
    started_at: "2026-10-06T09:12:01Z",
    finished_at: "2026-10-06T09:16:40Z",
    backend: "devin",
    model: "swe-2-high",
    session_id: "x-tokens",
    exit_code: 0,
  },
]

const sessions: Record<string, Session> = {
  "button-shape": buttonShape as Session,
  "em-dashes": emDashes as Session,
  "icons-tabler": iconsTabler as Session,
  "state-audit": stateAudit as Session,
  "theme-contrast": themeContrast as Session,
  "toc-mobile": tocMobile as Session,
  "visibility-smoke": visibilitySmoke as Session,
  "x-tokens": xTokens as Session,
}

export function getSession(id: string | null) {
  return id ? sessions[id] : undefined
}

export function getRun(id: string) {
  return runs.find((r) => r.id === id)
}

export function getAutomation(id: string) {
  return automations.find((a) => a.id === id)
}

export function runTitle(run: Run) {
  return (
    getSession(run.session_id)?.title ?? getAutomation(run.automation_id)!.name
  )
}

// Sidebar order: most recently touched first.
export function lastActivity(run: Run) {
  return Date.parse(run.finished_at ?? run.started_at ?? run.queued_at)
}

export const ACTIVE: RunStatus[] = ["starting", "running"]
export const WAITING: RunStatus[] = ["queued", "rate_limited"]

// config.json globalMaxConcurrent on this spare Mac.
export const GLOBAL_MAX = 1

// What `autoed doctor` checks that can stop a run. Advisories (automatic
// login, pmset) live on the settings page and do not count here.
export const HEALTH = [
  { name: "Engine", ok: true },
  { name: "Claude Code", ok: true },
  { name: "Devin CLI", ok: true },
  { name: "GitHub", ok: true },
]
