"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

type Size = "sm" | "default" | "lg"

const SizeContext = React.createContext<Size>("default")

function InputGroup({
  className,
  size = "default",
  ...props
}: React.ComponentProps<"div"> & { size?: Size }) {
  return (
    <SizeContext.Provider value={size}>
      <div
        data-slot="input-group"
        data-size={size}
        role="group"
        className={cn(
          "group/input-group relative flex h-9 w-full min-w-0 items-center rounded-md border border-gray-alpha-400 bg-background-100 transition-[color,border-color,box-shadow] outline-none hover:border-gray-alpha-500 in-data-[slot=combobox-content]:focus-within:border-inherit in-data-[slot=combobox-content]:focus-within:ring-0 has-[[data-slot=input-group-control]:focus-visible]:border-gray-600 has-[[data-slot=input-group-control]:focus-visible]:ring-3 has-[[data-slot=input-group-control]:focus-visible]:ring-gray-600/50 has-[[data-slot][aria-invalid=true]]:border-red-800 has-[[data-slot][aria-invalid=true]]:bg-red-100 has-[[data-slot][aria-invalid=true]]:ring-3 has-[[data-slot][aria-invalid=true]]:ring-red-800/20 has-[>[data-align=block-end]]:flex-col has-[>[data-align=block-start]]:flex-col data-[size=lg]:h-10 data-[size=sm]:h-8 [&:has(>textarea,>[data-align^=block])]:h-auto has-[>[data-align=block-end]]:[&>input]:pt-3 has-[>[data-align=block-start]]:[&>input]:pb-3 has-[>[data-align=inline-end]]:[&>input]:pe-1.5 has-[>[data-align=inline-start]]:[&>input]:ps-1.5",
          className
        )}
        {...props}
      />
    </SizeContext.Provider>
  )
}

const inputGroupAddonVariants = cva(
  "flex h-auto cursor-text items-center justify-center gap-2 py-1.5 text-label-14 text-gray-900 select-none group-data-[disabled=true]/input-group:opacity-50 **:data-[slot=kbd]:rounded-[min(var(--radius-sm),calc(6px*var(--radius-scale)))] [&>svg:not([class*='size-'])]:size-4",
  {
    variants: {
      align: {
        "inline-start":
          "order-first ps-3 group-data-[size=lg]/input-group:ps-4 has-[>button]:-ms-2.75 has-[>button[data-size=icon-sm]]:-ms-2 has-[>button[data-size=icon-xs]]:-ms-1 has-[>button[data-size=sm]]:-ms-3.25 has-[>kbd]:ms-[-0.15rem]",
        "inline-end":
          "order-last pe-3 group-data-[size=lg]/input-group:pe-4 has-[>button]:-me-2.75 has-[>button[data-size=icon-sm]]:-me-2 has-[>button[data-size=icon-xs]]:-me-1 has-[>button[data-size=sm]]:-me-3.25 has-[>kbd]:me-[-0.15rem]",
        "block-start":
          "order-first w-full justify-start px-3 pt-2 group-has-[>input]/input-group:pt-2 group-data-[size=lg]/input-group:px-4 [.border-b]:pb-2",
        "block-end":
          "order-last w-full justify-start px-3 pb-2 group-has-[>input]/input-group:pb-2 group-data-[size=lg]/input-group:px-4 [.border-t]:pt-2",
      },
    },
    defaultVariants: {
      align: "inline-start",
    },
  }
)

function InputGroupAddon({
  className,
  align = "inline-start",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof inputGroupAddonVariants>) {
  return (
    <div
      role="group"
      data-slot="input-group-addon"
      data-align={align}
      className={cn(inputGroupAddonVariants({ align }), className)}
      onClick={(e) => {
        if ((e.target as HTMLElement).closest("button")) {
          return
        }
        e.currentTarget.parentElement?.querySelector("input")?.focus()
      }}
      {...props}
    />
  )
}

// These classes land after Button's own, so shape has to be restated here
// for the sizes that carry their own radius (xs, icon-xs).
const inputGroupButtonVariants = cva("flex items-center gap-2 text-button-14", {
  variants: {
    size: {
      xs: "h-6 gap-1 rounded-[min(var(--radius-md),calc(8px*var(--radius-scale)))] px-2.5 has-data-[icon=inline-end]:pe-2 has-data-[icon=inline-start]:ps-2 [&>svg:not([class*='size-'])]:size-3.5",
      sm: "",
      "icon-xs":
        "size-6 rounded-[min(var(--radius-md),calc(8px*var(--radius-scale)))] p-0 has-[>svg]:p-0",
      "icon-sm": "size-8 p-0 has-[>svg]:p-0",
    },
    shape: {
      default: "",
      rounded: "",
    },
  },
  compoundVariants: [
    {
      shape: "rounded",
      size: "xs",
      className: "rounded-full",
    },
    {
      shape: "rounded",
      size: "icon-xs",
      className: "rounded-full",
    },
  ],
  defaultVariants: {
    size: "xs",
    shape: "default",
  },
})

function InputGroupButton({
  className,
  type = "button",
  variant = "ghost",
  size = "xs",
  shape = "default",
  ...props
}: Omit<React.ComponentProps<typeof Button>, "size" | "type"> &
  VariantProps<typeof inputGroupButtonVariants> & {
    type?: "button" | "submit" | "reset"
  }) {
  return (
    <Button
      type={type}
      data-size={size}
      variant={variant}
      shape={shape}
      className={cn(inputGroupButtonVariants({ size, shape }), className)}
      {...props}
    />
  )
}

function InputGroupText({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "flex items-center gap-2 text-label-14 text-gray-900 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  )
}

function InputGroupInput({
  className,
  ...props
}: React.ComponentProps<typeof Input>) {
  return (
    <Input
      size={React.useContext(SizeContext)}
      data-slot="input-group-control"
      className={cn(
        "flex-1 rounded-none border-0 bg-transparent ring-0 focus-visible:ring-0 aria-invalid:bg-transparent aria-invalid:ring-0",
        className
      )}
      {...props}
    />
  )
}

function InputGroupTextarea({
  className,
  ...props
}: React.ComponentProps<typeof Textarea>) {
  return (
    <Textarea
      size={React.useContext(SizeContext)}
      data-slot="input-group-control"
      className={cn(
        "flex-1 resize-none rounded-none border-0 bg-transparent py-2 ring-0 focus-visible:ring-0 aria-invalid:bg-transparent aria-invalid:ring-0",
        className
      )}
      {...props}
    />
  )
}

export {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupInput,
  InputGroupTextarea,
}
