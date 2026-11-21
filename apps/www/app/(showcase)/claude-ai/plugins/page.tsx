import type { Metadata } from "next"

import { Plugins } from "@/components/claude-ai/library"

export const metadata: Metadata = { title: "Plugins" }

export default function PluginsPage() {
  return <Plugins />
}
