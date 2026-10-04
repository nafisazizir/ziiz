import type { Metadata } from "next"
import Link from "next/link"
import {
  IconArrowRight,
  IconBrandAndroid,
  IconBrandApple,
  IconCopyright,
  IconCurrencyDollar,
  IconEye,
  IconLock,
  IconRosetteDiscountCheck,
  IconScale,
  IconShield,
  IconUser,
} from "@tabler/icons-react"

import { HelpFrame } from "@/components/business-x/frame"
import { Hero } from "@/components/business-x/hero"
import { Body, Section, SectionHeading } from "@/components/business-x/section"
import { HelpSearch } from "@/components/help-x/search"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Contact us | X Help Center",
  description:
    "The contact page of help.x.com rebuilt from ziiz components as shipped.",
}

const forms = "https://help.x.com/en/forms"

const topics = [
  {
    icon: IconLock,
    title: "Locked and suspended account issues",
    copy: "Next steps for accounts that have been flagged for potential violations.",
    href: `${forms}/account-access/appeals`,
  },
  {
    icon: IconUser,
    title: "Problems with account access",
    copy: "Get help logging into X, or with reactivating or deactivating an account.",
    href: `${forms}/account-access`,
  },
  {
    icon: IconEye,
    title: "Privacy on X",
    copy: "Get answers about your account and our privacy policies, and request your X information.",
    href: "https://help.x.com/en/privacy",
  },
  {
    icon: IconShield,
    title: "Staying safe on X and sensitive content",
    copy: "Report harassment and threats from other accounts, and posts that may violate our rules.",
    href: `${forms}/safety-and-sensitive-content`,
  },
  {
    icon: IconRosetteDiscountCheck,
    title: "Authenticity on X",
    copy: "Report impersonation of a person or brand, and potential platform manipulation or spam.",
    href: `${forms}/authenticity`,
  },
  {
    icon: IconCopyright,
    title: "Help with intellectual property issues",
    copy: "Report trademark and copyright infringement, and potential counterfeit goods.",
    href: `${forms}/ipi`,
  },
  {
    icon: IconCurrencyDollar,
    title: "Help with paid features",
    copy: "Request assistance with paid features like X Premium, Super Follows, or Tips.",
    href: `${forms}/paid-features/general`,
  },
  {
    icon: IconScale,
    title: "Requests from Law Enforcement/Other Government Agencies",
    copy: "Submit your legal requests for data preservation, disclosure of account information (including emergency requests), and content removal.",
    href: "/help-x/rules-and-policies/x-law-enforcement-support",
  },
]

const more = [
  {
    title: "About X Premium",
    topic: "Posts",
    href: "/help-x/using-x/x-premium",
  },
  {
    title: "About Creator Subscriptions",
    topic: "Creators",
    href: "/help-x/using-x/subscriptions-creator",
  },
  {
    title:
      "Identifying information for a post, Moment, List, X Space, Community or X Shop",
    topic: "Posts",
    href: "/help-x/using-x/post-and-moment-url",
  },
  {
    title: "About your For you timeline on X",
    topic: "Posts",
    href: "/help-x/using-x/x-timeline",
  },
]

// help.x.com/en/forms is served in x.com's older design. The clone keeps
// its content and sets it in the frame the rest of the Help Center uses:
// the headline and the search, eight topics, the two app links and four
// further articles. A topic's form lives on help.x.com.
export default function HelpXFormsPage() {
  return (
    <HelpFrame>
      <Hero
        title="We can help."
        description="Select the topic that best describes your issue, then you’ll fill out a form with your specific details."
        actions={<HelpSearch className="lg:w-70" />}
        panel={false}
      />
      <Section rule tight>
        <SectionHeading title="Contact us" subtitle="Select a topic" />
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {topics.map((topic) => (
            <li key={topic.title} className="flex">
              <Card className="w-full">
                <CardHeader>
                  <topic.icon className="mb-2 size-6 text-gray-1000" />
                  <CardTitle>{topic.title}</CardTitle>
                  <CardDescription>{topic.copy}</CardDescription>
                </CardHeader>
                <CardFooter className="mt-auto justify-end">
                  <Button
                    variant="ghost"
                    shape="rounded"
                    size="icon-sm"
                    aria-label={`Open ${topic.title}`}
                    nativeButton={false}
                    render={
                      topic.href.startsWith("/") ? (
                        <Link href={topic.href} />
                      ) : (
                        <a
                          href={topic.href}
                          target="_blank"
                          rel="noopener noreferrer"
                        />
                      )
                    }
                  >
                    <IconArrowRight />
                  </Button>
                </CardFooter>
              </Card>
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-3">
          <Button
            shape="rounded"
            nativeButton={false}
            render={
              <a
                href="https://apps.apple.com/us/app/x/id333903271"
                target="_blank"
                rel="noopener noreferrer"
              />
            }
          >
            <IconBrandApple data-icon="inline-start" />
            Download X for iPhone
          </Button>
          <Button
            shape="rounded"
            nativeButton={false}
            render={
              <a
                href="https://play.google.com/store/apps/details?id=com.twitter.android"
                target="_blank"
                rel="noopener noreferrer"
              />
            }
          >
            <IconBrandAndroid data-icon="inline-start" />
            Download X for Android
          </Button>
        </div>
      </Section>
      <Section rule tight>
        <div className="flex flex-col gap-3 lg:grid lg:grid-cols-8 lg:gap-x-4">
          <h2 className="text-heading-32 text-balance text-gray-1000 lg:col-span-4">
            More resources
          </h2>
          <Body className="lg:col-span-4">
            <p>
              Most questions already have an answer in the Help Center. These
              four are where people start.
            </p>
          </Body>
        </div>
        <ul className="grid grid-cols-1 gap-x-8 md:grid-cols-2">
          {more.map((item) => (
            <li
              key={item.href}
              className="flex flex-col gap-4 border-t border-gray-alpha-400 py-6 lg:pb-10"
            >
              <div className="flex flex-col gap-1">
                <p className="text-label-13 text-gray-700">{item.topic}</p>
                <h3 className="text-label-16 text-gray-1000">{item.title}</h3>
              </div>
              <Button
                shape="rounded"
                size="sm"
                variant="secondary"
                className="self-start"
                nativeButton={false}
                render={<Link href={item.href} />}
              >
                Read full article
              </Button>
            </li>
          ))}
        </ul>
      </Section>
    </HelpFrame>
  )
}
