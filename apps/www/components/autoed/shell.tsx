"use client"

import * as React from "react"

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

import { AppSidebar, type SidebarRun } from "./app-sidebar"

export function AutoedShell({
  runs,
  children,
}: {
  runs: SidebarRun[]
  children: React.ReactNode
}) {
  return (
    <SidebarProvider className="h-svh min-h-0 overflow-hidden">
      <AppSidebar runs={runs} />
      <SidebarInset className="min-h-0 overflow-hidden">
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}
