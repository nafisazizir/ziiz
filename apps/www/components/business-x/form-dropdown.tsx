"use client"

import * as React from "react"

import { IconChevronDown } from "@tabler/icons-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"

// x.com's pickers are 40px fields at a 16px inset with 40px rows, the lg
// step; one size on the trigger and the menu root keeps text aligned.
export function FormDropdown({
  id,
  placeholder,
  options,
  value: controlled,
  onValueChange,
  size = "lg",
}: {
  id: string
  placeholder: string
  options: { label: string; value: string }[]
  value?: string | null
  onValueChange?: (value: string) => void
  size?: "default" | "lg"
}) {
  const [open, setOpen] = React.useState(false)
  const [own, setOwn] = React.useState<string | null>(null)
  const value = controlled === undefined ? own : controlled
  const setValue = (next: string) => {
    setOwn(next)
    onValueChange?.(next)
  }
  const selected = options.find((option) => option.value === value)

  return (
    <DropdownMenu open={open} onOpenChange={setOpen} size={size}>
      <DropdownMenuTrigger
        nativeButton={false}
        tabIndex={-1}
        render={<InputGroup size={size} />}
      >
        <InputGroupInput
          id={id}
          readOnly
          className="pointer-events-none"
          value={selected?.label ?? ""}
          placeholder={placeholder}
          onKeyDown={(event) => {
            if (["Enter", " ", "ArrowDown"].includes(event.key)) {
              event.preventDefault()
              setOpen(true)
            }
          }}
        />
        <InputGroupAddon align="inline-end">
          <IconChevronDown />
        </InputGroupAddon>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuRadioGroup
          value={value}
          onValueChange={(next) => setValue(next as string)}
        >
          {options.map((option) => (
            <DropdownMenuRadioItem key={option.value} value={option.value}>
              {option.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
