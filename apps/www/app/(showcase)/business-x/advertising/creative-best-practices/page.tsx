import type { Metadata } from "next"
import Link from "next/link"

import { LayeredFrames } from "@/components/art/banners/layered-frames"
import { MediaFrames } from "@/components/art/cards/media-frames"
import { ShapeTrio } from "@/components/art/cards/shape-trio"
import { StackedFrames } from "@/components/art/cards/stacked-frames"
import { BusinessFrame } from "@/components/business-x/frame"
import { Hero } from "@/components/business-x/hero"
import { BaristaPostScene } from "@/components/business-x/mocks/ad-formats"
import { ResourceCards } from "@/components/business-x/resource-cards"
import { XText } from "@/components/business-x/runs"
import { Section, SectionHeading } from "@/components/business-x/section"
import { StepsTabs, type Step } from "@/components/business-x/steps-tabs"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Creative best practices | X Business",
  description:
    "The Creative best practices page of business.x.com rebuilt from ziiz components as shipped.",
}

const tips: { title: string; copy: React.ReactNode[]; wide?: boolean }[] = [
  {
    title: "Shorter is sweeter",
    copy: [
      "The best performing ads are only 50-100 characters. Make sure your ad is simple, gets straight to the point, and focuses on one clear message.",
    ],
  },
  {
    title: "Be authentic",
    copy: [
      <XText key="1">
        {
          "Brands get real on >x<, and our audience expects them to be. Stay true to your voice, speak naturally and directly to your audience, and avoid being overly sales-y."
        }
      </XText>,
    ],
  },
  {
    title: "Minimize distractions",
    wide: true,
    copy: [
      "Provide only one exit point, whether that’s clicking through to your website or your app, to keep your message laser-focused.",
      "Avoid using @mentions in your ad whenever possible, as they can distract viewers and lead them away from your content. Hashtags and multiple emojis are also prohibited in ads for the same reason.",
      <span key="3">
        {`See `}
        <a
          href="https://business.x.com/en/help/ads-policies/ads-content-policies/quality-policy"
          className="text-gray-1000 underline underline-offset-2"
        >
          here
        </a>
        {` for our full ad quality policy.`}
      </span>,
    ],
  },
  {
    title: "Create urgency",
    copy: [
      "Give people a reason to take immediate action. Highlight limited-time offers or unique value to motivate clicks, downloads, or purchases.",
    ],
  },
  {
    title: "Use a clear call-to-action",
    copy: [
      "Tell people exactly what to do after viewing your ad. Include a strong CTA like “Learn more,” “Order now,” or “Download the app” in your ad headline.",
    ],
  },
]

const discover = (
  <Button
    shape="rounded"
    size="sm"
    nativeButton={false}
    render={<Link href="/business-x/resources" />}
  >
    Discover more tips
  </Button>
)

const steps: Step[] = [
  {
    title: "Showcase your product",
    copy: (
      <p>
        <XText>
          {
            "97% of people focus on visuals on >x<, so it's important that yours are eye-catching and feature your product or key message. And whether you're using an image or video, make sure that there's a clear connection between your imagery and your ad copy."
          }
        </XText>
      </p>
    ),
    actions: discover,
    panel: <BaristaPostScene />,
  },
  {
    title: "Optimize for mobile",
    copy: (
      <>
        <p>
          <XText>
            {
              "80% of our audience use >x< on their mobile devices, so it's best to optimize for smaller screens and shorter attention spans."
            }
          </XText>
        </p>
        <p>
          Use 16:9 or 1:1 aspect ratios for images and videos and ensure any
          text or imagery is easy to see on mobile.
        </p>
        <p>
          For full screen mobile immersion, try out 9:16 Vertical Video Ads with
          sound-on by default to captivate users when they&apos;re most engaged.
        </p>
      </>
    ),
    actions: discover,
    panel: <BaristaPostScene square />,
  },
  {
    title: "Diversify your creative",
    copy: (
      <>
        <p>
          Using 3-5 different ad formats has been shown to drive brand lift,
          campaign awareness, and purchase intent.
        </p>
        <p>
          Use this opportunity to experiment with your tone and overall
          aesthetic across your ads. Take a risk and get a little playful or
          witty in one of your ads to see how your audience responds.
        </p>
      </>
    ),
    actions: discover,
    panel: <BaristaPostScene />,
  },
  {
    title: "Captivate with video",
    copy: (
      <>
        <p>
          <XText>
            {
              "Whenever possible, include at least one video in your campaign. Video is one of the most effective and fastest-growing formats on >x<."
            }
          </XText>
        </p>
        <p>Top video tips:</p>
        <ul className="flex list-disc flex-col gap-1 pl-4">
          <li>
            Keep videos under 15 seconds for higher completion rates. For
            pre-roll ads, viewers can skip after 6 seconds.
          </li>
          <li>Show movement in the first few seconds to grab attention.</li>
          <li>Add captions or text overlays for sound-off viewing.</li>
          <li>
            Include your branding within the first 3 seconds for stronger brand
            recall.
          </li>
        </ul>
      </>
    ),
    actions: discover,
    panel: <BaristaPostScene video />,
  },
]

// business.x.com/en/advertising/creative-best-practices: the hero, five
// numbered copy tips on a ruled two-column grid (the third spans both), the
// creative steps on a tab strip, and three product cards. No closing call to
// action.
export default function CreativeBestPracticesPage() {
  return (
    <BusinessFrame>
      <Hero
        title={
          <>
            {`Creative best `}
            <br className="max-md:hidden" />
            {`practices`}
          </>
        }
        description={
          <XText>
            {
              "Write >x< ad copy that captivates and inspires action. Keep it short, stay authentic, minimize distractions, create urgency, and use a clear call-to-action."
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
        art={LayeredFrames}
      />
      <Section
        tight
        className="mt-10 lg:mt-0 lg:border-t lg:border-gray-alpha-400"
      >
        <SectionHeading
          title="Copy that captivates"
          subtitle="and inspires action"
        />
        <ol className="grid grid-cols-1 gap-x-8 max-lg:gap-y-0 lg:grid-cols-2 lg:gap-y-8">
          {tips.map((tip, index) => (
            <li
              key={tip.title}
              className={cn(
                "flex flex-col gap-2 border-t border-gray-alpha-400 max-lg:py-6 lg:flex-row lg:gap-3 lg:py-3",
                tip.wide && "lg:col-span-2 lg:gap-8"
              )}
            >
              <span className="text-label-13 text-gray-1000 lg:flex-1">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="flex flex-col gap-1 lg:min-h-40 lg:flex-1">
                <h3 className="text-label-13 text-gray-1000">{tip.title}</h3>
                <div className="flex flex-col gap-2 text-copy-13 text-gray-900">
                  {tip.copy.map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </Section>
      <Section tight>
        <StepsTabs
          title="Creative that converts"
          subtitle="at every touchpoint"
          steps={steps}
        />
      </Section>
      <Section className="gap-10 lg:gap-15">
        <h2 className="text-heading-32 text-gray-1000">Product used</h2>
        <ResourceCards
          items={[
            {
              title: ">x< Ads solutions",
              copy: "Explore our suite of ad formats to determine the best ones for your campaign.",
              href: "/business-x/products",
              art: MediaFrames,
            },
            {
              title: "Creative ad specs",
              copy: "Access the detailed specifications of our ad formats in the Ads Help Center.",
              href: "https://business.x.com/en/help/campaign-setup/advertiser-card-specifications",
              art: StackedFrames,
            },
            {
              title: "Success stories",
              copy: "Get inspired by other brands who dominate the timeline.",
              href: "/business-x/success-stories",
              art: ShapeTrio,
            },
          ]}
        />
      </Section>
      <div className="pb-20" />
    </BusinessFrame>
  )
}
