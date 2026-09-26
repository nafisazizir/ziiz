import * as React from "react"

import { cn } from "@/lib/utils"

// A strip of figures in a post: a number with the words that give it
// meaning, repeated across one square-cornered surface set into the page.
// Hairlines between cells are the 1px gaps of the grid showing the rule
// colour underneath, so they appear wherever the cells wrap without any
// per-cell logic. Three and four columns collapse to one and two below sm.
function StatGroup({
  className,
  columns,
  children,
  ...props
}: React.ComponentProps<"dl"> & { columns?: 1 | 2 | 3 | 4 }) {
  const count = React.Children.count(children)
  return (
    <dl
      data-slot="stat-group"
      data-columns={columns ?? Math.min(Math.max(count, 1), 4)}
      className={cn(
        "grid gap-px overflow-hidden bg-gray-alpha-400 data-[columns=1]:grid-cols-1 data-[columns=2]:grid-cols-2 data-[columns=3]:grid-cols-1 data-[columns=4]:grid-cols-2 *:data-[slot=stat]:bg-gray-100 data-[columns=3]:sm:grid-cols-3 data-[columns=4]:sm:grid-cols-4",
        className
      )}
      {...props}
    >
      {children}
    </dl>
  )
}

// One figure. Write the label first, then the value: that is the valid
// order for a definition list and what a screen reader says, while the
// value is shown on top.
function Stat({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="stat"
      className={cn(
        "flex min-w-0 flex-col items-center justify-center gap-1 px-4 py-8 text-center",
        className
      )}
      {...props}
    />
  )
}

function StatLabel({ className, ...props }: React.ComponentProps<"dt">) {
  return (
    <dt
      data-slot="stat-label"
      className={cn(
        "order-last text-label-13 text-balance text-gray-900",
        className
      )}
      {...props}
    />
  )
}

function StatValue({ className, ...props }: React.ComponentProps<"dd">) {
  return (
    <dd
      data-slot="stat-value"
      className={cn("text-heading-24 text-gray-1000", className)}
      {...props}
    />
  )
}

export { StatGroup, Stat, StatLabel, StatValue }
