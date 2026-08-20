import { cn } from "@/lib/utils"
import { SpecList, SpecRow, SpecToken, SpecUsage } from "@/components/spec-list"

export type TypeVariant = {
  /** The utility class, e.g. "text-heading-72" */
  className: string
  /** Display name rendered as the preview, e.g. "Heading 72" */
  name: string
  /** Which nested-<strong> modifier the style supports, if any */
  modifier?: "Subtle" | "Strong"
  usage?: string
}

export function TypeVariantList({ items }: { items: TypeVariant[] }) {
  return (
    <SpecList>
      {items.map((item) => (
        <SpecRow key={item.className}>
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
            <div className={cn("min-w-0", item.className)}>
              {item.name}
              {item.modifier ? (
                <>
                  {" "}
                  <strong>with {item.modifier}</strong>
                </>
              ) : null}
            </div>
            <SpecToken>{item.className}</SpecToken>
          </div>
          {item.usage ? <SpecUsage>{item.usage}</SpecUsage> : null}
        </SpecRow>
      ))}
    </SpecList>
  )
}
