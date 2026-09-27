"use client"

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"

const sizes = ["sm", "default", "lg"] as const
const frameworks = ["Next.js", "SvelteKit", "Nuxt.js", "Remix", "Astro"]

export default function ComboboxSize() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-3">
      {sizes.map((size) => (
        <Combobox key={size} items={frameworks} size={size}>
          <ComboboxInput placeholder={`Framework · ${size}`} />
          <ComboboxContent>
            <ComboboxEmpty>No items found.</ComboboxEmpty>
            <ComboboxList>
              {(item) => (
                <ComboboxItem key={item} value={item}>
                  {item}
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      ))}
    </div>
  )
}
