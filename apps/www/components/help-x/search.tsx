"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { IconSearch } from "@tabler/icons-react"

import { XText } from "@/components/business-x/runs"
import type { SearchEntry } from "@/components/help-x/articles"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Kbd } from "@/components/ui/kbd"
import { cn } from "@/lib/utils"

const LIMIT = 8

// The Help Center's search. The field on the home page only opens it:
// a click, a keystroke or ⌘K brings up a palette over every article title, which loads
// its index on first use. With nothing typed it offers nothing; the site's
// own field stays quiet until there is a query too.
export function HelpSearch({ className }: { className?: string }) {
  const router = useRouter()
  const [open, setOpen] = React.useState(false)
  const [query, setQuery] = React.useState("")
  const [index, setIndex] = React.useState<SearchEntry[]>()

  React.useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        setOpen((open) => !open)
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [])

  React.useEffect(() => {
    if (!open || index) return
    let live = true
    import("@/components/help-x/data/search.json").then((module) => {
      if (live) setIndex(module.default as SearchEntry[])
    })
    return () => {
      live = false
    }
  }, [open, index])

  const results = React.useMemo(() => {
    const words = query.toLowerCase().split(/\s+/).filter(Boolean)
    if (!index || words.length === 0) return []
    const hits: SearchEntry[] = []
    for (const entry of index) {
      const title = entry.title.replaceAll(">x<", "x").toLowerCase()
      if (words.every((word) => title.includes(word))) hits.push(entry)
      if (hits.length === LIMIT) break
    }
    return hits
  }, [index, query])

  return (
    <>
      <InputGroup className={cn("w-full lg:w-100", className)}>
        <InputGroupAddon align="inline-start">
          <IconSearch />
        </InputGroupAddon>
        <InputGroupInput
          readOnly
          placeholder="Search"
          aria-label="Search the Help Center"
          aria-haspopup="dialog"
          onClick={() => setOpen(true)}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key.length === 1) {
              event.preventDefault()
              setOpen(true)
            }
          }}
        />
        <InputGroupAddon align="inline-end" className="max-md:hidden">
          <Kbd>⌘K</Kbd>
        </InputGroupAddon>
      </InputGroup>
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        title="Search the Help Center"
        description="Find an article by its title."
      >
        <Command shouldFilter={false}>
          <CommandInput
            value={query}
            onValueChange={setQuery}
            placeholder="Search"
          />
          <CommandList>
            {query.trim() && (
              <CommandEmpty>
                {index ? "No articles found." : "Loading…"}
              </CommandEmpty>
            )}
            {results.length > 0 && (
              <CommandGroup heading="Articles">
                {results.map((entry) => (
                  <CommandItem
                    key={entry.href}
                    value={entry.href}
                    onSelect={() => {
                      setOpen(false)
                      router.push(entry.href)
                    }}
                  >
                    <span className="min-w-0 flex-1 truncate">
                      <XText>{entry.title}</XText>
                    </span>
                    <span className="shrink-0 text-gray-900">
                      <XText>{entry.category}</XText>
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  )
}
