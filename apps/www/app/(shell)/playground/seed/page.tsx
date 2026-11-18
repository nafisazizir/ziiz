import type { Metadata } from "next"

import { SEED_PRESETS, seedPalette, seedTheme } from "@/lib/seed-palette"
import { BlogHero } from "@/components/blog/blog-hero"
import { Separator } from "@/components/ui/separator"

import { SeedLab } from "./seed-lab"

export const metadata: Metadata = {
  title: "Seed palette",
  description:
    "Pick one colour and generate the whole ziiz palette from it, grays included.",
}

// The hero's picture: one row of grays per preset, each on its own floor, so
// the same ramp is seen taking six different casts.
function SeedArt() {
  return (
    <div
      aria-hidden
      className="absolute inset-0 grid grid-cols-10 gap-1 bg-background-100 p-4 md:p-8 lg:p-10"
      style={{
        gridTemplateRows: `repeat(${SEED_PRESETS.length}, minmax(0, 1fr))`,
      }}
    >
      {SEED_PRESETS.flatMap((p) => {
        const seeded = seedTheme(p.hex, {
          strength: p.strength,
          matchSaturation: true,
        })!
        const grays = seedPalette("light", seeded).rows[1].swatches
        return grays.map((s, i) => (
          <div
            key={`${p.name}-${i}`}
            className="ring-1 ring-gray-alpha-100 ring-inset"
            style={{ backgroundColor: s?.hex }}
          />
        ))
      })}
    </div>
  )
}

export default function SeedPlaygroundPage() {
  return (
    <>
      <BlogHero
        title={
          <>
            {`A palette from `}
            <br className="max-md:hidden" />
            {`one colour`}
          </>
        }
        description={`Pick a seed. Its hue tints the gray ramp at a fixed fraction of the gamut edge, at the contrast every step already had, so every component follows without being told. The seed itself becomes the solid of its nearest hue ramp.`}
      >
        <SeedArt />
      </BlogHero>
      <Separator className="mt-10 lg:mt-0" />
      <SeedLab />
    </>
  )
}
