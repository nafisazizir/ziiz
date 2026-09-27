"use client"

import * as React from "react"

import {
  calendar,
  type CalendarEvent,
} from "@/components/business-x/data/marketing-calendar"
import { FormDropdown } from "@/components/business-x/form-dropdown"
import { XText } from "@/components/business-x/runs"
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/icons"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Field, FieldLabel } from "@/components/ui/field"

const regions = [
  { label: "Global", value: "global" },
  { label: "North America", value: "na" },
  { label: "Europe", value: "eu" },
  { label: "Asia Pacific", value: "apac" },
]

const kinds = [
  { label: "Show all", value: "all" },
  ...Array.from(
    new Set(calendar.flatMap((m) => m.events.map((e) => e.category)))
  ).map((category) => ({ label: category, value: category })),
]

// The 2026 marketing calendar: a month picker with two filters stuck to the
// left from 1024px, and every month's events down the right, each month a
// ruled heading beside its list. Below 1024px a bar with the month and its
// arrows sticks under the mobile header and the picker sits above the list.
export function MarketingCalendar() {
  const [month, setMonth] = React.useState(() => new Date(2026, 0, 1))
  const [kind, setKind] = React.useState("all")
  // DayPicker's day cells differ between server and client, so the picker
  // waits for hydration behind a box of its own height.
  const mounted = React.useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  )
  const label = month.toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  })

  const step = (delta: number) =>
    setMonth((m) => new Date(m.getFullYear(), m.getMonth() + delta, 1))

  const jump = (name: string) => {
    document
      .getElementById(`month-${name.toLowerCase()}`)
      ?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  const controls = (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="xs"
        shape="rounded"
        onClick={() => {
          setMonth(new Date(2026, 0, 1))
          jump("January")
        }}
      >
        Today
      </Button>
      <span className="h-3 w-px bg-gray-alpha-400" />
      <Button
        variant="ghost"
        size="icon-xs"
        shape="rounded"
        aria-label="Previous month"
        onClick={() => step(-1)}
      >
        <ChevronLeftIcon />
      </Button>
      <Button
        variant="ghost"
        size="icon-xs"
        shape="rounded"
        aria-label="Next month"
        onClick={() => step(1)}
      >
        <ChevronRightIcon />
      </Button>
    </div>
  )

  return (
    <section className="flex flex-col border-b border-gray-alpha-400 pt-4 pb-14 lg:pt-20">
      <h2 className="sr-only">Marketing calendar</h2>
      <div className="sticky top-14 z-30 -mx-4 flex items-center justify-between border-b border-gray-alpha-400 bg-background-100 px-4 py-4 md:top-0 lg:hidden">
        <span className="text-label-13 text-gray-1000">{label}</span>
        {controls}
      </div>
      <div className="grid gap-14 lg:grid-cols-[268px_1fr] lg:gap-10">
        <div className="flex flex-col gap-4 self-start lg:sticky lg:top-20">
          <div className="flex flex-col gap-2">
            <div className="hidden h-5 items-center justify-between lg:flex">
              <span className="text-label-13 text-gray-1000">{label}</span>
              {controls}
            </div>
            <div className="flex justify-center bg-gray-100 px-4 py-6 lg:p-6">
              {!mounted && <div aria-hidden className="h-62 w-56" />}
              {mounted && (
                <Calendar
                  mode="single"
                  month={month}
                  onMonthChange={setMonth}
                  hideNavigation
                  onSelect={(day) => {
                    if (day)
                      jump(day.toLocaleString("en-US", { month: "long" }))
                  }}
                  classNames={{ caption_label: "sr-only" }}
                  className="p-0"
                />
              )}
            </div>
          </div>
          <Field>
            <FieldLabel htmlFor="calendar-region">Region</FieldLabel>
            <FormDropdown
              id="calendar-region"
              placeholder="Global"
              options={regions}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="calendar-kind">Event Type</FieldLabel>
            <FormDropdown
              id="calendar-kind"
              placeholder="Show all"
              options={kinds}
              onValueChange={setKind}
            />
          </Field>
        </div>
        <div className="flex min-w-0 flex-col gap-22 lg:pt-7">
          {calendar.map((entry) => {
            const events =
              kind === "all"
                ? entry.events
                : entry.events.filter((event) => event.category === kind)
            if (!events.length) return null
            return (
              <section
                key={entry.month}
                id={`month-${entry.month.toLowerCase()}`}
                className="grid min-w-0 scroll-mt-20 gap-4 lg:grid-cols-[228px_minmax(0,1fr)] lg:gap-10"
              >
                <h3 className="flex h-11 items-center justify-between gap-2 self-start border-t border-gray-alpha-400">
                  <span className="flex items-center gap-2 text-label-13 text-gray-1000">
                    <span aria-hidden className="size-1 bg-gray-700" />
                    {entry.month}
                  </span>
                  <span className="text-copy-13 text-gray-900">{`${events.length} Events`}</span>
                </h3>
                <ul className="flex min-w-0 flex-col">
                  {events.map((event, index) => (
                    <EventRow key={index} event={event} />
                  ))}
                </ul>
              </section>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function EventRow({ event }: { event: CalendarEvent }) {
  return (
    <li className="border-b border-gray-alpha-400 pb-2 last:border-b-0">
      <div className="flex min-h-11 flex-wrap items-center justify-between gap-x-4 gap-y-1 bg-gray-100 px-3 py-3">
        <Badge>{event.category}</Badge>
        <span className="ml-auto text-right text-label-13 text-gray-1000">
          {event.date}
        </span>
      </div>
      <div className="flex min-h-11 flex-col justify-center gap-1 px-3 py-3">
        <p className="text-label-13 text-gray-1000">
          <XText>{event.name}</XText>
        </p>
        {event.note && (
          <p className="text-label-12 text-gray-700">{event.note}</p>
        )}
      </div>
    </li>
  )
}
