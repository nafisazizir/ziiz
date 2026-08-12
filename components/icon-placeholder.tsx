"use client"

import { HugeiconsIcon } from "@hugeicons/react"

import * as icons from "@/components/icons/hugeicons"

// Ported examples pass a name per icon library (like /create's IconPlaceholder);
// ziiz is hugeicons-only, so the other names are accepted and ignored.
export function IconPlaceholder({
  hugeicons,
  lucide: _lucide,
  tabler: _tabler,
  phosphor: _phosphor,
  remixicon: _remixicon,
  ...props
}: {
  lucide?: string
  tabler?: string
  hugeicons?: string
  phosphor?: string
  remixicon?: string
} & Omit<React.ComponentProps<"svg">, "strokeWidth">) {
  const icon = hugeicons
    ? icons[hugeicons as keyof typeof icons]
    : undefined

  if (!icon) {
    return null
  }

  return <HugeiconsIcon icon={icon} strokeWidth={2} {...props} />
}
