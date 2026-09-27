import { XText } from "@/components/business-x/runs"
import { cn } from "@/lib/utils"

export type StatTile = {
  value: string
  label: string
  // Columns of the eight-column grid from 1024px; two by default.
  span?: 2 | 4
  // Height at 1024px and up, in the site's three steps.
  height?: "sm" | "md" | "lg"
  // Grid placement for the staggered layouts.
  col?: number
  row?: number
  rowSpan?: number
}

const heights = { sm: "lg:h-62", md: "lg:h-82", lg: "lg:h-102" }
const spans = { 2: "lg:col-span-2", 4: "lg:col-span-4" }
const cols = [
  "",
  "lg:col-start-1",
  "lg:col-start-2",
  "lg:col-start-3",
  "lg:col-start-4",
  "lg:col-start-5",
  "lg:col-start-6",
  "lg:col-start-7",
]
const rows = ["", "lg:row-start-1", "lg:row-start-2"]

// Figures set into grey tiles of stepped heights, bottom-aligned on the
// eight-column grid so they stagger like a skyline. Below 1024px they stack
// at their natural height, 16px apart.
export function StatTiles({
  items,
  children,
  className,
}: {
  items: StatTile[]
  children?: React.ReactNode
  className?: string
}) {
  return (
    <ul
      className={cn(
        "flex flex-col gap-4 lg:grid lg:grid-cols-8 lg:items-end",
        className
      )}
    >
      {items.map((item) => (
        <li
          key={item.value + item.label}
          className={cn(
            "relative flex flex-col gap-3 bg-gray-100 p-6 lg:self-end",
            spans[item.span ?? 2],
            heights[item.height ?? "sm"],
            item.col && cols[item.col],
            item.row && rows[item.row],
            item.rowSpan === 2 && "lg:row-span-2"
          )}
        >
          <p className="text-heading-32 text-gray-1000">
            <XText>{item.value}</XText>
          </p>
          <p className="text-copy-13 text-balance text-gray-900">
            <XText>{item.label}</XText>
          </p>
        </li>
      ))}
      {children}
    </ul>
  )
}

// A quote in the tile grid, set in ink on the dark surface x.com inverts for
// it. Four columns wide, the short height.
export function QuoteTile({
  quote,
  name,
  org,
  className,
}: {
  quote: string
  name: string
  org?: string
  className?: string
}) {
  return (
    <li
      className={cn(
        "flex flex-col justify-between gap-8 bg-gray-1000 p-6 text-background-100 lg:col-span-4 lg:h-62 lg:self-end",
        className
      )}
    >
      <p className="text-label-13 text-balance">
        <XText>{quote}</XText>
      </p>
      <div className="flex flex-col text-label-13">
        <p>{name}</p>
        {org && <p className="text-gray-500">{org}</p>}
      </div>
    </li>
  )
}
