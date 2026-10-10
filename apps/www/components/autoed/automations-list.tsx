"use client"

import * as React from "react"
import Link from "next/link"
import {
  IconBrandGithub,
  IconCalendarTime,
  IconHandClick,
  IconWebhook,
} from "@tabler/icons-react"

import { Switch } from "@/components/ui/switch"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { BASE } from "./base"
import type { RunStatus, Trigger } from "./data"
import { StatusIcon } from "./status"

export type AutomationRow = {
  id: string
  name: string
  enabled: boolean
  trigger: Trigger["kind"]
  triggers: string
  model: string
  last: { status: RunStatus; when: string } | null
  next: string | null
}

const ICON = {
  schedule: IconCalendarTime,
  manual: IconHandClick,
  webhook: IconWebhook,
  github: IconBrandGithub,
}

export function AutomationsList({ rows }: { rows: AutomationRow[] }) {
  const [tab, setTab] = React.useState("all")
  const [enabled, setEnabled] = React.useState(
    () => new Map(rows.map((r) => [r.id, r.enabled]))
  )
  const shown = rows.filter((r) =>
    tab === "all" ? true : (tab === "enabled") === enabled.get(r.id)
  )
  const count = (on: boolean) =>
    rows.filter((r) => enabled.get(r.id) === on).length

  return (
    <div className="flex flex-col gap-4">
      <Tabs value={tab} onValueChange={setTab}>
        <TabsList>
          <TabsTrigger value="all">
            All <span className="text-gray-900">{rows.length}</span>
          </TabsTrigger>
          <TabsTrigger value="enabled">
            Enabled <span className="text-gray-900">{count(true)}</span>
          </TabsTrigger>
          <TabsTrigger value="paused">
            Paused <span className="text-gray-900">{count(false)}</span>
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="flex flex-col divide-y divide-gray-alpha-400 overflow-hidden rounded-xl border border-gray-alpha-400">
        {shown.map((r) => {
          const Icon = ICON[r.trigger]
          return (
            <div
              key={r.id}
              className="relative flex items-center gap-4 px-4 py-3.5 transition-colors has-[a:focus-visible]:bg-gray-alpha-100 has-[a:hover]:bg-gray-alpha-100"
            >
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-1000">
                <Icon className="size-4" />
              </span>
              <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                <Link
                  href={`${BASE}/automations/${r.id}`}
                  className="truncate text-label-14 text-gray-1000 outline-none after:absolute after:inset-0"
                >
                  {r.name}
                </Link>
                <span className="truncate text-label-13 text-gray-900">
                  {r.triggers}
                </span>
              </div>
              <span className="w-36 shrink-0 truncate text-label-13 text-gray-900 max-md:hidden">
                {r.model}
              </span>
              <span className="flex w-28 shrink-0 items-center gap-1.5 text-label-13 text-gray-900 max-sm:hidden">
                {r.last ? (
                  <>
                    <StatusIcon status={r.last.status} className="size-3.5" />
                    {r.last.when}
                  </>
                ) : (
                  "Never run"
                )}
              </span>
              <span className="w-20 shrink-0 text-label-13 text-gray-900 tabular-nums max-lg:hidden">
                {enabled.get(r.id) ? (r.next ?? "On trigger") : "Paused"}
              </span>
              <Switch
                className="relative z-10"
                checked={enabled.get(r.id)}
                onCheckedChange={(on) =>
                  setEnabled((m) => new Map(m).set(r.id, on))
                }
                aria-label={`Enable ${r.name}`}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
