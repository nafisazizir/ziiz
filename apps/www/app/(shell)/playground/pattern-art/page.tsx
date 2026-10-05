import type { Metadata } from "next"

import { BlogHero } from "@/components/blog/blog-hero"
import { PatternColumns, patterns, PatternStage } from "@/components/patterns"
import { Separator } from "@/components/ui/separator"

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
    term: "Placement",
    rule: "90% of the container's width, capped at half its height. Pinned to the top on a cover, centred everywhere else.",
  },
]

// The containers every pattern is tried in. The cover carries a title, since
// that is what the space under a top-pinned pattern is for.
const containers = [
  { label: "Cover", note: "398×245, top", ratio: "398 / 245", cover: true },
  { label: "16:9", note: "centre", ratio: "16 / 9" },
  { label: "Open Graph", note: "1200×630, centre", ratio: "1200 / 630" },
  { label: "4:3", note: "centre", ratio: "4 / 3" },
  { label: "1:1", note: "centre", ratio: "1 / 1" },
]

export default function PatternArtPage() {
  return (
    <>
      <BlogHero
        title="Pattern art"
        description={`${patterns.length} patterns, each drawn once on a 384×120 frame and placed in any container. The red outline is the frame.`}
      >
        <PatternStage pattern={PatternColumns} className="absolute inset-0" />
      </BlogHero>
      <Separator className="mt-10 lg:mt-0" />
      <div className="flex flex-col gap-20 py-10 lg:gap-30 lg:py-20">
        <dl className="grid gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {rules.map(({ term, rule }) => (
            <div key={term} className="flex flex-col gap-2">
              <dt className="text-heading-16 text-gray-1000">{term}</dt>
              <dd className="text-copy-13 text-gray-900">{rule}</dd>
            </div>
          ))}
        </dl>
        {patterns.map((entry, index) => (
          <section key={entry.name} className="flex flex-col gap-4">
            <h2 className="text-heading-24 text-gray-1000">
              <span className="me-3 text-label-12 tracking-wider text-gray-900 tabular-nums">
                {String(index + 1).padStart(2, "0")}
              </span>
              {entry.label}
              <span className="ms-3 text-label-12 text-gray-900">
                {entry.name}
              </span>
            </h2>
            <PatternStage
              pattern={entry.Component}
              outline
              className="aspect-2/1 lg:aspect-3/1"
            />
            <ul className="grid grid-cols-2 items-start gap-x-4 gap-y-8 lg:grid-cols-3">
              {containers.map(({ label, note, ratio, cover }) => (
                <li key={label} className="flex flex-col gap-3">
                  <PatternStage
                    pattern={entry.Component}
                    anchor={cover ? "top" : "center"}
                    style={{ aspectRatio: ratio }}
                  >
                    {cover && (
                      <p className="absolute inset-x-[5cqw] bottom-[5cqw] text-[5cqw] leading-[1.2] font-medium tracking-tight">
                        A new era for the everything app: X launches Video Tab
                      </p>
                    )}
                  </PatternStage>
                  <p className="text-copy-13 text-gray-1000">
                    {label}
                    <span className="block text-label-12 text-gray-900">
                      {note}
                    </span>
                  </p>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </>
  )
}
