import { ArrowRight01Icon, Mail01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

import { Button } from "@/components/ui/button"

export default function ButtonWithIcon() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Button variant="outline">
        <HugeiconsIcon
          icon={Mail01Icon}
          strokeWidth={2}
          data-icon="inline-start"
        />
        Email
      </Button>
      <Button>
        Continue
        <HugeiconsIcon
          icon={ArrowRight01Icon}
          strokeWidth={2}
          data-icon="inline-end"
        />
      </Button>
    </div>
  )
}
