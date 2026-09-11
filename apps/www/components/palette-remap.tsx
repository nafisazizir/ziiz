"use client"

import * as React from "react"

import {
  CURRENT_ENDPOINTS,
  hexToOklch,
  oklchToHex,
  currentPalette,
  STEPS,
  uniformPalette,
  type PaletteRow,
  type Theme,
} from "@/lib/color-ramp"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

/** Starting points for a muted theme: a lifted floor and a softened ink. */
const DEFAULT_ENDPOINTS: Record<Theme, { floor: string; ceiling: string }> = {
  dark: { floor: "#0F0F0F", ceiling: "#E1E1E1" },
  // Matched to dark's compression (k 0.82 vs 0.81) by softening the ink rather
  // than greying the page: light and dark are not perceptually symmetric, and a
  // page dropped to #E1E1E1 reads dingy where a floor lifted off black reads soft.
  light: { floor: "#FAFAFA", ceiling: "#242424" },
}

const THEMES: Theme[] = ["dark", "light"]

function EndpointField({
  id,
  label,
  hex,
  onChange,
}: {
  id: string
  label: string
  hex: string
  onChange: (hex: string) => void
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={id} className="text-label-12 text-gray-900">
        {label}
      </Label>
      <div className="flex items-center gap-2">
        <input
          id={`${id}-picker`}
          type="color"
          value={hex}
          aria-label={`${label} color picker`}
          onChange={(e) => onChange(e.target.value.toUpperCase())}
          className="h-9 w-11 cursor-pointer rounded-md border border-gray-alpha-400 bg-background-100 p-0.5"
        />
        <Input
          id={id}
          value={hex}
          spellCheck={false}
          autoComplete="off"
          aria-invalid={hexToOklch(hex) === null}
          onChange={(e) => {
            const next = e.target.value
            onChange(next.startsWith("#") ? next : `#${next}`)
          }}
          className="w-28 font-mono"
        />
      </div>
    </div>
  )
}

/** Each half paints its own surface, so the hairline and label have to come
 *  from that surface rather than the page theme — a white hairline vanishes on
 *  a light floor, which is what hid the pale tints entirely. */
function surfaceInk(surfaceHex: string) {
  const isDark = (hexToOklch(surfaceHex)?.L ?? 0) < 0.5
  return {
    hairline: isDark
      ? "inset 0 0 0 1px rgb(255 255 255 / 0.07)"
      : "inset 0 0 0 1px rgb(0 0 0 / 0.11)",
    label: isDark ? "oklch(0.706 0 0)" : "oklch(0.42 0 0)",
  }
}

function Cell({
  hex,
  surface,
  empty,
}: {
  hex?: string
  surface: string
  empty?: boolean
}) {
  return (
    <div style={{ backgroundColor: surface }} className="p-1">
      <div
        className="aspect-square rounded-lg"
        style={
          empty
            ? undefined
            : {
                backgroundColor: hex,
                boxShadow: surfaceInk(surface).hairline,
              }
        }
      />
    </div>
  )
}

function HeadCell({
  surface,
  children,
}: {
  surface: string
  children?: React.ReactNode
}) {
  return (
    <div
      style={{ backgroundColor: surface, color: surfaceInk(surface).label }}
      className="px-1 pb-1.5 text-center text-label-12-mono"
    >
      {children}
    </div>
  )
}

export function PaletteRemap() {
  const [endpoints, setEndpoints] = React.useState(DEFAULT_ENDPOINTS)
  const [theme, setTheme] = React.useState<Theme>("dark")
  const [copied, setCopied] = React.useState(false)

  const { floor: floorHex, ceiling: ceilingHex } = endpoints[theme]
  const setFloorHex = (hex: string) =>
    setEndpoints((e) => ({ ...e, [theme]: { ...e[theme], floor: hex } }))
  const setCeilingHex = (hex: string) =>
    setEndpoints((e) => ({ ...e, [theme]: { ...e[theme], ceiling: hex } }))

  const lightnessOf = (hex: string, fallback: number) =>
    (hexToOklch(hex)?.L ?? fallback / 100) * 100
  const floorL = lightnessOf(floorHex, CURRENT_ENDPOINTS[theme].floor)
  const ceilingL = lightnessOf(ceilingHex, CURRENT_ENDPOINTS[theme].ceiling)

  const current = React.useMemo(() => currentPalette(theme), [theme])
  const custom = React.useMemo(
    () => uniformPalette(theme, floorL, ceilingL),
    [theme, floorL, ceilingL]
  )

  const currentSurface = oklchToHex(CURRENT_ENDPOINTS[theme].floor / 100, 0, 0)
  const customSurface = oklchToHex(floorL / 100, 0, 0)

  // Always emit a complete theme, not just the half on screen.
  const css = React.useMemo(() => {
    const block = (t: Theme, selector: string) => {
      const { floor, ceiling } = endpoints[t]
      const built = uniformPalette(
        t,
        lightnessOf(floor, CURRENT_ENDPOINTS[t].floor),
        lightnessOf(ceiling, CURRENT_ENDPOINTS[t].ceiling)
      )
      const lines = built.rows.flatMap((row: PaletteRow) => {
        const base = row.token.replace("-*", "")
        return row.swatches
          .filter((s) => s !== null)
          .map((s) => `  ${base}-${s!.step}: ${s!.css};`)
      })
      return `${selector} {\n${lines.join("\n")}\n}`
    }
    return `${block("light", ":root")}\n\n${block("dark", ".dark")}`
  }, [endpoints])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(css)
    } catch {
      return
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 1400)
  }

  const half = (rows: PaletteRow[], rowIndex: number, surface: string) =>
    rows[rowIndex].swatches.map((swatch, i) => (
      <Cell
        key={i}
        surface={surface}
        hex={swatch?.hex}
        empty={swatch === null}
      />
    ))

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-label-12 tracking-wider text-gray-900 uppercase">
        Generated palette
      </h2>

      <div className="flex flex-wrap items-end gap-5 rounded-lg border bg-background-200 p-4">
        <EndpointField
          id="floor-hex"
          label="Floor — background-100"
          hex={floorHex}
          onChange={setFloorHex}
        />
        <EndpointField
          id="ceiling-hex"
          label="Ceiling — gray-1000"
          hex={ceilingHex}
          onChange={setCeilingHex}
        />
        <div className="flex flex-col gap-1.5">
          <span className="text-label-12 text-gray-900">Theme</span>
          <div className="flex gap-1.5">
            {THEMES.map((option) => (
              <Button
                key={option}
                variant="outline"
                size="sm"
                aria-pressed={theme === option}
                onClick={() => setTheme(option)}
                className="capitalize aria-pressed:border-gray-600 aria-pressed:bg-gray-100"
              >
                {option}
              </Button>
            ))}
          </div>
        </div>
        <div className="ml-auto">
          <Button variant="outline" size="sm" onClick={copy}>
            {copied ? "Copied" : "Copy both themes"}
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto pb-1">
        <div className="grid min-w-[58rem] grid-cols-[5.5rem_repeat(10,minmax(0,1fr))_1.5rem_repeat(10,minmax(0,1fr))]">
          {/* title row */}
          <div />
          <div
            style={{
              backgroundColor: currentSurface,
              color: surfaceInk(currentSurface).label,
            }}
            className="col-span-10 px-1 pt-2 pb-1 text-label-12-mono"
          >
            Current · {theme} — floor {currentSurface}
          </div>
          <div />
          <div
            style={{
              backgroundColor: customSurface,
              color: surfaceInk(customSurface).label,
            }}
            className="col-span-10 px-1 pt-2 pb-1 text-label-12-mono"
          >
            Custom — floor {customSurface}
          </div>

          {/* column headers */}
          <div />
          {STEPS.map((step) => (
            <HeadCell key={`c-${step}`} surface={currentSurface}>
              {step}
            </HeadCell>
          ))}
          <div />
          {STEPS.map((step) => (
            <HeadCell key={`x-${step}`} surface={customSurface}>
              {step}
            </HeadCell>
          ))}

          {/* palette rows */}
          {current.rows.map((row, rowIndex) => (
            <React.Fragment key={row.label}>
              <div className="flex items-center pr-3 text-label-13 text-gray-1000">
                {row.label}
              </div>
              {half(current.rows, rowIndex, currentSurface)}
              <div />
              {half(custom.rows, rowIndex, customSurface)}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  )
}
