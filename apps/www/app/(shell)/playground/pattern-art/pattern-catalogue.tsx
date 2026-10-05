"use client"

import * as React from "react"

import { families, patterns, PatternStage } from "@/components/patterns"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

// The containers every pattern is tried in. Frame shows the 384×120 frame
// outlined; the cover carries a title, since that is what the space under a
// top-pinned pattern is for.
const views = [
  { value: "frame", label: "Frame", ratio: "2 / 1" },
  { value: "cover", label: "Cover", ratio: "398 / 245" },
  { value: "og", label: "Open Graph", ratio: "1200 / 630" },
  { value: "16:9", label: "16:9", ratio: "16 / 9" },
  { value: "4:3", label: "4:3", ratio: "4 / 3" },
  { value: "1:1", label: "1:1", ratio: "1 / 1" },
]

// The view tabs ride in a bar stuck to the top of the column. The bar is
// opaque from the viewport edge down to its rule, so the art scrolls under a
// clean cut, and its tabs sit level with the sidebar's first row.
export function PatternCatalogue() {
  const [view, setView] = React.useState("cover")
  const { ratio } = views.find((v) => v.value === view) ?? views[0]

  return (
    <Tabs
      value={view}
      onValueChange={(value) => setView(value as string)}
      className="gap-20 lg:gap-30"
    >
      <div className="sticky top-(--header-height) z-40 border-b border-gray-alpha-400 bg-background pt-(--content-top)">
        <TabsList
          variant="line"
          className="max-w-full overflow-x-auto group-data-horizontal/tabs:h-8"
        >
          {views.map((v) => (
            <TabsTrigger key={v.value} value={v.value}>
              {v.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>
      {families.map((family) => {
        const entries = patterns.filter((p) => p.family === family.name)
        return (
          <section key={family.name} className="flex flex-col gap-8">
            <h2 className="text-heading-24 text-gray-1000">
              {family.name}
              <span className="ms-3 text-label-12 text-gray-900 tabular-nums">
                {entries.length}
              </span>
              <span className="block text-copy-14 text-gray-900">
                {family.description}
              </span>
            </h2>
            <ul className="grid grid-cols-2 items-start gap-x-4 gap-y-8 lg:grid-cols-3">
              {entries.map((entry) => (
                <li key={entry.name} className="flex flex-col gap-3">
                  <PatternStage
                    pattern={entry.Component}
                    anchor={view === "cover" ? "top" : "center"}
                    outline={view === "frame"}
                    style={{ aspectRatio: ratio }}
                  >
                    {view === "cover" && (
                      <p className="absolute inset-x-[5cqw] bottom-[5cqw] text-[5cqw] leading-[1.2] font-medium tracking-tight">
                        A new era for the everything app: X launches Video Tab
                      </p>
                    )}
                  </PatternStage>
                  <p className="text-copy-13 text-gray-1000">
                    <span className="me-2 text-gray-900 tabular-nums">
                      {String(patterns.indexOf(entry) + 1).padStart(2, "0")}
                    </span>
                    {entry.label}
                    <span className="block text-label-12 text-gray-900">
                      {entry.name}
                    </span>
                  </p>
                </li>
              ))}
            </ul>
          </section>
        )
      })}
    </Tabs>
  )
}
