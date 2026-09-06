// Emits the registry manifest from the filesystem, then hands it to
// `shadcn build` to inline file contents into public/r/<name>.json.
//
// Only the base components are published:
//
//   components/ui/<name>.tsx  -> registry:ui
//   hooks/use-mobile.ts       -> registry:hook (sidebar imports it)
//
// Blocks, examples and the preview never enter the registry. They are
// app-internal and only reach __registry__/index.tsx, the generated
// dynamic-import map the preview route and playground palette load from.
//
// Dependencies are read off each file's imports: `@/components/ui/x` becomes
// a registryDependency on `x`, a bare specifier becomes an npm dependency.
// `@/lib/utils`, react and next are the consumer's own and never listed.
// Any other `@/` alias inside a published file fails the build.

import fs from "node:fs"
import path from "node:path"
import { execFileSync } from "node:child_process"

const ROOT = process.cwd()
const REGISTRY_JSON = path.join(ROOT, "registry.json")
const REGISTRY_INDEX = path.join(ROOT, "__registry__/index.tsx")
const REGISTRY_OUT = path.join(ROOT, "public/r")

type ItemType = "registry:ui" | "registry:hook"

type PreviewEntry = {
  name: string
  title: string
  type: "block" | "example"
  entry: string
}

type RegistryFile = {
  path: string
  type: ItemType
}

type RegistryItem = {
  name: string
  type: ItemType
  title: string
  dependencies?: string[]
  registryDependencies?: string[]
  files: RegistryFile[]
}

// Items whose derived title reads wrong. Everything else is title-cased.
const TITLE_OVERRIDES: Record<string, string> = {
  "input-otp": "Input OTP",
  "input-otp-example": "Input OTP",
  "preview-02": "Preview 02",
  "preview-03": "Preview 03",
  "sidebar-floating-example": "Sidebar (Floating)",
  "sidebar-icon-example": "Sidebar (Icon)",
  "sidebar-inset-example": "Sidebar (Inset)",
}

// Owned by the consumer: `shadcn init` writes utils, and react/next come with
// the framework. Listing them would make every item claim them.
const IMPLICIT_ALIASES = new Set(["@/lib/utils"])
const IMPLICIT_PACKAGES = new Set(["react", "react-dom", "next"])

const ALIAS_TO_ITEM: Record<string, string> = {
  "@/hooks/use-mobile": "use-mobile",
}

const IMPORT_RE = /(?:from|import)\s*\(?\s*["']([^"']+)["']/g

function titleFromName(name: string): string {
  return (
    TITLE_OVERRIDES[name] ??
    name
      .replace(/-example$/, "")
      .split("-")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ")
  )
}

function packageName(specifier: string): string {
  const parts = specifier.split("/")
  return specifier.startsWith("@") ? parts.slice(0, 2).join("/") : parts[0]
}

function rel(file: string): string {
  return path.relative(ROOT, file).split(path.sep).join("/")
}

function readImports(file: string): string[] {
  const source = fs.readFileSync(file, "utf8")
  const specifiers = new Set<string>()
  for (const match of source.matchAll(IMPORT_RE)) specifiers.add(match[1])
  return [...specifiers]
}

function collectDependencies(
  files: string[],
  self: string
): Pick<RegistryItem, "dependencies" | "registryDependencies"> {
  const dependencies = new Set<string>()
  const registryDependencies = new Set<string>()

  for (const file of files) {
    for (const specifier of readImports(file)) {
      if (specifier.startsWith(".")) continue
      if (IMPLICIT_ALIASES.has(specifier)) continue

      if (specifier.startsWith("@/")) {
        const ui = specifier.match(/^@\/components\/ui\/([a-z0-9-]+)$/)
        if (ui) {
          if (ui[1] !== self) registryDependencies.add(ui[1])
          continue
        }
        const mapped = ALIAS_TO_ITEM[specifier]
        if (mapped) {
          if (mapped !== self) registryDependencies.add(mapped)
          continue
        }
        throw new Error(`${rel(file)}: unmapped alias import "${specifier}"`)
      }

      const pkg = packageName(specifier)
      if (!IMPLICIT_PACKAGES.has(pkg)) dependencies.add(pkg)
    }
  }

  return {
    dependencies: dependencies.size ? [...dependencies].sort() : undefined,
    registryDependencies: registryDependencies.size
      ? [...registryDependencies].sort()
      : undefined,
  }
}

function item(name: string, type: ItemType, files: string[]): RegistryItem {
  return {
    name,
    type,
    title: titleFromName(name),
    ...collectDependencies(files, name),
    files: files.map((file) => ({ path: rel(file), type })),
  }
}

function buildItems(): RegistryItem[] {
  const uiDir = path.join(ROOT, "components/ui")

  const ui = fs
    .readdirSync(uiDir)
    .filter((f) => f.endsWith(".tsx"))
    .sort()
    .map((f) =>
      item(f.replace(/\.tsx$/, ""), "registry:ui", [path.join(uiDir, f)])
    )

  const hooks = [
    item("use-mobile", "registry:hook", [
      path.join(ROOT, "hooks/use-mobile.ts"),
    ]),
  ]

  return [...ui, ...hooks]
}

// Blocks first, then examples — the order /create's action menu shows them.
function buildPreviews(): PreviewEntry[] {
  const blocksDir = path.join(ROOT, "components/blocks")
  const examplesDir = path.join(ROOT, "components/examples")

  const blocks = fs
    .readdirSync(blocksDir, { withFileTypes: true })
    .filter(
      (d) =>
        d.isDirectory() &&
        fs.existsSync(path.join(blocksDir, d.name, "index.tsx"))
    )
    .map((d) => d.name)
    .sort()
    .map<PreviewEntry>((name) => ({
      name,
      title: titleFromName(name),
      type: "block",
      entry: `@/components/blocks/${name}`,
    }))

  const examples = fs
    .readdirSync(examplesDir)
    .filter((f) => f.endsWith(".tsx"))
    .sort()
    .map<PreviewEntry>((f) => {
      const name = f.replace(/\.tsx$/, "")
      return {
        name,
        title: titleFromName(name),
        type: "example",
        entry: `@/components/examples/${name}`,
      }
    })

  return [...blocks, ...examples]
}

function writeManifest(items: RegistryItem[]) {
  const manifest = {
    $schema: "https://ui.shadcn.com/schema/registry.json",
    name: "ziiz",
    homepage: "https://github.com/nafisazizir/ziiz",
    items,
  }
  fs.writeFileSync(REGISTRY_JSON, JSON.stringify(manifest, null, 2) + "\n")
}

function writeIndex(previews: PreviewEntry[]) {
  const loaders = previews
    .map((p) => `  "${p.name}": () => import("${p.entry}"),`)
    .join("\n")
  const items = previews
    .map(
      (p) =>
        `  { name: ${JSON.stringify(p.name)}, title: ${JSON.stringify(p.title)}, type: "${p.type}" },`
    )
    .join("\n")

  const source = `// Generated by scripts/build-registry.ts. Do not edit.
// App-internal: blocks and examples the playground and /preview/[name] load.
// None of these are registry items.

export type PreviewItem = {
  name: string
  title: string
  type: "block" | "example"
}

export const PREVIEW_ITEMS: PreviewItem[] = [
${items}
]

export const Index: Record<
  string,
  () => Promise<{ default: React.ComponentType }>
> = {
${loaders}
}
`
  fs.mkdirSync(path.dirname(REGISTRY_INDEX), { recursive: true })
  fs.writeFileSync(REGISTRY_INDEX, source)
}

function verifyCoverage(items: RegistryItem[]) {
  const names = new Set(items.map((i) => i.name))
  for (const i of items) {
    for (const dep of i.registryDependencies ?? []) {
      if (!names.has(dep)) {
        throw new Error(`${i.name}: registryDependency "${dep}" has no item`)
      }
    }
  }
}

const items = buildItems()
verifyCoverage(items)
writeManifest(items)
writeIndex(buildPreviews())

fs.rmSync(REGISTRY_OUT, { recursive: true, force: true })
execFileSync(
  process.execPath,
  [
    path.join(ROOT, "node_modules/shadcn/dist/index.js"),
    "build",
    REGISTRY_JSON,
    "--output",
    REGISTRY_OUT,
  ],
  { stdio: "inherit", cwd: ROOT }
)

const counts = items.reduce<Record<string, number>>((acc, i) => {
  acc[i.type] = (acc[i.type] ?? 0) + 1
  return acc
}, {})
console.log(`registry: ${items.length} items`, counts)
