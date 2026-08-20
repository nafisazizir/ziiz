import type { Metadata } from "next"

import { ColorScales, ColorUsageList } from "@/components/color-scales"
import {
  DocsHeading,
  DocsPageHeader,
  DocsParagraph,
  InlineCode,
} from "@/components/docs-prose"
import { TokenMapping } from "@/components/token-mapping"

const page = {
  title: "Colors",
  description: "Learn how to work with our color system.",
}

export const metadata: Metadata = page

export default function Page() {
  return (
    <>
      <DocsPageHeader {...page} />

      <DocsHeading>Scales</DocsHeading>
      <DocsParagraph>
        There are 10 color scales in the system: backgrounds, gray, gray alpha,
        blue, red, amber, green, teal, purple, and pink. Values are defined in
        oklch, so wide-gamut color renders on supported browsers and displays.
        Every non-background scale has the same 10 steps with the same roles.
        The sections below describe each role once, and it applies to every
        scale. The swatches use gray as the representative ramp.
      </DocsParagraph>
      <DocsParagraph>
        The scales are hand-tuned per step, not interpolated. Some steps
        deliberately reverse (Color 4 on the alpha scale is lighter than Color
        3), so treat every step as a named role, never a point on a gradient.
      </DocsParagraph>
      <div className="mt-6">
        <ColorScales />
      </div>

      <DocsHeading>Backgrounds</DocsHeading>
      <DocsParagraph>
        There are two background colors for pages and UI components. In most
        instances, you should use Background 1, especially when color is being
        placed on top of the background. Background 2 should be used sparingly
        when a subtle background differentiation is needed.
      </DocsParagraph>
      <ColorUsageList
        items={[
          {
            token: "background-100",
            name: "Background 1",
            usage: "Default element background",
          },
          {
            token: "background-200",
            name: "Background 2",
            usage: "Secondary background",
          },
        ]}
      />

      <DocsHeading>Colors 1–3: Component backgrounds</DocsHeading>
      <DocsParagraph>
        The first three colors are component backgrounds, on every scale: Color
        1 at rest, Color 2 on hover, Color 3 when pressed or selected. In
        practice there are two ladders.
      </DocsParagraph>
      <DocsParagraph>
        Filled components, like secondary buttons and badges, step 1 → 2 → 3 as
        written.
      </DocsParagraph>
      <DocsParagraph>
        Components that rest transparent, like ghost buttons and menu items, use
        the alpha scale instead, hovering to alpha Color 1 and pressing to alpha
        Color 3, so the state reads over any surface.
      </DocsParagraph>
      <ColorUsageList
        items={[
          { token: "gray-100", name: "Color 1", usage: "Default background" },
          { token: "gray-200", name: "Color 2", usage: "Hover background" },
          { token: "gray-300", name: "Color 3", usage: "Active background" },
        ]}
      />

      <DocsHeading>Colors 4–6: Borders</DocsHeading>
      <DocsParagraph>
        These three colors are designed for UI component borders.
      </DocsParagraph>
      <DocsParagraph>
        In practice, borders default to the alpha scale, alpha hairlines hold up
        over any surface.
      </DocsParagraph>
      <ColorUsageList
        items={[
          { token: "gray-400", name: "Color 4", usage: "Default border" },
          { token: "gray-500", name: "Color 5", usage: "Hover border" },
          { token: "gray-600", name: "Color 6", usage: "Active border" },
        ]}
      />

      <DocsHeading>Colors 7–8: High contrast backgrounds</DocsHeading>
      <DocsParagraph>
        These two colors are designed for high contrast UI component
        backgrounds.
      </DocsParagraph>
      <ColorUsageList
        items={[
          {
            token: "gray-700",
            name: "Color 7",
            usage: "High contrast background",
          },
          {
            token: "gray-800",
            name: "Color 8",
            usage: "Hover high contrast background",
          },
        ]}
      />

      <DocsHeading>Colors 9–10: Text and icons</DocsHeading>
      <DocsParagraph>
        These two colors are designed for accessible text and icons.
      </DocsParagraph>
      <ColorUsageList
        items={[
          {
            token: "gray-900",
            name: "Color 9",
            usage: "Secondary text and icons",
          },
          {
            token: "gray-1000",
            name: "Color 10",
            usage: "Primary text and icons",
          },
        ]}
      />

      <DocsHeading>shadcn mapping</DocsHeading>
      <DocsParagraph>
        The shadcn semantic slots are pure <InlineCode>var(--ds-*)</InlineCode>{" "}
        aliases onto the ramp, never values.
      </DocsParagraph>
      <TokenMapping />
    </>
  )
}
