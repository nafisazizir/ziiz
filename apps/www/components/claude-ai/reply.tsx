import * as React from "react"

import type { Block } from "./data"

/** Blocks as prose: `typeset` binds every element to a ziiz role. A reply
 *  reads at full ink, as claude.ai sets it, not typeset's article gray. */
export function Reply({ blocks }: { blocks: Block[] }) {
  return (
    <div className="typeset text-gray-1000">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "p":
            return <p key={i}>{block.text}</p>
          case "h3":
            return <h3 key={i}>{block.text}</h3>
          case "quote":
            return (
              <blockquote key={i}>
                <p>{block.text}</p>
              </blockquote>
            )
          case "ul":
            return (
              <ul key={i}>
                {block.items.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
            )
          case "ol":
            return (
              <ol key={i}>
                {block.items.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ol>
            )
          case "code":
            return (
              <pre key={i} data-lang={block.lang}>
                <code>{block.code}</code>
              </pre>
            )
        }
      })}
    </div>
  )
}

const length = (block: Block) =>
  block.type === "ul" || block.type === "ol"
    ? block.items.join("").length
    : block.type === "code"
      ? block.code.length
      : block.text.length

export const replyLength = (blocks: Block[]) =>
  blocks.reduce((n, b) => n + length(b), 0)

/** The first `chars` characters of a reply, for streaming it in. */
export function revealBlocks(blocks: Block[], chars: number): Block[] {
  const out: Block[] = []
  let left = chars
  for (const block of blocks) {
    if (left <= 0) break
    if (block.type === "ul" || block.type === "ol") {
      const items: string[] = []
      for (const item of block.items) {
        if (left <= 0) break
        items.push(item.slice(0, left))
        left -= item.length
      }
      out.push({ ...block, items })
    } else if (block.type === "code") {
      out.push({ ...block, code: block.code.slice(0, left) })
      left -= block.code.length
    } else {
      out.push({ ...block, text: block.text.slice(0, left) })
      left -= block.text.length
    }
  }
  return out
}
