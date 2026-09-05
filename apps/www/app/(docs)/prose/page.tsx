import type { Metadata } from "next"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Prose",
  description:
    "The prose layer: one class that typesets long-form content onto the type roles.",
}

export default function Page() {
  return (
    <>
      <h1 className="scroll-m-24 text-heading-40 tracking-tighter">Prose</h1>
      <p className="mt-4 text-gray-900">
        One class that typesets long-form content onto the type roles.
      </p>

      <h2 className="mt-12 scroll-m-24 text-heading-24">Usage</h2>
      <p className="mt-3 text-gray-900">
        Add{" "}
        <code className="rounded-sm bg-gray-100 px-1 py-0.5 text-copy-13-mono">
          typeset
        </code>{" "}
        to a container. Every heading, paragraph, list, link, code span and
        table inside binds to a type role with a fixed rhythm, so a docs body, a
        blog article or rendered markdown is plain elements with no classes.
      </p>
      <pre className="mt-4 overflow-x-auto rounded-lg border bg-background-200 p-4">
        <code className="text-copy-13-mono">
          {`<article className="typeset">\n  <h1>Title</h1>\n  <p>Body copy on Copy 16, headings on the article scale.</p>\n</article>`}
        </code>
      </pre>
      <p className="mt-3 text-gray-900">
        Every rule is scoped with{" "}
        <code className="rounded-sm bg-gray-100 px-1 py-0.5 text-copy-13-mono">
          :where()
        </code>
        , so a utility on the element still wins, and a subtree marked{" "}
        <code className="rounded-sm bg-gray-100 px-1 py-0.5 text-copy-13-mono">
          not-typeset
        </code>{" "}
        opts out entirely. Rhythm is set by two custom properties,{" "}
        <code className="rounded-sm bg-gray-100 px-1 py-0.5 text-copy-13-mono">
          --typeset-flow
        </code>{" "}
        between blocks and{" "}
        <code className="rounded-sm bg-gray-100 px-1 py-0.5 text-copy-13-mono">
          --typeset-section
        </code>{" "}
        above a section heading. Everything below this line is one typeset body,
        written as bare elements.
      </p>

      <hr className="mt-12 border-gray-alpha-400" />

      <div className="typeset mt-12">
        <h1>Heading 1 binds to Heading 40</h1>
        <p>
          The first heading level inside a body is the page-title role. This
          paragraph is Copy 16 on Color 9. Every block sits 24px below the one
          before it, headings included.
        </p>
        <p>
          A second paragraph keeps the flow gap. Inline semantics bind too:{" "}
          <strong>strong is the Copy role&rsquo;s Strong modifier</strong>,{" "}
          <em>emphasis stays italic</em>, <code>code</code> becomes a chip,{" "}
          <kbd>⌘</kbd> <kbd>K</kbd> is a key cap, <mark>mark highlights</mark>,
          and <abbr title="Cascading Style Sheets">abbreviations</abbr> carry a
          dotted underline. A <a href="#lists">link</a> is underlined on the
          text color, never on the accent.
        </p>

        <h2>Heading 2 binds to Heading 32</h2>
        <p>
          Section headings take the section gap above, 72px by default. The role
          is applied as is: no weight, size or leading is overridden, so a
          heading here is identical to the same role anywhere in the app. A{" "}
          <code>code</code> span inside a heading keeps its Copy 13 Mono role
          too.
        </p>

        <h3>Heading 3 binds to Heading 24</h3>
        <p>Subsections take 64px above.</p>

        <h4>Heading 4 binds to Heading 20</h4>
        <p>Minor headings take 48px above.</p>

        <h5>Heading 5 binds to Heading 16, Heading 6 to 14</h5>
        <p>
          The smallest steps, 32px above, for run-in labels inside a subsection.
        </p>

        <h2 id="lists">Lists</h2>
        <p>Unordered lists use a disc, then a circle when nested.</p>
        <ul>
          <li>The marker sits on Color 6, a step lighter than the body.</li>
          <li>
            Items are 8px apart with 8px of padding after the marker, and a
            nested list keeps that gap.
            <ul>
              <li>Nested items use a circle.</li>
              <li>They indent by the same 20px as the parent.</li>
            </ul>
          </li>
          <li>
            A block inside an item takes the item gap, whether it follows text
            or not.
            <p>Like this paragraph.</p>
          </li>
        </ul>
        <p>Ordered lists use decimals.</p>
        <ol>
          <li>Read the roadmap.</li>
          <li>Cut the seam.</li>
          <li>Ship the layer.</li>
        </ol>
        <p>Definition lists set the term on Color 10 and indent the detail.</p>
        <dl>
          <dt>Role</dt>
          <dd>A named combination of size, leading, tracking and weight.</dd>
          <dt>Ramp</dt>
          <dd>The ten-step scale every color in the system is drawn from.</dd>
        </dl>

        <h2>Quotes, rules and disclosures</h2>
        <p>
          A blockquote is a pull quote: the text sits on Heading 24 with hanging
          quote marks drawn by the layer, and a trailing <code>footer</code>{" "}
          carries the attribution, with <code>cite</code> for the name. It takes
          half the section gap above and below.
        </p>
        <blockquote>
          <p>
            Minting short-lived tokens instead of keeping provider credentials
            in paused sandboxes has removed a whole class of security risk for
            us.
          </p>
          <footer>
            <cite>Fraser Brown</cite> BuildPass
          </footer>
        </blockquote>
        <p>
          Disclosures take the Accordion component&rsquo;s shape on the body
          role, with no hairline between rows. Adjacent ones stack; each opens
          on its own, since markdown cannot group them.
        </p>
        <details>
          <summary>Is this a native details element?</summary>
          <p>
            Yes. The summary is the trigger with the chevron at the end, and
            this content sits flush beneath it with 16px below, the same as the
            accordion panel.
          </p>
          <p>A second paragraph keeps the panel&rsquo;s 16px gap.</p>
        </details>
        <details>
          <summary>What does it not do?</summary>
          <p>
            It does not animate open and closed, and it does not close its
            siblings when opened. Both need the component.
          </p>
        </details>
        <details>
          <summary>Where does the look come from?</summary>
          <p>
            The Accordion component is the source of truth; the prose layer
            mirrors it by hand.
          </p>
        </details>
        <hr />
        <p>
          A horizontal rule is a 1px line on Color 2 with 80px above, 160px on
          wide screens, marking a break larger than any section.
        </p>

        <h2>Code</h2>
        <p>
          Inline code is the Copy 13 Mono chip on Color 1. Code blocks are Copy
          13 Mono on Background 2 with a hairline and 16px of padding. Syntax
          color is a pipeline concern and lands on the tokens inside; the
          surface is the same everywhere.
        </p>
        <pre>
          <code>{`@import "@ziiz/theme/theme.css";\n\n.article {\n  --typeset-flow: 1rem;\n  --typeset-section: 4rem;\n}`}</code>
        </pre>

        <h2>Tables</h2>
        <p>
          Tables are Copy 14 with tabular numerals. The separator sits on the
          cell, so appending a row never needs a rule to change, and the first
          column sits flush with the prose.
        </p>
        <table>
          <thead>
            <tr>
              <th>Element</th>
              <th>Role</th>
              <th>Gap above</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>h1</td>
              <td>Heading 40</td>
              <td>72px</td>
            </tr>
            <tr>
              <td>h2</td>
              <td>Heading 32</td>
              <td>72px</td>
            </tr>
            <tr>
              <td>h3</td>
              <td>Heading 24</td>
              <td>64px</td>
            </tr>
            <tr>
              <td>h4</td>
              <td>Heading 20</td>
              <td>48px</td>
            </tr>
            <tr>
              <td>p, ul, ol, dl</td>
              <td>Copy 16</td>
              <td>24px</td>
            </tr>
            <tr>
              <td>pre, table</td>
              <td>inherits</td>
              <td>28px</td>
            </tr>
            <tr>
              <td>blockquote</td>
              <td>Heading 24</td>
              <td>36px</td>
            </tr>
            <tr>
              <td>figure</td>
              <td>inherits</td>
              <td>40px</td>
            </tr>
          </tbody>
        </table>

        <h2>Figures</h2>
        <figure>
          <div className="flex h-40 items-center justify-center rounded-lg bg-gray-100 text-label-13 text-gray-900">
            image or embed
          </div>
          <figcaption>
            A figure takes 40px above and below; its caption is Copy 14 on Color
            9, centered, 16px below.
          </figcaption>
        </figure>

        <h2>Opting out</h2>
        <p>
          A component with its own chrome sits inside a body by marking its root{" "}
          <code>not-typeset</code>. Nothing inside it inherits paragraph
          margins, link underlines or code chips. The alert below is stock; the
          button next to it is a plain component in a plain paragraph and needs
          no marker because no rule targets it.
        </p>
        <Alert data-not-typeset className="mt-4">
          <AlertTitle>Stock alert inside a typeset body</AlertTitle>
          <AlertDescription>
            Its <code>code</code> and <a href="#lists">link</a> render as the
            component styles them, not as prose.
          </AlertDescription>
        </Alert>
        <p>
          <Button variant="secondary" size="sm">
            A button in a paragraph
          </Button>
        </p>

        <h2>Density</h2>
        <p>
          The two rhythm properties are the only knobs. The block below sets{" "}
          <code>--typeset-flow</code> to 12px and <code>--typeset-section</code>{" "}
          to 32px on a nested container, and everything inside tightens.
        </p>
        <section
          className="mt-4 rounded-lg border p-4"
          style={
            {
              "--typeset-flow": "0.75rem",
              "--typeset-section": "2rem",
            } as React.CSSProperties
          }
        >
          <h3>A denser body</h3>
          <p>Paragraphs sit 12px apart instead of 24px.</p>
          <p>
            Section headings pull in from 72px to 32px, subsections to 28px.
          </p>
          <h3>Another section</h3>
          <ul>
            <li>Lists keep their own 8px item gap.</li>
            <li>Only the two properties changed.</li>
          </ul>
        </section>
      </div>
    </>
  )
}
