import type { Metadata } from "next"

import { PaletteRemap } from "@/components/palette-remap"

export const metadata: Metadata = {
  title: "Playground",
  description:
    "Generate a full light and dark palette from a floor, a ceiling and seven brand anchors.",
}

export default function PlaygroundPage() {
  return (
    <div className="mx-auto w-full max-w-6xl py-10">
      <header className="mb-10 flex flex-col gap-2">
        <p className="text-label-12 tracking-wider text-gray-900 uppercase">
          Foundations · Color
        </p>
        <h1 className="text-heading-32 text-gray-1000">Palette generator</h1>
        <p className="max-w-prose text-copy-16 text-gray-900">
          Pick a floor and a ceiling. Every other token is derived — tints climb
          from the floor to each hue&rsquo;s solid, text climbs from the hover
          step to the ceiling, and chroma rides the sRGB gamut edge. The shipped
          palette sits on the left for comparison.
        </p>
      </header>
      <PaletteRemap />
      <footer className="mt-14 max-w-prose border-t pt-6 text-copy-13 text-gray-900">
        The seven brand anchors live in <code>ANCHORS</code> in{" "}
        <code>lib/color-ramp.ts</code> — three numbers per hue, shared across
        both themes. <code>lib/color-ramp.md</code> covers the formula, how to
        choose an anchor, and what breaks if you move one.
      </footer>
    </div>
  )
}
