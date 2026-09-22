/* OKLCH ramp generation for the ziiz spine.
 *
 * The model is measured from the seven ramps in packages/theme/theme.css:
 *   - steps 100-600 follow the gray spine plus a per-step offset
 *   - steps 700-800 are pinned to the anchor, identical L and H in both themes
 *   - steps 900-1000 are solved for contrast, not lightness
 * Hue rotates only inside the yellow-orange band, where a darkened hue reads
 * as olive unless it is pushed toward red (the Abney effect). */

export const STEPS = [
  100, 200, 300, 400, 500, 600, 700, 800, 900, 1000,
] as const

export type Step = (typeof STEPS)[number]
export type Theme = "light" | "dark"

export interface Oklch {
  L: number // 0-1
  C: number
  H: number // degrees
}

export interface RampStop {
  step: Step
  L: number // 0-100, to match the token syntax
  C: number
  H: number
  hex: string
  contrast: number // WCAG, against that theme's background-100
  deltaSpine: number // lightness points away from gray at the same step
}

export type Ramp = Record<Step, RampStop>
export type RampPair = Record<Theme, Ramp>

/* ---------- sRGB <-> OKLab ---------- */

const srgbToLinear = (c: number) =>
  c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)

const linearToSrgb = (c: number) =>
  c <= 0.0031308 ? c * 12.92 : 1.055 * Math.pow(c, 1 / 2.4) - 0.055

const toRad = (d: number) => (d * Math.PI) / 180
const toDeg = (r: number) => (r * 180) / Math.PI
const clamp01 = (n: number) => Math.min(1, Math.max(0, n))

function linearRgbToOklab(r: number, g: number, b: number) {
  const l = 0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b
  const m = 0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b
  const s = 0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b
  const l_ = Math.cbrt(l)
  const m_ = Math.cbrt(m)
  const s_ = Math.cbrt(s)
  return {
    L: 0.2104542553 * l_ + 0.793617785 * m_ - 0.0040720468 * s_,
    a: 1.9779984951 * l_ - 2.428592205 * m_ + 0.4505937099 * s_,
    b: 0.0259040371 * l_ + 0.7827717662 * m_ - 0.808675766 * s_,
  }
}

function oklabToLinearRgb(L: number, a: number, b: number) {
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b
  const s_ = L - 0.0894841775 * a - 1.291485548 * b
  const l = l_ * l_ * l_
  const m = m_ * m_ * m_
  const s = s_ * s_ * s_
  return [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ] as const
}

const oklchToLinearRgb = (L: number, C: number, H: number) =>
  oklabToLinearRgb(L, C * Math.cos(toRad(H)), C * Math.sin(toRad(H)))

/* ---------- gamut ---------- */

function inGamut(L: number, C: number, H: number) {
  const e = 1e-4
  return oklchToLinearRgb(L, C, H).every((x) => x >= -e && x <= 1 + e)
}

/** Largest chroma at this lightness and hue that still fits in sRGB. */
export function fitChroma(L: number, C: number, H: number) {
  if (C <= 0) return 0
  if (inGamut(L, C, H)) return C
  let lo = 0
  let hi = C
  for (let i = 0; i < 28; i++) {
    const mid = (lo + hi) / 2
    if (inGamut(L, mid, H)) lo = mid
    else hi = mid
  }
  return lo
}

export function oklchToHex(L: number, C: number, H: number) {
  const rgb = oklchToLinearRgb(L, fitChroma(L, C, H), H)
  return `#${rgb
    .map((x) =>
      Math.round(clamp01(linearToSrgb(clamp01(x))) * 255)
        .toString(16)
        .padStart(2, "0")
    )
    .join("")
    .toUpperCase()}`
}

export function hexToOklch(hex: string): Oklch | null {
  const raw = hex.replace("#", "").trim()
  const full =
    raw.length === 3
      ? raw
          .split("")
          .map((c) => c + c)
          .join("")
      : raw
  if (!/^[0-9a-fA-F]{6}$/.test(full)) return null
  const [r, g, b] = [0, 2, 4].map((i) =>
    srgbToLinear(parseInt(full.slice(i, i + 2), 16) / 255)
  )
  const lab = linearRgbToOklab(r, g, b)
  let H = toDeg(Math.atan2(lab.b, lab.a))
  if (H < 0) H += 360
  return { L: lab.L, C: Math.hypot(lab.a, lab.b), H }
}

/* ---------- contrast ---------- */

/** WCAG relative luminance of an OKLCH color. */
export function relativeLuminance(L: number, C: number, H: number) {
  const [r, g, b] = oklchToLinearRgb(L, fitChroma(L, C, H), H).map(clamp01)
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

export function contrastRatio(a: number, b: number) {
  const hi = Math.max(a, b)
  const lo = Math.min(a, b)
  return (hi + 0.05) / (lo + 0.05)
}

/** Lightness that lands a hue on a target luminance; luminance is monotonic in L. */
function solveLightness(targetLum: number, C: number, H: number) {
  let lo = 0
  let hi = 1
  for (let i = 0; i < 30; i++) {
    const mid = (lo + hi) / 2
    if (relativeLuminance(mid, C, H) < targetLum) lo = mid
    else hi = mid
  }
  return (lo + hi) / 2
}

/* ---------- the existing ramps, verbatim from theme.css ---------- */

type Triplet = readonly [number, number, number]

export const REFERENCE_RAMPS: Record<
  string,
  Record<Theme, readonly Triplet[]>
> = {
  blue: {
    light: [
      [97.32, 0.0141, 251.56],
      [96.29, 0.0195, 250.59],
      [94.58, 0.0293, 249.85],
      [91.58, 0.0473, 245.12],
      [82.75, 0.0979, 248.48],
      [73.08, 0.1583, 248.13],
      [57.61, 0.2508, 258.23],
      [51.51, 0.2399, 257.85],
      [53.18, 0.2399, 256.99],
      [26.67, 0.1099, 254.34],
    ],
    dark: [
      [22.17, 0.069, 259.89],
      [25.45, 0.0811, 255.8],
      [30.86, 0.1022, 255.21],
      [34.1, 0.121, 254.74],
      [38.5, 0.1403, 254.4],
      [64.94, 0.1982, 251.81],
      [57.61, 0.2321, 258.23],
      [51.51, 0.2307, 257.85],
      [71.7, 0.1648, 250.79],
      [96.75, 0.0179, 242.42],
    ],
  },
  red: {
    light: [
      [96.5, 0.0223, 13.09],
      [95.41, 0.0299, 14.25],
      [94.33, 0.0369, 15.01],
      [91.51, 0.0471, 19.8],
      [84.47, 0.1018, 17.71],
      [71.12, 0.1881, 21.22],
      [62.56, 0.2524, 23.03],
      [58.19, 0.2482, 25.15],
      [54.99, 0.232, 25.29],
      [24.8, 0.1041, 18.86],
    ],
    dark: [
      [22.1, 0.0657, 15.11],
      [25.93, 0.0834, 19.02],
      [31.47, 0.1105, 20.96],
      [35.27, 0.1273, 21.23],
      [40.68, 0.1479, 23.16],
      [62.56, 0.2277, 23.03],
      [62.56, 0.2234, 23.03],
      [58.01, 0.227, 25.12],
      [69.96, 0.2136, 22.03],
      [95.6, 0.0293, 6.61],
    ],
  },
  amber: {
    light: [
      [97.48, 0.0331, 85.79],
      [96.81, 0.0495, 90.24],
      [95.93, 0.0636, 90.52],
      [91.02, 0.1322, 88.25],
      [86.55, 0.1583, 79.63],
      [80.25, 0.1953, 73.59],
      [81.87, 0.1969, 76.46],
      [77.21, 0.1991, 64.28],
      [52.79, 0.1496, 54.65],
      [30.83, 0.099, 45.48],
    ],
    dark: [
      [22.46, 0.0538, 76.04],
      [24.95, 0.0642, 64.78],
      [32.34, 0.0837, 63.83],
      [35.53, 0.0903, 66.3],
      [41.55, 0.1044, 67.98],
      [75.04, 0.1737, 74.49],
      [81.87, 0.1969, 76.46],
      [77.21, 0.1991, 64.28],
      [77.21, 0.1991, 64.28],
      [96.7, 0.0418, 84.59],
    ],
  },
  green: {
    light: [
      [97.59, 0.0289, 145.42],
      [96.92, 0.037, 147.15],
      [94.6, 0.0674, 144.23],
      [91.49, 0.0976, 146.24],
      [85.45, 0.1627, 146.3],
      [80.25, 0.214, 145.18],
      [64.58, 0.1746, 147.27],
      [57.81, 0.1507, 147.5],
      [51.75, 0.1453, 147.65],
      [29.15, 0.1197, 147.38],
    ],
    dark: [
      [23.09, 0.0716, 149.68],
      [27.12, 0.0895, 150.09],
      [29.84, 0.096, 149.25],
      [34.39, 0.1039, 147.78],
      [44.19, 0.1484, 147.2],
      [58.11, 0.1815, 146.55],
      [64.58, 0.199, 147.27],
      [57.81, 0.1776, 147.5],
      [73.1, 0.2158, 148.29],
      [96.76, 0.056, 154.18],
    ],
  },
  teal: {
    light: [
      [97.72, 0.0359, 186.7],
      [97.06, 0.0347, 180.66],
      [94.92, 0.0478, 182.07],
      [92.76, 0.0718, 183.78],
      [86.88, 0.1344, 182.42],
      [81.5, 0.161, 178.96],
      [64.92, 0.1572, 181.95],
      [57.53, 0.1392, 181.66],
      [52.08, 0.1251, 182.93],
      [32.11, 0.0788, 179.82],
    ],
    dark: [
      [22.1, 0.0544, 178.74],
      [25.06, 0.062, 178.76],
      [31.5, 0.0767, 180.99],
      [32.43, 0.0763, 180.13],
      [43.35, 0.1055, 180.97],
      [60.71, 0.1485, 180.24],
      [64.92, 0.1403, 181.95],
      [57.53, 0.1392, 181.66],
      [74.56, 0.1765, 182.8],
      [96.46, 0.056, 180.29],
    ],
  },
  purple: {
    light: [
      [96.65, 0.0244, 312.19],
      [96.73, 0.0228, 309.8],
      [94.85, 0.0364, 310.15],
      [91.77, 0.0614, 312.82],
      [81.26, 0.1409, 310.8],
      [72.07, 0.2083, 308.19],
      [55.5, 0.3008, 306.12],
      [48.58, 0.2638, 305.73],
      [47.18, 0.2579, 304],
      [23.96, 0.13, 305.66],
    ],
    dark: [
      [22.34, 0.0779, 316.87],
      [25.91, 0.0921, 314.41],
      [31.98, 0.1219, 312.41],
      [35.93, 0.1504, 309.78],
      [40.99, 0.1721, 307.92],
      [55.5, 0.2191, 306.12],
      [55.5, 0.2186, 306.12],
      [48.58, 0.2102, 305.73],
      [69.87, 0.2037, 309.51],
      [96.1, 0.0304, 316.46],
    ],
  },
  pink: {
    light: [
      [95.69, 0.0359, 344.62],
      [95.71, 0.0321, 353.14],
      [93.83, 0.0451, 356.29],
      [91.12, 0.0573, 358.82],
      [84.28, 0.0915, 356.99],
      [74.33, 0.1547, 0.24],
      [63.52, 0.238, 1.01],
      [59.51, 0.2339, 4.21],
      [53.5, 0.2058, 2.84],
      [26, 0.0977, 359],
    ],
    dark: [
      [22.67, 0.0628, 354.73],
      [26.2, 0.0859, 356.68],
      [31.15, 0.1067, 355.93],
      [32.13, 0.1174, 356.71],
      [37.01, 0.1453, 358.39],
      [50.33, 0.2089, 4.33],
      [63.52, 0.2346, 1.01],
      [59.51, 0.2429, 4.21],
      [69.36, 0.2223, 3.91],
      [95.74, 0.0326, 350.08],
    ],
  },
}

/* ---------- the neutrals ---------- */

/** Gray carries an extra 950 step that the hue ramps and gray-alpha do not. */
export const GRAY_STEPS = [
  100, 200, 300, 400, 500, 600, 700, 800, 900, 950, 1000,
] as const

export type GrayStep = (typeof GRAY_STEPS)[number]

/** --ds-gray-* lightness, verbatim from theme.css. */
export const GRAY: Record<Theme, Record<GrayStep, number>> = {
  light: {
    100: 96.1,
    200: 94.0,
    300: 92.5,
    400: 93.7,
    500: 83.6,
    600: 73.2,
    700: 65.0,
    800: 59.0,
    900: 42.0,
    950: 30.0,
    1000: 0,
  },
  dark: {
    100: 21.8,
    200: 23.9,
    300: 28.1,
    400: 30.1,
    500: 39.0,
    600: 62.3,
    700: 65.0,
    800: 59.0,
    900: 70.6,
    950: 85.0,
    1000: 100,
  },
}

/** --ds-gray-alpha-* opacity: black ink in light, white ink in dark. */
export const GRAY_ALPHA: Record<Theme, Record<Step, number>> = {
  light: {
    100: 0.05,
    200: 0.081,
    300: 0.1,
    400: 0.08,
    500: 0.21,
    600: 0.24,
    700: 0.44,
    800: 0.51,
    900: 0.7,
    1000: 1,
  },
  dark: {
    100: 0.07,
    200: 0.09,
    300: 0.13,
    400: 0.14,
    500: 0.24,
    600: 0.51,
    700: 0.54,
    800: 0.47,
    900: 0.61,
    1000: 1,
  },
}

/* ---------- the brand anchors ----------
 * THIS IS THE TABLE YOU EDIT.
 *
 * Everything else in a ramp is derived. A hue needs exactly three numbers: its
 * angle, the lightness of its solid fill (700) and of the hover state (800).
 * Both lightnesses are shared between light and dark — that is a real property
 * of the system, not a shortcut, so a button is literally the same colour in
 * both themes.
 *
 * To add a hue, add a row. To restyle the whole palette, change these numbers.
 * See color-ramp.md for how to choose them. */

export interface Anchor {
  /** OKLCH hue angle, 0-360. */
  hue: number
  /** Lightness of step 700, the solid fill. Sits at or near the hue's sRGB
   *  gamut cusp for most hues — see the doc before moving it far. */
  solid: number
  /** Lightness of step 800, the hover state. Always below `solid`. */
  hover: number
}

export const ANCHORS: Record<string, Anchor> = {
  blue: { hue: 258.23, solid: 57.61, hover: 51.51 },
  red: { hue: 23.03, solid: 62.56, hover: 58.1 },
  amber: { hue: 76.46, solid: 81.87, hover: 77.21 },
  green: { hue: 147.27, solid: 64.58, hover: 57.81 },
  teal: { hue: 181.95, solid: 64.92, hover: 57.53 },
  purple: { hue: 306.12, solid: 55.5, hover: 48.58 },
  pink: { hue: 1.01, solid: 63.52, hover: 59.51 },
}

/* ---------- palette plumbing ---------- */

export interface Swatch {
  step: number
  hex: string
  /** The value as it would be written as a token. */
  css: string
  contrast: number
  /** Alpha rows: the opacity that lands on the target. */
  alpha?: number
}

export interface PaletteRow {
  label: string
  token: string
  swatches: (Swatch | null)[]
}

export interface Palette {
  rows: PaletteRow[]
  /** Span factor: how much the contrast range compressed. 1 = unchanged. */
  k: number
}

/** The endpoints the shipped ramp uses today. Floor is the page background,
 *  ceiling is the strongest ink — so in light the floor is the LIGHTER of the
 *  two and in dark the darker. Contrast against the floor rises from 100 to
 *  1000 in both, which is the axis every model below actually works in. */
export const CURRENT_ENDPOINTS: Record<
  Theme,
  { floor: number; ceiling: number }
> = {
  light: { floor: 100, ceiling: GRAY.light[1000] },
  dark: { floor: 0, ceiling: GRAY.dark[1000] },
}

const isDarkTheme = (theme: Theme) => theme === "dark"
const neutralHexOf = (L: number) => oklchToHex(L / 100, 0, 0)
const srgbOf = (L: number) => linearToSrgb(clamp01(L / 100) ** 3)

/** Luminance a colour needs to hit a contrast against the floor. Which side of
 *  the ratio the colour sits on flips with the theme. */
function targetLuminance(target: number, floorLum: number, theme: Theme) {
  return isDarkTheme(theme)
    ? target * (floorLum + 0.05) - 0.05
    : (floorLum + 0.05) / target - 0.05
}

/** Solve lightness for a target contrast, holding chroma and hue. */
function solveForContrast(
  target: number,
  C: number,
  H: number,
  floorLum: number,
  theme: Theme
) {
  return solveLightness(clamp01(targetLuminance(target, floorLum, theme)), C, H)
}

/** Ink the alpha ramp paints with: white on a dark floor, black on a light one. */
const alphaInk = (theme: Theme) => (isDarkTheme(theme) ? 1 : 0)

/** Opacity that lands the composite on a target sRGB value. CSS composites in
 *  gamma space, so the mix is done there too. */
function alphaFor(targetSrgb: number, floorSrgb: number, theme: Theme) {
  const a = isDarkTheme(theme)
    ? (targetSrgb - floorSrgb) / (1 - floorSrgb)
    : floorSrgb === 0
      ? 0
      : 1 - targetSrgb / floorSrgb
  return clamp01(a)
}

/** The span factor.
 *
 *      k = (CR_ceiling_new - 1) / (CR_ceiling_now - 1)
 *
 *  Every step keeps its proportional position in CONTRAST space, and the range
 *  itself compresses or expands by k. Identity (k = 1) at the shipped
 *  endpoints, so nothing moves until an endpoint does. */
function spanFactor(theme: Theme, floorL: number, ceilingL: number) {
  const now = CURRENT_ENDPOINTS[theme]
  const baseLum = relativeLuminance(now.floor / 100, 0, 0)
  const floorLum = relativeLuminance(floorL / 100, 0, 0)
  const spanNow =
    contrastRatio(relativeLuminance(now.ceiling / 100, 0, 0), baseLum) - 1
  const spanNew =
    contrastRatio(relativeLuminance(ceilingL / 100, 0, 0), floorLum) - 1
  return { k: spanNew / spanNow, baseLum, floorLum }
}

/** The palette as it ships today, for the reference half of a comparison.
 *  Read straight from the token tables — nothing is derived. */
export function currentPalette(theme: Theme): Palette {
  const floorLum = relativeLuminance(CURRENT_ENDPOINTS[theme].floor / 100, 0, 0)
  const floorSrgb = srgbOf(CURRENT_ENDPOINTS[theme].floor)
  const bg200 = theme === "dark" ? 2.7 : 98.4
  const neutral = (L: number, step: number): Swatch => ({
    step,
    hex: neutralHexOf(L),
    css: `oklch(${(L / 100).toFixed(3)} 0 0)`,
    contrast: contrastRatio(relativeLuminance(L / 100, 0, 0), floorLum),
  })

  const rows: PaletteRow[] = [
    {
      label: "Background",
      token: "--ds-background-*",
      swatches: STEPS.map((step) =>
        step > 200
          ? null
          : neutral(step === 100 ? CURRENT_ENDPOINTS[theme].floor : bg200, step)
      ),
    },
    {
      label: "Gray",
      token: "--ds-gray-*",
      swatches: STEPS.map((step) =>
        neutral(GRAY[theme][step as GrayStep], step)
      ),
    },
    {
      label: "Gray Alpha",
      token: "--ds-gray-alpha-*",
      swatches: STEPS.map((step) => {
        const alpha = GRAY_ALPHA[theme][step]
        const srgb = isDarkTheme(theme)
          ? floorSrgb + alpha * (1 - floorSrgb)
          : floorSrgb * (1 - alpha)
        const lin = srgbToLinear(clamp01(srgb))
        return {
          step,
          alpha,
          hex: neutralHexOf(linearRgbToOklab(lin, lin, lin).L * 100),
          css: `oklch(${alphaInk(theme)} 0 0 / ${alpha.toFixed(3)})`,
          contrast: contrastRatio(lin, floorLum),
        }
      }),
    },
  ]

  for (const hue of Object.keys(ANCHORS)) {
    const ramp = REFERENCE_RAMPS[hue][theme]
    rows.push({
      label: hue[0].toUpperCase() + hue.slice(1),
      token: `--ds-${hue}-*`,
      swatches: STEPS.map((step, i) => {
        const [L, C, H] = ramp[i]
        return {
          step,
          hex: oklchToHex(L / 100, C, H),
          css: `oklch(${L.toFixed(2)}% ${C.toFixed(4)} ${H.toFixed(2)})`,
          contrast: contrastRatio(relativeLuminance(L / 100, C, H), floorLum),
        }
      }),
    })
  }
  return { rows, k: 1 }
}
/* ---------- the generator ----------
 * Uniform where uniformity is free, hue-native where it is not.
 *
 * Tints (100-500) and text (900-1000) share one lightness scale across every
 * hue. The anchor band does not: measured against the sRGB gamut, five of the
 * seven 700s sit within two points of their hue's cusp — the lightness at
 * which that hue can carry the most chroma, and so looks most like itself.
 * Amber's cusp is at L 81 and blue's at L 60; forcing both to one value turns
 * amber to mud. So 700 and 800 keep their anchors, tints climb from the floor
 * to the solid, and text climbs from the hover step to the ceiling. */

/** Fraction of the gamut limit each step rides. Measured from the shipped
 *  ramps, which sit at or just past the edge in both themes. Dark tapers at
 *  1000 because there the top step is a near-white tint; in light it is the
 *  darkest ink and wants full saturation. */
const UNIFORM_CHROMA: Record<Theme, Record<Step, number>> = {
  dark: {
    100: 0.9,
    200: 0.95,
    300: 1,
    400: 1,
    500: 1,
    600: 1,
    700: 1,
    800: 1,
    900: 1,
    1000: 0.3,
  },
  light: {
    100: 1,
    200: 1,
    300: 1,
    400: 1,
    500: 1,
    600: 1,
    700: 1,
    800: 1,
    900: 1,
    1000: 1,
  },
}

/** Hue tints sit off gray at the same step — measured across all seven ramps,
 *  which agree closely. Gray is the spine, not the tint ladder: putting
 *  colored tints exactly on it costs lightness, and for a high-cusp hue like
 *  green or teal lightness is chroma. Light dips at 400 because gray-400 is
 *  itself anomalously light there. */
const TINT_LIFT: Record<Theme, Partial<Record<Step, number>>> = {
  dark: { 100: 0.6, 200: 1.9, 300: 3.2, 400: 4.2, 500: 1.9 },
  light: { 100: 0.9, 200: 2.4, 300: 2.2, 400: -2.1, 500: 0.9 },
}

/** Warm hues rotate toward orange past the anchor. A darkened yellow reads as
 *  olive at its own hue angle, and sRGB is wider toward orange there — so the
 *  rotation buys saturation as well as identity. Light carries it further
 *  because its ramp keeps darkening past 800. Scaled by how far into the
 *  yellow-orange band the hue sits, so cool ramps hold still. */
/** How far into the yellow-orange band a hue sits, 1 at pure yellow falling to
 *  ~0 by 30 and 150 degrees. Gates the rotation above, so amber turns and blue
 *  does not. */
export function warmth(H: number) {
  const d = Math.abs(((((H - 88) % 360) + 540) % 360) - 180)
  return Math.exp(-Math.pow(d / 38, 2))
}

const WARM_ROTATION: Record<Theme, Partial<Record<Step, number>>> = {
  dark: { 800: -12, 900: -12 },
  light: { 800: -12, 900: -22, 1000: -31 },
}

/** Minimum separation from 800 to 900. In every ramp the scale keeps moving
 *  away from the floor after the hover step; without this a high anchor like
 *  amber would fold back and read as muddy. */
const TEXT_LIFT = 1

/** Where 600 sits between the last tint and the anchor. 600 is a border step,
 *  so it belongs short of the solid, which is where most ramps put it. */
const BORDER_T = 0.6

/** Largest chroma sRGB can show at this lightness and hue. The models below
 *  express chroma as a fraction of this, never as an absolute, so every hue
 *  sits equally far out toward its own gamut boundary. */
export const chromaLimit = (L: number, H: number) => fitChroma(L, 0.45, H)

/** One lightness scale for every hue: the gray spine moved onto the new
 *  endpoints. Ordering, including the 700/800 reversal in dark, is inherited
 *  from the spine rather than imposed. */
export function uniformScale(
  theme: Theme,
  floorL: number,
  ceilingL: number
): number[] {
  const { k, baseLum, floorLum } = spanFactor(theme, floorL, ceilingL)
  return STEPS.map((step, i) => {
    if (i === STEPS.length - 1) return ceilingL
    const crNow = contrastRatio(
      relativeLuminance(GRAY[theme][step as GrayStep] / 100, 0, 0),
      baseLum
    )
    return solveForContrast(1 + (crNow - 1) * k, 0, 0, floorLum, theme) * 100
  })
}

export function uniformPalette(
  theme: Theme,
  floorL: number,
  ceilingL: number,
  anchors: Record<string, Anchor> = ANCHORS
): Palette {
  const scale = uniformScale(theme, floorL, ceilingL)
  const { k, floorLum } = spanFactor(theme, floorL, ceilingL)
  const floorSrgb = srgbOf(floorL)
  const dark = isDarkTheme(theme)
  const rows: PaletteRow[] = []

  const neutral = (L: number, step: number): Swatch => ({
    step,
    hex: neutralHexOf(L),
    css: `oklch(${(L / 100).toFixed(3)} 0 0)`,
    contrast: contrastRatio(relativeLuminance(L / 100, 0, 0), floorLum),
  })

  rows.push({
    label: "Background",
    token: "--ds-background-*",
    swatches: STEPS.map((step, i) =>
      step > 200
        ? null
        : neutral(i === 0 ? floorL : (floorL + scale[0]) / 2, step)
    ),
  })

  rows.push({
    label: "Gray",
    token: "--ds-gray-*",
    swatches: STEPS.map((step, i) => neutral(scale[i], step)),
  })

  // Alpha tracks the solid ramp exactly: solve opacity for each target.
  rows.push({
    label: "Gray Alpha",
    token: "--ds-gray-alpha-*",
    swatches: STEPS.map((step, i) => {
      const alpha = alphaFor(srgbOf(scale[i]), floorSrgb, theme)
      return {
        ...neutral(scale[i], step),
        alpha,
        css: `oklch(${alphaInk(theme)} 0 0 / ${alpha.toFixed(3)})`,
      }
    }),
  })

  for (const [hue, anchor] of Object.entries(anchors)) {
    const { hue: H, solid: solidL, hover: hoverL } = anchor
    const lightnessFor = (step: Step, i: number) => {
      if (step === 700) return solidL
      if (step === 800) return hoverL
      if (step === 600) return scale[4] + BORDER_T * (solidL - scale[4])
      if (step === 900)
        return dark
          ? Math.max(scale[8], hoverL + TEXT_LIFT)
          : Math.min(scale[8], hoverL - TEXT_LIFT)
      return scale[i] + (TINT_LIFT[theme][step] ?? 0)
    }
    const hueFor = (step: Step) =>
      H + (WARM_ROTATION[theme][step] ?? 0) * warmth(H)

    rows.push({
      label: hue[0].toUpperCase() + hue.slice(1),
      token: `--ds-${hue}-*`,
      swatches: STEPS.map((step, i) => {
        const L = lightnessFor(step, i)
        const stepHue = hueFor(step)
        const C = UNIFORM_CHROMA[theme][step] * chromaLimit(L / 100, stepHue)
        return {
          step,
          hex: oklchToHex(L / 100, C, stepHue),
          css: `oklch(${L.toFixed(2)}% ${C.toFixed(4)} ${stepHue.toFixed(2)})`,
          contrast: contrastRatio(
            relativeLuminance(L / 100, C, stepHue),
            floorLum
          ),
        }
      }),
    })
  }

  return { rows, k }
}
