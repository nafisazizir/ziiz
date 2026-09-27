import { HugeiconsIcon } from "@hugeicons/react"
import {
  Home01Icon,
  Mail01Icon,
  Notification01Icon,
  PlayIcon,
  Search01Icon,
  UserMultipleIcon,
} from "@hugeicons/core-free-icons"

import { Phone } from "@/components/business-x/mocks/phone"
import { Post, type PostProps } from "@/components/business-x/mocks/post"
import { XLogo } from "@/components/business-x/x-logo"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

// A phone zoomed so its 620px height fills a share of the enclosing panel's
// height (88% by default, x.com's crop) and centred in it.
export function PhoneScene({
  share = 0.88,
  className,
  children,
}: {
  share?: number
  className?: string
  children: React.ReactNode
}) {
  return (
    <div
      className={cn(
        "[container-type:size] flex size-full items-center justify-center",
        className
      )}
    >
      <div style={{ zoom: `calc(${share} * 100cqh / 620px)` }}>{children}</div>
    </div>
  )
}

// The home timeline: the mark, For You and Following, posts, a tab bar.
export function FeedPhone({
  tab = "For You",
  children,
  className,
}: {
  tab?: "For You" | "Following"
  children: React.ReactNode
  className?: string
}) {
  return (
    <Phone className={className}>
      <div className="flex items-center justify-between px-4 pb-2">
        <Avatar size="sm">
          <AvatarFallback>B</AvatarFallback>
        </Avatar>
        <XLogo className="size-5" />
        <span className="size-6" />
      </div>
      <Tabs value={tab} className="gap-0">
        <TabsList
          variant="line"
          className="w-full border-b border-gray-alpha-400 pb-1"
        >
          <TabsTrigger value="For You">For You</TabsTrigger>
          <TabsTrigger value="Following">Following</TabsTrigger>
        </TabsList>
      </Tabs>
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
        {children}
      </div>
      <div className="flex shrink-0 items-center justify-around border-t border-gray-alpha-400 px-2 pt-3 pb-5 text-gray-1000">
        {[
          Home01Icon,
          Search01Icon,
          UserMultipleIcon,
          Notification01Icon,
          Mail01Icon,
        ].map((icon, index) => (
          <HugeiconsIcon
            key={index}
            icon={icon}
            strokeWidth={index === 0 ? 2.5 : 1.5}
            className="size-5"
          />
        ))}
      </div>
    </Phone>
  )
}

export type AdKind =
  | "image"
  | "video"
  | "carousel"
  | "text"
  | "vertical"
  | "amplify"
  | "takeover"
  | "live"
  | "dpa"
  | "collection"

// A promoted post in one of the site's ad shapes, as a flat timeline row.
export function AdPost({
  kind,
  name = "The Barista Bar",
  handle = "@thebaristabar",
  text = "Fresh coffee, perfectly poured, and ready to make your morning a little better. Come visit us at The Barista Bar.",
  ...props
}: Partial<PostProps> & { kind: AdKind }) {
  const common = { flat: true, ad: true, name, handle, text, ...props }
  switch (kind) {
    case "video":
    case "amplify":
    case "live":
      return (
        <Post {...common} text={text}>
          <Media
            ratio={16 / 9}
            play
            label={
              kind === "live"
                ? "LIVE"
                : kind === "amplify"
                  ? "Sponsored"
                  : undefined
            }
          />
        </Post>
      )
    case "vertical":
      return (
        <Post {...common}>
          <Media ratio={9 / 16} play />
        </Post>
      )
    case "carousel":
      return (
        <Post {...common}>
          <div className="mt-3 flex gap-2">
            <div className="aspect-square w-3/5 shrink-0 rounded-lg bg-gray-200" />
            <div className="aspect-square w-3/5 shrink-0 rounded-lg bg-gray-200" />
          </div>
        </Post>
      )
    case "text":
      return <Post {...common} />
    case "dpa":
      return (
        <Post {...common}>
          <div className="mt-3 overflow-hidden rounded-lg border border-gray-alpha-400">
            <AspectRatio ratio={4 / 3} className="bg-gray-200" />
            <div className="flex items-center justify-between px-3 py-2 text-label-12">
              <span className="text-gray-1000">Pour-over kit</span>
              <span className="text-gray-900">$48</span>
            </div>
          </div>
        </Post>
      )
    case "collection":
      return (
        <Post {...common}>
          <div className="mt-3 flex flex-col gap-1">
            <AspectRatio ratio={16 / 9} className="rounded-lg bg-gray-200" />
            <div className="grid grid-cols-3 gap-1">
              <div className="aspect-square rounded-lg bg-gray-200" />
              <div className="aspect-square rounded-lg bg-gray-200" />
              <div className="aspect-square rounded-lg bg-gray-200" />
            </div>
          </div>
        </Post>
      )
    case "takeover":
    case "image":
    default:
      return (
        <Post {...common}>
          <Media ratio={4 / 3} />
        </Post>
      )
  }
}

function Media({
  ratio,
  play,
  label,
}: {
  ratio: number
  play?: boolean
  label?: string
}) {
  return (
    <AspectRatio
      ratio={ratio}
      className="mt-3 flex items-center justify-center overflow-hidden rounded-lg bg-gray-200"
    >
      {label && <Badge className="absolute top-2 left-2">{label}</Badge>}
      {play && (
        <span className="flex size-12 items-center justify-center rounded-full bg-gray-1000/70 text-background-100">
          <HugeiconsIcon icon={PlayIcon} strokeWidth={2} className="size-5" />
        </span>
      )}
    </AspectRatio>
  )
}

// A muted post that fills the rest of a timeline.
export function FillerPost({ className }: { className?: string }) {
  return (
    <Post
      flat
      name="Benji Taylor"
      handle="@benjitaylor"
      verified={false}
      text="Ran the new pour-over kit through its paces this weekend."
      className={cn("opacity-60", className)}
    />
  )
}
