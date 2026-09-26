// Emits the registry manifest from the filesystem, then hands it to
// `shadcn build` to inline file contents into public/r/<name>.json.
//
// What is published:
//
//   components/ui/<name>.tsx    -> registry:ui
//   components/docs/<name>.tsx  -> registry:component, installed to
//                                  components/docs/ (explicit target)
//   hooks/use-mobile.ts         -> registry:hook (sidebar imports it)
//   lib/utils.ts                -> registry:lib (`cn` from @ziiz/theme/cn)
//   theme                       -> registry:theme, no files: installs the
//                                  packages and CSS imports an app needs
//   ../../.agents/skills/ziiz/  -> registry:file, the consumer skill,
//                                  installed to the same path in the app
//
// Dependencies are read off each file's imports: `@/components/ui/x` becomes
// a registryDependency on `x`, `@/lib/utils` one on `utils`, a bare
// specifier becomes an npm dependency. react and next are the consumer's
// own and never listed. Any other `@/` alias inside a published file fails
// the build.
//
// Every item carries a description: a ui item takes the `description`
// frontmatter of its page under content/docs/components, the rest are
// listed in DESCRIPTIONS below. A ui item without a page fails the build.
//
// Two more files are generated here, neither of them published:
//
//   components/examples/index.ts -> name -> lazy component, for ComponentPreview
//   lib/component-nav.ts         -> the sidebar's Components group

import fs from "node:fs"
import path from "node:path"
import { execFileSync } from "node:child_process"

const ROOT = process.cwd()
const REGISTRY_JSON = path.join(ROOT, "registry.json")
const REGISTRY_OUT = path.join(ROOT, "public/r")

type ItemType =
  | "registry:ui"
  | "registry:component"
  | "registry:hook"
  | "registry:lib"
  | "registry:theme"
  | "registry:file"

type RegistryFile = {
  path: string
  type: ItemType
  target?: string
}

type RegistryItem = {
  name: string
  type: ItemType
  title: string
  description: string
  dependencies?: string[]
  registryDependencies?: string[]
  files: RegistryFile[]
  css?: Record<string, Record<string, never>>
  docs?: string
}

// Items whose derived title reads wrong. Everything else is title-cased.
const TITLE_OVERRIDES: Record<string, string> = {
  "input-otp": "Input OTP",
}

// Descriptions for the items that have no page under content/docs/components.
const DESCRIPTIONS: Record<string, string> = {
  callout: "A titled aside for notes and warnings inside prose.",
  "code-block": "The chrome around a pre with a title bar and a copy button.",
  "code-collapsible":
    "A code block that opens from a short preview to its full height.",
  "code-tabs":
    "Tabs that switch between code samples, such as install commands.",
  "component-preview":
    "Renders a component example above its collapsible source.",
  "component-source":
    "Reads a registry item's source at build time and shows it highlighted.",
  steps: "Numbered steps for an installation or setup sequence.",
  "use-mobile": "A hook that reports whether the viewport is below 768px.",
  utils:
    "The cn helper from @ziiz/theme/cn, whose tailwind-merge knows the type roles and materials.",
  theme:
    "The ziiz design layer: installs @ziiz/theme with the stylesheets and cn a ziiz app needs.",
  skill:
    "The ziiz agent skill: vocabulary, rules and checks for building UI on the system, installed to .agents/skills/ziiz.",
}

// Owned by the consumer: react/next come with the framework. Listing them
// would make every item claim them.
const IMPLICIT_PACKAGES = new Set(["react", "react-dom", "next"])

// `@/lib/utils` maps to the published utils item on purpose: the stock cn a
// `shadcn init` writes does not know the type roles, so components pull in
// the one that does.
const ALIAS_TO_ITEM: Record<string, string> = {
  "@/hooks/use-mobile": "use-mobile",
  "@/lib/utils": "utils",
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

const CONTENT_COMPONENTS = path.join(ROOT, "content/docs/components")

function frontmatter(source: string, key: string): string | undefined {
  return source.match(new RegExp(`^${key}:\\s*(.+)$`, "m"))?.[1].trim()
}

// A ui item's description is its page's; the page is the one place the
// component is described, so the registry never says something else.
function describe(name: string, type: ItemType): string {
  if (type === "registry:ui") {
    const page = path.join(CONTENT_COMPONENTS, `${name}.mdx`)
    if (!fs.existsSync(page)) {
      throw new Error(
        `${name}: no page at ${rel(page)} to take a description from`
      )
    }
    const description = frontmatter(
      fs.readFileSync(page, "utf8"),
      "description"
    )
    if (!description) throw new Error(`${rel(page)}: missing description`)
    return description
  }
  const description = DESCRIPTIONS[name]
  if (!description)
    throw new Error(`${name}: add a description to DESCRIPTIONS`)
  return description
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
    description: describe(name, type),
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

  const lib = [item("utils", "registry:lib", [path.join(ROOT, "lib/utils.ts")])]

  // The setup item. No files: it installs the packages and injects the CSS
  // imports an app needs before any component renders, in the order the
  // app's own globals.css uses. shadcn.css is left to the app: ziiz
  // components speak ramp vocabulary and do not need the slot bridge.
  const theme: RegistryItem = {
    name: "theme",
    type: "registry:theme",
    title: "Theme",
    description: describe("theme", "registry:theme"),
    dependencies: ["@ziiz/theme", "shadcn", "tw-animate-css"],
    registryDependencies: ["utils"],
    files: [],
    css: {
      '@import "tw-animate-css"': {},
      '@import "shadcn/tailwind.css"': {},
      '@import "@ziiz/theme/theme.css"': {},
    },
    docs: [
      "Set --font-sans and --font-mono on html or :root (next/font's variable option does this); without them the Tailwind default stacks apply.",
      'Dark mode is the .dark class on html: next-themes with attribute="class".',
      'Add @import "@ziiz/theme/shadcn.css" only if the app also runs stock shadcn/ui components.',
    ].join("\n"),
  }

  // The consumer skill. It lives at the repo root so this repo's own agents
  // load it, and installs to the same path in a consuming app. Not built
  // through item(): its markdown quotes import lines that are not imports.
  const skillDir = path.join(ROOT, "../../.agents/skills/ziiz")
  const skill: RegistryItem = {
    name: "skill",
    type: "registry:file",
    title: "Skill",
    description: describe("skill", "registry:file"),
    files: ["SKILL.md", "reference.md"].map((f) => ({
      path: rel(path.join(skillDir, f)),
      type: "registry:file" as const,
      target: `.agents/skills/ziiz/${f}`,
    })),
    docs: "Installed to .agents/skills/ziiz/. Claude Code, Codex and Cursor read that folder; for another client, point it there or symlink it.",
  }

  return [...ui, ...docs, ...hooks, ...lib, theme, skill]
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

const EXAMPLES_DIR = path.join(ROOT, "components/examples")
const EXAMPLES_INDEX = path.join(EXAMPLES_DIR, "index.ts")
const COMPONENT_NAV = path.join(ROOT, "lib/component-nav.ts")

const GENERATED = "// Generated by scripts/build-registry.ts. Do not edit.\n"

function exampleNames(): string[] {
  return fs
    .readdirSync(EXAMPLES_DIR)
    .filter((f) => f.endsWith(".tsx"))
    .map((f) => f.replace(/\.tsx$/, ""))
    .sort()
}

// Each example is loaded lazily so a component page ships only its own
// examples, not all of them.
function writeExamplesIndex(names: string[]) {
  // Written the way prettier would, so the generated file passes format:check.
  const entries = names
    .map((n) => {
      const line = `  "${n}": React.lazy(() => import("./${n}")),`
      return line.length <= 80
        ? line
        : `  "${n}": React.lazy(\n    () => import("./${n}")\n  ),`
    })
    .join("\n")

  fs.writeFileSync(
    EXAMPLES_INDEX,
    `${GENERATED}import * as React from "react"

export const examples: Record<string, React.ComponentType> = {
${entries}
}
`
  )
}

// The sidebar's Components group, derived from the pages that exist. The
// docs check requires every page to be reachable from the nav, so the two
// are generated from one list rather than kept in sync by hand.
function writeComponentNav() {
  if (!fs.existsSync(CONTENT_COMPONENTS)) {
    fs.writeFileSync(
      COMPONENT_NAV,
      `${GENERATED}export const componentItems: { name: string; href: string }[] = []\n`
    )
    return 0
  }

  const pages = fs
    .readdirSync(CONTENT_COMPONENTS)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""))
    .sort()

  const entries = pages
    .map((slug) => {
      const source = fs.readFileSync(
        path.join(CONTENT_COMPONENTS, `${slug}.mdx`),
        "utf8"
      )
      const title = source.match(/^title:\s*(.+)$/m)?.[1].trim()
      return `  { name: "${title ?? titleFromName(slug)}", href: "/components/${slug}" },`
    })
    .join("\n")

  fs.writeFileSync(
    COMPONENT_NAV,
    `${GENERATED}export const componentItems = [
${entries}
]
`
  )
  return pages.length
}

const items = buildItems()
verifyCoverage(items)
writeManifest(items)

const examples = exampleNames()
writeExamplesIndex(examples)
const navPages = writeComponentNav()

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
console.log(
  `registry: ${examples.length} examples, ${navPages} component pages in nav`
)
