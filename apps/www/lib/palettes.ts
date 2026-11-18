/* The palette library: every theme the /playground page offers, each one a
 * recipe the generator turns into a full light and dark palette. How the
 * branded ones were arrived at is in lib/color-ramp.md, "The library". */

import {
  currentPalette,
  hexToOklch,
  paletteTokens,
  uniformPalette,
  type Anchor,
  type Brand,
  type NeutralTint,
  type Palette,
  type Step,
  type Theme,
} from "@/lib/color-ramp"
import { seedPalette, seedTheme } from "@/lib/seed-palette"

export const THEMES: Theme[] = ["light", "dark"]

export type Endpoints = Record<Theme, { floor: string; ceiling: string }>

export interface Recipe {
  /** Floor is the page, ceiling the primary ink, per theme. */
  endpoints: Endpoints
  tint: Record<Theme, NeutralTint>
  anchors?: Record<string, Anchor>
  brand?: Brand
}

export interface LibraryEntry {
  id: string
  name: string
  palettes: Record<Theme, Palette>
}

const L = (hex: string, fallback: number) =>
  (hexToOklch(hex)?.L ?? fallback) * 100

export function recipePalettes(recipe: Recipe): Record<Theme, Palette> {
  const build = (theme: Theme) =>
    uniformPalette(
      theme,
      L(recipe.endpoints[theme].floor, theme === "light" ? 0.98 : 0.1),
      L(recipe.endpoints[theme].ceiling, theme === "light" ? 0.24 : 0.9),
      recipe.anchors,
      recipe.tint[theme],
      recipe.brand
    )
  return { light: build("light"), dark: build("dark") }
}

/** One colour in: its hue tints the grays, it becomes the brand's 700, and
 *  the named hues take its saturation. */
export function seedPalettes(
  hex: string,
  strength: number,
  endpoints?: Endpoints
): Record<Theme, Palette> | null {
  const seeded = seedTheme(hex, { strength, matchSaturation: true })
  if (!seeded) return null
  return {
    light: seedPalette("light", seeded, endpoints),
    dark: seedPalette("dark", seeded, endpoints),
  }
}

/* Oat, designed 2026-11-18: milk chocolate on a page halfway between warm
 * paper and Cursor's olive cream, softened hues, an espresso dark. */
const OAT: Recipe = {
  endpoints: {
    light: { floor: "#FAF9F5", ceiling: "#28251F" },
    dark: { floor: "#181510", ceiling: "#F0ECE6" },
  },
  tint: {
    light: { hue: 84, strength: 0.11 },
    dark: { hue: 76, strength: 0.17 },
  },
  anchors: {
    blue: { hue: 248, solid: 56, hover: 50, saturation: 0.6 },
    red: { hue: 26, solid: 57, hover: 51, saturation: 0.82 },
    // Gold, 22° off the brand, so a warning never reads as brand.
    amber: { hue: 84, solid: 80, hover: 75.5, saturation: 0.8 },
    green: { hue: 140, solid: 60, hover: 54, saturation: 0.62 },
    teal: { hue: 188, solid: 62, hover: 55, saturation: 0.58 },
    purple: { hue: 310, solid: 55, hover: 48.5, saturation: 0.55 },
    pink: { hue: 4, solid: 63, hover: 58.5, saturation: 0.65 },
  },
  // #795533, white on it at 6.6:1.
  brand: {
    name: "Milk chocolate",
    anchor: { hue: 62, solid: 48, hover: 42, saturation: 0.62 },
  },
}

export const LIBRARY: LibraryEntry[] = [
  {
    id: "ziiz",
    name: "ziiz",
    palettes: { light: currentPalette("light"), dark: currentPalette("dark") },
  },
  { id: "oat", name: "Oat", palettes: recipePalettes(OAT) },
]

export const SHIPPED = LIBRARY[0]

/** A swatch's hex by token family and step, e.g. ("gray", 900). */
export function swatch(palette: Palette, family: string, step: Step) {
  const row = palette.rows.find((r) => r.token === `--ds-${family}-*`)
  return row?.swatches.find((s) => s?.step === step)?.hex
}

/** Tokens for a preview subtree. A palette with no brand gets the shipped
 *  aliases (color-ramp.md, "Where the brand goes"), so its on-states read
 *  ink the way stock components paint them. */
export function previewTokens(palette: Palette) {
  const tokens = paletteTokens(palette)
  if (tokens["--ds-brand-700"]) return tokens
  for (const step of [100, 200, 300, 400, 500, 600, 900, 1000]) {
    tokens[`--ds-brand-${step}`] = `var(--ds-gray-${step})`
    tokens[`--ds-brand-alpha-${step}`] = `var(--ds-gray-alpha-${step})`
  }
  tokens["--ds-brand-700"] = "var(--ds-gray-1000)"
  tokens["--ds-brand-800"] = "var(--ds-gray-950, var(--ds-gray-1000))"
  tokens["--ds-brand-alpha-700"] = "var(--ds-gray-alpha-700)"
  tokens["--ds-brand-alpha-800"] = "var(--ds-gray-alpha-800)"
  tokens["--ds-brand-on"] = "var(--ds-background-100)"
  return tokens
}

/** Both themes as one stylesheet, under the selectors given. */
export function paletteCss(
  palettes: Record<Theme, Palette>,
  selectors: Record<Theme, string> = { light: ":root", dark: ".dark" }
) {
  return THEMES.map((theme) => {
    const lines = Object.entries(paletteTokens(palettes[theme])).map(
      ([token, value]) => `  ${token}: ${value};`
    )
    return `${selectors[theme]} {\n${lines.join("\n")}\n}`
  }).join("\n\n")
}
