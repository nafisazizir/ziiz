import { brandPalette, type BrandTheme } from "@/lib/themes/brand"
import { BrandLab } from "@/components/brand-lab"
import { BlogHero } from "@/components/blog/blog-hero"
import { Separator } from "@/components/ui/separator"

// The hero's picture: the generated light palette on the brand's own floor.
function PaletteArt({ brand }: { brand: BrandTheme }) {
  const palette = brandPalette(brand, "light")
  const floor = palette.rows[0].swatches[0]!.hex
  const rows = palette.rows.slice(1)
  return (
    <div
      aria-hidden
      className="absolute inset-0 grid grid-cols-10 gap-1 p-4 md:p-8 lg:p-10"
      style={{
        backgroundColor: floor,
        gridTemplateRows: `repeat(${rows.length}, minmax(0, 1fr))`,
      }}
    >
      {rows.flatMap((row) =>
        row.swatches.map((swatch, i) => (
          <div
            key={`${row.token}-${i}`}
            style={{
              backgroundColor: swatch?.hex,
              boxShadow: "inset 0 0 0 1px rgb(0 0 0 / 0.06)",
            }}
          />
        ))
      )}
    </div>
  )
}

export function BrandPage({ brand }: { brand: BrandTheme }) {
  return (
    <>
      <BlogHero
        title={
          <>
            {`${brand.name}, on `}
            <br className="max-md:hidden" />
            {`the ziiz spine`}
          </>
        }
        description={brand.hero}
      >
        <PaletteArt brand={brand} />
      </BlogHero>
      <Separator className="mt-10 lg:mt-0" />
      <BrandLab brand={brand} />
    </>
  )
}
