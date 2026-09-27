import type { Metadata } from "next"
import Link from "next/link"

import { Beams } from "@/components/art/banners/beams"
import { ClosingCta } from "@/components/business-x/closing-cta"
import { BusinessFrame } from "@/components/business-x/frame"
import { Hero } from "@/components/business-x/hero"
import { PhoneScene } from "@/components/business-x/mocks/feed"
import { AmplifyPhone } from "@/components/business-x/mocks/product-phones"
import { SpacePhone } from "@/components/business-x/mocks/spaces"
import { WhyRows } from "@/components/business-x/product-blocks"
import { IconGrid } from "@/components/business-x/benefit-grid"
import { ResourceCards } from "@/components/business-x/resource-cards"
import { Section, SectionHeading } from "@/components/business-x/section"
import { Button } from "@/components/ui/button"
import { IconAward, IconCalendar, IconStar } from "@tabler/icons-react"

export const metadata: Metadata = {
  title: "Amplify Sponsorships | X Business",
  description:
    "business.x.com's Amplify Sponsorships page rebuilt from ziiz components as shipped.",
}

const rows = [
  {
    title: "Amplify the Moment",
    copy: (
      <p>
        For brands seeking maximum impact, Amplify Sponsorships aligns
        advertisers with premium publishers around major events with a video
        pre-roll solution.
      </p>
    ),
    panel: (
      <PhoneScene share={1.2} className="items-start pt-10">
        <AmplifyPhone />
      </PhoneScene>
    ),
  },
  {
    title: "Beyond Pre-Roll",
    copy: (
      <p>
        Go beyond pre-roll and leverage a suite of custom Sponsorship
        integrations for all your business needs from Sponsored Spaces to
        Sponsored App Installs and Co-branded Event Pages.
      </p>
    ),
    panel: (
      <PhoneScene share={1.2} className="items-start pt-10">
        <SpacePhone
          title="Sponsored Space, live now"
          action="Start listening"
        />
      </PhoneScene>
    ),
  },
]

const moments = [
  {
    title: "Major Sporting Events",
    icon: IconStar,
    copy: (
      <p>
        Connect your brand with highly engaged audiences during the biggest
        moments in sports.
      </p>
    ),
  },
  {
    title: "Award Shows and Premieres",
    icon: IconAward,
    copy: (
      <p>
        Show up alongside entertainment’s most talked-about events and real-time
        conversations.
      </p>
    ),
  },
  {
    title: "Lifestyle Moments",
    icon: IconCalendar,
    copy: (
      <p>
        Reach audiences around cultural, seasonal, and lifestyle moments that
        matter to them.
      </p>
    ),
  },
]

const reading = [
  {
    title: "Amplify Sponsorships",
    copy: "For brands seeking maximum impact, Amplify Sponsorships aligns advertisers with premium publishers around major events with a video pre-roll solution.",
    href: "https://business.x.com/en/help/campaign-setup/amplify-sponsorships",
    action: "Learn more",
    panel: (
      <PhoneScene share={1.1} className="items-start pt-8">
        <AmplifyPhone />
      </PhoneScene>
    ),
  },
  {
    title: "How to create a pre-roll views campaign",
    copy: "Build brand relevance and align with consumers' passion points by running targeted pre-roll ads before videos your customers are watching.",
    href: "https://business.x.com/en/help/campaign-setup/create-a-pre-roll-views-campaign",
    action: "Learn more",
    panel: (
      <PhoneScene share={1.1} className="items-start pt-8">
        <AmplifyPhone />
      </PhoneScene>
    ),
  },
]

// business.x.com/en/products/amplify-sponsorships.
export default function AmplifySponsorshipsPage() {
  return (
    <BusinessFrame>
      <Hero
        title={
          <>
            {`Amplify `}
            <br className="max-md:hidden" />
            {`Sponsorships`}
          </>
        }
        description="By pairing high-impact content with premium visibility, sponsorships help brands show up at the center of culture, extend their reach, and build meaningful connections at scale."
        actions={
          <Button
            shape="rounded"
            size="sm"
            nativeButton={false}
            render={<Link href="/business-x/advertising#contact" />}
          >
            Reach out today
          </Button>
        }
        art={Beams}
      />
      <Section className="gap-6 lg:gap-14">
        <SectionHeading
          title="Premium. High-impact"
          subtitle="Own the moment"
        />
        <WhyRows items={rows} />
      </Section>
      <Section tight>
        <SectionHeading title="Tentpole moments" />
        <IconGrid items={moments} />
      </Section>
      <Section className="gap-10 lg:gap-15">
        <SectionHeading title="Further reading" />
        <ResourceCards items={reading} panelRatio="5/4" />
      </Section>
      <ClosingCta action="Create your Ads" />
    </BusinessFrame>
  )
}
