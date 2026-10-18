"use client"

import * as React from "react"
import { usePathname, useRouter } from "next/navigation"

import { siteConfig, isActiveHref } from "@/lib/config"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"

// ⌘K from any page in the shell: a palette over the same groups the sidebar
// renders, so jumping anywhere never needs the mouse. The current page carries
// the check.
export function SiteCommand() {
  const router = useRouter()
  const pathname = usePathname()
  const [open, setOpen] = React.useState(false)

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

  return (
    <CommandDialog
      open={open}
      onOpenChange={setOpen}
      title="Go to a page"
      description="Search every page in the navigation."
    >
      <Command>
        <CommandInput placeholder="Go to…" />
        <CommandList>
          <CommandEmpty>No pages found.</CommandEmpty>
          {siteConfig.navGroups.map((group) => (
            <CommandGroup key={group.label} heading={group.label}>
              {group.items.map((item) => (
                <CommandItem
                  key={item.href}
                  value={item.href}
                  keywords={[item.name, group.label]}
                  data-checked={isActiveHref(pathname, item.href)}
                  onSelect={() => {
                    setOpen(false)
                    router.push(item.href)
                  }}
                >
                  {item.name}
                </CommandItem>
              ))}
            </CommandGroup>
          ))}
        </CommandList>
      </Command>
    </CommandDialog>
  )
}
