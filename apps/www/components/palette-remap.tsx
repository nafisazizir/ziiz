"use client"

import * as React from "react"

import {
  CURRENT_ENDPOINTS,
  hexToOklch,
  oklchToHex,
  currentPalette,
  STEPS,
  uniformPalette,
  type Palette,
  type PaletteRow,
  type Theme,
} from "@/lib/color-ramp"
import { Button } from "@/components/ui/button"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

/** Starting points for a muted theme: a lifted floor and a softened ink. */
const DEFAULT_ENDPOINTS: Record<Theme, { floor: string; ceiling: string }> = {
  dark: { floor: "#0F0F0F", ceiling: "#E1E1E1" },
  // Matched to dark's compression (k 0.82 vs 0.81) by softening the ink rather
  // than greying the page: light and dark are not perceptually symmetric, and a
  // page dropped to #E1E1E1 reads dingy where a floor lifted off black reads soft.
  light: { floor: "#FAFAFA", ceiling: "#242424" },
}

const THEMES: Theme[] = ["dark", "light"]

const lightnessOf = (hex: string, fallback: number) =>
  (hexToOklch(hex)?.L ?? fallback / 100) * 100

const neutralHex = (L: number) => oklchToHex(L / 100, 0, 0).toUpperCase()

function EndpointField({
  id,
  label,
  hint,
  hex,
  onChange,
}: {
  id: string
  label: string
  hint: string
  hex: string
  onChange: (hex: string) => void
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={id} className="text-label-13 text-gray-1000">
        {label}
        <span className="text-gray-900">{` · ${hint}`}</span>
      </Label>
      <InputGroup className="w-36">
        <InputGroupInput
          id={id}
          value={hex}
          spellCheck={false}
          autoComplete="off"
          aria-invalid={hexToOklch(hex) === null}
          onChange={(e) => {
            const next = e.target.value
            onChange(next.startsWith("#") ? next : `#${next}`)
          }}
          className="font-mono"
        />
        <InputGroupAddon>
          <label
            className="size-4 shrink-0 cursor-pointer rounded-[min(var(--radius-sm),6px)] ring-1 ring-gray-alpha-400 ring-inset"
            style={{ backgroundColor: hex }}
          >
            <input
              type="color"
              value={hex}
              aria-label={`${label} color picker`}
              onChange={(e) => onChange(e.target.value.toUpperCase())}
              className="sr-only"
            />
          </label>
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}

/** Each panel paints its own floor, so the hairline and label have to come
 *  from that surface rather than the page theme: a white hairline vanishes on
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

// One palette on its own floor, captioned like an art piece: the step
// numbers head the grid and each row is named in the surface's own ink.
function PalettePanel({
  palette,
  surface,
  label,
  meta,
}: {
  palette: Palette
  surface: string
  label: string
  meta: string
}) {
  const ink = surfaceInk(surface)
  return (
    <li className="flex flex-col gap-3">
      <figure
        style={{ backgroundColor: surface, color: ink.label }}
        className="grid grid-cols-[5rem_repeat(10,minmax(0,1fr))] gap-1 p-4"
      >
        <div />
        {STEPS.map((step) => (
          <div
            key={step}
            className="pb-1 text-center text-label-12-mono tabular-nums"
          >
            {step}
          </div>
        ))}
        {palette.rows.map((row: PaletteRow) => (
          <React.Fragment key={row.token}>
            <div className="flex items-center truncate pr-2 text-label-12">
              {row.label}
            </div>
            {row.swatches.map((swatch, i) => (
              <div
                key={i}
                className="aspect-square"
                style={
                  swatch
                    ? { backgroundColor: swatch.hex, boxShadow: ink.hairline }
                    : undefined
                }
              />
            ))}
          </React.Fragment>
        ))}
      </figure>
      <p className="text-copy-13 text-gray-1000">
        {label}
        <span className="block text-label-12 text-gray-900">{meta}</span>
      </p>
    </li>
  )
}

// The controls in one row, then the two palettes side by side from md and
// a hairline footer with the span readout and the actions, the way the blog
// list closes.
export function PaletteRemap() {
  const [endpoints, setEndpoints] = React.useState(DEFAULT_ENDPOINTS)
  const [theme, setTheme] = React.useState<Theme>("dark")
  const [copied, setCopied] = React.useState(false)

  const { floor: floorHex, ceiling: ceilingHex } = endpoints[theme]
  const setEndpoint = (key: "floor" | "ceiling") => (hex: string) =>
    setEndpoints((e) => ({ ...e, [theme]: { ...e[theme], [key]: hex } }))

  const floorL = lightnessOf(floorHex, CURRENT_ENDPOINTS[theme].floor)
  const ceilingL = lightnessOf(ceilingHex, CURRENT_ENDPOINTS[theme].ceiling)

  const current = React.useMemo(() => currentPalette(theme), [theme])
  const custom = React.useMemo(
    () => uniformPalette(theme, floorL, ceilingL),
    [theme, floorL, ceilingL]
  )

  const currentSurface = neutralHex(CURRENT_ENDPOINTS[theme].floor)
  const customSurface = neutralHex(floorL)

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

  const reset = () =>
    setEndpoints((e) => ({ ...e, [theme]: DEFAULT_ENDPOINTS[theme] }))

  const isDefault =
    floorHex === DEFAULT_ENDPOINTS[theme].floor &&
    ceilingHex === DEFAULT_ENDPOINTS[theme].ceiling

  return (
    <section className="flex flex-col gap-8 lg:gap-15">
      <h2 className="text-heading-32 text-gray-1000">
        Endpoints
        <span className="block text-gray-900">
          a floor and a ceiling per theme, the shipped palette beside the result
        </span>
      </h2>
      <div className="flex flex-col gap-8">
        <div className="flex flex-wrap gap-x-8 gap-y-4">
          <div className="flex flex-col gap-1.5">
            <span id="theme-label" className="text-label-13 text-gray-1000">
              Theme
            </span>
            <ToggleGroup
              aria-labelledby="theme-label"
              variant="outline"
              spacing={0}
              value={[theme]}
              onValueChange={(value) => {
                if (value[0]) setTheme(value[0] as Theme)
              }}
            >
              {THEMES.map((item) => (
                <ToggleGroupItem key={item} value={item} className="capitalize">
                  {item}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>
          <EndpointField
            id="floor-hex"
            label="Floor"
            hint="background-100"
            hex={floorHex}
            onChange={setEndpoint("floor")}
          />
          <EndpointField
            id="ceiling-hex"
            label="Ceiling"
            hint="gray-1000"
            hex={ceilingHex}
            onChange={setEndpoint("ceiling")}
          />
        </div>
        <ul className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2">
          <PalettePanel
            palette={current}
            surface={currentSurface}
            label={`Shipped · ${theme}`}
            meta={`floor ${currentSurface} · ceiling ${neutralHex(CURRENT_ENDPOINTS[theme].ceiling)} · k 1.00`}
          />
          <PalettePanel
            palette={custom}
            surface={customSurface}
            label={`Generated · ${theme}`}
            meta={`floor ${customSurface} · ceiling ${neutralHex(ceilingL)} · k ${custom.k.toFixed(2)}`}
          />
        </ul>
        <div className="flex flex-col gap-4">
          <Separator />
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-copy-13 text-gray-900">
              <span className="text-gray-1000">{`Span ${custom.k.toFixed(2)}`}</span>
              {` of the shipped contrast range, every step at its proportional place`}
            </p>
            <div className="flex items-center gap-3">
              <Button
                shape="rounded"
                size="sm"
                variant="secondary"
                disabled={isDefault}
                onClick={reset}
              >
                Reset
              </Button>
              <Button shape="rounded" size="sm" onClick={copy}>
                {copied ? "Copied" : "Copy both themes"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
