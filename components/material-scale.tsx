import { cn } from "@/lib/utils"
import { SpecToken, SpecUsage } from "@/components/spec-list"

export type MaterialVariant = {
  /** The utility class, e.g. "material-base" */
  className: string
  /** Display name rendered inside the preview, e.g. "Base" */
  name: string
  /** The radius step the material resolves to, e.g. "rounded-md" */
  radius: string
  usage?: string
}

export function MaterialList({ items }: { items: MaterialVariant[] }) {
  return (
    <div className="mt-4 grid gap-x-6 gap-y-8 sm:grid-cols-2">
      {items.map((item) => (
        <div key={item.className}>
          <div
            className={cn(
              "flex h-32 items-center justify-center",
              item.className
            )}
          >
            <span className="text-label-14">{item.name}</span>
          </div>
          <div className="mt-3 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <SpecToken>{item.className}</SpecToken>
            <SpecToken>{item.radius}</SpecToken>
          </div>
          {item.usage ? <SpecUsage>{item.usage}</SpecUsage> : null}
        </div>
      ))}
    </div>
  )
}
