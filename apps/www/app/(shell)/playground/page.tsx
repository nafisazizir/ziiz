import type { Metadata } from "next"

import { PaletteLibrary } from "./palette-library"

export const metadata: Metadata = {
  title: "Palettes",
  description:
    "Pick a palette, preview it on stock components, copy its tokens or wear it across this site.",
}

export default function PalettesPage() {
  return (
    <div className="flex flex-col gap-10 pt-4 pb-20 lg:gap-15 lg:pt-(--content-top)">
      <div className="flex flex-col gap-3">
        <h1 className="text-heading-48 text-gray-1000">Palettes</h1>
        <p className="max-w-xl text-copy-16 text-balance text-gray-900">
          {`Pick one to see it on stock components. Copy its tokens, or wear it across this site.`}
        </p>
      </div>
      <PaletteLibrary />
    </div>
  )
}
