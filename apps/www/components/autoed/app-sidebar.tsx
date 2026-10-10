"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  IconBolt,
  IconFilter,
  IconLayoutDashboard,
  IconPointFilled,
  IconSettings,
  IconStack2,
} from "@tabler/icons-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar"

import { BASE } from "./base"
import { HEALTH, type RunStatus } from "./data"
import { StatusIcon } from "./status"

export type SidebarRun = {
  id: string
  title: string
  automation: string
  status: RunStatus
  when: string
}

const NAV = [
  { href: BASE, label: "Overview", icon: IconLayoutDashboard },
  { href: `${BASE}/automations`, label: "Automations", icon: IconBolt },
  { href: `${BASE}/queue`, label: "Queue", icon: IconStack2 },
  { href: `${BASE}/settings`, label: "Settings", icon: IconSettings },
]

const FILTERS = {
  all: () => true,
  attention: (s: RunStatus) =>
    s === "failed" || s === "timed_out" || s === "rate_limited",
  active: (s: RunStatus) =>
    s === "running" || s === "starting" || s === "queued",
}

export function AppSidebar({ runs }: { runs: SidebarRun[] }) {
  const pathname = usePathname()
  const [filter, setFilter] = React.useState<keyof typeof FILTERS>("all")
  const shown = runs.filter((r) => FILTERS[filter](r.status))
  const down = HEALTH.filter((c) => !c.ok)

  return (
    <Sidebar>
      <SidebarHeader className="flex-row items-center gap-2 ps-4 pe-2 pt-3">
        <Link href={BASE} className="text-heading-16 text-gray-1000">
          Autoed
        </Link>
        <SidebarTrigger className="ms-auto" />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {NAV.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  isActive={
                    item.href === BASE
                      ? pathname === BASE
                      : pathname.startsWith(item.href)
                  }
                  render={<Link href={item.href} />}
                >
                  <item.icon />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Runs</SidebarGroupLabel>
          <DropdownMenu>
            <DropdownMenuTrigger
              render={<SidebarGroupAction title="Filter runs" />}
            >
              <IconFilter />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuGroup>
                <DropdownMenuLabel>Show</DropdownMenuLabel>
                <DropdownMenuRadioGroup
                  value={filter}
                  onValueChange={(v) => setFilter(v as keyof typeof FILTERS)}
                >
                  <DropdownMenuRadioItem value="all">
                    All runs
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="active">
                    Running and queued
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="attention">
                    Needs attention
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <SidebarGroupContent>
            <SidebarMenu className="gap-0.5">
              {shown.map((run) => (
                <SidebarMenuItem key={run.id}>
                  <SidebarMenuButton
                    isActive={pathname === `${BASE}/runs/${run.id}`}
                    render={<Link href={`${BASE}/runs/${run.id}`} />}
                    className="data-active:text-label-14"
                    title={`${run.automation} · ${run.status.replace("_", " ")}`}
                  >
                    {run.status === "succeeded" ? (
                      <IconPointFilled className="text-gray-600" />
                    ) : (
                      <StatusIcon status={run.status} />
                    )}
                    <span className="min-w-0 flex-1 truncate">{run.title}</span>
                    <span className="shrink-0 text-label-12 text-gray-900 tabular-nums">
                      {run.when}
                    </span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              {shown.length === 0 ? (
                <p className="px-2 py-1.5 text-label-13 text-gray-900">
                  Nothing here.
                </p>
              ) : null}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              render={<Link href={`${BASE}/settings`} />}
              className="text-gray-900"
            >
              <span className="flex size-4 shrink-0 items-center justify-center">
                <span
                  className={
                    down.length
                      ? "size-2 rounded-full bg-amber-700"
                      : "size-2 rounded-full bg-green-700"
                  }
                />
              </span>
              <span>
                {down.length
                  ? `${down.map((c) => c.name).join(", ")} down`
                  : "All systems normal"}
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
