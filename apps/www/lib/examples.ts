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
