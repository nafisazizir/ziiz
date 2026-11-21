import type { Metadata } from "next"

import { Artifacts } from "@/components/claude-ai/library"

export const metadata: Metadata = { title: "Artifacts" }

export default function ArtifactsPage() {
  return <Artifacts />
}
