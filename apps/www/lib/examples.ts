import { examples } from "@/components/examples"

/** Every example name the docs can render, in registry build order. */
export const exampleNames = Object.keys(examples)

/** The live component behind `<ComponentPreview name="..." />`, or null. */
export function getExample(name: string) {
  return examples[name] ?? null
}

/** Where the example's source sits, relative to the project root. */
export function getExampleSource(name: string) {
  return `components/examples/${name}.tsx`
}

/**
 * Examples that take the whole viewport, like a sidebar. The docs render
 * these through an iframe onto `/view/<name>`, where `fixed` and `h-svh`
 * mean the frame rather than the docs page.
 */
export const blockNames = exampleNames.filter((name) =>
  name.startsWith("sidebar-")
)
