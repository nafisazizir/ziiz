import type { Metadata } from "next"
import Link from "next/link"
import {
  Analytics01Icon,
  Car01Icon,
  ChartLineData01Icon,
  Cursor01Icon,
  EyeIcon,
  Location01Icon,
  PieChart01Icon,
  Rocket01Icon,
  ShoppingCart01Icon,
  SmartPhone01Icon,
  Tv01Icon,
  UserGroupIcon,
} from "@hugeicons/core-free-icons"

import { GrowthGraph } from "@/components/art/banners/growth-graph"
import { IconGrid, type Benefit } from "@/components/business-x/benefit-grid"
import { ClosingCta } from "@/components/business-x/closing-cta"
import { BusinessFrame } from "@/components/business-x/frame"
import { Hero } from "@/components/business-x/hero"
import { XText } from "@/components/business-x/runs"
import {
  Body,
  Eyebrow,
  Footnote,
  Section,
  SplitRow,
} from "@/components/business-x/section"
import { XLogo } from "@/components/business-x/x-logo"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Measurement | X Business",
  description:
    "The X Ads Measurement page of business.x.com rebuilt from ziiz components as shipped.",
}

const link = (href: string, label: string) => (
  <p key={label}>
    <a href={href}>{label}</a>.
  </p>
)

const solutions: Benefit[] = [
  {
    title: "Campaign performance in Ads Manager",
    icon: Analytics01Icon,
    copy: (
      <>
        <p>
          Monitor campaign delivery and understand how your X Ads are performing
          by viewing metrics based on your objective. Use metrics such as
          audience reach, frequency, clicks, installs, cost per action, and more
          to optimize the performance of your campaigns.
        </p>
        {link(
          "https://business.x.com/en/help/campaign-measurement-and-analytics/campaign-dashboard",
          "Learn more about X’s campaign dashboard"
        )}
      </>
    ),
  },
  {
    title: "Audience Measurement",
    icon: UserGroupIcon,
    copy: (
      <p>
        Get a demographic breakdown of your X Ads campaigns and use those
        insights to help ensure you’re reaching your target audience. Audience
        Measurement allows you to see age, gender, location, gross ratings
        points metrics, and more.
      </p>
    ),
  },
  {
    title: "Incremental Reach",
    icon: ChartLineData01Icon,
    copy: (
      <p>
        Get a detailed look at how much additional reach your X Ads campaigns
        are delivering, in addition to your TV ad buys. Key metrics include
        incremental reach on X, cost per reach point, and more.
      </p>
    ),
  },
  {
    title: "Viewability",
    icon: EyeIcon,
    copy: (
      <p>
        Find out if your ad was seen by accessing viewability metrics in X’s Ads
        Manager or by partnering with a third-party viewability vendor. Get
        stats on measured ads, in-view ads, fraud rate, and more.
      </p>
    ),
  },
  {
    title: "Brand Lift",
    icon: Rocket01Icon,
    copy: (
      <>
        <p>
          Understand how your campaigns are driving brand lift using X Brand
          Surveys. Measure campaigns (big and small) and see how your ad is
          swaying brand metrics like awareness, favorability, consideration,
          purchase intent, and more. Survey insights can also help you pivot
          your strategy to better drive brand goals. X also partners with
          third-party brand survey vendors to provide you additional
          flexibility.
        </p>
        {link(
          "https://business.x.com/en/help/campaign-measurement-and-analytics/brand-surveys",
          "Learn more about X Brand Surveys"
        )}
      </>
    ),
  },
  {
    title: "Website Conversion Tracking",
    icon: Cursor01Icon,
    copy: (
      <>
        <p>
          Measure how much your X Ads drive website traffic using tools like the
          X Pixel, the Conversions API, or leverage our third-party partner to
          compare performance across platforms. Measure link clicks, site
          visits, conversion events, and more.
        </p>
        <p>
          {`Learn more about Website Conversion Tracking `}
          <a href="https://business.x.com/en/help/campaign-measurement-and-analytics/conversion-tracking-for-websites">
            here
          </a>
          .
        </p>
      </>
    ),
  },
  {
    title: "Mobile App Measurement",
    icon: SmartPhone01Icon,
    copy: (
      <>
        <p>
          Enable mobile app measurement to measure installs, in-app purchases,
          and other in-app events. With this measurement tool, mobile marketers
          can see how their X Ads spend leads to conversions and use those
          insights to create more cost-efficient, optimized campaigns.
        </p>
        <p>
          Advertisers can also opt into our Advanced Mobile Measurement (AMM) to
          receive expanded device-level data, which can be used to develop a
          more in-depth analysis of performance.
        </p>
      </>
    ),
  },
  {
    title: "Location Measurement",
    icon: Location01Icon,
    copy: (
      <p>
        Quantify the impact of X Ads in driving in-store foot traffic.
        Understand outcomes like number of incremental store visits, visit
        rates, and more.
      </p>
    ),
  },
  {
    title: "Buy-Through Rate",
    icon: Car01Icon,
    copy: (
      <p>
        Understand how exposure to X Ads correlates with car sales and use the
        insights to adjust your marketing spend towards the most effective
        channels. The key metric measured is units purchased by the exposed
        served group.
      </p>
    ),
  },
  {
    title: "TV Tune-In",
    icon: Tv01Icon,
    copy: (
      <p>
        Measure the effectiveness of X in driving TV tune-ins. Use this
        measurement to find correlations between X engagement and tune-ins
        across primetime broadcasts, cable programming, streaming series, and
        more.
      </p>
    ),
  },
  {
    title: "Sales Impact",
    icon: ShoppingCart01Icon,
    copy: (
      <p>
        Through sales impact studies, marketers can measure the impact of X Ads
        campaigns on driving lift in online or offline sales and penetration
        across various targeting and creative strategies. Key metrics include
        lift in sales per household, return on ad spend (ROAS), and more.
      </p>
    ),
  },
  {
    title: "Marketing Mix Modeling (MMM)",
    icon: PieChart01Icon,
    copy: (
      <p>
        MMM quantifies the impact of several marketing inputs (e.g. media
        activity, pricing, promotion, etc.) on sales and market share. Measure
        your X Ads campaigns’ return on investment (ROI) by partnering with X to
        gather and share data requested by your MMM vendor. Use the insights to
        help you effectively allocate budget across channels.
      </p>
    ),
  },
]

// business.x.com/en/advertising/measurement: the hero, the "Measure
// outcomes" split, twelve measurement solutions three across, a centred
// "Find the right solution" strip between rules, the closing call to action.
export default function MeasurementPage() {
  return (
    <BusinessFrame>
      <Hero
        title={
          <>
            <XLogo className="inline size-[0.85em] align-[-0.08em]" />
            {` Ads Measurement `}
            <br className="max-md:hidden" />
            {`for smarter decisions`}
          </>
        }
        description={<XText>{"Ready to launch your >x< Ads campaign?"}</XText>}
        actions={
          <Button
            shape="rounded"
            size="sm"
            nativeButton={false}
            render={<a href="https://ads.x.com" />}
          >
            Get started
          </Button>
        }
        art={GrowthGraph}
      />
      <Section tight className="mt-10 gap-8 lg:mt-0 lg:gap-14">
        <h2 className="text-heading-32 text-balance text-gray-1000 lg:max-w-1/2">
          Measure outcomes
          <span className="block text-gray-900">that matter to you</span>
        </h2>
        <SplitRow
          lead={<Eyebrow className="lg:pt-[3px]">Track your impact</Eyebrow>}
        >
          <Body>
            <p>
              <XText>{">x< provides "}</XText>
              <strong>transparency into campaign performance</strong>
              {` through measurement solutions and third-party studies based on your objectives. Our goal is to empower advertisers with measurement solutions to help you `}
              <strong>
                understand how your campaigns help achieve your broader
                marketing and business goals.
              </strong>
            </p>
          </Body>
          <Footnote>
            Please note that the availability for these measurement solutions
            varies by market. Contact your X Account Manager for more
            information.
          </Footnote>
        </SplitRow>
      </Section>
      <Section tight className="pt-0 lg:pt-0">
        <IconGrid items={solutions} />
        <div className="flex flex-col items-center gap-3 border-y border-gray-alpha-400 py-10">
          <div className="flex w-full max-w-103 flex-col gap-1 text-center">
            <p className="text-label-13 text-gray-1000">
              Find the Right Measurement Solution
            </p>
            <p className="text-copy-13 text-gray-900">
              Learn more about the right measurement solutions for your
              campaigns by contacting your X Account Manager. Availability
              varies by market. Don&apos;t have an Account Manager?
            </p>
          </div>
          <Button
            shape="rounded"
            size="sm"
            nativeButton={false}
            render={<Link href="/business-x/advertising#contact" />}
          >
            Contact us
          </Button>
        </div>
      </Section>
      <ClosingCta />
    </BusinessFrame>
  )
}
