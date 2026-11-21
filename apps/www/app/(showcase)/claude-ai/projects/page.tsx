import type { Metadata } from "next"

import { Projects } from "@/components/claude-ai/library"

export const metadata: Metadata = { title: "Projects" }

export default function ProjectsPage() {
  return <Projects />
}
