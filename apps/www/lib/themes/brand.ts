/* A product's palette as its live site paints it, and the inputs that
 * rebuild it on the ziiz model. Measured by rendering real pages and reading
 * every visible element's computed colour, composited onto what is behind it
 * and weighted by area or characters; buttons are hovered for their hover
 * state. Re-measure with scripts/brand-colors (see its header). Declared
 * tokens are not evidence: a stylesheet carries many that nothing paints. */

import {
  hexToOklch,
  uniformPalette,
  type Anchor,
  type Brand,
  type NeutralTint,
  type Theme,
} from "@/lib/color-ramp"

/** A colour the site paints in a role, beside the ziiz token for that role.
 *  `ziiz` is a token, `"green-*"` for the nearest step of a ramp (decorative
 *  accents have no fixed step), or null where ziiz has no such role, which
 *  reports the nearest generated gray by contrast. Hex is as painted. */
export interface BrandRole {
  role: string
  hex: string
  ziiz: string | null
  /** What was measured: how often, how much, where. */
  evidence: string
}

export interface BrandTheme {
  slug: string
  name: string
  /** The pages rendered, and when. `source` replaces the "painted on N
   *  live pages" line where the inputs are not a live site. */
  measured: { date: string; pages: string[]; source?: string }
  /** Where the dark theme came from: a real dark mode, or dark sections of
   *  a light-only site. */
  dark: string
  /** Floor is the page, ceiling the primary ink, per theme. */
  endpoints: Record<Theme, { floor: string; ceiling: string }>
  /** Per theme: a brand may cast its light and dark grays differently. */
  tint: Record<Theme, NeutralTint>
  /** The seven named ramps. Each keeps its hue family whatever the brand;
   *  a measured colour anchors one only when it is plainly that hue. */
  anchors: Record<string, Anchor & { source: string }>
  /** The brand colour, as its own ramp beside the seven. `anchor.solid` is
   *  its 700, the measured colour exactly. */
  brand: Brand & { source: string }
  /** What the site paints, most-used first: label then hex. */
  ramps: { label: string; swatches: readonly (readonly [string, string])[] }[]
  /** The painted neutrals the tint is fitted to, per theme. */
  neutrals: Record<Theme, readonly string[]>
  roles: Record<Theme, BrandRole[]>
  findings: { title: string; body: string }[]
  hero: string
}

const lightnessOf = (hex: string, fallback: number) =>
  (hexToOklch(hex)?.L ?? fallback) * 100

export function brandPalette(
  brand: BrandTheme,
  theme: Theme,
  endpoints = brand.endpoints,
  tint = brand.tint
) {
  const { floor, ceiling } = endpoints[theme]
  return uniformPalette(
    theme,
    lightnessOf(floor, theme === "light" ? 0.97 : 0.2),
    lightnessOf(ceiling, theme === "light" ? 0.2 : 0.97),
    brand.anchors,
    tint[theme],
    brand.brand
  )
}
