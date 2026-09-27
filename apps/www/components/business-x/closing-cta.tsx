import { CrossingRods } from "@/components/art/sections/crossing-rods"
import { XText } from "@/components/business-x/runs"
import { XLogo } from "@/components/business-x/x-logo"
import { Button } from "@/components/ui/button"

// "Your audience is on X. Your ads should be too." The closing section on
// nineteen of business.x.com's pages: the crossing-rods drawing with a
// headline pinned over its centre, a tag at the top left and a boxed action
// centred on a point at the bottom right. From 1024px the wide drawing sits in an 11:5 frame
// at 80% of the column; below that the narrow drawing fills a 2:3 frame no
// wider than 480px.
export function ClosingCta({
  action = "Create your Ad",
  href = "https://ads.x.com",
}: {
  action?: string
  href?: string
}) {
  return (
    <section className="w-full py-10 lg:py-20">
      <div className="mx-auto w-full max-w-120 lg:hidden">
        <Scene variant="narrow" action={action} href={href} />
      </div>
      <div className="hidden lg:block">
        <Scene variant="wide" action={action} href={href} />
      </div>
    </section>
  )
}

const layout = {
  wide: {
    frame: "aspect-11/5",
    art: "w-4/5",
    tag: "top-[23%] left-1/4",
    button: "top-[73%] left-[65%]",
    title: "top-[48%]",
  },
  narrow: {
    frame: "aspect-2/3",
    art: "w-full",
    tag: "top-[20%] left-[5%]",
    button: "top-[70%] left-3/4",
    title: "top-[45%]",
  },
}

function Scene({
  variant,
  action,
  href,
}: {
  variant: "wide" | "narrow"
  action: string
  href: string
}) {
  const at = layout[variant]
  return (
    <div className={`relative w-full ${at.frame}`}>
      <div className="flex size-full items-center justify-center">
        <CrossingRods
          variant={variant}
          className={`${at.art} max-h-full text-gray-1000`}
        />
      </div>
      <div className={`absolute ${at.tag}`}>
        <Tag>{"Built for What's Next"}</Tag>
      </div>
      <h2
        className={`absolute left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col gap-2 bg-background-100 p-3 text-center whitespace-nowrap ${at.title}`}
      >
        <span className="block text-heading-32 text-gray-1000">
          <XText>{"Your audience is on >x<."}</XText>
        </span>
        <span className="block text-heading-32 text-gray-900">
          Your ads should be too.
        </span>
      </h2>
      <div className={`absolute -translate-x-1/2 ${at.button}`}>
        <span className="inline-flex border border-gray-1000 bg-background-100 p-2">
          <Button
            shape="rounded"
            size="sm"
            nativeButton={false}
            render={<a href={href} />}
          >
            {action}
          </Button>
        </span>
      </div>
    </div>
  )
}

// A ruled label with the mark on a solid tile, the way x.com captions its
// drawings.
export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-stretch gap-2 border border-gray-1000 bg-background-100 pr-2 text-label-12 text-gray-1000 max-lg:gap-3.5 max-lg:pr-3.5 max-lg:text-label-16">
      <span className="flex shrink-0 items-center justify-center bg-gray-1000 p-1 text-background-100 max-lg:p-2">
        <XLogo className="size-3 max-lg:size-5" />
      </span>
      <span className="py-0.5 max-lg:py-1">{children}</span>
    </span>
  )
}
