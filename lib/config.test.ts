import { describe, expect, it } from "vitest"

import { siteConfig } from "@/lib/config"

describe("siteConfig", () => {
  it("exposes root-relative, unique hrefs for every navigation entry", () => {
    const hrefs = [
      ...siteConfig.navItems.map((item) => item.href),
      ...siteConfig.foundationItems.map((item) => item.href),
      ...siteConfig.componentItems.map((item) => item.href),
    ]

    expect(hrefs.every((href) => href.startsWith("/"))).toBe(true)
    expect(new Set(hrefs).size).toBe(hrefs.length)
  })

  it("labels every navigation entry", () => {
    expect(siteConfig.navItems.every((item) => item.label.length > 0)).toBe(
      true
    )
    expect(
      [...siteConfig.foundationItems, ...siteConfig.componentItems].every(
        (item) => item.name.length > 0
      )
    ).toBe(true)
  })
})
