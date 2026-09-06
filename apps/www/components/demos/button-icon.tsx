import { Add01Icon, Settings01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

import { Button } from "@/components/ui/button"

export default function ButtonIcon() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Button size="icon-xs" variant="outline" aria-label="Add">
        <HugeiconsIcon icon={Add01Icon} strokeWidth={2} />
      </Button>
      <Button size="icon-sm" variant="outline" aria-label="Add">
        <HugeiconsIcon icon={Add01Icon} strokeWidth={2} />
      </Button>
      <Button size="icon" variant="outline" aria-label="Settings">
        <HugeiconsIcon icon={Settings01Icon} strokeWidth={2} />
      </Button>
      <Button size="icon-lg" variant="outline" aria-label="Settings">
        <HugeiconsIcon icon={Settings01Icon} strokeWidth={2} />
      </Button>
    </div>
  )
}
