"use client"

import * as React from "react"
import Link from "next/link"

import { cardRatio, categories, type Post } from "@/components/business-x/blog"
import { XText } from "@/components/business-x/runs"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Button } from "@/components/ui/button"
import { Nav, NavItem, NavLink, NavList } from "@/components/ui/nav"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

// x.com shows six cards at a time and grows the list by six, or all at once.
const pageSize = 6

// "The latest from X": a category filter beside a grid of cards. x.com's
// geometry at 1024px and up is the article's eight-column grid: filters in
// two columns, stuck level with the rail's first row, cards across the other
// six in two columns with a 16px gutter and 40px between rows. Below that the
// filters become x.com's tab strip — ui/tabs' line variant on a hairline
// track, scrolling sideways, stuck under the mobile bar, the first tab's
// underline starting where the track does — and the cards stack, going to two columns from
// 640px. One Tabs holds both, so the rail-side Nav and the strip drive the
// same value and the cards are the strip's panel.
//
// A card is the site's 8:5 art with the title set inside it, bottom left,
// then a three-line description and a pill pushed to the card's bottom edge
// so every card in a row ends level.
export function BlogList({ posts }: { posts: Post[] }) {
  const [category, setCategory] =
    React.useState<(typeof categories)[number]>("All")
  const [shown, setShown] = React.useState(pageSize)

  const matching =
    category === "All"
      ? posts
      : posts.filter((post) => post.category === category)
  const visible = matching.slice(0, shown)

  function select(next: (typeof categories)[number]) {
    setCategory(next)
    setShown(pageSize)
  }

  return (
    <section className="flex w-full flex-col gap-8 lg:gap-15">
      <h2 className="text-heading-32 text-gray-1000">
        {`The latest from `}
        <XText>{">x<"}</XText>
        <span className="block text-gray-900">
          product news, playbooks, and results
        </span>
      </h2>
      <Tabs
        value={category}
        onValueChange={select}
        className="grid grid-cols-8 gap-x-4 gap-y-8"
      >
        <div className="col-span-8 -mx-4 bg-background-100 px-4 pt-3 max-lg:sticky max-lg:top-14 max-lg:z-20 lg:hidden">
          <div className="relative">
            <Separator className="absolute inset-x-0 bottom-0" />
            <TabsList
              variant="line"
              aria-label="Categories"
              className="relative -mx-0.75 w-[calc(100%+0.375rem)] scrollbar-none justify-start overflow-x-auto overflow-y-hidden"
            >
              {categories.map((item) => (
                <TabsTrigger key={item} value={item} className="flex-none">
                  {item}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
        </div>
        <Nav
          aria-label="Categories"
          className="col-span-2 self-start max-lg:hidden lg:sticky lg:top-(--rail-content-top)"
        >
          <NavList className="-mx-2.5">
            {categories.map((item) => (
              <NavItem key={item}>
                <NavLink
                  active={item === category}
                  render={<button type="button" />}
                  onClick={() => select(item)}
                >
                  {item}
                </NavLink>
              </NavItem>
            ))}
          </NavList>
        </Nav>
        <TabsContent
          value={category}
          className="col-span-8 flex flex-col gap-8 lg:col-span-6"
        >
          <ul className="grid grid-cols-1 gap-x-4 gap-y-10 sm:grid-cols-2 md:auto-rows-fr">
            {visible.map((post) => (
              <Card key={post.slug} post={post} />
            ))}
          </ul>
          <div className="flex flex-col gap-4">
            <Separator />
            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className="text-copy-13 text-gray-900">
                <span className="text-gray-1000">{`Showing ${visible.length}`}</span>
                {` of ${matching.length} articles`}
              </p>
              {visible.length < matching.length && (
                <div className="flex items-center gap-3">
                  <Button
                    shape="rounded"
                    size="sm"
                    variant="secondary"
                    onClick={() => setShown(matching.length)}
                  >
                    View All
                  </Button>
                  <Button
                    shape="rounded"
                    size="sm"
                    onClick={() => setShown((shown) => shown + pageSize)}
                  >
                    {`View ${Math.min(pageSize, matching.length - visible.length)} More`}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </section>
  )
}

function Card({ post }: { post: Post }) {
  const href = `/business-x/blog/${post.slug}`
  return (
    <li className="flex flex-col gap-2 md:h-full">
      <Link href={href} aria-hidden tabIndex={-1} className="block">
        <AspectRatio
          ratio={cardRatio}
          className={cn("w-full overflow-hidden bg-gray-100")}
        >
          <p className="absolute inset-x-4 bottom-4 text-heading-24 whitespace-pre-line text-gray-1000">
            <XText>{post.title}</XText>
          </p>
        </AspectRatio>
      </Link>
      <div className="flex flex-1 flex-col gap-4">
        <p className="line-clamp-3 text-copy-13 text-gray-900">
          <XText>{post.description}</XText>
        </p>
        <Button
          shape="rounded"
          size="sm"
          variant="secondary"
          className="mt-auto w-min"
          nativeButton={false}
          render={<Link href={href} />}
        >
          Learn More
        </Button>
      </div>
    </li>
  )
}
