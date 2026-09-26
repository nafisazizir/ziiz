import Link from "next/link"

import type { Block, Post, Run } from "@/components/business-x/blog"
import { Runs, XText } from "@/components/business-x/runs"
import {
  Stat,
  StatGroup,
  StatLabel,
  StatValue,
} from "@/components/business-x/stat"
import { ArrowLeftIcon } from "@/components/icons"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

// A post on business.x.com. The header is a row from 1024px: breadcrumb and
// title on the left, the card art (400x244, the list's 8:5) on the right,
// the row at least as tall as the art, then 120px and a rule. Below that
// the header stacks (art under the title at 2:1) and the rule sits 24px
// under it.
//
// The body is the site's 720px column but ziiz's article: one typeset run,
// the same as the docs-shell blog, so headings, paragraphs, lists, figures
// and quotes take the prose layer's roles and rhythm rather than x.com's.
// Blocks the prose layer has no element for opt out and take the flow
// margin by hand, the way Callout does.
export function BlogPost({ post }: { post: Post }) {
  return (
    <article className="flex w-full flex-col">
      <header className="flex flex-col border-b border-gray-alpha-400 pb-6 lg:flex-row lg:items-start lg:justify-between lg:gap-4 lg:pb-30">
        <div className="flex min-w-0 flex-col lg:min-h-61 lg:max-w-180 lg:flex-1">
          {/* Optically aligned: the row centres on the rail's first link
              (34px tall, so 1px below its top for this 32px row) and shares
              Introduction's baseline, and the ghost button hangs 12px into
              the gutter so the arrow's ink, not its hit area, lines up with
              the title. */}
          <div className="flex min-w-0 shrink-0 items-center gap-4 pt-3 lg:pt-[calc(var(--rail-content-top)+1px)]">
            <Button
              variant="ghost"
              shape="rounded"
              size="icon-sm"
              aria-label="Back to Blog"
              nativeButton={false}
              className="-ml-3 text-gray-900"
              render={<Link href="/business-x/blog" />}
            >
              <ArrowLeftIcon />
            </Button>
            <Breadcrumb className="min-w-0">
              <BreadcrumbList className="flex-nowrap">
                <BreadcrumbItem className="shrink-0">
                  <BreadcrumbLink render={<Link href="/business-x/blog" />}>
                    Blog
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>/</BreadcrumbSeparator>
                <BreadcrumbItem className="min-w-0">
                  <BreadcrumbPage className="truncate">
                    {post.topic}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="flex flex-1 items-end pt-6 lg:pt-8">
            <h1 className="text-heading-48 whitespace-pre-line text-gray-1000">
              <XText>{post.title}</XText>
            </h1>
          </div>
        </div>
        <div
          aria-hidden
          className="mt-6 aspect-2/1 w-full shrink-0 bg-gray-100 lg:mt-0 lg:aspect-auto lg:h-61 lg:w-100"
        />
      </header>
      <div className="typeset mx-auto w-full max-w-180 pt-12 pb-30">
        {post.blocks.map((block, index) => (
          <BlockView key={index} block={block} />
        ))}
      </div>
    </article>
  )
}

// The flow margin for a block the typeset does not know.
const flow = "not-typeset mt-(--typeset-flow,1.5rem)"

function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case "heading": {
      const Tag = `h${block.level}` as const
      return (
        <Tag>
          <XText>{block.text}</XText>
        </Tag>
      )
    }
    case "p":
      return (
        <p>
          <Runs runs={block.runs} />
        </p>
      )
    case "list": {
      const Tag = block.ordered ? "ol" : "ul"
      return (
        <Tag>
          {block.items.map((item, index) => (
            <li key={index}>
              <Runs runs={item} />
            </li>
          ))}
        </Tag>
      )
    }
    case "image":
      return (
        <figure>
          <AspectRatio
            ratio={block.w / block.h}
            role="img"
            aria-label={block.alt}
            className="w-full bg-gray-100"
          />
          {block.caption && (
            <figcaption>
              <XText>{block.caption}</XText>
            </figcaption>
          )}
        </figure>
      )
    case "video":
      return (
        <figure>
          <AspectRatio ratio={16 / 9} className="w-full bg-gray-100" />
        </figure>
      )
    case "caption":
      return (
        <p className="text-label-13 whitespace-pre-line text-gray-900">
          <Runs runs={block.runs} />
        </p>
      )
    case "ctas":
      return (
        <div className={cn(flow, "flex flex-wrap gap-3")}>
          {block.items.map((item) => (
            <Button
              key={item.label}
              shape="rounded"
              size="sm"
              variant={item.primary ? "default" : "secondary"}
              nativeButton={false}
              render={
                <a href={item.href} target="_blank" rel="noopener noreferrer" />
              }
            >
              <span>
                <XText>{item.label}</XText>
              </span>
            </Button>
          ))}
        </div>
      )
    case "stats":
      return (
        <StatGroup columns={block.cols} className={flow}>
          {block.items.map((item, index) => (
            <Stat key={index}>
              <StatLabel>
                <XText>{item.label}</XText>
              </StatLabel>
              <StatValue>
                <XText>{item.value}</XText>
              </StatValue>
            </Stat>
          ))}
        </StatGroup>
      )
    case "quote":
      return (
        <Quote
          paragraphs={block.paragraphs}
          name={block.name}
          org={block.org}
        />
      )
    case "posts":
      return (
        <ul
          className={cn(
            flow,
            "grid grid-cols-1 gap-8 md:auto-rows-fr md:grid-cols-2"
          )}
        >
          {Array.from({ length: block.count }, (_, index) => (
            <li key={index} className={cn(block.wide && "md:col-span-2")}>
              <div className="flex h-full items-center justify-center bg-gray-100 p-6 lg:p-12">
                <EmbeddedPost />
              </div>
            </li>
          ))}
        </ul>
      )
    case "carousel":
      return (
        <div className={cn(flow, "overflow-hidden bg-gray-100 px-2")}>
          <div className="flex justify-center gap-4 mask-x-from-85% py-20">
            {Array.from({ length: Math.min(block.count, 5) }, (_, index) => (
              <div key={index} className="w-74 shrink-0">
                <EmbeddedPost />
              </div>
            ))}
          </div>
        </div>
      )
    case "winners":
      return (
        <Labelled label={block.label} className={flow}>
          <ul className="grid auto-rows-fr grid-cols-2">
            {block.items.map((item, index) => (
              <li
                key={index}
                className={cn(
                  "relative flex min-w-0 flex-col items-center gap-6 px-3 py-8 lg:px-6",
                  index % 2 === 1 && rule.left,
                  index >= 2 && rule.top
                )}
              >
                <div className="flex w-full flex-1 flex-col gap-0.5 text-center">
                  <p className="text-label-14 text-gray-1000">{item.title}</p>
                  <p className="text-copy-14 text-pretty text-gray-900">
                    {item.desc}
                  </p>
                </div>
                <div className="flex min-w-22 shrink-0 flex-col items-center gap-2.5">
                  <Avatar size="lg">
                    <AvatarFallback>{initials(item.name)}</AvatarFallback>
                  </Avatar>
                  <div className="flex w-full flex-col items-center">
                    <p className="text-center text-label-14 text-gray-1000">
                      {item.name}
                    </p>
                    <p className="text-center text-label-13 text-gray-900">
                      {item.handle}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Labelled>
      )
    case "aside":
      // The panel stays inside the typeset: it is a section of prose with a
      // label beside it, and a section's first child takes no space above.
      return (
        <Labelled label={block.label} className="mt-(--typeset-flow,1.5rem)">
          <section className="p-6">
            {block.blocks.map((inner, index) => (
              <BlockView key={index} block={inner} />
            ))}
          </section>
        </Labelled>
      )
    case "faq":
      return (
        <Accordion className={flow}>
          {block.items.map((item) => (
            <AccordionItem key={item.q} value={item.q}>
              {/* The trigger is a flex row; one span keeps the question and
                  its inline mark in one line of text. */}
              <AccordionTrigger>
                <span>
                  <XText>{item.q}</XText>
                </span>
              </AccordionTrigger>
              <AccordionContent>
                {item.a.map((paragraph, index) => (
                  <p key={index}>
                    <Runs runs={paragraph} />
                  </p>
                ))}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )
  }
}

// Hairlines between cells of a grey grid, drawn inside the cell so the grid
// itself stays a plain box.
const rule = {
  left: "before:absolute before:inset-y-6 before:left-0 before:w-px before:bg-gray-alpha-400 before:content-['']",
  top: "after:absolute after:inset-x-6 after:top-0 after:h-px after:bg-gray-alpha-400 after:content-['']",
}

// A pull quote with its speaker, as the typeset sets a blockquote.
function Quote({
  paragraphs,
  name,
  org,
}: {
  paragraphs: Run[][]
  name: string
  org?: string
}) {
  return (
    <blockquote>
      {paragraphs.map((paragraph, index) => (
        <p key={index}>
          <Runs runs={paragraph} />
        </p>
      ))}
      <footer>
        <cite>{name}</cite>
        {org && <br />}
        {org}
      </footer>
    </blockquote>
  )
}

// A grey panel with a small ruled label beside it (above it under 1024px).
function Labelled({
  label,
  className,
  children,
}: {
  label: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className={cn("flex gap-6 max-lg:flex-col lg:gap-10", className)}>
      <div className="border-t border-gray-alpha-400 pt-3 lg:w-52 lg:shrink-0">
        <div className="not-typeset flex items-center gap-3">
          <span aria-hidden className="size-1 shrink-0 bg-gray-700" />
          <p className="text-label-14 text-gray-1000">
            <XText>{label}</XText>
          </p>
        </div>
      </div>
      <div className="min-w-0 flex-1 bg-gray-100">{children}</div>
    </div>
  )
}

// Where the site embeds a post from x.com, a card of the post's shape: who,
// three lines of copy, a picture. Content is left blank on purpose.
function EmbeddedPost() {
  return (
    <Card size="sm" className="w-full max-w-100">
      <CardHeader>
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarFallback />
          </Avatar>
          <div className="flex flex-col gap-1.5">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-3 w-16" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-11/12" />
        <Skeleton className="h-3 w-2/3" />
        <Skeleton className="mt-2 aspect-video w-full" />
      </CardContent>
    </Card>
  )
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase()
}
