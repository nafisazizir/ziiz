import type { Metadata } from "next"
import Link from "next/link"

import { Spotlight } from "@/components/art/banners/spotlight"
import { ConversationPair } from "@/components/art/marks/conversation-pair"
import { FanIn } from "@/components/art/marks/fan-in"
import { FunnelGrid } from "@/components/art/marks/funnel-grid"
import { PetalDiamond } from "@/components/art/marks/petal-diamond"
import { RadarRing } from "@/components/art/marks/radar-ring"
import { RaySquare } from "@/components/art/marks/ray-square"
import { BenefitGrid } from "@/components/business-x/benefit-grid"
import { ClosingCta } from "@/components/business-x/closing-cta"
import { BusinessFrame } from "@/components/business-x/frame"
import { Hero } from "@/components/business-x/hero"
import { PhoneScene } from "@/components/business-x/mocks/feed"
import { ExplorePhone } from "@/components/business-x/mocks/product-phones"
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
  title: "Spotlight Takeovers | X Business",
  description:
    "business.x.com's Spotlight Takeovers page rebuilt from ziiz components as shipped.",
}

const stats = [
  {
    value: "3X",
    label: "More effective message association",
    height: "sm" as const,
  },
  { value: "3X", label: "Increase in Trend engagement", height: "lg" as const },
  {
    value: "9X",
    label: "More effective favorability metrics",
    span: 4 as const,
    height: "lg" as const,
  },
]

const when = [
  {
    title: "How Spotlight Takeovers work",
    copy: (
      <>
        <p>
          <XText>
            {
              "Spotlight Takeovers appear in the top banner of the “For You” section and the trend name and description will also appear as first or second slots of the “Trending” section in the Explore tab and “What’s Happening” module on >x<.com. When someone clicks on a Promoted Trend, they’ll see a post from your brand at the top of the search results, followed by organic posts directly from the conversation surrounding the trend. Spotlight Takeovers will run for 24 hours within a country from midnight to midnight, and can also be bundled with Timeline Takeover for greater impact."
            }
          </XText>
        </p>
        <p>
          Each Spotlight Takeover includes three key components: the Trend name
          (max 20 characters), Trend description (optional, max 30 characters),
          and Companion Posts. Takeovers run for 24 hours and reach everyone in
          the targeted country from midnight to midnight. Companion Posts will
          appear in people’s timelines, help encourage interaction, and maximize
          scale and impact.
        </p>
        <p>
          Spotlight Takeover supports up to 3-minute videos, GIFs, and static
          images. Creatives will display on both mobile and desktop, with the ad
          running edge-to-edge on mobile. Spotlight Takeover ads will appear at
          the top of the For you tab in Explore for the full 24 hours of the
          campaign.
        </p>
      </>
    ),
  },
  {
    title: "When to use Spotlight Takeovers",
    copy: (
      <>
        <p>
          <XText>
            {
              "Spotlight Takeovers are great for complementing the launch of something new or the promotion of a big event at scale. Breaking your news on >x< with a Spotlight Takeover can drive mass awareness, build interest, and drive conversation around a product launch, app launch, message launch, or new promotion."
            }
          </XText>
        </p>
        <p>
          Spotlight Takeovers also benefit brands looking to connect with what’s
          happening by maximizing discovery, building relevance, and securing
          adjacency to what you know will be trending that day — such as a
          cultural event, sporting event, holiday, national (topic here) day, or
          industry news.
        </p>
        <p>
          <XText>
            {
              "Spotlight Takeovers are particularly strong for launching a new teaser trailer, for example, by maximizing awareness to a broad audience with engaging, immersive video. According to internal >x< data, people are 3X more likely to click-through an ad in the Spotlight Takeover unit — making it the perfect product to put your message in."
            }
          </XText>
        </p>
      </>
    ),
  },
]

const benefits = [
  {
    title: "Premium placement",
    copy: "Be front and center where people go to see what's happening.",
    mark: RadarRing,
    start: 2 as const,
  },
  {
    title: "Exclusive ownership",
    copy: "Maintain 24-hour ownership of the top Trends list and Explore tab. Only one client per day per country can run a Spotlight Takeover.",
    mark: FunnelGrid,
  },
  {
    title: "Massive audience reach",
    copy: "Raise awareness at scale around a topic, launch, or event with Companion Posts.",
    mark: FanIn,
  },
  {
    title: "Ignite brand conversation",
    copy: "With accompanying media posts in timelines.",
    mark: ConversationPair,
  },
  {
    title: "Secure adjacency",
    copy: "To what you know will be organically trending that day, from cultural events and holidays, to competitor's launches.",
    mark: PetalDiamond,
  },
  {
    title: "Reservable + flat fee",
    copy: "Spotlight Takeovers are easy to plan and buy in advance, allowing for efficient CPM.",
    mark: RaySquare,
  },
]

const practices = [
  [
    "Integrate your content",
    "Pin a relevant post to the top of your profile for those who click through to your profile to keep the experience consistent.",
  ],
  [
    "Sustain the buzz",
    "Extend the conversation and engagement created by the Spotlight Takeover by running additional campaigns on the days following the takeover.",
  ],
  [
    "Leverage the audience",
    "Use Post Engager targeting in future campaigns to retarget people who have engaged with or were exposed to your Spotlight Takeover to capitalize on that valuable audience.",
  ],
  [
    "Keep it simple",
    "Focus your copy and creative on a single topic, and make it declarative and intriguing. Avoid click-bait phrases. Use the spotlight description to provide further context if needed, but don’t duplicate your handle as it will have its own placement.",
  ],
  [
    "Keep it visual",
    "Use visually engaging videos that around one minute long to ensure a continuous clean loop, and allow sufficient buffer time for viewers to see your logo or CTA before it replays. Don’t use a white background, place your logo in the top-left corner or middle of the frame, and avoid flashing or too much text overlay.",
  ],
  [
    "Use Creative Swapping",
    "To swap your creative on the day you’re running your Spotlight Takeover. This feature gives you the flexibility to extend your message and further tell your story.",
  ],
]

const creative = [
  {
    title: "Creative best practices",
    copy: (
      <dl className="flex flex-col gap-4">
        {practices.map(([label, copy]) => (
          <div key={label} className="flex flex-col gap-1">
            <dt className="text-label-13 text-gray-1000">{label}</dt>
            <dd>{copy}</dd>
          </div>
        ))}
      </dl>
    ),
  },
  {
    title: "Measurement",
    copy: (
      <>
        <p>
          Track Spotlight Takeover metrics in Ads Manager, including Spotlight
          impressions, mentions, posts displays, Companion Post impressions,
          engagement rate, and impressions and clicks on your Promoted Trend.
        </p>
        <p>
          Additionally, you can use brand effect studies to measure the
          “Companion Post” portion of your Promoted Trend buy that appears in
          the home timeline and shows up in search results.
        </p>
      </>
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

// business.x.com/en/products/spotlight-takeovers.
export default function SpotlightTakeoversPage() {
  return (
    <BusinessFrame>
      <Hero
        title={
          <>
            {`Spotlight `}
            <br className="max-md:hidden" />
            {`takeovers`}
          </>
        }
        description={
          <XText>
            {
              "Spotlight Takeovers pair the undeniable stopping power of video with the premium real estate of >x<'s Explore tab over the course of a 24 hour takeover."
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
        art={Spotlight}
      />
      <Section rule className="gap-0">
        <AboutSplit
          eyebrow="About"
          title="What is spotlight takeover?"
          panel={
            <PhoneScene share={1.3} className="items-start">
              <ExplorePhone />
            </PhoneScene>
          }
          stats={
            <div>
              <Button
                shape="rounded"
                size="sm"
                nativeButton={false}
                render={<Link href="/business-x/advertising#contact" />}
              >
                Contact with our Sales Team
              </Button>
            </div>
          }
        >
          <p>
            <XText>
              {
                "Spotlight Takeovers put your immersive video creative where the conversations starts — the Explore tab. The Explore tab is home to everything that’s trending on >x< (and in the world), all in one place. Don’t just be a part of what’s happening, be what’s happening with Spotlight Takeovers."
              }
            </XText>
          </p>
          <p>
            <XText>
              {
                'This product gives you a high-impact 24-hour takeover of the Explore Tab and the "What\'s happening" module on >x<.com — where people go to view trends and top conversations in real time. Spotlight Takeovers are complemented by media-forward companion posts that appear in the Home Timeline, which together help maximize awareness and conversation around a certain topic, launch, or event.'
              }
            </XText>
          </p>
        </AboutSplit>
      </Section>
      <Section className="pt-4 pb-4 lg:pt-20 lg:pb-30">
        <SectionHeading title="When added to campaigns, Spotlight Takeover generates impact throughout the funnel" />
        <StatTiles items={stats} className="max-lg:pt-5" />
        <div className="lg:grid lg:grid-cols-8 lg:gap-x-4">
          <Footnote className="whitespace-pre-line lg:col-span-4 lg:col-start-5">
            <XText>
              {
                "Source: >x< Nielsen Brand Effect Studies, 2020. N = 13 US Campaigns w/ Spotlight Takeover activations; N = 144 US campaigns without Spotlight activations. EyeSee New Ad Product Research, 2016."
              }
            </XText>
          </Footnote>
        </div>
      </Section>
      <Section className="gap-8 lg:gap-14">
        <SectionHeading
          title="When to use it"
          subtitle="The right moments to make it count"
          className="lg:max-w-1/2"
        />
        <LeadRows items={when} />
      </Section>
      <Section rule>
        <SectionHeading
          title="The whole tab is yours"
          subtitle="for a full 24 hours"
        />
        <BenefitGrid items={benefits} columns={4} />
      </Section>
      <Section rule className="gap-8 lg:gap-14">
        <SectionHeading
          title="Make it land"
          subtitle="creative that earns the placement"
          className="lg:max-w-1/2"
        />
        <LeadRows items={creative} />
      </Section>
      <ClosingCta />
    </BusinessFrame>
  )
}
