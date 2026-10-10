import { createMarkdownRenderer } from "fumadocs-core/content/md"
import { remarkGfm } from "fumadocs-core/mdx-plugins/remark-gfm"

import { cn } from "@/lib/utils"

const { MarkdownServer } = createMarkdownRenderer({
  remarkPlugins: [remarkGfm],
})

// Agent messages are short and dense, so the prose layer runs a step down:
// Copy 14 with a 12px flow, headings capped at Heading 16.
const headings = {
  h1: (p: React.ComponentProps<"h3">) => (
    <h3 {...p} className="text-heading-16" />
  ),
  h2: (p: React.ComponentProps<"h3">) => (
    <h3 {...p} className="text-heading-16" />
  ),
  h3: (p: React.ComponentProps<"h4">) => (
    <h4 {...p} className="text-heading-14" />
  ),
  h4: (p: React.ComponentProps<"h5">) => (
    <h5 {...p} className="text-heading-14" />
  ),
  a: (p: React.ComponentProps<"a">) => (
    <a {...p} target="_blank" rel="noreferrer" />
  ),
}

export function Prose({
  children,
  className,
}: {
  children: string
  className?: string
}) {
  return (
    <div
      className={cn(
        "typeset text-copy-14 text-gray-1000 [--typeset-flow:0.75rem] [--typeset-section:1.5rem]",
        className
      )}
    >
      <MarkdownServer components={headings}>{children}</MarkdownServer>
    </div>
  )
}
