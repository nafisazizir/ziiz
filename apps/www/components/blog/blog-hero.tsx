import { AspectRatio } from "@/components/ui/aspect-ratio"

// The screen that opens the blog: a six-column headline, a panel, then a
// short description in columns five to seven. The panel is the section's
// picture and is left empty for now; its ratio steps with the viewport,
// 5/3, 2/1 from md, 11/4 from lg.
export function BlogHero({
  title,
  description,
}: {
  title: React.ReactNode
  description: React.ReactNode
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
        <p className="col-span-7 text-copy-16 text-balance text-gray-1000 lg:col-span-3 lg:col-start-5 lg:text-copy-13">
          {description}
        </p>
      </div>
    </section>
  )
}
