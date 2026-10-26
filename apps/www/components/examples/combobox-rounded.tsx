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
] as const
const frameworks = ["Next.js", "SvelteKit", "Nuxt.js", "Remix", "Astro"]

export default function ComboboxRounded() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-3">
      {looks.map(({ variant, label }) => (
        <Combobox
          key={variant}
          items={frameworks}
          variant={variant}
          shape="rounded"
        >
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
