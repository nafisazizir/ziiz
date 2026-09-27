import type { Metadata } from "next"
import { IconCalendar, IconShare, IconUserPlus } from "@tabler/icons-react"

import { CircleChain } from "@/components/art/banners/circle-chain"
import { ClosingCta } from "@/components/business-x/closing-cta"
import { BusinessFrame } from "@/components/business-x/frame"
import { Hero } from "@/components/business-x/hero"
import { IconList, type IconRow } from "@/components/business-x/icon-list"
import {
  ComposerPhone,
  FeedPhone,
  ProfilePhone,
} from "@/components/business-x/mocks/get-started"
import { XText } from "@/components/business-x/runs"
import { Body, Section } from "@/components/business-x/section"
import { XLogo } from "@/components/business-x/x-logo"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Get your business started with X | X Business",
  description:
    "The Get started page of business.x.com rebuilt from ziiz components as shipped.",
}

type Step = {
  title: string
  copy: React.ReactNode
  panel: React.ReactNode
  label: string
  // Titled definitions, or plain tips.
  items: { term: string; detail?: string }[]
  href: string
}

const steps: Step[] = [
  {
    title: "Creating your profile",
    copy: (
      <>
        <p>
          Once you’ve signed up, you’ll have the option to convert your account
          to a Professional Account. This will allow you to create a
          Professional Profile.
        </p>
        <p>
          To convert your account, select “X for Professionals” from the
          left-side menu (swipe right to see it on mobile).
        </p>
      </>
    ),
    panel: <ProfilePhone />,
    label: "Here's what you'll need:",
    items: [
      {
        term: "A profile image",
        detail: "Choose an image that is recognizable to your brand.",
      },
      {
        term: "A header image",
        detail: "Use it like a billboard to share what’s new or timely.",
      },
      {
        term: "A bio",
        detail: "Share what you do, your value, and why to follow.",
      },
    ],
    href: "https://help.x.com/managing-your-account/how-to-customize-your-profile",
  },
  {
    title: "Posting",
    copy: (
      <>
        <p>
          Writing a Post is like writing a text message. Aim to keep things
          real, conversational, and concise.
        </p>
        <p>
          Use the icons at the bottom of a Post to easily add media, like an
          image, video, GIF, or poll.
        </p>
      </>
    ),
    panel: <ComposerPhone />,
    label: "Additional tips:",
    items: [
      { term: "If using hashtags, limit to 1-2 per Post" },
      { term: "Avoid writing copy in all-caps" },
      { term: "Consider using emojis at the end of text to add emotion" },
      {
        term: 'Include a clear call-to-action where applicable (e.g. "Visit our site")',
      },
    ],
    href: "https://help.x.com/using-x/how-to-post",
  },
  {
    title: "Engaging",
    copy: (
      <p>
        Engaging with other Posts helps build relationships and increase the
        discoverability of your account.
      </p>
    ),
    panel: <FeedPhone />,
    label: "Ways of engaging",
    items: [
      {
        term: "Like",
        detail: '"Like" to acknowledge or show support for a Post.',
      },
      {
        term: "Repost or quote Post",
        detail: "Repost to share, or Quote Post to add a comment.",
      },
      {
        term: "Reply",
        detail: "Reply to join conversations or connect with customers.",
      },
      {
        term: "@Mention",
        detail: "Mention someone by their @handle to connect.",
      },
      {
        term: "Direct message",
        detail: "Send a DM to privately connect or provide support.",
      },
    ],
    href: "https://help.x.com/using-x/x-engagement",
  },
]

const grow: IconRow[] = [
  {
    icon: IconUserPlus,
    title: "Follow and engage",
    copy: (
      <p>
        Help new audiences discover your business by engaging with other
        accounts.
      </p>
    ),
  },
  {
    icon: IconShare,
    title: "Share your @handle",
    copy: (
      <p>
        Help your audience find you by sharing your @handle on your website,
        cards, and email signature.
      </p>
    ),
  },
  {
    icon: IconCalendar,
    title: "Post consistently",
    copy: <p>Give people a reason to follow you by sharing frequently.</p>,
  },
]

// business.x.com/en/basics/get-your-business-started-with-x: three numbered
// rows, each a phone in a 3:2 panel across five columns beside three columns
// of copy, the panel switching sides row by row; then three ways to grow a
// following; then the closing call to action.
export default function GetStartedPage() {
  return (
    <BusinessFrame>
      <Hero
        title={
          <>
            {`Get started with `}
            <XLogo className="inline size-[0.85em] align-[-0.08em]" />
            <br className="max-md:hidden" />
            {` and build your voice`}
          </>
        }
        description={
          <XText>{"Don't have an >x< account? Sign up today!"}</XText>
        }
        actions={
          <Button
            shape="rounded"
            size="sm"
            nativeButton={false}
            render={<a href="https://x.com/i/flow/signup" />}
          >
            Sign up
          </Button>
        }
        art={CircleChain}
      />
      <Section className="gap-10 lg:gap-12">
        <h2 className="text-heading-32 text-balance text-gray-1000">
          <XText>{"How can >x< help you manage your business?"}</XText>
        </h2>
        <ol className="flex flex-col gap-10 lg:gap-30">
          {steps.map((step, index) => {
            const panelFirst = index % 2 === 0
            const text = panelFirst ? "lg:col-start-6" : "lg:col-start-1"
            return (
              <li
                key={step.title}
                className="grid grid-cols-1 gap-6 lg:grid-cols-8 lg:grid-rows-[auto_1fr] lg:gap-x-4 lg:gap-y-0"
              >
                <div
                  className={cn(
                    "flex flex-col gap-3 lg:col-span-3 lg:row-start-1",
                    text
                  )}
                >
                  <div className="flex items-center gap-4 text-label-13 text-gray-1000">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <h3>{step.title}</h3>
                  </div>
                  <Body className="gap-2">{step.copy}</Body>
                </div>
                <div
                  className={cn(
                    "relative aspect-3/2 overflow-hidden bg-gray-100 lg:col-span-5 lg:row-span-2 lg:row-start-1",
                    panelFirst ? "lg:col-start-1" : "lg:col-start-4"
                  )}
                >
                  {step.panel}
                </div>
                <div
                  className={cn(
                    "flex flex-col justify-end gap-4 lg:col-span-3 lg:row-start-2",
                    text
                  )}
                >
                  <div className="flex flex-col gap-3">
                    <p className="border-b border-gray-alpha-400 pb-3 text-copy-13 text-gray-900">
                      {step.label}
                    </p>
                    {step.items[0].detail ? (
                      <dl className="flex flex-col gap-3">
                        {step.items.map((item) => (
                          <div
                            key={item.term}
                            className="flex flex-col gap-0.5"
                          >
                            <dt className="text-label-13 text-gray-1000">
                              {item.term}
                            </dt>
                            <dd className="text-copy-13 text-gray-900">
                              {item.detail}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    ) : (
                      <ul className="flex list-disc flex-col gap-3 pl-5 text-label-13 text-gray-1000">
                        {step.items.map((item) => (
                          <li key={item.term}>{item.term}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <Button
                    shape="rounded"
                    size="sm"
                    className="self-start"
                    nativeButton={false}
                    render={<a href={step.href} />}
                  >
                    Learn More
                  </Button>
                </div>
              </li>
            )
          })}
        </ol>
      </Section>
      <Section className="gap-0">
        <div className="flex flex-col gap-10 lg:grid lg:grid-cols-2 lg:gap-x-12">
          <h2 className="text-heading-32 text-balance text-gray-1000">
            How to grow your following
            <span className="block text-gray-900">and reach more people</span>
          </h2>
          <IconList
            items={grow}
            className="gap-8 [&>li]:not-first:pt-8 [&>li]:first:border-t [&>li]:first:pt-8"
          />
        </div>
      </Section>
      <ClosingCta />
    </BusinessFrame>
  )
}
