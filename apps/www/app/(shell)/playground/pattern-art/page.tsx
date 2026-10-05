import type { Metadata } from "next"

import { BlogHero } from "@/components/blog/blog-hero"
import { PatternColumns, patterns, PatternStage } from "@/components/patterns"
import { Separator } from "@/components/ui/separator"

import { PatternCatalogue } from "./pattern-catalogue"

export const metadata: Metadata = {
  title: "Pattern art",
  description:
    "Patterns drawn once on a 16:5 frame and placed in any container.",
}

const rules = [
  {
    term: "Frame",
    rule: "384×120, 16:5, no padding and no background. The container brings the margin, the position and the panel.",
  },
  {
    term: "Inside",
    rule: "Closed shapes stay in the frame and may touch its edges.",
  },
  {
    term: "Crossing",
    rule: "Only straight lines, and the bands between them, cross an edge. They run on until the container clips them. Nothing leaves through the bottom.",
  },
  {
    term: "Subject",
    rule: "One cut-out carries the eye. Solid is the thing, dashed is the reasoning, and a marker always marks a vertex.",
  },
  {
    term: "Placement",
    rule: "90% of the container's width, capped at half its height. Pinned to the top on a cover, centred everywhere else.",
  },
]

export default function PatternArtPage() {
  return (
    <>
      <BlogHero
        title="Pattern art"
        description={`${patterns.length} patterns in nine families, each drawn once on a 384×120 frame and placed in any container. The rules are in components/patterns/README.md.`}
      >
        <PatternStage
          pattern={PatternColumns}
          animate
          className="absolute inset-0"
        />
      </BlogHero>
      <Separator className="mt-10 lg:mt-0" />
      <div className="flex flex-col gap-20 py-10 lg:gap-30 lg:py-20">
        <dl className="grid gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-5">
          {rules.map(({ term, rule }) => (
            <div key={term} className="flex flex-col gap-2">
              <dt className="text-heading-16 text-gray-1000">{term}</dt>
              <dd className="text-copy-13 text-gray-900">{rule}</dd>
            </div>
          ))}
        </dl>
        <PatternCatalogue />
      </div>
    </>
  )
}
