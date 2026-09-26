import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

// The 31 type roles theme.css defines as `text-<role>` utilities. Listed here
// so tailwind-merge treats them as one font-size group: the last role in a
// class list wins, the same way `text-sm` and `text-lg` resolve.
export const typeRoles = [
  "heading-72",
  "heading-64",
  "heading-56",
  "heading-48",
  "heading-40",
  "heading-32",
  "heading-24",
  "heading-20",
  "heading-16",
  "heading-14",
  "button-16",
  "button-14",
  "button-12",
  "label-20",
  "label-18",
  "label-16",
  "label-16-mono",
  "label-14",
  "label-14-mono",
  "label-13",
  "label-13-mono",
  "label-12",
  "label-12-mono",
  "copy-24",
  "copy-20",
  "copy-18",
  "copy-16",
  "copy-14",
  "copy-14-mono",
  "copy-13",
  "copy-13-mono",
] as const

// The eight `material-*` utilities, likewise one group.
export const materials = [
  "base",
  "small",
  "medium",
  "large",
  "tooltip",
  "menu",
  "modal",
  "fullscreen",
] as const

export type TypeRole = (typeof typeRoles)[number]
export type Material = (typeof materials)[number]

export const twMerge = extendTailwindMerge<"material">({
  extend: {
    classGroups: {
      "font-size": [{ text: [...typeRoles] }],
      material: [{ material: [...materials] }],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
