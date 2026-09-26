import {
  BusinessMobileNav,
  BusinessRail,
} from "@/components/business-x/sidebar"
import { cn } from "@/lib/utils"

// The page frame every business.x.com screen sits in. Geometry is x.com's: a
// 1440px centred frame, a 208px rail, then an article capped at 1152px and
// centred in what is left, with 16px of gutter either side. At 1512px that is
// the 1120px column with 56px gutters measured earlier; below 1360px the
// article is simply the remaining width. The post page widens the cap to
// 1168px and the gutter to 20/24px so the same 1120px column survives.
//
// --rail-content-top is where the rail's first link starts: 24px of padding,
// the 32px site switcher, 24px of gap. Anything in the article that should
// line up with the rail's rows (the blog filter, the post breadcrumb)
// hangs off it.
export function BusinessFrame({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <div
      className="mx-auto flex min-h-svh w-full max-w-360 bg-background-100"
      style={
        {
          "--rail-width": "13rem",
          "--rail-content-top": "5rem",
        } as React.CSSProperties
      }
    >
      <BusinessRail />
      <main className="flex min-w-0 flex-1 flex-col">
        <BusinessMobileNav />
        <div
          className={cn(
            "mx-auto flex w-full max-w-288 flex-col px-4",
            className
          )}
        >
          {children}
        </div>
      </main>
    </div>
  )
}
