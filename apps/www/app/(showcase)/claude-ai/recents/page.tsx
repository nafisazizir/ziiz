import type { Metadata } from "next"

import { Recents } from "@/components/claude-ai/library"

export const metadata: Metadata = { title: "Chats" }

export default function RecentsPage() {
  return <Recents />
}
