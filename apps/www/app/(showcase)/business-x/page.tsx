import type { Metadata } from "next"

import {
  BusinessMobileNav,
  BusinessRail,
} from "@/components/business-x/sidebar"
import { Contact } from "@/components/business-x/contact"
import { Features } from "@/components/business-x/features"
import { XLogo } from "@/components/business-x/x-logo"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
  title: "X Business",
  description:
    "The first screen of business.x.com rebuilt from ziiz components as shipped.",
}

// A readiness check, not a product page: business.x.com's introduction screen
// and lead form, assembled from components/ui with layout classes only. If
// something looks wrong here, the fix belongs in the component, not here.
//
// Geometry is x.com's: a 1440px centred frame, a 208px rail, then an article
// capped at 1152px and centred in what is left, with 16px of gutter either
// side. At 1512px that is the 1120px column with 56px gutters measured
// earlier; below 1360px the article is simply the remaining width. Inside it
// an eight-column, 16px-gap grid. Vertical rhythm tightens below lg the way
// x.com's does (tablet-lg = 1024px there).
export default function BusinessXPage() {
  return (
    <div
      className="mx-auto flex min-h-svh w-full max-w-360 bg-background-100"
      style={{ "--rail-width": "13rem" } as React.CSSProperties}
    >
      <BusinessRail />
      <main className="flex min-w-0 flex-1 flex-col">
        <BusinessMobileNav />
        <div className="mx-auto flex w-full max-w-288 flex-col px-4">
          <Hero />
          <Separator className="mt-10 lg:mt-0" />
          <div className="pt-10.5 pb-4 lg:pt-20 lg:pb-30">
            <Features />
          </div>
          <div className="pt-10 pb-10 lg:pt-25 lg:pb-25">
            <Contact />
          </div>
        </div>
      </main>
    </div>
  )
}

function Hero() {
  return (
    <section className="flex flex-col pt-4 pb-4 lg:pt-20 lg:pb-16">
      <div className="grid grid-cols-8 gap-4">
        {/* x.com only forces the line break from md; below that the
            headline wraps on its own. */}
        <h1 className="col-span-8 text-heading-48 text-balance text-gray-1000 md:col-span-6">
          {`Increase sales `}
          <br className="max-md:hidden" />
          {`with `}
          <XLogo className="inline size-[0.85em] align-[-0.08em]" />
          {` Ads`}
        </h1>
      </div>
      {/* The site loops an animation here; the panel is left empty on
          purpose so nothing but layout is under test. Its ratio steps with
          the viewport the way x.com's does: 5/3, 2/1 from md, 11/4 from lg. */}
      <div className="mt-6 bg-gray-100">
        <AspectRatio ratio={5 / 3} className="md:aspect-2/1 lg:aspect-11/4" />
      </div>
      <div className="mt-6 grid grid-cols-8 gap-4">
        <div className="col-span-7 flex flex-col items-start gap-8 lg:col-span-3 lg:col-start-5 lg:gap-4">
          <p className="w-full text-copy-16 text-balance text-gray-1000 lg:text-copy-13">
            Create powerful ads that attract the right customers. Watch your
            business grow.
          </p>
          <div className="flex gap-3">
            <Button shape="rounded" size="sm">
              Create your Ad
            </Button>
            <Button shape="rounded" size="sm" variant="secondary">
              Talk to an Ads Expert
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
