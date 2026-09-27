import type { Metadata } from "next"

import { RingStack } from "@/components/art/banners/ring-stack"
import { ClosingCta } from "@/components/business-x/closing-cta"
import { BusinessFrame } from "@/components/business-x/frame"
import { Hero } from "@/components/business-x/hero"
import {
  ComposerMock,
  FollowersMock,
  OrganicMock,
  SignInPhone,
} from "@/components/business-x/mocks/basics"
import {
  FeatureAction,
  NumberedFeatures,
  type Feature,
} from "@/components/business-x/numbered-features"
import { XText } from "@/components/business-x/runs"
import { Section, SectionHeading } from "@/components/business-x/section"
import { XLogo } from "@/components/business-x/x-logo"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Basics | X Business",
  description:
    "The Basics landing of business.x.com rebuilt from ziiz components as shipped.",
}

const steps: Feature[] = [
  {
    title: "Create a profile",
    copy: (
      <XText>
        {
          "Your profile is your brand's first impression on >x<. Add your name, logo, location, and a clear bio that tells people what you do and why they should follow you."
        }
      </XText>
    ),
    panel: <SignInPhone />,
    wide: true,
    action: (
      <FeatureAction href="https://business.x.com/en/resources/guides-and-webinars">
        Learn more
      </FeatureAction>
    ),
  },
  {
    title: "Post ideas",
    copy: "A live profile needs content. These evergreen post ideas give you a starting point so you're not staring at a blank field.",
    mock: <ComposerMock />,
    scene: 288,
    panelFirst: true,
  },
  {
    title: "Grow your following",
    copy: "Reach doesn't happen on its own. Follow these steps to build a consistent, engaged following and extend the reach of every post you publish.",
    mock: <FollowersMock />,
    scene: 256,
    panelFirst: true,
  },
  {
    title: "Organic best practices",
    copy: (
      <XText>
        {
          "The strongest brands on >x< combine paid and organic. Here's how to make your organic posts work harder."
        }
      </XText>
    ),
    mock: <OrganicMock />,
    scene: 400,
    wide: true,
    panelFirst: true,
    action: (
      <FeatureAction href="https://business.x.com/en/basics/organic-best-practices">
        Learn more
      </FeatureAction>
    ),
  },
]

// business.x.com/en/basics: the section hero, then four numbered steps to a
// live profile, then the closing call to action.
export default function BasicsPage() {
  return (
    <BusinessFrame>
      <Hero
        title={
          <>
            {`Everything you `}
            <br className="max-md:hidden" />
            {`need to build on `}
            <XLogo className="inline size-[0.85em] align-[-0.08em]" />
          </>
        }
        description={
          <XText>
            {
              ">x< is where people go to find out what's happening. That makes it one of the best places to launch products, shape perception, and stay relevant. Start here."
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
        art={RingStack}
      />
      <Section rule className="pt-10.5 pb-4 lg:pt-20 lg:pb-30">
        <SectionHeading
          title="Find the right format"
          subtitle="Build to drive results"
        />
        <NumberedFeatures items={steps} />
      </Section>
      <ClosingCta />
    </BusinessFrame>
  )
}
