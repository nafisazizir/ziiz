import type { Metadata } from "next"
import Link from "next/link"

import { AdFormats } from "@/components/art/banners/ad-formats"
import { ClosingCta } from "@/components/business-x/closing-cta"
import { FormatsExplorer, type Format } from "@/components/business-x/formats"
import { BusinessFrame } from "@/components/business-x/frame"
import { Hero } from "@/components/business-x/hero"
import { Newsletter } from "@/components/business-x/newsletter"
import { XText } from "@/components/business-x/runs"
import { Body, Section, SplitRow } from "@/components/business-x/section"
import { Testimonials } from "@/components/business-x/testimonials"
import { XLogo } from "@/components/business-x/x-logo"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Products | X Business",
  description:
    "The Products landing of business.x.com rebuilt from ziiz components as shipped.",
}

const formats: Format[] = [
  {
    name: "Promoted Ads",
    kind: "image",
    intro: [
      "Promoted Ads can support a variety of media formats through the following sub-categories:",
    ],
    subs: [
      {
        name: "Image Ads",
        kind: "image",
        copy: "Allow you to showcase your product or service with a single photo.",
      },
      {
        name: "Video Ads",
        kind: "video",
        copy: "Help bring products to life and drive people to a website, app, or simply to engage with your brand’s message.",
      },
      {
        name: "Carousel Ads",
        kind: "carousel",
        copy: "Give advertisers up to six horizontally-swipeable images or videos to showcase multiple products or promotions.",
      },
      {
        name: "Text Ads",
        kind: "text",
        copy: "With all the elements of a standard Post, these simple and native Text Ads feel like the rest of >x< content and allow you to expand the reach of your Posts beyond your followers to your desired target audience.",
      },
    ],
  },
  {
    name: "Vertical Video Ads",
    kind: "vertical",
    intro: [
      "Vertical video is the fastest growing surface on >x< – accounting for ~20% of daily total time spent on the platform. Your brand can take advantage with full-screen, sound-on Vertical Video Ads to tell your story in a more captivating way, unlock incremental reach and drive users to your website or app.",
      "Vertical Video Ads is the most engaging ad format we’ve released. With full-screen viewability and sound on by default, your product and message is front and center.",
      "You can also include a call-to-action button to drive users to your website or app. This button appears after the viewer has watched one second of your ad.",
      "We’ve observed that users are 7x more likely to follow, repost, like, and click the URLs of Vertical Video Ads compared to the same ads on the Home Timeline.",
    ],
  },
  {
    name: ">x< Amplify",
    kind: "amplify",
    intro: [
      ">x< Amplify allows advertisers to align their ads with premium video content from the most relevant publishers. Amplify offerings are broken out into two ad formats:",
    ],
    subs: [
      {
        name: "Amplify Pre-roll",
        copy: "Allows advertisers to select the content categories of the videos that their video ad will be served on from 15+ categories, including select Curated Categories in markets where they’re available.",
      },
      {
        name: "Amplify Sponsorships",
        copy: "Give advertisers a 1:1 pairing with a single publisher during a moment of their choice and Post-level control for the duration of the campaign. Please note that Amplify Sponsorships are not available to self-serve advertisers at this time.",
      },
    ],
  },
  {
    name: ">x< Takeovers",
    kind: "takeover",
    intro: [
      ">x<'s Takeover products are the most premium, mass-reach placements that drive results across the funnel by taking over the Timeline and Explore tabs. They give brands exclusive ownership of >x<'s premium real estate across desktop and mobile, allowing you to maximize reach and drive lifts across the funnel. Takeover placements are offered as:",
    ],
    subs: [
      {
        name: "Timeline Takeover",
        kind: "takeover",
        copy: "Puts brands at the top of the conversation as the first ad of the day. People come to >x< to discover what’s happening, and with Timeline Takeover, your ad is the first ad when someone opens >x<.",
      },
      {
        name: "Spotlight Takeover",
        kind: "video",
        copy: "Puts ads alongside what’s trending, placing messages and immersive video creative where the conversation starts on the Explore tab.",
      },
    ],
  },
  {
    name: ">x< Live",
    kind: "live",
    intro: [
      ">x< Live enables advertisers to broadcast their biggest moments to the world and allow audiences to join in real-time. From product launches and conferences to watch parties and fashion shows, >x< Live helps brands maximize their best livestream content and drive conversation with the audiences that matter.",
    ],
  },
  {
    name: "Dynamic Product Ads",
    kind: "dpa",
    intro: [
      "Dynamic Product Ads on >x< allow advertisers to deliver the most relevant product to the right customer at the right time. With DPA Retargeting, advertisers can serve ads to targeted consumers, featuring products they have engaged with (e.g. added to their shopping cart) on the advertiser’s website but haven’t yet purchased.",
      "With DPA Prospecting, advertisers can acquire new customers who haven’t visited their website via ads featuring products from your catalog that are most relevant to them.",
      "Combined with >x<'s Web Conversions products, Dynamic Product Ads can help advertisers improve Cost Per Purchase and return on ads spend (ROAS) on >x<.",
    ],
  },
  {
    name: "Collection Ads",
    kind: "collection",
    intro: [
      "Collection Ads are a new way to browse, story tell, and purchase on >x<. In a Collection Ad, advertisers can showcase a collection of product images through a primary hero image and smaller thumbnail visuals below.",
    ],
    subs: [
      {
        name: "Single view experience",
        copy: "With Collection Ads, consumers no longer have to swipe through individual cards as they would with Carousel Ads. All product features are displayed within a single view.",
      },
      {
        name: "Customizable destinations",
        copy: "Advertisers have multi-destination functionality with Collection Ads, allowing them greater flexibility to link to unique product destinations and landing pages.",
      },
      {
        name: "Creative flexibility",
        copy: "With more creative space within Collection Ads, advertisers can highlight up to 6 unique products, services, or promotions.",
      },
    ],
  },
]

const testimonials = [
  {
    quote:
      "“Working exclusively with desktop traffic on >x< is challenging, but utilizing the Website Sales objective and language optimization allowed us to successfully meet our KPIs”",
    name: "Olga solovyeva",
    role: "Ua Manager at Nexters",
  },
  {
    quote:
      "“We discovered that setting up our campaigns with the App Install Optimization goal and prioritizing video-centric creatives resulted in lower CPI numbers across our iOS campaigns”",
    name: "Konstantin Petrov",
    role: "CEO at Codefinity",
  },
  {
    quote:
      "“>x< has become one of the platforms that we decided to use as a source of traffic to attract users to our product. Initial tests did not yield effective results, but when using Search Keywords, we started to see purchases with very high returns”",
    name: "Alisha Shah",
    role: "Performance Marketer at Bitvavo",
  },
]

// business.x.com/en/products: the toolkit hero, a split intro, the format
// explorer, testimonials, the newsletter strip and the closing call.
export default function ProductsPage() {
  return (
    <BusinessFrame>
      <Hero
        title={
          <>
            {`The full toolkit `}
            <br className="max-md:hidden" />
            {`for advertising on `}
            <XLogo className="inline size-[0.85em] align-[-0.08em]" />
          </>
        }
        description={
          <XText>{"Say hello to the latest and greatest >x< tools."}</XText>
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
        art={AdFormats}
      />
      <Section className="gap-8 lg:gap-14">
        <SplitRow
          lead={
            <h2 className="text-heading-32 text-balance text-gray-1000">
              Explore all tools
            </h2>
          }
        >
          <Body>
            <p>
              Whether you want to post and engage with your audience, monitor
              conversations and trends, or monetize your content and reach,
              there’s a product built for the way you work. Discover the
              options, compare what they offer, and choose the one that best
              fits your goals.
            </p>
          </Body>
        </SplitRow>
      </Section>
      <Section className="gap-12 pt-14 pb-4 lg:gap-14 lg:pt-20 lg:pb-20">
        <h2 className="text-heading-32 text-balance text-gray-1000">
          <XText>{">x< Advertising Formats"}</XText>
        </h2>
        <FormatsExplorer formats={formats} />
      </Section>
      <Section>
        <Testimonials
          title="Discover how leading brands"
          subtitle="turn campaigns into results"
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
                render={<Link href="/business-x/advertising#contact" />}
              >
                Talk to an Ads Expert
              </Button>
            </>
          }
          items={testimonials}
        />
      </Section>
      <Section className="pt-10 pb-10 lg:pt-20 lg:pb-25">
        <Newsletter title="Business insights, delivered to your inbox" />
      </Section>
      <ClosingCta />
    </BusinessFrame>
  )
}
