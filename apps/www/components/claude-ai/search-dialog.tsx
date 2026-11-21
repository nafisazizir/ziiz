"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { IconMessage, IconPin, IconPlus } from "@tabler/icons-react"

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@/components/ui/command"

import { BASE, CHATS } from "./data"

export function SearchDialog({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const router = useRouter()
  const go = (href: string) => {
    onOpenChange(false)
    router.push(href)
  }

  return (
    <CommandDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Search chats"
      description="Search your chats and projects"
    >
      <Command>
        <CommandInput placeholder="Search chats and projects" />
        <CommandList>
          <CommandEmpty>No chats match.</CommandEmpty>
          <CommandGroup>
            <CommandItem onSelect={() => go(BASE)}>
              <IconPlus />
              New chat
              <CommandShortcut>⇧⌘O</CommandShortcut>
            </CommandItem>
          </CommandGroup>
          <CommandGroup heading="Recent chats">
            {CHATS.map((chat) => (
              <CommandItem
                key={chat.id}
                value={chat.title}
                onSelect={() => go(`${BASE}/chat/${chat.id}`)}
              >
                {chat.pinned ? <IconPin /> : <IconMessage />}
                <span className="truncate">{chat.title}</span>
                <CommandShortcut>{chat.updated}</CommandShortcut>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </CommandDialog>
  )
}
