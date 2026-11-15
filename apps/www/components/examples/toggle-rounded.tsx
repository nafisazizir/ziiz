import { IconBold, IconItalic } from "@tabler/icons-react"

import { Toggle } from "@/components/ui/toggle"

function ToggleRounded() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Toggle variant="outline" shape="rounded" aria-label="Toggle bold">
        <IconBold />
      </Toggle>
      <Toggle variant="outline" shape="rounded" aria-label="Toggle italic">
        <IconItalic />
        Italic
      </Toggle>
    </div>
  )
}

export default ToggleRounded
