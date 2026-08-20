import { describe, expect, it } from "vitest"

import {
  DEFAULT_ITEM,
  PLAYGROUND_ITEMS,
  PLAYGROUND_LOADERS,
  getPlaygroundItem,
} from "@/lib/playground"

describe("getPlaygroundItem", () => {
  it("resolves a known name to its item", () => {
    expect(getPlaygroundItem("preview-02")).toEqual({
      name: "preview-02",
      title: "Preview 02",
      type: "block",
    })
  })

  it("returns null for unknown, null and undefined names", () => {
    expect(getPlaygroundItem("does-not-exist")).toBeNull()
    expect(getPlaygroundItem(null)).toBeNull()
    expect(getPlaygroundItem(undefined)).toBeNull()
  })
})

describe("PLAYGROUND_ITEMS", () => {
  it("has unique names", () => {
    const names = PLAYGROUND_ITEMS.map((item) => item.name)
    expect(new Set(names).size).toBe(names.length)
  })

  it("lists blocks before examples", () => {
    const firstExample = PLAYGROUND_ITEMS.findIndex(
      (item) => item.type === "example"
    )
    const lastBlock = PLAYGROUND_ITEMS.reduce(
      (last, item, i) => (item.type === "block" ? i : last),
      -1
    )
    expect(lastBlock).toBeLessThan(firstExample)
  })

  it("resolves DEFAULT_ITEM to an item", () => {
    expect(getPlaygroundItem(DEFAULT_ITEM)?.name).toBe(DEFAULT_ITEM)
  })
})

describe("PLAYGROUND_LOADERS", () => {
  it("has a loader for every item and no extras", () => {
    expect(Object.keys(PLAYGROUND_LOADERS).sort()).toEqual(
      PLAYGROUND_ITEMS.map((item) => item.name).sort()
    )
  })
})
