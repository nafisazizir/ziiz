import * as React from "react"
import Link from "next/link"

import type { Run } from "@/components/business-x/blog"
import { XLogo } from "@/components/business-x/x-logo"

// Copy from the site keeps ">x<" where it draws its logo inline. Every string
// passes through here so the mark lands as a glyph-sized SVG on the baseline,
// the way the hero's title does. A newline in the copy is a line break.
export function XText({ children }: { children: string }) {
  const parts = children.split(">x<")
  return parts.map((part, index) => (
    <React.Fragment key={index}>
      {index > 0 && <XLogo className="inline size-[0.85em] align-[-0.08em]" />}
      {part.split("\n").map((line, at) => (
        <React.Fragment key={at}>
          {at > 0 && <br />}
          {line}
        </React.Fragment>
      ))}
    </React.Fragment>
  ))
}

// Inline copy: text, bold, italic, superscript, code and links, nested. A
// link into the clone or to a heading on the page stays in the tab; one that
// leaves it opens a new tab.
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
    if ("sup" in run) {
      return (
        <sup key={index}>
          <Runs runs={run.sup} />
        </sup>
      )
    }
    if ("code" in run) return <code key={index}>{run.code}</code>
    if (run.a.startsWith("/")) {
      return (
        <Link key={index} href={run.a}>
          <Runs runs={run.r} />
        </Link>
      )
    }
    if (run.a.startsWith("#")) {
      return (
        <a key={index} href={run.a}>
          <Runs runs={run.r} />
        </a>
      )
    }
    return (
      <a key={index} href={run.a} target="_blank" rel="noopener noreferrer">
        <Runs runs={run.r} />
      </a>
    )
  })
}
