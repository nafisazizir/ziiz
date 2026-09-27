import { IconItalic } from "@tabler/icons-react"

import { Toggle } from "@/components/ui/toggle"

function ToggleText() {
  return (
    <Toggle aria-label="Toggle italic">
      <IconItalic />
      Italic
    </Toggle>
  )
}

export default ToggleText
