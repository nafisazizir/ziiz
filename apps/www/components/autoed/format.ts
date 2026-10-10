import { NOW, type Automation, type Run, type Trigger } from "./data"

export function ago(iso: string | null, now = NOW) {
  if (!iso) return ""
  const s = Math.round((now - Date.parse(iso)) / 1000)
  const future = s < 0
  const a = Math.abs(s)
  const v =
    a < 60
      ? "now"
      : a < 3600
        ? `${Math.round(a / 60)}m`
        : a < 86400
          ? `${Math.round(a / 3600)}h`
          : `${Math.round(a / 86400)}d`
  if (v === "now") return "just now"
  return future ? `in ${v}` : `${v} ago`
}

export function duration(ms: number | undefined | null) {
  if (ms == null || ms < 0) return ""
  if (ms < 1000) return `${ms}ms`
  const s = Math.round(ms / 1000)
  if (s < 60) return `${s}s`
  const m = Math.floor(s / 60)
  if (m < 60) return s % 60 ? `${m}m ${s % 60}s` : `${m}m`
  return `${Math.floor(m / 60)}h ${m % 60}m`
}

export function runDuration(run: Run) {
  if (!run.started_at) return null
  const end = run.finished_at ? Date.parse(run.finished_at) : NOW
  return end - Date.parse(run.started_at)
}

const time = new Intl.DateTimeFormat("en-AU", {
  timeZone: "Australia/Sydney",
  day: "numeric",
  month: "short",
  hour: "numeric",
  minute: "2-digit",
})

export function stamp(iso: string | null) {
  return iso ? time.format(new Date(iso)) : "—"
}

export function tokens(n: number) {
  return n >= 1e6
    ? `${(n / 1e6).toFixed(1)}M`
    : n >= 1e3
      ? `${Math.round(n / 1e3)}k`
      : String(n)
}

const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
]

// Enough cron for the presets autoed's form offers.
export function cron(expr: string) {
  const [min, hour, dom, mon, dow] = expr.split(" ")
  const at = `${hour.padStart(2, "0")}:${min.padStart(2, "0")}`
  if (hour.startsWith("*/")) return `Every ${hour.slice(2)} hours`
  if (dom === "*" && mon === "*") {
    if (dow === "*") return `Daily at ${at}`
    if (dow === "1-5") return `Weekdays at ${at}`
    if (/^\d$/.test(dow)) return `${DAYS[+dow]}s at ${at}`
  }
  return expr
}

export function triggerLabel(t: Trigger) {
  switch (t.kind) {
    case "schedule":
      return cron(t.config.cron)
    case "manual":
      return "Manual"
    case "webhook":
      return "Webhook"
    case "github":
      return `GitHub ${t.config.events.join(", ")} in ${t.config.repo}`
  }
}

export function modelLabel(a: Pick<Automation, "backend" | "model">) {
  return `${a.backend === "claude" ? "Claude Code" : "Devin"} · ${a.model}`
}

export function resumeCommand(run: Run) {
  return run.backend === "claude"
    ? `claude --resume ${run.session_id}`
    : `devin --resume ${run.session_id}`
}
