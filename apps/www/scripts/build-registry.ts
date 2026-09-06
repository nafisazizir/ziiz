import {
  mkdirSync,
  readFileSync,
  readdirSync,
  statSync,
  writeFileSync,
} from "node:fs"
import { dirname, join, relative, sep } from "node:path"
import { REGISTRY_META } from "../registry/meta.ts"

type RegistryType =
  | "registry:ui"
  | "registry:component"
  | "registry:hook"
  | "registry:lib"
  | "registry:example"
  | "registry:block"

type RegistryFile = {
  path: string
  type: RegistryType
  target: string
}

type RegistryItem = {
  name: string
  type: RegistryType
  title: string
  description?: string
  dependencies?: string[]
  registryDependencies?: string[]
  files: RegistryFile[]
}

const root = dirname(import.meta.dirname)
const componentsDir = join(root, "components")
const registryDir = join(root, "registry")
const outputDir = join(root, "public", "r")
const packageExclusions = new Set(["react", "react-dom", "next"])
const registryTypes: RegistryType[] = [
  "registry:ui",
  "registry:component",
  "registry:hook",
  "registry:lib",
  "registry:example",
  "registry:block",
]

function toPosixPath(path: string) {
  return path.split(sep).join("/")
}

function titleFromName(name: string) {
  const baseName = name.replace(/-example$/, "")
  return baseName
    .split("-")
    .map((word) => word[0]?.toUpperCase() + word.slice(1))
    .join(" ")
}

function filesInDirectory(directory: string, extension: string) {
  return readdirSync(directory)
    .map((name) => join(directory, name))
    .filter((path) => statSync(path).isFile() && path.endsWith(extension))
}

function blockFiles(directory: string) {
  const files: string[] = []

  function visit(currentDirectory: string) {
    for (const entry of readdirSync(currentDirectory).sort()) {
      const path = join(currentDirectory, entry)
      if (statSync(path).isDirectory()) {
        visit(path)
      } else if (path.endsWith(".tsx")) {
        files.push(path)
      }
    }
  }

  visit(directory)
  return files.sort((a, b) => {
    const aRelative = relative(directory, a)
    const bRelative = relative(directory, b)
    if (aRelative === "index.tsx") return -1
    if (bRelative === "index.tsx") return 1
    return aRelative.localeCompare(bRelative)
  })
}

function importSpecifiers(source: string) {
  const specifiers: string[] = []
  const pattern =
    /(?:from\s*|import\s*(?:\(\s*)?|export\s+from\s*)["']([^"']+)["']/g

  for (const match of source.matchAll(pattern)) {
    specifiers.push(match[1])
  }

  return specifiers
}

function packageName(specifier: string) {
  const segments = specifier.split("/")
  return specifier.startsWith("@") ? segments.slice(0, 2).join("/") : segments[0]
}

function isExcludedPackage(name: string) {
  return (
    packageExclusions.has(name) ||
    name.startsWith("next/") ||
    name.startsWith("@ziiz/")
  )
}

function fileForComponent(name: string) {
  const path = join(componentsDir, `${name}.tsx`)
  if (!statSync(path, { throwIfNoEntry: false })) {
    throw new Error(`Missing component file for @/components/${name}: ${path}`)
  }
  return path
}

function createItem(
  name: string,
  type: RegistryType,
  paths: string[],
  targets: string[] = paths,
): RegistryItem {
  return {
    name,
    type,
    title: REGISTRY_META[name]?.title ?? titleFromName(name),
    ...(REGISTRY_META[name]?.description
      ? { description: REGISTRY_META[name].description }
      : {}),
    files: paths.map((path, index) => ({
      path: toPosixPath(relative(root, path)),
      type: type === "registry:block" ? "registry:component" : type,
      target: toPosixPath(relative(root, targets[index])),
    })),
  }
}

const items = new Map<string, RegistryItem>()

for (const path of filesInDirectory(join(componentsDir, "ui"), ".tsx")) {
  const name = path.slice(0, -".tsx".length).split(sep).at(-1) as string
  items.set(name, createItem(name, "registry:ui", [path]))
}

for (const path of filesInDirectory(join(componentsDir, "examples"), ".tsx")) {
  const name = path.slice(0, -".tsx".length).split(sep).at(-1) as string
  items.set(name, createItem(name, "registry:example", [path]))
}

for (const entry of readdirSync(join(componentsDir, "blocks")).sort()) {
  const path = join(componentsDir, "blocks", entry)
  if (!statSync(path).isDirectory()) continue
  items.set(entry, createItem(entry, "registry:block", blockFiles(path)))
}

for (const name of ["example", "icon-placeholder"]) {
  const path = fileForComponent(name)
  items.set(name, createItem(name, "registry:component", [path]))
}

for (const path of filesInDirectory(join(root, "hooks"), ".ts")) {
  const name = path.slice(0, -".ts".length).split(sep).at(-1) as string
  items.set(name, createItem(name, "registry:hook", [path]))
}

items.set("utils", createItem("utils", "registry:lib", [join(root, "lib", "utils.ts")]))

function collectDependencies(item: RegistryItem) {
  const registryDependencies = new Set<string>()
  const dependencies = new Set<string>()

  for (const file of item.files) {
    const source = readFileSync(join(root, file.path), "utf8")
    for (const specifier of importSpecifiers(source)) {
      if (specifier.startsWith("@/components/blocks/")) {
        const blockPrefix = `@/components/blocks/${item.name}/`
        if (item.type === "registry:block" && specifier.startsWith(blockPrefix)) {
          continue
        }
        throw new Error(
          `Unsupported block import in ${file.path}: ${specifier}`,
        )
      }

      if (specifier === "@/components/icons/hugeicons") continue

      if (specifier.startsWith("@/components/ui/")) {
        registryDependencies.add(specifier.slice("@/components/ui/".length))
      } else if (specifier.startsWith("@/components/")) {
        const componentName = specifier.slice("@/components/".length)
        if (componentName.includes("/")) {
          throw new Error(`Unsupported component import in ${file.path}: ${specifier}`)
        }
        const componentPath = fileForComponent(componentName)
        if (!items.has(componentName)) {
          items.set(
            componentName,
            createItem(componentName, "registry:component", [componentPath]),
          )
        }
        if (componentName !== item.name) registryDependencies.add(componentName)
      } else if (specifier.startsWith("@/hooks/")) {
        registryDependencies.add(specifier.slice("@/hooks/".length))
      } else if (specifier === "@/lib/utils") {
        registryDependencies.add("utils")
      } else if (specifier.startsWith("@/")) {
        throw new Error(`Unsupported alias import in ${file.path}: ${specifier}`)
      } else if (!specifier.startsWith(".")) {
        const name = packageName(specifier)
        if (!isExcludedPackage(name)) dependencies.add(name)
      }
    }
  }

  registryDependencies.delete(item.name)
  if (registryDependencies.size > 0) {
    item.registryDependencies = [...registryDependencies].sort()
  }
  if (dependencies.size > 0) item.dependencies = [...dependencies].sort()
}

let previousItemCount = 0
while (previousItemCount !== items.size) {
  previousItemCount = items.size
  for (const item of items.values()) {
    collectDependencies(item)
    for (const dependency of item.registryDependencies ?? []) {
      if (!items.has(dependency) && dependency !== "utils") {
        throw new Error(
          `No registry item exists for dependency "${dependency}" of "${item.name}"`,
        )
      }
    }
  }
}

const orderedItems = registryTypes.flatMap((type) =>
  [...items.values()]
    .filter((item) => item.type === type)
    .sort((a, b) => a.name.localeCompare(b.name)),
)
const siteUrl = "https://ziiz.nafisazizir.com"
const registry = {
  $schema: "https://ui.shadcn.com/schema/registry.json",
  name: "ziiz",
  homepage: siteUrl,
  items: orderedItems,
}

mkdirSync(registryDir, { recursive: true })
writeFileSync(
  join(root, "registry.json"),
  `${JSON.stringify(registry, null, 2)}\n`,
)

const indexItems = orderedItems.map((item) => {
  const component =
    item.type === "registry:example"
      ? `() => import("@/components/examples/${item.name}")`
      : item.type === "registry:block"
        ? `() => import("@/components/blocks/${item.name}")`
        : undefined
  return `  {
    name: ${JSON.stringify(item.name)},
    type: ${JSON.stringify(item.type)},
    title: ${JSON.stringify(item.title)},${
    item.description ? `\n    description: ${JSON.stringify(item.description)},` : ""
  }
    files: ${JSON.stringify(item.files.map((file) => file.path))},${
    component ? `\n    component: ${component},` : ""
  }
  }`
})
writeFileSync(
  join(registryDir, "__index__.ts"),
  `// Generated by scripts/build-registry.ts — do not edit.
import type { RegistryIndexItem } from "./schema"

export const REGISTRY_INDEX: RegistryIndexItem[] = [
${indexItems.join(",\n")}
]
`,
)

mkdirSync(outputDir, { recursive: true })
for (const entry of readdirSync(outputDir)) {
  const path = join(outputDir, entry)
  if (statSync(path).isFile()) writeFileSync(path, "")
}
for (const item of orderedItems) {
  const itemPayload = {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    ...item,
    files: item.files.map((file) => ({
      ...file,
      content: readFileSync(join(root, file.path), "utf8"),
    })),
  }
  writeFileSync(
    join(outputDir, `${item.name}.json`),
    `${JSON.stringify(itemPayload, null, 2)}\n`,
  )
}
writeFileSync(
  join(outputDir, "registry.json"),
  `${JSON.stringify(
    {
      $schema: "https://ui.shadcn.com/schema/registry.json",
      name: registry.name,
      homepage: registry.homepage,
      items: orderedItems,
    },
    null,
    2,
  )}\n`,
)
