import type { Metadata } from "next"

import { LIBRARY, paletteCss } from "@/lib/palettes"
import { SITE_SELECTORS } from "@/lib/site-palette"
import { ClaudeShell } from "@/components/claude-ai/shell"

export const metadata: Metadata = {
  title: { default: "Claude clone", template: "%s · Claude clone" },
  description:
    "A prototype of claude.ai built from stock ziiz components on the Graphite palette.",
}

const graphite = LIBRARY.find((entry) => entry.id === "graphite")!

// Graphite worn for the whole route. It sits after the head's worn-palette
// style with the same selectors, so it wins while this layout is mounted,
// and portalled menus and dialogs pick it up too.
const css = paletteCss(graphite.palettes, SITE_SELECTORS)

export default function ClaudeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <ClaudeShell>{children}</ClaudeShell>
    </>
  )
}
