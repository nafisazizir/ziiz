import type { Metadata } from "next"
import Link from "next/link"

import { WorldMarkers } from "@/components/art/sections/world-markers"
import { ClosingCta } from "@/components/business-x/closing-cta"
import { stories } from "@/components/business-x/data/success-stories"
import { BusinessFrame } from "@/components/business-x/frame"
import { StoriesList } from "@/components/business-x/stories-list"
import { XLogo } from "@/components/business-x/x-logo"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Success stories | X Business",
  description:
    "The success stories of business.x.com rebuilt from ziiz components as shipped.",
}

// business.x.com/en/success-stories: a hero that lays the headline, the
// world-markers drawing and the description side by side from 1024px
// (stacked and centred below, the drawing a square), then the filtered
// list and the closing call to action.
export default function SuccessStoriesPage() {
  return (
    <BusinessFrame>
      <section className="flex flex-col pt-10 pb-8 lg:py-[15.27%]">
        <div className="flex flex-col items-center gap-4.5 lg:grid lg:grid-cols-[1fr_auto_1fr_176px_1fr_308px_1fr] lg:items-center lg:gap-0">
          <h1 className="text-center text-heading-48 text-balance text-gray-1000 lg:col-start-2 lg:text-left lg:whitespace-pre-line">
            <XLogo className="inline size-[0.85em] align-[-0.08em]" />
            {` Success stories\naround `}
            <span className="text-gray-900">the world</span>
          </h1>
          <div className="aspect-square w-full overflow-hidden bg-gray-100 text-gray-1000 sm:aspect-3/2 md:aspect-2/1 lg:col-start-4 lg:aspect-[176/332]">
            <WorldMarkers
              variant="wide"
              preserveAspectRatio="xMidYMid slice"
              className="hidden size-full lg:block"
            />
            <WorldMarkers
              variant="narrow"
              preserveAspectRatio="xMidYMid slice"
              className="size-full lg:hidden"
            />
          </div>
          <div className="flex flex-col items-center gap-8 lg:col-start-6 lg:items-start lg:gap-4">
            <p className="text-center text-copy-16 text-balance text-gray-1000 lg:text-left lg:text-copy-13">
              Learn how businesses around the world achieved their goals with X
              Ads and X Marketing Partners.
            </p>
            <Button
              shape="rounded"
              size="sm"
              nativeButton={false}
              render={<Link href="/business-x/advertising#contact" />}
            >
              Contact an X Ads specialist
            </Button>
          </div>
        </div>
      </section>
      <StoriesList stories={stories} />
      <ClosingCta />
    </BusinessFrame>
  )
}
