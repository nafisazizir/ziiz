import Link from "next/link"

import {
  EclipsePair,
  PanelStack,
  PrismRays,
  RelayPair,
  SweepRings,
} from "@/components/art"
import type { ArtProps } from "@/components/art/props"
import { XText } from "@/components/business-x/runs"
import type { HelpCategory } from "@/components/help-x/articles"

// Each category's drawing, shared by its row on the home page and the tile
// on its own page.
export const categoryArt: Record<string, (props: ArtProps) => React.ReactNode> =
  {
    "using-x": EclipsePair,
    "managing-your-account": PanelStack,
    "safety-and-security": RelayPair,
    "rules-and-policies": SweepRings,
    "business-and-advertising": PrismRays,
  }

// A category on help.x.com: a 368px tile (the drawing over the name) that
// sticks beside the page from 1024px, and every article of the category in
// titled, numbered runs. Below 1024px the tile leads and the runs follow.
export function HelpCategoryView({ category }: { category: HelpCategory }) {
  const Art = categoryArt[category.slug]

  return (
    <section className="flex w-full flex-col gap-6 py-10 lg:flex-row lg:items-start lg:gap-8 lg:py-20">
      <div className="flex h-112 w-full shrink-0 flex-col gap-6 overflow-hidden bg-gray-100 p-6 lg:sticky lg:top-20 lg:w-92">
        <div className="flex min-h-0 flex-1 items-center justify-center overflow-hidden text-gray-1000">
          {Art && <Art className="size-full max-h-full max-w-full" />}
        </div>
        <h1 className="text-heading-48 text-balance wrap-break-word text-gray-1000 lg:max-w-70">
          <XText>{category.title}</XText>
        </h1>
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-12 lg:gap-18">
        {category.sections.map((section) => (
          <div key={section.id} className="flex flex-col gap-4">
            <div className="flex max-w-122 flex-col gap-1.5 lg:ps-4">
              <h2
                id={section.id}
                className="scroll-mt-24 text-heading-24 text-balance text-gray-1000"
              >
                <XText>{section.title}</XText>
              </h2>
              {section.description && (
                <p className="text-copy-13 text-gray-900">
                  <XText>{section.description}</XText>
                </p>
              )}
            </div>
            <ArticleList items={section.items} className="min-h-14 p-4" wrap />
          </div>
        ))}
      </div>
    </section>
  )
}

// Numbered article links under hairlines: the home page's four per
// category, truncated to a line, and a category page's full runs, wrapped.
export function ArticleList({
  items,
  className,
  wrap,
}: {
  items: { title: string; href: string }[]
  className?: string
  wrap?: boolean
}) {
  return (
    <ol className="flex min-w-0 flex-col">
      {items.map((item, index) => {
        const row = (
          <>
            <span className="shrink-0 text-gray-900 tabular-nums">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span
              className={
                wrap
                  ? "min-w-0 text-gray-1000"
                  : "min-w-0 truncate text-gray-1000"
              }
            >
              <XText>{item.title}</XText>
            </span>
          </>
        )
        const rowClass = [
          "flex gap-3 text-label-16 transition-colors outline-none hover:bg-gray-100 focus-visible:bg-gray-100",
          wrap ? "items-start" : "items-center",
          className,
        ].join(" ")
        return (
          <li
            key={item.href + index}
            className={
              wrap
                ? "border-b border-gray-alpha-400"
                : "not-last:border-b not-last:border-gray-alpha-400"
            }
          >
            {item.href.startsWith("/") ? (
              <Link href={item.href} className={rowClass}>
                {row}
              </Link>
            ) : (
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={rowClass}
              >
                {row}
              </a>
            )}
          </li>
        )
      })}
    </ol>
  )
}
