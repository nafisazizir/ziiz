"use client"

import * as React from "react"

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { TooltipProvider } from "@/components/ui/tooltip"

import { AppSidebar } from "./app-sidebar"
import { SearchDialog } from "./search-dialog"
import { SettingsDialog } from "./settings-dialog"

type Shell = {
  openSettings: () => void
  openSearch: () => void
  /** A prompt sent from the home composer, for the new chat to open with. */
  peekPrompt: () => string | null
  clearPrompt: () => void
  setPrompt: (prompt: string) => void
}

const ShellContext = React.createContext<Shell | null>(null)

export function useShell() {
  const shell = React.useContext(ShellContext)
  if (!shell) throw new Error("useShell must be used inside ClaudeShell")
  return shell
}

export function ClaudeShell({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = React.useState(false)
  const [search, setSearch] = React.useState(false)
  const prompt = React.useRef<string | null>(null)

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setSearch((open) => !open)
      }
      if (e.key === "," && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setSettings(true)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  const shell = React.useMemo<Shell>(
    () => ({
      openSettings: () => setSettings(true),
      openSearch: () => setSearch(true),
      peekPrompt: () => prompt.current,
      clearPrompt: () => {
        prompt.current = null
      },
      setPrompt: (value) => {
        prompt.current = value
      },
    }),
    []
  )

  return (
    <ShellContext.Provider value={shell}>
      <TooltipProvider>
        <SidebarProvider
          // claude.ai swaps the sidebar in one frame, both ways (recorded
          // 2026-11-20), and the toggle never moves; a slide would carry the
          // header toggle across the page.
          className="h-svh min-h-0 overflow-hidden [&_[data-slot=sidebar-container]]:transition-none [&_[data-slot=sidebar-gap]]:transition-none"
          style={{ "--sidebar-width": "18.3125rem" } as React.CSSProperties}
        >
          <AppSidebar />
          <SidebarInset className="min-h-0 overflow-hidden">
            {children}
          </SidebarInset>
        </SidebarProvider>
        <SearchDialog open={search} onOpenChange={setSearch} />
        <SettingsDialog open={settings} onOpenChange={setSettings} />
      </TooltipProvider>
    </ShellContext.Provider>
  )
}
