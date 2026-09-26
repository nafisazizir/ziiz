import { AspectRatio } from "@/components/ui/aspect-ratio"

// The screen-opening hero business.x.com puts on its section landings: a
// six-column headline, an animation panel, then a short description in
// columns five to seven with, sometimes, a pair of actions under it.
//
// The site loops an animation in the panel; it is left empty on purpose so
// nothing but layout is under test. Its ratio steps with the viewport the
// way x.com's does: 5/3, 2/1 from md, 11/4 from lg.
export function Hero({
  title,
  description,
  actions,
}: {
  title: React.ReactNode
  description: React.ReactNode
  actions?: React.ReactNode
}) {
  return (
    <section className="flex flex-col pt-4 pb-4 lg:pt-20 lg:pb-16">
      <div className="grid grid-cols-8 gap-4">
        <h1 className="col-span-8 text-heading-48 text-balance text-gray-1000 md:col-span-6">
          {title}
        </h1>
      </div>
      <div className="mt-6 bg-gray-100">
        <AspectRatio ratio={5 / 3} className="md:aspect-2/1 lg:aspect-11/4" />
      </div>
      <div className="mt-6 grid grid-cols-8 gap-4">
        <div className="col-span-7 flex flex-col items-start gap-8 lg:col-span-3 lg:col-start-5 lg:gap-4">
          <p className="w-full text-copy-16 text-balance text-gray-1000 lg:text-copy-13">
            {description}
          </p>
          {actions && <div className="flex gap-3">{actions}</div>}
        </div>
      </div>
    </section>
  )
}
