"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"

import {
  DEFAULT_ITEM,
  getPlaygroundItem,
  PLAYGROUND_ITEMS,
  type PlaygroundItem,
} from "@/lib/playground"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"

const BLOCKS = PLAYGROUND_ITEMS.filter((item) => item.type === "block")
const EXAMPLES = PLAYGROUND_ITEMS.filter((item) => item.type === "example")

// Same search keywords as /create's action menu, so e.g. "block" or
// "component" narrows to the right group.
function getCommandValue(item: PlaygroundItem) {
  return `${item.title} ${
    item.type === "block"
      ? "block blocks component components"
      : "component components"
  }`
}

export function Playground() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [open, setOpen] = React.useState(false)

  const currentItem =
    getPlaygroundItem(searchParams.get("item")) ??
    getPlaygroundItem(DEFAULT_ITEM)!

  const selectItem = React.useCallback(
    (name: string) => {
      setOpen(false)
      if (name !== currentItem.name) {
        router.replace(
          name === DEFAULT_ITEM ? "/preview" : `/preview?item=${name}`,
          { scroll: false }
        )
      }
    },
    [router, currentItem.name]
  )

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "p" || e.key === "k") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((o) => !o)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  // The preview iframe forwards cmd+p / cmd+k via postMessage.
  React.useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) {
        return
      }
      if (event.data?.type === "ziiz-palette") {
        setOpen((o) => !o)
      }
    }
    window.addEventListener("message", onMessage)
    return () => window.removeEventListener("message", onMessage)
  }, [])

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-background p-6 pt-2">
      <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl ring ring-foreground/10">
        <div className="absolute inset-0 bg-background" />
        <iframe
          key={currentItem.name}
          src={`/preview/${currentItem.name}`}
          className="relative z-10 size-full flex-1"
          title="Preview"
        />
      </div>
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        className="animate-none!"
      >
        <Command loop>
          <CommandInput placeholder="Search" />
          <CommandList>
            <CommandEmpty>No items found.</CommandEmpty>
            <CommandGroup>
              {[...BLOCKS, ...EXAMPLES].map((item) => (
                <CommandItem
                  key={item.name}
                  value={getCommandValue(item)}
                  data-checked={item.name === currentItem.name}
                  className="px-2"
                  onSelect={() => selectItem(item.name)}
                >
                  {item.title}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </div>
  )
}
