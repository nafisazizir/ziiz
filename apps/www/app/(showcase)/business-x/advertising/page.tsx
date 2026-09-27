import type { Metadata } from "next"

import { PerformanceCards } from "@/components/art/banners/performance-cards"
import { FanIn } from "@/components/art/marks/fan-in"
import { FunnelGrid } from "@/components/art/marks/funnel-grid"
import { PetalDiamond } from "@/components/art/marks/petal-diamond"
import { RadarRing } from "@/components/art/marks/radar-ring"
import { RaySquare } from "@/components/art/marks/ray-square"
import { ToneRows } from "@/components/art/marks/tone-rows"
import { AdCredit } from "@/components/business-x/ad-credit"
import { BenefitGrid, type Benefit } from "@/components/business-x/benefit-grid"
import { Contact } from "@/components/business-x/contact"
import { Faq, type Question } from "@/components/business-x/faq"
import { BusinessFrame } from "@/components/business-x/frame"
import { Hero } from "@/components/business-x/hero"
import {
  AmplifyMock,
  BoostMock,
  CarouselMock,
  CollectionMock,
  DynamicMock,
  MentionsMock,
  PromotedMock,
} from "@/components/business-x/mocks/ad-formats"
import { AdsManager } from "@/components/business-x/mocks/ads-manager"
import {
  FeatureAction,
  NumberedFeatures,
  type Feature,
} from "@/components/business-x/numbered-features"
import { Section, SectionHeading } from "@/components/business-x/section"
import { QuoteTile, StatTiles } from "@/components/business-x/stat-tiles"
import { StepsTabs, type Step } from "@/components/business-x/steps-tabs"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
  title: "Advertising | X Business",
  description:
    "The Advertising landing of business.x.com rebuilt from ziiz components as shipped.",
}

const benefits: Benefit[] = [
  {
    title: "Real-time conversations",
    copy: "Reach people while they’re researching, comparing, and deciding on what to buy, book, download, try, or visit.",
    mark: RaySquare,
    start: 2,
  },
  {
    title: "Reach influential audiences",
    copy: "Connect with high-value audiences who shape opinions, decisions, and spending.",
    mark: RadarRing,
  },
  {
    title: "Own the moment",
    copy: "Show up where news breaks, products launch, trends start, and attention builds.",
    mark: FunnelGrid,
  },
  {
    title: "Earn attention",
    copy: "Place your message inside conversations people actively choose to engage with.",
    mark: PetalDiamond,
  },
  {
    title: "Precise targeting",
    copy: "Reach the right audience with keywords, followers, location, and conversation signals.",
    mark: FanIn,
  },
  {
    title: "Built for every business",
    copy: "Start with any budget, learn fast, and scale campaigns.",
    mark: ToneRows,
  },
]

const stepActions = (
  <>
    <Button
      shape="rounded"
      size="sm"
      nativeButton={false}
      render={<a href="https://ads.x.com" />}
    >
      Get started
    </Button>
    <Button
      shape="rounded"
      size="sm"
      variant="secondary"
      nativeButton={false}
      render={<a href="#contact" />}
    >
      Talk to an Ads expert
    </Button>
  </>
)

const steps: Step[] = [
  {
    title: "Choose your objective",
    copy: "Choose the outcome you want to achieve. Whether your goal is sales, leads, website traffic, engagement, video views, or app installs, we’ll help optimize your campaign around the results that matter most to your business.",
    actions: stepActions,
    panel: <AdsManager step="campaign" />,
  },
  {
    title: "Define your targeting",
    copy: "Reach the right audience with precision. Target keywords, interests, followers, location, and more. Set a budget that fits your goals and stay in control as your campaign runs.",
    actions: stepActions,
    panel: <AdsManager step="adgroup" />,
  },
  {
    title: "Create your ad",
    copy: "Bring your campaign to life. Use new creative or promote an existing post, choose from a range of formats that best support your objective and audience.",
    actions: stepActions,
    panel: <AdsManager step="ad" />,
  },
  {
    title: "Launch and optimize",
    copy: "Improve performance as results come in. Monitor campaigns in real time, make informed adjustments, and scale what’s delivering the strongest results.",
    actions: stepActions,
    panel: <AdsManager step="results" />,
  },
]

const create = (
  <FeatureAction href="https://ads.x.com">Create this format</FeatureAction>
)

const formats: Feature[] = [
  {
    title: "Amplify",
    copy: "Reach engaged audiences alongside premium video content. Ideal for awareness and product launches.",
    mock: <AmplifyMock />,
    scene: 256,
    wide: true,
    action: create,
  },
  {
    title: "Image + carousel ads",
    copy: "Showcase up to six products, services, or stories with eye-catching creative. Perfect for promotions and traffic.",
    mock: <CarouselMock />,
    scene: 192,
    panelFirst: true,
    action: create,
  },
  {
    title: "Collection + shoppable ads",
    copy: "Help people discover and shop products. Great for ecommerce brands, catalogs, and seasonal campaigns.",
    mock: <CollectionMock />,
    scene: 192,
    panelFirst: true,
    action: create,
  },
  {
    title: "Promoted posts",
    copy: "Turn top-performing content into ads in a few clicks. Increase reach and engagement instantly.",
    mock: <PromotedMock />,
    scene: 320,
    wide: true,
    panelFirst: true,
    action: create,
  },
  {
    title: "Dynamic product ads",
    copy: "Automatically promote products from your catalog. Ideal for retargeting shoppers and driving sales.",
    mock: <DynamicMock />,
    scene: 224,
    panelFirst: true,
    action: create,
  },
  {
    title: "Boost existing posts",
    copy: "Get more views on your posts or @ mentions. Additional features for Premium Business.",
    mock: <BoostMock />,
    scene: 224,
    panelFirst: true,
    action: create,
  },
  {
    title: "Mentions Boost",
    copy: "Allows premium business users to boost organic posts that mention their brand, extending their reach and visibility.",
    mock: <MentionsMock />,
    scene: 240,
    wide: true,
    panelFirst: true,
    action: create,
  },
]

const questions: Question[] = [
  {
    q: "Is there a minimum budget to advertise?",
    a: [
      [
        "No. You can start with a budget that fits your goals and scale up as you learn what performs best. Add a payment method in Ads Manager, you’re only charged when ads run.",
      ],
    ],
  },
  {
    q: "How do I get started?",
    a: [
      [
        "Log into ",
        { a: "https://ads.x.com", r: ["ads.x.com"] },
        " with your X account, set your country/time zone/currency (set once), add billing info, then click “Create campaign” and follow the prompts. Optimize your profile with a bio, photo, and link first.",
      ],
    ],
  },
  {
    q: "How quickly can my campaign go live?",
    a: [
      [
        "Campaigns can launch within minutes to hours after submission and review/approval. Simple setups and compliant creatives typically go live fastest.",
      ],
    ],
  },
  {
    q: "What kind of businesses can advertise?",
    a: [
      [
        "Most legitimate businesses and organizations can advertise if their account complies with X Rules, Ads Policies, and applicable laws. Restricted categories (e.g., certain political or financial) may need pre-approval.",
      ],
    ],
  },
  {
    q: "Do I need marketing experience?",
    a: [
      [
        "No. X Ads Manager offers guided and simplified flows (including one-click sales campaign setup), plus X Ads Academy tutorials and templates for beginners.",
      ],
    ],
  },
  {
    q: "Can I get help setting up my first campaign?",
    a: [
      [
        "Yes, use in-platform guides, the Help Center, @AdsSupport via DM, or the “Speak with an Expert” option. You can also invite team members or use success stories for inspiration.",
      ],
    ],
  },
  {
    q: "What advertising formats are available?",
    a: [
      [
        "Image ads, Video ads (including Vertical Video), Collection Ads, Carousel-style, and native Promoted Posts. All blend seamlessly in the timeline, choose based on your objective.",
      ],
    ],
  },
]

// business.x.com/en/advertising: the hero, why advertise, the ad credit,
// results, the campaign steps, the formats, the lead form and the FAQ. The
// page ends on the footer; the closing call to action is not here.
export default function AdvertisingPage() {
  return (
    <BusinessFrame>
      <Hero
        title={
          <>
            {`Real-time conversations. `}
            <br className="max-md:hidden" />
            {`Real results`}
          </>
        }
        description="Reach high-intent audiences, participate in real-time conversations, and drive measurable business results with X Ads."
        actions={
          <>
            <Button
              shape="rounded"
              size="sm"
              nativeButton={false}
              render={<a href="https://ads.x.com" />}
            >
              Get Started
            </Button>
            <Button
              shape="rounded"
              size="sm"
              variant="secondary"
              nativeButton={false}
              render={<a href="#contact" />}
            >
              Talk to an Ads Expert
            </Button>
          </>
        }
        art={PerformanceCards}
      />
      <Separator className="mt-10 lg:mt-0" />
      <Section>
        <SectionHeading
          title="Why advertise on X?"
          subtitle="The internet talks here first"
        />
        <BenefitGrid items={benefits} />
      </Section>
      <AdCredit />
      <Section className="pt-4 pb-4 lg:pt-20 lg:pb-30">
        <SectionHeading
          title="Built for business impact"
          subtitle="Backed by measurable results"
          actions={
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
                render={<a href="#contact" />}
              >
                Talk to an Ads expert
              </Button>
            </>
          }
        />
        <StatTiles
          className="lg:grid-rows-[auto_auto]"
          items={[
            {
              value: "2.4x",
              label:
                "New customer ROAS for men’s apparel advertisers using the new X Ads Manager.",
              col: 1,
              row: 2,
            },
            {
              value: "18%",
              label:
                "More conversions from new customers compared to other platforms for retail advertisers on X.",
              height: "lg",
              col: 3,
              row: 1,
              rowSpan: 2,
            },
            {
              value: "4.74x",
              label:
                "Incremental lift using in-feed video ads in the new X Ads Manager.",
              col: 5,
              row: 1,
            },
            {
              value: "85%",
              label:
                "Of net new customers for retailer advertisers came from the new X Ads Manager.",
              height: "md",
              col: 7,
              row: 1,
            },
          ]}
        >
          <QuoteTile
            className="lg:col-start-5 lg:row-start-2"
            quote='"Despite the challenges facing the PC industry, X consistently delivered results. We averaged 10x ROAS across the quarter and never dropped below 4x in any single week."'
            name="Skytech Gaming"
          />
        </StatTiles>
      </Section>
      <Section rule tight>
        <StepsTabs
          title="Start advertising on X"
          subtitle="Launch your campaign in minutes"
          steps={steps}
        />
      </Section>
      <Section rule className="pt-10.5 pb-4 lg:pt-20 lg:pb-30">
        <SectionHeading
          title="Find the right format"
          subtitle="Built to drive results"
        />
        <NumberedFeatures items={formats} />
      </Section>
      <div id="contact" className="scroll-mt-14 pt-10 pb-10 lg:pt-25 lg:pb-25">
        <Contact />
      </div>
      <Section rule>
        <Faq items={questions} />
      </Section>
    </BusinessFrame>
  )
}
