"use client"

import * as React from "react"
import {
  IconArrowUp,
  IconCamera,
  IconChevronDown,
  IconCornerDownLeft,
  IconFolder,
  IconMicrophone,
  IconPaperclip,
  IconPlug,
  IconPlus,
  IconWaveSine,
  IconWorld,
} from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { MODELS, PROJECTS } from "./data"

/* Measured from claude.ai (2026-11-20). Both composers are a filled field
 * (no outline) with ghost controls. The home composer holds attach, dictate
 * and send inside a two-line box, with project, model and permissions under
 * it. The reply composer is a single line with only send inside, and one
 * row of small controls and the disclaimer under it. Send is the one solid
 * fill, and only once there is something to send. */

type ComposerProps = {
  value: string
  onValueChange: (value: string) => void
  onSubmit: (text: string) => void
  busy?: boolean
  autoFocus?: boolean
}

function useSubmit({ value, onSubmit, busy }: ComposerProps) {
  const ready = value.trim().length > 0 && !busy
  const submit = () => {
    if (ready) onSubmit(value.trim())
  }
  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault()
      submit()
    }
  }
  return { ready, submit, onKeyDown }
}

export function HomeComposer(props: ComposerProps) {
  const { ready, submit, onKeyDown } = useSubmit(props)
  return (
    <form
      className="flex flex-col gap-2"
      onSubmit={(e) => {
        e.preventDefault()
        submit()
      }}
    >
      <InputGroup variant="secondary">
        <InputGroupTextarea
          aria-label="Message"
          autoFocus={props.autoFocus}
          placeholder="How can I help you today?"
          value={props.value}
          onChange={(e) => props.onValueChange(e.target.value)}
          onKeyDown={onKeyDown}
          className="max-h-60 min-h-16"
        />
        <InputGroupAddon align="block-end">
          <AttachMenu size="icon-sm" />
          <span className="flex-1" />
          <Hint label="Dictate">
            <InputGroupButton size="icon-sm" aria-label="Dictate">
              <IconMicrophone />
            </InputGroupButton>
          </Hint>
          {ready ? (
            <InputGroupButton
              type="submit"
              size="icon-sm"
              variant="default"
              aria-label="Send message"
            >
              <IconArrowUp />
            </InputGroupButton>
          ) : (
            <Hint label="Use voice mode">
              <InputGroupButton size="icon-sm" aria-label="Use voice mode">
                <IconWaveSine />
              </InputGroupButton>
            </Hint>
          )}
        </InputGroupAddon>
      </InputGroup>
      <div className="flex items-center gap-1">
        <ProjectMenu />
        <ModelMenu size="sm" className="ms-auto" />
        <PermissionMenu size="sm" />
      </div>
    </form>
  )
}

export function ReplyComposer(props: ComposerProps) {
  const { ready, submit, onKeyDown } = useSubmit(props)
  return (
    <form
      className="flex flex-col gap-2"
      onSubmit={(e) => {
        e.preventDefault()
        submit()
      }}
    >
      <InputGroup variant="secondary">
        <InputGroupTextarea
          aria-label="Message"
          autoFocus={props.autoFocus}
          placeholder="Reply"
          rows={1}
          value={props.value}
          onChange={(e) => props.onValueChange(e.target.value)}
          onKeyDown={onKeyDown}
          className="max-h-60 min-h-0"
        />
        <InputGroupAddon align="inline-end" className="self-end">
          <InputGroupButton
            type="submit"
            size="icon-sm"
            variant={ready ? "default" : "ghost"}
            disabled={!ready}
            aria-label="Send message"
          >
            {ready ? <IconArrowUp /> : <IconCornerDownLeft />}
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
      <div className="flex items-center gap-1 px-1">
        <AttachMenu size="icon-xs" />
        <Hint label="Dictate">
          <Button variant="ghost" size="icon-xs" aria-label="Dictate">
            <IconMicrophone className="size-4" />
          </Button>
        </Hint>
        <VoiceMenu />
        <p className="flex-1 truncate text-center text-label-12 text-gray-900">
          Claude is AI and can make mistakes.
        </p>
        <ModelMenu size="xs" />
        <PermissionMenu size="xs" />
      </div>
    </form>
  )
}

function Hint({
  label,
  children,
}: {
  label: string
  children: React.ReactElement
}) {
  return (
    <Tooltip>
      <TooltipTrigger render={children} />
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  )
}

function AttachMenu({ size }: { size: "icon-xs" | "icon-sm" }) {
  const [web, setWeb] = React.useState(true)
  return (
    <DropdownMenu size="sm">
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            size={size}
            aria-label="Add files, connectors and more"
          />
        }
      >
        <IconPlus className="size-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent side="top" align="start" className="w-60">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <IconPaperclip />
            Add files or photos
          </DropdownMenuItem>
          <DropdownMenuItem>
            <IconCamera />
            Take a screenshot
          </DropdownMenuItem>
          <DropdownMenuItem>
            <IconFolder />
            Add to project
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuCheckboxItem checked={web} onCheckedChange={setWeb}>
            <IconWorld />
            Web search
          </DropdownMenuCheckboxItem>
          <DropdownMenuItem>
            <IconPlug />
            Connectors
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function VoiceMenu() {
  const [mic, setMic] = React.useState("default")
  return (
    <span className="flex items-center">
      <Hint label="Use voice mode">
        <Button variant="ghost" size="icon-xs" aria-label="Use voice mode">
          <IconWaveSine className="size-4" />
        </Button>
      </Hint>
      <DropdownMenu size="sm">
        <DropdownMenuTrigger
          render={
            <Button
              variant="ghost"
              size="icon-xs"
              aria-label="Microphone"
              className="w-4 text-gray-900"
            />
          }
        >
          <IconChevronDown />
        </DropdownMenuTrigger>
        <DropdownMenuContent side="top" align="start" className="w-52">
          <DropdownMenuGroup>
            <DropdownMenuLabel>Microphone</DropdownMenuLabel>
            <DropdownMenuRadioGroup value={mic} onValueChange={setMic}>
              <DropdownMenuRadioItem value="default">
                System default
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="headset">
                Headset microphone
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </span>
  )
}

function ProjectMenu() {
  return (
    <DropdownMenu size="sm">
      <DropdownMenuTrigger render={<Button variant="ghost" size="sm" />}>
        Project
        <IconChevronDown data-icon="inline-end" className="text-gray-900" />
      </DropdownMenuTrigger>
      <DropdownMenuContent side="bottom" align="start" className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Start in a project</DropdownMenuLabel>
          {PROJECTS.map((p) => (
            <DropdownMenuItem key={p.id}>
              <IconFolder />
              {p.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const MODES = [
  {
    value: "auto",
    label: "Auto",
    description: "A check blocks risky actions; the rest run",
  },
  { value: "manual", label: "Manual", description: "Ask before every action" },
]

function PermissionMenu({ size }: { size: "xs" | "sm" }) {
  const [mode, setMode] = React.useState("manual")
  const current = MODES.find((m) => m.value === mode) ?? MODES[1]
  return (
    <DropdownMenu size="sm">
      <DropdownMenuTrigger render={<Button variant="ghost" size={size} />}>
        {current.label}
      </DropdownMenuTrigger>
      <DropdownMenuContent side="top" align="end" className="w-64">
        <DropdownMenuGroup>
          <DropdownMenuRadioGroup value={mode} onValueChange={setMode}>
            {MODES.map((m) => (
              <DropdownMenuRadioItem key={m.value} value={m.value}>
                <span className="flex flex-col">
                  <span>{m.label}</span>
                  <span className="text-label-12 text-gray-900">
                    {m.description}
                  </span>
                </span>
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const EFFORTS = ["Low", "Medium", "High"] as const

export function ModelMenu({
  size,
  className,
}: {
  size: "xs" | "sm"
  className?: string
}) {
  const [model, setModel] = React.useState("opus-5.5")
  const [effort, setEffort] = React.useState<string>("Medium")
  const current = MODELS.find((m) => m.id === model) ?? MODELS[1]

  return (
    <DropdownMenu size="sm">
      <DropdownMenuTrigger
        render={<Button variant="ghost" size={size} className={className} />}
      >
        {current.name}
        <span className="text-gray-900">{effort}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="top" align="end" className="w-72">
        <DropdownMenuGroup>
          <DropdownMenuRadioGroup value={model} onValueChange={setModel}>
            {MODELS.map((m) => (
              <DropdownMenuRadioItem key={m.id} value={m.id}>
                <span className="flex flex-col">
                  <span>{m.name}</span>
                  <span className="text-label-12 text-gray-900">
                    {m.description}
                  </span>
                </span>
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            Effort
            <span className="ms-auto text-gray-900">{effort}</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent className="w-40">
              <DropdownMenuGroup>
                <DropdownMenuLabel>Thinking effort</DropdownMenuLabel>
                <DropdownMenuRadioGroup
                  value={effort}
                  onValueChange={setEffort}
                >
                  {EFFORTS.map((e) => (
                    <DropdownMenuRadioItem key={e} value={e}>
                      {e}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuGroup>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>More models</DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent className="w-48">
              <DropdownMenuGroup>
                <DropdownMenuItem>Opus 5</DropdownMenuItem>
                <DropdownMenuItem>Sonnet 5</DropdownMenuItem>
                <DropdownMenuItem>Haiku 5</DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
