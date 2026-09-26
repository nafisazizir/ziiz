"use client"

import * as React from "react"
import Link from "next/link"

import { formatDate, type BlogCard } from "@/lib/blog"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Button } from "@/components/ui/button"
import { Nav, NavItem, NavLink, NavList } from "@/components/ui/nav"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Six cards at a time; the list grows by six, or all at once.
const pageSize = 6

// Card art and post header art share one ratio.
export const cardRatio = 8 / 5

// The latest posts: a category filter beside a grid of cards. From lg the
// filter takes two of eight columns with the site's square marker sliding to
// the current one, and the cards the other six in two columns. Below that
// the filter is a tab strip on a hairline track, stuck under the mobile bar,
// and the cards stack, going to two columns from sm. One Tabs holds both, so
// the Nav and the strip drive the same value and the cards are its panel.
export function BlogList({
  posts,
  categories,
}: {
  posts: BlogCard[]
  categories: string[]
}) {
  const [category, setCategory] = React.useState("All")
  const [shown, setShown] = React.useState(pageSize)

  const matching =
    category === "All"
      ? posts
      : posts.filter((post) => post.category === category)
  const visible = matching.slice(0, shown)

  function select(next: string) {
    setCategory(next)
    setShown(pageSize)
  }

  return (
    <section className="flex w-full flex-col gap-8 lg:gap-15">
      <h2 className="text-heading-32 text-gray-1000">
        {`The latest from ziiz`}
        <span className="block text-gray-900">
          announcements, foundations and decisions
        </span>
      </h2>
      <Tabs
        value={category}
        onValueChange={select}
        className="grid grid-cols-8 gap-x-4 gap-y-8"
      >
        <div className="col-span-8 -mx-1 bg-background px-1 pt-3 max-lg:sticky max-lg:top-(--header-height) max-lg:z-20 lg:hidden">
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
          className="col-span-2 self-start max-lg:hidden lg:sticky lg:top-10"
        >
          <NavList marker className="-mx-2.5">
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
              <Card key={post.url} post={post} />
            ))}
          </ul>
          <div className="flex flex-col gap-4">
            <Separator />
            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className="text-copy-13 text-gray-900">
                <span className="text-gray-1000">{`Showing ${visible.length}`}</span>
                {` of ${matching.length} ${matching.length === 1 ? "post" : "posts"}`}
              </p>
              {visible.length < matching.length && (
                <div className="flex items-center gap-3">
                  <Button
                    shape="rounded"
                    size="sm"
                    variant="secondary"
                    onClick={() => setShown(matching.length)}
                  >
                    View all
                  </Button>
                  <Button
                    shape="rounded"
                    size="sm"
                    onClick={() => setShown((shown) => shown + pageSize)}
                  >
                    {`View ${Math.min(pageSize, matching.length - visible.length)} more`}
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

// The 8:5 art with the title set inside it, bottom left, then the date, a
// three-line description and a pill pushed to the card's bottom edge so
// every card in a row ends level.
function Card({ post }: { post: BlogCard }) {
  return (
    <li className="flex flex-col gap-2 md:h-full">
      <Link href={post.url} aria-hidden tabIndex={-1} className="block">
        <AspectRatio
          ratio={cardRatio}
          className="w-full overflow-hidden bg-gray-100"
        >
          <p className="absolute inset-x-4 bottom-4 text-heading-24 text-balance text-gray-1000">
            {post.title}
          </p>
        </AspectRatio>
      </Link>
      <div className="flex flex-1 flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <time dateTime={post.date} className="text-label-13 text-gray-900">
            {formatDate(post.date)}
          </time>
          <p className="line-clamp-3 text-copy-13 text-gray-900">
            {post.description}
          </p>
        </div>
        <Button
          shape="rounded"
          size="sm"
          variant="secondary"
          className="mt-auto w-min"
          nativeButton={false}
          render={<Link href={post.url} />}
        >
          Read more
        </Button>
      </div>
    </li>
  )
}
