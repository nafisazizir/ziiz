import type { Metadata } from "next"

import { ANCHORS, STEPS } from "@/lib/color-ramp"
import { BlogHero } from "@/components/blog/blog-hero"
import { PaletteRemap } from "@/components/palette-remap"
import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
  title: "Palette generator",
  description:
    "Generate a full light and dark palette from a floor, a ceiling and seven brand anchors.",
}

// The hero's picture: the shipped palette read straight from the tokens, so
// it follows the site theme. Gray first, then the anchors in their order.
const hues = ["gray", ...Object.keys(ANCHORS)]

function PaletteArt() {
  return (
    <div
      aria-hidden
      className="absolute inset-4 grid grid-cols-10 gap-1 md:inset-8 lg:inset-10"
      style={{ gridTemplateRows: `repeat(${hues.length}, minmax(0, 1fr))` }}
    >
      {hues.flatMap((hue) =>
        STEPS.map((step) => (
          <div
            key={`${hue}-${step}`}
            className="ring-1 ring-gray-alpha-100 ring-inset"
            style={{ backgroundColor: `var(--ds-${hue}-${step})` }}
          />
        ))
      )}
    </div>
  )
}

export default function PlaygroundPage() {
  return (
    <>
      <BlogHero
        title={
          <>
            {`A palette from `}
            <br className="max-md:hidden" />
            {`two endpoints`}
          </>
        }
        description={`Pick a floor and a ceiling and every other token is derived: tints climb from the floor to each hue's solid, text climbs from the hover step to the ceiling, and chroma rides the sRGB gamut edge. The shipped palette sits beside the result.`}
      >
        <PaletteArt />
      </BlogHero>
      <Separator className="mt-10 lg:mt-0" />
      <div className="flex flex-col gap-20 py-10 lg:gap-30 lg:py-20">
        <PaletteRemap />
      </div>
    </>
  )
}
