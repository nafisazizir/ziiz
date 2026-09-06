import fs from "node:fs/promises"
import path from "node:path"
import { ziizShikiOptions } from "@ziiz/theme/shiki"
import { codeToHtml } from "shiki"

import { cn } from "@/lib/utils"
import { CodeBlock } from "@/components/docs/code-block"
import { CodeCollapsible } from "@/components/docs/code-collapsible"

const COLLAPSE_AFTER_LINES = 12

// Highlights a source file and sets it as a code block. Server-only: reads
// `src` relative to the project root, or takes the source as `code`.
// Long files collapse behind an Expand control unless `collapsible` is off.
async function ComponentSource({
  code,
  src,
  title,
  language,
  collapsible = true,
  maxLines,
  className,
}: {
  code?: string
  src?: string
  title?: string
  language?: string
  collapsible?: boolean
  maxLines?: number
  className?: string
}) {
  let source = code

  if (!source && src) {
    source = await fs.readFile(path.join(process.cwd(), src), "utf8")
  }

  if (!source) return null

  source = source.trimEnd()

  if (maxLines) {
    source = source.split("\n").slice(0, maxLines).join("\n")
  }

  const lang =
    language ?? (title ?? src)?.split(".").pop()?.toLowerCase() ?? "tsx"

  const html = await codeToHtml(source, {
    ...ziizShikiOptions,
    lang,
  })

  const body = (
    <div
      data-slot="component-source"
      data-language={lang}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )

  // A block that fits the collapsed height anyway gets no control.
  if (!collapsible || source.split("\n").length <= COLLAPSE_AFTER_LINES) {
    return (
      <CodeBlock title={title} value={source} className={className}>
        {body}
      </CodeBlock>
    )
  }

  return (
    <CodeCollapsible className={cn("mt-(--typeset-flow,1.5rem)", className)}>
      <CodeBlock title={title} value={source}>
        {body}
      </CodeBlock>
    </CodeCollapsible>
  )
}

export { ComponentSource }
