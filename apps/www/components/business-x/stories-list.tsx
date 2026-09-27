"use client"

import * as React from "react"

import type { StoryDetail } from "@/components/business-x/data/success-stories"
import { FormDropdown } from "@/components/business-x/form-dropdown"
import { StoryCard } from "@/components/business-x/story-card"
import { Button } from "@/components/ui/button"
import { Field, FieldLabel } from "@/components/ui/field"
import { Separator } from "@/components/ui/separator"

const filters = [
  { id: "objective", label: "Campaign objective" },
  { id: "targeting", label: "Targeting type" },
  { id: "region", label: "Region" },
  { id: "business", label: "Business type" },
]

const all = [{ label: "All", value: "all" }]

// "Advertiser success stories": four filters on a row that sticks to the
// top (two by two below 1024px), a results count beside a sort menu over a
// rule, then the cards three across (two from 768px, one below) with 86px
// between rows. The site lists 58 stories six at a time; the clone has the
// nine on its first screen, so Load More does nothing.
export function StoriesList({ stories }: { stories: StoryDetail[] }) {
  const [sort, setSort] = React.useState("recent")
  const sorted = React.useMemo(
    () => (sort === "oldest" ? [...stories].reverse() : stories),
    [sort, stories]
  )

  return (
    <section
      id="stories"
      className="flex flex-col border-b border-gray-alpha-400 pt-14 pb-14 max-md:border-t lg:pt-20"
    >
      <h2 className="mb-4 text-heading-32 text-gray-1000">
        Advertiser success stories
      </h2>
      <div className="sticky top-14 z-20 mb-10 grid grid-cols-2 gap-4 bg-background-100 py-4 md:gap-6 lg:top-0 lg:mb-11 lg:grid-cols-4">
        {filters.map((filter) => (
          <Field key={filter.id}>
            <FieldLabel htmlFor={`stories-${filter.id}`}>
              {filter.label}
            </FieldLabel>
            <FormDropdown
              id={`stories-${filter.id}`}
              placeholder="All"
              options={all}
            />
          </Field>
        ))}
      </div>
      <div className="flex flex-col gap-7">
        <div className="flex items-center justify-between gap-4 pb-7">
          <p className="text-label-12 text-gray-900">{`${stories.length} Results`}</p>
          <div className="flex items-center gap-3">
            <span className="text-label-13 text-gray-1000">Sort by</span>
            <SortMenu value={sort} onChange={setSort} />
          </div>
        </div>
        <Separator className="-mt-7" />
        <ul className="grid grid-cols-1 gap-x-6 gap-y-14 md:auto-rows-fr md:grid-cols-2 md:gap-y-10 lg:grid-cols-3 lg:gap-y-[86px]">
          {sorted.map((story) => (
            <StoryCard key={story.slug} story={story} />
          ))}
        </ul>
      </div>
      <div className="mt-14 flex justify-center lg:mt-15">
        <Button shape="rounded" size="sm" disabled>
          Load More Articles
        </Button>
      </div>
    </section>
  )
}

function SortMenu({
  value,
  onChange,
}: {
  value: string
  onChange: (next: string) => void
}) {
  return (
    <div className="w-50">
      <FormDropdown
        id="stories-sort"
        placeholder="Date, most recent"
        value={value}
        onValueChange={onChange}
        options={[
          { label: "Date, most recent", value: "recent" },
          { label: "Date, oldest first", value: "oldest" },
        ]}
      />
    </div>
  )
}
