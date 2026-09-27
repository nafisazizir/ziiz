import type { Metadata } from "next"
import Link from "next/link"

import { Tracks } from "@/components/art/banners/tracks"
import { BusinessFrame } from "@/components/business-x/frame"
import { Hero } from "@/components/business-x/hero"
import { MarketingCalendar } from "@/components/business-x/marketing-calendar"
import { XText } from "@/components/business-x/runs"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Marketing Calendar | X Business",
  description:
    "The 2026 marketing calendar of business.x.com rebuilt from ziiz components as shipped.",
}

// business.x.com/en/resources/x-marketing-calendar: the hero, then the
// year's moments month by month beside a month picker.
export default function MarketingCalendarPage() {
  return (
    <BusinessFrame>
      <Hero
        title={
          <>
            {`Marketing `}
            <br className="max-md:hidden" />
            {`Calendar`}
          </>
        }
        description={
          <XText>
            {
              "The world’s most powerful moments and movements all unfold on >x<."
            }
          </XText>
        }
        actions={
          <Button
            shape="rounded"
            size="sm"
            nativeButton={false}
            render={<Link href="/business-x/advertising#contact" />}
          >
            Contact Us
          </Button>
        }
        art={Tracks}
      />
      <MarketingCalendar />
    </BusinessFrame>
  )
}
