import { getExample, getExampleSource } from "@/lib/examples"
import { Callout } from "@/components/docs/callout"
import { ComponentPreview as Preview } from "@/components/docs/component-preview"
import { ComponentSource } from "@/components/docs/component-source"

// The app side of ComponentPreview: an example name resolves to the live
// component and to its own source file. There is one component set and one
// icon set here, so the name is the whole address — no style or base to
// disambiguate, and nothing is rendered through an iframe.
export function ComponentPreview({
  name,
  ...props
}: Omit<React.ComponentProps<typeof Preview>, "source" | "children"> & {
  name: string
}) {
  const Example = getExample(name)

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
      source={
        <ComponentSource src={getExampleSource(name)} collapsible={false} />
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
