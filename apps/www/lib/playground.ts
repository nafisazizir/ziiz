import type * as React from "react"
import { REGISTRY_INDEX } from "../registry/__index__"
import type { RegistryIndexItem } from "../registry/schema"

export type PlaygroundItem = {
  name: string
  title: string
  type: "block" | "example"
}

export const PLAYGROUND_ITEMS: PlaygroundItem[] = REGISTRY_INDEX.filter(
  (item) => item.type === "registry:block" || item.type === "registry:example",
).map((item) => ({
  name: item.name,
  title: item.title,
  type: item.type === "registry:block" ? "block" : "example",
}))

export const DEFAULT_ITEM = "preview"

export function getPlaygroundItem(name: string | null | undefined) {
  return PLAYGROUND_ITEMS.find((item) => item.name === name) ?? null
}

type PlaygroundRegistryItem = RegistryIndexItem & {
  component: NonNullable<RegistryIndexItem["component"]>
}

const PLAYGROUND_REGISTRY_ITEMS = REGISTRY_INDEX.filter(
  (item): item is PlaygroundRegistryItem =>
    (item.type === "registry:block" || item.type === "registry:example") &&
    item.component !== undefined,
)

export const PLAYGROUND_LOADERS: Record<
  string,
  () => Promise<{ default: React.ComponentType }>
> = Object.fromEntries(
  PLAYGROUND_REGISTRY_ITEMS.map((item) => [item.name, item.component]),
)
