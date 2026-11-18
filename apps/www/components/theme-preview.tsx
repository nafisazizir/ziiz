"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import type { Theme } from "@/lib/color-ramp"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Toggle } from "@/components/ui/toggle"

const NOTES = [
  {
    head: "ICP alignment",
    mine: "narrow Q3 to mid-market finance + ops",
    ai: [
      "SMB deprioritised for the quarter",
      "Paid campaigns paused until the ICP doc is confirmed",
    ],
  },
  {
    head: "Deal stalls",
    mine: "deals stalling at business case",
    ai: ["Marketing to build a business case"],
    mark: "template",
  },
]

/* Brand marks what is on; ink and gray do everything else (color-ramp.md,
 * "Where the brand goes"). These are the on-state classes components/ui
 * would carry if theme.css exposed brand-*: written as var() here because
 * it does not yet. The primary button is not among them: it stays ink. */
const ON = {
  checked:
    "data-checked:border-(--ds-brand-700) data-checked:bg-(--ds-brand-700) data-checked:text-(--ds-brand-on) data-checked:hover:border-(--ds-brand-800) data-checked:hover:bg-(--ds-brand-800)",
  switch: "data-checked:bg-(--ds-brand-700)",
  pressed:
    "aria-pressed:bg-(--ds-brand-alpha-200) aria-pressed:text-(--ds-brand-1000) aria-pressed:hover:bg-(--ds-brand-alpha-300)",
  progress: "[&_[data-slot=progress-indicator]]:bg-(--ds-brand-700)",
  count: "bg-(--ds-brand-700) text-(--ds-brand-on)",
}

/** Stock ziiz components, painted by a generated palette set inline on the
 *  subtree, with the brand on the states the user set: checked, pressed,
 *  counts, progress. The command stays ink and the chrome stays gray. */
export function ThemePreview({
  theme,
  tokens,
}: {
  theme: Theme
  tokens: Record<string, string>
}) {
  return (
    <div
      className={cn(
        theme === "dark" && "dark",
        "flex flex-col gap-6 rounded-xl bg-background-100 p-6 text-gray-1000 ring-1 ring-gray-alpha-400 ring-inset"
      )}
      style={tokens as React.CSSProperties}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="text-label-12 text-gray-900 capitalize">{theme}</span>
        <div className="flex items-center gap-2">
          <Toggle
            size="sm"
            shape="rounded"
            defaultPressed
            className={ON.pressed}
          >
            Shared
          </Toggle>
          <Button size="sm" shape="rounded">
            Download
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <h3 className="text-heading-24">Q3 GTM sync</h3>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline">Today</Badge>
          <Badge variant="secondary">4 people</Badge>
          <Badge variant="destructive">Recording off</Badge>
        </div>
      </div>
      <div className="flex flex-col gap-5">
        {NOTES.map((note) => (
          <div key={note.head} className="flex flex-col gap-1.5">
            <span className="text-label-13 text-gray-900">{note.head}</span>
            <p className="text-copy-14">{`• ${note.mine}`}</p>
            {note.ai.map((line, i) => (
              <p key={line} className="pl-4 text-copy-14 text-gray-900">
                {`– ${line}`}
                {note.mark && i === note.ai.length - 1 && (
                  <>
                    {" "}
                    <mark className="rounded-sm bg-(--ds-brand-alpha-200) px-0.5 text-(--ds-brand-900)">
                      {note.mark}
                    </mark>
                  </>
                )}
              </p>
            ))}
          </div>
        ))}
      </div>
      <Separator />
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Tabs defaultValue="enhanced">
          <TabsList shape="rounded">
            <TabsTrigger value="mine">My notes</TabsTrigger>
            <TabsTrigger value="enhanced">Enhanced</TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="flex items-center gap-4">
          <Label className="flex items-center gap-2 text-label-13">
            <Checkbox defaultChecked className={ON.checked} />
            Action items
          </Label>
          <Label className="flex items-center gap-2 text-label-13">
            <Switch defaultChecked size="sm" className={ON.switch} />
            Live
          </Label>
        </div>
      </div>
      <InputGroup>
        <InputGroupInput placeholder="Ask anything about this meeting" />
        <InputGroupAddon align="inline-end">
          <InputGroupButton variant="secondary" size="xs">
            Ask
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
      <div className="flex flex-wrap gap-2">
        <Button>Default</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="destructive">Delete</Button>
      </div>
      <div className="flex flex-col gap-3 border-t border-gray-alpha-400 pt-5">
        <span className="text-label-12 text-gray-900">on-states, in brand</span>
        <div className="flex flex-wrap items-center gap-3">
          <Checkbox
            defaultChecked
            aria-label="Checked"
            className={ON.checked}
          />
          <Switch
            defaultChecked
            size="sm"
            aria-label="On"
            className={ON.switch}
          />
          <Toggle variant="outline" defaultPressed className={ON.pressed}>
            Pressed
          </Toggle>
          <Badge className={ON.count}>3 selected</Badge>
          <Progress
            value={60}
            aria-label="Progress"
            className={cn(ON.progress, "w-32")}
          />
        </div>
      </div>
    </div>
  )
}
