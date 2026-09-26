import * as React from "react"

import type { Run } from "@/components/business-x/blog"
import { XLogo } from "@/components/business-x/x-logo"

// Copy from the site keeps ">x<" where it draws its logo inline. Every string
// passes through here so the mark lands as a glyph-sized SVG on the baseline,
// the way the hero's title does.
export function XText({ children }: { children: string }) {
  const parts = children.split(">x<")
  return parts.map((part, index) => (
    <React.Fragment key={index}>
      {index > 0 && <XLogo className="inline size-[0.85em] align-[-0.08em]" />}
      {part}
    </React.Fragment>
  ))
}

// Inline copy: text, bold, italic and links, nested. Links leave the clone,
// so they open in a new tab.
export function Runs({ runs }: { runs: Run[] }) {
  return runs.map((run, index) => {
    if (typeof run === "string") return <XText key={index}>{run}</XText>
    if ("b" in run) {
      return (
        <strong key={index}>
          <Runs runs={run.b} />
        </strong>
      )
    }
    if ("i" in run) {
      return (
        <em key={index}>
          <Runs runs={run.i} />
        </em>
      )
    }
    return (
      <a key={index} href={run.a} target="_blank" rel="noopener noreferrer">
        <Runs runs={run.r} />
      </a>
    )
  })
}
