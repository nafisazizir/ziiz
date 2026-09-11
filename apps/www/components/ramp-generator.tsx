"use client"

import * as React from "react"

import {
  buildRamp,
  contrastRatio,
  gamutCusp,
  GRAY_STEPS,
  grayAlphaRamp,
  grayRamp,
  hexToOklch,
  oklchToHex,
  REFERENCE_RAMPS,
  relativeLuminance,
  SPINE,
  STEPS,
  toCss,
  warmth,
  type Oklch,
  type NeutralStop,
  type Ramp,
  type RampPair,
  type Theme,
} from "@/lib/color-ramp"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const THEMES: Theme[] = ["light", "dark"]
const PRESETS = Object.keys(REFERENCE_RAMPS)

const f1 = (n: number) => n.toFixed(1)
const f2 = (n: number) => n.toFixed(2)
const chromaLabel = (n: number) => n.toFixed(3).replace(/^0/, "")
const signed = (n: number) => `${n >= 0 ? "+" : ""}${n.toFixed(1)}`

/** Ink that stays legible on a swatch of the given lightness. */
const inkFor = (L: number) => (L > 62 ? "oklch(0.205 0 0)" : "oklch(0.985 0 0)")

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string
  htmlFor?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={htmlFor} className="text-label-12 text-gray-900">
        {label}
      </Label>
      {children}
    </div>
  )
}

function RampRow({ ramp, theme }: { ramp: Ramp; theme: Theme }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-baseline gap-2">
        <h3 className="text-label-14 font-medium text-gray-1000 capitalize">
          {theme}
        </h3>
        <span className="text-label-12-mono text-gray-900">
          on background-100 — oklch({theme === "light" ? "1" : "0"} 0 0)
        </span>
      </div>
      <div className="grid min-w-[60rem] grid-cols-10 gap-2">
        {STEPS.map((step) => {
          const stop = ramp[step]
          const offSpine = Math.abs(stop.deltaSpine) > 8
          return (
            <div key={step} className="flex flex-col">
              <div
                className="relative h-16 rounded-t-md"
                style={{
                  backgroundColor: stop.hex,
                  boxShadow: "var(--ds-shadow-border-inset)",
                }}
              >
                <span
                  className="absolute bottom-1.5 left-2 text-label-12-mono"
                  style={{ color: inkFor(stop.L) }}
                >
                  {step}
                </span>
              </div>
              <dl className="grid grid-cols-[auto_1fr] gap-x-2 rounded-b-md border border-t-0 bg-background-200 px-2 py-1.5 text-label-12-mono">
                <dt className="text-gray-800">L</dt>
                <dd className="text-right text-gray-1000">{f1(stop.L)}%</dd>
                <dt className="text-gray-800">C</dt>
                <dd className="text-right text-gray-1000">
                  {chromaLabel(stop.C)}
                </dd>
                <dt className="text-gray-800">H</dt>
                <dd className="text-right text-gray-1000">
                  {Math.round(stop.H)}°
                </dd>
                <dt className="text-gray-800">CR</dt>
                <dd className="text-right text-gray-1000">
                  {f2(stop.contrast)}
                </dd>
                <dt className="text-gray-800">Δ</dt>
                <dd
                  className={cn(
                    "text-right",
                    offSpine ? "text-amber-900" : "text-gray-1000"
                  )}
                >
                  {signed(stop.deltaSpine)}
                </dd>
              </dl>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function NeutralRow({
  label,
  token,
  stops,
  theme,
}: {
  label: string
  token: string
  stops: NeutralStop[]
  theme: Theme
}) {
  const surface = theme === "light" ? "#FFFFFF" : "#000000"
  const byStep = new Map(stops.map((stop) => [stop.step, stop]))
  const isAlpha = stops[0]?.alpha !== undefined

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-baseline gap-2">
        <h4 className="text-label-13 font-medium text-gray-1000">{label}</h4>
        <span className="text-label-12-mono text-gray-900">{token}</span>
      </div>
      <div className="grid min-w-[62rem] grid-cols-11 gap-2">
        {GRAY_STEPS.map((step) => {
          const stop = byStep.get(step)
          if (!stop) {
            // gray-alpha has no 950; keep the column so steps stay aligned.
            return (
              <div
                key={step}
                className="rounded-md border border-dashed"
                aria-hidden
              />
            )
          }
          const drifts =
            stop.deltaGray !== undefined && Math.abs(stop.deltaGray) > 4
          // Light descends 100 -> 1000 and dark ascends; a rung against that
          // direction is a real break in the ramp, not rounding.
          const reverses =
            stop.deltaStep !== undefined &&
            (theme === "light" ? stop.deltaStep > 0 : stop.deltaStep < 0)
          return (
            <div key={step} className="flex flex-col">
              <div
                className="h-14 rounded-t-md"
                style={{ backgroundColor: surface }}
              >
                <div
                  className="relative h-full rounded-t-md"
                  style={{
                    backgroundColor: isAlpha
                      ? `color-mix(in srgb, ${theme === "light" ? "#000" : "#FFF"} ${(stop.alpha ?? 0) * 100}%, transparent)`
                      : stop.hex,
                    boxShadow: "var(--ds-shadow-border-inset)",
                  }}
                >
                  <span
                    className="absolute bottom-1.5 left-2 text-label-12-mono"
                    style={{ color: inkFor(stop.L) }}
                  >
                    {step}
                  </span>
                </div>
              </div>
              <dl className="grid grid-cols-[auto_1fr] gap-x-2 rounded-b-md border border-t-0 bg-background-200 px-2 py-1.5 text-label-12-mono">
                {isAlpha ? (
                  <>
                    <dt className="text-gray-800">A</dt>
                    <dd className="text-right text-gray-1000">
                      {(stop.alpha ?? 0).toFixed(3).replace(/^0/, "")}
                    </dd>
                  </>
                ) : null}
                <dt className="text-gray-800">L</dt>
                <dd className="text-right text-gray-1000">{f1(stop.L)}%</dd>
                <dt className="text-gray-800">C</dt>
                <dd className="text-right text-gray-1000">.000</dd>
                <dt className="text-gray-800">H</dt>
                <dd className="text-right text-gray-1000">0°</dd>
                <dt className="text-gray-800">CR</dt>
                <dd className="text-right text-gray-1000">
                  {f2(stop.contrast)}
                </dd>
                {stop.deltaStep !== undefined ? (
                  <>
                    <dt className="text-gray-800">Rung</dt>
                    <dd
                      className={cn(
                        "text-right",
                        reverses ? "text-amber-900" : "text-gray-1000"
                      )}
                    >
                      {signed(stop.deltaStep)}
                    </dd>
                  </>
                ) : null}
                {stop.deltaGray !== undefined ? (
                  <>
                    <dt className="text-gray-800">Δ</dt>
                    <dd
                      className={cn(
                        "text-right",
                        drifts ? "text-amber-900" : "text-gray-1000"
                      )}
                    >
                      {signed(stop.deltaGray)}
                    </dd>
                  </>
                ) : null}
              </dl>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function SpineChart({
  ramp,
  theme,
  reference,
}: {
  ramp: Ramp
  theme: Theme
  reference?: readonly (readonly [number, number, number])[]
}) {
  const W = 360
  const H = 190
  const PAD = { left: 30, right: 10, top: 12, bottom: 26 }
  const x = (i: number) =>
    PAD.left + (i * (W - PAD.left - PAD.right)) / (STEPS.length - 1)
  const y = (v: number) =>
    PAD.top + ((100 - v) * (H - PAD.top - PAD.bottom)) / 100
  const spine = SPINE[theme]

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width="100%"
      role="img"
      aria-label={`Generated ${theme} lightness curve against the gray spine`}
    >
      {[0, 25, 50, 75, 100].map((v) => (
        <g key={v}>
          <line
            x1={PAD.left}
            y1={y(v)}
            x2={W - PAD.right}
            y2={y(v)}
            stroke="var(--ds-gray-400)"
            strokeWidth={1}
          />
          <text
            x={PAD.left - 6}
            y={y(v) + 3.5}
            textAnchor="end"
            fontSize={9}
            fill="var(--ds-gray-900)"
            className="font-mono"
          >
            {v}
          </text>
        </g>
      ))}
      {STEPS.map((step, i) =>
        i % 2 === 0 || i === STEPS.length - 1 ? (
          <text
            key={step}
            x={x(i)}
            y={H - 8}
            textAnchor="middle"
            fontSize={9}
            fill="var(--ds-gray-900)"
            className="font-mono"
          >
            {step}
          </text>
        ) : null
      )}
      <polyline
        fill="none"
        stroke="var(--ds-gray-700)"
        strokeWidth={1.5}
        strokeDasharray="3 3"
        points={STEPS.map((step, i) => `${x(i)},${y(spine[step])}`).join(" ")}
      />
      {reference ? (
        <polyline
          fill="none"
          stroke="var(--ds-gray-800)"
          strokeWidth={1.25}
          strokeDasharray="1 3"
          strokeLinecap="round"
          points={reference.map((r, i) => `${x(i)},${y(r[0])}`).join(" ")}
        />
      ) : null}
      <polyline
        fill="none"
        stroke="var(--ds-gray-1000)"
        strokeWidth={1.75}
        strokeLinejoin="round"
        points={STEPS.map((step, i) => `${x(i)},${y(ramp[step].L)}`).join(" ")}
      />
      {STEPS.map((step, i) => (
        <circle
          key={step}
          cx={x(i)}
          cy={y(ramp[step].L)}
          r={4.5}
          fill={ramp[step].hex}
          stroke="var(--ds-gray-1000)"
          strokeWidth={1.25}
        />
      ))}
    </svg>
  )
}

type Severity = "ok" | "warn" | "bad"
type Finding = { tag: string; severity: Severity; body: string }

/* Findings copy lives in template literals so every space sits inside a
 * string: JSX collapses whitespace across element boundaries, and Prettier
 * rewrites {" "} back to a literal space, so inline <span>s lose the gaps. */
const PROSE_TOKEN = /(\{[^}]*\}|\*[^*]*\*|`[^`]*`)/g

/** `{value}` renders mono, `*term*` renders bold, `` `code` `` renders code. */
function Prose({ text }: { text: string }) {
  return (
    <>
      {text.split(PROSE_TOKEN).map((part, i) => {
        const inner = part.slice(1, -1)
        if (part.startsWith("{") && part.endsWith("}"))
          return (
            <span key={i} className="text-label-13-mono text-gray-1000">
              {inner}
            </span>
          )
        if (part.startsWith("*") && part.endsWith("*") && part.length > 1)
          return (
            <strong key={i} className="font-medium text-gray-1000">
              {inner}
            </strong>
          )
        if (part.startsWith("`") && part.endsWith("`"))
          return (
            <code key={i} className="text-label-13-mono text-gray-1000">
              {inner}
            </code>
          )
        return part
      })}
    </>
  )
}

function useFindings(pair: RampPair, anchor: Oklch): Finding[] {
  return React.useMemo(() => {
    const light = pair.light
    const anchorStop = light[700]
    const cusp = gamutCusp(anchor.H)
    const anchorLum = relativeLuminance(
      anchorStop.L / 100,
      anchorStop.C,
      anchorStop.H
    )
    const whiteOn700 = contrastRatio(anchorLum, 1)
    const blackOn700 = contrastRatio(anchorLum, 0)
    const delta = anchorStop.L - SPINE.light[700]
    const w = warmth(anchor.H)
    const tintSpread = Math.max(
      ...([100, 200, 300, 400] as const).map((s) =>
        Math.abs(light[s].deltaSpine)
      )
    )
    const textLight = light[900].contrast
    const textDark = pair.dark[900].contrast

    const spine: Finding =
      Math.abs(delta) <= 3
        ? {
            tag: "Spine",
            severity: "ok",
            body: `Your 700 sits {${signed(delta)} L points} from the gray spine — well inside the band green, teal, red and pink occupy. This hue will not fight the system.`,
          }
        : delta > 0
          ? {
              tag: "Spine",
              severity: "warn",
              body: `Your 700 sits {${f1(delta)} points above} the spine’s 65.0%. That is the amber pattern: the hue can only hold chroma up here, so the ramp runs light. Expect contrast trouble at 700/800.`,
            }
          : {
              tag: "Spine",
              severity: "warn",
              body: `Your 700 sits {${f1(Math.abs(delta))} points below} the spine’s 65.0%. That is the purple/blue pattern — fine, but 600 and 500 have a long way to climb, so check the mid-ramp reads as a tint and not a second brand color.`,
            }

    const onColor: Finding =
      whiteOn700 >= 4.5
        ? {
            tag: "On 700",
            severity: "ok",
            body: `White text on 700 is {${f2(whiteOn700)}:1}. Pair the solid fill with \`--ds-gray-100\` and move on.`,
          }
        : blackOn700 >= 4.5
          ? {
              tag: "On 700",
              severity: "warn",
              body: `White text on 700 is only {${f2(whiteOn700)}:1} — it fails. Dark text reaches {${f2(blackOn700)}:1}, so this hue needs \`--ds-gray-1000\` as its on-color, the way amber does.`,
            }
          : {
              tag: "On 700",
              severity: "bad",
              body: `Neither white ({${f2(whiteOn700)}:1}) nor near-black ({${f2(blackOn700)}:1}) clears 4.5:1 on this fill. Darken the anchor or drop chroma before using it as a solid button.`,
            }

    return [
      spine,
      {
        tag: "Gamut",
        severity: "ok",
        body: `This hue’s sRGB cusp is at {L ${f1(cusp.L * 100)}%, C ${chromaLabel(cusp.C)}} — the lightness where it carries the most chroma. Your anchor is at L ${f1(anchorStop.L)}%, C ${chromaLabel(anchorStop.C)}.`,
      },
      onColor,
      textLight >= 4.5 && textDark >= 4.5
        ? {
            tag: "Text",
            severity: "ok",
            body: `Step 900 reads {${f2(textLight)}:1 light} and {${f2(textDark)}:1 dark}. Safe as body text on the matching surface.`,
          }
        : {
            tag: "Text",
            severity: "bad",
            body: `Step 900 only reaches {${f2(textLight)}:1 light} / {${f2(textDark)}:1 dark}. The solver hit the gamut wall — this hue cannot get dark enough at this chroma. Reduce C on 900 or accept it as a large-text-only color.`,
          },
      w > 0.25
        ? {
            tag: "Hue drift",
            severity: "warn",
            body: `This sits in the yellow–orange band (warmth {${f2(w)}}), so the generator rotates it {${Math.round(40 * w)}° warm} across the ramp. Without that, the dark steps read as olive rather than a darker version of your color.`,
          }
        : {
            tag: "Hue drift",
            severity: "ok",
            body: `Outside the yellow–orange band, so hue holds within {${Math.round(40 * w)}°} end to end — no Abney compensation needed.`,
          },
      {
        tag: "Tints",
        severity: "ok",
        body: `Steps 100–400 land within {${f1(tintSpread)} L points} of the spine in light. Under ~3 means they will sit beside the other hues’ tints without one looking heavier.`,
      },
    ]
  }, [pair, anchor])
}

const SEVERITY_CLASS: Record<Severity, string> = {
  ok: "text-gray-900",
  warn: "text-amber-900",
  bad: "text-red-900",
}

function UsePreview({
  ramp,
  theme,
  name,
}: {
  ramp: Ramp
  theme: Theme
  name: string
}) {
  const isLight = theme === "light"
  const anchorLum = relativeLuminance(
    ramp[700].L / 100,
    ramp[700].C,
    ramp[700].H
  )
  const on700 = contrastRatio(anchorLum, 1) >= 4.5 ? "#FFFFFF" : "#0A0A0A"
  const ink = isLight ? "oklch(0.205 0 0)" : "oklch(0.946 0 0)"
  const inkMuted = isLight ? "oklch(0.42 0 0)" : "oklch(0.706 0 0)"

  return (
    <div
      className="flex flex-col gap-4 rounded-lg border p-5"
      style={{
        backgroundColor: isLight ? "#FFFFFF" : "#000000",
        borderColor: ramp[400].hex,
        color: ink,
      }}
    >
      <span
        className="text-label-12-mono uppercase"
        style={{ color: inkMuted }}
      >
        {theme} · {name}
      </span>
      <div className="flex flex-wrap items-center gap-2.5">
        <span
          className="inline-flex h-9 items-center rounded-md px-3.5 text-button-14"
          style={{ backgroundColor: ramp[700].hex, color: on700 }}
        >
          Deploy
        </span>
        <span
          className="inline-flex h-9 items-center rounded-md px-3.5 text-button-14"
          style={{ backgroundColor: ramp[200].hex, color: ramp[900].hex }}
        >
          Preview
        </span>
        <span
          className="inline-flex items-center rounded-full px-2.5 py-0.5 text-label-12"
          style={{
            backgroundColor: ramp[100].hex,
            color: ramp[900].hex,
            boxShadow: `inset 0 0 0 1px ${ramp[400].hex}`,
          }}
        >
          Ready
        </span>
      </div>
      <div
        className="flex flex-col gap-0.5 rounded-md p-3"
        style={{
          backgroundColor: ramp[100].hex,
          boxShadow: `inset 0 0 0 1px ${ramp[400].hex}`,
        }}
      >
        <strong
          className="text-label-13 font-medium"
          style={{ color: ramp[1000].hex }}
        >
          Build finished in 34s
        </strong>
        <span className="text-copy-13" style={{ color: ramp[900].hex }}>
          Output written to <code>packages/theme/dist</code>.
        </span>
      </div>
      <p className="text-copy-13" style={{ color: inkMuted }}>
        Body copy on the surface, with{" "}
        <span
          className="underline underline-offset-2"
          style={{ color: ramp[900].hex }}
        >
          an inline link
        </span>{" "}
        painted in step 900 and a hairline divider in 400.
      </p>
      <div className="h-px" style={{ backgroundColor: ramp[400].hex }} />
    </div>
  )
}

export function RampGenerator() {
  const [hex, setHex] = React.useState("#7C3AED")
  const [name, setName] = React.useState("violet")
  const [preset, setPreset] = React.useState<string | null>(null)
  const [copied, setCopied] = React.useState(false)

  const anchor = React.useMemo(
    () => hexToOklch(hex) ?? hexToOklch("#7C3AED")!,
    [hex]
  )
  const pair = React.useMemo(() => buildRamp(anchor), [anchor])
  const findings = useFindings(pair, anchor)
  const css = React.useMemo(() => toCss(pair, name), [pair, name])
  const reference = preset ? REFERENCE_RAMPS[preset] : undefined

  const applyPreset = (key: string) => {
    const [L, C, H] = REFERENCE_RAMPS[key].light[6] // step 700
    setHex(oklchToHex(L / 100, C, H))
    setName(key)
    setPreset(key)
  }

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(css)
    } catch {
      return
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 1400)
  }

  return (
    <div className="flex flex-col gap-10">
      <section className="flex flex-col gap-3">
        <div className="flex flex-wrap items-end gap-5 rounded-lg border bg-background-200 p-4">
          <Field label="Color" htmlFor="ramp-picker">
            <input
              id="ramp-picker"
              type="color"
              value={hex}
              onChange={(e) => {
                setHex(e.target.value.toUpperCase())
                setPreset(null)
              }}
              className="h-9 w-13 cursor-pointer rounded-md border border-gray-alpha-400 bg-background-100 p-0.5"
            />
          </Field>
          <Field label="Hex" htmlFor="ramp-hex">
            <Input
              id="ramp-hex"
              value={hex}
              spellCheck={false}
              autoComplete="off"
              aria-invalid={hexToOklch(hex) === null}
              onChange={(e) => {
                const next = e.target.value
                setHex(next.startsWith("#") ? next : `#${next}`)
                setPreset(null)
              }}
              className="w-32 font-mono"
            />
          </Field>
          <Field label="Token name" htmlFor="ramp-name">
            <Input
              id="ramp-name"
              value={name}
              spellCheck={false}
              autoComplete="off"
              onChange={(e) => setName(e.target.value)}
              className="w-36 font-mono"
            />
          </Field>
          <div className="flex flex-col gap-1.5">
            <span className="text-label-12 text-gray-900">
              Anchor — step 700
            </span>
            <p className="text-label-13-mono text-gray-1000">
              L {f1(anchor.L * 100)}%&nbsp;&nbsp;C {chromaLabel(anchor.C)}
              &nbsp;&nbsp;H {Math.round(anchor.H)}°
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="mr-1 text-label-12 text-gray-900">
            Load an existing ramp
          </span>
          {PRESETS.map((key) => {
            const [L, C, H] = REFERENCE_RAMPS[key].light[6]
            return (
              <Button
                key={key}
                variant="outline"
                size="xs"
                aria-pressed={preset === key}
                onClick={() => applyPreset(key)}
                className="rounded-full capitalize aria-pressed:border-gray-600 aria-pressed:bg-gray-100"
              >
                <span
                  aria-hidden
                  className="size-2.5 rounded-full"
                  style={{
                    backgroundColor: oklchToHex(L / 100, C, H),
                    boxShadow: "var(--ds-shadow-border-inset)",
                  }}
                />
                {key}
              </Button>
            )
          })}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-label-12 tracking-wider text-gray-900 uppercase">
          The ramp
        </h2>
        <div className="flex flex-col gap-5 overflow-x-auto pb-1">
          {THEMES.map((theme) => (
            <RampRow key={theme} ramp={pair[theme]} theme={theme} />
          ))}
        </div>
        <p className="max-w-prose text-copy-13 text-gray-900">
          <Prose
            text={
              "*CR* is WCAG contrast against that theme’s background. " +
              "*Δ* is lightness deviation from the gray spine at the same step, " +
              "in L points — the number that tells you whether this hue is " +
              "behaving or fighting the gamut."
            }
          />
        </p>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-label-12 tracking-wider text-gray-900 uppercase">
          Neutrals
        </h2>
        <div className="flex flex-col gap-6 overflow-x-auto pb-1">
          {THEMES.map((theme) => (
            <div key={theme} className="flex flex-col gap-3">
              <h3 className="text-label-14 font-medium text-gray-1000 capitalize">
                {theme}
              </h3>
              <NeutralRow
                label="Gray"
                token="--ds-gray-*"
                stops={grayRamp(theme)}
                theme={theme}
              />
              <NeutralRow
                label="Gray alpha"
                token="--ds-gray-alpha-*"
                stops={grayAlphaRamp(theme)}
                theme={theme}
              />
            </div>
          ))}
        </div>
        <p className="max-w-prose text-copy-13 text-gray-900">
          <Prose
            text={
              "Gray is the spine every hue ramp above is measured against, so it " +
              "is fixed — it does not respond to the anchor. It carries a *950* " +
              "step the hue ramps do not, and *C .000 / H 0°* on every step: the " +
              "neutrals are truly achromatic, not tinted toward a hue. *Rung* is " +
              "the lightness change from the previous step, since gray's own " +
              "deviation from the spine is zero by construction — a highlighted " +
              "rung runs against the ramp's direction. Gray alpha is the same " +
              "ladder in opacity rather than lightness, for anything that sits " +
              "over content; *L* and *CR* are what it flattens to over " +
              "background-100, and *Δ* is how far that lands from the solid " +
              "gray at the same step."
            }
          />
        </p>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-label-12 tracking-wider text-gray-900 uppercase">
          Lightness against the spine
        </h2>
        <div className="grid gap-5 sm:grid-cols-2">
          {THEMES.map((theme) => (
            <div
              key={theme}
              className="flex flex-col gap-1 rounded-lg border bg-background-200 p-4"
            >
              <h3 className="text-label-13 font-medium text-gray-1000 capitalize">
                {theme}
              </h3>
              <p className="text-label-12 text-gray-900">
                Generated ramp vs <code>--ds-gray-*</code>
              </p>
              <SpineChart
                ramp={pair[theme]}
                theme={theme}
                reference={reference?.[theme]}
              />
              <div className="flex flex-wrap gap-3 text-label-12 text-gray-900">
                <span>— generated</span>
                <span>--- gray spine</span>
                {reference ? <span>··· {preset} actual</span> : null}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-label-12 tracking-wider text-gray-900 uppercase">
          Findings
        </h2>
        <div className="divide-y rounded-lg border">
          {findings.map((finding) => (
            <div
              key={finding.tag}
              className="grid grid-cols-[4.5rem_1fr] items-baseline gap-3 px-3.5 py-2.5"
            >
              <span
                className={cn(
                  "text-label-12-mono tracking-wider uppercase",
                  SEVERITY_CLASS[finding.severity]
                )}
              >
                {finding.tag}
              </span>
              <p className="text-copy-13 text-gray-1000">
                <Prose text={finding.body} />
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-label-12 tracking-wider text-gray-900 uppercase">
          In use
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {THEMES.map((theme) => (
            <UsePreview
              key={theme}
              ramp={pair[theme]}
              theme={theme}
              name={name || "custom"}
            />
          ))}
        </div>
        <p className="max-w-prose text-copy-13 text-gray-900">
          Sample components, not live app data. The solid button pairs 700 with
          whichever on-color actually passes — that pairing is the first thing
          to break on warm hues.
        </p>
      </section>

      <section className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-label-12 tracking-wider text-gray-900 uppercase">
            Tokens
          </h2>
          <Button variant="outline" size="sm" onClick={copy}>
            {copied ? "Copied" : "Copy CSS"}
          </Button>
        </div>
        <pre className="overflow-x-auto rounded-lg border bg-background-200 p-4 text-copy-13-mono text-gray-1000">
          {css}
        </pre>
      </section>
    </div>
  )
}
