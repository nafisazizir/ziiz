import { IconBookmark, IconRosetteDiscountCheck } from "@tabler/icons-react"

import { Badge } from "@/components/ui/badge"

function BadgeWithIconLeft() {
  return (
    <div className="flex flex-wrap gap-2">
      <Badge variant="secondary">
        <IconRosetteDiscountCheck data-icon="inline-start" />
        Verified
      </Badge>
      <Badge variant="outline">
        Bookmark
        <IconBookmark data-icon="inline-end" />
      </Badge>
    </div>
  )
}

export default BadgeWithIconLeft
