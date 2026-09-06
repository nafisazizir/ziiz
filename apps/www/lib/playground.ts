// Client-safe view of the registry manifest: blocks first, then examples,
// like /create's action menu. Loaders live in the generated __registry__.

import registry from "@/registry.json"

export type PlaygroundItem = {
  name: string
  title: string
  type: "block" | "example"
}

const items = registry.items.map((item) => ({
  name: item.name,
  title: item.title,
  type: item.type,
}))

export const PLAYGROUND_ITEMS: PlaygroundItem[] = [
  ...items.filter((item) => item.type === "registry:block"),
  ...items.filter((item) => item.type === "registry:example"),
].map(({ name, title, type }) => ({
  name,
  title,
  type: type === "registry:block" ? "block" : "example",
}))

export const DEFAULT_ITEM = "preview"

export function getPlaygroundItem(name: string | null | undefined) {
  return PLAYGROUND_ITEMS.find((item) => item.name === name) ?? null
}
