import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { getMDXComponents } from "@/mdx-components"
import { source } from "@/lib/source"
import {
  DocsTocProvider,
  DocsTocRail,
  DocsTocRailSkeleton,
} from "@/components/docs-toc"
import { TextSkeleton } from "@/components/text-skeleton"
import { Skeleton } from "@/components/ui/skeleton"

export function getDocsMetadata(slug: string[]): Metadata {
  const page = source.getPage(slug)
  if (!page) return {}

  return {
    title: page.data.title,
    description: page.data.description,
  }
}

export function DocsPage({ slug }: { slug: string[] }) {
  const page = source.getPage(slug)
  if (!page) notFound()

  const Content = page.data.body

  return (
    <DocsTocProvider toc={page.data.toc}>
      <DocsFrame rail={<DocsTocRail />}>
        <h1>{page.data.title}</h1>
        <p>{page.data.description}</p>
        <Content components={getMDXComponents()} />
      </DocsFrame>
    </DocsTocProvider>
  )
}

// A component page before it streams in: the title, a one-line
// description, the first example (its frame, an empty stage and the
// three-row source teaser), Installation with its tabs and command, Usage
// with its two snippets. Every box is the real element, or the real
// element's size, so the page lands on top of it without moving.
export function DocsPageSkeleton() {
  return (
    <DocsFrame aria-hidden rail={<DocsTocRailSkeleton />}>
      <h1>
        <TextSkeleton lines={["w-1/3"]} />
      </h1>
      <p>
        <TextSkeleton lines={["w-2/3"]} className="max-md:hidden" />
        <TextSkeleton lines={["w-full", "w-1/2"]} className="md:hidden" />
      </p>
      <PreviewSkeleton />
      <h2>
        <TextSkeleton lines={["w-52"]} />
      </h2>
      <CodeTabsSkeleton />
      <h2>
        <TextSkeleton lines={["w-24"]} />
      </h2>
      <CodeSkeleton lines={["w-3/5"]} />
      <CodeSkeleton lines={["w-1/4"]} />
    </DocsFrame>
  )
}

// The article sits between the sidebar and the rail, so the two rails
// match and the prose stays centred. 784 less the lg padding is the same
// 720px measure a blog post uses. The toc is the rail alone, so it drops
// away with the rail on a narrow viewport.
function DocsFrame({
  rail,
  children,
  ...props
}: React.ComponentProps<"div"> & { rail: React.ReactNode }) {
  return (
    <div className="flex w-full items-start" {...props}>
      <article className="typeset mx-auto w-full max-w-196 px-1 py-10 lg:px-8 lg:pt-(--content-top)">
        {children}
      </article>
      {rail}
    </div>
  )
}

// ComponentPreview's frame: the stage at its minimum height, then the
// source teaser, three rows of code in the block's own padding.
function PreviewSkeleton() {
  return (
    <div
      data-not-typeset
      className="mt-(--typeset-flow) overflow-hidden rounded-lg border border-gray-alpha-400 bg-background-100"
    >
      <div className="min-h-72 p-10" />
      <div className="border-t border-gray-alpha-400 bg-background-200 p-(--code-block-pad) text-copy-13-mono">
        <TextSkeleton lines={["w-1/3", "w-1/2", "w-1/4"]} />
      </div>
    </div>
  )
}

// CodeTabs: the tab list with Command and Manual, then the command block,
// which takes the code block's flow margin the way the real one does.
function CodeTabsSkeleton() {
  return (
    <div className="mt-(--typeset-flow) flex flex-col">
      <div className="mb-2 inline-flex h-9 w-fit items-center rounded-lg border border-gray-alpha-400 p-[3px] text-button-14">
        <div className="flex h-full items-center px-2">
          <Skeleton className="h-[0.75em] w-17.5" />
        </div>
        <div className="flex h-full items-center px-2">
          <Skeleton className="h-[0.75em] w-12.5" />
        </div>
      </div>
      <div className="text-copy-14">
        <CodeSkeleton lines={["w-2/5"]} />
      </div>
    </div>
  )
}

// A code block: the docs' figure and pre, so the chrome, padding and
// 18px rows come from the stylesheet.
function CodeSkeleton({ lines }: { lines: string[] }) {
  return (
    <figure data-slot="code-block">
      <pre>
        <TextSkeleton lines={lines} />
      </pre>
    </figure>
  )
}
