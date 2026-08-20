// @vitest-environment jsdom
import { act, cleanup, render, screen } from "@testing-library/react"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

import { useIsMobile } from "@/hooks/use-mobile"

const listeners = new Set<() => void>()

function setWidth(width: number) {
  window.innerWidth = width
  for (const listener of [...listeners]) listener()
}

function Probe() {
  return <span>{useIsMobile() ? "mobile" : "desktop"}</span>
}

beforeEach(() => {
  listeners.clear()
  vi.stubGlobal(
    "matchMedia",
    vi.fn((query: string) => ({
      media: query,
      matches: window.innerWidth < 768,
      addEventListener: (_event: string, listener: () => void) => {
        listeners.add(listener)
      },
      removeEventListener: (_event: string, listener: () => void) => {
        listeners.delete(listener)
      },
    }))
  )
})

afterEach(() => {
  cleanup()
  vi.unstubAllGlobals()
})

describe("useIsMobile", () => {
  it("reports desktop at and above the breakpoint", () => {
    setWidth(768)
    render(<Probe />)

    expect(screen.getByText("desktop")).toBeDefined()
  })

  it("reports mobile below the breakpoint", () => {
    setWidth(767)
    render(<Probe />)

    expect(screen.getByText("mobile")).toBeDefined()
  })

  it("subscribes with a max-width query one pixel below the breakpoint", () => {
    setWidth(1024)
    render(<Probe />)

    expect(window.matchMedia).toHaveBeenCalledWith("(max-width: 767px)")
  })

  it("re-renders when the media query changes", () => {
    setWidth(1024)
    render(<Probe />)
    expect(screen.getByText("desktop")).toBeDefined()

    act(() => setWidth(500))
    expect(screen.getByText("mobile")).toBeDefined()

    act(() => setWidth(900))
    expect(screen.getByText("desktop")).toBeDefined()
  })

  it("unsubscribes on unmount", () => {
    setWidth(1024)
    const { unmount } = render(<Probe />)
    expect(listeners.size).toBe(1)

    unmount()

    expect(listeners.size).toBe(0)
  })
})
