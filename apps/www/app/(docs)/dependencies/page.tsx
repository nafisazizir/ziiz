import type { Metadata } from "next"

import {
  getComponentGraph,
  isClean,
  type ComponentNode,
} from "@/lib/component-graph"
import { cn } from "@/lib/utils"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { DocsPage } from "@/components/docs-page"

const title = "Dependencies"
const description =
  "The components/ui import graph in topological order: which components to migrate first."

export const metadata: Metadata = { title, description }

/* Inside the accordion, which opts out of the typeset. */
function InlineCode({ children }: { children: React.ReactNode }) {
  return (
    <code className="rounded-sm bg-gray-100 px-1 py-0.5 text-copy-13-mono">
      {children}
    </code>
  )
}

function NameLinks({ names }: { names: string[] }) {
  return (
    <>
      {names.map((name, i) => (
        <span key={name}>
          {i > 0 && ", "}
          <a href={`#${name}`}>{name}</a>
        </span>
      ))}
    </>
  )
}

function StatBadge({
  count,
  singular,
  plural,
  className,
}: {
  count: number
  singular: string
  plural: string
  className: string
}) {
  if (count === 0) return null

  return (
    <Badge variant="secondary" className={cn("border-transparent", className)}>
      {count} {count === 1 ? singular : plural}
    </Badge>
  )
}

function ChipRow({ label, items }: { label: string; items: string[] }) {
  if (items.length === 0) return null

  return (
    <div className="mt-2 flex flex-wrap items-center gap-1 pl-4.5">
      <span className="mr-1 text-label-12 text-gray-900">{label}</span>
      {items.map((c) => (
        <code
          key={c}
          className="rounded-sm bg-gray-100 px-1 py-0.5 text-copy-13-mono"
        >
          {c}
        </code>
      ))}
    </div>
  )
}

function ComponentRow({ node }: { node: ComponentNode }) {
  const clean = isClean(node)

  return (
    <AccordionItem value={node.name} id={node.name} className="scroll-m-24">
      <AccordionTrigger className="items-center gap-2 py-3 text-label-14 text-gray-1000">
        <span className="flex flex-1 items-center gap-2">
          <span
            aria-hidden
            className={cn(
              "size-2.5 shrink-0 rounded-full",
              clean ? "bg-green-700" : "bg-amber-700"
            )}
          />
          {node.name}
        </span>
        <span className="flex flex-wrap items-center justify-end gap-2">
          <StatBadge
            count={node.usedBy.length}
            singular="dependent"
            plural="dependents"
            className="bg-purple-200 text-purple-900"
          />
          <StatBadge
            count={node.externalUses}
            singular="site"
            plural="sites"
            className="bg-gray-200 text-gray-900"
          />
          <StatBadge
            count={node.aliasClasses.length}
            singular="alias"
            plural="aliases"
            className="bg-red-200 text-red-900"
          />
          <StatBadge
            count={node.typeClasses.length}
            singular="raw type"
            plural="raw type"
            className="bg-amber-200 text-amber-900"
          />
          <StatBadge
            count={node.shadowClasses.length}
            singular="shadow"
            plural="shadows"
            className="bg-teal-200 text-teal-900"
          />
          <StatBadge
            count={node.shapeClasses.length}
            singular="raw shape"
            plural="raw shape"
            className="bg-pink-200 text-pink-900"
          />
          <StatBadge
            count={node.dependsOn.length}
            singular="dep"
            plural="deps"
            className="bg-blue-200 text-blue-900"
          />
        </span>
      </AccordionTrigger>
      <AccordionContent className="text-copy-13 text-gray-900">
        <p className="pl-4.5">
          {node.dependsOn.length > 0 ? (
            <>
              depends on <NameLinks names={node.dependsOn} />
            </>
          ) : (
            "no internal dependencies"
          )}
          {" · "}
          {node.usedBy.length > 0 ? (
            <>
              used by <NameLinks names={node.usedBy} />
            </>
          ) : (
            "no internal dependents"
          )}
          {" · "}
          {node.externalUses} call {node.externalUses === 1 ? "site" : "sites"}{" "}
          outside <InlineCode>ui</InlineCode>
        </p>
        <ChipRow label="aliases" items={node.aliasClasses} />
        <ChipRow label="raw type" items={node.typeClasses} />
        <ChipRow label="shadows" items={node.shadowClasses} />
        <ChipRow label="raw shape" items={node.shapeClasses} />
      </AccordionContent>
    </AccordionItem>
  )
}

const TIER_INTROS = [
  "No internal dependencies. These migrate and validate in isolation; nothing above them has to be re-checked until it is touched itself.",
  "Composed from tier 0 only. Migrate these once the leaves they render are done, so validation happens against already-migrated parts.",
]

export default function Page() {
  const { tiers, totals } = getComponentGraph()

  return (
    <DocsPage title={title}>
      <p>
        Every component in <code>components/ui</code>, its internal imports, and
        the topological order for the ramp-vocabulary migration: each tier
        depends only on the tiers above it, so working top to bottom means every
        component is validated against parts that are already done.
      </p>
      <p>
        Scanned from the working tree at render time.{" "}
        <strong>
          {totals.pending} of {totals.total}
        </strong>{" "}
        components still carry off-system classes — shadcn slot aliases, raw
        type utilities, bare shadows, or literal shape values;{" "}
        <strong>{totals.clean}</strong> are clean. Within a tier, components
        with the most dependents come first: they unlock the most downstream
        work.
      </p>
      <p className="flex flex-wrap items-center gap-x-6 gap-y-1 text-copy-14">
        <span className="flex items-center gap-2">
          <span aria-hidden className="size-2.5 rounded-full bg-amber-700" />
          has off-system classes
        </span>
        <span className="flex items-center gap-2">
          <span aria-hidden className="size-2.5 rounded-full bg-green-700" />
          clean
        </span>
      </p>

      {tiers.map((tier, i) => (
        <section key={i}>
          <h2 id={`tier-${i}`}>
            Tier {i}
            <span className="ml-2 text-gray-900">
              — {tier.length} {tier.length === 1 ? "component" : "components"}
            </span>
          </h2>
          <p>
            {TIER_INTROS[i] ??
              `Longest dependency chain of ${i}. Migrate after tier ${i - 1}.`}
          </p>
          <Accordion className="not-typeset mt-4 material-base px-4">
            {tier.map((node) => (
              <ComponentRow key={node.name} node={node} />
            ))}
          </Accordion>
        </section>
      ))}

      <h2>How status is read</h2>
      <ul>
        <li>
          A component is <code>clean</code> when it carries no off-system
          classes of any tracked kind: shadcn slot aliases, raw type, bare
          shadows, and raw shape. The dot and the meter track all four. Clean is
          necessary, not sufficient: the on-touch pass also covers judgment
          calls (hover steps, material assignment) no scan can verify.
        </li>
        <li>
          <em>Aliases</em> are classes that resolve through the shadcn slot
          layer (<code>bg-muted</code>, <code>text-primary-foreground</code>,{" "}
          <code>border-input</code>, …). <em>Raw type</em> counts Tailwind size,
          weight, tracking and leading utilities (<code>text-sm</code>,{" "}
          <code>font-medium</code>, <code>tracking-widest</code>,{" "}
          <code>leading-none</code>, literal <code>text-[0.8rem]</code>), which
          the migration replaces with the 31 named type roles. <em>Shadows</em>{" "}
          counts bare and arbitrary <code>shadow-*</code> utilities: the ramp
          already remaps the named values, but elevation should land as a
          composed <code>material-*</code>. <em>Raw shape</em> counts literal
          border and radius values (<code>rounded-[2px]</code>,{" "}
          <code>border-[1.5px]</code>) that bypass the radius scale — the
          generic <code>rounded-*</code> scale, structural border widths, and
          token-derived arbitraries like{" "}
          <code>rounded-[min(var(--radius-md),8px)]</code> are sanctioned and
          stay unflagged.
        </li>
        <li>
          Edges are <code>@/components/ui/*</code> imports between files, so{" "}
          <code>buttonVariants</code>-style imports count the same as component
          imports; a re-style of button still reaches the dependent.
        </li>
        <li>
          Call sites count files under <code>app/</code>,{" "}
          <code>components/</code>, <code>hooks/</code> and <code>lib/</code>{" "}
          that import the component: the surfaces (including{" "}
          <code>/preview</code>) where a migration can be visually validated.
        </li>
      </ul>
    </DocsPage>
  )
}
