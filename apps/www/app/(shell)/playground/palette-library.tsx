"use client"

import * as React from "react"
import { IconCheck, IconChevronDown, IconCopy } from "@tabler/icons-react"

import { hexToOklch, type Theme } from "@/lib/color-ramp"
import {
  LIBRARY,
  paletteCss,
  previewTokens,
  seedPalettes,
  SHIPPED,
  swatch,
  THEMES,
  type LibraryEntry,
} from "@/lib/palettes"
import { SEED_ENDPOINTS } from "@/lib/seed-palette"
import {
  readSitePalette,
  SITE_SELECTORS,
  subscribeSitePalette,
  wearSitePalette,
  type CustomSeed,
} from "@/lib/site-palette"
import { ThemePreview } from "@/components/theme-preview"
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

const DEFAULT_CUSTOM: CustomSeed = {
  hex: "#5E7CE2",
  strength: 0.15,
  endpoints: SEED_ENDPOINTS,
}

const STRENGTH_MAX = 0.4

function useWorn() {
  return React.useSyncExternalStore(
    subscribeSitePalette,
    readSitePalette,
    () => null
  )
}

/** A palette as three dots: its light page, its dark page, its brand. */
function Dots({ entry }: { entry: LibraryEntry }) {
  const dots = [
    swatch(entry.palettes.light, "background", 100),
    swatch(entry.palettes.dark, "background", 100),
    swatch(entry.palettes.light, "brand", 700),
  ].filter(Boolean)
  return (
    <span aria-hidden className="flex">
      {dots.map((hex, i) => (
        <span
          key={i}
          className="size-3.5 rounded-full not-first:-ms-1"
          style={{
            backgroundColor: hex,
            boxShadow: "inset 0 0 0 1px var(--ds-gray-alpha-500)",
          }}
        />
      ))}
    </span>
  )
}

function HexField({
  id,
  label,
  value,
  onChange,
}: {
  id: string
  label: string
  value: string
  onChange: (hex: string) => void
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={id} className="text-label-13 text-gray-1000">
        {label}
      </Label>
      <InputGroup className="w-36">
        <InputGroupInput
          id={id}
          value={value}
          spellCheck={false}
          autoComplete="off"
          aria-invalid={hexToOklch(value) === null}
          onChange={(e) => {
            const next = e.target.value
            onChange(next.startsWith("#") ? next : `#${next}`)
          }}
          className="font-mono"
        />
        <InputGroupAddon>
          <label
            className="size-4 shrink-0 cursor-pointer rounded-[min(var(--radius-sm),calc(6px*var(--radius-scale)))] ring-1 ring-gray-alpha-400 ring-inset"
            style={{ backgroundColor: value }}
          >
            <input
              type="color"
              value={hexToOklch(value) ? value : "#000000"}
              aria-label={`${label} picker`}
              onChange={(e) => onChange(e.target.value.toUpperCase())}
              className="sr-only"
            />
          </label>
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}

function CustomControls({
  value,
  onChange,
}: {
  value: CustomSeed
  onChange: (next: CustomSeed) => void
}) {
  const setEndpoint =
    (theme: Theme, key: "floor" | "ceiling") => (hex: string) =>
      onChange({
        ...value,
        endpoints: {
          ...value.endpoints,
          [theme]: { ...value.endpoints[theme], [key]: hex },
        },
      })

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-start gap-x-8 gap-y-6">
        <HexField
          id="custom-seed"
          label="Colour"
          value={value.hex}
          onChange={(hex) => onChange({ ...value, hex })}
        />
        <div className="flex w-full max-w-xs flex-col gap-1.5">
          <Label id="custom-strength" className="text-label-13 text-gray-1000">
            Gray tint
            <span className="text-gray-900 tabular-nums">
              {`${Math.round(value.strength * 100)}%`}
            </span>
          </Label>
          <div className="flex h-9 items-center">
            <Slider
              aria-labelledby="custom-strength"
              min={0}
              max={STRENGTH_MAX}
              step={0.005}
              value={[value.strength]}
              onValueChange={(v) =>
                onChange({
                  ...value,
                  strength: Array.isArray(v) ? v[0] : (v as number),
                })
              }
            />
          </div>
        </div>
      </div>
      <Collapsible className="flex flex-col gap-4">
        <CollapsibleTrigger
          render={
            <Button
              variant="ghost"
              size="sm"
              shape="rounded"
              className="group/endpoints -ms-3 self-start text-gray-900"
            />
          }
        >
          Page and ink
          <IconChevronDown className="transition-transform group-data-panel-open/endpoints:rotate-180" />
        </CollapsibleTrigger>
        <CollapsibleContent className="flex flex-wrap gap-x-8 gap-y-4">
          {THEMES.map((theme) => (
            <React.Fragment key={theme}>
              <HexField
                id={`custom-${theme}-floor`}
                label={`${theme === "light" ? "Light" : "Dark"} page`}
                value={value.endpoints[theme].floor}
                onChange={setEndpoint(theme, "floor")}
              />
              <HexField
                id={`custom-${theme}-ceiling`}
                label={`${theme === "light" ? "Light" : "Dark"} ink`}
                value={value.endpoints[theme].ceiling}
                onChange={setEndpoint(theme, "ceiling")}
              />
            </React.Fragment>
          ))}
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}

export function PaletteLibrary() {
  const worn = useWorn()
  const [picked, setPicked] = React.useState<string | null>(null)
  const [edited, setEdited] = React.useState<CustomSeed | null>(null)
  const [copied, setCopied] = React.useState(false)

  const custom = edited ?? worn?.custom ?? DEFAULT_CUSTOM
  const customPalettes = React.useMemo(
    () => seedPalettes(custom.hex, custom.strength, custom.endpoints),
    [custom]
  )
  const entries = React.useMemo<LibraryEntry[]>(
    () => [
      ...LIBRARY,
      {
        id: "custom",
        name: "Custom",
        palettes: customPalettes ?? seedPalettes(DEFAULT_CUSTOM.hex, 0)!,
      },
    ],
    [customPalettes]
  )

  const wornId = worn?.id ?? SHIPPED.id
  const current = entries.find((e) => e.id === (picked ?? wornId)) ?? entries[0]
  const valid = current.id !== "custom" || customPalettes !== null
  const isShipped = current.id === SHIPPED.id

  const siteCss = React.useMemo(
    () => (isShipped ? null : paletteCss(current.palettes, SITE_SELECTORS)),
    [current, isShipped]
  )
  const isWorn = isShipped ? !worn : worn?.css === siteCss

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(paletteCss(current.palettes))
    } catch {
      return
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 1400)
  }

  const wear = () =>
    wearSitePalette(
      siteCss
        ? {
            id: current.id,
            css: siteCss,
            custom: current.id === "custom" ? custom : undefined,
          }
        : null
    )

  return (
    <div className="flex flex-col gap-10 lg:gap-15">
      <div className="flex flex-col gap-6">
        <ToggleGroup
          aria-label="Palette"
          variant="outline"
          shape="rounded"
          className="w-auto flex-wrap"
          value={[current.id]}
          onValueChange={(value) => {
            if (value[0]) setPicked(value[0])
          }}
        >
          {entries.map((entry) => (
            <ToggleGroupItem key={entry.id} value={entry.id}>
              <Dots entry={entry} />
              {entry.name}
              {entry.id === wornId && (
                <IconCheck
                  aria-label="on this site"
                  className="text-gray-900"
                />
              )}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
        {current.id === "custom" && (
          <CustomControls value={custom} onChange={setEdited} />
        )}
      </div>

      <section className="flex flex-col gap-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-gray-alpha-400 pt-6">
          <h2 className="text-heading-24 text-gray-1000">{current.name}</h2>
          <div className="flex items-center gap-3">
            {!isShipped && (
              <Button
                shape="rounded"
                size="sm"
                variant="secondary"
                disabled={!valid}
                onClick={copy}
              >
                {copied ? <IconCheck /> : <IconCopy />}
                {copied ? "Copied" : "Copy CSS"}
              </Button>
            )}
            <Button
              shape="rounded"
              size="sm"
              disabled={!valid || isWorn}
              onClick={wear}
            >
              {isWorn && <IconCheck />}
              {isWorn ? "On this site" : "Use on this site"}
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {THEMES.map((theme) => (
            <ThemePreview
              key={theme}
              theme={theme}
              tokens={previewTokens(current.palettes[theme])}
            />
          ))}
        </div>
      </section>
    </div>
  )
}
