import type { Metadata } from "next"

import { HelpFrame } from "@/components/business-x/frame"
import {
  HelpCategories,
  HelpHero,
  HelpResources,
} from "@/components/help-x/home"

export const metadata: Metadata = {
  title: "X Help Center",
  description:
    "The home page of help.x.com rebuilt from ziiz components as shipped.",
}

// help.x.com/en: the greeting and the shelf, the five categories with their
// lead articles, and four resources.
export default function HelpXPage() {
  return (
    <HelpFrame>
      <HelpHero />
      <HelpCategories />
      <HelpResources />
    </HelpFrame>
  )
}
