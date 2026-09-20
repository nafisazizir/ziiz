import { BadgeCheck, BookmarkIcon } from "@/components/icons"

import { Badge } from "@/components/ui/badge"

function BadgeWithIconLeft() {
  return (
    <div className="flex flex-wrap gap-2">
      <Badge variant="secondary">
        <BadgeCheck data-icon="inline-start" />
        Verified
      </Badge>
      <Badge variant="outline">
        Bookmark
        <BookmarkIcon data-icon="inline-end" />
      </Badge>
    </div>
  )
}

export default BadgeWithIconLeft
