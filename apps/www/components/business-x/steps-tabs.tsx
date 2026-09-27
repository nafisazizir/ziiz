"use client"

import * as React from "react"

import { Body } from "@/components/business-x/section"
import { XText } from "@/components/business-x/runs"
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

export type Step = {
  title: string
  copy: React.ReactNode
  actions?: React.ReactNode
  panel: React.ReactNode
}

// Numbered steps on a tab strip, one panel at a time: the panel takes six
// columns at 15:8 from 1024px and the copy the last two, its actions pushed
// to the bottom; below that the panel is 9:8 above the copy and the strip
// scrolls sideways at two tabs a screen. A pair of arrows beside the heading
// walks the steps, as on x.com.
export function StepsTabs({
  title,
  subtitle,
  steps,
  className,
  panelClassName,
}: {
  title: string
  subtitle?: string
  steps: Step[]
  className?: string
  panelClassName?: string
}) {
  const [index, setIndex] = React.useState(0)
  const value = String(index)

  return (
    <Tabs
      value={value}
      onValueChange={(next) => setIndex(Number(next))}
      className={cn("gap-10 lg:gap-14", className)}
    >
      <div className="flex items-end justify-between gap-6">
        <h2 className="text-heading-32 text-balance text-gray-1000">
          <XText>{title}</XText>
          {subtitle && (
            <span className="block text-gray-900">
              <XText>{subtitle}</XText>
            </span>
          )}
        </h2>
        <div className="hidden shrink-0 items-center gap-2 min-[500px]:flex">
          <Button
            variant="ghost"
            shape="rounded"
            size="icon-sm"
            aria-label="Previous step"
            disabled={index === 0}
            onClick={() => setIndex((i) => Math.max(0, i - 1))}
          >
            <IconChevronLeft />
          </Button>
          <Button
            variant="ghost"
            shape="rounded"
            size="icon-sm"
            aria-label="Next step"
            disabled={index === steps.length - 1}
            onClick={() => setIndex((i) => Math.min(steps.length - 1, i + 1))}
          >
            <IconChevronRight />
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <div className="relative -mx-4 px-4">
          <div className="absolute inset-x-4 bottom-0">
            <Separator />
          </div>
          <TabsList
            variant="line"
            className="relative w-full scrollbar-none justify-start gap-6 overflow-x-auto overflow-y-hidden p-0"
          >
            {steps.map((step, i) => (
              <TabsTrigger
                key={step.title}
                value={String(i)}
                className="h-auto flex-none basis-[40%] justify-start gap-2 px-0 pb-4 min-[500px]:basis-1/2 lg:flex-1 lg:basis-0"
              >
                <span className="text-gray-700">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="truncate">
                  <XText>{step.title}</XText>
                </span>
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        {steps.map((step, i) => (
          <TabsContent
            key={step.title}
            value={String(i)}
            className="flex flex-col gap-6 lg:grid lg:grid-cols-8"
          >
            <div
              className={cn(
                "relative aspect-9/8 overflow-hidden bg-gray-100 lg:col-span-6 lg:aspect-15/8",
                panelClassName
              )}
            >
              {step.panel}
            </div>
            <div className="flex flex-col items-start gap-6 lg:col-span-2">
              <Body>{step.copy}</Body>
              {step.actions && (
                <div className="flex flex-wrap gap-2 lg:mt-auto lg:flex-col">
                  {step.actions}
                </div>
              )}
            </div>
          </TabsContent>
        ))}
      </div>
    </Tabs>
  )
}
