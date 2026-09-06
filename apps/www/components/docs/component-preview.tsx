import { cn } from "@/lib/utils"

// A live example above its source. Presentational: the page renders the
// component into `children` and passes an already highlighted `source`
// (a ComponentSource, collapsible or not), so this knows nothing about
// where either came from.
function ComponentPreview({
  source,
  align = "center",
  hideCode = false,
  className,
  previewClassName,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  source?: React.ReactNode
  align?: "center" | "start" | "end"
  hideCode?: boolean
  previewClassName?: string
}) {
  return (
    <div
      data-slot="component-preview"
      data-not-typeset
      className={cn(
        "mt-(--typeset-flow,1.5rem) overflow-hidden rounded-lg border border-gray-alpha-400 bg-background-100",
        className
      )}
      {...props}
    >
      <div
        data-slot="component-preview-content"
        data-align={align}
        className={cn(
          "flex min-h-72 w-full justify-center p-10 text-gray-1000 data-[align=center]:items-center data-[align=end]:items-end data-[align=start]:items-start",
          previewClassName
        )}
      >
        {children}
      </div>
      {!hideCode && source ? (
        <div
          data-slot="component-preview-source"
          className="border-t border-gray-alpha-400 *:data-[slot=code-collapsible]:mt-0 [&_[data-slot=code-block]]:mt-0 [&_pre]:max-h-96 [&_pre]:rounded-none [&_pre]:border-0"
        >
          {source}
        </div>
      ) : null}
    </div>
  )
}

export { ComponentPreview }
