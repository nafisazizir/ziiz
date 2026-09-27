import { type Icon } from "@tabler/icons-react"

import type { ArtProps } from "@/components/art/props"
import { XText } from "@/components/business-x/runs"
import { Body, Eyebrow, Footnote } from "@/components/business-x/section"
import { cn } from "@/lib/utils"

// Blocks the product pages share. Each mirrors a section shape on
// business.x.com's product landings.

// A figure beside its caption over a hairline: the dl x.com stacks under a
// product's About copy.
export function StatRow({
  value,
  label,
  className,
}: {
  value: string
  label: string
  className?: string
}) {
  return (
    <dl
      className={cn(
        "flex gap-3 border-t border-gray-alpha-400 pt-3",
        className
      )}
    >
      <dt className="w-[9.875rem] shrink-0 text-heading-32 text-gray-1000">
        <XText>{value}</XText>
      </dt>
      <dd className="flex-1 text-label-13 text-gray-900">
        <XText>{label}</XText>
      </dd>
    </dl>
  )
}

// A spec beside its value: label left, value right-aligned.
export function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <dl className="flex gap-3 border-t border-gray-alpha-400 pt-3 text-label-13">
      <dt className="flex-1 text-gray-900">{label}</dt>
      <dd className="w-[9.875rem] text-right text-gray-1000">{value}</dd>
    </dl>
  )
}

// Eyebrow and heading, a 400px grey panel with a phone, then copy with
// figures pushed to the bottom: three columns from 1220px, stacked below.
export function AboutSplit({
  eyebrow,
  title,
  panel,
  children,
  stats,
  className,
}: {
  eyebrow?: string
  title: string
  panel: React.ReactNode
  children: React.ReactNode
  stats?: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-10 min-[1220px]:grid min-[1220px]:grid-cols-[minmax(0,1fr)_400px_minmax(0,1fr)] min-[1220px]:gap-8",
        className
      )}
    >
      <div className="flex flex-col gap-3">
        {eyebrow && (
          <Eyebrow className="max-lg:border-b-0 max-lg:pb-0">{eyebrow}</Eyebrow>
        )}
        <h2 className="text-heading-32 text-balance text-gray-1000">
          <XText>{title}</XText>
        </h2>
      </div>
      <div className="flex min-h-128 flex-col overflow-hidden bg-gray-100 px-8 py-12 min-[1220px]:self-stretch">
        {panel}
      </div>
      <div className="flex flex-col justify-between gap-8">
        <Body>{children}</Body>
        {stats && <div className="flex flex-col gap-8">{stats}</div>}
      </div>
    </div>
  )
}

export type WhyRow = {
  title: string
  copy: React.ReactNode
  panel: React.ReactNode
  stat?: { value: string; label: string }
  note?: string
}

// Numbered rows of a two-column panel beside one column of copy, the panel
// switching sides each row; a figure sits at the foot of the copy.
export function WhyRows({
  items,
  className,
}: {
  items: WhyRow[]
  className?: string
}) {
  return (
    <ol className={cn("flex flex-col gap-20 lg:gap-30", className)}>
      {items.map((item, index) => {
        const panelLeft = index % 2 === 0
        return (
          <li
            key={item.title}
            className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-x-6 lg:gap-y-0"
          >
            <div
              className={cn(
                "flex flex-col gap-3 max-lg:row-start-2 lg:row-start-1",
                panelLeft ? "lg:col-start-3" : "lg:col-start-1"
              )}
            >
              <div className="flex items-center gap-4 text-label-13 text-gray-1000">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>
                  <XText>{item.title}</XText>
                </h3>
              </div>
              <Body className="gap-3">{item.copy}</Body>
              {item.note && <Footnote>{item.note}</Footnote>}
              {item.stat && (
                <StatRow
                  value={item.stat.value}
                  label={item.stat.label}
                  className="mt-auto"
                />
              )}
            </div>
            <div
              className={cn(
                "relative flex aspect-[405/400] items-center justify-center overflow-hidden bg-gray-100 max-lg:row-start-1 lg:col-span-2 lg:row-start-1 lg:aspect-[743/480]",
                panelLeft ? "lg:col-start-1" : "lg:col-start-2"
              )}
            >
              {item.panel}
            </div>
          </li>
        )
      })}
    </ol>
  )
}

export type LeadRow = {
  title: string
  icon?: Icon
  mark?: (props: ArtProps) => React.ReactNode
  copy: React.ReactNode
  footnote?: React.ReactNode
}

// Rows of a titled lead in the left four columns and copy in the right
// four, hairlines between rows; a dot or icon leads the title.
export function LeadRows({
  items,
  className,
}: {
  items: LeadRow[]
  className?: string
}) {
  return (
    <ol className={cn("flex flex-col gap-6 lg:gap-9", className)}>
      {items.map((item, index) => (
        <li
          key={item.title}
          className="flex flex-col gap-3 lg:grid lg:grid-cols-8 lg:gap-x-4"
        >
          <div
            className={cn(
              "flex items-center gap-2 max-lg:border-b max-lg:border-gray-alpha-400 max-lg:pb-2 lg:col-span-4 lg:self-start",
              index === 0 ? "lg:pt-[3px]" : "lg:pt-9"
            )}
          >
            {item.icon ? (
              <item.icon
                stroke={1.5}
                className="size-4 shrink-0 text-gray-1000"
              />
            ) : item.mark ? (
              <item.mark className="size-4 shrink-0 text-gray-1000" />
            ) : (
              <span aria-hidden className="size-1 shrink-0 bg-gray-700" />
            )}
            <p
              className={cn(
                "text-label-13 text-gray-1000",
                item.icon || item.mark ? "ml-2" : "ml-1"
              )}
            >
              <XText>{item.title}</XText>
            </p>
          </div>
          <div
            className={cn(
              "flex flex-col gap-4 lg:col-span-4 lg:col-start-5",
              index > 0 && "lg:border-t lg:border-gray-alpha-400 lg:pt-9"
            )}
          >
            <Body>{item.copy}</Body>
            {item.footnote}
          </div>
        </li>
      ))}
    </ol>
  )
}

// A six-column 15:8 panel beside two columns of copy (9:8 above the copy
// below 1024px), the shape of a tab panel without the tabs.
export function PanelRow({
  panel,
  children,
  className,
}: {
  panel: React.ReactNode
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn("flex flex-col gap-6 lg:grid lg:grid-cols-8", className)}
    >
      <div className="relative aspect-9/8 overflow-hidden bg-gray-100 lg:col-span-6 lg:aspect-15/8">
        {panel}
      </div>
      <div className="flex flex-col gap-6 lg:col-span-2">
        <Body>{children}</Body>
      </div>
    </div>
  )
}

export type TrioCard = {
  title: string
  copy: string
  art?: (props: ArtProps) => React.ReactNode
  panel?: React.ReactNode
}

// A heading in the first four columns and three numbered cards, the first
// beside the heading and two under it, each a square-ish panel of card art
// beside its number, title and copy. Stacked one under another below lg.
export function CardTrio({
  title,
  subtitle,
  items,
  className,
}: {
  title: string
  subtitle?: string
  items: TrioCard[]
  className?: string
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-x-4 gap-y-8 lg:grid-cols-8 lg:gap-y-8",
        className
      )}
    >
      <h2 className="text-heading-32 text-balance text-gray-1000 lg:col-span-4">
        <XText>{title}</XText>
        {subtitle && (
          <span className="block text-gray-900">
            <XText>{subtitle}</XText>
          </span>
        )}
      </h2>
      {items.map((item, index) => (
        <div
          key={item.title}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-4"
        >
          <div className="flex aspect-3/2 items-center justify-center overflow-hidden bg-gray-100 p-6 text-gray-1000 sm:aspect-square">
            {item.panel ?? (item.art && <item.art className="size-full" />)}
          </div>
          <div className="flex flex-col justify-between gap-3">
            <span className="text-label-13 text-gray-700">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className="flex flex-col gap-1">
              <h3 className="text-heading-14 text-gray-1000">
                <XText>{item.title}</XText>
              </h3>
              <p className="text-copy-13 text-balance text-gray-900">
                <XText>{item.copy}</XText>
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
