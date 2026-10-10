import { getExample, getExampleSource } from "@/lib/examples"
import { cn } from "@/lib/utils"
import { Callout } from "@/components/docs/callout"
import { ComponentPreview as Preview } from "@/components/docs/component-preview"
import { CachedComponentSource } from "@/components/mdx/component-source"

// The app side of ComponentPreview: an example name resolves to the live
// component and to its own source file. There is one component set and one
// icon set here, so the name is the whole address: no style or base to
// disambiguate. A block takes the whole viewport, so it renders through an
// iframe onto its own /view page instead, at a desktop width from md up.
export function ComponentPreview({
  name,
  type,
  className,
  ...props
}: Omit<React.ComponentProps<typeof Preview>, "source" | "children"> & {
  name: string
  type?: "block"
}) {
  const Example = getExample(name)

  if (type === "block" && Example) {
    return (
      <div
        data-slot="component-preview"
        data-not-typeset
        className={cn(
          "relative mt-(--typeset-flow,1.5rem) aspect-[4/2.5] w-full overflow-hidden rounded-lg border border-gray-alpha-400 bg-background-100",
          className
        )}
      >
        <iframe
          src={`/view/${name}`}
          title={name}
          loading="lazy"
          className="absolute inset-0 size-full md:w-[1600px]"
        />
      </div>
    )
  }

  if (!Example) {
    return (
      <Callout variant="danger" title="Missing example">
        No example named <code>{name}</code> in <code>components/examples</code>
        . Run <code>pnpm registry:build</code> if you just added one.
      </Callout>
    )
  }

  return (
    <Preview
      className={className}
      source={
        <CachedComponentSource
          src={getExampleSource(name)}
          collapsible={false}
        />
      }
      {...props}
    >
      {/* A module-level entry in the generated index, not a component built
          here, so its identity is stable across renders. */}
      {/* eslint-disable-next-line react-hooks/static-components */}
      <Example />
    </Preview>
  )
}
