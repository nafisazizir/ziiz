import * as React from "react"
import type { MDXComponents } from "mdx/types"

import { Callout } from "@/components/docs/callout"
import { CodeBlock } from "@/components/docs/code-block"
import { CodeTabs } from "@/components/docs/code-tabs"
import { ComponentPreview } from "@/components/docs/component-preview"
import { ComponentSource } from "@/components/docs/component-source"
import { Step, Steps } from "@/components/docs/steps"
import { RegistrySource } from "@/components/mdx/component-source"
import { Button } from "@/components/ui/button"
import { Kbd, KbdGroup } from "@/components/ui/kbd"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Behavior only. Typography is the prose layer's job (theme.css), so nothing
// here sets a type role on a markdown element.

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

// fumadocs' rehype-code forwards the fence meta (`title="file.tsx"`) and an
// `icon` SVG string as props on the pre. The title becomes the block's
// caption; the icon is dropped.
function Pre({
  title,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  icon,
  ...props
}: React.ComponentPropsWithoutRef<"pre"> & { icon?: string }) {
  return (
    <CodeBlock title={title}>
      <pre
        {...props}
        role="region"
        tabIndex={0}
        aria-label={props["aria-label"] ?? "Scrollable code block"}
      />
    </CodeBlock>
  )
}

const components = {
  h1: createHeading("h1"),
  h2: createHeading("h2"),
  h3: createHeading("h3"),
  h4: createHeading("h4"),
  h5: createHeading("h5"),
  h6: createHeading("h6"),
  pre: Pre,
  table: Table,
  // Doc primitives (components/docs, published through the registry).
  Callout,
  CodeBlock,
  CodeTabs,
  ComponentPreview,
  ComponentSource,
  Steps,
  Step,
  // App-side resolver for ComponentSource.
  RegistrySource,
  // ui components MDX pages reach for directly.
  Button,
  Kbd,
  KbdGroup,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} satisfies MDXComponents

export function getMDXComponents(overrides?: MDXComponents): MDXComponents {
  return { ...components, ...overrides }
}

export function useMDXComponents(components?: MDXComponents): MDXComponents {
  return getMDXComponents(components)
}
