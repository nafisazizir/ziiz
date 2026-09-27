import type { Metadata } from "next"

import { TimelineFrame } from "@/components/art"
import { BlogHero } from "@/components/blog/blog-hero"
import { Separator } from "@/components/ui/separator"

import { InsetCheck } from "./inset-check"

export const metadata: Metadata = {
  title: "Inset check",
  description:
    "Every control and popup measures the distance from its edge to its text.",
}

export default function InsetPlaygroundPage() {
  return (
    <>
      <BlogHero
        title={
          <>
            {`Twelve pixels `}
            <br className="max-md:hidden" />
            {`from the edge`}
          </>
        }
        description={`Buttons, fields and menu items put their text 12px in from a 32px or taller box. Each specimen below measures that distance live, and a popup measures its first item against the control that opened it.`}
      >
        <TimelineFrame
          variant="wide"
          className="size-full text-gray-1000 [&_[data-part=badge]]:hidden"
        />
      </BlogHero>
      <Separator className="mt-10 lg:mt-0" />
      <InsetCheck />
    </>
  )
}
