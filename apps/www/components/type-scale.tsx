import { cn } from "@/lib/utils"

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
    <div className="mt-4 flex flex-col">
      {items.map((item) => (
        <div key={item.className} className="border-b py-5 last:border-b-0">
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
            <code className="text-label-13-mono text-gray-900">
              {item.className}
            </code>
          </div>
          {item.usage ? (
            <p className="text-copy-13 mt-2 text-gray-900">{item.usage}</p>
          ) : null}
        </div>
      ))}
    </div>
  )
}
