import type { Metadata } from "next"
import Link from "next/link"

import { VideoPlayer } from "@/components/art/banners/video-player"
import { ClosingCta } from "@/components/business-x/closing-cta"
import { BusinessFrame } from "@/components/business-x/frame"
import { Hero } from "@/components/business-x/hero"
import { AdsManager } from "@/components/business-x/mocks/ads-manager"
import { PhoneScene } from "@/components/business-x/mocks/feed"
import { VerticalPhone } from "@/components/business-x/mocks/vertical"
import {
  AboutSplit,
  LeadRows,
  PanelRow,
  SpecRow,
  StatRow,
  WhyRows,
} from "@/components/business-x/product-blocks"
import { ResourceCards } from "@/components/business-x/resource-cards"
import { XText } from "@/components/business-x/runs"
import {
  Eyebrow,
  Footnote,
  Section,
  SectionHeading,
  SplitRow,
} from "@/components/business-x/section"
import { StepsTabs } from "@/components/business-x/steps-tabs"
import { Button } from "@/components/ui/button"
import {
  IconBadgeCc,
  IconClock,
  IconDeviceMobile,
  IconVolume,
} from "@tabler/icons-react"

export const metadata: Metadata = {
  title: "Vertical Video Ads | X Business",
  description:
    "business.x.com's Vertical Video Ads page rebuilt from ziiz components as shipped.",
}

const whyRows = [
  {
    title: "Expand the reach of your video content",
    copy: (
      <>
        <p>
          <XText>
            {
              ">x<'s vertical video surface is the best place to discover new content and engage with brands on the platform. People use vertical video to immerse in their passions - led by sports, music, entertainment, food and politics [4]. This presents an opportunity to reach your audiences around a wider variety of contextually rich content."
            }
          </XText>
        </p>
        <p>
          Running Vertical Video Ads also provides an incremental 10% increase
          in reach compared to running ads in the Home Timeline alone.
        </p>
      </>
    ),
    stat: {
      value: "+10%",
      label:
        "Incremental Exposure With Vertical Video Ads VS Home Timeline Alone [3]",
    },
    panel: (
      <PhoneScene share={1.2} className="items-start pt-10">
        <VerticalPhone text="New customers: bet $5, win $150 in bonus bets." />
      </PhoneScene>
    ),
  },
  {
    title: "Drive more impactful video views & conversions",
    copy: (
      <>
        <p>
          Vertical Video Ads is the most engaging ad format we’ve released. With
          full-screen viewability and sound on by default, your product and
          message is front and center.
        </p>
        <p>
          You can also include a call-to-action button to drive users to your
          website or app. This button appears after the viewer has watched one
          second of your ad.
        </p>
        <p>
          We’ve observed that users are 7x more likely to follow, repost, like,
          and click the URLs of Vertical Video Ads compared to the same ad on
          the Home Timeline [3].
        </p>
      </>
    ),
    stat: {
      value: "7X",
      label:
        "Higher Social Engagement Rate Compared To The Same Ad in Home Timeline [3]",
    },
    panel: (
      <PhoneScene share={1.2} className="items-start pt-10">
        <VerticalPhone text="Coffee made fresh!" cta="Shop now" />
      </PhoneScene>
    ),
  },
  {
    title: "Buy pre-screened, brand suitable inventory",
    copy: (
      <>
        <p>
          <XText>
            {
              ">x< has partnered with Integral Ad Science to bring you pre-screened, brand suitable inventory in >x<'s vertical video surface."
            }
          </XText>
        </p>
        <p>
          <XText>
            {
              "This pre-screening capability enables IAS to classify organic content on >x< within the industry standard safety framework. It then lets your brand set more personalized placement preferences that rely on IAS’s classifications before you run a campaign."
            }
          </XText>
        </p>
        <p>
          <XText>
            {
              "In other words, they’ll help you navigate >x< to achieve the ideal level of suitability control specific to your brand – and they can measure how this works on the back-end too."
            }
          </XText>
        </p>
      </>
    ),
    note: "Now available to advertisers in the U.S. only.",
    panel: (
      <PhoneScene share={1.2} className="items-start pt-10">
        <VerticalPhone
          name="Field Notes"
          handle="@fieldnotes"
          ad={false}
          text="Golden hour over the ridge."
        />
      </PhoneScene>
    ),
  },
]

const sources = [
  "Source 1: >x< Internal, Metric Center. User Active Sessions - Video. October 1st, 2023 - October 31st, 2023. Global.",
  "Source 2: >x< Internal, Metric Center. User Active Minutes. Immersive Media. Unique Count. 28 day average. October 1st, 2023 - October 31st, 2023. Global.",
  "Source 3: Vertical Video Ads initial test results in May 2023. Global.",
  "Source 4: >x< Internal, October 2023. Global. Percent of audience viewing content categories in Immersive Media Viewer.",
]

const steps = [
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
    panel: <AdsManager step="signin" />,
  },
  {
    title: "Start your campaign",
    copy: (
      <p>
        {`Go to `}
        <a href="https://ads.x.com" target="_blank" rel="noopener noreferrer">
          ads.x.com
        </a>
        {` and open the campaign form from the side menu. Choose Video views as your objective, then click Next.`}
      </p>
    ),
    panel: <AdsManager step="campaign" />,
  },
  {
    title: "Set up your ad group",
    copy: (
      <>
        <p>
          This is where you decide who sees the ad, how much you spend, and
          where it runs.
        </p>
        <dl className="flex flex-col gap-3">
          {[
            [
              "Details",
              "Name the ad group, set a daily budget, and choose a start time. Total spend cap and end time are optional.",
            ],
            [
              "Demographics",
              "Target by location, language, age, and device. Add custom audiences if you have them.",
            ],
            [
              "Delivery",
              "Auto bid is recommended. Under Placements, select Media Viewer and nothing else.",
            ],
          ].map(([label, copy]) => (
            <div key={label} className="flex flex-col gap-1">
              <dt className="text-label-13 text-gray-1000">{label}</dt>
              <dd>{copy}</dd>
            </div>
          ))}
        </dl>
      </>
    ),
    panel: <AdsManager step="adgroup" />,
  },
  {
    title: "Create your ad",
    copy: (
      <>
        <p>
          Name your ad, write the post copy, and upload your video. Use a 9:16
          asset so it fills the screen.
        </p>
        <ul className="list-disc pl-4 [&_li]:mb-1">
          <li>
            Set Website as your destination to add a call to action button, then
            enter the URL, headline, and button text
          </li>
          <li>The button appears after one second of viewing</li>
          <li>
            {`Use "+ Add post" in the side menu to run more than one video`}
          </li>
        </ul>
      </>
    ),
    panel: <AdsManager step="ad" />,
  },
  {
    title: "Review and launch",
    copy: (
      <p>
        Pick your funding source and check the details. Click Publish when
        you’re ready, or save a draft and come back to it.
      </p>
    ),
    actions: (
      <Button
        shape="rounded"
        size="sm"
        variant="secondary"
        nativeButton={false}
        render={<Link href="/business-x/advertising/creative-best-practices" />}
      >
        Best Practices
      </Button>
    ),
    panel: <AdsManager step="review" />,
  },
]

const practices = [
  {
    title: "Aspect ratios",
    icon: IconDeviceMobile,
    copy: (
      <>
        <p>
          Use videos with 9:16 aspect ratios. This allows you to maximize the
          screen real estate of your ads and fully immerse the user in your
          content.
        </p>
        <p>
          While you can run 16:9 or 1:1 aspect ratio videos in the Immersive
          Media Viewer, they are not ideal for this surface.
        </p>
      </>
    ),
  },
  {
    title: "Sound",
    icon: IconVolume,
    copy: (
      <p>
        Design with sound in mind. Vertical Video Ads are sound-on by default,
        allowing you to capture audiences both visually and through audio.
      </p>
    ),
  },
  {
    title: "Captions",
    icon: IconBadgeCc,
    copy: (
      <p>
        Don’t forget captions! If the video asset includes spoken word audio or
        voice over, it is important to include subtitles and captions within the
        video. This allows users to easily follow along if they’re in an
        environment where they cannot listen to your audio (like on a loud bus).
      </p>
    ),
  },
  {
    title: "Pacing",
    icon: IconClock,
    copy: (
      <p>
        Keep it brief. The first three seconds are critical, and are likely to
        be what the user remembers most from your ad. Place your most important
        visual at the three second mark, whether that is your logo, campaign
        slogan, product, or something else. We recommend 15 second videos as the
        ideal length.
      </p>
    ),
  },
]

const specs = [
  ["Maximum resolution", "1080 x 1920"],
  ["Aspect ratio", "9:16 vertical"],
  ["Maximum frame rate", "60 fps"],
  ["Maximum bitrate", "25 Mbps"],
  ["Target bitrate", "5-10 Mbps"],
  ["Video length", "15 seconds (recommended), up to 2:20 supported"],
  [
    "Video codec",
    "H264, Baseline, Main, or High Profile with a 4:2:0 color space",
  ],
  ["Audio codec", "AAC LC (Low complexity)"],
]

const reading = [
  {
    title: "Video views campaigns",
    copy: "People come to >x< with a discovery mindset, and relevant, fresh videos are the perfect way to catch their eye.",
    href: "https://business.x.com/en/help/campaign-setup/create-a-video-views-campaign",
    action: "Read More",
  },
  {
    title: ">x< ad formats",
    copy: "Explore our advertising categories and the features that work across all of them.",
    href: "/business-x/products",
    action: "Read More",
  },
  {
    title: "Brand Safety at >x<",
    copy: "We serve the public conversation, and we protect the space where it happens. Brands included.",
    href: "https://business.x.com/en/help/ads-policies/brand-safety",
    action: "Read More",
  },
]

// business.x.com/en/products/vertical-video-ads.
export default function VerticalVideoAdsPage() {
  return (
    <BusinessFrame>
      <Hero
        title={
          <>
            {`Vertical `}
            <br className="max-md:hidden" />
            {`Video Ads`}
          </>
        }
        description="The world’s platform for conversation goes shopping."
        actions={
          <Button
            shape="rounded"
            size="sm"
            nativeButton={false}
            render={<a href="https://ads.x.com" />}
          >
            Get Started
          </Button>
        }
        art={VideoPlayer}
      />
      <Section rule className="gap-0">
        <AboutSplit
          eyebrow="About"
          title="Get more story, greater scale on >x<’s fastest growing surface"
          panel={
            <PhoneScene share={1}>
              <VerticalPhone text="Coffee made fresh!" />
            </PhoneScene>
          }
          stats={
            <>
              <StatRow
                value="100M+"
                label="Global Users Watch Vertical Video Daily [2]"
              />
              <StatRow
                value="8 in 10"
                label="Unique User Sessions Include Video [1]"
              />
              <StatRow
                value="~20%"
                label="Of All Time Spent on >x< is Vertical Video [2]"
              />
            </>
          }
        >
          <p>
            <XText>
              {
                "Vertical video is the fastest growing surface on >x< – accounting for ~20% of daily total time spent on the platform [2]. Now your brand can take advantage with full-screen, sound-on Vertical Video Ads to tell your story in a more captivating way, unlock incremental reach, and drive conversions on your website or app."
              }
            </XText>
          </p>
        </AboutSplit>
      </Section>
      <Section className="gap-6 lg:gap-14">
        <SectionHeading
          title="Why advertisers run vertical"
          subtitle="more reach, better results"
        />
        <WhyRows items={whyRows} />
      </Section>
      <Section rule className="gap-8 lg:gap-15">
        <SplitRow
          lead={
            <Eyebrow className="max-lg:border-b-0 max-lg:pb-0">Sources</Eyebrow>
          }
        >
          <div className="flex flex-col gap-2">
            {sources.map((source) => (
              <Footnote key={source}>
                <XText>{source}</XText>
              </Footnote>
            ))}
          </div>
        </SplitRow>
      </Section>
      <Section rule tight>
        <StepsTabs
          title="From setup to results"
          subtitle="run your first campaign"
          steps={steps}
        />
      </Section>
      <Section rule className="gap-8 lg:gap-14">
        <SectionHeading
          title="Make it worth watching"
          subtitle="specs, timing, and what to avoid"
          className="lg:max-w-1/2"
        />
        <LeadRows items={practices} />
      </Section>
      <Section rule className="gap-0">
        <AboutSplit
          eyebrow="Specs"
          title="Get the file right before you export"
          panel={
            <PhoneScene share={1}>
              <VerticalPhone text="Coffee made fresh!" />
            </PhoneScene>
          }
          stats={
            <div className="flex flex-col gap-3">
              {specs.map(([label, value]) => (
                <SpecRow key={label} label={label} value={value} />
              ))}
            </div>
          }
        >
          <p>
            Please be mindful of the various overlays in the Vertical Video
            viewer (outlined in yellow to the right). This overlay disappears
            after two seconds of your video is watched.
          </p>
        </AboutSplit>
      </Section>
      <Section rule className="gap-8 lg:gap-15">
        <SectionHeading
          title="See how it performed"
          subtitle="in Ads Manager, filtered your way"
        />
        <PanelRow panel={<AdsManager step="results" />}>
          <p>
            {`Navigate to your `}
            <a
              href="https://ads.x.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Ads Manager
            </a>
            {` to see your results. Filter the date range in the top right corner to see key metrics such as total spend, results, cost per result, and result rate. Your "result" will be either video views, 3s/100% views, 15s views, or 6s views, depending on what you chose during campaign setup.`}
          </p>
          <p>
            {`If you added a call-to-action button driving to your website or app, you can view link click and page view metrics by navigating to the "Metrics" dropdown menu, then selecting "Customize metrics". From here, you can search for and apply "Link clicks", "Link click rate", "Cost per link click", "Page views", "Page view rate" and "Cost per page view" to view these metrics within your dashboard.`}
          </p>
        </PanelRow>
      </Section>
      <Section rule className="gap-8 lg:gap-14">
        <SectionHeading
          title="Everything you need to know"
          className="lg:max-w-1/2"
        />
        <LeadRows
          items={[
            {
              title:
                "What brand safety protections are in place for Vertical Video Ads?",
              copy: (
                <ul className="list-disc pl-4 [&_li]:mb-2">
                  <li>
                    The Immersive Media Viewer has the same level of brand
                    safety in this placement as the Home Timeline, with
                    Adjacency Controls in place.
                  </li>
                  <li>
                    The Immersive Media Viewer will not recommend or show NSFW
                    content.
                  </li>
                  <li>
                    The Immersive Media Viewer will support the brand safety
                    keyword and account handle adjacency controls on the
                    previous and next video.
                  </li>
                  <li>
                    We won’t place ads adjacent to content deamplified under our
                    Policies.
                  </li>
                </ul>
              ),
            },
          ]}
        />
      </Section>
      <Section className="gap-10 lg:gap-15">
        <SectionHeading title="Additional reading" />
        <ResourceCards items={reading} />
      </Section>
      <ClosingCta />
    </BusinessFrame>
  )
}
