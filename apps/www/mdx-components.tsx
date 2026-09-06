import * as React from "react"
import type { MDXComponents } from "mdx/types"

import { CodeBlock } from "@/components/mdx/code-block"

function createHeading(Tag: "h1" | "h2" | "h3" | "h4" | "h5" | "h6") {
  return function Heading({
    id,
    children,
    ...props
  }: React.ComponentPropsWithoutRef<typeof Tag>) {
    return (
      <Tag id={id} {...props}>
        {children}
        {id ? (
          <a
            href={`#${id}`}
            aria-label={`Link to ${id.replaceAll("-", " ")}`}
            data-heading-anchor
          >
            <span aria-hidden>#</span>
          </a>
        ) : null}
      </Tag>
    )
  }
}

function Table(props: React.ComponentPropsWithoutRef<"table">) {
  return (
    <div
      className="typeset-scroll"
      role="region"
      tabIndex={0}
      aria-label="Scrollable table"
    >
      <table {...props} />
    </div>
  )
}

const components = {
  h1: createHeading("h1"),
  h2: createHeading("h2"),
  h3: createHeading("h3"),
  h4: createHeading("h4"),
  h5: createHeading("h5"),
  h6: createHeading("h6"),
  pre: CodeBlock,
  table: Table,
} satisfies MDXComponents

export function getMDXComponents(overrides?: MDXComponents): MDXComponents {
  return { ...components, ...overrides }
}

export function useMDXComponents(components?: MDXComponents): MDXComponents {
  return getMDXComponents(components)
}
