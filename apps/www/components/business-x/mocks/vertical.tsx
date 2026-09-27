import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowLeft01Icon,
  Bookmark01Icon,
  ChartBarLineIcon,
  CheckmarkBadge02Icon,
  Comment01Icon,
  FavouriteIcon,
  MoreHorizontalIcon,
  RepeatIcon,
  Share08Icon,
} from "@hugeicons/core-free-icons"

import { Phone } from "@/components/business-x/mocks/phone"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

// The immersive media viewer: a full-bleed video with the post's account,
// copy and actions laid over its bottom edge.
export function VerticalPhone({
  name = "The Barista Bar",
  handle = "@baristabar",
  text = "Coffee made fresh!",
  ad = true,
  cta,
  className,
}: {
  name?: string
  handle?: string
  text?: string
  ad?: boolean
  cta?: string
  className?: string
}) {
  return (
    <Phone className={cn("bg-gray-200", className)}>
      <div className="relative flex flex-1 flex-col justify-between bg-gray-200 p-4">
        <div className="flex items-center justify-between text-gray-1000">
          <span className="flex size-8 items-center justify-center rounded-full bg-background-100/70">
            <HugeiconsIcon
              icon={ArrowLeft01Icon}
              strokeWidth={2}
              className="size-4"
            />
          </span>
          <span className="flex size-8 items-center justify-center rounded-full bg-background-100/70">
            <HugeiconsIcon
              icon={MoreHorizontalIcon}
              strokeWidth={2}
              className="size-4"
            />
          </span>
        </div>
        <div className="flex flex-col gap-3 text-gray-1000">
          <div className="flex flex-col gap-1.5">
            <span className="text-label-12 text-gray-900">00:10 / 00:40</span>
            <Progress value={25} />
          </div>
          <div className="flex items-center gap-2">
            <Avatar size="sm">
              <AvatarFallback>{name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex min-w-0 flex-1 flex-col text-label-12">
              <span className="flex items-center gap-1">
                <span className="truncate text-label-13">{name}</span>
                <HugeiconsIcon
                  icon={CheckmarkBadge02Icon}
                  strokeWidth={2}
                  className="size-3.5 text-amber-700"
                />
                <span className="truncate text-gray-900">{handle}</span>
                {ad && <span className="ml-auto text-gray-900">Ad</span>}
              </span>
              {ad && <span className="text-gray-900">Promoted</span>}
            </div>
          </div>
          <p className="text-copy-13">{text}</p>
          {cta && (
            <span className="inline-flex h-8 items-center justify-center rounded-full bg-gray-1000 px-4 text-button-14 text-background-100">
              {cta}
            </span>
          )}
          <div className="flex items-center justify-between text-gray-1000">
            {[
              Comment01Icon,
              RepeatIcon,
              FavouriteIcon,
              ChartBarLineIcon,
              Share08Icon,
              Bookmark01Icon,
            ].map((icon, index) => (
              <HugeiconsIcon
                key={index}
                icon={icon}
                strokeWidth={1.5}
                className="size-4"
              />
            ))}
          </div>
        </div>
      </div>
    </Phone>
  )
}
