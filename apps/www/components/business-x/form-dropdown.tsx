"use client"

import * as React from "react"

import { ChevronDownIcon } from "@/components/icons"
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

export function FormDropdown({
  id,
  placeholder,
  options,
  value: controlled,
  onValueChange,
}: {
  id: string
  placeholder: string
  options: { label: string; value: string }[]
  value?: string | null
  onValueChange?: (value: string) => void
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
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger
        nativeButton={false}
        tabIndex={-1}
        render={<InputGroup />}
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
          <ChevronDownIcon />
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
