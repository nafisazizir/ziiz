import type { Metadata } from "next"

import { Pipeline } from "@/components/art/banners/pipeline"
import { ClosingCta } from "@/components/business-x/closing-cta"
import { Faq } from "@/components/business-x/faq"
import { FormatsExplorer, type Format } from "@/components/business-x/formats"
import { BusinessFrame } from "@/components/business-x/frame"
import { Hero } from "@/components/business-x/hero"
import {
  AdPost,
  FeedPhone,
  FillerPost,
} from "@/components/business-x/mocks/feed"
import {
  LivePhone,
  ShopPhone,
} from "@/components/business-x/mocks/product-phones"
import { LeadRows } from "@/components/business-x/product-blocks"
import { XText } from "@/components/business-x/runs"
import {
  Footnote,
  Section,
  SectionHeading,
} from "@/components/business-x/section"
import { XLogo } from "@/components/business-x/x-logo"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "X Shopping | X Business",
  description:
    "business.x.com's X Shopping page rebuilt from ziiz components as shipped.",
}

const learn = (
  <Button
    shape="rounded"
    size="sm"
    variant="secondary"
    nativeButton={false}
    render={<a href="https://business.x.com/en/help/campaign-setup/shopping" />}
  >
    Learn More
  </Button>
)

const features: Format[] = [
  {
    name: ">x< Shops",
    intro: [
      "Your always-on virtual storefront",
      "Highlight up to 50 products in an immersive one-stop-shop that’s both curated and customizable.",
    ],
    phone: <ShopPhone />,
    actions: learn,
  },
  {
    name: "Shop Spotlight",
    intro: [
      "A swipeable showcase of your top products",
      "Display your top five products directly on your brand’s X profile and let the window-shopping begin.",
    ],
    phone: <ShopPhone title="Shop Spotlight" action="Follow" />,
    actions: learn,
  },
  {
    name: "Product Drops",
    intro: [
      "Drop your products in a buzzworthy moment",
      "Launch your hottest product in front of your biggest fans natively on X, and auto-remind them to shop the drop.",
    ],
    phone: (
      <FeedPhone>
        <AdPost
          kind="image"
          ad={false}
          text="Dropping Friday at 10am. Tap to get reminded."
        />
        <FillerPost />
      </FeedPhone>
    ),
    actions: learn,
    note: "Currently available to all US merchants in Beta.",
  },
  {
    name: "Live Shopping",
    intro: [
      "Real-time commerce meets conversation",
      "Invite your fans to a Live Shopping event that amplifies your brand and inspires them to shop the moment.",
    ],
    phone: <LivePhone />,
    actions: learn,
    note: "Currently available to managed advertisers.",
  },
  {
    name: "Dynamic Product Ads",
    intro: [
      "Dynamically deliver the most relevant product to the right customer at the right time.",
      "With DPA Retargeting, advertisers can serve ads to targeted consumers, featuring products they have engaged with (e.g. added to their shopping cart) on the advertiser’s website but haven’t yet purchased.",
      "With DPA Prospecting, advertisers can acquire new customers who haven’t visited their website via ads featuring products from your catalog that are most relevant to them.",
    ],
    kind: "dpa",
    actions: learn,
    note: "Available to all X Advertisers that sell physical goods.",
  },
]

const questions = [
  {
    q: "Is my business eligible for >x< Shopping?",
    a: [
      [
        "If your business is located in the United States, sells physical goods, and meets a few additional requirements noted in our >x< Shopping policies, you’re eligible! You’ll also need to agree to the policies and convert to a (free) Professional Account. We’ll be exploring increasing global scale next year.",
      ],
    ],
  },
  {
    q: "How do I get started?",
    a: [
      [
        "Setting up your >x< Shopping presence is easy! You’ll use >x< Shopping Manager, your go-to-hub for all things >x< Shopping. Learn all the steps to get started here.",
      ],
    ],
  },
  { q: "How much does it cost?", a: [["Our >x< Shopping tools are free."]] },
  {
    q: "Do you take a cut of sales?",
    a: [["No, >x< doesn’t take a cut of your product sales."]],
  },
  {
    q: "Does >x< sync with my point of sale?",
    a: [
      [
        "With the >x< sales channel on Shopify, you can seamlessly connect your Shopify catalog with >x< Shopping. Learn more. We’ll continue to explore additional third party integrations later this year.",
      ],
    ],
  },
  {
    q: "How can I track the performance of my products on >x<?",
    a: [
      [
        "Unfortunately we don't have self-serve reporting flows in place for >x< Shopping, but are working hard to build this soon! You can track click-through rates of your products by appending UTM parameters to your product links.",
      ],
    ],
  },
]

// business.x.com/en/products/shopping.
export default function ShoppingPage() {
  return (
    <BusinessFrame>
      <Hero
        title={
          <>
            <XLogo className="inline size-[0.85em] align-[-0.08em]" />
            {` Shopping`}
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
        art={Pipeline}
      />
      <Section className="gap-8 lg:gap-14">
        <SectionHeading
          title="Tap into the power of conversation to drive sales"
          className="lg:max-w-1/2"
        />
        <LeadRows
          items={[
            {
              title: "Now live in the US",
              copy: (
                <>
                  <p>
                    <XText>
                      {
                        "People come to >x< to engage with what’s happening, from local to global. It’s where relationships are made and conversation shapes culture and trends in real time."
                      }
                    </XText>
                  </p>
                  <p>
                    <XText>
                      {
                        "Now with the launch of >x< Shopping, you can place your products in the conversation, leveraging your community and connections to drive sales."
                      }
                    </XText>
                  </p>
                </>
              ),
              footnote: (
                <Footnote>
                  Currently available to all eligible merchants in the US.
                </Footnote>
              ),
            },
          ]}
        />
      </Section>
      <Section rule className="gap-0 pt-10 pb-10 lg:pt-26 lg:pb-25">
        <div className="flex flex-col gap-6 lg:grid lg:grid-cols-8 lg:grid-rows-[auto_1fr] lg:gap-4">
          <h2 className="text-heading-32 text-balance text-gray-1000 lg:col-span-3 lg:row-start-1">
            Your biggest fans
            <span className="block text-gray-900">are ready to shop</span>
          </h2>
          <ul className="flex flex-col gap-4 lg:col-span-5 lg:col-start-4 lg:row-span-2 lg:row-start-1 lg:h-76 lg:flex-row lg:items-end">
            <li className="flex min-h-50 flex-col gap-3 bg-gray-100 p-6 lg:h-full lg:min-h-0 lg:min-w-0 lg:flex-1 xl:w-[26.625rem] xl:flex-none">
              <p className="text-heading-32 text-gray-1000">89%</p>
              <p className="text-copy-13 text-balance text-gray-900">
                <XText>
                  {"of shoppers surveyed use >x< to discover new products.*"}
                </XText>
              </p>
            </li>
            <li className="flex min-h-50 flex-col gap-3 bg-gray-100 p-6 lg:h-full lg:min-h-0 lg:min-w-0 lg:flex-1">
              <p className="text-heading-32 text-gray-1000">76%</p>
              <p className="text-copy-13 text-balance text-gray-900">
                <XText>
                  {
                    "of people on >x< surveyed agree that conversations on the platform have led them to make a purchase.*"
                  }
                </XText>
              </p>
            </li>
          </ul>
          <Footnote className="lg:col-span-3 lg:row-start-2 lg:self-end">
            <XText>
              {
                "* >x< Internal Data, August - September 2021. 500 X users sampled and surveyed."
              }
            </XText>
          </Footnote>
        </div>
      </Section>
      <Section rule className="gap-12 pt-14 pb-4 lg:gap-14 lg:pt-20 lg:pb-20">
        <SectionHeading title="Everything About" subtitle=">x< Shopping" />
        <FormatsExplorer formats={features} />
      </Section>
      <Section rule>
        <Faq items={questions} />
      </Section>
      <ClosingCta />
    </BusinessFrame>
  )
}
