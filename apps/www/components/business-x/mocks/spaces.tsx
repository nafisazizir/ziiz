import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowDown01Icon,
  ArrowLeft01Icon,
  ArrowRight01Icon,
  AudioWave01Icon,
  Cancel01Icon,
  CheckmarkBadge02Icon,
  MoreHorizontalIcon,
  Share08Icon,
} from "@hugeicons/core-free-icons"

import { Phone } from "@/components/business-x/mocks/phone"
import { XLogo } from "@/components/business-x/x-logo"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const people = [
  ["ESPN", "Host"],
  ["Adam S.", "Speaker"],
  ["Field Ya.", "Host"],
  ["Benji T.", "Listener"],
  ["Jeremy", "Listener"],
  ["Nneka", "Listener"],
  ["PFF", "Listener"],
  ["Ian Rap.", "Listener"],
  ["Brady", "Listener"],
  ["Pipi", "Listener"],
  ["Aaron Ja.", "Listener"],
  ["Natalie", "Listener"],
]

// A Space's sheet: hosts, speakers and listeners in a grid, the listener
// count and the Start listening pill.
export function SpacePhone({
  title = "Watch party, let’s go",
  action = "Start listening",
  className,
}: {
  title?: string
  action?: string
  className?: string
}) {
  return (
    <Phone className={cn("bg-gray-100", className)}>
      <div className="flex items-center justify-between px-4 py-2 text-gray-700">
        <HugeiconsIcon
          icon={ArrowLeft01Icon}
          strokeWidth={2}
          className="size-4"
        />
        <span className="text-label-12">Spaces</span>
        <span className="size-4" />
      </div>
      <div className="mt-auto flex flex-col gap-4 material-modal rounded-t-2xl bg-background-100 px-4 pt-3 pb-4">
        <div className="flex items-center justify-between text-gray-1000">
          <HugeiconsIcon
            icon={ArrowDown01Icon}
            strokeWidth={2}
            className="size-4"
          />
          <span className="flex items-center gap-3">
            <HugeiconsIcon
              icon={Share08Icon}
              strokeWidth={2}
              className="size-4"
            />
            <HugeiconsIcon
              icon={MoreHorizontalIcon}
              strokeWidth={2}
              className="size-4"
            />
          </span>
        </div>
        <p className="text-heading-16 text-gray-1000">{title}</p>
        <ul className="grid grid-cols-4 gap-x-2 gap-y-3">
          {people.map(([name, role]) => (
            <li
              key={name}
              className="flex flex-col items-center gap-1 text-center"
            >
              <Avatar>
                <AvatarFallback>{name[0]}</AvatarFallback>
              </Avatar>
              <span className="flex max-w-full items-center gap-0.5 text-label-12 text-gray-1000">
                <span className="truncate">{name}</span>
                <HugeiconsIcon
                  icon={CheckmarkBadge02Icon}
                  strokeWidth={2}
                  className="size-3 shrink-0 text-amber-700"
                />
              </span>
              <span className="text-label-12 text-gray-700">{role}</span>
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-between rounded-lg border border-gray-alpha-400 px-3 py-2 text-label-12 text-gray-1000">
          +224.8k other listeners
          <HugeiconsIcon
            icon={ArrowRight01Icon}
            strokeWidth={2}
            className="size-3.5"
          />
        </div>
        <p className="text-center text-label-12 text-gray-700">
          Your mic will be off to start
        </p>
        <Button shape="rounded" className="w-full">
          {action}
        </Button>
      </div>
    </Phone>
  )
}

// The Spaces tab's opening screen: a headline over a spread of speakers.
export function ListenPhone({ className }: { className?: string }) {
  return (
    <Phone className={className}>
      <div className="flex items-center justify-between px-4 py-2 text-gray-1000">
        <span className="flex size-8 items-center justify-center rounded-full bg-gray-100">
          <HugeiconsIcon
            icon={Cancel01Icon}
            strokeWidth={2}
            className="size-4"
          />
        </span>
        <XLogo className="size-5" />
        <span className="flex size-8 items-center justify-center rounded-full bg-gray-100">
          <HugeiconsIcon
            icon={MoreHorizontalIcon}
            strokeWidth={2}
            className="size-4"
          />
        </span>
      </div>
      <div className="flex flex-col gap-2 px-6 pt-6">
        <p className="text-heading-32 text-gray-1000">
          {`Listen up, it’s `}
          <XLogo className="inline size-[0.8em] align-[-0.08em]" />
          {` Spaces`}
        </p>
        <p className="text-copy-14 text-gray-900">
          Tune into live audio conversations
        </p>
      </div>
      <div className="relative mt-auto h-56">
        <span className="absolute -bottom-20 left-1/2 size-80 -translate-x-1/2 rounded-full bg-gray-100" />
        <Speaker className="absolute bottom-24 left-6 size-16" initial="K" />
        <Speaker
          className="absolute bottom-6 left-1/2 size-28 -translate-x-1/2"
          initial="J"
          live
        />
        <Speaker className="absolute right-6 bottom-32 size-10" initial="R" />
      </div>
    </Phone>
  )
}

function Speaker({
  className,
  initial,
  live,
}: {
  className?: string
  initial: string
  live?: boolean
}) {
  return (
    <span className={cn("relative block", className)}>
      <span className="flex size-full items-center justify-center rounded-full bg-gray-200 text-label-14 text-gray-900">
        {initial}
      </span>
      {live && (
        <span className="absolute -right-1 -bottom-1 flex size-6 items-center justify-center material-small rounded-full bg-background-100 text-gray-1000">
          <HugeiconsIcon
            icon={AudioWave01Icon}
            strokeWidth={2}
            className="size-3.5"
          />
        </span>
      )}
    </span>
  )
}

const cluster = [
  "top-[8%] left-[12%] size-20",
  "top-[4%] left-[52%] size-20",
  "top-[28%] left-[2%] size-20",
  "top-[24%] left-[30%] size-12",
  "top-[18%] left-[42%] size-12",
  "top-[22%] left-[62%] size-12",
  "top-[24%] left-[80%] size-20",
  "top-[44%] left-[26%] size-12",
  "top-[42%] left-[40%] size-14",
  "top-[44%] left-[56%] size-12",
  "top-[58%] left-[10%] size-20",
  "top-[60%] left-[40%] size-12",
  "top-[58%] left-[54%] size-12",
  "top-[64%] left-[74%] size-20",
  "top-[78%] left-[36%] size-20",
]

// The Communities card: a loose cluster of members, a few with the live
// audio badge.
export function AvatarCluster({ className }: { className?: string }) {
  return (
    <div className={cn("relative size-full", className)}>
      {cluster.map((position, index) => (
        <Speaker
          key={position}
          className={cn("absolute", position)}
          initial={String.fromCharCode(65 + index)}
          live={index % 3 === 0}
        />
      ))}
    </div>
  )
}
