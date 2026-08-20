import fs from "node:fs"
import path from "node:path"

export type ComponentNode = {
  /** File stem, e.g. "button" */
  name: string
  /** Other components/ui files this one imports */
  dependsOn: string[]
  /** Components/ui files that import this one */
  usedBy: string[]
  /** Files outside components/ui that import this component */
  externalUses: number
  /** Distinct shadcn slot classes still present in the file */
  aliasClasses: string[]
  /** Distinct raw Tailwind type classes that should resolve to type roles */
  typeClasses: string[]
  /** Distinct bare shadow utilities that should become a material */
  shadowClasses: string[]
  /** Distinct literal border/radius values that bypass the radius scale */
  shapeClasses: string[]
  /** Longest dependency chain below this node (0 = leaf) */
  tier: number
}

export type ComponentGraph = {
  nodes: ComponentNode[]
  tiers: ComponentNode[][]
  totals: { total: number; pending: number; clean: number }
}

export type OffSystemKind = {
  /** The `ComponentNode` field holding the matched classes */
  key: "aliasClasses" | "typeClasses" | "shadowClasses" | "shapeClasses"
  /** How the kind reads in a chip row */
  label: string
  /** How the kind reads in a count, e.g. "1 alias" / "2 aliases" */
  singular: string
  plural: string
}

/** The tracked kinds of off-system class, in reporting order. */
export const OFF_SYSTEM_KINDS: OffSystemKind[] = [
  {
    key: "aliasClasses",
    label: "aliases",
    singular: "alias",
    plural: "aliases",
  },
  {
    key: "typeClasses",
    label: "raw type",
    singular: "raw type",
    plural: "raw type",
  },
  {
    key: "shadowClasses",
    label: "shadows",
    singular: "shadow",
    plural: "shadows",
  },
  {
    key: "shapeClasses",
    label: "raw shape",
    singular: "raw shape",
    plural: "raw shape",
  },
]

/** True when no off-system classes of any tracked kind remain. */
export function isClean(node: ComponentNode): boolean {
  return OFF_SYSTEM_KINDS.every((kind) => node[kind.key].length === 0)
}

const UI_DIR = path.join(process.cwd(), "components/ui")
const CONSUMER_DIRS = ["app", "components", "hooks", "lib"]

const UI_IMPORT_RE = /@\/components\/ui\/([a-z0-9-]+)/g

// Utility classes that resolve through the shadcn slot aliases (layer 2b)
// rather than the ramp (layer 2a). Matching classes are what the on-touch
// migration renames. `background`/`border` require no suffix so the ramp's
// bg-background-100 / border-gray-* stay unmatched.
// Raw Tailwind type utilities. Authoring vocabulary for type is the 31 roles
// (text-label-14, text-copy-16, ...), which are separate utilities — nothing
// remaps these, so any hit is off-system. Covers sizes and weights plus the
// tracking/leading utilities and literal sizes (text-[0.8rem]) the roles
// absorb.
const TYPE_CLASS_RE =
  /(?:text-(?:xs|sm|base|lg|[2-9]?xl|\[[0-9.][^\]]*\])|font-(?:thin|extralight|light|normal|medium|semibold|bold|extrabold|black|mono)|tracking-(?:tighter|tight|normal|wide|wider|widest|\[[^\]]+\])|leading-(?:none|tight|snug|normal|relaxed|loose|\d+|\[[^\]]+\]))(?:\/\d+)?(?![\w-])/g

// Bare shadow utilities, including the suffixless `shadow` and arbitrary
// values (shadow-[...]). The ramp remaps the named values onto --ds-shadow-*,
// so they render correctly, but elevation should be a composed material-*
// (ring + shadow + radius), not a lone shadow. `shadow-none` stays unmatched:
// it introduces no elevation.
const SHADOW_CLASS_RE =
  /(?<![\w-])shadow(?:-(?:2xs|xs|sm|md|lg|xl|2xl|\[[^\]]+\]))?(?![\w-])/g

// Literal shape values that bypass the radius scale: rounded-[2px],
// border-[1.5px]. The generic rounded-* scale and structural border widths
// are sanctioned (decision 4), as are token-derived arbitraries —
// rounded-[min(var(--radius-md),8px)] and rounded-[inherit] pass.
const SHAPE_CLASS_RE =
  /(?<![\w-])(?:rounded(?:-(?:t|b|l|r|tl|tr|bl|br|s|e|ss|se|es|ee))?-\[(?![^\]]*(?:var\(|inherit))[^\]]+\]|border(?:-(?:t|b|l|r|x|y|s|e))?-\[(?![^\]]*var\()[^\]]+\])(?![\w-])/g

const ALIAS_CLASS_RE =
  /(?:bg|text|border|ring|inset-ring|outline|fill|stroke|from|via|to|divide|caret|placeholder|decoration|accent|shadow)-(?:(?:primary|secondary|muted|accent|destructive|card|popover)(?:-foreground)?|sidebar(?:-[a-z]+)*|chart-\d|input|ring|foreground|border(?![\w-])|background(?![\w-]))(?:\/\d{1,3})?(?![\w-])/g

function walk(dir: string, out: string[] = []): string[] {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      if (entry.name === "node_modules" || full === UI_DIR) continue
      walk(full, out)
    } else if (/\.(ts|tsx)$/.test(entry.name)) {
      out.push(full)
    }
  }
  return out
}

export function getComponentGraph(): ComponentGraph {
  const files = fs
    .readdirSync(UI_DIR)
    .filter((f) => f.endsWith(".tsx"))
    .sort()

  const byName = new Map<string, ComponentNode>()

  for (const file of files) {
    const name = file.replace(/\.tsx$/, "")
    const source = fs.readFileSync(path.join(UI_DIR, file), "utf8")

    const dependsOn = [
      ...new Set(
        [...source.matchAll(UI_IMPORT_RE)]
          .map((m) => m[1])
          .filter((dep) => dep !== name)
      ),
    ].sort()

    const distinct = (re: RegExp) =>
      [...new Set([...source.matchAll(re)].map((m) => m[0]))].sort()

    byName.set(name, {
      name,
      dependsOn,
      usedBy: [],
      externalUses: 0,
      aliasClasses: distinct(ALIAS_CLASS_RE),
      typeClasses: distinct(TYPE_CLASS_RE),
      shadowClasses: distinct(SHADOW_CLASS_RE),
      shapeClasses: distinct(SHAPE_CLASS_RE),
      tier: 0,
    })
  }

  for (const node of byName.values()) {
    node.dependsOn = node.dependsOn.filter((dep) => byName.has(dep))
    for (const dep of node.dependsOn) byName.get(dep)!.usedBy.push(node.name)
  }

  for (const dir of CONSUMER_DIRS) {
    const root = path.join(process.cwd(), dir)
    if (!fs.existsSync(root)) continue
    for (const file of walk(root)) {
      const source = fs.readFileSync(file, "utf8")
      const referenced = new Set(
        [...source.matchAll(UI_IMPORT_RE)].map((m) => m[1])
      )
      for (const name of referenced) {
        const node = byName.get(name)
        if (node) node.externalUses++
      }
    }
  }

  // tier = longest chain of internal dependencies below the node
  const resolving = new Set<string>()
  function tierOf(name: string): number {
    const node = byName.get(name)!
    if (resolving.has(name)) return 0 // cycle guard; none exist today
    resolving.add(name)
    node.tier = node.dependsOn.length
      ? 1 + Math.max(...node.dependsOn.map(tierOf))
      : 0
    resolving.delete(name)
    return node.tier
  }
  for (const name of byName.keys()) tierOf(name)

  const nodes = [...byName.values()]
  const tierCount = Math.max(...nodes.map((n) => n.tier)) + 1
  const tiers = Array.from({ length: tierCount }, (_, i) =>
    nodes
      .filter((n) => n.tier === i)
      .sort(
        (a, b) =>
          b.usedBy.length - a.usedBy.length ||
          b.externalUses - a.externalUses ||
          a.name.localeCompare(b.name)
      )
  )

  const pending = nodes.filter((n) => !isClean(n)).length
  return {
    nodes,
    tiers,
    totals: { total: nodes.length, pending, clean: nodes.length - pending },
  }
}
