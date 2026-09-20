import { ArrowUpRightIcon } from "@/components/icons"

import { Badge } from "@/components/ui/badge"

function BadgeAsLink() {
  return (
    <Badge render={<a href="#link" />}>
      Open Link <ArrowUpRightIcon data-icon="inline-end" />
    </Badge>
  )
}

export default BadgeAsLink
