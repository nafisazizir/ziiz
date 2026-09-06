// Emits the registry manifest from the filesystem, then hands it to
// `shadcn build` to inline file contents into public/r/<name>.json.
//
// What is published:
//
//   components/ui/<name>.tsx    -> registry:ui
//   components/docs/<name>.tsx  -> registry:component, installed to
//                                  components/docs/ (explicit target)
//   hooks/use-mobile.ts         -> registry:hook (sidebar imports it)
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
const REGISTRY_OUT = path.join(ROOT, "public/r")

type ItemType = "registry:ui" | "registry:component" | "registry:hook"

type RegistryFile = {
  path: string
  type: ItemType
  target?: string
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
        const ui = specifier.match(/^@\/components\/(?:ui|docs)\/([a-z0-9-]+)$/)
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

function item(
  name: string,
  type: ItemType,
  files: string[],
  target?: (file: string) => string
): RegistryItem {
  return {
    name,
    type,
    title: titleFromName(name),
    ...collectDependencies(files, name),
    files: files.map((file) => ({
      path: rel(file),
      type,
      ...(target ? { target: target(file) } : {}),
    })),
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

  // Doc primitives keep their docs/ subfolder on install; without a target
  // the CLI would drop them straight into components/.
  const docsDir = path.join(ROOT, "components/docs")
  const docs = fs
    .readdirSync(docsDir)
    .filter((f) => f.endsWith(".tsx"))
    .sort()
    .map((f) =>
      item(
        f.replace(/\.tsx$/, ""),
        "registry:component",
        [path.join(docsDir, f)],
        (file) => `components/docs/${path.basename(file)}`
      )
    )

  const hooks = [
    item("use-mobile", "registry:hook", [
      path.join(ROOT, "hooks/use-mobile.ts"),
    ]),
  ]

  return [...ui, ...docs, ...hooks]
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

function verifyCoverage(items: RegistryItem[]) {
  const names = new Set(items.map((i) => i.name))
  if (names.size !== items.length) {
    throw new Error("registry: duplicate item names across ui/docs/hooks")
  }
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
