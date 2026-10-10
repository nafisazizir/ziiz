"use client"

import * as React from "react"
import Link from "next/link"
import {
  IconDots,
  IconExternalLink,
  IconPlayerStop,
  IconRefresh,
} from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { BASE } from "./base"
import type { RunStatus } from "./data"
import { PageHeader } from "./page-header"
import { StatusPill } from "./status"

export function RunLayout({
  automation,
  title,
  status,
  hasSession,
  children,
}: {
  automation: { id: string; name: string }
  title: string
  status: RunStatus
  hasSession: boolean
  children: React.ReactNode
}) {
  const active = status === "running" || status === "starting"

  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col">
      <PageHeader>
        <nav className="flex min-w-0 items-center gap-1.5 text-label-14">
          <Link
            href={`${BASE}/automations/${automation.id}`}
            className="shrink-0 text-gray-900 hover:text-gray-1000 max-sm:hidden"
          >
            {automation.name}
          </Link>
          <span className="text-gray-700 max-sm:hidden">/</span>
          <span className="min-w-0 truncate text-gray-1000">{title}</span>
        </nav>
        <StatusPill status={status} className="max-sm:hidden" />
        <div className="ms-auto flex items-center gap-1">
          {hasSession ? (
            <Button variant="outline" size="sm" className="max-md:hidden">
              Open in Devin Desktop
              <IconExternalLink data-icon="inline-end" />
            </Button>
          ) : null}
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon-sm"
                  aria-label="Run actions"
                />
              }
            >
              <IconDots />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52">
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <IconRefresh />
                  Retry run
                </DropdownMenuItem>
                {active ? (
                  <DropdownMenuItem variant="destructive">
                    <IconPlayerStop />
                    Cancel run
                  </DropdownMenuItem>
                ) : null}
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>Copy run ID</DropdownMenuItem>
                <DropdownMenuItem>Reveal run folder</DropdownMenuItem>
                <DropdownMenuItem>View stderr.log</DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </PageHeader>
      {children}
    </div>
  )
}
