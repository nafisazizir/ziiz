import Link from "next/link"

import type { Run } from "@/components/business-x/blog"
import { Runs, XText } from "@/components/business-x/runs"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"

type Question = { q: string; a?: Run[][]; list?: string[] }

const questions: Question[] = [
  {
    q: "Who is >x< Money available to?",
    a: [
      [
        ">x< Money is currently available to select users in the United States who are 18 or older. We're working to expand access to more users soon.",
      ],
    ],
  },
  {
    q: "How do I get started?",
    a: [
      [
        "If you're eligible, you'll see the \"Money\" tab in your sidebar on the >x< app and ",
        { a: "https://x.com", r: ["X.com"] },
        ". Tap it and follow a few simple steps to onboard. Make sure your app is updated to the latest version.",
      ],
    ],
  },
  {
    q: "How is my money protected?",
    a: [
      [
        "Your >x< Money account is secured with passkeys for fast, safe authentication, plus advanced security controls you can enable for extra peace of mind.",
      ],
      [
        "Your funds are also eligible for FDIC insurance up to $250,000 through our partner bank — with up to $10 million in coverage available through the Cash Sweep Program. See ",
        { a: "https://money.x.com/customer/sweep-banks", r: ["here"] },
        " for details.³",
      ],
    ],
  },
  {
    q: "Is my financial activity private?",
    a: [
      [
        "Yes. Everything you do on >x< Money is private to you by default. You can choose to share certain transactions on the >x< timeline, but sharing is always optional and entirely your choice.",
      ],
    ],
  },
  {
    q: "How do I earn up to 6.00% APY?",
    a: [
      [
        "Premium+ users are eligible for 6.00% APY. All other users may be eligible for a boosted APY of 6.00% when Qualifying Direct Deposit requirements are met. New York residents do not obtain APY, interest, or interest boosts on Stored Value Accounts. See ",
        { a: "/money-x/interest-faq", r: ["here"] },
        " for details, eligibility, and current rates.",
      ],
    ],
  },
  {
    q: "What are the benefits of the >x< Card?",
    list: [
      "Up to 3% cashback on eligible purchases²",
      "Worldwide ATM fee reimbursements⁶",
      "No foreign transaction fees",
      "Use it everywhere Visa is accepted",
      "Purchases are protected by Visa's Zero Liability Policy, so you won't be held responsible for unauthorized charges",
    ],
  },
]

// "Your questions, answered" with the link through to the full FAQ under
// the heading: heading in the left four columns, accordion in the right
// four from 1024px, stacked 40px apart below. The first question is open.
export function MoneyFaq() {
  return (
    <div className="flex flex-col gap-10 lg:grid lg:grid-cols-8 lg:gap-x-4 lg:gap-y-0">
      <header className="flex flex-col items-start lg:col-span-4">
        <h2 className="text-heading-32 text-balance text-gray-1000">
          Your questions, answered
          <span className="block text-gray-900">
            Everything you need to know
          </span>
        </h2>
        <Button
          shape="rounded"
          size="sm"
          nativeButton={false}
          render={<Link href="/money-x/faq" />}
          className="mt-6"
        >
          See more FAQs
        </Button>
      </header>
      <Accordion defaultValue={[questions[0].q]} className="lg:col-span-4">
        {questions.map((item) => (
          <AccordionItem key={item.q} value={item.q}>
            <AccordionTrigger>
              <span>
                <XText>{item.q}</XText>
              </span>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-2 text-copy-13 text-gray-900 [&_a]:text-gray-1000 [&_a]:underline">
              {item.a?.map((paragraph, index) => (
                <p key={index}>
                  <Runs runs={paragraph} />
                </p>
              ))}
              {item.list && (
                <ul className="flex list-disc flex-col gap-1 pl-5">
                  {item.list.map((entry) => (
                    <li key={entry}>{entry}</li>
                  ))}
                </ul>
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
