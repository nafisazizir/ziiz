import { HugeiconsIcon } from "@hugeicons/react"
import {
  Bookmark01Icon,
  ChartBarLineIcon,
  CheckmarkBadge02Icon,
  Comment01Icon,
  FavouriteIcon,
  MoreHorizontalIcon,
  PlayIcon,
  RepeatIcon,
  Share08Icon,
} from "@hugeicons/core-free-icons"

import { XText } from "@/components/business-x/runs"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export type PostProps = {
  name?: string
  handle?: string
  verified?: boolean
  ad?: boolean
  time?: string
  text?: React.ReactNode
  // A grey picture of this ratio under the text; "video" adds a play mark.
  media?: number
  video?: boolean
  counts?: [string, string, string, string]
  action?: string
  className?: string
  // Draw the post as a row in a timeline instead of a card.
  flat?: boolean
  // Anything under the text: a custom media block, a product card.
  children?: React.ReactNode
}

const defaultCounts: [string, string, string, string] = [
  "24",
  "1.2K",
  "4.8K",
  "12K",
]

// A post on X, the way the site mocks one: who, what, a picture, then the
// action row. A card by default; flat rows stack into a timeline.
export function Post({
  name = "Business",
  handle = "@business",
  verified = true,
  ad,
  time,
  text,
  media,
  video,
  counts = defaultCounts,
  action,
  className,
  flat,
  children,
}: PostProps) {
  const body = (
    <>
      <div className="flex items-start gap-3">
        <Avatar>
          <AvatarFallback>{name[0]}</AvatarFallback>
        </Avatar>
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex items-center gap-1 text-label-13">
            <span className="truncate text-gray-1000">{name}</span>
            {verified && (
              <HugeiconsIcon
                icon={CheckmarkBadge02Icon}
                strokeWidth={2}
                className="size-3.5 shrink-0 text-amber-700"
              />
            )}
            <span className="truncate text-gray-900">{handle}</span>
            {time && <span className="text-gray-900">{`· ${time}`}</span>}
            <span className="ml-auto text-label-12 text-gray-900">
              {ad ? (
                "Ad"
              ) : (
                <HugeiconsIcon icon={MoreHorizontalIcon} className="size-4" />
              )}
            </span>
          </div>
          {text && (
            <p className="mt-0.5 text-copy-13 text-gray-1000">
              {typeof text === "string" ? <XText>{text}</XText> : text}
            </p>
          )}
          {media && (
            <AspectRatio
              ratio={media}
              className="mt-3 flex items-center justify-center overflow-hidden rounded-lg bg-gray-200"
            >
              {video && (
                <span className="flex size-12 items-center justify-center rounded-full bg-gray-1000/70 text-background-100">
                  <HugeiconsIcon
                    icon={PlayIcon}
                    strokeWidth={2}
                    className="size-5"
                  />
                </span>
              )}
            </AspectRatio>
          )}
          {children}
          {action && (
            <span className="mt-3 inline-flex h-8 items-center justify-center rounded-full bg-gray-1000 px-4 text-button-14 text-background-100">
              {action}
            </span>
          )}
        </div>
      </div>
      <Actions counts={counts} />
    </>
  )
  if (flat)
    return (
      <div
        className={cn(
          "flex flex-col gap-3 border-b border-gray-alpha-400 px-4 py-3",
          className
        )}
      >
        {body}
      </div>
    )
  return (
    <Card size="sm" className={cn("w-full max-w-100", className)}>
      <CardHeader className="gap-0">{body}</CardHeader>
    </Card>
  )
}

// Reply, repost, like, views, then bookmark and share on the far right.
function Actions({ counts }: { counts: [string, string, string, string] }) {
  const icons = [Comment01Icon, RepeatIcon, FavouriteIcon, ChartBarLineIcon]
  return (
    <div className="flex items-center justify-between pl-11 text-label-12 text-gray-900">
      {icons.map((icon, index) => (
        <span key={index} className="flex items-center gap-1">
          <HugeiconsIcon icon={icon} strokeWidth={1.5} className="size-4" />
          {counts[index]}
        </span>
      ))}
      <span className="flex items-center gap-2">
        <HugeiconsIcon
          icon={Bookmark01Icon}
          strokeWidth={1.5}
          className="size-4"
        />
        <HugeiconsIcon
          icon={Share08Icon}
          strokeWidth={1.5}
          className="size-4"
        />
      </span>
    </div>
  )
}

export { CardContent, CardFooter }
