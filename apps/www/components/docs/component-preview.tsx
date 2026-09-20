import { cn } from "@/lib/utils"
import { CodeCollapsible } from "@/components/docs/code-collapsible"

// A live example above its source. Presentational: the page renders the
// component into `children` and passes an already highlighted `source`,
// so this knows nothing about where either came from. The source starts
// as a three-line teaser under a View Code control; pass a source that
// is not collapsible, since the preview does the revealing.
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
          className="border-t border-gray-alpha-400"
        >
          <CodeCollapsible expandLabel="View Code" collapseLabel="Hide Code">
            {source}
          </CodeCollapsible>
        </div>
      ) : null}
    </div>
  )
}

export { ComponentPreview }
