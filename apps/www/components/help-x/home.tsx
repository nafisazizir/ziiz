import Link from "next/link"
import {
  IconArrowBackUp,
  IconBulb,
  IconCurrentLocation,
  IconRosetteDiscountCheck,
} from "@tabler/icons-react"

import { Shelf } from "@/components/art"
import { XText } from "@/components/business-x/runs"
import { ArticleList, categoryArt } from "@/components/help-x/category"
import { HelpSearch } from "@/components/help-x/search"
import { Button } from "@/components/ui/button"

// The shelf's boxes are links: each sits over its drawing, placed in
// percentages of the panel, once for the wide drawing and once for the
// narrow one. Positions are the site's.
const shelf = {
  wide: [
    ["rules-and-policies", "Rules and Policies", 7.128, 32.444, 24.342, 16.222],
    [
      "managing-your-account",
      "Managing your Account",
      52.853,
      23.778,
      21.791,
      15.719,
    ],
    ["using-x", "Using X", 12.118, 77.444, 20.252, 18.057],
    [
      "safety-and-security",
      "Safety and Security",
      37.475,
      66.469,
      20.163,
      18.42,
    ],
    [
      "business-and-advertising",
      "Business and Advertising",
      70.323,
      73.079,
      25.35,
      22.366,
    ],
  ],
  narrow: [
    ["rules-and-policies", "Rules and Policies", 48.119, 8.962, 41.882, 16.104],
    [
      "managing-your-account",
      "Managing your Account",
      37.487,
      37.024,
      50.258,
      10.642,
    ],
    ["using-x", "Using X", 14.495, 61.411, 41.881, 20.618],
    [
      "safety-and-security",
      "Safety and Security",
      7.921,
      78.717,
      45.372,
      16.684,
    ],
    [
      "business-and-advertising",
      "Business and Advertising",
      39.604,
      23.349,
      55.198,
      14.714,
    ],
  ],
} as const

// The opening screen: a two-line greeting on the left four columns, the
// search field against the right edge, and the shelf under both. From 768px
// the shelf runs 16px past the column on each side, as the site's does;
// below it the drawing is the narrow one, nearly square.
export function HelpHero() {
  return (
    <section className="flex flex-col pt-7.5 lg:pt-20">
      <div className="grid grid-cols-8 gap-x-4 gap-y-5 lg:gap-y-6">
        <div className="col-span-full flex flex-col gap-2 lg:col-span-4">
          <p className="text-heading-32 text-gray-1000">Hello,</p>
          <h1 className="text-heading-32 text-balance text-gray-900">
            What can we help you find today?
          </h1>
        </div>
        <div className="col-span-full flex lg:col-span-4 lg:col-start-5 lg:items-end lg:justify-end">
          <HelpSearch />
        </div>
        <div className="relative col-span-full aspect-404/424 w-full overflow-hidden bg-gray-100 text-gray-1000 md:-ml-[1.42857%] md:aspect-982/450 md:w-[102.85714%]">
          <Shelf
            variant="wide"
            className="absolute inset-0 hidden size-full md:block"
          />
          <Shelf
            variant="narrow"
            className="absolute inset-0 size-full md:hidden"
          />
          {(["wide", "narrow"] as const).map((variant) => (
            <ul
              key={variant}
              className={
                variant === "wide"
                  ? "absolute inset-0 hidden md:block"
                  : "absolute inset-0 md:hidden"
              }
            >
              {shelf[variant].map(([slug, label, left, top, width, height]) => (
                <li
                  key={slug}
                  className="absolute"
                  style={{
                    left: `${left}%`,
                    top: `${top}%`,
                    width: `${width}%`,
                    height: `${height}%`,
                  }}
                >
                  <Link
                    href={`/help-x/${slug}`}
                    className="block size-full rounded-xs outline-offset-2 outline-gray-1000 focus-visible:outline-2"
                  >
                    <span className="sr-only">{label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  )
}

const featured = [
  {
    slug: "rules-and-policies",
    title: "Rules and Policies",
    copy: "Learn how we keep the platform safe and fair",
    items: [
      ["US Take It Down Act", "rules-and-policies/us-tida"],
      ["How we enforce our rules", "rules-and-policies/enforcement-options"],
      ["Notices on >x< and what they mean", "rules-and-policies/notices-on-x"],
      ["How cookies are used on >x<", "rules-and-policies/x-cookies"],
    ],
  },
  {
    slug: "managing-your-account",
    title: "Managing your Account",
    copy: "Update your settings, security, and details",
    items: [
      [
        "About suspended accounts",
        "managing-your-account/suspended-x-accounts",
      ],
      [
        "Help with locked or limited account",
        "managing-your-account/locked-and-limited-accounts",
      ],
      [
        "How to add your phone number to your account",
        "managing-your-account/how-to-add-a-phone-number-to-your-account",
      ],
      [
        "How to update your email address",
        "managing-your-account/how-to-update-your-email-address",
      ],
    ],
  },
  {
    slug: "using-x",
    title: "Using >x<",
    copy: "Learn the basics of posting and navigating",
    items: [
      ["How to post", "using-x/how-to-post"],
      ["About >x<.com supported browsers", "using-x/x-supported-browsers"],
      ["About Direct Messages", "using-x/direct-messages"],
      ["How to share and watch videos on >x<", "using-x/x-videos"],
    ],
  },
  {
    slug: "safety-and-security",
    title: "Safety and security",
    copy: "What's allowed and how it's enforced",
    items: [
      [
        "How to protect your personal information",
        "safety-and-security/x-privacy-settings",
      ],
      [
        "About public and protected Posts",
        "safety-and-security/public-and-protected-posts",
      ],
      [
        "Additional information sharing with business partners",
        "safety-and-security/data-through-partnerships",
      ],
      [
        "Help with my compromised account",
        "safety-and-security/x-account-compromised",
      ],
    ],
  },
  {
    slug: "business-and-advertising",
    title: "Business and Advertising",
    copy: "Answers and assistance for all things >x< Ads",
    items: [
      ["How >x< Ads Work", "business-and-advertising/how-x-ads-work"],
      ["Ads Pricing", "business-and-advertising/ads-pricing"],
      [
        "Creative Ad Specs",
        "business-and-advertising/creative-ad-specifications",
      ],
      ["Campaign Setup", "business-and-advertising#campaign-setup"],
    ],
  },
]

// "New to X?": one row per category. From 1024px a grey tile (name, a line
// of copy, the button, the drawing in its right half) sits beside the
// category's four lead articles; below that the list drops under the tile,
// and below 500px the drawing drops under the copy inside it.
export function HelpCategories() {
  return (
    <section className="flex w-full flex-col gap-10 py-10 lg:py-20">
      <h2 className="border-t border-gray-alpha-400 pt-13 text-heading-32 text-balance text-gray-1000">
        <XText>{"New to >x<?"}</XText>
        <span className="block text-gray-900">Start with the glossary</span>
      </h2>
      <ul className="flex w-full flex-col gap-24 lg:gap-12">
        {featured.map((category) => {
          const Art = categoryArt[category.slug]
          return (
            <li
              key={category.slug}
              id={`categories_${category.slug}`}
              className="flex w-full scroll-mt-24 flex-col gap-3 min-[1160px]:grid-cols-[632fr_456fr] lg:grid lg:gap-6 lg:max-[1159px]:grid-cols-[45fr_55fr]"
            >
              <div className="relative min-h-106 w-full min-w-0 overflow-hidden bg-gray-100 min-[500px]:flex min-[500px]:min-h-0 min-[500px]:flex-col min-[500px]:justify-center">
                <div className="flex w-full flex-col items-start gap-4 p-6 min-[500px]:max-w-1/2 min-[500px]:py-10 min-[500px]:ps-10 min-[500px]:pe-0 lg:max-w-76">
                  <p className="flex flex-col gap-1 text-heading-24 min-[500px]:text-heading-20 md:text-heading-24 lg:text-heading-20">
                    <span className="text-gray-1000">
                      <XText>{category.title}</XText>
                    </span>
                    <span className="min-h-14 text-gray-900 min-[500px]:min-h-12 md:min-h-14 lg:min-h-12">
                      <XText>{category.copy}</XText>
                    </span>
                  </p>
                  <div className="pointer-events-none flex h-56 w-full items-center justify-center px-3 text-gray-1000 min-[500px]:absolute min-[500px]:inset-y-0 min-[500px]:start-1/2 min-[500px]:end-0 min-[500px]:h-auto min-[500px]:w-auto min-[500px]:justify-end min-[500px]:px-0 min-[500px]:py-2 min-[500px]:ps-5 lg:start-76 lg:max-[1159px]:hidden">
                    <Art className="size-full max-h-full max-w-full" />
                  </div>
                  <Button
                    shape="rounded"
                    size="sm"
                    nativeButton={false}
                    render={<Link href={`/help-x/${category.slug}`} />}
                  >
                    See all Articles
                  </Button>
                </div>
              </div>
              <ArticleList
                items={category.items.map(([title, path]) => ({
                  title,
                  href: `/help-x/${path}`,
                }))}
                className="h-14 px-3 py-4"
              />
            </li>
          )
        })}
      </ul>
    </section>
  )
}

const resources = [
  {
    icon: IconRosetteDiscountCheck,
    title: "About >x< Premium",
    copy: "What >x< Premium includes, how the three tiers compare, and how to subscribe.",
    href: "/help-x/using-x/x-premium",
  },
  {
    icon: IconCurrentLocation,
    title: "Identifying information for a post",
    copy: "How to find and copy the URL for any post, Moment, List, Space, or Community on >x<.",
    href: "/help-x/using-x/post-and-moment-url",
  },
  {
    icon: IconBulb,
    title: 'About your "For you" timeline on >x<',
    copy: 'How your "For you" timeline works, what you see, and how to switch timelines.',
    href: "/help-x/using-x/x-timeline",
  },
  {
    icon: IconArrowBackUp,
    title: "Undo Post",
    copy: "How to retract a post before it goes live, and how to adjust the undo window duration.",
    href: "/help-x/using-x/undo-post",
  },
]

// "There's more.": the heading in a 408px column, four resources in two
// columns beside it, each under a hairline. Below 1024px the heading leads;
// below 640px the resources are one column.
export function HelpResources() {
  return (
    <section className="flex w-full flex-col gap-10 py-10 min-[1160px]:grid-cols-[408px_1fr] lg:grid lg:items-start lg:gap-8 lg:py-20 lg:max-[1159px]:grid-cols-[360fr_688fr]">
      <h2 className="text-heading-32 text-balance text-gray-1000">
        There&apos;s more.
        <span className="block whitespace-pre-line text-gray-900">
          {"Resources to keep\nyou moving forward."}
        </span>
      </h2>
      <ul className="grid min-w-0 gap-8 sm:grid-cols-2">
        {resources.map((resource) => (
          <li
            key={resource.href}
            className="flex h-full flex-col items-start gap-6 border-t border-gray-alpha-400 pt-8"
          >
            <resource.icon className="size-6 text-gray-1000" />
            <div className="flex flex-1 flex-col items-start gap-4 self-stretch">
              <div className="flex flex-col gap-1.5">
                <p className="text-label-16 text-gray-1000">
                  <XText>{resource.title}</XText>
                </p>
                <p className="text-copy-16 text-gray-900">
                  <XText>{resource.copy}</XText>
                </p>
              </div>
              <Button
                variant="secondary"
                shape="rounded"
                size="sm"
                nativeButton={false}
                render={<Link href={resource.href} />}
              >
                Learn More
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
