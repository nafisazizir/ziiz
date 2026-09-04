import type { Metadata } from "next"

import { DocsPage } from "@/components/docs-page"
import { MaterialList } from "@/components/material-scale"

const title = "Materials"
const description =
  "Elevation presets combining background, border, shadow, and radius."

export const metadata: Metadata = { title, description }

export default function Page() {
  return (
    <DocsPage title={title} description={description}>
      <h2>Surface</h2>
      <p>
        Four levels of elevation for elements that sit in the page. Radius steps
        up with elevation.
      </p>
      <p>
        Components ship flat: card, sidebar and every control draw a plain
        hairline and use no Surface material. These tiers are for application
        surfaces that need a lift the components do not provide.
      </p>
      <MaterialList
        items={[
          {
            className: "material-base",
            name: "Base",
            radius: "rounded-md",
            usage:
              "The resting surface: hairline ring, no shadow. Flush containers and grouped lists.",
          },
          {
            className: "material-small",
            name: "Small",
            radius: "rounded-md",
            usage:
              "The lightest lift, for tiles and wells that need to read as separate from the page.",
          },
          {
            className: "material-medium",
            name: "Medium",
            radius: "rounded-xl",
            usage: "Raised surfaces: panels and pinned toolbars.",
          },
          {
            className: "material-large",
            name: "Large",
            radius: "rounded-xl",
            usage: "The most elevated on-page surface.",
          },
        ]}
      />

      <h2>Floating</h2>
      <p>
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
              "The lightest floating material. Chart tooltips sit on it; the tooltip component itself is an inverted bubble with no material.",
          },
          {
            className: "material-menu",
            name: "Menu",
            radius: "rounded-md",
            usage:
              "Dropdown and context menus, selects, comboboxes, popovers, hover cards.",
          },
          {
            className: "material-modal",
            name: "Modal",
            radius: "rounded-xl",
            usage:
              "Dialogs, drawers, sheets, toasts and command menus, floating above an overlay.",
          },
          {
            className: "material-fullscreen",
            name: "Fullscreen",
            radius: "rounded-xl",
            usage:
              "The highest elevation, reserved for fullscreen takeovers. No component uses it yet; sheets sit on Modal.",
          },
        ]}
      />

      <h2>Best practices</h2>

      <h3>When to use</h3>
      <ul>
        <li>
          Reach for a material instead of composing background, border, shadow,
          and radius by hand. The class encodes the elevation role, not just the
          look.
        </li>
        <li>
          Pick the type from where the element sits in the layered hierarchy:{" "}
          <code>base</code> and <code>small</code> for resting surfaces,{" "}
          <code>medium</code> and <code>large</code> for raised content,{" "}
          <code>tooltip</code> and <code>menu</code> for popovers,{" "}
          <code>modal</code> and <code>fullscreen</code> for takeovers.
        </li>
        <li>
          Never stack two materials on the same element. If a child needs more
          lift, it becomes its own material one tier up.
        </li>
      </ul>

      <h3>Behavior</h3>
      <ul>
        <li>
          Keep the elevation choice in step with the element&apos;s{" "}
          <code>z-index</code> band, so a <code>tooltip</code>-typed surface
          never renders visually beneath a <code>base</code> card.
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

      <h3>Accessibility</h3>
      <ul>
        <li>
          Materials are decorative chrome. Semantics live on the role-bearing
          element: <code>role=&quot;dialog&quot;</code> on a modal,{" "}
          <code>role=&quot;tooltip&quot;</code> on a tooltip, never on the
          class.
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
    </DocsPage>
  )
}
