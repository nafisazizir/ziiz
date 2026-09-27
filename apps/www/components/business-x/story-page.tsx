import Link from "next/link"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Comment01Icon,
  FavouriteIcon,
  Link01Icon,
  PlayIcon,
} from "@hugeicons/core-free-icons"

import type {
  StoryDetail,
  StoryPost,
  StoryQuote,
} from "@/components/business-x/data/success-stories"
import { XText } from "@/components/business-x/runs"
import { XLogo } from "@/components/business-x/x-logo"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { cn } from "@/lib/utils"

// A success story on business.x.com: the brand and its deck, a grey box
// with the lockup (280px tall, 360 from 768px, 438 from 1024px), a strip of
// three figures, then the write-up in the left half with the campaign's
// posts sticky in the right half, each quote centred between rules, and the
// two follow cards. No closing call to action; the footer follows.
export function StoryPage({ story }: { story: StoryDetail }) {
  return (
    <article className="flex w-full flex-col max-lg:gap-0">
      <section className="flex flex-col gap-5 pt-4 lg:pt-20">
        <div className="flex flex-col gap-2">
          <h1 className="text-heading-48 text-gray-1000">
            <XText>{story.brand}</XText>
          </h1>
          <p className="text-heading-32 text-balance text-gray-900">
            <XText>{story.deck}</XText>
          </p>
        </div>
        <div className="flex h-70 items-center justify-center gap-6 overflow-hidden bg-gray-100 md:h-90 lg:h-[438px]">
          <XLogo className="size-16 text-gray-1000" />
          <span className="h-9 w-0.5 bg-gray-alpha-400" />
          <span aria-hidden className="h-16 w-16 bg-gray-alpha-300" />
        </div>
      </section>
      {story.stats.length > 0 && (
        <section className="py-6">
          <ul className="flex flex-col md:flex-row">
            {story.stats.map((stat, index) => (
              <li
                key={index}
                className={cn(
                  "flex flex-1 flex-col items-center gap-3 border-gray-alpha-400 p-6 text-center",
                  index > 0 && "border-t md:border-t-0 md:border-l"
                )}
              >
                <p className="text-heading-32 text-gray-1000">{stat.value}</p>
                <p className="text-label-13 text-balance text-gray-900">
                  <XText>{stat.label}</XText>
                </p>
              </li>
            ))}
          </ul>
        </section>
      )}
      <Split>
        <Prose blocks={story.blocks} />
        {story.posts.length > 0 && (
          <div className="flex flex-1 flex-col gap-4 lg:sticky lg:top-6">
            {story.posts.map((post, index) => (
              <div key={index} className="flex justify-center bg-gray-100 p-6">
                <EmbeddedPost post={post} />
              </div>
            ))}
          </div>
        )}
      </Split>
      {story.quotes.map((quote, index) => (
        <PullQuote key={index} quote={quote} />
      ))}
      {story.product && (
        <Split>
          <div className="flex flex-1 flex-col gap-8">
            <h2 className="text-heading-32 text-gray-1000">
              {story.product.title}
            </h2>
            <div className="flex flex-col gap-4 text-copy-13 text-gray-900">
              {story.product.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
            <Button
              shape="rounded"
              size="sm"
              className="self-start"
              nativeButton={false}
              render={<Link href={story.product.href} />}
            >
              Learn more
            </Button>
          </div>
          <div className="flex flex-1 items-center justify-center bg-gray-100 p-6">
            <div className="aspect-[276/564] w-[52%] max-w-69 bg-gray-200" />
          </div>
        </Split>
      )}
      <Split>
        <h2 className="flex-1 text-heading-32 text-balance text-gray-1000">
          Stay connected with the brand behind this campaign
        </h2>
        <div className="flex flex-1 flex-wrap gap-4">
          {story.follow.handle && (
            <FollowCard
              handle={story.follow.handle}
              caption={story.follow.caption}
            />
          )}
          <FollowCard
            handle="@XBusiness"
            caption="Get more campaign inspiration."
            mark
          />
        </div>
      </Split>
      {story.source && (
        <p className="pt-10 text-label-12 text-gray-700">{story.source}</p>
      )}
    </article>
  )
}

function Split({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-10 border-t border-gray-alpha-400 py-16 lg:flex-row lg:items-start lg:gap-16 lg:py-24">
      {children}
    </section>
  )
}

function Prose({ blocks }: { blocks: StoryDetail["blocks"] }) {
  return (
    <div className="flex flex-1 flex-col gap-4 text-copy-13 text-gray-900 [&>h2]:mt-14 [&>h2]:mb-4 [&>h2:first-child]:mt-0">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "h2":
            return (
              <h2 key={index} className="text-heading-32 text-gray-1000">
                {block.text}
              </h2>
            )
          case "h3":
            return (
              <h3 key={index} className="mt-4 text-label-13 text-gray-1000">
                {block.text}
              </h3>
            )
          case "ul":
            return (
              <ul key={index} className="flex list-disc flex-col gap-2 pl-5">
                {block.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            )
          default:
            return <p key={index}>{block.text}</p>
        }
      })}
    </div>
  )
}

// An embedded post from x.com: the account with a Follow link, the copy,
// the picture (a play mark for video), then the time, likes and reply link.
function EmbeddedPost({ post }: { post: StoryPost }) {
  return (
    <Card size="sm" className="w-full max-w-75">
      <CardHeader className="flex flex-row items-start gap-3">
        <Avatar>
          <AvatarFallback>{post.name[0]}</AvatarFallback>
        </Avatar>
        <div className="flex min-w-0 flex-1 flex-col">
          <p className="truncate text-label-13 text-gray-1000">{post.name}</p>
          <p className="truncate text-label-12 text-gray-900">
            {`${post.handle} · `}
            <span className="text-gray-1000">Follow</span>
          </p>
        </div>
        <XLogo className="size-4 shrink-0 text-gray-1000" />
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <p className="text-copy-13 whitespace-pre-line text-gray-1000">
          {post.text}
        </p>
        {post.media !== "none" && (
          <AspectRatio
            ratio={post.media === "video" ? 16 / 9 : 4 / 3}
            className="flex items-center justify-center overflow-hidden rounded-lg bg-gray-200"
          >
            {post.media === "video" && (
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
        {post.action && (
          <span className="text-label-12 text-gray-900">{post.action}</span>
        )}
        <p className="text-label-12 text-gray-900">{post.time}</p>
        <div className="flex items-center gap-4 border-t border-gray-alpha-400 pt-3 text-label-12 text-gray-900">
          <span className="flex items-center gap-1">
            <HugeiconsIcon
              icon={FavouriteIcon}
              strokeWidth={1.5}
              className="size-3.5"
            />
            {post.likes}
          </span>
          <span className="flex items-center gap-1">
            <HugeiconsIcon
              icon={Comment01Icon}
              strokeWidth={1.5}
              className="size-3.5"
            />
            Reply
          </span>
          <span className="flex items-center gap-1">
            <HugeiconsIcon
              icon={Link01Icon}
              strokeWidth={1.5}
              className="size-3.5"
            />
            Copy link
          </span>
        </div>
        <Button
          variant="outline"
          shape="rounded"
          size="xs"
          nativeButton={false}
          render={<span />}
        >
          {post.replies}
        </Button>
      </CardContent>
    </Card>
  )
}

function PullQuote({ quote }: { quote: StoryQuote }) {
  return (
    <section className="flex justify-center border-t border-gray-alpha-400 py-16 lg:py-30">
      <figure className="flex w-full max-w-[587px] flex-col gap-5">
        <blockquote className="text-heading-24 text-gray-1000">
          <XText>{quote.text}</XText>
        </blockquote>
        <figcaption className="flex flex-col text-label-12 text-gray-900">
          <span className="text-gray-1000">{quote.name}</span>
          <span>{quote.role}</span>
        </figcaption>
      </figure>
    </section>
  )
}

function FollowCard({
  handle,
  caption,
  mark,
}: {
  handle: string
  caption: string
  mark?: boolean
}) {
  return (
    <div className="flex min-w-50 flex-1 flex-col gap-2">
      <div className="flex h-42.5 items-center justify-center overflow-hidden bg-gray-100 p-12">
        <span
          className={cn(
            "flex size-18 items-center justify-center rounded-xl",
            mark
              ? "bg-gray-1000 text-background-100"
              : "bg-background-100 text-gray-900"
          )}
        >
          {mark ? (
            <XLogo className="size-8" />
          ) : (
            <span className="size-8 rounded-full border-2 border-current" />
          )}
        </span>
      </div>
      <p className="text-copy-13 text-gray-900">{caption}</p>
      <Button
        shape="rounded"
        size="sm"
        variant="secondary"
        className="mt-2 w-min"
        nativeButton={false}
        render={
          <a
            href={`https://x.com/${handle.replace("@", "")}`}
            target="_blank"
            rel="noopener noreferrer"
          />
        }
      >
        {`Follow ${handle}`}
      </Button>
    </div>
  )
}
