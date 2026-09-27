import type { Metadata } from "next"
import Link from "next/link"
import { IconArrowRight, IconSearch } from "@tabler/icons-react"

import { BusinessFrame } from "@/components/business-x/frame"
import { Hero } from "@/components/business-x/hero"
import { Body, Section, SectionHeading } from "@/components/business-x/section"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"

export const metadata: Metadata = {
  title: "Help Center | X Business",
  description:
    "The X Ads Help Center landing of business.x.com rebuilt from ziiz components as shipped.",
}

const help = "https://business.x.com/en/help"

const contents = [
  {
    title: "Overview",
    copy: "Learn more about the basics as to setting up your account, ad eligibility, and terminology.",
    href: `${help}/overview`,
  },
  {
    title: "Account Setup",
    copy: "Learn more about how to get started with your X Ads Manager account and setup requirements.",
    href: `${help}/account-setup`,
  },
  {
    title: "Campaign Setup",
    copy: "Discover resources around your ad campaign setup and requirements.",
    href: `${help}/campaign-setup`,
  },
  {
    title: "Editing & Optimizing",
    copy: "Beyond launching your ad campaigns, explore how you can make changes and improvements.",
    href: `${help}/campaign-editing`,
  },
  {
    title: "Analytics",
    copy: "Dive deeper into our campaign measurement resources to monitor your ad performance on X.",
    href: `${help}/campaign-measurement-analytics`,
  },
  {
    title: "Troubleshooting",
    copy: "Explore some of our FAQs to guide you through common solutions to resolve problems quickly.",
    href: `${help}/troubleshooting`,
  },
  {
    title: "X Ads Policies",
    copy: "Learn about our policies and requirements for ad campaigns and advertisers that are active on X.",
    href: `${help}/ads-policies`,
  },
]

const popular = [
  {
    title: "How X Ads Work",
    copy: "Here's an overview of how X Ads work, why you see certain ads, your privacy settings, and other options.",
    href: `${help}/overview/how-x-ads-work`,
  },
  {
    title: "Ads Pricing",
    copy: "Whether you’re a small business or a large brand, X Ads campaigns can be customized to your budget.",
    href: `${help}/overview/ads-pricing`,
  },
  {
    title: "Creative Ad Specs",
    copy: "With a variety of ad types, explore our recommendations for copy inclusions, creative specs, and more.",
    href: `${help}/campaign-setup/creative-ad-specifications`,
  },
  {
    title: "Campaign Setup",
    copy: "Walk through how to set up your campaigns on X.",
    href: `${help}/campaign-setup`,
  },
  {
    title: "Account Eligibility",
    copy: "Ensure your business meets the requirements to advertise on X.",
    href: `${help}/account-setup/ads-account-eligibility`,
  },
  {
    title: "Conversion Tracking",
    copy: "Explore how X can measure your ROAS and connect web experiences with X Ad engagement.",
    href: `${help}/campaign-measurement-analytics/conversion-tracking-for-websites`,
  },
]

const basics = [
  { title: "Campaigns 101", href: `${help}/overview/campaigns-101` },
  {
    title: "Conversation targeting",
    href: `${help}/campaign-setup/conversation-targeting`,
  },
  {
    title: "Campaign optimization",
    href: `${help}/campaign-editing/optimization`,
  },
]

const ctas = [
  {
    title: "Ready to launch a campaign?",
    copy: "Let's dive in! Use this knowledge to craft standout posts and ads that make an impact today.",
    action: "Get started",
    href: "https://ads.x.com",
  },
  {
    title: "Got a big campaign coming up?",
    copy: "Connect with a X Ads specialist to get personalized help buying ads, launching IOs, and more.",
    action: "Contact us",
    href: "/business-x/advertising#contact",
  },
  {
    title: "Experiencing another issue?",
    copy: "File a support ticket for specific account-related queries and troubleshooting.",
    action: "Submit a ticket",
    href: "https://help.x.com/forms/ads",
  },
]

// business.x.com/en/help is served in x.com's older dark design. The clone
// keeps its content and sets it in the frame the rest of the site uses.
export default function HelpPage() {
  return (
    <BusinessFrame>
      <Hero
        title="X Ads Help Center"
        description="You’re in the right place. Here you'll find answers and assistance for all things related to X Ads."
        actions={
          <InputGroup className="w-full max-w-100">
            <InputGroupAddon align="inline-start">
              <IconSearch />
            </InputGroupAddon>
            <InputGroupInput
              placeholder="Search"
              aria-label="Search the Help Center"
            />
          </InputGroup>
        }
        panel={false}
      />
      <Section rule tight>
        <SectionHeading title="Table of Contents" />
        <ol className="grid grid-cols-1 gap-x-8 md:grid-cols-2">
          {contents.map((item, index) => (
            <li
              key={item.title}
              className="flex flex-col gap-4 border-t border-gray-alpha-400 py-6 lg:pt-6 lg:pb-10"
            >
              <div className="flex flex-col gap-1">
                <h3 className="flex gap-3 text-label-13 text-gray-1000">
                  <span className="text-gray-700">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {item.title}
                </h3>
                <p className="text-copy-13 text-gray-900">{item.copy}</p>
              </div>
              <Button
                shape="rounded"
                size="sm"
                variant="secondary"
                className="self-start"
                nativeButton={false}
                render={<a href={item.href} />}
              >
                Learn more
              </Button>
            </li>
          ))}
        </ol>
      </Section>
      <Section rule tight>
        <div className="flex flex-col gap-3 lg:grid lg:grid-cols-8 lg:gap-x-4">
          <h2 className="text-heading-32 text-balance text-gray-1000 lg:col-span-4">
            Explore our most popular pages
          </h2>
          <Body className="lg:col-span-4">
            <p>
              Get quick solutions and answers to your questions in the X Ads
              Help Center. Browse helpful guides, troubleshoot issues, and
              access support.
            </p>
          </Body>
        </div>
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {popular.map((item) => (
            <li key={item.title} className="flex">
              <Card className="w-full">
                <CardHeader>
                  <CardTitle>{item.title}</CardTitle>
                  <CardDescription>{item.copy}</CardDescription>
                </CardHeader>
                <CardFooter className="mt-auto justify-end">
                  <Button
                    variant="ghost"
                    shape="rounded"
                    size="icon-sm"
                    aria-label={`Open ${item.title}`}
                    nativeButton={false}
                    render={<a href={item.href} />}
                  >
                    <IconArrowRight />
                  </Button>
                </CardFooter>
              </Card>
            </li>
          ))}
        </ul>
      </Section>
      <Section rule tight>
        <SectionHeading title="Don't forget about the basics" />
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {basics.map((item) => (
            <li key={item.title} className="flex">
              <Card className="w-full">
                <CardHeader>
                  <CardTitle>{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="aspect-3/1" />
                <CardFooter className="justify-end">
                  <Button
                    variant="ghost"
                    shape="rounded"
                    size="icon-sm"
                    aria-label={`Open ${item.title}`}
                    nativeButton={false}
                    render={<a href={item.href} />}
                  >
                    <IconArrowRight />
                  </Button>
                </CardFooter>
              </Card>
            </li>
          ))}
        </ul>
      </Section>
      <Section rule tight className="lg:pb-30">
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {ctas.map((item) => {
            const external = /^https?:/.test(item.href)
            return (
              <li key={item.title} className="flex">
                <div className="flex w-full flex-col justify-end gap-4 bg-gray-100 p-6 sm:aspect-3/4">
                  <div className="flex flex-col gap-1">
                    <h3 className="text-heading-20 text-balance text-gray-1000">
                      {item.title}
                    </h3>
                    <p className="text-copy-13 text-gray-900">{item.copy}</p>
                  </div>
                  <Button
                    shape="rounded"
                    size="sm"
                    className="self-start"
                    nativeButton={false}
                    render={
                      external ? (
                        <a href={item.href} />
                      ) : (
                        <Link href={item.href} />
                      )
                    }
                  >
                    {item.action}
                  </Button>
                </div>
              </li>
            )
          })}
        </ul>
      </Section>
    </BusinessFrame>
  )
}
