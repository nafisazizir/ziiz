import type { Run } from "@/components/business-x/blog"

// The article help.x.com and money.x.com share: one CMS, one run of blocks.
// Lists, table cells, notes, tab panels and accordion answers hold blocks of
// their own. Media is dimensions only; the clone draws grey panels at the
// right ratio.
export type DocBlock =
  | { type: "heading"; level: 2 | 3 | 4; id?: string; runs: Run[] }
  // lead: the medium-weight line that opens a tab panel.
  | { type: "p"; runs: Run[]; lead?: boolean }
  | { type: "list"; ordered: boolean; start?: number; items: DocBlock[][] }
  // A grey panel of steps, one tab per device. A panel with no device
  // choice has one unlabelled tab.
  | {
      type: "tabs"
      id?: string
      title: Run[]
      tabs: { label: string; blocks: DocBlock[] }[]
    }
  | { type: "note"; title?: Run[]; blocks: DocBlock[] }
  | {
      type: "image"
      w: number
      h: number
      alt: string
      maxHeight?: number
      caption?: Run[]
    }
  | { type: "video"; label?: string }
  | { type: "table"; id?: string; rows: DocCell[][] }
  | {
      type: "ctas"
      items: { label: string; href: string; primary?: boolean }[]
    }
  | {
      type: "accordion"
      items: { id?: string; q: Run[]; blocks: DocBlock[] }[]
    }
  | { type: "post" }
  | { type: "code"; language?: string; code: string }
  | {
      type: "cards"
      id?: string
      items: { title: Run[]; body?: Run[]; href?: string }[]
    }
  | { type: "follow"; items: { name: string; handle: string; href: string }[] }

export type DocCell = {
  blocks: DocBlock[]
  header?: boolean
  colSpan?: number
  rowSpan?: number
}

export type DocHeading = { id: string; title: string; depth: number }

export type Doc = {
  slug: string
  title: string
  description: string
  crumbs: { title: string; href?: string }[]
  toc: DocHeading[]
  blocks: DocBlock[]
}

// Plain text of a run, for a label or a key.
export function runText(runs: Run[]): string {
  return runs
    .map((run) =>
      typeof run === "string"
        ? run
        : "b" in run
          ? runText(run.b)
          : "i" in run
            ? runText(run.i)
            : "sup" in run
              ? runText(run.sup)
              : "code" in run
                ? run.code
                : runText(run.r)
    )
    .join("")
}
