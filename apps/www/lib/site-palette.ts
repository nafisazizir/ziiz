/* The palette this site wears, picked on /playground and kept in this
 * browser. It is one <style> in <head>, written before first paint by the
 * root layout's script so a worn palette never flashes the stock one. The
 * selectors outrank theme.css's :root and .dark by one element. */

import type { Endpoints } from "@/lib/palettes"
import type { Theme } from "@/lib/color-ramp"

const KEY = "ziiz-palette"
const STYLE_ID = "ziiz-palette"
const CHANGE = "ziiz-palette-change"

export const SITE_SELECTORS: Record<Theme, string> = {
  light: "html:root",
  dark: "html.dark",
}

export interface CustomSeed {
  hex: string
  strength: number
  endpoints: Endpoints
}

export interface SitePalette {
  id: string
  css: string
  custom?: CustomSeed
}

export const sitePaletteScript = `try{var p=JSON.parse(localStorage.getItem("${KEY}"));if(p&&p.css){var s=document.createElement("style");s.id="${STYLE_ID}";s.textContent=p.css;document.head.appendChild(s)}}catch(e){}`

let cache: { raw: string | null; value: SitePalette | null } = {
  raw: null,
  value: null,
}

export function readSitePalette(): SitePalette | null {
  let raw: string | null = null
  try {
    raw = localStorage.getItem(KEY)
  } catch {
    return null
  }
  if (raw !== cache.raw) {
    let value: SitePalette | null = null
    try {
      value = raw ? JSON.parse(raw) : null
    } catch {}
    cache = { raw, value }
  }
  return cache.value
}

export function subscribeSitePalette(onChange: () => void) {
  window.addEventListener(CHANGE, onChange)
  window.addEventListener("storage", onChange)
  return () => {
    window.removeEventListener(CHANGE, onChange)
    window.removeEventListener("storage", onChange)
  }
}

/** Wear a palette, or null for the stock one. Colours ease across for a
 *  moment unless the reader asked for less motion. */
export function wearSitePalette(palette: SitePalette | null) {
  try {
    if (palette) localStorage.setItem(KEY, JSON.stringify(palette))
    else localStorage.removeItem(KEY)
  } catch {}

  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const ease = document.createElement("style")
    ease.textContent =
      "*,*::before,*::after{transition:background-color .4s,color .4s,border-color .4s,box-shadow .4s,fill .4s !important}"
    document.head.appendChild(ease)
    setTimeout(() => ease.remove(), 450)
  }

  let style = document.getElementById(STYLE_ID)
  if (palette) {
    if (!style) {
      style = document.createElement("style")
      style.id = STYLE_ID
      document.head.appendChild(style)
    }
    style.textContent = palette.css
  } else {
    style?.remove()
  }
  window.dispatchEvent(new Event(CHANGE))
}
