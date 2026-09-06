import { PREVIEW_ITEMS } from "@/__previews__"
import { componentDescriptions } from "@/lib/component-meta"
import { getRegistryItemWithContent, type RegistryItem } from "@/lib/registry"
import { ComponentSource } from "@/components/docs/component-source"
import { InstallTabs } from "@/components/install-tabs"
import { ExampleFrame } from "@/components/mdx/component-preview"

// The page a ui component gets when it has no authored MDX: the example
// gallery, installation, and the import line. An MDX file at
// content/docs/components/<name>.mdx takes over the route.
export function ComponentPage({ item }: { item: RegistryItem }) {
  const built = getRegistryItemWithContent(item.name)
  const file = built?.files[0]
  const exportsList = file ? readExports(file.content) : []
  const example = PREVIEW_ITEMS.find((p) => p.name === `${item.name}-example`)
  const description = componentDescriptions[item.name]

  return (
    <>
      <h1>{item.title}</h1>
      {description ? <p>{description}</p> : null}

      {example ? <ExampleFrame name={example.name} /> : null}

      <h2 id="installation">Installation</h2>
      <InstallTabs
        name={item.name}
        dependencies={item.dependencies}
        file={file?.path.replace(/^apps\/www\//, "") ?? ""}
      />

      <h2 id="usage">Usage</h2>
      <ComponentSource
        code={`import { ${exportsList.join(", ")} } from "@/components/ui/${item.name}"`}
        language="tsx"
        collapsible={false}
      />
    </>
  )
}

// Named exports from the component's `export { ... }` block, minus the cva
// variant objects, which are for extending rather than rendering.
function readExports(source: string): string[] {
  const names = new Set<string>()
  for (const match of source.matchAll(/export\s*\{([^}]+)\}/g)) {
    for (const raw of match[1].split(",")) {
      const name = raw
        .trim()
        .split(/\s+as\s+/)
        .pop()
        ?.trim()
      if (name && !name.endsWith("Variants") && !name.startsWith("type "))
        names.add(name)
    }
  }
  return [...names]
}
