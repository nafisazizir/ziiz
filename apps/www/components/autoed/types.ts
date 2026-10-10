// ACP session updates (agentclientprotocol.com/protocol/session-setup), the
// stream `session/load` replays for Claude Code (claude-agent-acp) and Devin
// (`devin acp`) alike. Each tool_call is stored merged with its final
// tool_call_update, which is what any client reducer ends up holding.

export type TextBlock = { type: "text"; text: string }

export type ToolCallContent =
  | { type: "content"; content: TextBlock }
  | {
      type: "diff"
      path: string
      oldText: string | null
      newText: string
      _meta?: { line?: number }
    }

export type ToolKind =
  | "read"
  | "edit"
  | "delete"
  | "move"
  | "search"
  | "execute"
  | "think"
  | "fetch"
  | "switch_mode"
  | "other"

export type ToolStatus = "pending" | "in_progress" | "completed" | "failed"

export type Meta = { at: string; durationMs?: number }

export type ToolCall = {
  sessionUpdate: "tool_call"
  toolCallId: string
  title: string
  kind: ToolKind | string
  status: ToolStatus | string
  content?: ToolCallContent[]
  locations?: { path: string; line?: number }[]
  rawInput?: unknown
  _meta: Meta & { tool?: string }
}

export type PlanEntry = {
  content: string
  priority: string
  status: "pending" | "in_progress" | "completed" | string
}

export type SessionUpdate =
  | { sessionUpdate: "user_message_chunk"; content: TextBlock; _meta: Meta }
  | { sessionUpdate: "agent_message_chunk"; content: TextBlock; _meta: Meta }
  | { sessionUpdate: "agent_thought_chunk"; content: TextBlock; _meta: Meta }
  | ToolCall
  | { sessionUpdate: "plan"; entries: PlanEntry[]; _meta: Meta }

export type Session = {
  id: string
  backend: "claude" | "devin"
  title: string
  cwd: string
  model: string
  updates: SessionUpdate[]
}
