import { describe, expect, it } from "vitest"

import { cn } from "@/lib/utils"

describe("cn", () => {
  it("joins conditional inputs and drops falsy ones", () => {
    expect(
      cn("a", false && "b", null, undefined, ["c", { d: true, e: false }])
    ).toBe("a c d")
  })

  it("keeps the last of conflicting utilities from the same group", () => {
    expect(cn("px-2", "px-4")).toBe("px-4")
  })

  it("treats type roles as one font-size group", () => {
    expect(cn("text-copy-16", "text-label-14")).toBe("text-label-14")
    expect(cn("text-heading-72", "text-heading-24")).toBe("text-heading-24")
  })

  it("keeps a type role alongside a color, which is a different group", () => {
    expect(cn("text-copy-16", "text-gray-900")).toBe(
      "text-copy-16 text-gray-900"
    )
  })

  it("treats materials as their own group", () => {
    expect(cn("material-small", "material-modal")).toBe("material-modal")
    expect(cn("material-base", "px-2")).toBe("material-base px-2")
  })

  it("leaves unknown material-like values untouched", () => {
    expect(cn("material-custom", "material-modal")).toBe(
      "material-custom material-modal"
    )
  })

  it("returns an empty string when nothing is passed", () => {
    expect(cn()).toBe("")
  })
})
