"use client"

import * as React from "react"
import {
  IconChevronDown,
  IconCopy,
  IconFolder,
  IconPencil,
  IconRefresh,
  IconShare,
  IconStar,
  IconThumbDown,
  IconThumbUp,
  IconTrash,
} from "@tabler/icons-react"

import { Bubble, BubbleContent } from "@/components/ui/bubble"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Message, MessageContent, MessageFooter } from "@/components/ui/message"
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@/components/ui/message-scroller"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { ReplyComposer } from "./composer"
import { CANNED, type Chat, type Turn } from "./data"
import { PageHeader } from "./page-header"
import { Reply, replyLength, revealBlocks } from "./reply"
import { useShell } from "./shell"

const CHARS_PER_TICK = 6
const TICK_MS = 24

export function ChatView({ chat }: { chat: Chat }) {
  const { peekPrompt, clearPrompt } = useShell()
  // A prompt sent from the home composer opens the chat already sent.
  const [pending] = React.useState(peekPrompt)
  const [turns, setTurns] = React.useState<Turn[]>(() =>
    pending ? [...chat.turns, { role: "user", text: pending }] : chat.turns
  )
  const [title, setTitle] = React.useState(
    chat.title || pending?.slice(0, 48) || ""
  )
  const [draft, setDraft] = React.useState("")
  const [streamed, setStreamed] = React.useState<number | null>(
    pending ? 0 : null
  )
  const total = replyLength(CANNED)

  React.useEffect(() => {
    if (pending) clearPrompt()
  }, [pending, clearPrompt])

  const send = (text: string) => {
    setTurns((t) => [...t, { role: "user", text }])
    setTitle((current) => current || text.slice(0, 48))
    setDraft("")
    setStreamed(0)
  }

  // Stream the canned reply in, a few characters a tick; all at once for
  // readers who asked for less motion.
  React.useEffect(() => {
    if (streamed === null) return
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const id = window.setTimeout(
      () => {
        const next = streamed + CHARS_PER_TICK
        if (still || next >= total) {
          setTurns((t) => [...t, { role: "assistant", blocks: CANNED }])
          setStreamed(null)
        } else {
          setStreamed(next)
        }
      },
      still ? 0 : TICK_MS
    )
    return () => window.clearTimeout(id)
  }, [streamed, total])

  const lastUser = turns.findLastIndex((t) => t.role === "user")

  return (
    <div className="flex h-full min-h-0 flex-col">
      <PageHeader>
        <ChatTitleMenu title={title || "New chat"} />
        <Button variant="ghost" size="sm" className="ms-auto">
          <IconShare data-icon="inline-start" />
          Share
        </Button>
      </PageHeader>

      <MessageScrollerProvider>
        <MessageScroller className="flex-1">
          <MessageScrollerViewport>
            <MessageScrollerContent className="mx-auto w-full max-w-3xl px-4 pt-6 pb-10">
              {turns.map((turn, i) => (
                <MessageScrollerItem
                  key={i}
                  scrollAnchor={turn.role === "user" && i === lastUser}
                >
                  <TurnView turn={turn} />
                </MessageScrollerItem>
              ))}
              {streamed !== null ? (
                <MessageScrollerItem>
                  <Message>
                    <MessageContent>
                      <Reply blocks={revealBlocks(CANNED, streamed)} />
                    </MessageContent>
                  </Message>
                </MessageScrollerItem>
              ) : null}
            </MessageScrollerContent>
          </MessageScrollerViewport>
          <MessageScrollerButton />
        </MessageScroller>
      </MessageScrollerProvider>

      <div className="mx-auto w-full max-w-3xl px-4 pb-3 lg:px-0">
        <ReplyComposer
          value={draft}
          onValueChange={setDraft}
          onSubmit={send}
          busy={streamed !== null}
          autoFocus
        />
      </div>
    </div>
  )
}

function TurnView({ turn }: { turn: Turn }) {
  if (turn.role === "user") {
    return (
      <Message align="end">
        <MessageContent>
          <Bubble variant="secondary" align="end">
            <BubbleContent className="whitespace-pre-wrap">
              {turn.text}
            </BubbleContent>
          </Bubble>
          <MessageFooter className="opacity-0 transition-opacity group-focus-within/message:opacity-100 group-hover/message:opacity-100">
            <Action label="Edit">
              <IconPencil />
            </Action>
            <Action label="Copy">
              <IconCopy />
            </Action>
          </MessageFooter>
        </MessageContent>
      </Message>
    )
  }
  return (
    <Message>
      <MessageContent>
        <Reply blocks={turn.blocks} />
        <MessageFooter className="-ms-1.5 gap-0.5 px-0">
          <Action label="Copy">
            <IconCopy />
          </Action>
          <Action label="Good response">
            <IconThumbUp />
          </Action>
          <Action label="Bad response">
            <IconThumbDown />
          </Action>
          <Action label="Retry">
            <IconRefresh />
          </Action>
        </MessageFooter>
      </MessageContent>
    </Message>
  )
}

function Action({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label={label}
            className="text-gray-900"
          />
        }
      >
        {children}
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  )
}

function ChatTitleMenu({ title }: { title: string }) {
  return (
    <DropdownMenu size="sm">
      <DropdownMenuTrigger
        render={
          <Button variant="ghost" size="sm" className="-ms-1.5 min-w-0" />
        }
      >
        <span className="truncate">{title}</span>
        <IconChevronDown data-icon="inline-end" className="text-gray-900" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-48">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <IconStar />
            Star
          </DropdownMenuItem>
          <DropdownMenuItem>
            <IconPencil />
            Rename
          </DropdownMenuItem>
          <DropdownMenuItem>
            <IconFolder />
            Add to project
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">
          <IconTrash />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
