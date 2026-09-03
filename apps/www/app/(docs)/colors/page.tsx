import type { Metadata } from "next"

import { ColorScales, ColorUsageList } from "@/components/color-scales"
import { TokenMapping } from "@/components/token-mapping"

export const metadata: Metadata = {
  title: "Colors",
  description: "Learn how to work with our color system.",
}

export default function Page() {
  return (
    <>
      <h1 className="scroll-m-24 text-heading-40 tracking-tighter">Colors</h1>
      <p className="mt-4 text-gray-900">
        Learn how to work with our color system.
      </p>

      <h2 className="mt-12 scroll-m-24 text-heading-24">Scales</h2>
      <p className="mt-3 text-gray-900">
        There are 10 color scales in the system: backgrounds, gray, gray alpha,
        blue, red, amber, green, teal, purple, and pink. Values are defined in
        oklch, so wide-gamut color renders on supported browsers and displays.
        Every non-background scale has the same 10 steps with the same roles.
        The sections below describe each role once, and it applies to every
        scale. The swatches use gray as the representative ramp.
      </p>
      <p className="mt-3 text-gray-900">
        The scales are hand-tuned per step, not interpolated. Some steps
        deliberately reverse (Color 4 on the alpha scale is lighter than Color
        3), so treat every step as a named role, never a point on a gradient.
      </p>
      <div className="mt-6">
        <ColorScales />
      </div>

      <h2 className="mt-12 scroll-m-24 text-heading-24">Backgrounds</h2>
      <p className="mt-3 text-gray-900">
        There are two background colors for pages and UI components. In most
        instances, you should use Background 1, especially when color is being
        placed on top of the background. Background 2 should be used sparingly
        when a subtle background differentiation is needed.
      </p>
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

      <h2 className="mt-12 scroll-m-24 text-heading-24">
        Colors 1–3: Component backgrounds
      </h2>
      <p className="mt-3 text-gray-900">
        The first three colors are component backgrounds, on every scale: Color
        1 at rest, Color 2 on hover, Color 3 when pressed or selected. In
        practice there are two ladders.
      </p>
      <p className="mt-3 text-gray-900">
        Filled components, like secondary buttons and badges, step 1 → 2 → 3 as
        written.
      </p>
      <p className="mt-3 text-gray-900">
        If a component&rsquo;s default background is Background 1 — the page
        surface showing through, like ghost buttons, menu items and tab chips —
        the ladder shifts down a rung: Color 1 is the hover background and Color
        2 the active background. Components that rest transparent take that
        shift on the alpha scale, so the state reads over any surface.
      </p>
      <ColorUsageList
        items={[
          { token: "gray-100", name: "Color 1", usage: "Default background" },
          { token: "gray-200", name: "Color 2", usage: "Hover background" },
          { token: "gray-300", name: "Color 3", usage: "Active background" },
        ]}
      />

      <h2 className="mt-12 scroll-m-24 text-heading-24">Colors 4–6: Borders</h2>
      <p className="mt-3 text-gray-900">
        These three colors are designed for UI component borders.
      </p>
      <p className="mt-3 text-gray-900">
        In practice, borders default to the alpha scale, alpha hairlines hold up
        over any surface.
      </p>
      <ColorUsageList
        items={[
          { token: "gray-400", name: "Color 4", usage: "Default border" },
          { token: "gray-500", name: "Color 5", usage: "Hover border" },
          { token: "gray-600", name: "Color 6", usage: "Active border" },
        ]}
      />

      <h2 className="mt-12 scroll-m-24 text-heading-24">
        Colors 7–8: High contrast backgrounds
      </h2>
      <p className="mt-3 text-gray-900">
        These two colors are designed for high contrast UI component
        backgrounds.
      </p>
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

      <h2 className="mt-12 scroll-m-24 text-heading-24">
        Colors 9–10: Text and icons
      </h2>
      <p className="mt-3 text-gray-900">
        These two colors are designed for accessible text and icons.
      </p>
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

      <h2 className="mt-12 scroll-m-24 text-heading-24">shadcn mapping</h2>
      <p className="mt-3 text-gray-900">
        The shadcn semantic slots are pure{" "}
        <code className="rounded-sm bg-gray-100 px-1 py-0.5 text-copy-13-mono">
          var(--ds-*)
        </code>{" "}
        aliases onto the ramp, never values.
      </p>
      <TokenMapping />
    </>
  )
}
