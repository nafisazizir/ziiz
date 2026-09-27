import { XText } from "@/components/business-x/runs"
import { cn } from "@/lib/utils"

// The vertical rhythm business.x.com's sections share: 40px of padding each
// side, 80px from 1024px, with an optional hairline on top.
export function Section({
  className,
  rule,
  tight,
  ...props
}: React.ComponentProps<"section"> & { rule?: boolean; tight?: boolean }) {
  return (
    <section
      className={cn(
        "flex w-full flex-col",
        tight ? "gap-10 lg:gap-14" : "gap-14",
        "py-10 lg:py-20",
        rule && "border-t border-gray-alpha-400",
        className
      )}
      {...props}
    />
  )
}

// A section's title: one heading role, the first line in ink and the second
// in the muted grey, then an optional row of actions 16px under.
export function SectionHeading({
  title,
  subtitle,
  actions,
  aside,
  className,
}: {
  title: string
  subtitle?: string
  actions?: React.ReactNode
  aside?: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn("flex items-end justify-between gap-6", className)}>
      <div className="flex flex-col">
        <h2 className="text-heading-32 text-balance text-gray-1000">
          <XText>{title}</XText>
          {subtitle && (
            <span className="block text-gray-900">
              <XText>{subtitle}</XText>
            </span>
          )}
        </h2>
        {actions && <div className="mt-4 flex flex-wrap gap-3">{actions}</div>}
      </div>
      {aside}
    </div>
  )
}

// A small ruled label with a square dot, the way x.com names a section
// beside its body. Below 1024px it takes a hairline underneath.
export function Eyebrow({
  children,
  className,
}: {
  children: string
  className?: string
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 max-lg:border-b max-lg:border-gray-alpha-400 max-lg:pb-2",
        className
      )}
    >
      <span aria-hidden className="size-1 shrink-0 bg-gray-700" />
      <p className="text-label-13 text-gray-1000">
        <XText>{children}</XText>
      </p>
    </div>
  )
}

// Two halves of the eight-column grid: a label or heading on the left, the
// body on the right. Below 1024px the halves stack.
export function SplitRow({
  lead,
  children,
  className,
}: {
  lead: React.ReactNode
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 lg:grid lg:grid-cols-8 lg:gap-x-4",
        className
      )}
    >
      <div className="lg:col-span-4 lg:self-start">{lead}</div>
      <div className="flex flex-col gap-4 lg:col-span-4 lg:col-start-5">
        {children}
      </div>
    </div>
  )
}

// Body copy in a section: 13px paragraphs 20px apart, links underlined.
export function Body({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5 text-copy-13 text-gray-900 [&_a]:text-gray-1000 [&_a]:underline [&_a]:underline-offset-2 [&_strong]:font-medium [&_strong]:text-gray-1000",
        className
      )}
      {...props}
    />
  )
}

export function Footnote({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      className={cn("text-label-12 text-balance text-gray-700", className)}
      {...props}
    />
  )
}
