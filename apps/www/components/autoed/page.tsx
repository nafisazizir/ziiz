import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"

import { PageHeader } from "./page-header"

// Every page but a run: the bar, then a centred column that scrolls.
export function Page({
  title,
  description,
  actions,
  crumbs,
  wide = false,
  children,
}: {
  title: string
  description?: string
  actions?: React.ReactNode
  crumbs?: { label: string; href: string }[]
  wide?: boolean
  children: React.ReactNode
}) {
  return (
    <>
      <PageHeader bare={!crumbs}>
        <nav className="flex min-w-0 items-center gap-1.5 text-label-14">
          {crumbs?.map((c) => (
            <React.Fragment key={c.href}>
              <Link
                href={c.href}
                className="shrink-0 text-gray-900 hover:text-gray-1000"
              >
                {c.label}
              </Link>
              <span className="text-gray-700">/</span>
            </React.Fragment>
          ))}
          <span className="truncate text-gray-1000">{title}</span>
        </nav>
      </PageHeader>
      <div className="min-h-0 flex-1 overflow-y-auto">
        <div
          className={cn(
            "mx-auto flex w-full flex-col gap-10 px-4 pt-2.25 pb-16 md:px-8",
            wide ? "max-w-6xl" : "max-w-4xl"
          )}
        >
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="flex flex-col gap-1">
              <h1 className="text-heading-24 text-gray-1000">{title}</h1>
              {description ? (
                <p className="text-copy-14 text-gray-900">{description}</p>
              ) : null}
            </div>
            {actions}
          </div>
          {children}
        </div>
      </div>
    </>
  )
}

// A titled block of a page. The heading is a label, the body an object or
// a list; sections sit on whitespace, never in boxes of their own.
export function Section({
  title,
  description,
  action,
  children,
  className,
}: {
  title: string
  description?: string
  action?: React.ReactNode
  children: React.ReactNode
  className?: string
}) {
  return (
    <section className={cn("flex flex-col gap-3", className)}>
      <div className="flex items-end justify-between gap-4">
        <div className="flex flex-col gap-0.5">
          <h2 className="text-heading-16 text-gray-1000">{title}</h2>
          {description ? (
            <p className="text-copy-13 text-gray-900">{description}</p>
          ) : null}
        </div>
        {action}
      </div>
      {children}
    </section>
  )
}

// A bordered list: the frame is an object, its rows are tiles inside it,
// square and divided by hairlines.
export function List({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "flex flex-col divide-y divide-gray-alpha-400 overflow-hidden rounded-xl border border-gray-alpha-400",
        className
      )}
    >
      {children}
    </div>
  )
}
