import type { Metadata } from "next"
import Link from "next/link"

import { TimelineFrame } from "@/components/art/banners/timeline-frame"
import { FunnelGrid } from "@/components/art/marks/funnel-grid"
import { PetalDiamond } from "@/components/art/marks/petal-diamond"
import { RadarRing } from "@/components/art/marks/radar-ring"
import { RaySquare } from "@/components/art/marks/ray-square"
import { BenefitGrid } from "@/components/business-x/benefit-grid"
import { ClosingCta } from "@/components/business-x/closing-cta"
import { BusinessFrame } from "@/components/business-x/frame"
import { Hero } from "@/components/business-x/hero"
import { PhoneScene } from "@/components/business-x/mocks/feed"
import { TakeoverPhone } from "@/components/business-x/mocks/product-phones"
import { AboutSplit, LeadRows } from "@/components/business-x/product-blocks"
import { XText } from "@/components/business-x/runs"
import {
  Footnote,
  Section,
  SectionHeading,
} from "@/components/business-x/section"
import { StatTiles } from "@/components/business-x/stat-tiles"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Timeline Takeovers | X Business",
  description:
    "business.x.com's Timeline Takeovers page rebuilt from ziiz components as shipped.",
}

const contact = (
  <Button
    shape="rounded"
    size="sm"
    nativeButton={false}
    render={<Link href="/business-x/advertising#contact" />}
  >
    Contact with our Sales Team
  </Button>
)

const stats = [
  {
    value: "2X",
    label: "More effective brand awareness",
    height: "sm" as const,
  },
  {
    value: "3X",
    label: "More effective campaign awareness",
    height: "lg" as const,
  },
  {
    value: "3X",
    label: "More effective ad recall",
    span: 4 as const,
    height: "lg" as const,
  },
]

const when = [
  {
    title: "How Timeline Takeover works",
    copy: (
      <>
        <p>
          {`With Timeline Takeover, advertisers get priority access to logged-in users' first impression of the day, along with additional impressions delivered on people's timelines for 24 hours. The maximum frequency that each person will see your ad is 3x per day.`}
        </p>
        <p>
          We recommend using video ads for Timeline Takeover campaigns, since
          videos will autoplay in timelines. Timeline Takeover can also be
          bundled with Spotlight Takeover for greater impact.
        </p>
      </>
    ),
  },
  {
    title: "When to use Timeline Takeover",
    copy: (
      <>
        <p>
          Timeline Takeover is perfect for brand advertisers who want to quickly
          deliver their message(s) to a massive audience through an immersive
          visual story using video.
        </p>
        <p>
          {`It's an ideal fit for a range of brand objectives including product launches, movie releases, TV premieres, events and sponsorships, sales conferences, and associating with cultural moments. Timeline Takeover also works especially well for maximizing awareness on launch day.`}
        </p>
      </>
    ),
  },
]

const benefits = [
  {
    title: "Mass reach",
    copy: "Advertisers get priority access to people's first impressions as well as subsequent impressions throughout the day to maximize reach.",
    mark: RadarRing,
    start: 2 as const,
  },
  {
    title: "Premium inventory",
    copy: "Multiple studies have proven that these first impressions drive higher time spent viewing video creative and drive higher select brand metrics because you're reaching people when they're most receptive.",
    mark: FunnelGrid,
  },
  {
    title: "Creative that delivers",
    copy: "Rich immersive video creative enables impactful brand storytelling.",
    mark: PetalDiamond,
  },
  {
    title: "Reservable + flat fee",
    copy: "Timeline Takeover packages are easy to plan and buy in advance.",
    mark: RaySquare,
  },
]

const creative = [
  {
    title: "Creative best practices",
    copy: (
      <dl className="flex flex-col gap-4">
        {[
          [
            "Simplified messaging",
            "Keep messaging concise and consistent in your creatives and copy. Only include one product benefit or key message at a time.",
          ],
          [
            "Feed-first assets",
            "Have a sound-off strategy, use high-quality videos, and include branding and/or product messaging in the first few frames.",
          ],
          [
            "Own the moment",
            "Whether you're launching a new campaign or tapping into a major cultural event, be sure to align your creative to the right moment.",
          ],
        ].map(([label, copy]) => (
          <div key={label} className="flex flex-col gap-1">
            <dt className="text-label-13 text-gray-1000">{label}</dt>
            <dd>{copy}</dd>
          </div>
        ))}
      </dl>
    ),
    footnote: (
      <Button
        shape="rounded"
        size="sm"
        variant="secondary"
        className="self-start"
        nativeButton={false}
        render={<Link href="/business-x/advertising/creative-best-practices" />}
      >
        More Video Best Practices
      </Button>
    ),
  },
  {
    title: "Measurement",
    copy: (
      <p>
        <XText>
          {
            ">x< supports third-party (3P) brand survey measurement with Kantar and Nielsen."
          }
        </XText>
      </p>
    ),
    footnote: (
      <Button
        shape="rounded"
        size="sm"
        variant="secondary"
        className="self-start"
        nativeButton={false}
        render={<Link href="/business-x/advertising/measurement" />}
      >
        More on Measurements
      </Button>
    ),
  },
]

// business.x.com/en/products/timeline-takeovers.
export default function TimelineTakeoversPage() {
  return (
    <BusinessFrame>
      <Hero
        title={
          <>
            {`Timeline `}
            <br className="max-md:hidden" />
            {`Takeovers`}
          </>
        }
        description="The first ad of the day at the top of the conversation."
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
        art={TimelineFrame}
      />
      <Section rule className="gap-0">
        <AboutSplit
          eyebrow="About"
          title="What is Timeline Takeover?"
          panel={
            <PhoneScene share={1.3} className="items-start">
              <TakeoverPhone />
            </PhoneScene>
          }
          stats={<div>{contact}</div>}
        >
          <p>
            <XText>
              {
                "Timeline Takeover puts your brand at the top of the conversation as the first ad of the day. People come to >x< to discover what's happening. With Timeline Takeover, your ad is the first ad that will appear when someone opens >x< for the first time that day. Don't just be a part of what's happening, be what's happening with Timeline Takeover."
              }
            </XText>
          </p>
          <p>
            <XText>
              {
                "This is an exclusive, single-day, “mass awareness” ad package of >x<'s most valuable impressions. You can achieve massive reach to our receptive audience over a 24-hour period using immersive, autoplay videos at the top of the timeline. This is the perfect solution for advertisers seeking to maximize brand exposure on a single day, such as a launch day."
              }
            </XText>
          </p>
        </AboutSplit>
      </Section>
      <Section className="pt-4 pb-4 lg:pt-20 lg:pb-30">
        <SectionHeading title="When added to campaigns, Timeline Takeover drives key brand metrics" />
        <StatTiles items={stats} className="max-lg:pt-5" />
        <div className="lg:grid lg:grid-cols-8 lg:gap-x-4">
          <Footnote className="whitespace-pre-line lg:col-span-4 lg:col-start-5">
            <XText>
              {
                "Source: >x< Nielsen Brand Effect Studies, 2017 - 2020. N = 135 US campaigns w/ Timeline Takeover placements; N = 1068 US campaigns without Timeline Takeover placements."
              }
            </XText>
          </Footnote>
        </div>
      </Section>
      <Section className="gap-8 lg:gap-14">
        <SectionHeading
          title="When to use it."
          subtitle="The right moments to make it count."
          className="lg:max-w-1/2"
        />
        <LeadRows items={when} />
      </Section>
      <Section rule>
        <SectionHeading
          title="First impression, then all day."
          subtitle="Reserved in advance, at a flat rate"
        />
        <BenefitGrid items={benefits} columns="thirds" />
      </Section>
      <Section rule className="gap-8 lg:gap-14">
        <SectionHeading
          title="Make the day count"
          subtitle="creative built for the feed"
          className="lg:max-w-1/2"
        />
        <LeadRows items={creative} />
      </Section>
      <ClosingCta />
    </BusinessFrame>
  )
}
