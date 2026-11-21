import type { Metadata } from "next"

import { Scheduled } from "@/components/claude-ai/library"

export const metadata: Metadata = { title: "Scheduled" }

export default function ScheduledPage() {
  return <Scheduled />
}
