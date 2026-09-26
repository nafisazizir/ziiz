import type { Metadata } from "next"

import { Contact } from "@/components/business-x/contact"
import { Features } from "@/components/business-x/features"
import { BusinessFrame } from "@/components/business-x/frame"
import { Hero } from "@/components/business-x/hero"
import { XLogo } from "@/components/business-x/x-logo"
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
// The frame's geometry is documented on BusinessFrame; the vertical rhythm
// tightens below lg the way x.com's does (tablet-lg = 1024px there).
export default function BusinessXPage() {
  return (
    <BusinessFrame>
      <Hero
        title={
          <>
            {/* x.com only forces the line break from md; below that the
                headline wraps on its own. */}
            {`Increase sales `}
            <br className="max-md:hidden" />
            {`with `}
            <XLogo className="inline size-[0.85em] align-[-0.08em]" />
            {` Ads`}
          </>
        }
        description="Create powerful ads that attract the right customers. Watch your business grow."
        actions={
          <>
            <Button shape="rounded" size="sm">
              Create your Ad
            </Button>
            <Button shape="rounded" size="sm" variant="secondary">
              Talk to an Ads Expert
            </Button>
          </>
        }
      />
      <Separator className="mt-10 lg:mt-0" />
      <div className="pt-10.5 pb-4 lg:pt-20 lg:pb-30">
        <Features />
      </div>
      <div className="pt-10 pb-10 lg:pt-25 lg:pb-25">
        <Contact />
      </div>
    </BusinessFrame>
  )
}
