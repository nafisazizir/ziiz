import type { Metadata } from "next"

import { GRANOLA } from "@/lib/themes/granola"
import { BrandPage } from "@/components/brand-page"

export const metadata: Metadata = {
  title: "Granola palette",
  description:
    "Granola's oats palette measured, then regenerated on the ziiz ramp model.",
}

export default function GranolaPlaygroundPage() {
  return <BrandPage brand={GRANOLA} />
}
