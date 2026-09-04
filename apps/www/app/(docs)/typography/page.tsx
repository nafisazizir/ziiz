import type { Metadata } from "next"

import { DocsPage } from "@/components/docs-page"
import { TypeVariantList } from "@/components/type-scale"

const title = "Typography"
const description = "Rules of typesetting throughout the system."

export const metadata: Metadata = { title, description }

export default function Page() {
  return (
    <DocsPage title={title} description={description}>
      <h2>Usage</h2>
      <p>
        Our typography styles can be consumed as Tailwind classes. The classes
        below pre-set a combination of <code>font-size</code>,{" "}
        <code>line-height</code>, <code>letter-spacing</code>, and{" "}
        <code>font-weight</code> for you.
      </p>
      <p>
        To make use of the <strong>Subtle</strong> and <strong>Strong</strong>{" "}
        modifiers, all you have to do is use the <code>&lt;strong&gt;</code>{" "}
        element nested as the descendant of a given typography class:
      </p>
      <pre>
        <code>
          {`<p className="text-copy-16">\n  Copy 16 <strong>with Strong</strong>\n</p>`}
        </code>
      </pre>

      <h2>Prose</h2>
      <p>
        Long-form content — docs bodies, blog articles, rendered markdown — is
        typeset as a whole rather than element by element. Add{" "}
        <code>typeset</code> to the container and every heading, paragraph,
        list, link, code span and table inside it binds to a type role with the
        rhythm set here. Headings map one step below the page title:{" "}
        <code>h1</code> to Heading 32, <code>h2</code> to Heading 24,{" "}
        <code>h3</code> to Heading 20, <code>h4</code> to Heading 16.
      </p>
      <p>
        Every rule is scoped with <code>:where()</code>, so a utility on the
        element still wins, and a subtree marked <code>not-typeset</code> opts
        out entirely. That is how a component with its own chrome sits inside a
        body without inheriting paragraph margins or code chips. This page is
        typeset; the specimen lists below are not.
      </p>

      <h2>Headings</h2>
      <p>Used to introduce pages or sections.</p>
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

      <h2>Buttons</h2>
      <p>Only to be used within components that render buttons.</p>
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

      <h2>Label</h2>
      <p>
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

      <h2>Copy</h2>
      <p>
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
    </DocsPage>
  )
}
