import {
  IconChevronLeft,
  IconDots,
  IconPlayerPlay,
  IconRosetteDiscountCheck,
  IconSearch,
  IconShoppingBag,
} from "@tabler/icons-react"

import {
  AdPost,
  FeedPhone,
  FillerPost,
} from "@/components/business-x/mocks/feed"
import { Phone } from "@/components/business-x/mocks/phone"
import { Post } from "@/components/business-x/mocks/post"
import { XLogo } from "@/components/business-x/x-logo"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

// A publisher's video with a pre-roll ad playing over it.
export function AmplifyPhone({ className }: { className?: string }) {
  return (
    <FeedPhone className={className}>
      <Post
        flat
        name="MLB"
        handle="@MLB"
        text="Three straight hits and the @Rangers take the lead in Game 5. #WorldSeries"
        counts={["42", "246", "1.6K", "4M"]}
      >
        <p className="mt-2 text-label-12 text-gray-700">
          Video will play after ad
        </p>
        <AspectRatio
          ratio={16 / 9}
          className="mt-2 flex flex-col justify-between overflow-hidden rounded-lg bg-gray-200 p-2"
        >
          <span className="flex items-center gap-1.5 text-label-12 text-gray-1000">
            <Avatar size="sm">
              <AvatarFallback>M</AvatarFallback>
            </Avatar>
            MLB
          </span>
          <span className="flex items-end justify-between">
            <Badge variant="secondary">Ad · 0:05</Badge>
            <span className="h-8 w-14 rounded bg-gray-300" />
          </span>
        </AspectRatio>
      </Post>
      <FillerPost />
    </FeedPhone>
  )
}

// The first ad of the day at the top of the timeline.
export function TakeoverPhone({ className }: { className?: string }) {
  return (
    <FeedPhone className={className}>
      <AdPost
        kind="video"
        name="BetMGM"
        handle="@BetMGM"
        text="Finger crossed @tombrady and Vince can get it together in time for our first Big Game commercial on 2/11/24!!"
      />
      <FillerPost />
    </FeedPhone>
  )
}

const trends = ["For You", "Trending", "News", "Sports", "Entertainment"]

// The Explore tab with a Spotlight Takeover across its top.
export function ExplorePhone({ className }: { className?: string }) {
  return (
    <Phone className={className}>
      <div className="flex items-center justify-between px-4 pb-2">
        <Avatar size="sm">
          <AvatarFallback>B</AvatarFallback>
        </Avatar>
        <XLogo className="size-5" />
        <span className="size-6" />
      </div>
      <Tabs value="For You" className="gap-0">
        <TabsList
          variant="line"
          className="w-full scrollbar-none justify-start gap-4 overflow-x-auto border-b border-gray-alpha-400 px-4 pb-1"
        >
          {trends.map((tab) => (
            <TabsTrigger key={tab} value={tab} className="flex-none px-0">
              {tab}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      <AspectRatio
        ratio={4 / 3}
        className="flex flex-col justify-between bg-gray-200 p-3"
      >
        <span className="flex items-center gap-1.5 text-label-12 text-gray-1000">
          <Avatar size="sm">
            <AvatarFallback>B</AvatarFallback>
          </Avatar>
          BetMGM
        </span>
        <span className="flex flex-col gap-0.5">
          <span className="text-heading-16 text-gray-1000">#BetMGM</span>
          <span className="text-label-12 text-gray-900">
            For everyone… Except Tom Brady
          </span>
          <span className="text-label-12 text-gray-700">
            Promoted by BetMGM
          </span>
        </span>
      </AspectRatio>
      <ul className="flex flex-col divide-y divide-gray-alpha-400 px-4">
        {[0, 1, 2, 3].map((row) => (
          <li key={row} className="flex items-center justify-between py-3">
            <span className="flex flex-col gap-1.5">
              <span className="h-2 w-16 rounded-full bg-gray-200" />
              <span className="h-2 w-24 rounded-full bg-gray-100" />
            </span>
            <IconDots className="size-4 text-gray-700" />
          </li>
        ))}
      </ul>
    </Phone>
  )
}

const products = [
  ["Pour-over kit", "$48"],
  ["Single origin, 250g", "$18"],
  ["Ceramic mug", "$22"],
  ["Gooseneck kettle", "$79"],
  ["Filters, 100 pack", "$9"],
  ["Gift card", "$25"],
]

// A brand's shop on its profile: a grid of products with prices.
export function ShopPhone({
  title = "The Barista Bar",
  action,
  className,
}: {
  title?: string
  action?: string
  className?: string
}) {
  return (
    <Phone className={className}>
      <div className="flex items-center justify-between px-4 py-2 text-gray-1000">
        <IconChevronLeft className="size-4" />
        <span className="text-label-13">Shop</span>
        <IconSearch className="size-4" />
      </div>
      <div className="flex items-center gap-3 px-4 py-2">
        <Avatar size="lg">
          <AvatarFallback>{title[0]}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="flex items-center gap-1 text-label-13 text-gray-1000">
            {title}
            <IconRosetteDiscountCheck className="size-3.5 text-amber-700" />
          </span>
          <span className="text-label-12 text-gray-900">
            <IconShoppingBag className="mr-1 inline size-3" />
            50 products
          </span>
        </div>
        {action && (
          <Button size="xs" shape="rounded" className="ml-auto">
            {action}
          </Button>
        )}
      </div>
      <ul className="grid grid-cols-2 gap-3 px-4 pt-2">
        {products.map(([name, price]) => (
          <li key={name} className="flex flex-col gap-1.5">
            <AspectRatio ratio={1} className="rounded-lg bg-gray-200" />
            <span className="text-label-12 text-gray-1000">{name}</span>
            <span className="text-label-12 text-gray-900">{price}</span>
          </li>
        ))}
      </ul>
    </Phone>
  )
}

// A live shopping stream: video full-bleed, a product pinned over it.
export function LivePhone({ className }: { className?: string }) {
  return (
    <Phone className={cn("bg-gray-200", className)}>
      <div className="relative flex flex-1 flex-col justify-between bg-gray-200 p-4">
        <span className="flex items-center gap-2">
          <Badge>LIVE</Badge>
          <span className="text-label-12 text-gray-900">12.4K watching</span>
        </span>
        <span className="flex size-12 items-center justify-center self-center rounded-full bg-gray-1000/70 text-background-100">
          <IconPlayerPlay className="size-5" />
        </span>
        <div className="flex items-center gap-3 rounded-lg bg-background-100 p-2">
          <span className="size-12 rounded bg-gray-100" />
          <span className="flex flex-1 flex-col">
            <span className="text-label-12 text-gray-1000">Pour-over kit</span>
            <span className="text-label-12 text-gray-900">$48</span>
          </span>
          <Button size="xs" shape="rounded">
            Shop
          </Button>
        </div>
      </div>
    </Phone>
  )
}
