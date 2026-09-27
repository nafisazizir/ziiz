import {
  IconBookmark,
  IconCamera,
  IconChartHistogram,
  IconChevronRight,
  IconDeviceLaptop,
  IconDeviceMobile,
  IconDeviceWatch,
  IconHeart,
  IconMessageCircle,
  IconPlayerPlay,
  IconRepeat,
  IconRosetteDiscountCheck,
  IconShare,
} from "@tabler/icons-react"

import { Post } from "@/components/business-x/mocks/post"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

// The seven ad formats on the Advertising landing, each a small scene at a
// fixed natural width for MockScene. Photos are grey boxes.

// A post header the way the site's scenes abbreviate one: a grey tile, the
// name with its badge, two placeholder bars and an "Ad" label.
function AdHeader({
  name = "Business",
  subtitle,
}: {
  name?: string
  subtitle?: string
}) {
  return (
    <div className="flex items-start gap-2">
      <span className="size-7 shrink-0 bg-gray-100" />
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <span className="flex items-center gap-1 text-label-12 text-gray-1000">
          {name}
          <IconRosetteDiscountCheck className="size-3 text-amber-700" />
        </span>
        {subtitle ? (
          <span className="text-label-12 text-gray-900">{subtitle}</span>
        ) : (
          <span className="flex gap-1">
            <Skeleton className="h-1.5 w-6" />
            <Skeleton className="h-1.5 w-12" />
          </span>
        )}
      </div>
      <span className="text-label-12 text-gray-900">Ad</span>
    </div>
  )
}

function Dots({ count = 3 }: { count?: number }) {
  return (
    <div className="flex justify-center gap-1">
      {Array.from({ length: count }, (_, i) => (
        <span
          key={i}
          className={cn(
            "size-1 rounded-full",
            i === 0 ? "bg-gray-1000" : "bg-gray-alpha-400"
          )}
        />
      ))}
    </div>
  )
}

// 01 Amplify: a video player with "Your AD" in the corner and a progress bar.
export function AmplifyMock() {
  return (
    <div className="relative h-48 w-64">
      <Card size="sm" className="absolute top-8 right-0 h-36 w-56 py-0" />
      <div className="absolute top-0 left-0 flex aspect-3/2 w-52 items-center justify-center rounded-lg bg-gray-200">
        <IconPlayerPlay className="size-6 text-gray-700" />
        <span className="absolute bottom-2 left-2 text-label-12 text-gray-900">
          Your AD
        </span>
      </div>
      <div className="absolute right-4 bottom-2 left-12 flex items-center gap-1">
        <span className="h-0.5 w-3 bg-gray-1000" />
        <span className="h-0.5 flex-1 bg-gray-alpha-400" />
      </div>
    </div>
  )
}

// 02 Image + carousel: two cards side by side, the second cut off.
export function CarouselMock() {
  return (
    <Card size="sm" className="w-48">
      <CardHeader>
        <AdHeader />
      </CardHeader>
      <CardContent className="flex flex-col gap-2 overflow-hidden">
        <div className="flex gap-1.5">
          {[0, 1].map((i) => (
            <div key={i} className="flex w-3/5 shrink-0 flex-col gap-1.5">
              <div className="aspect-square rounded-md bg-gray-200" />
              <Skeleton className="h-1.5 w-2/3" />
            </div>
          ))}
        </div>
        <Dots />
      </CardContent>
    </Card>
  )
}

// 03 Collection + shoppable: a hero picture, lines, a row of product tiles.
export function CollectionMock() {
  const icons = [
    IconCamera,
    IconDeviceWatch,
    IconDeviceLaptop,
    IconDeviceMobile,
  ]
  return (
    <Card size="sm" className="w-48">
      <CardHeader>
        <AdHeader subtitle="Discover the latest in tech!" />
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <AspectRatio ratio={16 / 9} className="rounded-md bg-gray-200" />
        <div className="flex flex-col gap-1">
          <Skeleton className="h-1.5 w-2/3" />
          <Skeleton className="h-1.5 w-1/2" />
        </div>
        <div className="grid grid-cols-4 gap-1.5">
          {icons.map((ItemIcon, i) => (
            <span
              key={i}
              className="flex aspect-square items-center justify-center rounded-md bg-gray-100 text-gray-900"
            >
              <ItemIcon stroke={1.5} className="size-3.5" />
            </span>
          ))}
        </div>
        <Dots />
      </CardContent>
    </Card>
  )
}

// 04 Promoted posts: a lifted post between two faded rows.
export function PromotedMock() {
  return (
    <div className="flex w-80 flex-col gap-4">
      <FadedRow />
      <Card size="sm" className="w-full">
        <CardHeader>
          <AdHeader />
        </CardHeader>
      </Card>
      <FadedRow />
    </div>
  )
}

function FadedRow() {
  return (
    <div className="flex items-center gap-3 px-3 opacity-70">
      <span className="size-9 bg-gray-200" />
      <div className="flex flex-col gap-1.5">
        <Skeleton className="h-2 w-20" />
        <Skeleton className="h-2 w-32" />
      </div>
    </div>
  )
}

// 05 Dynamic product ads: a post with a product carousel, in a timeline.
export function DynamicMock() {
  return (
    <div className="flex w-56 flex-col gap-3">
      <div className="flex items-center gap-2 px-2">
        <span className="size-6 bg-gray-200" />
        <div className="flex flex-col gap-1">
          <Skeleton className="h-1.5 w-16" />
          <span className="text-label-12 text-gray-900">
            Phone upgrade incoming?
          </span>
        </div>
      </div>
      <Card size="sm" className="w-full">
        <CardHeader>
          <AdHeader />
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <div className="flex gap-1.5 overflow-hidden">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="flex aspect-square w-2/5 shrink-0 items-center justify-center rounded-md bg-gray-100 text-gray-900"
              >
                <IconDeviceMobile stroke={1.5} className="size-4" />
              </span>
            ))}
          </div>
          <Dots />
        </CardContent>
      </Card>
      <FadedRow />
    </div>
  )
}

// 06 Boost existing posts: a post with its action counts, in a timeline.
export function BoostMock() {
  const counts = [
    [IconMessageCircle, "3k"],
    [IconRepeat, "888"],
    [IconHeart, "5k"],
    [IconBookmark, "1k"],
  ] as const
  return (
    <div className="flex w-56 flex-col gap-3">
      <FadedRow />
      <Card size="sm" className="w-full">
        <CardHeader>
          <AdHeader />
        </CardHeader>
        <CardContent className="flex items-center justify-between text-label-12 text-gray-900">
          {counts.map(([ItemIcon, n], i) => (
            <span key={i} className="flex items-center gap-1">
              <ItemIcon stroke={1.5} className="size-3.5" />
              {n}
            </span>
          ))}
        </CardContent>
      </Card>
      <FadedRow />
    </div>
  )
}

// 07 Mentions Boost: a creator's post, the brand's card in it, "Boosted by".
export function MentionsMock() {
  return (
    <Card size="sm" className="w-60">
      <CardHeader>
        <div className="flex items-center gap-2">
          <span className="size-7 bg-gray-100" />
          <div className="flex flex-col gap-1">
            <span className="flex items-center gap-1 text-label-12 text-gray-1000">
              Benji Taylor
              <IconRosetteDiscountCheck className="size-3 text-blue-700" />
            </span>
            <span className="flex gap-1">
              <Skeleton className="h-1.5 w-6" />
              <Skeleton className="h-1.5 w-12" />
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <div className="flex items-center gap-2 rounded-md border border-gray-alpha-400 px-2 py-1.5 text-label-12">
          <span className="size-4 bg-gray-100" />
          <span className="text-gray-1000">Business</span>
          <span className="ml-auto flex items-center gap-0.5 text-gray-900">
            Visit
            <IconChevronRight className="size-3" />
          </span>
        </div>
        <span className="text-label-12 text-gray-1000">
          {`Boosted by `}
          <span className="text-gray-900">@business</span>
        </span>
      </CardContent>
    </Card>
  )
}

// The Barista Bar's photo post on Creative best practices: one lifted post
// over two faded rows, in a 15:8 panel.
export function BaristaPostScene({
  video,
  square,
}: {
  video?: boolean
  square?: boolean
}) {
  return (
    <div className="absolute inset-x-0 top-[12%] bottom-0 flex flex-col items-center gap-3 overflow-hidden">
      <Post
        name="The Barista Bar"
        handle="@thebaristabar"
        ad
        text="Every cup tells a story. ☕ Freshly brewed, perfectly poured, and ready to make your morning a little better. Come visit us at The Barista Bar! ✨"
        media={square ? 1 : 16 / 9}
        video={video}
        className="w-[70%] max-w-100"
      />
      <FadedPost />
      <FadedPost />
    </div>
  )
}

function FadedPost() {
  return (
    <Card size="sm" className="w-[70%] max-w-100 opacity-40">
      <CardHeader className="flex flex-row items-center gap-2">
        <Avatar size="sm">
          <AvatarFallback />
        </Avatar>
        <div className="flex flex-col gap-1">
          <Skeleton className="h-1.5 w-16" />
          <Skeleton className="h-1.5 w-24" />
        </div>
      </CardHeader>
      <CardContent className="flex gap-6 text-gray-900">
        {[
          IconMessageCircle,
          IconRepeat,
          IconHeart,
          IconChartHistogram,
          IconShare,
        ].map((ItemIcon, i) => (
          <ItemIcon key={i} stroke={1.5} className="size-3.5" />
        ))}
      </CardContent>
    </Card>
  )
}
