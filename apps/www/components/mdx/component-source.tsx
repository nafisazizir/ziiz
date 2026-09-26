import { cacheLife } from "next/cache"

import { getRegistryItemWithContent } from "@/lib/registry"
import { Callout } from "@/components/docs/callout"
import { ComponentSource } from "@/components/docs/component-source"

// Highlighting reads a file and runs shiki — deterministic for a given
// source, so cache the whole render here at the app layer. The published
// component keeps no "use cache" of its own so consumers don't need the
// flag.
export async function CachedComponentSource(
  props: React.ComponentProps<typeof ComponentSource>
) {
  "use cache"
  cacheLife("max")
  return <ComponentSource {...props} />
}

// The app side of ComponentSource: a registry item name resolves to the
// built item's first file, the same payload `shadcn add` receives.
export function RegistrySource({
  name,
  title,
  ...props
}: Omit<React.ComponentProps<typeof ComponentSource>, "code" | "src"> & {
  name: string
}) {
  const item = getRegistryItemWithContent(name)
  const file = item?.files[0]

  if (!file) {
    return (
      <Callout variant="danger" title="Missing registry item">
        No built registry item named <code>{name}</code>. Run{" "}
        <code>pnpm registry:build</code>.
      </Callout>
    )
  }

  return (
    <CachedComponentSource
      code={file.content}
      title={title ?? file.target ?? file.path.replace(/^apps\/www\//, "")}
      {...props}
    />
  )
}
