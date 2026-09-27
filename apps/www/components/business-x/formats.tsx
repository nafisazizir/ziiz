"use client"

import * as React from "react"

import { FormDropdown } from "@/components/business-x/form-dropdown"
import {
  AdPost,
  FeedPhone,
  FillerPost,
  PhoneScene,
  type AdKind,
} from "@/components/business-x/mocks/feed"
import { XText } from "@/components/business-x/runs"
import { Body } from "@/components/business-x/section"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowDown01Icon, ArrowUp01Icon } from "@hugeicons/core-free-icons"

import { Button } from "@/components/ui/button"
import { Nav, NavItem, NavLink, NavList } from "@/components/ui/nav"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

export type Format = {
  name: string
  intro: string[]
  kind?: AdKind
  // A phone of the page's own instead of the ad in a feed.
  phone?: React.ReactNode
  subs?: { name: string; copy: string; kind?: AdKind }[]
  // Pills under the copy.
  actions?: React.ReactNode
  note?: string
}

// "X Advertising Formats": the formats down the left two columns with the
// site's square marker on the current one, a phone in a 9:14 panel across
// the next three showing that format in the feed, and the copy in the last
// three with the format's sub-categories on a tab strip, a pair of arrows
// under it walking the list. Below 1024px the list becomes a dropdown, the
// panel a 2:3 frame (600px tall from 768px) and the copy follows it.
export function FormatsExplorer({
  formats,
  className,
}: {
  formats: Format[]
  className?: string
}) {
  const [index, setIndex] = React.useState(0)
  const [sub, setSub] = React.useState(0)
  const format = formats[index]
  const kind = format.subs?.[sub]?.kind ?? format.kind ?? "image"

  function select(next: number) {
    setIndex(next)
    setSub(0)
  }

  return (
    <div
      className={cn(
        "flex flex-col gap-4.5 lg:grid lg:grid-cols-8 lg:gap-x-4 lg:gap-y-0",
        className
      )}
    >
      <div className="lg:hidden">
        <FormDropdown
          id="business-x-format"
          placeholder="Choose a format"
          value={format.name}
          onValueChange={(name) =>
            select(
              Math.max(
                0,
                formats.findIndex((f) => f.name === name)
              )
            )
          }
          options={formats.map((f) => ({
            label: f.name.replaceAll(">x<", "X"),
            value: f.name,
          }))}
        />
      </div>
      <Nav
        aria-label="Formats"
        className="self-start max-lg:hidden lg:col-span-2 lg:col-start-1"
      >
        <NavList marker className="-mx-2.5">
          {formats.map((item, i) => (
            <NavItem key={item.name}>
              <NavLink
                active={i === index}
                render={<button type="button" />}
                onClick={() => select(i)}
              >
                <XText>{item.name}</XText>
              </NavLink>
            </NavItem>
          ))}
        </NavList>
      </Nav>
      <div className="relative aspect-2/3 max-h-150 overflow-hidden bg-gray-100 md:aspect-auto md:h-150 lg:col-span-3 lg:col-start-3 lg:-ml-4 lg:aspect-9/14 lg:h-auto lg:max-h-none">
        <PhoneScene>
          {format.phone ?? (
            <FeedPhone>
              <FillerPost />
              <AdPost kind={kind} />
              <FillerPost />
            </FeedPhone>
          )}
        </PhoneScene>
      </div>
      <div className="flex flex-col gap-6 lg:col-span-3 lg:col-start-6">
        <Body className="max-lg:text-gray-1000">
          {format.intro.map((paragraph) => (
            <p key={paragraph}>
              <XText>{paragraph}</XText>
            </p>
          ))}
        </Body>
        {format.subs && (
          <Tabs
            value={String(sub)}
            onValueChange={(next) => setSub(Number(next))}
            className="gap-2 max-lg:items-center max-lg:py-6 max-lg:text-center"
          >
            <TabsList
              variant="line"
              className="w-full scrollbar-none justify-start gap-6 overflow-x-auto overflow-y-hidden p-0 max-lg:hidden"
            >
              {format.subs.map((item, i) => (
                <TabsTrigger
                  key={item.name}
                  value={String(i)}
                  className="h-auto flex-none px-0 pb-1"
                >
                  <XText>{item.name}</XText>
                </TabsTrigger>
              ))}
            </TabsList>
            {format.subs.map((item, i) => (
              <TabsContent
                key={item.name}
                value={String(i)}
                className="flex flex-col gap-1 max-lg:max-w-75"
              >
                <p className="text-label-13 text-gray-1000 lg:hidden">
                  <XText>{item.name}</XText>
                </p>
                <p className="text-copy-13 text-balance text-gray-900">
                  <XText>{item.copy}</XText>
                </p>
              </TabsContent>
            ))}
          </Tabs>
        )}
        {format.actions && (
          <div className="flex flex-wrap gap-3">{format.actions}</div>
        )}
        {format.note && (
          <p className="text-label-12 text-gray-700">
            <XText>{format.note}</XText>
          </p>
        )}
        <div className="mt-auto hidden flex-col items-start lg:flex">
          <Button
            variant="ghost"
            shape="rounded"
            size="icon-sm"
            aria-label="Previous format"
            disabled={index === 0}
            onClick={() => select(index - 1)}
          >
            <HugeiconsIcon icon={ArrowUp01Icon} strokeWidth={2} />
          </Button>
          <Button
            variant="ghost"
            shape="rounded"
            size="icon-sm"
            aria-label="Next format"
            disabled={index === formats.length - 1}
            onClick={() => select(index + 1)}
          >
            <HugeiconsIcon icon={ArrowDown01Icon} strokeWidth={2} />
          </Button>
        </div>
      </div>
    </div>
  )
}
