// Builds the transcripts behind /playground/autoed from agent sessions on
// this machine. One-shot: the sources are local stores (Claude Code's
// ~/.claude/projects JSONL, Devin's sessions.db), so the output is committed
// and this only reruns when the picks below change.
//
// Every session becomes ACP session updates (agentclientprotocol.com), the
// shape `session/load` replays for both backends, with each tool_call merged
// with its final tool_call_update. Home paths are rewritten to `~`, outputs
// are cut to a screen, images are dropped.
//
//   node scripts/autoed/build-fixtures.ts

import fs from "node:fs"
import os from "node:os"
import path from "node:path"
import { DatabaseSync } from "node:sqlite"

type Pick = {
  id: string
  backend: "claude" | "devin"
  // Claude: session file prefix under the project dir. Devin: session id.
  source: string
  project?: string
  // Keep only the first N updates and leave the last tool call running.
  cut?: number
}

const PICKS: Pick[] = [
  { id: "icons-tabler", backend: "claude", source: "ccd37dba" },
  { id: "button-shape", backend: "claude", source: "d87ec8ee" },
  { id: "toc-mobile", backend: "claude", source: "610b9104" },
  { id: "em-dashes", backend: "claude", source: "a1e16d1e" },
  { id: "theme-contrast", backend: "claude", source: "2d775edc", cut: 12 },
  { id: "visibility-smoke", backend: "claude", source: "f54efc1f" },
  { id: "x-tokens", backend: "devin", source: "complex-shell" },
  { id: "state-audit", backend: "devin", source: "scarlet-child", cut: 46 },
]

const HOME = os.homedir()
const CLAUDE_PROJECT = path.join(
  HOME,
  ".claude/projects/-Users-nafis-Documents-personal-ziiz"
)
const DEVIN_DB = path.join(HOME, ".local/share/devin/cli/sessions.db")
const OUT = path.join(import.meta.dirname, "../../components/autoed/data")

const MAX_LINES = 60
const MAX_CHARS = 5000
const CONTEXT = 3

type Text = { type: "text"; text: string }
type Content =
  | { type: "content"; content: Text }
  | {
      type: "diff"
      path: string
      oldText: string | null
      newText: string
      _meta?: { line: number }
    }
type Update =
  | { sessionUpdate: "user_message_chunk"; content: Text; _meta: Meta }
  | { sessionUpdate: "agent_message_chunk"; content: Text; _meta: Meta }
  | { sessionUpdate: "agent_thought_chunk"; content: Text; _meta: Meta }
  | {
      sessionUpdate: "tool_call"
      toolCallId: string
      title: string
      kind: string
      status: "pending" | "in_progress" | "completed" | "failed"
      content?: Content[]
      locations?: { path: string; line?: number }[]
      rawInput?: unknown
      _meta: Meta & { tool?: string; durationMs?: number }
    }
  | {
      sessionUpdate: "plan"
      entries: { content: string; priority: string; status: string }[]
      _meta: Meta
    }
type Meta = { at: string; durationMs?: number }

function clean(s: string) {
  return s
    .replaceAll(`${HOME}/Documents/personal/ziiz/`, "")
    .replaceAll("./Documents/personal/ziiz/", "")
    .replaceAll(HOME, "~")
    .replace(/\/private\/tmp\/claude-\d+\/[^\s"'`]*?\/scratchpad/g, "$TMPDIR")
    .replace(/<system-reminder>[\s\S]*?<\/system-reminder>/g, "")
    .replace(/\[Image #\d+\]\s*/g, "")
    .replace(/\[Image: source: [^\]]+\]/g, "")
    .trim()
}

function clip(s: string) {
  const text = clean(s)
  const lines = text.split("\n")
  let out = lines.slice(0, MAX_LINES).join("\n")
  if (out.length > MAX_CHARS) out = out.slice(0, MAX_CHARS)
  const rest = lines.length - out.split("\n").length
  return rest > 0 ? `${out}\n… ${rest} more lines` : out
}

function deep<T>(v: T): T {
  return JSON.parse(clean(JSON.stringify(v)), (_k, x) =>
    typeof x === "string" && x.length > 2000 ? x.slice(0, 2000) + "…" : x
  )
}

// Line diff (LCS) cut into hunks, so a full-file edit stores only what moved.
function hunks(oldText: string, newText: string, file: string): Content[] {
  const a = oldText.split("\n")
  const b = newText.split("\n")
  let start = 0
  while (start < a.length && start < b.length && a[start] === b[start]) start++
  let ea = a.length
  let eb = b.length
  while (ea > start && eb > start && a[ea - 1] === b[eb - 1]) {
    ea--
    eb--
  }
  const x = a.slice(start, ea)
  const y = b.slice(start, eb)
  const dp = Array.from({ length: x.length + 1 }, () =>
    new Array<number>(y.length + 1).fill(0)
  )
  for (let i = x.length - 1; i >= 0; i--)
    for (let j = y.length - 1; j >= 0; j--)
      dp[i][j] =
        x[i] === y[j]
          ? dp[i + 1][j + 1] + 1
          : Math.max(dp[i + 1][j], dp[i][j + 1])
  const ops: { op: " " | "-" | "+"; text: string; line: number }[] = []
  for (let k = Math.max(0, start - CONTEXT); k < start; k++)
    ops.push({ op: " ", text: a[k], line: k + 1 })
  let i = 0
  let j = 0
  while (i < x.length || j < y.length) {
    if (i < x.length && j < y.length && x[i] === y[j]) {
      ops.push({ op: " ", text: x[i], line: start + i + 1 })
      i++
      j++
    } else if (
      j < y.length &&
      (i >= x.length || dp[i][j + 1] >= dp[i + 1][j])
    ) {
      ops.push({ op: "+", text: y[j], line: start + i + 1 })
      j++
    } else {
      ops.push({ op: "-", text: x[i], line: start + i + 1 })
      i++
    }
  }
  for (let k = ea; k < Math.min(a.length, ea + CONTEXT); k++)
    ops.push({ op: " ", text: a[k], line: k + 1 })

  const out: Content[] = []
  let group: typeof ops = []
  let quiet = 0
  const flush = () => {
    while (
      group.length &&
      group[group.length - 1].op === " " &&
      quiet-- > CONTEXT
    )
      group.pop()
    if (group.some((o) => o.op !== " ")) {
      out.push({
        type: "diff",
        path: clean(file),
        oldText: group
          .filter((o) => o.op !== "+")
          .map((o) => o.text)
          .join("\n"),
        newText: group
          .filter((o) => o.op !== "-")
          .map((o) => o.text)
          .join("\n"),
        _meta: { line: group[0].line },
      })
    }
    group = []
    quiet = 0
  }
  for (const o of ops) {
    if (o.op === " ") {
      quiet++
      if (quiet > CONTEXT * 2 && group.some((g) => g.op !== " ")) {
        quiet = CONTEXT
        const tail = group.slice(-CONTEXT)
        group = group.slice(0, -CONTEXT)
        flush()
        group = tail
      }
    } else quiet = 0
    group.push(o)
  }
  flush()
  return out.slice(0, 12)
}

// Claude Code JSONL ---------------------------------------------------------

// Both stores are untyped JSON written by other programs.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Block = Record<string, any>

function toolInfo(name: string, input: Block) {
  const p = (v: string) => clean(v ?? "")
  switch (name) {
    case "Bash":
      return {
        kind: "execute",
        title: clean(input.description ?? input.command),
      }
    case "Read":
      return {
        kind: "read",
        title: `Read ${p(input.file_path)}`,
        locations: [{ path: p(input.file_path), line: input.offset }],
      }
    case "Edit":
    case "MultiEdit":
      return {
        kind: "edit",
        title: `Edit ${p(input.file_path)}`,
        locations: [{ path: p(input.file_path) }],
      }
    case "Write":
      return {
        kind: "edit",
        title: `Write ${p(input.file_path)}`,
        locations: [{ path: p(input.file_path) }],
      }
    case "Grep":
      return { kind: "search", title: `Search ${input.pattern}` }
    case "Glob":
      return { kind: "search", title: `Find ${input.pattern}` }
    case "WebFetch":
      return { kind: "fetch", title: `Fetch ${input.url}` }
    case "WebSearch":
      return { kind: "fetch", title: `Search the web for ${input.query}` }
    case "Agent":
    case "Task":
      return { kind: "think", title: clean(input.description ?? "Subagent") }
    case "TodoWrite":
      return { kind: "think", title: "Update plan" }
    case "Skill":
      return { kind: "other", title: `Load skill ${input.skill}` }
    case "ToolSearch":
      return { kind: "other", title: "Load tools" }
    default:
      if (name.startsWith("mcp__claude-in-chrome__"))
        return {
          kind: "other",
          title: `Browser ${name.split("__").pop()?.replaceAll("_", " ")}`,
        }
      return { kind: "other", title: name }
  }
}

function resultText(block: Block) {
  const c = block.content
  if (typeof c === "string") return c
  if (Array.isArray(c))
    return c
      .filter((x) => x.type === "text")
      .map((x) => x.text)
      .join("\n")
  return ""
}

function promptText(c: string | Block[]) {
  return typeof c === "string"
    ? c
    : c
        .filter((b) => b.type === "text")
        .map((b) => b.text)
        .join("\n")
}

function isPrompt(line: Block) {
  if (line.type !== "user" || line.isMeta || line.isSidechain) return false
  const c = line.message.content
  if (Array.isArray(c) && c.some((b: Block) => b.type === "tool_result"))
    return false
  const t = promptText(c).trim()
  return (
    Boolean(t) && !t.startsWith("<local-command") && !t.startsWith("<command")
  )
}

function fromClaude(prefix: string, project = CLAUDE_PROJECT) {
  const file = fs
    .readdirSync(project)
    .find((f) => f.startsWith(prefix) && f.endsWith(".jsonl"))
  if (!file) throw new Error(`no session ${prefix}`)
  const lines: Block[] = fs
    .readFileSync(path.join(project, file), "utf8")
    .split("\n")
    .filter(Boolean)
    .map((l) => JSON.parse(l))

  const title =
    lines.findLast((l) => l.type === "ai-title")?.aiTitle ??
    lines.findLast((l) => l.type === "summary")?.summary
  const first = lines.findIndex(isPrompt)
  const next = lines.findIndex((l, i) => i > first && isPrompt(l))
  const turn = lines.slice(first, next === -1 ? undefined : next)

  const updates: Update[] = []
  const calls = new Map<
    string,
    Extract<Update, { sessionUpdate: "tool_call" }>
  >()
  let prev = turn[0].timestamp

  for (const line of turn) {
    if (line.isSidechain) continue
    const at = line.timestamp ?? prev
    if (line === turn[0]) {
      updates.push({
        sessionUpdate: "user_message_chunk",
        content: {
          type: "text",
          text: clean(promptText(line.message.content)),
        },
        _meta: { at },
      })
    } else if (line.type === "assistant") {
      for (const b of line.message.content as Block[]) {
        if (b.type === "text" && b.text.trim()) {
          updates.push({
            sessionUpdate: "agent_message_chunk",
            content: { type: "text", text: clean(b.text) },
            _meta: { at },
          })
        } else if (b.type === "thinking") {
          updates.push({
            sessionUpdate: "agent_thought_chunk",
            content: { type: "text", text: clean(b.thinking ?? "") },
            _meta: { at, durationMs: Date.parse(at) - Date.parse(prev) },
          })
        } else if (b.type === "tool_use") {
          const info = toolInfo(b.name, b.input)
          const call = {
            sessionUpdate: "tool_call" as const,
            toolCallId: b.id,
            status: "in_progress" as const,
            rawInput: deep(b.input),
            ...info,
            _meta: { at, tool: b.name },
          }
          calls.set(b.id, call)
          updates.push(call)
          if (b.name === "TodoWrite") {
            updates.push({
              sessionUpdate: "plan",
              entries: (b.input.todos ?? []).map((t: Block) => ({
                content: clean(t.content),
                priority: "medium",
                status: t.status,
              })),
              _meta: { at },
            })
          }
        }
      }
    } else if (line.type === "user") {
      for (const b of line.message.content as Block[]) {
        if (b.type !== "tool_result") continue
        const call = calls.get(b.tool_use_id)
        if (!call) continue
        call.status = b.is_error ? "failed" : "completed"
        call._meta.durationMs = Date.parse(at) - Date.parse(call._meta.at)
        const r = line.toolUseResult
        const content: Content[] = []
        if (r?.structuredPatch?.length) {
          for (const h of r.structuredPatch.slice(0, 12)) {
            const ls: string[] = h.lines
            content.push({
              type: "diff",
              path: clean(r.filePath),
              oldText: ls
                .filter((l) => !l.startsWith("+"))
                .map((l) => l.slice(1))
                .join("\n"),
              newText: ls
                .filter((l) => !l.startsWith("-"))
                .map((l) => l.slice(1))
                .join("\n"),
              _meta: { line: h.oldStart },
            })
          }
        } else if (r?.type === "create" && typeof r.content === "string") {
          content.push({
            type: "diff",
            path: clean(r.filePath),
            oldText: null,
            newText: clean(r.content).split("\n").slice(0, 120).join("\n"),
          })
        } else if (call.kind !== "read") {
          const text = resultText(b)
          if (text.trim())
            content.push({
              type: "content",
              content: { type: "text", text: clip(text) },
            })
        } else {
          const text = resultText(b)
          const n = text.split("\n").length
          content.push({
            type: "content",
            content: { type: "text", text: `${n} lines` },
          })
        }
        call.content = content
      }
    }
    prev = at
  }

  return {
    title: clean(title ?? promptText(turn[0].message.content).slice(0, 60)),
    cwd: clean(turn[0].cwd ?? ""),
    model: turn.find((l) => l.type === "assistant")?.message.model,
    updates,
  }
}

// Devin sessions.db ---------------------------------------------------------

function fromDevin(id: string) {
  const db = new DatabaseSync(DEVIN_DB, { readOnly: true })
  const session = db
    .prepare("select * from sessions where id = ?")
    .get(id) as Block
  const nodes = new Map(
    (
      db
        .prepare(
          "select node_id, parent_node_id, chat_message from message_nodes where session_id = ?"
        )
        .all(id) as Block[]
    ).map((n) => [n.node_id, n])
  )
  const states = new Map(
    (
      db
        .prepare(
          "select tool_call_id, tool_call_json, tool_call_update_json from tool_call_state where session_id = ?"
        )
        .all(id) as Block[]
    ).map((s) => [s.tool_call_id, s])
  )

  // Compaction re-roots the main chain, so walk forward instead: from the
  // first prompt, always into the child with the deepest subtree.
  const children = new Map<number, number[]>()
  for (const n of nodes.values())
    if (n.parent_node_id != null)
      children.set(n.parent_node_id, [
        ...(children.get(n.parent_node_id) ?? []),
        n.node_id,
      ])
  const depth = new Map<number, number>()
  const deepest = (id: number): number => {
    if (!depth.has(id)) {
      let d = 0
      const stack = [[id, 0]]
      while (stack.length) {
        const [n, k] = stack.pop()!
        d = Math.max(d, k)
        for (const c of children.get(n) ?? []) stack.push([c, k + 1])
      }
      depth.set(id, d)
    }
    return depth.get(id)!
  }
  // Each request re-sends the prompt under fresh system nodes, so the first
  // prompt appears in several trees; the one that grew furthest is the run.
  const isFirst = (n: Block) => {
    const m = JSON.parse(n.chat_message)
    return (
      m.role === "user" &&
      typeof m.content === "string" &&
      !m.content.startsWith("<")
    )
  }
  const sorted = [...nodes.values()].sort((a, b) => a.node_id - b.node_id)
  const prompt = JSON.parse(sorted.find(isFirst)!.chat_message).content
  const root = sorted
    .filter((n) => isFirst(n) && JSON.parse(n.chat_message).content === prompt)
    .sort((a, b) => deepest(b.node_id) - deepest(a.node_id))[0]
  const chain: Block[] = []
  for (let n: Block | undefined = root; n;) {
    chain.push(JSON.parse(n.chat_message))
    const next: number | undefined = (children.get(n.node_id) ?? []).sort(
      (a, b) => deepest(b) - deepest(a)
    )[0]
    n = next == null ? undefined : nodes.get(next)
  }

  const updates: Update[] = []
  let started = false
  let prev = ""
  for (const m of chain) {
    const at = m.metadata?.created_at ?? prev
    if (m.role === "user") {
      if (started) break
      if (typeof m.content !== "string" || m.content.startsWith("<")) continue
      started = true
      updates.push({
        sessionUpdate: "user_message_chunk",
        content: {
          type: "text",
          text: clean(m.content.replace(/^\d+m\n/, "")),
        },
        _meta: { at },
      })
    } else if (m.role === "assistant" && started) {
      const thinking = m.thinking?.thinking
      if (thinking)
        updates.push({
          sessionUpdate: "agent_thought_chunk",
          content: { type: "text", text: clean(thinking) },
          _meta: { at, durationMs: Date.parse(at) - Date.parse(prev) },
        })
      if (typeof m.content === "string" && m.content.trim())
        updates.push({
          sessionUpdate: "agent_message_chunk",
          content: { type: "text", text: clean(m.content) },
          _meta: { at },
        })
      for (const t of m.tool_calls ?? []) {
        const s = states.get(t.id)
        const call = s?.tool_call_json ? JSON.parse(s.tool_call_json) : {}
        const done = s?.tool_call_update_json
          ? JSON.parse(s.tool_call_update_json)
          : {}
        const timing = done._meta?.["chisel/tool_call_timing"]
        const content: Content[] = []
        for (const c of [...(call.content ?? []), ...(done.content ?? [])]) {
          if (c.type === "diff")
            content.push(...hunks(c.oldText ?? "", c.newText, c.path))
          else if (
            c.type === "content" &&
            c.content?.type === "text" &&
            c.content.text.trim()
          )
            content.push({
              type: "content",
              content: {
                type: "text",
                text:
                  call.kind === "read"
                    ? `${c.content.text.split("\n").length} lines`
                    : clip(c.content.text),
              },
            })
        }
        updates.push({
          sessionUpdate: "tool_call",
          toolCallId: t.id,
          title: clean(call.title ?? t.name),
          kind: call.kind ?? "other",
          status: done.status ?? "completed",
          content,
          locations: call.locations && deep(call.locations),
          rawInput: deep(call.rawInput ?? t.arguments),
          _meta: {
            at,
            tool: t.name,
            durationMs: timing?.duration_ms,
          },
        })
      }
    }
    prev = at
  }

  return {
    title: clean(session.title ?? ""),
    cwd: clean(session.working_directory),
    model: session.model,
    updates,
  }
}

// ---------------------------------------------------------------------------

fs.mkdirSync(path.join(OUT, "sessions"), { recursive: true })
for (const pick of PICKS) {
  const s =
    pick.backend === "claude"
      ? fromClaude(pick.source, pick.project)
      : fromDevin(pick.source)
  let updates = s.updates
  if (pick.cut) {
    updates = updates.slice(0, pick.cut)
    const end = updates.findLastIndex((u) => u.sessionUpdate === "tool_call")
    updates = updates.slice(0, end + 1)
    const last = updates[end]
    if (last && last.sessionUpdate === "tool_call") {
      last.status = "in_progress"
      delete last.content
      delete last._meta.durationMs
    }
  }
  const session = { id: pick.id, backend: pick.backend, ...s, updates }
  const file = path.join(OUT, "sessions", `${pick.id}.json`)
  fs.writeFileSync(file, JSON.stringify(session, null, 1) + "\n")
  console.log(
    `${pick.id.padEnd(18)} ${String(updates.length).padStart(4)} updates ${(fs.statSync(file).size / 1024).toFixed(0).padStart(5)} KB  ${s.title}`
  )
}
