import { Eyebrow } from "@/components/business-x/section"
import { Post } from "@/components/business-x/mocks/post"
import { XText } from "@/components/business-x/runs"
import { StoryCard, type Story } from "@/components/business-x/story-card"
import { XLogo } from "@/components/business-x/x-logo"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const stories: Story[] = [
  {
    slug: "nexters_achieves_outstanding_roas_sales_campaigns",
    brand: "Nexters",
    category: "Website conversions",
    date: "Jul 15, 2024",
    description:
      "How Nexters achieved outstanding engagement with sales campaigns.",
  },
  {
    slug: "codefinity_approach_to_driving_conversions",
    brand: "Codefinity",
    category: "Conversions",
    date: "Jul 19, 2024",
    description:
      "From curiosity to conversion: Codefinity's approach to driving enrollments.",
  },
  {
    slug: "how-1x-drove-virality-for-neo-launch-with-takeovers",
    brand: "1X NEO",
    category: "Takeover",
    date: "Jan 23, 2026",
    description: "How 1X drove virality for NEO launch with Takeovers.",
  },
]

// "Customer success stories": the eyebrow beside a right-aligned heading,
// then three cards on a 1:2:1 grid from 1024px, the wide middle one dark.
// Below that the cards wrap two up from 768px and stack under it.
export function HomeStories() {
  return (
    <section className="flex flex-col gap-14 border-t border-gray-alpha-400 pt-4 pb-4 lg:gap-21.5 lg:pt-20 lg:pb-30">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:gap-8">
        <Eyebrow className="max-lg:border-0 max-lg:pb-0 lg:shrink-0 lg:pt-1">
          Customer success stories
        </Eyebrow>
        <h2 className="text-heading-32 text-gray-1000 lg:flex-1 lg:text-right">
          Discover how leading brands achieve measurable
          <br />
          <span className="text-gray-900">
            Growth through successful campaigns on X
          </span>
        </h2>
      </div>
      <ul className="flex flex-wrap gap-10 md:gap-6 lg:grid lg:grid-cols-[1fr_2fr_1fr] lg:items-start lg:gap-x-6 lg:gap-y-2">
        {stories.map((story, index) => (
          <StoryCard
            key={story.slug}
            story={story}
            dark={index === 1}
            className="grow basis-full md:basis-[calc(50%-0.75rem)]"
          />
        ))}
      </ul>
    </section>
  )
}

const tiles = [56, 64, 64, 72, 64, 64, 56]

// "Level up with X Premium Business": the heading, a row of app tiles fading
// out at both ends, then the pitch and its pill. From 1024px the three sit
// in one row; below, they stack and centre.
export function PremiumStrip() {
  return (
    <section className="border-t border-gray-alpha-400 pt-20 lg:py-18">
      <div className="grid grid-cols-1 justify-items-center gap-8 lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:items-start lg:gap-x-4 lg:gap-y-6">
        <h2 className="text-center text-heading-32 text-balance text-gray-1000 lg:row-span-2 lg:w-74 lg:text-left">
          {`Level up with `}
          <br />
          <XText>{">x< Premium Business"}</XText>
        </h2>
        <div className="relative mx-auto w-fit max-w-full lg:col-start-2 lg:row-start-1">
          <ul className="flex items-center justify-center gap-5 overflow-x-clip">
            {tiles.map((size, index) => (
              <li
                key={index}
                className="flex shrink-0 items-center justify-center rounded-2xl bg-gray-200 text-gray-1000"
                style={{ width: size, height: size }}
              >
                {index === 3 && <XLogo className="size-8" />}
              </li>
            ))}
          </ul>
          <span className="pointer-events-none absolute inset-y-0 left-0 w-18 bg-linear-to-r from-background-100 to-transparent lg:w-36" />
          <span className="pointer-events-none absolute inset-y-0 right-0 w-25 bg-linear-to-l from-background-100 to-transparent lg:w-42" />
        </div>
        <div className="flex flex-col items-center gap-3 lg:contents">
          <p className="text-center text-copy-13 text-gray-900 lg:col-start-3 lg:row-span-2 lg:w-76 lg:text-left">
            One subscription to boost sales, build trust, hire top talent, and
            unlock exclusive market insights on X.
          </p>
          <Button
            shape="rounded"
            size="sm"
            nativeButton={false}
            className="lg:col-start-2 lg:row-start-2 lg:justify-self-center"
            render={<a href="https://x.com/i/premium-business" />}
          >
            Explore Premium Business
          </Button>
        </div>
      </div>
    </section>
  )
}

const posts: { text: string; media?: number; link?: string }[] = [
  {
    text: "NFL fans are going BIG on X for Thursday Night Football, with Week 2 driving 15% more impressions, 40% more video views and 15% more engagements vs. the same game last year.\n\nWhen tonight’s kickoff hits, follow along in real time in NFL Gametime on X",
    media: 5 / 2,
    link: "NFL Hub - watch the action on X",
  },
  {
    text: "New courses just dropped on X Ads Academy.\n\nLearn the fundamentals that drive performance on X. Pass the assessment. Earn a badge.",
  },
  {
    text: "Game, set, match.\n\nThe already massive US Open conversation on X got even bigger this year, with impressions up +32% YoY, video views up +23% YoY and engagement rate up +15% YoY among U.S. audiences.",
    media: 16 / 9,
  },
  {
    text: "Awards season is taking center stage on X.\n\nWith fan voting open, posts about the #VMAs surged +153% vs. last week. The countdown to Sunday's show is on and the hype is already building on the timeline.",
  },
  {
    text: "Gift lists are growing, and we’re here to show you how to get holiday-ready on X\n\nSign up for our Shopping Season webinar and discover how to optimize your campaigns and reach more customers when it matters most.",
    media: 16 / 9,
  },
  {
    text: "Introducing Cashtag Partners for stocks and crypto\n\nX is the best source of financial news for traders and investors, and we've made it easier than ever to connect financial conversations with the ability to trade.",
    media: 16 / 9,
  },
]

const offsets = ["mt-4", "mt-12", "mt-2", "mt-22", "mt-9", "mt-17"]

// "The latest from @XBusiness": a wall of posts scrolling past in a grey
// band, fading at both edges, over a short caption and a Follow pill. The
// site animates the wall; here the row simply overflows and fades.
export function PostWall() {
  return (
    <section className="overflow-hidden bg-gray-100">
      <div className="flex flex-col items-center gap-10 py-12 lg:py-16">
        <div className="w-full overflow-hidden mask-x-from-85%">
          <ul className="flex w-max items-start gap-22 px-10">
            {posts.map((post, index) => (
              <li key={index} className={cn("w-76 shrink-0", offsets[index])}>
                <Post
                  name="Business"
                  handle="@XBusiness"
                  text={post.text}
                  media={post.media}
                  className="max-w-none"
                />
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col items-center gap-3 px-6 text-center">
          <div className="flex max-w-80 flex-col gap-1">
            <h2 className="text-label-13 text-gray-1000">
              The latest from @XBusiness
            </h2>
            <p className="text-copy-13 text-gray-900">
              {`Fresh posts, product news, and tips, live from our timeline. See
              what we're posting in real time.`}
            </p>
          </div>
          <Button
            shape="rounded"
            size="sm"
            nativeButton={false}
            render={<a href="https://x.com/XBusiness" />}
          >
            Follow @XBusiness
          </Button>
        </div>
      </div>
    </section>
  )
}
