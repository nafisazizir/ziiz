import type { Metadata } from "next"

import { Design } from "@/components/claude-ai/library"

export const metadata: Metadata = { title: "Design" }

export default function DesignPage() {
  return <Design />
}
