import type { Metadata } from "next"

import { TypeVariantList } from "@/components/type-scale"

export const metadata: Metadata = {
  title: "Typography",
  description: "Rules of typesetting throughout the system.",
}

export default function Page() {
  return (
    <>
      <h1 className="text-heading-40 scroll-m-24 tracking-tighter">
        Typography
      </h1>
      <p className="mt-4 text-gray-900">
        Rules of typesetting throughout the system.
      </p>

      <h2 className="text-heading-24 mt-12 scroll-m-24">
        Usage
      </h2>
      <p className="mt-3 text-gray-900">
        Our typography styles can be consumed as Tailwind classes. The classes
        below pre-set a combination of{" "}
        <code className="text-copy-13-mono rounded-sm bg-gray-100 px-1 py-0.5">
          font-size
        </code>
        ,{" "}
        <code className="text-copy-13-mono rounded-sm bg-gray-100 px-1 py-0.5">
          line-height
        </code>
        ,{" "}
        <code className="text-copy-13-mono rounded-sm bg-gray-100 px-1 py-0.5">
          letter-spacing
        </code>
        , and{" "}
        <code className="text-copy-13-mono rounded-sm bg-gray-100 px-1 py-0.5">
          font-weight
        </code>{" "}
        for you.
      </p>
      <p className="text-copy-16 mt-3 text-gray-900">
        To make use of the <strong>Subtle</strong> and <strong>Strong</strong>{" "}
        modifiers, all you have to do is use the{" "}
        <code className="text-copy-13-mono rounded-sm bg-gray-100 px-1 py-0.5">
          &lt;strong&gt;
        </code>{" "}
        element nested as the descendant of a given typography class:
      </p>
      <pre className="mt-4 overflow-x-auto rounded-lg border bg-background-200 p-4">
        <code className="text-copy-13-mono">
          {`<p className="text-copy-16">\n  Copy 16 <strong>with Strong</strong>\n</p>`}
        </code>
      </pre>

      <h2 className="text-heading-24 mt-12 scroll-m-24">
        Headings
      </h2>
      <p className="mt-3 text-gray-900">Used to introduce pages or sections.</p>
      <TypeVariantList
        items={[
          { className: "text-heading-72", name: "Heading 72" },
          { className: "text-heading-64", name: "Heading 64" },
          { className: "text-heading-56", name: "Heading 56" },
          { className: "text-heading-48", name: "Heading 48" },
          { className: "text-heading-40", name: "Heading 40" },
          {
            className: "text-heading-32",
            name: "Heading 32",
            modifier: "Subtle",
          },
          {
            className: "text-heading-24",
            name: "Heading 24",
            modifier: "Subtle",
          },
          {
            className: "text-heading-20",
            name: "Heading 20",
            modifier: "Subtle",
          },
          {
            className: "text-heading-16",
            name: "Heading 16",
            modifier: "Subtle",
          },
          { className: "text-heading-14", name: "Heading 14" },
        ]}
      />

      <h2 className="text-heading-24 mt-12 scroll-m-24">
        Buttons
      </h2>
      <p className="mt-3 text-gray-900">
        Only to be used within components that render buttons.
      </p>
      <TypeVariantList
        items={[
          {
            className: "text-button-16",
            name: "Button 16",
            usage: "Largest button.",
          },
          {
            className: "text-button-14",
            name: "Button 14",
            usage: "Default button.",
          },
          {
            className: "text-button-12",
            name: "Button 12",
            usage:
              "Only used when a tiny button is placed inside an input field.",
          },
        ]}
      />

      <h2 className="text-heading-24 mt-12 scroll-m-24">
        Label
      </h2>
      <p className="mt-3 text-gray-900">
        Designed for single-lines, and given ample line-height for highlighting
        &amp; marrying up with icons.
      </p>
      <TypeVariantList
        items={[
          { className: "text-label-20", name: "Label 20" },
          { className: "text-label-18", name: "Label 18" },
          {
            className: "text-label-16",
            name: "Label 16",
            modifier: "Strong",
            usage: "Used in titles to help differentiate from regular.",
          },
          { className: "text-label-16-mono", name: "Label 16 Mono" },
          {
            className: "text-label-14",
            name: "Label 14",
            modifier: "Strong",
            usage: "Most common text style of all. Used in many menus.",
          },
          {
            className: "text-label-14-mono",
            name: "Label 14 Mono",
            usage: "Largest form of mono, to pair with larger (>14) text.",
          },
          {
            className: "text-label-13",
            name: "Label 13",
            usage:
              "Used as a secondary line next to other labels. Tabular is used when conveying numbers for consistent spacing.",
          },
          {
            className: "text-label-13-mono",
            name: "Label 13 Mono",
            usage:
              "Used to pair with Label 14, as the smaller mono size looks better in that pairing.",
          },
          {
            className: "text-label-12",
            name: "Label 12",
            usage:
              "Used for tertiary level text in busy views, like Comments, Show More and the capitals in Calendars.",
          },
          { className: "text-label-12-mono", name: "Label 12 Mono" },
        ]}
      />

      <h2 className="text-heading-24 mt-12 scroll-m-24">
        Copy
      </h2>
      <p className="mt-3 text-gray-900">
        Designed for multiple lines of text, having a higher line height than
        Label.
      </p>
      <TypeVariantList
        items={[
          {
            className: "text-copy-24",
            name: "Copy 24",
            modifier: "Strong",
            usage: "For hero areas on marketing pages.",
          },
          {
            className: "text-copy-20",
            name: "Copy 20",
            modifier: "Strong",
            usage: "For hero areas on marketing pages.",
          },
          {
            className: "text-copy-18",
            name: "Copy 18",
            modifier: "Strong",
            usage: "Mainly for marketing, big quotes.",
          },
          {
            className: "text-copy-16",
            name: "Copy 16",
            modifier: "Strong",
            usage:
              "Used in simpler, larger views like Modals where text can breathe.",
          },
          {
            className: "text-copy-14",
            name: "Copy 14",
            modifier: "Strong",
            usage: "Most commonly used text style.",
          },
          { className: "text-copy-14-mono", name: "Copy 14 Mono" },
          {
            className: "text-copy-13",
            name: "Copy 13",
            usage: "For secondary text and views where space is a premium.",
          },
          {
            className: "text-copy-13-mono",
            name: "Copy 13 Mono",
            usage: "Used for inline code mentions.",
          },
        ]}
      />
    </>
  )
}
