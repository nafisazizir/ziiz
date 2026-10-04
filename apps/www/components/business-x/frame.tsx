import { FloatingBar } from "@/components/business-x/floating-bar"
import { Footer } from "@/components/business-x/footer"
import { SiteMobileNav, SiteRail } from "@/components/business-x/sidebar"
import type { SiteKey } from "@/components/business-x/sites"
import { EdgeFade } from "@/components/edge-fade"
import { cn } from "@/lib/utils"

// The page frame every x.com site screen sits in: business.x.com's, which
// money.x.com and help.x.com share down to the rail and the footer. Only
// Business floats the pill bar. Geometry is x.com's: a
// 1440px centred frame, a 208px rail, then an article capped at 1152px and
// centred in what is left, with 16px of gutter either side. At 1512px that is
// the 1120px column with 56px gutters measured earlier; below 1360px the
// article is simply the remaining width. The post page widens the cap to
// 1168px and the gutter to 20/24px so the same 1120px column survives.
// The footer spans the whole of main under the article, and the pill bar
// floats over the bottom of every page.
//
// Main's top and bottom edges are frosted the way the docs shell's are. The
// strips stay inside main: the rail is a sticky column that never scrolls
// past an edge, so fading it would only wash out its first and last rows.
// --header-height is the mobile header's 56px until the rail takes over.
//
// --rail-content-top is where the rail's first link starts: 24px of padding,
// the 32px site switcher, 24px of gap. Anything in the article that should
// line up with the rail's rows (the blog filter, the post breadcrumb)
// hangs off it.
export function SiteFrame({
  site,
  className,
  children,
}: {
  site: SiteKey
  className?: string
  children: React.ReactNode
}) {
  return (
    <div
      className="mx-auto flex min-h-svh w-full max-w-360 bg-background-100 [--header-height:--spacing(14)] md:[--header-height:0px]"
      style={
        {
          "--rail-width": "13rem",
          "--rail-content-top": "5rem",
          "--edge-fade": "var(--color-background-100)",
        } as React.CSSProperties
      }
    >
      <SiteRail site={site} />
      <main className="flex min-w-0 flex-1 flex-col">
        <SiteMobileNav site={site} />
        <EdgeFade side="top" />
        <div
          className={cn(
            "mx-auto flex w-full max-w-288 flex-1 flex-col px-4",
            className
          )}
        >
          {children}
        </div>
        <Footer />
        <EdgeFade side="bottom" />
      </main>
      {site === "business" && <FloatingBar />}
    </div>
  )
}

type FrameProps = Omit<React.ComponentProps<typeof SiteFrame>, "site">

export function BusinessFrame(props: FrameProps) {
  return <SiteFrame site="business" {...props} />
}

export function MoneyFrame(props: FrameProps) {
  return <SiteFrame site="money" {...props} />
}

export function HelpFrame(props: FrameProps) {
  return <SiteFrame site="help" {...props} />
}
