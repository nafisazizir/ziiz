import type { Metadata } from "next"
import Link from "next/link"

import { BlogColumns } from "@/components/art/blog/columns"
import { BlogLens } from "@/components/art/blog/lens"
import { BlogSpread } from "@/components/art/blog/spread"
import { BusinessFrame } from "@/components/business-x/frame"
import { Hero } from "@/components/business-x/hero"
import { ResourceCards } from "@/components/business-x/resource-cards"
import { Body, Section, SectionHeading } from "@/components/business-x/section"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Resources | X Business",
  description:
    "The Resources page of business.x.com rebuilt from ziiz components as shipped.",
}

const stories = [
  {
    title: "How Naranja X Reached Its iOS Audience with X Ads",
    copy: "Learn how Naranja X leveraged X Ads to efficiently connect with iOS users and achieve outstanding results in customer acquisition.",
    href: "/business-x/success-stories",
  },
  {
    title: "iz Banking Experience",
    copy: "How Alinma Bank surges iz Banking App launch with X.",
    href: "/business-x/success-stories",
  },
  {
    title: "Bitvavo",
    copy: "How Bitvavo acquired new users with the App Installs objective.",
    href: "/business-x/success-stories",
  },
]

const posts = [
  {
    title: "X Enables Advertisers to Use Any Creative Ad Format",
    copy: "Reuse Existing Social Media Creatives Directly on X, No Reformatting Required",
    href: "/business-x/blog",
    art: BlogColumns,
  },
  {
    title: "Creator Updates + $1M Article Contest",
    copy: "We closed 2025 with the highest payouts since our monetization program launched and we are just getting started. This year, our focus is clear: empower creators to grow and earn more on X.",
    href: "/business-x/blog",
    art: BlogLens,
  },
  {
    title: "The Super Bowl Conversation Belonged to X",
    copy: "Super Bowl LX delivered massive buzz on X, and your campaigns helped shape the conversation. As the real-time hub for live events, X amplified every moment from kickoff reactions to halftime highlights and post-game debates, driving authentic engagement for brands.",
    href: "/business-x/blog",
    art: BlogSpread,
  },
]

const downloads = [
  {
    title: "Starter Kits",
    copy: "Setting up a new account or campaign? Brainstorming your next month of posts? Download one of our kits to get all-in-one resources for each task.",
    action: "Download Now",
    href: "https://business.x.com/en/resources/starter-kits",
  },
  {
    title: "Campaign Guides",
    copy: "Unlock the secrets to running successful Sales and App campaigns on X with our all-encompassing campaign guides.",
    action: "Download Now",
    href: "https://business.x.com/en/resources/campaign-guides",
  },
  {
    title: "Webinars",
    copy: "Dive into our webinars to uncover the full potential of X Ad formats, master best practices, and learn insights to achieve success on X.",
    action: "Watch Now",
    href: "https://business.x.com/en/resources/webinars",
  },
  {
    title: "X 2026 Marketing Calendar",
    copy: "The world’s most powerful moments and movements all unfold on X.",
    action: "View The Calendar",
    href: "/business-x/resources/x-marketing-calendar",
  },
]

// business.x.com/en/resources is served in x.com's older dark design with a
// top bar. The clone keeps its content and sets it in the frame the rest of
// the site uses: a hero without a drawing, then the same card and split
// rows as the section landings.
export default function ResourcesPage() {
  return (
    <BusinessFrame>
      <Hero
        title="X Ads Resources"
        description="Explore tools, tips, and success stories to grow your business with X Ads. Whether you're an advertising professional or just getting started, find insights and resources that drive results."
        actions={
          <Button
            shape="rounded"
            size="sm"
            nativeButton={false}
            render={<a href="https://ads.x.com" />}
          >
            Launch an ad
          </Button>
        }
        panel={false}
      />
      <Section rule tight>
        <SectionHeading
          title="Success Stories"
          subtitle="See how brands found their community using X Ads."
        />
        <ResourceCards items={stories} />
        <Button
          shape="rounded"
          size="sm"
          variant="secondary"
          className="self-start"
          nativeButton={false}
          render={<Link href="/business-x/success-stories" />}
        >
          Explore Success Stories
        </Button>
      </Section>
      <Section rule tight>
        <div className="flex flex-col gap-6 lg:grid lg:grid-cols-8 lg:gap-x-4">
          <div className="aspect-4/3 bg-gray-100 lg:col-span-4" />
          <div className="flex flex-col gap-5 lg:col-span-4 lg:self-center">
            <h2 className="text-heading-32 text-balance text-gray-1000">
              X Ads Academy
              <span className="block text-gray-900">
                Access step-by-step tutorials to grow your business.
              </span>
            </h2>
            <Body>
              <p>
                With X Ads Academy, you’ll do more than just earn Likes and
                Reposts. It’s your hub for sparking conversations, creating
                connections, and launching campaigns, all right at your
                fingertips.
              </p>
            </Body>
            <div className="flex flex-wrap gap-3">
              <Button
                shape="rounded"
                size="sm"
                nativeButton={false}
                render={
                  <a href="https://business.x.com/en/resources/academy" />
                }
              >
                Learn More
              </Button>
              <Button
                shape="rounded"
                size="sm"
                variant="secondary"
                nativeButton={false}
                render={<Link href="/business-x/advertising#contact" />}
              >
                Book A Call
              </Button>
            </div>
          </div>
        </div>
      </Section>
      <Section rule tight>
        <SectionHeading title="Blog" />
        <ResourceCards items={posts} />
        <Button
          shape="rounded"
          size="sm"
          variant="secondary"
          className="self-start"
          nativeButton={false}
          render={<Link href="/business-x/blog" />}
        >
          Read More
        </Button>
      </Section>
      <Section rule tight>
        <SectionHeading
          title="Downloadable Resources"
          subtitle="Need help with post ideas or targeting? This page has everything, from guides and worksheets to kits, to help you reach your goals with ease."
        />
        <ul className="flex flex-col gap-10 lg:gap-12">
          {downloads.map((item) => {
            const external = /^https?:/.test(item.href)
            return (
              <li
                key={item.title}
                className="flex flex-col gap-6 lg:grid lg:grid-cols-8 lg:gap-x-4"
              >
                <div className="aspect-video bg-gray-100 lg:col-span-3" />
                <div className="flex flex-col gap-4 lg:col-span-5 lg:self-center">
                  <div className="flex flex-col gap-1">
                    <h3 className="text-heading-24 text-gray-1000">
                      {item.title}
                    </h3>
                    <p className="text-copy-13 text-balance text-gray-900">
                      {item.copy}
                    </p>
                  </div>
                  <Button
                    shape="rounded"
                    size="sm"
                    variant="secondary"
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
