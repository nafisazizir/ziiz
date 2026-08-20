"use client"

import * as React from "react"
import { Tick02Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

import { cn } from "@/lib/utils"
import { SpecList, SpecRow } from "@/components/spec-list"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const STEPS = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000]

const SCALES = [
  { label: "Gray", token: "gray" },
  { label: "Gray Alpha", token: "gray-alpha" },
  { label: "Blue", token: "blue" },
  { label: "Red", token: "red" },
  { label: "Amber", token: "amber" },
  { label: "Green", token: "green" },
  { label: "Teal", token: "teal" },
  { label: "Purple", token: "purple" },
  { label: "Pink", token: "pink" },
]

export function Swatch({
  token,
  className,
}: {
  token: string
  className?: string
}) {
  const [copied, setCopied] = React.useState(false)
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  const style: React.CSSProperties = {
    backgroundColor: `var(--ds-${token})`,
    boxShadow: "var(--ds-shadow-border-inset)",
  }

  return (
    <Tooltip>
      <TooltipTrigger
        aria-label={`Copy ${token} value`}
        className={cn(
          "flex items-center justify-center rounded-md text-base font-medium",
          className
        )}
        style={style}
        onClick={(event) => {
          const value = getComputedStyle(event.currentTarget)
            .getPropertyValue(`--ds-${token}`)
            .trim()
          navigator.clipboard.writeText(value)
          if (timeoutRef.current) clearTimeout(timeoutRef.current)
          setCopied(true)
          timeoutRef.current = setTimeout(() => setCopied(false), 1200)
        }}
      >
        {copied ? (
          <HugeiconsIcon
            icon={Tick02Icon}
            strokeWidth={2}
            className="size-4 text-white mix-blend-difference"
          />
        ) : null}
      </TooltipTrigger>
      <TooltipContent>
        <span className="text-label-12-mono">
          {copied ? "Copied" : `--ds-${token}`}
        </span>
      </TooltipContent>
    </Tooltip>
  )
}

export function ColorScales() {
  return (
    <TooltipProvider>
      <div className="overflow-x-auto">
        <div className="grid min-w-140 grid-cols-[5rem_repeat(10,minmax(0,1fr))] items-center gap-1">
          <div />
          {STEPS.map((step) => (
            <div
              key={step}
              className="text-label-12 pb-1 text-center text-gray-900"
            >
              {step}
            </div>
          ))}
          <div className="text-label-12 pr-2 text-gray-900">Background</div>
          <Swatch token="background-100" className="aspect-square w-full" />
          <Swatch token="background-200" className="aspect-square w-full" />
          {STEPS.slice(2).map((step) => (
            <div key={step} />
          ))}
          {SCALES.map((scale) => (
            <React.Fragment key={scale.token}>
              <div className="text-label-12 pr-2 text-gray-900">
                {scale.label}
              </div>
              {STEPS.map((step) => (
                <Swatch
                  key={step}
                  token={`${scale.token}-${step}`}
                  className="aspect-square w-full"
                />
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    </TooltipProvider>
  )
}

export function ColorUsageList({
  items,
}: {
  items: { token: string; name: string; usage: string }[]
}) {
  return (
    <TooltipProvider>
      <SpecList>
        {items.map((item) => (
          <SpecRow key={item.token} className="flex items-center gap-4 py-3">
            <Swatch token={item.token} className="size-9 shrink-0 rounded-md" />
            <div className="flex flex-1 flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5">
              <div>
                <div className="text-label-14 font-medium text-gray-1000">
                  {item.name}
                </div>
                <div className="text-label-13-mono text-gray-900">
                  var(--ds-{item.token})
                </div>
              </div>
              <div className="text-copy-13 text-gray-900">{item.usage}</div>
            </div>
          </SpecRow>
        ))}
      </SpecList>
    </TooltipProvider>
  )
}
