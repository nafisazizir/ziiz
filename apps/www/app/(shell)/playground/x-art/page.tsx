import type { Metadata } from "next"

import { art, categories, RingStack, type ArtCategory } from "@/components/art"
import { BlogHero } from "@/components/blog/blog-hero"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Artifacts of a thin line",
  description: "business.x.com's line art as ziiz SVG components.",
}

// Section order and how many pieces share a row. Variants of one piece sit
// side by side at one height: each panel grows by its own aspect ratio.
const layout: Record<ArtCategory, string> = {
  banners: "grid-cols-1",
  sections: "grid-cols-1",
  marks: "grid-cols-3 sm:grid-cols-4 lg:grid-cols-6",
  cards: "grid-cols-2 lg:grid-cols-3",
  blog: "grid-cols-2 lg:grid-cols-3",
}

function size(viewBox: string) {
  const [, , w, h] = viewBox.split(" ").map(Number)
  return { w, h, label: `${Math.round(w)}×${Math.round(h)}` }
}

export default function XArtPage() {
  return (
    <>
      <BlogHero
        title={
          <>
            {`Artifacts of `}
            <br className="max-md:hidden" />
            {`a thin line`}
          </>
        }
        description={`${art.length} SVG components in components/art. Strokes take the text colour, fills take ziiz surfaces. Every data-part hook is kept for animating later.`}
      >
        <RingStack variant="wide" className="size-full text-gray-1000" />
      </BlogHero>
      <Separator className="mt-10 lg:mt-0" />
      <div className="flex flex-col gap-20 py-10 lg:gap-30 lg:py-20">
        {(Object.keys(layout) as ArtCategory[]).map((key, index) => {
          const group = art.filter((entry) => entry.category === key)
          const { label, note } = categories[key]
          return (
            <section key={key} className="flex flex-col gap-8 lg:gap-15">
              <h2 className="text-heading-32 text-gray-1000">
                <span className="me-3 text-label-12 tracking-wider text-gray-900 tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {label}
                <span className="block text-gray-900">
                  {`${group.length} pieces · ${note}`}
                </span>
              </h2>
              <ul className={cn("grid gap-x-4 gap-y-8", layout[key])}>
                {group.map((entry) => (
                  <li key={entry.name} className="flex flex-col gap-3">
                    <div className="flex items-stretch gap-4">
                      {entry.variants.map(({ variant, viewBox }) => {
                        const { w, h } = size(viewBox)
                        return (
                          <figure
                            key={variant}
                            className="min-w-0 basis-0 overflow-hidden bg-gray-100 text-gray-1000"
                            style={{
                              flexGrow: w / h,
                              aspectRatio: `${w} / ${h}`,
                            }}
                          >
                            <entry.Component
                              className="size-full"
                              {...(entry.variants.length > 1
                                ? { variant: variant as never }
                                : {})}
                            />
                          </figure>
                        )
                      })}
                    </div>
                    <p className="text-copy-13 text-gray-1000">
                      {entry.label}
                      <span className="block text-label-12 text-gray-900">
                        {[
                          entry.name,
                          ...entry.variants.map(
                            ({ variant, viewBox }) =>
                              `${entry.variants.length > 1 ? `${variant} ` : ""}${size(viewBox).label}`
                          ),
                        ].join(" · ")}
                      </span>
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          )
        })}
      </div>
    </>
  )
}
