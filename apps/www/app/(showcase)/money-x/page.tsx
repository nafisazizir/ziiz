import type { Metadata } from "next"
import {
  IconCreditCardRefund,
  IconShieldCheck,
  IconTrendingUp,
} from "@tabler/icons-react"

import { DashField } from "@/components/art/sections/dash-field"
import { MoneyFrame } from "@/components/business-x/frame"
import { XText } from "@/components/business-x/runs"
import { Section } from "@/components/business-x/section"
import { MoneyFaq } from "@/components/money-x/faq"
import { MoneyFeatures } from "@/components/money-x/features"
import { Footnotes } from "@/components/money-x/footnotes"
import { MoneyHero } from "@/components/money-x/hero"
import { InterestField } from "@/components/money-x/interest"
import { MoneyPhone } from "@/components/money-x/mocks/screen"
import { Showcase } from "@/components/money-x/showcase"

export const metadata: Metadata = {
  title: "X Money — Every dollar works harder on X",
  description:
    "The home page of money.x.com rebuilt from ziiz components as shipped.",
}

const earn = [
  { icon: IconTrendingUp, label: "Up to 6.00% APY¹" },
  { icon: IconCreditCardRefund, label: "Up to 3% cashback²" },
  { icon: IconShieldCheck, label: "Up to $10M in FDIC insurance³" },
]

// money.x.com's home in the frame the business clone uses, a section per
// screen. Below 1024px the site sets its sections 40px apart on top of
// their own padding; the wrapper carries that gap.
export default function MoneyXPage() {
  return (
    <MoneyFrame>
      <div className="flex flex-col max-lg:gap-10">
        <MoneyHero />
        <Section rule>
          <Showcase
            eyebrow=">x< Money"
            title="Built to earn"
            subtitle="Every dollar works harder on >x<"
            panelClassName="aspect-400/511"
            panel={
              <>
                <DashField className="absolute inset-0 size-full" />
                <MoneyPhone
                  dollars="$4,410"
                  cents="21"
                  className="absolute top-[13cqw] left-1/2 -translate-x-1/2 [zoom:calc(65cqw/300px)]"
                />
              </>
            }
          >
            <p className="hidden text-label-13 text-balance text-gray-900 lg:block">
              Your money shouldn’t sit idle. Earn yield, get cashback, and
              manage it all in one place.
            </p>
            <ul className="flex flex-col gap-5 lg:gap-4">
              {earn.map((row) => (
                <li
                  key={row.label}
                  className="flex items-center gap-3 not-first:border-t not-first:border-gray-alpha-400 not-first:pt-5 lg:not-first:pt-4"
                >
                  <row.icon
                    stroke={1.5}
                    className="size-5 shrink-0 text-gray-1000"
                  />
                  <span className="text-label-13 text-gray-1000">
                    {row.label}
                  </span>
                </li>
              ))}
            </ul>
          </Showcase>
        </Section>
        <Section
          id="features"
          rule
          className="scroll-mt-24 gap-12 pt-4 pb-4 lg:gap-12 lg:pb-30"
        >
          <div className="flex flex-col gap-4 lg:grid lg:grid-cols-8">
            <div className="flex items-center gap-2 lg:col-span-4 lg:self-start lg:pt-1">
              <span aria-hidden className="size-1 shrink-0 bg-gray-700" />
              <p className="text-label-12 text-gray-1000">Automatic growth</p>
            </div>
            <h2 className="text-heading-32 text-balance text-gray-1000 lg:col-span-4 lg:col-start-5">
              Industry-leading interest
              <span className="block text-gray-900">
                More than 10x the national average⁴
              </span>
            </h2>
          </div>
          <InterestField />
        </Section>
        <Section rule className="pt-10.5 pb-4 lg:pb-30">
          <h2 className="text-heading-32 text-balance text-gray-1000">
            One app
            <span className="block text-gray-900">Everything money can do</span>
          </h2>
          <MoneyFeatures />
        </Section>
        <Section rule>
          <Showcase
            eyebrow="Secured assets"
            title="Protected with FDIC"
            subtitle="Coverage up to $10M"
            panelClassName="aspect-400/365"
            panel={
              <>
                <DashField className="absolute inset-0 size-full" />
                <MoneyPhone
                  dollars="$22,630"
                  cents="12"
                  className="absolute top-[11cqw] left-[12.5cqw] [zoom:calc(112.5cqw/300px)]"
                />
              </>
            }
            className="mt-6 flex-row items-center gap-6 lg:flex-col lg:items-stretch lg:gap-8"
          >
            <span
              aria-hidden
              className="flex size-24 shrink-0 flex-col items-center justify-center gap-0.5 rounded-full border border-gray-alpha-400 bg-gray-100 text-gray-1000 lg:max-[1219px]:order-last"
            >
              <IconShieldCheck stroke={1.5} className="size-5" />
              <span className="text-heading-16">FDIC</span>
            </span>
            <p className="text-copy-13 text-balance text-gray-900">
              <XText>
                {
                  "Up to $10M in FDIC insurance through the Cash Sweep Program³ — 40x the standard coverage.⁵"
                }
              </XText>
            </p>
          </Showcase>
        </Section>
        <Section rule>
          <MoneyFaq />
        </Section>
        <Section rule className="py-14 lg:py-14">
          <Footnotes />
        </Section>
      </div>
    </MoneyFrame>
  )
}
