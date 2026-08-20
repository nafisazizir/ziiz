/** Keys that open the preview command palette, with meta or ctrl held. */
const PALETTE_KEYS = ["p", "k"]

/** postMessage type the preview iframe uses to reach the palette owner. */
export const PALETTE_MESSAGE_TYPE = "ziiz-palette"

export function isPaletteShortcut(event: KeyboardEvent) {
  return PALETTE_KEYS.includes(event.key) && (event.metaKey || event.ctrlKey)
}

/**
 * Forwards the palette shortcut from a preview iframe to the parent window,
 * which owns the palette. Inlined so it runs before hydration, and kept here
 * so the keys and message type stay in step with `isPaletteShortcut`.
 */
export const PALETTE_KEY_FORWARD_SCRIPT = `
  document.addEventListener("keydown", function (e) {
    if (${JSON.stringify(PALETTE_KEYS)}.includes(e.key) && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      if (window.parent && window.parent !== window) {
        window.parent.postMessage({ type: ${JSON.stringify(
          PALETTE_MESSAGE_TYPE
        )}, key: e.key }, "*");
      }
    }
  });
`
