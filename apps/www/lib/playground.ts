// The playground's item list is generated from the filesystem alongside the
// preview loaders; nothing here is a registry item.
export {
  PREVIEW_ITEMS as PLAYGROUND_ITEMS,
  type PreviewItem as PlaygroundItem,
} from "@/__previews__"

import { PREVIEW_ITEMS } from "@/__previews__"

export const DEFAULT_ITEM = "preview"

export function getPlaygroundItem(name: string | null | undefined) {
  return PREVIEW_ITEMS.find((item) => item.name === name) ?? null
}
