import { cn } from "@/lib/utils"

// Placeholder lines for a run of text, measured by the type role in force
// where they render: each line is one line box (1lh), so n lines stand as
// tall as n lines of the real text, and the bar is the role's cap height,
// centred where the letters will sit. One width per line. Spans, with the
// Skeleton's look, because a p or a heading cannot hold a div.
export function TextSkeleton({
  lines,
  className,
}: {
  lines: string[]
  className?: string
}) {
  return lines.map((width, index) => (
    <span key={index} className={cn("flex h-[1lh] items-center", className)}>
      <span
        data-slot="skeleton"
        className={cn("h-[0.75em] animate-pulse rounded-md bg-gray-100", width)}
      />
    </span>
  ))
}

// The opening of an article, for a typeset column: two paragraphs, a
// section heading and two more. Real elements, so the prose layer's roles
// and rhythm place every line where the streamed text will land.
export function TypesetSkeleton() {
  return (
    <>
      <p>
        <TextSkeleton lines={["w-full", "w-full", "w-5/6"]} />
      </p>
      <p>
        <TextSkeleton lines={["w-full", "w-1/2"]} />
      </p>
      <h2>
        <TextSkeleton lines={["w-2/5"]} />
      </h2>
      <p>
        <TextSkeleton lines={["w-full", "w-full", "w-3/4"]} />
      </p>
      <p>
        <TextSkeleton lines={["w-full", "w-full", "w-2/3"]} />
      </p>
    </>
  )
}
