import { ziizShikiOptions } from "@nafisazizir/ziiz/shiki"
import { bundledLanguages, codeToHtml } from "shiki"

type Op = " " | "-" | "+"

// LCS over lines. Hunks are a screen at most, so the table stays small.
export function lineDiff(oldText: string | null, newText: string) {
  const a = oldText == null ? [] : oldText.split("\n")
  const b = newText.split("\n")
  const dp = Array.from({ length: a.length + 1 }, () =>
    new Array<number>(b.length + 1).fill(0)
  )
  for (let i = a.length - 1; i >= 0; i--)
    for (let j = b.length - 1; j >= 0; j--)
      dp[i][j] =
        a[i] === b[j]
          ? dp[i + 1][j + 1] + 1
          : Math.max(dp[i + 1][j], dp[i][j + 1])
  const out: { op: Op; text: string }[] = []
  let i = 0
  let j = 0
  while (i < a.length || j < b.length) {
    if (i < a.length && j < b.length && a[i] === b[j]) {
      out.push({ op: " ", text: a[i++] })
      j++
    } else if (j < b.length && (i >= a.length || dp[i][j + 1] >= dp[i + 1][j]))
      out.push({ op: "+", text: b[j++] })
    else out.push({ op: "-", text: a[i++] })
  }
  return out
}

const ALIASES: Record<string, string> = {
  mjs: "javascript",
  cjs: "javascript",
  mdx: "mdx",
  md: "markdown",
  yml: "yaml",
}

function language(path: string) {
  const ext = path.split(".").pop()?.toLowerCase() ?? ""
  const lang = ALIASES[ext] ?? ext
  return lang in bundledLanguages ? lang : "text"
}

// Shiki reads the clock, which a prerender may not, so the HTML is cached.
async function highlight(
  code: string,
  lang: string,
  ops: string[],
  numbers: number[]
) {
  "use cache"
  return codeToHtml(code, {
    ...ziizShikiOptions,
    lang,
    transformers: [
      {
        line(node, n) {
          node.properties["data-op"] = ops[n - 1]
          node.properties["data-n"] = numbers[n - 1]
        },
      },
    ],
  })
}

// One hunk, highlighted as a single block so tokens span lines, then each
// line is tagged with its op and number for the gutter and tint.
export async function DiffHunk({
  path,
  oldText,
  newText,
  line = 1,
}: {
  path: string
  oldText: string | null
  newText: string
  line?: number
}) {
  const ops = lineDiff(oldText, newText)
  let oldN = line
  let newN = line
  const numbers = ops.map(({ op }) =>
    op === "-" ? oldN++ : op === "+" ? newN++ : (oldN++, newN++)
  )
  const html = await highlight(
    ops.map((o) => o.text).join("\n"),
    language(path),
    ops.map((o) => o.op.trim() || "="),
    numbers
  )
  return (
    <div
      className="overflow-x-auto text-copy-13-mono [&_.line]:inline-block [&_.line]:min-w-full [&_.line]:pe-4 [&_.line]:before:inline-block [&_.line]:before:w-14 [&_.line]:before:pe-4 [&_.line]:before:text-end [&_.line]:before:text-gray-700 [&_.line]:before:content-[attr(data-n)] [&_.line[data-op='+']]:bg-green-100 [&_.line[data-op='+']]:before:text-green-900 [&_.line[data-op='-']]:bg-red-100 [&_.line[data-op='-']]:before:text-red-900 [&_pre]:bg-transparent! [&_pre]:py-2"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

export function diffStats(
  hunks: { oldText: string | null; newText: string }[]
) {
  let add = 0
  let del = 0
  for (const h of hunks)
    for (const { op } of lineDiff(h.oldText, h.newText)) {
      if (op === "+") add++
      if (op === "-") del++
    }
  return { add, del }
}
