import Link from "next/link"
import { IconPlayerPlayFilled } from "@tabler/icons-react"

import type { DocBlock, DocCell } from "@/components/business-x/doc"
import { runText } from "@/components/business-x/doc"
import { Runs, XText } from "@/components/business-x/runs"
import { Callout } from "@/components/docs/callout"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

// The flow margin for a block the typeset does not know.
const flow = "not-typeset mt-(--typeset-flow,1.5rem)"

// An article body from help.x.com or money.x.com, set by ziiz's own prose
// layer: render it inside a `typeset` column and headings, paragraphs,
// lists, tables, figures and code take the layer's roles and rhythm rather
// than x.com's. Blocks the layer has no element for are ziiz components.
//
// `plain` is for a body inside a component that has opted out of the
// typeset (a callout, an accordion answer): the same blocks, spaced and
// bulleted by hand.
export function DocBlocks({
  blocks,
  plain,
}: {
  blocks: DocBlock[]
  plain?: boolean
}) {
  return blocks.map((block, index) => (
    <BlockView key={index} block={block} plain={plain} />
  ))
}

function BlockView({ block, plain }: { block: DocBlock; plain?: boolean }) {
  switch (block.type) {
    case "heading": {
      if (plain) {
        return (
          <p id={block.id} className="not-first:mt-4">
            <strong>
              <Runs runs={block.runs} />
            </strong>
          </p>
        )
      }
      const Tag = `h${block.level}` as const
      return (
        <Tag id={block.id}>
          <Runs runs={block.runs} />
        </Tag>
      )
    }
    case "p":
      return (
        <p>
          {block.lead ? (
            <strong>
              <Runs runs={block.runs} />
            </strong>
          ) : (
            <Runs runs={block.runs} />
          )}
        </p>
      )
    case "list": {
      const Tag = block.ordered ? "ol" : "ul"
      return (
        <Tag
          start={block.start}
          className={cn(
            plain &&
              "flex flex-col gap-1.5 pl-5 not-last:mb-4 marker:text-gray-600",
            plain && (block.ordered ? "list-decimal" : "list-disc")
          )}
        >
          {block.items.map((item, index) => {
            // An item opens with its text on the marker's line; whatever
            // follows (a nested list, a figure) sits under it.
            const [first, ...rest] = item
            const lead = first?.type === "p" ? first : undefined
            return (
              <li key={index}>
                {lead && <Runs runs={lead.runs} />}
                <DocBlocks blocks={lead ? rest : item} plain={plain} />
              </li>
            )
          })}
        </Tag>
      )
    }
    case "tabs":
      return <StepsPanel block={block} />
    case "note":
      return (
        <Callout
          title={block.title && runText(block.title).replaceAll(">x<", "X")}
        >
          <DocBlocks blocks={block.blocks} plain />
        </Callout>
      )
    case "image":
      return <Figure block={block} plain={plain} />
    case "video":
      return (
        <figure>
          <AspectRatio
            ratio={16 / 9}
            role="img"
            aria-label={block.label}
            className="flex w-full items-center justify-center bg-gray-100 text-gray-700"
          >
            <IconPlayerPlayFilled className="size-8" />
          </AspectRatio>
        </figure>
      )
    case "table":
      return <DataTable id={block.id} rows={block.rows} />
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
              render={<DocLink href={item.href} />}
            >
              <span>
                <XText>{item.label}</XText>
              </span>
            </Button>
          ))}
        </div>
      )
    case "accordion":
      // The typeset mutes its text; the accordion takes ink back for its
      // questions and the wrapper inside each answer mutes the copy again.
      return (
        <div className={cn(flow, "text-gray-1000")}>
          <Accordion defaultValue={block.items[0] ? [0] : []}>
            {block.items.map((item, index) => (
              <AccordionItem key={index} value={index} id={item.id}>
                <AccordionTrigger>
                  <span>
                    <Runs runs={item.q} />
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="text-gray-900 [&_a]:text-gray-1000 [&_strong]:font-medium [&_strong]:text-gray-1000">
                    <DocBlocks blocks={item.blocks} plain />
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      )
    case "post":
      return (
        <div className={cn(flow, "flex justify-center bg-gray-100 p-6")}>
          <EmbeddedPost />
        </div>
      )
    case "code":
      return (
        <pre>
          <code>{block.code}</code>
        </pre>
      )
    case "cards":
      return (
        <ul
          id={block.id}
          className={cn(flow, "grid grid-cols-1 gap-4 md:grid-cols-2")}
        >
          {block.items.map((item, index) => (
            <li
              key={index}
              className="flex flex-col gap-1 bg-gray-100 p-6 text-copy-14 text-gray-900"
            >
              <p className="text-label-14 text-gray-1000">
                <Runs runs={item.title} />
              </p>
              {item.body && (
                <p>
                  <Runs runs={item.body} />
                </p>
              )}
            </li>
          ))}
        </ul>
      )
    case "follow":
      return (
        <ItemGroup className={flow}>
          {block.items.map((item, index) => (
            <Item key={index} variant="muted">
              <ItemMedia>
                <Avatar>
                  <AvatarFallback />
                </Avatar>
              </ItemMedia>
              <ItemContent>
                <ItemTitle>{item.name}</ItemTitle>
                <ItemDescription>{item.handle}</ItemDescription>
              </ItemContent>
              <ItemActions>
                <Button
                  shape="rounded"
                  size="sm"
                  nativeButton={false}
                  render={
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    />
                  }
                >
                  Follow
                </Button>
              </ItemActions>
            </Item>
          ))}
        </ItemGroup>
      )
  }
}

// A link the way Runs draws one: inside the clone it is a route change,
// anywhere else a new tab.
function DocLink({
  href,
  ...props
}: React.ComponentProps<"a"> & { href: string }) {
  return href.startsWith("/") ? (
    <Link href={href} {...props} />
  ) : (
    <a href={href} target="_blank" rel="noopener noreferrer" {...props} />
  )
}

// The site's grey step panel: a title on the left, a device choice on the
// right, the steps under a hairline. The panel stays inside the typeset, so
// its steps are prose; only the header row opts out. A panel with nothing to
// choose is the same box without the tabs.
function StepsPanel({ block }: { block: Extract<DocBlock, { type: "tabs" }> }) {
  const title = block.title.length > 0 && (
    <p className="min-w-0 truncate py-4 text-label-16 text-gray-1000">
      <Runs runs={block.title} />
    </p>
  )
  const header =
    "not-typeset mx-4 flex flex-col border-b border-gray-alpha-400 md:flex-row md:items-center md:justify-between md:gap-6"
  const panel = "block px-5 pt-6 pb-8 md:pr-14"

  if (block.tabs.length === 1 && !block.tabs[0].label) {
    return (
      <div
        id={block.id}
        className="mt-(--typeset-flow,1.5rem) bg-gray-100 [&+*]:mt-(--typeset-flow,1.5rem)"
      >
        {title && <div className={header}>{title}</div>}
        <section className={panel}>
          <DocBlocks blocks={block.tabs[0].blocks} />
        </section>
      </div>
    )
  }

  return (
    <Tabs
      id={block.id}
      defaultValue={block.tabs[0].label}
      className="mt-(--typeset-flow,1.5rem) gap-0 bg-gray-100"
    >
      <div className={header}>
        {title}
        <TabsList
          variant="line"
          aria-label="Choose a device"
          className="max-md:-ml-2 md:ml-auto"
        >
          {block.tabs.map((tab) => (
            <TabsTrigger key={tab.label} value={tab.label}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>
      {block.tabs.map((tab) => (
        <TabsContent key={tab.label} value={tab.label}>
          <section className={panel}>
            <DocBlocks blocks={tab.blocks} />
          </section>
        </TabsContent>
      ))}
    </Tabs>
  )
}

// An image, as a grey panel with the picture's box inside it: the site
// centres the image in a padded panel and caps a tall one's height, so the
// placeholder keeps the ratio and never grows past the cap or the source.
function Figure({
  block,
  plain,
}: {
  block: Extract<DocBlock, { type: "image" }>
  plain?: boolean
}) {
  const ratio = block.w / block.h
  const cap = block.maxHeight ? block.maxHeight * ratio : block.w

  return (
    <figure className={cn(plain && "not-last:mb-4")}>
      <div className="flex justify-center bg-gray-100 p-6">
        <div className="w-full" style={{ maxWidth: Math.round(cap) }}>
          <AspectRatio
            ratio={ratio}
            role="img"
            aria-label={block.alt || undefined}
            className="bg-gray-200"
          />
        </div>
      </div>
      {block.caption && (
        <figcaption>
          <Runs runs={block.caption} />
        </figcaption>
      )}
    </figure>
  )
}

// A table the prose layer styles. A first row of header cells becomes the
// head. Cells wrap to fit the column and hold a 128px floor, so a wide
// table on a narrow screen scrolls in its wrapper instead of crushing.
function DataTable({ id, rows }: { id?: string; rows: DocCell[][] }) {
  const hasHead = rows.length > 1 && rows[0].every((cell) => cell.header)
  const head = hasHead ? rows[0] : undefined
  const body = hasHead ? rows.slice(1) : rows

  return (
    <div id={id} className="typeset-scroll" tabIndex={0}>
      <table className="w-full">
        {head && (
          <thead>
            <tr>
              {head.map((cell, index) => (
                <th
                  key={index}
                  colSpan={cell.colSpan}
                  scope="col"
                  className="min-w-32 whitespace-normal"
                >
                  <XText>
                    {cell.blocks
                      .map((block) =>
                        block.type === "p" ? runText(block.runs) : ""
                      )
                      .join(" ")}
                  </XText>
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {body.map((row, index) => (
            <tr key={index}>
              {row.map((cell, at) => {
                const Tag = cell.header ? "th" : "td"
                return (
                  <Tag
                    key={at}
                    colSpan={cell.colSpan}
                    rowSpan={cell.rowSpan}
                    className="min-w-32 align-top whitespace-normal"
                  >
                    <DocBlocks blocks={cell.blocks} />
                  </Tag>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// An embedded post, as its loading state: the site draws the same skeleton
// until the embed resolves.
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
