import { Index, PREVIEW_ITEMS } from "@/__previews__"
import { Callout } from "@/components/docs/callout"
import { ComponentPreview } from "@/components/docs/component-preview"
import { ComponentSource } from "@/components/docs/component-source"

// The app side of ComponentPreview: resolves a demo by name to its component
// (via the generated preview index) and its source file.
export async function DemoPreview({
  name,
  ...props
}: Omit<
  React.ComponentProps<typeof ComponentPreview>,
  "source" | "children"
> & {
  name: string
}) {
  const item = PREVIEW_ITEMS.find((p) => p.name === name)
  const loader = Index[name]

  if (!item || !loader) {
    return (
      <Callout variant="danger" title="Missing demo">
        No preview named <code>{name}</code> is registered.
      </Callout>
    )
  }

  const { default: Demo } = await loader()

  return (
    <ComponentPreview source={<ComponentSource src={item.entry} />} {...props}>
      <Demo />
    </ComponentPreview>
  )
}

// A full example or block, embedded through the chrome-less preview route so
// it lays out in its own viewport.
export function ExampleFrame({
  name,
  title,
  className,
  ...props
}: React.ComponentProps<"div"> & { name: string }) {
  const item = PREVIEW_ITEMS.find((p) => p.name === name)

  if (!item) {
    return (
      <Callout variant="danger" title="Missing example">
        No preview named <code>{name}</code> is registered.
      </Callout>
    )
  }

  return (
    <div
      data-slot="example-frame"
      data-not-typeset
      className={
        className ??
        "mt-(--typeset-flow,1.5rem) aspect-[4/3] w-full overflow-hidden rounded-lg border border-gray-alpha-400 bg-background-100"
      }
      {...props}
    >
      <iframe
        src={`/preview/${name}`}
        title={title ?? item.title}
        loading="lazy"
        className="size-full"
      />
    </div>
  )
}
