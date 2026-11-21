import type { Metadata } from "next"

import { BlogHero } from "@/components/blog/blog-hero"
import { Separator } from "@/components/ui/separator"
import { doubleStroke } from "@/lib/letters/double-stroke"

import { LetterPlayground } from "./letter-playground"

export const metadata: Metadata = {
  title: "Letters",
  description:
    "A letter, a mark. Explore and export SVG letterforms for personal projects.",
}

export default function LettersPage() {
  const initialGlyphs = Object.fromEntries(
    [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"].map((letter) => [
      letter,
      doubleStroke(letter),
    ])
  )
  return (
    <>
      <BlogHero
        title="A letter, a mark."
        description="Find a starting point for your next personal project. Explore the contrast of a thin line, the precision of Computer Modern, and the character of a blackboard letter. Pick a letter. Take the SVG."
      >
        <div className="flex size-full items-center justify-center text-gray-1000">
          {["A", "Z", "X"].map((letter) => (
            <svg
              key={letter}
              viewBox="0 0 1000 1000"
              fill="currentColor"
              className="h-4/5 w-1/3"
              aria-hidden="true"
            >
              <path d={doubleStroke(letter)} />
            </svg>
          ))}
        </div>
      </BlogHero>
      <Separator className="mt-10 lg:mt-0" />
      <LetterPlayground initialGlyphs={initialGlyphs} />
    </>
  )
}
