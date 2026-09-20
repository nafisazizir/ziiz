import { ItalicIcon } from "@/components/icons"

import { Toggle } from "@/components/ui/toggle"

function ToggleText() {
  return (
    <Toggle aria-label="Toggle italic">
      <ItalicIcon />
      Italic
    </Toggle>
  )
}

export default ToggleText
