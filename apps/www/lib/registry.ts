import fs from "node:fs"
import path from "node:path"

import registry from "@/registry.json"

export type RegistryItemType =
  "registry:ui" | "registry:component" | "registry:hook"

export type RegistryFile = {
  path: string
  type: RegistryItemType
  target?: string
}

export type RegistryItem = {
  name: string
  type: RegistryItemType
  title: string
  dependencies?: string[]
  registryDependencies?: string[]
  files: RegistryFile[]
}

export type RegistryItemWithContent = Omit<RegistryItem, "files"> & {
  files: (RegistryFile & { content: string })[]
}

export const registryItems = registry.items as RegistryItem[]

/** Registry namespace and the URL a consumer's components.json points at. */
export const registryNamespace = "@ziiz"

export function getRegistryUrl(siteUrl: string) {
  return `${siteUrl}/r/{name}.json`
}

export function getRegistryItem(name: string | null | undefined) {
  return registryItems.find((item) => item.name === name) ?? null
}

export function getRegistryItems(type: RegistryItemType) {
  return registryItems.filter((item) => item.type === type)
}

/** The built item with file contents inlined, as `shadcn build` emitted it.
 *  Server-only: reads public/r/<name>.json off disk. */
export function getRegistryItemWithContent(
  name: string
): RegistryItemWithContent | null {
  const file = path.join(process.cwd(), "public/r", `${name}.json`)
  if (!fs.existsSync(file)) return null
  return JSON.parse(fs.readFileSync(file, "utf8")) as RegistryItemWithContent
}
