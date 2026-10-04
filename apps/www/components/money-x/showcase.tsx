import { XText } from "@/components/business-x/runs"
import { cn } from "@/lib/utils"

// A heading, a 400px picture and a short aside. From 1220px the three sit
// in a row, the picture in the middle; from 1024px the picture takes the
// right and the aside drops under the heading; below that they stack. The
// grid is fenced to its own range: Tailwind sorts an arbitrary min- before
// lg, so the row could not win it back.
export function Showcase({
  eyebrow,
  title,
  subtitle,
  panel,
  panelClassName,
  className,
  children,
}: {
  eyebrow: string
  title: string
  subtitle: string
  panel: React.ReactNode
  panelClassName?: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col min-[1220px]:flex-row min-[1220px]:items-stretch min-[1220px]:gap-8 lg:max-[1219px]:grid lg:max-[1219px]:grid-cols-[minmax(0,1fr)_400px] lg:max-[1219px]:grid-rows-[auto_1fr] lg:max-[1219px]:gap-x-8 lg:max-[1219px]:gap-y-3">
      <div className="flex flex-1 flex-col gap-3 lg:col-start-1 lg:row-start-1">
        <div className="flex items-center gap-2">
          <span aria-hidden className="size-1 shrink-0 bg-gray-700" />
          <p className="text-label-13 text-gray-1000">
            <XText>{eyebrow}</XText>
          </p>
        </div>
        <h2 className="text-heading-32 text-balance text-gray-1000">
          <XText>{title}</XText>
          <span className="block text-gray-900">
            <XText>{subtitle}</XText>
          </span>
        </h2>
      </div>
      <div
        aria-hidden
        inert
        className={cn(
          "[container-type:inline-size] relative mt-10 w-full shrink-0 overflow-hidden bg-gray-100 text-gray-1000 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:mt-0 lg:max-w-[400px] lg:self-start",
          panelClassName
        )}
      >
        {panel}
      </div>
      <div
        className={cn(
          "mt-8 flex flex-1 flex-col justify-between gap-8 lg:col-start-1 lg:row-start-2 lg:mt-0",
          className
        )}
      >
        {children}
      </div>
    </div>
  )
}
