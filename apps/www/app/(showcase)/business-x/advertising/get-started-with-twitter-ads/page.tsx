import type { Metadata } from "next"
import Link from "next/link"

import { PerspectiveFrame } from "@/components/art/banners/perspective-frame"
import { ClosingCta } from "@/components/business-x/closing-cta"
import { BusinessFrame } from "@/components/business-x/frame"
import { Hero } from "@/components/business-x/hero"
import { AdsManager } from "@/components/business-x/mocks/ads-manager"
import { XText } from "@/components/business-x/runs"
import { Section } from "@/components/business-x/section"
import { StepsTabs, type Step } from "@/components/business-x/steps-tabs"
import { XLogo } from "@/components/business-x/x-logo"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Get started | X Business",
  description:
    "The Getting started page of business.x.com rebuilt from ziiz components as shipped.",
}

const actions = (
  <>
    <Button
      shape="rounded"
      size="sm"
      nativeButton={false}
      render={<a href="https://ads.x.com" />}
    >
      Create your Ad
    </Button>
    <Button
      shape="rounded"
      size="sm"
      variant="secondary"
      nativeButton={false}
      render={<Link href="/business-x/advertising#contact" />}
    >
      Talk to an Ads expert
    </Button>
  </>
)

const steps: Step[] = [
  {
    title: "Create an >x< account",
    copy: (
      <p>
        <XText>
          {
            "You need an >x< account to run ads. Business or personal both work. If you already have one, skip this step."
          }
        </XText>
      </p>
    ),
    actions,
    panel: <AdsManager step="signin" />,
  },
  {
    title: "Create your ads",
    copy: (
      <p>
        <XText>
          {
            "Write your copy, choose a format, and upload your visuals. >x< supports images, videos, and carousels."
          }
        </XText>
      </p>
    ),
    actions,
    panel: <AdsManager step="ad" />,
  },
  {
    title: "Build your campaign",
    copy: (
      <p>
        Set your objective, define your audience, and choose a budget and
        timeline. The campaign builder guides you through each field.
      </p>
    ),
    actions,
    panel: <AdsManager step="adgroup" />,
  },
  {
    title: "Launch and measure",
    copy: (
      <p>
        <XText>
          {
            "Once live, >x< Ads Manager tracks impressions, clicks, and conversions. Review and adjust from the same dashboard."
          }
        </XText>
      </p>
    ),
    actions,
    panel: <AdsManager step="results" />,
  },
]

// business.x.com/en/advertising/get-started-with-twitter-ads: the hero, the
// four steps on a tab strip, the closing call to action.
export default function GetStartedPage() {
  return (
    <BusinessFrame>
      <Hero
        title={
          <>
            {`Getting started `}
            <br className="max-md:hidden" />
            {`with `}
            <XLogo className="inline size-[0.85em] align-[-0.08em]" />
            {` Ads`}
          </>
        }
        description={
          <XText>
            {
              "Get your business started on >x< and leverage the power of the platform."
            }
          </XText>
        }
        actions={
          <Button
            shape="rounded"
            size="sm"
            nativeButton={false}
            render={<a href="https://ads.x.com" />}
          >
            Create an Ad
          </Button>
        }
        art={PerspectiveFrame}
      />
      <Section rule tight className="mt-10 lg:mt-0">
        <StepsTabs
          title="Simple from the start"
          subtitle="Four steps to your first live campaign"
          steps={steps}
        />
      </Section>
      <ClosingCta />
    </BusinessFrame>
  )
}
