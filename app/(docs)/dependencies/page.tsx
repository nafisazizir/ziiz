import type { Metadata } from "next"

import {
  getComponentGraph,
  isClean,
  OFF_SYSTEM_KINDS,
  type ComponentNode,
  type OffSystemKind,
} from "@/lib/component-graph"
import { cn } from "@/lib/utils"
import {
  DocsHeading,
  DocsList,
  DocsPageHeader,
  DocsParagraph,
  InlineCode,
} from "@/components/docs-prose"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "Dependencies",
  description:
    "The components/ui import graph in topological order: which components to migrate first.",
}

/** Badge tint per off-system kind, keyed by its `ComponentNode` field. */
const KIND_BADGE_CLASS: Record<OffSystemKind["key"], string> = {
  aliasClasses: "bg-red-200 text-red-900",
  typeClasses: "bg-amber-200 text-amber-900",
  shadowClasses: "bg-teal-200 text-teal-900",
  shapeClasses: "bg-pink-200 text-pink-900",
}

function StatusDot({
  clean,
  className,
}: {
  clean: boolean
  className?: string
}) {
  return (
    <span
      aria-hidden
      className={cn(
        "size-2.5 shrink-0 rounded-full",
        clean ? "bg-green-700" : "bg-amber-700",
        className
      )}
    />
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
        <InlineCode key={c}>{c}</InlineCode>
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
          <StatusDot clean={clean} />
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
          {OFF_SYSTEM_KINDS.map((kind) => (
            <StatBadge
              key={kind.key}
              count={node[kind.key].length}
              singular={kind.singular}
              plural={kind.plural}
              className={KIND_BADGE_CLASS[kind.key]}
            />
          ))}
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
        {OFF_SYSTEM_KINDS.map((kind) => (
          <ChipRow key={kind.key} label={kind.label} items={node[kind.key]} />
        ))}
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
    <>
      <DocsPageHeader
        title="Dependencies"
        description={
          <>
            Every component in <InlineCode>components/ui</InlineCode>, its
            internal imports, and the topological order for the ramp-vocabulary
            migration: each tier depends only on the tiers above it, so working
            top to bottom means every component is validated against parts that
            are already done.
          </>
        }
      />
      <DocsParagraph>
        Scanned from the working tree at render time.{" "}
        <span className="text-gray-1000">
          {totals.pending} of {totals.total}
        </span>{" "}
        components still carry off-system classes — shadcn slot aliases, raw
        type utilities, bare shadows, or literal shape values;{" "}
        <span className="text-gray-1000">{totals.clean}</span> are clean. Within
        a tier, components with the most dependents come first: they unlock the
        most downstream work.
      </DocsParagraph>
      <DocsParagraph className="flex flex-wrap items-center gap-x-6 gap-y-1 text-copy-14">
        <span className="flex items-center gap-2">
          <StatusDot clean={false} />
          has off-system classes
        </span>
        <span className="flex items-center gap-2">
          <StatusDot clean />
          clean
        </span>
      </DocsParagraph>

      {tiers.map((tier, i) => (
        <section key={i}>
          <DocsHeading id={`tier-${i}`}>
            Tier {i}
            <span className="ml-2 text-gray-900">
              — {tier.length} {tier.length === 1 ? "component" : "components"}
            </span>
          </DocsHeading>
          <DocsParagraph>
            {TIER_INTROS[i] ??
              `Longest dependency chain of ${i}. Migrate after tier ${i - 1}.`}
          </DocsParagraph>
          <Accordion className="mt-4 material-base px-4">
            {tier.map((node) => (
              <ComponentRow key={node.name} node={node} />
            ))}
          </Accordion>
        </section>
      ))}

      <DocsHeading>How status is read</DocsHeading>
      <DocsList>
        <li>
          A component is <InlineCode>clean</InlineCode> when it carries no
          off-system classes of any tracked kind: shadcn slot aliases, raw type,
          bare shadows, and raw shape. The dot and the meter track all four.
          Clean is necessary, not sufficient: the on-touch pass also covers
          judgment calls (hover steps, material assignment) no scan can verify.
        </li>
        <li>
          <em>Aliases</em> are classes that resolve through the shadcn slot
          layer (<InlineCode>bg-muted</InlineCode>,{" "}
          <InlineCode>text-primary-foreground</InlineCode>,{" "}
          <InlineCode>border-input</InlineCode>, …). <em>Raw type</em> counts
          Tailwind size, weight, tracking and leading utilities (
          <InlineCode>text-sm</InlineCode>, <InlineCode>font-medium</InlineCode>
          , <InlineCode>tracking-widest</InlineCode>,{" "}
          <InlineCode>leading-none</InlineCode>, literal{" "}
          <InlineCode>text-[0.8rem]</InlineCode>), which the migration replaces
          with the 31 named type roles. <em>Shadows</em> counts bare and
          arbitrary <InlineCode>shadow-*</InlineCode> utilities: the ramp
          already remaps the named values, but elevation should land as a
          composed <InlineCode>material-*</InlineCode>. <em>Raw shape</em>{" "}
          counts literal border and radius values (
          <InlineCode>rounded-[2px]</InlineCode>,{" "}
          <InlineCode>border-[1.5px]</InlineCode>) that bypass the radius scale
          — the generic <InlineCode>rounded-*</InlineCode> scale, structural
          border widths, and token-derived arbitraries like{" "}
          <InlineCode>rounded-[min(var(--radius-md),8px)]</InlineCode> are
          sanctioned and stay unflagged.
        </li>
        <li>
          Edges are <InlineCode>@/components/ui/*</InlineCode> imports between
          files, so <InlineCode>buttonVariants</InlineCode>-style imports count
          the same as component imports; a re-style of button still reaches the
          dependent.
        </li>
        <li>
          Call sites count files under <InlineCode>app/</InlineCode>,{" "}
          <InlineCode>components/</InlineCode>, <InlineCode>hooks/</InlineCode>{" "}
          and <InlineCode>lib/</InlineCode> that import the component: the
          surfaces (including <InlineCode>/preview</InlineCode>) where a
          migration can be visually validated.
        </li>
      </DocsList>
    </>
  )
}
