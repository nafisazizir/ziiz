// Emits the registry manifest from the filesystem, then hands it to
// `shadcn build` to inline file contents into public/r/<name>.json.
//
//   components/ui/<name>.tsx          -> registry:ui
//   components/examples/<name>.tsx    -> registry:example
//   components/blocks/<name>/**       -> registry:block
//   hooks/use-mobile.ts               -> registry:hook
//   components/icon-placeholder.tsx   -> registry:component (+ icons/hugeicons)
//   components/example.tsx            -> registry:component
//
// Dependencies are read off each file's imports: `@/components/ui/x` becomes
// a registryDependency on `x`, a bare specifier becomes an npm dependency.
// `@/lib/utils`, react and next are the consumer's own and never listed.
//
// Also writes __registry__/index.tsx: the dynamic-import map the preview
// route and the playground palette load blocks and examples through.

import fs from "node:fs"
import path from "node:path"
import { execFileSync } from "node:child_process"

const ROOT = process.cwd()
const REGISTRY_JSON = path.join(ROOT, "registry.json")
const REGISTRY_INDEX = path.join(ROOT, "__registry__/index.tsx")
const REGISTRY_OUT = path.join(ROOT, "public/r")

type ItemType =
  | "registry:ui"
  | "registry:example"
  | "registry:block"
  | "registry:hook"
  | "registry:component"

type RegistryFile = {
  path: string
  type: ItemType
  target?: string
}

type RegistryItem = {
  name: string
  type: ItemType
  title: string
  description?: string
  dependencies?: string[]
  registryDependencies?: string[]
  files: RegistryFile[]
}

// Items whose derived title reads wrong. Everything else is title-cased.
const TITLE_OVERRIDES: Record<string, string> = {
  "input-otp": "Input OTP",
  "input-otp-example": "Input OTP",
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
  "@/components/icon-placeholder": "icon-placeholder",
  "@/components/example": "example",
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

function walk(dir: string): string[] {
  const out: string[] = []
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) out.push(...walk(full))
    else if (/\.(tsx?|css)$/.test(entry.name)) out.push(full)
  }
  return out.sort()
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
        const block = specifier.match(/^@\/components\/blocks\/([a-z0-9-]+)\//)
        if (block) {
          if (block[1] !== self) registryDependencies.add(block[1])
          continue
        }
        const mapped = ALIAS_TO_ITEM[specifier]
        if (mapped) {
          if (mapped !== self) registryDependencies.add(mapped)
          continue
        }
        // Files owned by another item's file list (icons/hugeicons) are
        // reached through that item; anything else is a manifest gap.
        if (specifier === "@/components/icons/hugeicons") continue
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

function item(
  name: string,
  type: ItemType,
  files: string[],
  options: { target?: (file: string) => string; description?: string } = {}
): RegistryItem {
  return {
    name,
    type,
    title: titleFromName(name),
    description: options.description,
    ...collectDependencies(files, name),
    files: files.map((file) => ({
      path: rel(file),
      type,
      target: options.target?.(file),
    })),
  }
}

function buildItems(): RegistryItem[] {
  const uiDir = path.join(ROOT, "components/ui")
  const examplesDir = path.join(ROOT, "components/examples")
  const blocksDir = path.join(ROOT, "components/blocks")

  const ui = fs
    .readdirSync(uiDir)
    .filter((f) => f.endsWith(".tsx"))
    .map((f) =>
      item(f.replace(/\.tsx$/, ""), "registry:ui", [path.join(uiDir, f)])
    )

  const examples = fs
    .readdirSync(examplesDir)
    .filter((f) => f.endsWith(".tsx"))
    .map((f) =>
      item(f.replace(/\.tsx$/, ""), "registry:example", [
        path.join(examplesDir, f),
      ])
    )

  const blocks = fs
    .readdirSync(blocksDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) =>
      item(
        d.name,
        "registry:block",
        // Entry file first: the preview index and a source tab read files[0].
        walk(path.join(blocksDir, d.name)).sort(
          (a, b) =>
            Number(path.basename(b) === "index.tsx") -
            Number(path.basename(a) === "index.tsx")
        ),
        { target: rel }
      )
    )

  const hooks = [
    item("use-mobile", "registry:hook", [path.join(ROOT, "hooks/use-mobile.ts")]),
  ]

  const components = [
    item("example", "registry:component", [
      path.join(ROOT, "components/example.tsx"),
    ], {
      description:
        "Example and ExampleWrapper: the grid and titled cell every example renders inside.",
    }),
    item(
      "icon-placeholder",
      "registry:component",
      [
        path.join(ROOT, "components/icon-placeholder.tsx"),
        path.join(ROOT, "components/icons/hugeicons.ts"),
      ],
      {
        target: rel,
        description:
          "Named hugeicons lookup used by the examples and blocks. Ported examples pass a name per icon library; ziiz resolves hugeicons only.",
      }
    ),
  ]

  return [...ui, ...hooks, ...components, ...blocks, ...examples]
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

function writeIndex(items: RegistryItem[]) {
  const previewable = items.filter(
    (i) => i.type === "registry:block" || i.type === "registry:example"
  )
  const entries = previewable
    .map((i) => {
      const entry = i.files[0].path.replace(/\.tsx$/, "").replace(/\/index$/, "")
      return `  "${i.name}": () => import("@/${entry}"),`
    })
    .join("\n")

  const source = `// Generated by scripts/build-registry.ts. Do not edit.

export const Index: Record<
  string,
  () => Promise<{ default: React.ComponentType }>
> = {
${entries}
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
writeIndex(items)

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
