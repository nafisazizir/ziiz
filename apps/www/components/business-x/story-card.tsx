import Link from "next/link"

import { XText } from "@/components/business-x/runs"
import { XLogo } from "@/components/business-x/x-logo"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export type Story = {
  slug: string
  brand: string
  category: string
  date: string
  description: string
}

// A success story as the site lists one: a category and date row, a 280px
// grey box with the brand's lockup (its logo is a photo, so a bar stands in
// beside the X mark), the brand name, a two-line description and a pill
// pushed to the bottom. `dark` inverts the box the way the site does for
// the middle card on the home page.
export function StoryCard({
  story,
  dark,
  className,
}: {
  story: Story
  dark?: boolean
  className?: string
}) {
  const href = `/business-x/success-stories/${story.slug}`
  return (
    <li className={cn("flex flex-col gap-2", className)}>
      <div className="flex items-center justify-between gap-2 text-label-13 text-gray-1000">
        <span>{story.category}</span>
        <span>{story.date}</span>
      </div>
      <Link
        href={href}
        aria-hidden
        tabIndex={-1}
        className={cn(
          "flex h-70 items-center justify-center gap-4 overflow-hidden p-6",
          dark
            ? "bg-gray-1000 text-background-100"
            : "bg-gray-100 text-gray-1000"
        )}
      >
        <XLogo className="size-8" />
        <span
          aria-hidden
          className={cn("h-8 w-24", dark ? "bg-gray-800" : "bg-gray-alpha-300")}
        />
      </Link>
      <div className="flex flex-1 flex-col gap-4">
        <div className="flex flex-col gap-[3px] text-label-13">
          <p className="text-gray-1000">{story.brand}</p>
          <p className="line-clamp-3 text-gray-900">
            <XText>{story.description}</XText>
          </p>
        </div>
        <Button
          shape="rounded"
          size="sm"
          variant="secondary"
          className="mt-auto w-min"
          nativeButton={false}
          render={<Link href={href} />}
        >
          Read More
        </Button>
      </div>
    </li>
  )
}
