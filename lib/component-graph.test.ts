import fs from "node:fs"
import os from "node:os"
import path from "node:path"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

import type { ComponentGraph, ComponentNode } from "@/lib/component-graph"
import { isClean } from "@/lib/component-graph"

/**
 * `component-graph` resolves its roots from `process.cwd()` at import time, so
 * each case writes a fixture tree, points `cwd` at it and imports a fresh copy
 * of the module.
 */
let root: string

function write(relativePath: string, source: string) {
  const full = path.join(root, relativePath)
  fs.mkdirSync(path.dirname(full), { recursive: true })
  fs.writeFileSync(full, source)
}

async function buildGraph(): Promise<ComponentGraph> {
  vi.spyOn(process, "cwd").mockReturnValue(root)
  vi.resetModules()
  const { getComponentGraph } = await import("@/lib/component-graph")
  return getComponentGraph()
}

function nodeOf(graph: ComponentGraph, name: string): ComponentNode {
  const node = graph.nodes.find((n) => n.name === name)
  if (!node) throw new Error(`missing node: ${name}`)
  return node
}

/** Single-component fixture; returns the node built from `source`. */
async function nodeFrom(source: string): Promise<ComponentNode> {
  write("components/ui/widget.tsx", source)
  return nodeOf(await buildGraph(), "widget")
}

beforeEach(() => {
  root = fs.mkdtempSync(path.join(os.tmpdir(), "component-graph-"))
  fs.mkdirSync(path.join(root, "components/ui"), { recursive: true })
})

afterEach(() => {
  vi.restoreAllMocks()
  fs.rmSync(root, { recursive: true, force: true })
})

describe("isClean", () => {
  const base: ComponentNode = {
    name: "button",
    dependsOn: [],
    usedBy: [],
    externalUses: 0,
    aliasClasses: [],
    typeClasses: [],
    shadowClasses: [],
    shapeClasses: [],
    tier: 0,
  }

  it("is true when no off-system classes remain", () => {
    expect(isClean(base)).toBe(true)
  })

  it.each([
    ["aliasClasses", { aliasClasses: ["bg-primary"] }],
    ["typeClasses", { typeClasses: ["text-sm"] }],
    ["shadowClasses", { shadowClasses: ["shadow-sm"] }],
    ["shapeClasses", { shapeClasses: ["rounded-[2px]"] }],
  ])("is false when %s is non-empty", (_label, overrides) => {
    expect(isClean({ ...base, ...overrides })).toBe(false)
  })
})

describe("getComponentGraph: structure", () => {
  it("indexes only .tsx files in components/ui", async () => {
    write("components/ui/button.tsx", "export const Button = () => null")
    write("components/ui/helpers.ts", "export const noop = () => null")
    write("components/ui/notes.md", "ignored")

    const graph = await buildGraph()

    expect(graph.nodes.map((n) => n.name)).toEqual(["button"])
  })

  it("links internal dependencies both ways and ignores self imports", async () => {
    write(
      "components/ui/card.tsx",
      `import { Button } from "@/components/ui/button"
       import { cardVariants } from "@/components/ui/card"`
    )
    write("components/ui/button.tsx", "export const Button = () => null")

    const graph = await buildGraph()

    expect(nodeOf(graph, "card").dependsOn).toEqual(["button"])
    expect(nodeOf(graph, "button").usedBy).toEqual(["card"])
    expect(nodeOf(graph, "card").usedBy).toEqual([])
  })

  it("drops imports that do not resolve to a components/ui file", async () => {
    write(
      "components/ui/card.tsx",
      `import { Button } from "@/components/ui/button"
       import { Ghost } from "@/components/ui/ghost"`
    )
    write("components/ui/button.tsx", "export const Button = () => null")

    const graph = await buildGraph()

    expect(nodeOf(graph, "card").dependsOn).toEqual(["button"])
  })

  it("counts one external use per consuming file outside components/ui", async () => {
    write("components/ui/button.tsx", "export const Button = () => null")
    write(
      "app/page.tsx",
      `import { Button } from "@/components/ui/button"
       import { Button as B } from "@/components/ui/button"`
    )
    write("lib/nested/deep/helper.ts", `import "@/components/ui/button"`)
    write("hooks/use-thing.ts", "export const useThing = () => null")

    const graph = await buildGraph()

    expect(nodeOf(graph, "button").externalUses).toBe(2)
  })

  it("skips node_modules and missing consumer directories", async () => {
    write("components/ui/button.tsx", "export const Button = () => null")
    write(
      "components/node_modules/pkg/index.ts",
      `import "@/components/ui/button"`
    )

    const graph = await buildGraph()

    expect(nodeOf(graph, "button").externalUses).toBe(0)
  })

  it("does not count components/ui files as external uses", async () => {
    write("components/ui/button.tsx", "export const Button = () => null")
    write("components/ui/card.tsx", `import "@/components/ui/button"`)

    const graph = await buildGraph()

    expect(nodeOf(graph, "button").externalUses).toBe(0)
  })
})

describe("getComponentGraph: tiers and totals", () => {
  it("tiers a node by its longest dependency chain", async () => {
    write("components/ui/icon.tsx", "export const Icon = () => null")
    write("components/ui/button.tsx", `import "@/components/ui/icon"`)
    write(
      "components/ui/card.tsx",
      `import "@/components/ui/button"
       import "@/components/ui/icon"`
    )

    const graph = await buildGraph()

    expect(nodeOf(graph, "icon").tier).toBe(0)
    expect(nodeOf(graph, "button").tier).toBe(1)
    expect(nodeOf(graph, "card").tier).toBe(2)
    expect(graph.tiers.map((tier) => tier.map((n) => n.name))).toEqual([
      ["icon"],
      ["button"],
      ["card"],
    ])
  })

  it("terminates on dependency cycles", async () => {
    write("components/ui/a.tsx", `import "@/components/ui/b"`)
    write("components/ui/b.tsx", `import "@/components/ui/a"`)

    const graph = await buildGraph()

    expect(graph.nodes.map((n) => n.name).sort()).toEqual(["a", "b"])
    expect(graph.tiers.length).toBeGreaterThan(0)
  })

  it("orders each tier by usedBy, then externalUses, then name", async () => {
    write("components/ui/alpha.tsx", "export const Alpha = () => null")
    write("components/ui/beta.tsx", "export const Beta = () => null")
    write("components/ui/gamma.tsx", "export const Gamma = () => null")
    // gamma is imported by a sibling, beta only by an app file.
    write("components/ui/wrapper.tsx", `import "@/components/ui/gamma"`)
    write("app/page.tsx", `import "@/components/ui/beta"`)

    const graph = await buildGraph()

    expect(graph.tiers[0].map((n) => n.name)).toEqual([
      "gamma",
      "beta",
      "alpha",
    ])
  })

  it("splits totals into clean and pending components", async () => {
    write("components/ui/clean.tsx", "export const Clean = () => null")
    write("components/ui/dirty.tsx", `const c = "bg-primary text-sm"`)

    const graph = await buildGraph()

    expect(graph.totals).toEqual({ total: 2, pending: 1, clean: 1 })
  })
})

describe("getComponentGraph: alias classes", () => {
  it("collects distinct, sorted slot-alias utilities", async () => {
    const node = await nodeFrom(
      `const c = "bg-primary bg-primary text-muted-foreground border-border ring-ring/50 bg-chart-1 bg-sidebar-accent-foreground"`
    )

    expect(node.aliasClasses).toEqual([
      "bg-chart-1",
      "bg-primary",
      "bg-sidebar-accent-foreground",
      "border-border",
      "ring-ring/50",
      "text-muted-foreground",
    ])
  })

  it("leaves ramp utilities that carry a numeric scale unmatched", async () => {
    const node = await nodeFrom(
      `const c = "bg-background-100 border-gray-400 text-gray-900"`
    )

    expect(node.aliasClasses).toEqual([])
  })
})

describe("getComponentGraph: type classes", () => {
  it("collects raw Tailwind type utilities", async () => {
    const node = await nodeFrom(
      `const c = "text-sm text-2xl text-[0.8rem] font-medium font-mono tracking-tight leading-none leading-5 leading-[1.2] text-sm/6"`
    )

    expect(node.typeClasses).toEqual([
      "font-medium",
      "font-mono",
      "leading-5",
      "leading-[1.2]",
      "leading-none",
      "text-2xl",
      "text-[0.8rem]",
      "text-sm",
      "text-sm/6",
      "tracking-tight",
    ])
  })

  it("leaves type roles and unrelated utilities unmatched", async () => {
    const node = await nodeFrom(
      `const c = "text-label-14 text-copy-16 text-heading-32 font-sans text-primary"`
    )

    expect(node.typeClasses).toEqual([])
  })
})

describe("getComponentGraph: shadow classes", () => {
  it("collects bare and arbitrary shadow utilities", async () => {
    const node = await nodeFrom(
      `const c = "shadow shadow-sm shadow-2xl shadow-[0_1px_2px_rgba(0,0,0,.1)]"`
    )

    expect(node.shadowClasses).toEqual([
      "shadow",
      "shadow-2xl",
      "shadow-[0_1px_2px_rgba(0,0,0,.1)]",
      "shadow-sm",
    ])
  })

  it("leaves shadow-none and composed utilities unmatched", async () => {
    const node = await nodeFrom(`const c = "shadow-none inset-shadow-sm"`)

    expect(node.shadowClasses).toEqual([])
  })
})

describe("getComponentGraph: shape classes", () => {
  it("collects literal radius and border values", async () => {
    const node = await nodeFrom(
      `const c = "rounded-[2px] rounded-tl-[3px] border-[1.5px] border-t-[2px]"`
    )

    expect(node.shapeClasses).toEqual([
      "border-[1.5px]",
      "border-t-[2px]",
      "rounded-[2px]",
      "rounded-tl-[3px]",
    ])
  })

  it("leaves the radius scale and token-derived arbitraries unmatched", async () => {
    const node = await nodeFrom(
      `const c = "rounded-md rounded-[inherit] rounded-[min(var(--radius-md),8px)] border-2 border-[var(--ds-gray-400)]"`
    )

    expect(node.shapeClasses).toEqual([])
  })
})
