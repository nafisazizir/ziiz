import {
  IconBrandApple,
  IconBrandGoogle,
  IconChartHistogram,
  IconMail,
  IconMapPin,
  IconMoodSmile,
  IconPhone,
  IconPhoto,
} from "@tabler/icons-react"

import { Phone } from "@/components/business-x/mocks/phone"
import { Post } from "@/components/business-x/mocks/post"
import { XLogo } from "@/components/business-x/x-logo"
import { Avatar, AvatarFallback, AvatarGroup } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// 01: the sign-in screen with an Apple sheet over it, the phone's top half
// rising out of the panel's bottom edge.
export function SignInPhone() {
  return (
    <div className="absolute inset-x-0 top-6 bottom-0 flex justify-center overflow-hidden lg:top-8">
      <Phone className="h-auto min-h-full rounded-b-none border-b-0">
        <div className="flex flex-col items-center gap-3 px-6 pt-4">
          <div className="flex w-full justify-center gap-4">
            {[IconBrandGoogle, IconBrandApple, IconMail].map(
              (ItemIcon, index) => (
                <span
                  key={index}
                  className="flex size-9 items-center justify-center rounded-full bg-gray-100"
                >
                  <ItemIcon className="size-4" />
                </span>
              )
            )}
          </div>
          <Button shape="rounded" variant="outline" className="w-full">
            <IconPhone data-icon="inline-start" />
            Continue with phone
          </Button>
          <p className="text-center text-label-12 text-balance text-gray-700">
            By continuing, you agree to our Terms, Privacy Policy, and Cookie
            Use.
          </p>
        </div>
        <div className="mt-auto flex flex-col gap-3 material-modal rounded-t-2xl bg-background-100 p-4">
          <p className="text-label-13 text-gray-1000">Sign in with Apple</p>
          <div className="flex items-center gap-3">
            <span className="flex size-9 items-center justify-center rounded-lg bg-gray-1000 text-background-100">
              <XLogo className="size-4" />
            </span>
            <p className="text-copy-13 text-gray-900">
              Sign in to X using your Apple account.
            </p>
          </div>
          <div className="flex items-center gap-3 border-t border-gray-alpha-400 pt-3">
            <Avatar>
              <AvatarFallback>BT</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <p className="text-label-13 text-gray-1000">Benji Taylor</p>
              <p className="text-label-12 text-gray-900">My account</p>
            </div>
          </div>
          <Button shape="rounded" size="sm" className="w-full">
            Sign in
          </Button>
        </div>
      </Phone>
    </div>
  )
}

// 02: the composer, avatar beside an empty field and a Post pill.
export function ComposerMock() {
  return (
    <Card size="sm" className="w-full max-w-72">
      <CardHeader className="grid-cols-[auto_1fr] gap-x-3">
        <Avatar className="row-span-2">
          <AvatarFallback>B</AvatarFallback>
        </Avatar>
        <CardTitle className="sr-only">New post</CardTitle>
        <p className="min-h-12 text-copy-14 text-gray-900">What’s happening?</p>
      </CardHeader>
      <CardContent className="flex items-center gap-3 text-gray-900">
        {[IconPhoto, IconChartHistogram, IconMoodSmile, IconMapPin].map(
          (ItemIcon, index) => (
            <ItemIcon key={index} stroke={1.5} className="size-4" />
          )
        )}
        <Button shape="rounded" size="xs" className="ml-auto">
          Post
        </Button>
      </CardContent>
    </Card>
  )
}

// 03: follower notifications, the middle one lifted onto a card.
export function FollowersMock() {
  return (
    <div className="flex w-full max-w-64 flex-col gap-3">
      <FollowersRow count="+2" muted />
      <Card size="sm" className="w-full">
        <CardContent className="flex items-center gap-3">
          <FollowersRow count="+5" time="2d" />
        </CardContent>
      </Card>
      <FollowersRow count="+3" muted />
    </div>
  )
}

function FollowersRow({
  count,
  time,
  muted,
}: {
  count: string
  time?: string
  muted?: boolean
}) {
  return (
    <div className="flex w-full items-center gap-3">
      <Avatar size="sm">
        <AvatarFallback>{muted ? "" : "B"}</AvatarFallback>
      </Avatar>
      <div className="flex flex-1 flex-col gap-1">
        <AvatarGroup>
          {["A", "J", "M"].map((initial) => (
            <Avatar key={initial} size="sm">
              <AvatarFallback>{muted ? "" : initial}</AvatarFallback>
            </Avatar>
          ))}
        </AvatarGroup>
        <p className="text-label-12 text-gray-900">
          <span className="text-gray-1000">{count}</span>
          {` new followers`}
        </p>
      </div>
      {time && <span className="text-label-12 text-gray-700">{time}</span>}
    </div>
  )
}

// 04: a post in a timeline, its neighbours faded out above and below.
export function OrganicMock() {
  return (
    <div className="flex w-full max-w-100 flex-col gap-3">
      <Post
        name=""
        handle=""
        verified={false}
        text=" "
        className="opacity-40"
      />
      <Post
        name="Business"
        handle="@business"
        text="Fresh from the roastery. Small batch, big flavour."
        counts={["6K", "4K", "8K", "5K"]}
      />
      <Post
        name=""
        handle=""
        verified={false}
        text=" "
        className="opacity-40"
      />
    </div>
  )
}
