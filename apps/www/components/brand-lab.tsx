"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import {
  contrastRatio,
  currentPalette,
  hexToOklch,
  neutralChroma,
  oklchToHex,
  paletteTokens,
  relativeLuminance,
  type NeutralTint,
  type Palette,
  type Swatch,
  type Theme,
} from "@/lib/color-ramp"
import {
  brandPalette,
  type BrandRole,
  type BrandTheme,
} from "@/lib/themes/brand"
import { EndpointField, PalettePanel } from "@/components/palette-remap"
import { ThemePreview } from "@/components/theme-preview"
import { Button } from "@/components/ui/button"
import { InputGroup, InputGroupInput } from "@/components/ui/input-group"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

const THEMES: Theme[] = ["light", "dark"]

/* ---------- colour arithmetic for the fit table ---------- */

const channels = (hex: string) => {
  const raw = hex.replace("#", "")
  const rgb = [0, 2, 4].map((i) => parseInt(raw.slice(i, i + 2), 16) / 255)
  const alpha = raw.length === 8 ? parseInt(raw.slice(6, 8), 16) / 255 : 1
  return { rgb, alpha }
}

/** A translucent brand token as it paints over its own floor; CSS composites in
 *  gamma space. */
function composite(hex: string, floorHex: string) {
  const { rgb, alpha } = channels(hex)
  const floor = channels(floorHex).rgb
  return `#${rgb
    .map((c, i) =>
      Math.round((floor[i] + (c - floor[i]) * alpha) * 255)
        .toString(16)
        .padStart(2, "0")
    )
    .join("")
    .toUpperCase()}`
}

function oklab(hex: string) {
  const o = hexToOklch(hex)!
  const h = (o.H * Math.PI) / 180
  return [o.L, o.C * Math.cos(h), o.C * Math.sin(h)]
}

/** OKLab distance, x100. Under 2 is hard to tell apart side by side. */
const deltaE = (a: string, b: string) => {
  const [x, y] = [oklab(a), oklab(b)]
  return Math.hypot(x[0] - y[0], x[1] - y[1], x[2] - y[2]) * 100
}

const luminance = (hex: string) => {
  const o = hexToOklch(hex)!
  return relativeLuminance(o.L, o.C, o.H)
}

function swatchesByToken(palette: Palette) {
  const map: Record<string, Swatch> = {}
  for (const row of palette.rows) {
    const base = row.token.replace("--ds-", "").replace("-*", "")
    for (const s of row.swatches) if (s) map[`${base}-${s.step}`] = s
  }
  if (palette.gray950) map["gray-950"] = palette.gray950
  if (palette.brand950) map["brand-950"] = palette.brand950
  return map
}

/* ---------- pieces ---------- */

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

function Chip({
  hex,
  label,
  meta,
}: {
  hex: string
  label: string
  meta: string
}) {
  return (
    <li className="flex flex-col gap-1.5">
      <div
        className="aspect-square ring-1 ring-gray-alpha-400 ring-inset"
        style={{ backgroundColor: hex }}
      />
      <span
        className="truncate text-label-12-mono text-gray-1000"
        title={label}
      >
        {label}
      </span>
      <span className="text-label-12-mono text-gray-900 tabular-nums">
        {meta}
      </span>
    </li>
  )
}

function Strip({ ramp }: { ramp: readonly (readonly [string, string])[] }) {
  return (
    <ul className="grid grid-cols-[repeat(auto-fill,minmax(4.5rem,1fr))] gap-2">
      {ramp.map(([step, hex], i) => {
        const o = hexToOklch(hex)!
        return (
          <Chip
            key={`${step}-${i}`}
            hex={hex}
            label={step}
            meta={`${(o.L * 100).toFixed(0)} ${o.C.toFixed(3).slice(1)}`}
          />
        )
      })}
    </ul>
  )
}

/** Chroma against lightness: the brand's neutrals as dots, the tint model as
 *  a line. The whole claim of the model is that the dots follow it. */
function TintPlot({
  tint,
  neutrals,
}: {
  tint: NeutralTint
  neutrals: readonly string[]
}) {
  const [w, h, pad] = [1100, 260, 40]
  const dots = neutrals.map((hex) => ({ hex, ...hexToOklch(hex)! }))
  const maxC = Math.max(0.014, ...dots.map((d) => d.C * 1.15))
  const x = (L: number) => pad + ((L - 15) / 85) * (w - pad * 2)
  const y = (C: number) => h - pad - (C / maxC) * (h - pad * 2)
  const line = Array.from({ length: 86 }, (_, i) => 15 + i)
    .map((L, i) => `${i ? "L" : "M"}${x(L)},${y(neutralChroma(L, tint))}`)
    .join("")
  return (
    <figure className="flex flex-col gap-3">
      <svg
        viewBox={`0 0 ${w} ${h}`}
        className="w-full overflow-visible"
        role="img"
        aria-label="Neutral chroma against lightness, with the tint model"
      >
        {[0, 0.005, 0.01].map((c) => (
          <g key={c}>
            <line
              x1={pad}
              x2={w - pad}
              y1={y(c)}
              y2={y(c)}
              className="stroke-gray-alpha-400"
            />
            <text
              x={pad - 6}
              y={y(c)}
              dy="0.35em"
              textAnchor="end"
              className="fill-gray-900 text-label-12-mono"
            >
              {c.toFixed(3).slice(1)}
            </text>
          </g>
        ))}
        {[25, 50, 75, 100].map((L) => (
          <text
            key={L}
            x={x(L)}
            y={h - pad + 18}
            textAnchor="middle"
            className="fill-gray-900 text-label-12-mono"
          >
            {`L ${L}`}
          </text>
        ))}
        <path
          d={line}
          fill="none"
          strokeWidth={1.5}
          className="stroke-gray-1000"
        />
        {dots.map((d) => (
          <circle
            key={d.hex}
            cx={x(d.L * 100)}
            cy={y(d.C)}
            r={5}
            fill={d.hex}
            className="stroke-gray-alpha-700"
          />
        ))}
      </svg>
      <figcaption className="text-copy-13 text-gray-900">
        {`Dots are the ${dots.length} measured neutrals; the line is ${(tint.strength * 100).toFixed(1)}% of the sRGB gamut edge at hue ${tint.hue.toFixed(1)}. One number, no per-step table.`}
      </figcaption>
    </figure>
  )
}

function NumberField({
  id,
  label,
  hint,
  value,
  step,
  onChange,
}: {
  id: string
  label: string
  hint: string
  value: number
  step: number
  onChange: (n: number) => void
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
          type="number"
          inputMode="decimal"
          step={step}
          value={value}
          onChange={(e) => {
            const n = parseFloat(e.target.value)
            if (Number.isFinite(n)) onChange(n)
          }}
          className="font-mono"
        />
      </InputGroup>
    </div>
  )
}

function FitTable({
  roles,
  palette,
  floorHex,
}: {
  roles: BrandRole[]
  palette: Palette
  floorHex: string
}) {
  const generated = swatchesByToken(palette)
  const grays = Object.entries(generated).filter(([t]) => /^gray-\d+$/.test(t))
  const floorLum = luminance(floorHex)
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[56rem] text-left">
        <thead className="text-label-12 text-gray-900">
          <tr className="border-b border-gray-alpha-400">
            <th className="py-2 pr-4 font-normal">painted as</th>
            <th className="py-2 pr-4 font-normal">ziiz role</th>
            <th className="py-2 pr-4 font-normal">measured</th>
            <th className="py-2 pr-4 font-normal">generated</th>
            <th className="py-2 pr-4 text-right font-normal">ΔE</th>
            <th className="py-2 font-normal">evidence</th>
          </tr>
        </thead>
        <tbody className="text-label-13-mono text-gray-1000">
          {roles.map((role) => {
            const measured =
              role.hex.length === 9 ? composite(role.hex, floorHex) : role.hex
            let token = role.ziiz
            let nearest = false
            if (token?.endsWith("-*")) {
              const ramp = token.slice(0, -1)
              const steps = Object.entries(generated).filter(
                ([t]) =>
                  t.startsWith(ramp) && /^\d+$/.test(t.slice(ramp.length))
              )
              token = steps.length
                ? steps.reduce((best, cur) =>
                    deltaE(measured, cur[1].hex) < deltaE(measured, best[1].hex)
                      ? cur
                      : best
                  )[0]
                : token
              nearest = true
            } else if (!token) {
              const target = contrastRatio(luminance(measured), floorLum)
              token = grays.reduce((best, [t, s]) =>
                Math.abs(s.contrast - target) <
                Math.abs(best[1].contrast - target)
                  ? [t, s]
                  : best
              )[0]
              nearest = true
            }
            // A role naming a token the palette lacks shows a dash, not a crash.
            const gen = generated[token] as Swatch | undefined
            const d = gen ? deltaE(measured, gen.hex) : NaN
            return (
              <tr
                key={role.role + role.hex}
                className="border-b border-gray-alpha-200"
              >
                <td className="py-2 pr-4">{role.role}</td>
                <td className="py-2 pr-4 text-gray-900">
                  {nearest
                    ? `${role.ziiz ? "nearest" : "none · nearest"} ${token}`
                    : token}
                </td>
                <td className="py-2 pr-4">
                  <SwatchCell hex={measured} />
                </td>
                <td className="py-2 pr-4">
                  {gen ? <SwatchCell hex={gen.hex} /> : "—"}
                </td>
                <td
                  className={cn(
                    "py-2 pr-4 text-right tabular-nums",
                    d < 2
                      ? "text-gray-900"
                      : d < 5
                        ? "text-gray-1000"
                        : "text-red-900"
                  )}
                >
                  {gen ? d.toFixed(1) : "—"}
                </td>
                <td className="py-2 text-label-12 text-gray-900">
                  {role.evidence}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

function SwatchCell({ hex }: { hex: string }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span
        className="size-4 rounded-sm ring-1 ring-gray-alpha-400 ring-inset"
        style={{ backgroundColor: hex }}
      />
      {hex}
    </span>
  )
}

/* ---------- the lab ---------- */

export function BrandLab({ brand }: { brand: BrandTheme }) {
  const [theme, setTheme] = React.useState<Theme>("light")
  const [endpoints, setEndpoints] = React.useState(brand.endpoints)
  const [tint, setTint] = React.useState(brand.tint)
  const [copied, setCopied] = React.useState(false)

  const palettes = React.useMemo(
    () => ({
      light: brandPalette(brand, "light", endpoints, tint),
      dark: brandPalette(brand, "dark", endpoints, tint),
    }),
    [brand, endpoints, tint]
  )
  const palette = palettes[theme]
  const shipped = React.useMemo(() => currentPalette(theme), [theme])
  const floorHex = palette.rows[0].swatches[0]!.hex

  const setEndpoint = (key: "floor" | "ceiling") => (hex: string) =>
    setEndpoints((e) => ({ ...e, [theme]: { ...e[theme], [key]: hex } }))
  const setThemeTint = (patch: Partial<NeutralTint>) =>
    setTint((t) => ({ ...t, [theme]: { ...t[theme], ...patch } }))

  const css = React.useMemo(() => {
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

  const isDefault = endpoints === brand.endpoints && tint === brand.tint
  const id = (name: string) => `${brand.slug}-${name}`

  return (
    <div className="flex flex-col gap-20 py-10 lg:gap-30 lg:py-20">
      <Section
        title={`What ${brand.name} ships`}
        sub={
          brand.measured.source ??
          `painted on ${brand.measured.pages.length} live pages, ${brand.measured.date}, most-used first`
        }
      >
        <div className="flex flex-col gap-10">
          {brand.ramps.map((ramp) => (
            <div key={ramp.label} className="flex flex-col gap-4">
              <span className="text-label-13 text-gray-900">
                {`${ramp.label} · L and chroma`}
              </span>
              <Strip ramp={ramp.swatches} />
            </div>
          ))}
          <p className="text-copy-13 text-gray-900">
            <span className="text-gray-1000">
              {brand.measured.source ? "Source " : "Pages "}
            </span>
            {brand.measured.pages.join(" · ")}
            <span className="block">
              <span className="text-gray-1000">Dark </span>
              {brand.dark}
            </span>
          </p>
          <TintPlot tint={tint[theme]} neutrals={brand.neutrals[theme]} />
          <ul className="grid grid-cols-1 gap-6 text-copy-14 text-gray-900 md:grid-cols-3">
            {brand.findings.map((f) => (
              <li key={f.title}>
                <span className="block text-gray-1000">{f.title}</span>
                {f.body}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section
        title="The inputs"
        sub={`floor, ceiling and a tint per theme; the anchors come from the ${brand.name} fills`}
      >
        <div className="flex flex-col gap-8">
          <div className="flex flex-wrap gap-x-8 gap-y-4">
            <div className="flex flex-col gap-1.5">
              <span id={id("theme")} className="text-label-13 text-gray-1000">
                Theme
              </span>
              <ToggleGroup
                aria-labelledby={id("theme")}
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
              id={id("floor")}
              label="Floor"
              hint="page"
              hex={endpoints[theme].floor}
              onChange={setEndpoint("floor")}
            />
            <EndpointField
              id={id("ceiling")}
              label="Ceiling"
              hint="primary ink"
              hex={endpoints[theme].ceiling}
              onChange={setEndpoint("ceiling")}
            />
            <NumberField
              id={id("tint-hue")}
              label="Tint hue"
              hint="degrees"
              value={tint[theme].hue}
              step={0.5}
              onChange={(hue) => setThemeTint({ hue })}
            />
            <NumberField
              id={id("tint-strength")}
              label="Tint strength"
              hint="of the gamut edge"
              value={tint[theme].strength}
              step={0.005}
              onChange={(strength) => setThemeTint({ strength })}
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
              label={`${brand.name} on the ziiz model · ${theme}`}
              meta={`floor ${floorHex} · gray-950 ${palette.gray950?.hex} · k ${palette.k.toFixed(2)}`}
            />
          </ul>
          <div className="flex flex-col gap-4">
            <Separator />
            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className="text-copy-13 text-gray-900">
                <span className="text-gray-1000">{`k ${palettes.light.k.toFixed(2)} light, ${palettes.dark.k.toFixed(2)} dark`}</span>
                {` · ${brand.brand.name} is the brand ramp, ${palette.brandOn === "oklch(1 0 0)" ? "white" : "dark"} text on its 700`}
              </p>
              <div className="flex items-center gap-3">
                <Button
                  shape="rounded"
                  size="sm"
                  variant="secondary"
                  disabled={isDefault}
                  onClick={() => {
                    setEndpoints(brand.endpoints)
                    setTint(brand.tint)
                  }}
                >
                  Reset
                </Button>
                <Button shape="rounded" size="sm" onClick={copy}>
                  {copied ? "Copied" : "Copy both themes"}
                </Button>
              </div>
            </div>
          </div>
          <ul className="grid grid-cols-1 gap-x-6 gap-y-2 text-label-13-mono text-gray-900 md:grid-cols-2">
            <li>
              <span className="text-gray-1000">{`brand (${brand.brand.name})`}</span>
              {` · ${brand.brand.source}`}
            </li>
            {Object.entries(brand.anchors).map(([name, a]) => (
              <li key={name}>
                <span className="text-gray-1000">{name}</span>
                {` · ${a.source}`}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section
        title="Against the original"
        sub={`each colour ${brand.name} paints, beside the generated ziiz token in the same role`}
      >
        <div className="flex flex-col gap-4">
          <FitTable
            roles={brand.roles[theme]}
            palette={palette}
            floorHex={floorHex}
          />
          <p className="text-copy-13 text-gray-900">
            {`ΔE is OKLab distance ×100; under 2 is hard to tell side by side. Translucent tokens are compared as painted on the floor. Rows marked none have no ziiz role and show the nearest generated gray by contrast; decorative colour is matched to the closest step of its ramp.`}
          </p>
        </div>
      </Section>

      <Section
        title="In ziiz"
        sub="stock components, the generated tokens set on the subtree"
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
    </div>
  )
}
