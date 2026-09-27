import { XText } from "@/components/business-x/runs"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export type Feature = {
  title: string
  copy: React.ReactNode
  mock?: React.ReactNode
  // The mock's natural width in px; it is zoomed to the panel's height.
  scene?: number
  // Spans the whole row at 7:3 from 1024px instead of 9:8 across two columns.
  wide?: boolean
  // A pill that opens on hover from 768px, as x.com's "Explore Ads".
  action?: React.ReactNode
  // Which side the panel takes on a two-column row (from 640px). Rows
  // alternate by default, the text leading first.
  panelFirst?: boolean
  // Fill the panel outright instead of zooming a mock into it.
  panel?: React.ReactNode
}

// A numbered list of features, each a product mock in a grey panel beside a
// title and two lines. x.com's geometry from 1024px: an eight-column grid, a
// feature is a 9:8 panel at two columns beside two columns of text, and a
// wide one runs 7:3 across four. Hovering a feature dims the others.
//
// Below 1024px the features stack. From 640px each is a two-column row,
// alternating which side the panel takes; under 640px the panel sits above
// the text. The panel is 3:2 until 960px, then 11:6.
//
// The mocks are real components at a fixed natural width (`scene`), so each
// is zoomed from that width to the panel's content height, which is how
// x.com's container-query drawings behave.
export function NumberedFeatures({
  items,
  className,
}: {
  items: Feature[]
  className?: string
}) {
  return (
    <ol
      className={cn("group/list grid grid-cols-8 gap-x-4 gap-y-12", className)}
    >
      {items.map((feature, index) => {
        const panelFirst = feature.panelFirst ?? index % 2 === 1
        return (
          <li
            key={feature.title}
            className={cn(
              "group/feature col-span-8 grid grid-cols-1 gap-4 transition-opacity duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-has-[li:hover]/list:not-hover:opacity-50 sm:grid-cols-2",
              feature.wide ? "lg:grid-cols-8" : "lg:col-span-4"
            )}
          >
            <div
              className={cn(
                "relative flex aspect-3/2 items-center justify-center overflow-hidden bg-gray-100 sm:aspect-9/6 min-[60rem]:aspect-11/6",
                !feature.panel && "p-4 lg:p-6",
                feature.wide ? "lg:col-span-4 lg:aspect-7/3" : "lg:aspect-9/8",
                !panelFirst && "sm:order-2 lg:order-none"
              )}
            >
              {feature.panel ?? (
                <MockScene width={feature.scene ?? 240}>
                  {feature.mock}
                </MockScene>
              )}
            </div>
            <div
              className={cn(
                "flex flex-col justify-start gap-3 text-balance sm:justify-between sm:gap-0",
                feature.wide && "lg:col-span-2",
                !panelFirst && "sm:order-1 lg:order-none"
              )}
            >
              <span className="text-label-13 text-gray-700">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="flex flex-col">
                <div className="flex flex-col gap-1">
                  <h3 className="text-heading-14 text-gray-1000">
                    <XText>{feature.title}</XText>
                  </h3>
                  <p className="text-copy-13 text-gray-900">{feature.copy}</p>
                </div>
                {feature.action && (
                  <div className="grid grid-rows-[1fr] transition-[grid-template-rows] duration-300 md:grid-rows-[0fr] md:group-hover/feature:grid-rows-[1fr]">
                    <div className="-mx-2 flex flex-col justify-end overflow-hidden px-2">
                      <div className="pt-4 pb-2 transition-opacity duration-300 md:opacity-0 md:group-hover/feature:opacity-100">
                        {feature.action}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </li>
        )
      })}
    </ol>
  )
}

// A mock at its natural width, zoomed so it is exactly as wide as the
// enclosing panel's content area is tall. Chrome 145 resolves the length
// division in zoom.
export function MockScene({
  width,
  children,
}: {
  width: number
  children: React.ReactNode
}) {
  return (
    <div className="[container-type:size] flex size-full items-center justify-center">
      <div
        className="flex shrink-0 items-center justify-center"
        style={{ width, zoom: `calc(100cqh / ${width}px)` }}
      >
        {children}
      </div>
    </div>
  )
}

export function FeatureAction({
  children = "Learn more",
  href,
}: {
  children?: React.ReactNode
  href?: string
}) {
  return (
    <Button
      shape="rounded"
      variant="secondary"
      size="sm"
      nativeButton={!href}
      render={href ? <a href={href} /> : undefined}
    >
      {children}
    </Button>
  )
}
