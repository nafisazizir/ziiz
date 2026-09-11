"use client"

import * as React from "react"

import {
  darkPalette,
  GRAY,
  hexToOklch,
  oklchToHex,
  STEPS,
  uniformDarkPalette,
  type PaletteRow,
} from "@/lib/color-ramp"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

/** The endpoints the ramp ships with today: pure black, and gray-1000. */
const CURRENT_FLOOR = 0
const CURRENT_CEILING = GRAY.dark[1000]

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
                boxShadow: "inset 0 0 0 1px rgb(255 255 255 / 0.07)",
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
      style={{ backgroundColor: surface }}
      className="px-1 pb-1.5 text-center text-label-12-mono text-gray-900"
    >
      {children}
    </div>
  )
}

export function PaletteRemap() {
  const [floorHex, setFloorHex] = React.useState("#0F0F0F")
  const [ceilingHex, setCeilingHex] = React.useState("#E1E1E1")
  const [mode, setMode] = React.useState<"uniform" | "remap">("uniform")
  const [copied, setCopied] = React.useState(false)

  const floorL = (hexToOklch(floorHex)?.L ?? 0) * 100
  const ceilingL = (hexToOklch(ceilingHex)?.L ?? 0.946) * 100

  const current = React.useMemo(
    () => darkPalette(CURRENT_FLOOR, CURRENT_CEILING),
    []
  )
  const custom = React.useMemo(
    () =>
      mode === "uniform"
        ? uniformDarkPalette(floorL, ceilingL)
        : darkPalette(floorL, ceilingL),
    [floorL, ceilingL, mode]
  )

  const currentSurface = oklchToHex(CURRENT_FLOOR / 100, 0, 0)
  const customSurface = oklchToHex(floorL / 100, 0, 0)

  const css = React.useMemo(() => {
    const lines = custom.rows.flatMap((row: PaletteRow) => {
      const base = row.token.replace("-*", "")
      return row.swatches
        .filter((s) => s !== null)
        .map((s) => `  ${base}-${s!.step}: ${s!.css};`)
    })
    return `.dark {\n${lines.join("\n")}\n}`
  }, [custom])

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
        Endpoint remap · dark
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
          <span className="text-label-12 text-gray-900">Model</span>
          <div className="flex gap-1.5">
            {(["uniform", "remap"] as const).map((option) => (
              <Button
                key={option}
                variant="outline"
                size="sm"
                aria-pressed={mode === option}
                onClick={() => setMode(option)}
                className="capitalize aria-pressed:border-gray-600 aria-pressed:bg-gray-100"
              >
                {option}
              </Button>
            ))}
          </div>
        </div>
        <div className="ml-auto">
          <Button variant="outline" size="sm" onClick={copy}>
            {copied ? "Copied" : "Copy custom CSS"}
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto pb-1">
        <div className="grid min-w-[58rem] grid-cols-[5.5rem_repeat(10,minmax(0,1fr))_1.5rem_repeat(10,minmax(0,1fr))]">
          {/* title row */}
          <div />
          <div
            style={{ backgroundColor: currentSurface }}
            className="col-span-10 px-1 pt-2 pb-1 text-label-12-mono text-gray-900"
          >
            Current — floor {oklchToHex(0, 0, 0)}
          </div>
          <div />
          <div
            style={{ backgroundColor: customSurface }}
            className="col-span-10 px-1 pt-2 pb-1 text-label-12-mono text-gray-900"
          >
            Custom · {mode} — floor {customSurface}
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
