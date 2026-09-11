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

/** The lightness at which a hue can carry the most chroma in sRGB. */
export function gamutCusp(H: number) {
  let best = { L: 0.5, C: 0 }
  for (let i = 0; i <= 100; i++) {
    const L = i / 100
    const C = fitChroma(L, 0.45, H)
    if (C > best.C) best = { L, C }
  }
  return best
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

/** WCAG contrast of an OKLCH color against white or black. */
export function contrastAgainst(L: number, C: number, H: number, theme: Theme) {
  return contrastRatio(relativeLuminance(L, C, H), theme === "light" ? 1 : 0)
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

/* ---------- the measured model ---------- */

/** --ds-gray-* lightness, the skeleton every hue ramp tracks. */
export const SPINE: Record<Theme, Record<Step, number>> = {
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
    1000: 20.5,
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
    1000: 94.6,
  },
}

/** Mean lightness offset from the spine, steps 100-500. */
const OFFSET: Record<Theme, Record<number, number>> = {
  light: { 100: 0.9, 200: 2.4, 300: 2.2, 400: -2.1, 500: 0.9 },
  dark: { 100: 0.6, 200: 1.9, 300: 3.2, 400: 4.1, 500: 1.9 },
}

/** Chroma as a fraction of the anchor's chroma. */
const CHROMA: Record<Theme, Record<Step, number>> = {
  light: {
    100: 0.124,
    200: 0.142,
    300: 0.209,
    400: 0.324,
    500: 0.564,
    600: 0.813,
    700: 1,
    800: 0.94,
    900: 0.86,
    1000: 0.47,
  },
  dark: {
    100: 0.314,
    200: 0.386,
    300: 0.483,
    400: 0.541,
    500: 0.667,
    600: 0.937,
    700: 0.94,
    800: 0.93,
    900: 0.961,
    1000: 0.188,
  },
}

/** Amber's measured hue drift, relative to step 700. */
const HUE_ROTATION: Record<Step, number> = {
  100: 9,
  200: 14,
  300: 14,
  400: 12,
  500: 3,
  600: -3,
  700: 0,
  800: -12,
  900: -22,
  1000: -31,
}

const CONTRAST_TARGET: Record<Theme, { 900: number; 1000: number }> = {
  light: { 900: 5.6, 1000: 14.8 },
  dark: { 900: 8.4, 1000: 18.8 },
}

/** How far into the yellow-orange band a hue sits, 0 to 1. */
export function warmth(H: number) {
  const d = Math.abs(((((H - 88) % 360) + 540) % 360) - 180)
  return Math.exp(-Math.pow(d / 38, 2))
}

const normalizeHue = (H: number) => ((H % 360) + 360) % 360

export function buildRamp(anchor: Oklch): RampPair {
  const H0 = anchor.H
  const C7 = anchor.C
  const L7 = anchor.L * 100
  const w = warmth(H0)
  const rotate = (step: Step) => H0 + HUE_ROTATION[step] * w

  const themes = ["light", "dark"] as const
  const result = {} as RampPair

  for (const theme of themes) {
    const spine = SPINE[theme]
    const draft = {} as Record<Step, { L: number; C: number; H: number }>

    // The anchor band: same L and H in both themes, chroma damped in dark.
    draft[700] = { L: L7, C: C7 * CHROMA[theme][700], H: H0 }
    draft[800] = { L: L7 - 6, C: C7 * CHROMA[theme][800], H: rotate(800) }

    // Tints: the spine plus the measured offset.
    for (const step of [100, 200, 300, 400, 500] as const) {
      draft[step] = {
        L: spine[step] + OFFSET[theme][step],
        C: 0,
        H: rotate(step),
      }
    }

    // Step 600 is the most hand-tuned step in Geist; blend toward the spine.
    draft[600] = {
      L:
        theme === "light"
          ? Math.max(spine[600] + 2.5, L7 + 2)
          : Math.max(draft[500].L + 4, 0.75 * L7 + 0.25 * spine[600]),
      C: 0,
      H: rotate(600),
    }

    // Keep the tints ordered relative to the anchor.
    if (theme === "light") {
      let floor = Math.max(draft[700].L, draft[600].L)
      for (const step of [600, 500, 400, 300, 200, 100] as const) {
        draft[step].L = Math.max(
          draft[step].L,
          floor + (step === 600 ? 0 : 1.2)
        )
        floor = draft[step].L
      }
    } else {
      let ceiling = 0
      for (const step of [100, 200, 300, 400, 500] as const) {
        draft[step].L = Math.max(draft[step].L, ceiling + 1.2)
        ceiling = draft[step].L
      }
      draft[600].L = Math.max(draft[600].L, draft[500].L + 4)
    }

    for (const step of [100, 200, 300, 400, 500, 600] as const) {
      draft[step].C = C7 * CHROMA[theme][step]
    }

    // Text steps are solved for contrast, not lightness.
    for (const step of [900, 1000] as const) {
      const H = rotate(step)
      const C = C7 * CHROMA[theme][step]
      const target = CONTRAST_TARGET[theme][step]
      const wantLum =
        theme === "light" ? 1.05 / target - 0.05 : 0.05 * target - 0.05
      const L = solveLightness(clamp01(wantLum), C, H) * 100
      draft[step] = { L, C, H }
    }

    const ramp = {} as Ramp
    for (const step of STEPS) {
      const { L, C, H } = draft[step]
      const hue = normalizeHue(H)
      const chroma = fitChroma(L / 100, C, hue)
      ramp[step] = {
        step,
        L,
        C: chroma,
        H: hue,
        hex: oklchToHex(L / 100, chroma, hue),
        contrast: contrastAgainst(L / 100, chroma, hue, theme),
        deltaSpine: L - spine[step],
      }
    }
    result[theme] = ramp
  }

  return result
}

/** Emit the token block a ramp would add to theme.css. */
export function toCss(pair: RampPair, name: string) {
  const token = name.replace(/[^a-z0-9-]/gi, "").toLowerCase() || "custom"
  const line = (theme: Theme, step: Step) => {
    const s = pair[theme][step]
    return `  --ds-${token}-${step}: oklch(${s.L.toFixed(2)}% ${s.C.toFixed(
      4
    )} ${s.H.toFixed(2)});`
  }
  const block = (theme: Theme, selector: string) =>
    `${selector} {\n${STEPS.map((step) => line(theme, step)).join("\n")}\n}`
  return [
    "/* light */",
    block("light", ":root"),
    "",
    "/* dark — 700 and 800 carry the same L and H */",
    block("dark", ".dark"),
  ].join("\n")
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
    1000: 20.5,
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
    1000: 94.6,
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
    1000: 0.91,
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
    1000: 0.92,
  },
}

export interface NeutralStop {
  step: number
  L: number
  hex: string
  contrast: number
  /** Alpha ramps only: opacity, and how far the flattened result sits from
   *  the solid gray at the same step. */
  alpha?: number
  deltaGray?: number
  /** Solid gray only: lightness change from the previous step. Gray's own
   *  deviation from the spine is zero by construction — it is the spine — so
   *  the informative delta is the size of each rung. */
  deltaStep?: number
}

const grayHex = (srgb: number) => {
  const n = Math.round(clamp01(srgb) * 255)
  const h = n.toString(16).padStart(2, "0")
  return `#${h}${h}${h}`.toUpperCase()
}

const grayLightness = (srgb: number) => {
  const lin = srgbToLinear(clamp01(srgb))
  return linearRgbToOklab(lin, lin, lin).L * 100
}

/** Composite a gray-alpha step over background-100 and report the solid it
 *  resolves to — the number that says whether the alpha ramp tracks the
 *  solid one. CSS composites in gamma space, so the mix is done there. */
export function flattenAlpha(alpha: number, theme: Theme): NeutralStop {
  const srgb = theme === "light" ? 1 - alpha : alpha
  const lum = srgbToLinear(clamp01(srgb))
  return {
    step: 0,
    alpha,
    L: grayLightness(srgb),
    hex: grayHex(srgb),
    contrast: contrastRatio(lum, theme === "light" ? 1 : 0),
  }
}

/** The solid gray ramp as swatches. */
export function grayRamp(theme: Theme): NeutralStop[] {
  return GRAY_STEPS.map((step, i) => {
    const L = GRAY[theme][step] / 100
    const previous = i === 0 ? undefined : GRAY[theme][GRAY_STEPS[i - 1]]
    return {
      step,
      L: GRAY[theme][step],
      hex: oklchToHex(L, 0, 0),
      contrast: contrastAgainst(L, 0, 0, theme),
      deltaStep:
        previous === undefined ? undefined : GRAY[theme][step] - previous,
    }
  })
}

/** The alpha ramp, flattened over background-100 and compared to solid gray. */
export function grayAlphaRamp(theme: Theme): NeutralStop[] {
  return STEPS.map((step) => {
    const flat = flattenAlpha(GRAY_ALPHA[theme][step], theme)
    return { ...flat, step, deltaGray: flat.L - GRAY[theme][step] }
  })
}

/* ---------- endpoint remap ----------
 * Floor and ceiling become the two inputs; every other step keeps its
 * proportional position in CONTRAST space, not lightness space. One factor
 * does it:  k = (CR_ceiling_new - 1) / (CR_ceiling_now - 1).
 * At the current endpoints k === 1 and the palette is unchanged. */

export interface Swatch {
  step: number
  hex: string
  /** The value as it would be written as a token. */
  css: string
  contrast: number
  /** Alpha rows: the opacity that lands on the target contrast. */
  alpha?: number
}

export interface PaletteRow {
  label: string
  token: string
  swatches: (Swatch | null)[]
}

const HUE_ORDER = ["blue", "red", "amber", "green", "teal", "purple", "pink"]

/** Solve lightness for a target contrast, holding chroma and hue. */
function solveForContrast(
  target: number,
  C: number,
  H: number,
  floorLum: number
) {
  const wantLum = target * (floorLum + 0.05) - 0.05
  return solveLightness(clamp01(wantLum), C, H)
}

/** Solve the opacity of white ink over the floor that lands on a contrast. */
function solveAlpha(target: number, floorSrgb: number, floorLum: number) {
  let lo = 0
  let hi = 1
  for (let i = 0; i < 30; i++) {
    const mid = (lo + hi) / 2
    const composite = floorSrgb + mid * (1 - floorSrgb)
    const cr = contrastRatio(srgbToLinear(composite), floorLum)
    if (cr < target) lo = mid
    else hi = mid
  }
  return (lo + hi) / 2
}

const neutralHex = (L: number) => oklchToHex(L / 100, 0, 0)
const srgbOf = (L: number) => linearToSrgb(clamp01(L / 100) ** 3)

/** Build the dark palette for a given floor and ceiling lightness (0-100).
 *  Pass the current endpoints (0, 94.6) to get today's palette back. */
export function darkPalette(floorL: number, ceilingL: number) {
  const floorLum = relativeLuminance(floorL / 100, 0, 0)
  const floorSrgb = srgbOf(floorL)
  const baseFloorLum = relativeLuminance(0, 0, 0)

  const crNow = (L: number, C = 0, H = 0) =>
    contrastRatio(relativeLuminance(L / 100, C, H), baseFloorLum)

  const spanNow = crNow(GRAY.dark[1000]) - 1
  const spanNew =
    contrastRatio(relativeLuminance(ceilingL / 100, 0, 0), floorLum) - 1
  const k = spanNew / spanNow
  const remap = (cr: number) => 1 + (cr - 1) * k

  const rows: PaletteRow[] = []

  // Background: only 100 and 200 exist.
  const bgSwatches: (Swatch | null)[] = STEPS.map((step) => {
    if (step > 200) return null
    const now = step === 100 ? 0 : 2.7
    const target = remap(crNow(now))
    const L =
      step === 100 ? floorL : solveForContrast(target, 0, 0, floorLum) * 100
    return {
      step,
      hex: neutralHex(L),
      css: `oklch(${(L / 100).toFixed(3)} 0 0)`,
      contrast: contrastRatio(relativeLuminance(L / 100, 0, 0), floorLum),
    }
  })
  rows.push({
    label: "Background",
    token: "--ds-background-*",
    swatches: bgSwatches,
  })

  // Gray. The 950 step is omitted here so every row is ten columns wide.
  rows.push({
    label: "Gray",
    token: "--ds-gray-*",
    swatches: STEPS.map((step) => {
      const target = remap(crNow(GRAY.dark[step as GrayStep]))
      const L =
        step === 1000
          ? ceilingL
          : solveForContrast(target, 0, 0, floorLum) * 100
      return {
        step,
        hex: neutralHex(L),
        css: `oklch(${(L / 100).toFixed(3)} 0 0)`,
        contrast: contrastRatio(relativeLuminance(L / 100, 0, 0), floorLum),
      }
    }),
  })

  // Gray alpha: re-solve the opacity so the flattened result hits the target.
  rows.push({
    label: "Gray Alpha",
    token: "--ds-gray-alpha-*",
    swatches: STEPS.map((step) => {
      const flatNow = flattenAlpha(GRAY_ALPHA.dark[step], "dark")
      const target = remap(flatNow.contrast)
      const alpha = solveAlpha(target, floorSrgb, floorLum)
      const composite = floorSrgb + alpha * (1 - floorSrgb)
      return {
        step,
        alpha,
        hex: neutralHex(
          linearRgbToOklab(
            srgbToLinear(composite),
            srgbToLinear(composite),
            srgbToLinear(composite)
          ).L * 100
        ),
        css: `oklch(1 0 0 / ${alpha.toFixed(3)})`,
        contrast: contrastRatio(srgbToLinear(composite), floorLum),
      }
    }),
  })

  // The hue ramps. 700 and 800 are theme-invariant anchors and never move.
  for (const hue of HUE_ORDER) {
    const ramp = REFERENCE_RAMPS[hue].dark
    rows.push({
      label: hue[0].toUpperCase() + hue.slice(1),
      token: `--ds-${hue}-*`,
      swatches: STEPS.map((step, i) => {
        const [L0, C0, H0] = ramp[i]
        const pinned = step === 700 || step === 800
        const L = pinned
          ? L0
          : solveForContrast(remap(crNow(L0, C0, H0)), C0, H0, floorLum) * 100
        const C = fitChroma(L / 100, C0, H0)
        return {
          step,
          hex: oklchToHex(L / 100, C, H0),
          css: `oklch(${L.toFixed(2)}% ${C.toFixed(4)} ${H0.toFixed(2)})`,
          contrast: contrastRatio(relativeLuminance(L / 100, C, H0), floorLum),
        }
      }),
    })
  }

  return { rows, k, floorL, ceilingL }
}

/* ---------- uniform generation ----------
 * Uniform where uniformity is free, hue-native where it is not.
 *
 * Tints (100-500) and text (900-1000) share one lightness scale across every
 * hue. The anchor band does not: measured against the sRGB gamut, five of the
 * seven 700s sit within two points of their hue's cusp — the lightness at
 * which that hue can carry the most chroma, and so looks most like itself.
 * Amber's cusp is at L 81 and blue's at L 60; forcing both to one value turns
 * amber to mud. So 700 keeps its anchor, 800 sits a fixed step below it (the
 * solid/hover pair), and 600 interpolates up from the tints. */

/** Fraction of the gamut limit each step rides, measured from the dark ramps
 *  (which mostly sit at or past the edge) and tapered at the top step. */
const UNIFORM_CHROMA: Record<Step, number> = {
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
}

/** Lightness drop from 700 to 800 for the neutral ramp, which has no brand
 *  anchor of its own to inherit the pair from. */
const ANCHOR_DIP = 6

/** Minimum lift from 800 to 900. In all seven ramps the scale climbs again
 *  after the hover step; without this floor a high anchor like amber would
 *  invert, and a hue that drops back down after its solid reads as muddy.
 *  Kept small: on a warm hue the gamut narrows fast above the anchor, so a
 *  bigger lift trades saturation for lightness and washes the step out. */
const TEXT_LIFT = 1

/** Warm hues rotate toward orange above the anchor. A darkened yellow reads
 *  as olive at its own hue angle, and sRGB is wider toward orange at that
 *  lightness — so the rotation buys saturation as well as identity. Scaled by
 *  how far into the yellow-orange band the hue sits, so cool ramps hold still:
 *  amber turns -10.9 degrees, blue and purple 0.0. */
const WARM_ROTATION: Partial<Record<Step, number>> = { 800: -12, 900: -12 }

/** Where 600 sits between the last tint and the anchor. 600 is a border step,
 *  so it belongs below the solid, which is where five of seven ramps put it. */
const BORDER_T = 0.6

/** Hue tints sit above gray at the same step — measured across all seven dark
 *  ramps, which agree closely (+0.3 to +1.3 at 100, +2.0 to +5.8 at 400). Gray
 *  is the spine, not the tint ladder: putting colored tints exactly on it costs
 *  lightness, and for a high-cusp hue like green or teal lightness is chroma. */
const TINT_LIFT: Partial<Record<Step, number>> = {
  100: 0.6,
  200: 1.9,
  300: 3.2,
  400: 4.2,
  500: 1.9,
}

/** Largest chroma sRGB can show at this lightness and hue. */
export const chromaLimit = (L: number, H: number) => fitChroma(L, 0.45, H)

/** One lightness scale for every hue: the gray spine remapped onto the new
 *  endpoints, then forced monotonic so the ramp never reverses. */
export function uniformScale(floorL: number, ceilingL: number): number[] {
  const floorLum = relativeLuminance(floorL / 100, 0, 0)
  const baseLum = relativeLuminance(0, 0, 0)
  const spanNow =
    contrastRatio(relativeLuminance(GRAY.dark[1000] / 100, 0, 0), baseLum) - 1
  const spanNew =
    contrastRatio(relativeLuminance(ceilingL / 100, 0, 0), floorLum) - 1
  const k = spanNew / spanNow

  const raw = STEPS.map((step, i) => {
    if (i === STEPS.length - 1) return ceilingL
    const crNow = contrastRatio(
      relativeLuminance(GRAY.dark[step as GrayStep] / 100, 0, 0),
      baseLum
    )
    const target = 1 + (crNow - 1) * k
    return (
      solveLightness(clamp01(target * (floorLum + 0.05) - 0.05), 0, 0) * 100
    )
  })

  // 800 is the darker half of the solid/hover pair, so its dip below 700 is
  // kept deliberately; every other step stays ordered.
  raw[7] = raw[6] - ANCHOR_DIP
  return raw
}

/** The dark palette generated from the uniform model rather than remapped. */
export function uniformDarkPalette(floorL: number, ceilingL: number) {
  const scale = uniformScale(floorL, ceilingL)
  const floorLum = relativeLuminance(floorL / 100, 0, 0)
  const floorSrgb = linearToSrgb(clamp01(floorL / 100) ** 3)
  const rows: PaletteRow[] = []

  const neutral = (L: number): Swatch => ({
    step: 0,
    hex: oklchToHex(L / 100, 0, 0),
    css: `oklch(${(L / 100).toFixed(3)} 0 0)`,
    contrast: contrastRatio(relativeLuminance(L / 100, 0, 0), floorLum),
  })

  rows.push({
    label: "Background",
    token: "--ds-background-*",
    swatches: STEPS.map((step, i) =>
      step > 200
        ? null
        : { ...neutral(i === 0 ? floorL : (floorL + scale[0]) / 2), step }
    ),
  })

  rows.push({
    label: "Gray",
    token: "--ds-gray-*",
    swatches: STEPS.map((step, i) => ({ ...neutral(scale[i]), step })),
  })

  // Alpha now tracks the solid ramp exactly: solve opacity for each target L.
  rows.push({
    label: "Gray Alpha",
    token: "--ds-gray-alpha-*",
    swatches: STEPS.map((step, i) => {
      const targetSrgb = linearToSrgb(clamp01(scale[i] / 100) ** 3)
      const alpha = clamp01((targetSrgb - floorSrgb) / (1 - floorSrgb))
      return {
        ...neutral(scale[i]),
        step,
        alpha,
        css: `oklch(1 0 0 / ${alpha.toFixed(3)})`,
      }
    }),
  })

  for (const hue of HUE_ORDER) {
    const [solidL, , H] = REFERENCE_RAMPS[hue].dark[6] // pinned 700, base hue
    const [hoverL] = REFERENCE_RAMPS[hue].dark[7] // pinned 800
    // Both anchors are given. Tints climb from the floor to the solid; text
    // climbs from the hover step to the ceiling.
    const lightnessFor = (step: Step, i: number) => {
      if (step === 700) return solidL
      if (step === 800) return hoverL
      if (step === 600) return scale[4] + BORDER_T * (solidL - scale[4])
      if (step === 900) return Math.max(scale[8], hoverL + TEXT_LIFT)
      return scale[i] + (TINT_LIFT[step] ?? 0)
    }
    const hueFor = (step: Step) => H + (WARM_ROTATION[step] ?? 0) * warmth(H)
    rows.push({
      label: hue[0].toUpperCase() + hue.slice(1),
      token: `--ds-${hue}-*`,
      swatches: STEPS.map((step, i) => {
        const L = lightnessFor(step, i)
        const stepHue = hueFor(step)
        const C = UNIFORM_CHROMA[step] * chromaLimit(L / 100, stepHue)
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

  return { rows, k: 1, floorL, ceilingL }
}
