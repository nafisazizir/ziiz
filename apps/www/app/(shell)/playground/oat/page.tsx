import type { Metadata } from "next"

import { OAT } from "@/lib/themes/oat"
import { BrandPage } from "@/components/brand-page"

export const metadata: Metadata = {
  title: "Oat palette",
  description:
    "A milk chocolate brand on warm oat neutrals, designed on the ziiz ramp model.",
}

export default function OatPlaygroundPage() {
  return <BrandPage brand={OAT} />
}
