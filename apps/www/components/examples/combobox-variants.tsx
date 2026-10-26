"use client"

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"

const looks = [
  { variant: "default", label: "Default" },
  { variant: "secondary", label: "Secondary" },
  { variant: "ghost", label: "Ghost" },
] as const
const frameworks = ["Next.js", "SvelteKit", "Nuxt.js", "Remix", "Astro"]

export default function ComboboxVariants() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-3">
      {looks.map(({ variant, label }) => (
        <Combobox key={variant} items={frameworks} variant={variant}>
          <ComboboxInput placeholder={label} />
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
