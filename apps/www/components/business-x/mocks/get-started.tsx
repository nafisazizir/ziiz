import {
  IconBell,
  IconCalendar,
  IconChevronLeft,
  IconHome,
  IconLink,
  IconMail,
  IconMapPin,
  IconMoodSmile,
  IconPhoto,
  IconSearch,
  IconSettings,
} from "@tabler/icons-react"

import { Phone } from "@/components/business-x/mocks/phone"
import { Post } from "@/components/business-x/mocks/post"
import { XLogo } from "@/components/business-x/x-logo"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

// A phone standing in a 3:2 panel, its bottom third below the panel's edge.
function Standing({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute inset-x-0 top-[12%] bottom-0 flex justify-center overflow-hidden">
      <Phone className="h-auto min-h-full rounded-b-none border-b-0">
        {children}
      </Phone>
    </div>
  )
}

// 01: the professional profile.
export function ProfilePhone() {
  return (
    <Standing>
      <div className="flex items-center justify-between px-4 py-2 text-gray-1000">
        <IconChevronLeft className="size-4" />
        <span className="flex gap-3">
          <IconSettings className="size-4" />
          <IconSearch className="size-4" />
        </span>
      </div>
      <div className="h-20 bg-gray-200" />
      <div className="flex flex-col gap-2 px-4 pb-4">
        <span className="-mt-6 w-fit rounded-full bg-background-100 p-1">
          <Avatar size="lg">
            <AvatarFallback>BT</AvatarFallback>
          </Avatar>
        </span>
        <div className="flex flex-col">
          <p className="text-label-14 text-gray-1000">Benji Taylor</p>
          <p className="text-label-12 text-gray-900">@benjitaylor</p>
        </div>
        <p className="text-copy-13 text-gray-1000">
          head of design @x / @spacexx
        </p>
        <p className="flex flex-wrap gap-x-3 text-label-12 text-gray-900">
          <span className="flex items-center gap-1">
            <IconMapPin className="size-3" />
            Palo Alto
          </span>
          <span className="flex items-center gap-1">
            <IconLink className="size-3" />
            benji.org
          </span>
          <span className="flex items-center gap-1">
            <IconCalendar className="size-3" />
            Joined July 2014
          </span>
        </p>
        <p className="text-label-12 text-gray-900">
          <span className="text-gray-1000">477</span>
          {` Following   `}
          <span className="text-gray-1000">205.6K</span>
          {` Followers`}
        </p>
        <div className="flex gap-2">
          <Button
            shape="rounded"
            size="sm"
            variant="outline"
            className="flex-1"
          >
            Share Profile
          </Button>
          <Button
            shape="rounded"
            size="sm"
            variant="outline"
            className="flex-1"
          >
            Edit Profile
          </Button>
        </div>
      </div>
      <Tabs defaultValue="posts">
        <TabsList variant="line" className="w-full px-4">
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="replies">Replies</TabsTrigger>
          <TabsTrigger value="media">Media</TabsTrigger>
        </TabsList>
      </Tabs>
    </Standing>
  )
}

// 02: a post in progress.
export function ComposerPhone() {
  return (
    <Standing>
      <div className="flex items-center justify-between px-4 py-2">
        <span className="text-label-13 text-gray-1000">Cancel</span>
        <Button shape="rounded" size="xs">
          Post
        </Button>
      </div>
      <div className="flex gap-3 px-4 pt-2">
        <Avatar size="sm">
          <AvatarFallback>X</AvatarFallback>
        </Avatar>
        <div className="flex flex-1 flex-col gap-3">
          <p className="text-copy-13 text-gray-1000">
            X Money is rolling out to Premium and Premium+ subscribers in the US
            starting today. To mark the milestone, we’ve also rolled out an
            all-new landing page. Now live:{" "}
            <span className="text-blue-700">http://money.x.com</span>
          </p>
          <div className="flex aspect-4/3 items-center justify-center rounded-lg bg-gray-200">
            <span className="flex size-10 items-center justify-center rounded-lg bg-gray-1000 text-background-100">
              <XLogo className="size-4" />
            </span>
          </div>
        </div>
      </div>
      <div className="mt-auto flex items-center gap-4 border-t border-gray-alpha-400 px-4 py-3 text-blue-700">
        {[IconPhoto, IconMoodSmile, IconMapPin].map((ItemIcon, index) => (
          <ItemIcon key={index} stroke={1.5} className="size-4" />
        ))}
      </div>
    </Standing>
  )
}

// 03: the For You timeline.
export function FeedPhone() {
  return (
    <Standing>
      <div className="flex items-center justify-between px-4 py-2">
        <Avatar size="sm">
          <AvatarFallback>B</AvatarFallback>
        </Avatar>
        <XLogo className="size-5 text-gray-1000" />
        <span className="size-6" />
      </div>
      <Tabs defaultValue="for-you">
        <TabsList variant="line" className="w-full px-4">
          <TabsTrigger value="for-you">For You</TabsTrigger>
          <TabsTrigger value="following">Following</TabsTrigger>
        </TabsList>
      </Tabs>
      <Post
        flat
        name="SpaceX"
        handle="@SpaceX"
        time="10s"
        text="Falcon 9 launches from Pad 40 in Florida! @elonmusk #SpaceX"
        media={1}
        counts={["60", "1.9K", "20K", "1.5K"]}
      />
      <div className="mt-auto flex items-center justify-around border-t border-gray-alpha-400 px-4 py-3 text-gray-1000">
        {[IconHome, IconSearch, IconBell, IconMail].map((ItemIcon, index) => (
          <ItemIcon key={index} stroke={1.5} className="size-5" />
        ))}
      </div>
    </Standing>
  )
}
