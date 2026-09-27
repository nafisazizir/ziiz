import type { Metadata } from "next"
import {
  IconEye,
  IconHeadset,
  IconRocket,
  IconSpeakerphone,
  IconUsersGroup,
} from "@tabler/icons-react"

import { FieldLines } from "@/components/art/banners/field-lines"
import { AudienceCloud } from "@/components/art/marks/audience-cloud"
import { ConversationPair } from "@/components/art/marks/conversation-pair"
import { OrbitMark } from "@/components/art/marks/orbit-mark"
import { Starburst } from "@/components/art/marks/starburst"
import { ToneRows } from "@/components/art/marks/tone-rows"
import { BenefitGrid, type Benefit } from "@/components/business-x/benefit-grid"
import { ClosingCta } from "@/components/business-x/closing-cta"
import { BusinessFrame } from "@/components/business-x/frame"
import { Hero } from "@/components/business-x/hero"
import { IconListPanel, type IconRow } from "@/components/business-x/icon-list"
import { AdsManagerMock } from "@/components/business-x/mocks/why-x"
import { Newsletter } from "@/components/business-x/newsletter"
import { XText } from "@/components/business-x/runs"
import { Section } from "@/components/business-x/section"
import { StatTiles } from "@/components/business-x/stat-tiles"
import { Testimonials } from "@/components/business-x/testimonials"
import { XLogo } from "@/components/business-x/x-logo"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Why X | X Business",
  description:
    "The Why X page of business.x.com rebuilt from ziiz components as shipped.",
}

const stats = [
  { value: "36%", label: "More likely to be the first to try new things" },
  {
    value: "38%",
    label: "More likely to have downloaded an app directly from an ad online",
    height: "md" as const,
  },
  {
    value: "2X",
    label: "More likely to have made an in-app purchase",
    span: 4 as const,
    height: "lg" as const,
  },
]

const benefits: Benefit[] = [
  {
    title: "Free business promotion",
    copy: "Build your brand awareness and grow your business by building a strong organic following. No money required.",
    mark: Starburst,
    start: 2,
  },
  {
    title: "Reach new audiences",
    copy: (
      <XText>
        {
          "By expanding your message on >x<, you can connect and engage with new fans, network with partners, and identify influencers."
        }
      </XText>
    ),
    mark: AudienceCloud,
  },
  {
    title: "Start a conversation, or a movement",
    copy: (
      <XText>
        {
          "Conversations thrive on >x<. Hear from your followers and get informal feedback by running polls and posting questions. Bring awareness to a movement or point of view."
        }
      </XText>
    ),
    mark: ConversationPair,
  },
  {
    title: "Stay in the know",
    copy: (
      <XText>
        {
          ">x< connects you and your business with what’s happening in the world every day. Learn the latest, real-time trends and invest in social listening. It’s also a great way to get a read on your brand’s public reputation."
        }
      </XText>
    ),
    mark: OrbitMark,
  },
  {
    title: "Experiment with tone",
    copy: (
      <XText>
        {
          ">x< is known for being bold, and that’s not just limited to our audience. Play with your brand voice and messaging to see if they can be more human and conversational."
        }
      </XText>
    ),
    mark: ToneRows,
  },
]

const help: IconRow[] = [
  {
    icon: IconUsersGroup,
    title: "Build your following",
    copy: (
      <p>
        <XText>
          {
            "Connect with your current customers, future fans, and loyal brand advocates on >x<. Learn more about "
          }
        </XText>
        <a href="https://business.x.com/en/basics/get-your-business-started-with-x">
          <XText>{"the power of a strong >x< following"}</XText>
        </a>
        .
      </p>
    ),
  },
  {
    icon: IconRocket,
    title: "Bring your launches to >x<",
    copy: (
      <p>
        <XText>
          {
            "Whether you’re launching a new product or a new sale, >x< is the place to be to break your latest news. Learn more about "
          }
        </XText>
        <a href="https://business.x.com/en/advertising">
          <XText>{"how >x< can elevate your launches"}</XText>
        </a>
        .
      </p>
    ),
  },
  {
    icon: IconHeadset,
    title: "Provide timely customer service",
    copy: (
      <p>
        Keep an eye out for @mentions of your brand, create a dedicated customer
        service account, and provide fast service or personalized help through
        DMs.
      </p>
    ),
  },
  {
    icon: IconEye,
    title: "Monitor your competition",
    copy: (
      <p>
        {`Create `}
        <a href="https://help.x.com/using-x/x-lists">
          <XText>{">x< Lists"}</XText>
        </a>
        {` to keep tabs on specific accounts, industries, and communities.`}
      </p>
    ),
  },
  {
    icon: IconSpeakerphone,
    title: "Leverage the power of ads",
    copy: (
      <p>
        <XText>
          {
            ">x< is free, but you can double down on your efforts and impact with >x< Ads. Amplify your following, drive traffic to your website, increase app downloads, and more."
          }
        </XText>
      </p>
    ),
  },
]

const quotes = [
  {
    quote:
      "“>x< gave us the perfect platform to introduce not just our product, but an entirely new category. With the right creative, no other platform matches its ability to spark conversation”",
    name: "Jenny Broekemeier",
    role: "Paid Social Manager at MANSCAPED, Inc.",
  },
  {
    quote:
      "“We discovered that setting up our campaigns with the App Install Optimization goal and prioritizing video-centric creatives resulted in lower CPI numbers across our iOS campaigns”",
    name: "Konstantin Petrov",
    role: "CEO of Codefinity",
  },
  {
    quote:
      "“>x< has become one of the platforms that we decided to use as a source of traffic to attract users to our product. Initial tests did not yield effective results, but when using Search Keywords, we started to see purchases with very high returns”",
    name: "Alisha Shah",
    role: "Performance Marketer at Bitvavo",
  },
]

// business.x.com/en/basics/intro-x-for-business: the audience figures, the
// benefits, five ways X helps beside Ads Manager, the culture quotes, the
// newsletter, then the closing call to action.
export default function WhyXPage() {
  return (
    <BusinessFrame>
      <Hero
        title={
          <>
            {`Why use `}
            <XLogo className="inline size-[0.85em] align-[-0.08em]" />
            <br className="max-md:hidden" />
            {` for business?`}
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
            render={<a href="https://ads.x.com/login" />}
          >
            Launch Campaign
          </Button>
        }
        art={FieldLines}
      />
      <Section className="pt-4 pb-4 lg:pt-20 lg:pb-30">
        <h2 className="text-heading-32 text-balance text-gray-1000">
          <XText>{">x<'s audience drive impactful business outcomes"}</XText>
        </h2>
        <StatTiles items={stats} className="pt-5 md:pt-0" />
      </Section>
      <Section tight>
        <h2 className="text-heading-32 text-balance text-gray-1000 lg:max-w-80">
          <XText>{"What are the benefits of >x< for business?"}</XText>
        </h2>
        <BenefitGrid columns={3} items={benefits} />
      </Section>
      <Section tight>
        <h2 className="text-heading-32 text-balance text-gray-1000 lg:max-w-84">
          <XText>{"How can >x< help you manage your business?"}</XText>
        </h2>
        <IconListPanel items={help}>
          <AdsManagerMock />
        </IconListPanel>
      </Section>
      <Section rule className="gap-0">
        <Testimonials
          eyebrow="Culture Drives Connection"
          title=">x<'s Impact on Culture"
          body={
            <>
              <p>
                <XText>
                  {
                    "Businesses come to >x< to be what’s happening. When you bring your business on >x<, you connect with our powerful audience where you can make an impact and drive results."
                  }
                </XText>
              </p>
              <p>
                <XText>
                  {
                    "In fact, brand involvement in culture is especially important among consumers between the ages of 18 and 35. People on >x< vs. the general population are more passionate, informed, and feel more strongly about brands aligning with culture.*"
                  }
                </XText>
              </p>
              <p>
                <XText>
                  {
                    "Your audience is already on >x< and they can’t wait to connect with you."
                  }
                </XText>
              </p>
            </>
          }
          items={quotes}
        />
      </Section>
      <Section rule className="gap-0 pt-10 pb-10 lg:pt-20 lg:pb-25">
        <Newsletter
          title="Everything you need to stay up to date"
          description="Subscribe for updates on products, tips, and more."
          agency
          reverse
          panelAction={
            <Button
              shape="rounded"
              size="sm"
              nativeButton={false}
              render={<a href="https://x.com/XBusiness" />}
            >
              Follow @XBusiness
            </Button>
          }
        />
      </Section>
      <ClosingCta />
    </BusinessFrame>
  )
}
