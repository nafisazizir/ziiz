"use client"

import * as React from "react"

import {
  currentPalette,
  oklchToHex,
  paletteTokens,
  type Theme,
} from "@/lib/color-ramp"
import {
  SEED_ENDPOINTS,
  SEED_PRESETS,
  seedPalette,
  seedTheme,
} from "@/lib/seed-palette"
import { EndpointField, PalettePanel } from "@/components/palette-remap"
import { ThemePreview } from "@/components/theme-preview"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

const THEMES: Theme[] = ["light", "dark"]

const STRENGTH_MAX = 0.4

/** Where real tinted grays sit on the strength scale, measured. */
const MARKS = [
  { name: "zinc", at: 0.06 },
  { name: "mist", at: 0.13 },
  { name: "gray", at: 0.19 },
  { name: "slate", at: 0.29 },
]

function Section({
  title,
  sub,
  children,
}: {
  title: string
  sub: string
  children: React.ReactNode
}) {
  return (
    <section className="flex flex-col gap-8 lg:gap-15">
      <h2 className="text-heading-32 text-gray-1000">
        {title}
        <span className="block text-gray-900">{sub}</span>
      </h2>
      {children}
    </section>
  )
}

function StrengthField({
  value,
  onChange,
}: {
  value: number
  onChange: (n: number) => void
}) {
  return (
    <div className="flex w-full max-w-md flex-col gap-1.5">
      <Label id="seed-strength" className="text-label-13 text-gray-1000">
        Gray strength
        <span className="text-gray-900">{` · ${(value * 100).toFixed(1)}% of the gamut edge`}</span>
      </Label>
      <div className="flex h-9 items-center">
        <Slider
          aria-labelledby="seed-strength"
          min={0}
          max={STRENGTH_MAX}
          step={0.005}
          value={[value]}
          onValueChange={(v) => onChange(Array.isArray(v) ? v[0] : v)}
        />
      </div>
      <div className="relative h-4">
        {MARKS.map((m) => (
          <span
            key={m.name}
            className="absolute -translate-x-1/2 text-label-12-mono text-gray-900"
            style={{ left: `${(m.at / STRENGTH_MAX) * 100}%` }}
          >
            {m.name}
          </span>
        ))}
      </div>
    </div>
  )
}

export function SeedLab() {
  const [hex, setHex] = React.useState<string>(SEED_PRESETS[0].hex)
  const [strength, setStrength] = React.useState<number>(
    SEED_PRESETS[0].strength
  )
  const [matchSaturation, setMatchSaturation] = React.useState(true)
  const [theme, setTheme] = React.useState<Theme>("light")
  const [endpoints, setEndpoints] = React.useState(SEED_ENDPOINTS)
  const [copied, setCopied] = React.useState(false)

  const seeded = React.useMemo(
    () => seedTheme(hex, { strength, matchSaturation }),
    [hex, strength, matchSaturation]
  )
  const palettes = React.useMemo(
    () =>
      seeded && {
        light: seedPalette("light", seeded, endpoints),
        dark: seedPalette("dark", seeded, endpoints),
      },
    [seeded, endpoints]
  )
  const shipped = React.useMemo(() => currentPalette(theme), [theme])

  const css = React.useMemo(() => {
    if (!palettes) return ""
    const block = (t: Theme, selector: string) =>
      `${selector} {\n${Object.entries(paletteTokens(palettes[t]))
        .map(([k, v]) => `  ${k}: ${v};`)
        .join("\n")}\n}`
    return `${block("light", ":root")}\n\n${block("dark", ".dark")}`
  }, [palettes])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(css)
    } catch {
      return
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 1400)
  }

  const setEndpoint = (key: "floor" | "ceiling") => (value: string) =>
    setEndpoints((e) => ({ ...e, [theme]: { ...e[theme], [key]: value } }))

  const palette = palettes?.[theme]
  const floorHex = palette?.rows[0].swatches[0]?.hex ?? "#FFFFFF"

  return (
    <div className="flex flex-col gap-20 py-10 lg:gap-30 lg:py-20">
      <Section
        title="Pick a colour"
        sub="its hue tints the grays every component speaks; the colour itself becomes the nearest ramp's solid"
      >
        <div className="flex flex-col gap-8">
          <div className="flex flex-wrap gap-2">
            {SEED_PRESETS.map((p) => (
              <Button
                key={p.name}
                size="sm"
                shape="rounded"
                variant={p.hex === hex ? "secondary" : "outline"}
                onClick={() => {
                  setHex(p.hex)
                  setStrength(p.strength)
                }}
              >
                <span
                  className="size-3 rounded-full ring-1 ring-gray-alpha-400 ring-inset"
                  style={{ backgroundColor: p.hex }}
                />
                {p.name}
              </Button>
            ))}
          </div>
          <div className="flex flex-wrap items-start gap-x-8 gap-y-6">
            <EndpointField
              id="seed-hex"
              label="Seed"
              hint="any colour"
              hex={hex}
              onChange={setHex}
            />
            <StrengthField value={strength} onChange={setStrength} />
            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor="seed-match"
                className="text-label-13 text-gray-1000"
              >
                Match saturation
                <span className="text-gray-900">{` · other hues`}</span>
              </Label>
              <div className="flex h-9 items-center">
                <Switch
                  id="seed-match"
                  checked={matchSaturation}
                  onCheckedChange={setMatchSaturation}
                />
              </div>
            </div>
          </div>
          {seeded ? (
            <p className="text-copy-14 text-gray-900">
              <span className="text-gray-1000">{`brand-700 is ${hex.toUpperCase()}`}</span>
              {` · saturation ${seeded.saturation.toFixed(2)} of the edge · solid L ${(seeded.seed.L * 100).toFixed(1)}${seeded.clamped ? " (clamped into 40 to 88)" : ""} · ${palettes?.light.brandOn === "oklch(1 0 0)" ? "white" : "dark"} text on the solid · gray hue ${seeded.tint.hue.toFixed(1)} · the seven named ramps keep their hues`}
            </p>
          ) : (
            <p className="text-copy-14 text-red-900">Enter a six-digit hex.</p>
          )}
        </div>
      </Section>

      {palettes && palette && seeded && (
        <>
          <Section
            title="The family"
            sub="the shipped palette beside the seeded one, every gray at the contrast it had"
          >
            <div className="flex flex-col gap-8">
              <div className="flex flex-wrap gap-x-8 gap-y-4">
                <div className="flex flex-col gap-1.5">
                  <span
                    id="seed-theme"
                    className="text-label-13 text-gray-1000"
                  >
                    Theme
                  </span>
                  <ToggleGroup
                    aria-labelledby="seed-theme"
                    variant="outline"
                    spacing={0}
                    value={[theme]}
                    onValueChange={(value) => {
                      if (value[0]) setTheme(value[0] as Theme)
                    }}
                  >
                    {THEMES.map((item) => (
                      <ToggleGroupItem
                        key={item}
                        value={item}
                        className="capitalize"
                      >
                        {item}
                      </ToggleGroupItem>
                    ))}
                  </ToggleGroup>
                </div>
                <EndpointField
                  id="seed-floor"
                  label="Floor"
                  hint="background-100"
                  hex={endpoints[theme].floor}
                  onChange={setEndpoint("floor")}
                />
                <EndpointField
                  id="seed-ceiling"
                  label="Ceiling"
                  hint="gray-1000"
                  hex={endpoints[theme].ceiling}
                  onChange={setEndpoint("ceiling")}
                />
              </div>
              <ul className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2">
                <PalettePanel
                  palette={shipped}
                  surface={oklchToHex(theme === "light" ? 1 : 0, 0, 0)}
                  label={`ziiz as shipped · ${theme}`}
                  meta="k 1.00"
                />
                <PalettePanel
                  palette={palette}
                  surface={floorHex}
                  label={`Seeded from ${hex.toUpperCase()} · ${theme}`}
                  meta={`floor ${floorHex} · gray-950 ${palette.gray950?.hex} · k ${palette.k.toFixed(2)}`}
                />
              </ul>
              <div className="flex flex-col gap-4">
                <Separator />
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <p className="text-copy-13 text-gray-900">
                    <span className="text-gray-1000">{`k ${palettes.light.k.toFixed(2)} light, ${palettes.dark.k.toFixed(2)} dark`}</span>
                    {` · pure white and black floors stay pure, the gamut edge closes there`}
                  </p>
                  <div className="flex items-center gap-3">
                    <Button
                      shape="rounded"
                      size="sm"
                      variant="secondary"
                      disabled={endpoints === SEED_ENDPOINTS}
                      onClick={() => setEndpoints(SEED_ENDPOINTS)}
                    >
                      Reset endpoints
                    </Button>
                    <Button shape="rounded" size="sm" onClick={copy}>
                      {copied ? "Copied" : "Copy both themes"}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Section>

          <Section
            title="In ziiz"
            sub="stock components; none of them was told about the seed"
          >
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              {THEMES.map((t) => (
                <ThemePreview
                  key={t}
                  theme={t}
                  tokens={paletteTokens(palettes[t])}
                />
              ))}
            </div>
          </Section>
        </>
      )}
    </div>
  )
}
