/* One colour in, a whole palette out.
 *
 * The seed becomes two things. Its hue tints the gray ramp, which is the
 * ramp every component in components/ui speaks, so the whole kit follows it.
 * And the seed itself, exactly, becomes the solid (700) of the brand ramp, a
 * palette of its own beside the seven named hues. The named hues never move:
 * red stays red whatever the brand. Everything else is the existing
 * generator. */

import {
  ANCHORS,
  chromaLimit,
  hexToOklch,
  uniformPalette,
  type Anchor,
  type Brand,
  type NeutralTint,
  type Oklch,
  type Theme,
} from "@/lib/color-ramp"

export interface SeedOptions {
  /** Fraction of the gamut edge the grays ride. 0 is the shipped pure gray;
   *  zinc is 0.06, Tailwind gray 0.19, slate 0.29. */
  strength: number
  /** The named hue ramps take the seed's saturation, so a pastel seed gives
   *  a pastel family. Off keeps them on the gamut edge. Their hues never
   *  move. */
  matchSaturation: boolean
}

export interface SeedTheme {
  seed: Oklch
  /** The seed's fraction of the gamut edge at its own L and hue. */
  saturation: number
  /** Whether the seed's solid was pulled into the usable band. */
  clamped: boolean
  brand: Brand
  anchors: Record<string, Anchor>
  tint: NeutralTint
}

/** A solid has to carry text and sit apart from both floors. Below L 40 it
 *  merges with dark text; above L 88 it is a tint, not a fill. */
const SOLID_BAND = { min: 40, max: 88 }

/** Hover sits below the solid by the shipped average. */
const HOVER_DROP = 6

export function seedTheme(
  hex: string,
  options: SeedOptions & { name?: string }
): SeedTheme | null {
  const seed = hexToOklch(hex)
  if (!seed) return null

  const L = seed.L * 100
  const solid = Math.min(SOLID_BAND.max, Math.max(SOLID_BAND.min, L))
  const saturation = Math.min(1, seed.C / chromaLimit(seed.L, seed.H))

  const anchors: Record<string, Anchor> = {}
  for (const [name, anchor] of Object.entries(ANCHORS)) {
    anchors[name] = options.matchSaturation ? { ...anchor, saturation } : anchor
  }

  return {
    seed,
    saturation,
    clamped: solid !== L,
    brand: {
      name: options.name ?? "Brand",
      anchor: { hue: seed.H, solid, hover: solid - HOVER_DROP, saturation },
    },
    anchors,
    tint: { hue: seed.H, strength: options.strength },
  }
}

/** The soft endpoints, k matched across themes. A tint cannot
 *  reach pure black or white, since the gamut edge closes there, so the ink
 *  has to sit off black for gray-1000, and the primary button with it, to
 *  carry the hue. */
export const SEED_ENDPOINTS: Record<Theme, { floor: string; ceiling: string }> =
  {
    light: { floor: "#FAFAFA", ceiling: "#242424" },
    dark: { floor: "#0F0F0F", ceiling: "#E1E1E1" },
  }

export function seedPalette(
  theme: Theme,
  seeded: SeedTheme,
  endpoints = SEED_ENDPOINTS
) {
  const L = (hex: string, fallback: number) =>
    (hexToOklch(hex)?.L ?? fallback) * 100
  return uniformPalette(
    theme,
    L(endpoints[theme].floor, theme === "light" ? 0.98 : 0.1),
    L(endpoints[theme].ceiling, theme === "light" ? 0.24 : 0.9),
    seeded.anchors,
    seeded.tint,
    seeded.brand
  )
}
