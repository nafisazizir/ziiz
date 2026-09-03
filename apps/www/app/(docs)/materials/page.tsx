import type { Metadata } from "next"

import { MaterialList } from "@/components/material-scale"

export const metadata: Metadata = {
  title: "Materials",
  description:
    "Elevation presets combining background, border, shadow, and radius.",
}

function InlineCode({ children }: { children: React.ReactNode }) {
  return (
    <code className="rounded-sm bg-gray-100 px-1 py-0.5 text-copy-13-mono">
      {children}
    </code>
  )
}

export default function Page() {
  return (
    <>
      <h1 className="scroll-m-24 text-heading-40 tracking-tighter">
        Materials
      </h1>
      <p className="mt-4 text-gray-900">
        Elevation presets combining background, border, shadow, and radius.
      </p>

      <h2 className="mt-12 scroll-m-24 text-heading-24">Surface</h2>
      <p className="mt-3 text-gray-900">
        Four levels of elevation for elements that sit in the page. Radius steps
        up with elevation.
      </p>
      <MaterialList
        items={[
          {
            className: "material-base",
            name: "Base",
            radius: "rounded-md",
            usage:
              "The resting surface: hairline border, no shadow. Inputs and flush containers.",
          },
          {
            className: "material-small",
            name: "Small",
            radius: "rounded-md",
            usage: "A subtle lift for small cards and wells at rest.",
          },
          {
            className: "material-medium",
            name: "Medium",
            radius: "rounded-xl",
            usage: "Raised surfaces: cards at rest or on hover.",
          },
          {
            className: "material-large",
            name: "Large",
            radius: "rounded-xl",
            usage: "The most elevated on-page surface.",
          },
        ]}
      />

      <h2 className="mt-12 scroll-m-24 text-heading-24">Floating</h2>
      <p className="mt-3 text-gray-900">
        Four levels of elevation for elements that float above the page, ordered
        from closest to furthest off the surface.
      </p>
      <MaterialList
        items={[
          {
            className: "material-tooltip",
            name: "Tooltip",
            radius: "rounded-md",
            usage:
              "The lightest floating material, and the only floating element that carries an arrow stem.",
          },
          {
            className: "material-menu",
            name: "Menu",
            radius: "rounded-md",
            usage: "Dropdown and context menus, selects, comboboxes.",
          },
          {
            className: "material-modal",
            name: "Modal",
            radius: "rounded-xl",
            usage: "Dialogs and command menus, floating above an overlay.",
          },
          {
            className: "material-fullscreen",
            name: "Fullscreen",
            radius: "rounded-xl",
            usage: "The highest elevation: sheets and fullscreen takeovers.",
          },
        ]}
      />

      <h2 className="mt-12 scroll-m-24 text-heading-24">Best practices</h2>

      <h3 className="mt-6 scroll-m-24 text-heading-16">When to use</h3>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-gray-900">
        <li>
          Reach for a material instead of composing background, border, shadow,
          and radius by hand. The class encodes the elevation role, not just
          the look.
        </li>
        <li>
          Pick the type from where the element sits in the layered hierarchy:{" "}
          <InlineCode>base</InlineCode> and <InlineCode>small</InlineCode> for
          resting surfaces, <InlineCode>medium</InlineCode> and{" "}
          <InlineCode>large</InlineCode> for raised content,{" "}
          <InlineCode>tooltip</InlineCode> and <InlineCode>menu</InlineCode>{" "}
          for popovers, <InlineCode>modal</InlineCode> and{" "}
          <InlineCode>fullscreen</InlineCode> for takeovers.
        </li>
        <li>
          Never stack two materials on the same element. If a child needs more
          lift, it becomes its own material one tier up.
        </li>
      </ul>

      <h3 className="mt-6 scroll-m-24 text-heading-16">Behavior</h3>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-gray-900">
        <li>
          Keep the elevation choice in step with the element&apos;s{" "}
          <InlineCode>z-index</InlineCode> band, so a{" "}
          <InlineCode>tooltip</InlineCode>-typed surface never renders visually
          beneath a <InlineCode>base</InlineCode> card.
        </li>
        <li>
          Favor the lowest tier that still reads as separated from its
          background; over-elevating is the most common source of visual noise.
        </li>
        <li>
          Don&apos;t override a material&apos;s shadow or radius inline. If a
          surface needs different chrome, it belongs to a different tier.
        </li>
      </ul>

      <h3 className="mt-6 scroll-m-24 text-heading-16">Accessibility</h3>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-gray-900">
        <li>
          Materials are decorative chrome. Semantics live on the role-bearing
          element: <InlineCode>role=&quot;dialog&quot;</InlineCode> on a modal,{" "}
          <InlineCode>role=&quot;tooltip&quot;</InlineCode> on a tooltip, never
          on the class.
        </li>
        <li>
          Elevation is never the only signal: pair floating surfaces with focus
          management, and keep the focus ring on interactive children inside.
        </li>
        <li>
          Check both themes. Dark shadows use higher opacities than light, yet
          still barely register against a black page; in dark, separation comes
          from the hairline ring, so verify it reads wherever the material
          lands.
        </li>
      </ul>
    </>
  )
}
