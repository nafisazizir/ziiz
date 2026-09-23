import type { Metadata } from "next"

import { ButtonShapePlayground } from "@/components/button-shape-playground"

export const metadata: Metadata = {
  title: "Button shape",
  description:
    "Every component that renders Button, with shape default and rounded side by side.",
}

export default function ButtonShapePage() {
  return (
    <div className="mx-auto w-full max-w-6xl py-10">
      <header className="mb-4 flex flex-col gap-2">
        <p className="text-label-12 tracking-wider text-gray-900 uppercase">
          Components · Button
        </p>
        <h1 className="text-heading-32 text-gray-1000">Button shape</h1>
        <p className="max-w-prose text-copy-16 text-gray-900">
          Every component that renders Button, with the default shape on the
          left and rounded on the right.
        </p>
      </header>
      <ButtonShapePlayground />
    </div>
  )
}
