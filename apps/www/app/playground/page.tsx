import type { Metadata } from "next"

import { PaletteRemap } from "@/components/palette-remap"
import { RampGenerator } from "@/components/ramp-generator"
import { SiteHeader } from "@/components/site-header"

export const metadata: Metadata = {
  title: "Playground",
  description:
    "Generate a full light and dark OKLCH ramp for a new color, following the gray spine, the sRGB gamut and the contrast targets the existing ramps hit.",
}

export default function PlaygroundPage() {
  return (
    <div className="min-h-svh bg-background-100">
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl px-6 py-10">
        <header className="mb-10 flex flex-col gap-2">
          <p className="text-label-12 tracking-wider text-gray-900 uppercase">
            Foundations · Color
          </p>
          <h1 className="text-heading-32 text-gray-1000">Ramp Spine</h1>
          <p className="max-w-prose text-copy-16 text-gray-900">
            Drop in a candidate color. It becomes step 700 — the theme-invariant
            brand anchor — and the other nineteen tokens are derived from the
            gray spine, the sRGB gamut, and the contrast targets the existing
            ramps hit.
          </p>
        </header>
        <RampGenerator />
        <div className="mt-10">
          <PaletteRemap />
        </div>
        <footer className="mt-14 max-w-prose border-t pt-6 text-copy-13 text-gray-900">
          Derived from the seven ramps in <code>packages/theme/theme.css</code>.
          Steps 100–600 follow the gray spine plus the measured per-step offset;
          700–800 are pinned to your anchor in both themes; 900–1000 are solved
          for contrast, not lightness. Step 600 is the most hand-tuned step in
          Geist — the generator blends toward it rather than reproducing any
          single hue&rsquo;s value.
        </footer>
      </main>
    </div>
  )
}
