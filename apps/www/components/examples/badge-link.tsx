import { IconArrowUpRight } from "@tabler/icons-react"

import { Badge } from "@/components/ui/badge"

function BadgeAsLink() {
  return (
    <Badge render={<a href="#link" />}>
      Open Link <IconArrowUpRight data-icon="inline-end" />
    </Badge>
  )
}

export default BadgeAsLink
