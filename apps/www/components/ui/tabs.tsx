"use client"

import { Tabs as TabsPrimitive } from "@base-ui/react/tabs"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { useGlide } from "@/hooks/use-glide"

function Tabs({
  className,
  orientation = "horizontal",
  ...props
}: TabsPrimitive.Root.Props) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      data-orientation={orientation}
      className={cn(
        "group/tabs flex gap-2 data-horizontal:flex-col",
        className
      )}
      {...props}
    />
  )
}

const tabsListVariants = cva(
  "group/tabs-list relative isolate inline-flex w-fit items-center justify-center rounded-lg p-[3px] text-gray-900 group-data-horizontal/tabs:h-9 group-data-vertical/tabs:h-fit group-data-vertical/tabs:flex-col data-[variant=line]:rounded-none",
  {
    variants: {
      variant: {
        default: "border border-gray-alpha-400 bg-transparent",
        line: "gap-1 bg-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function TabsList({
  className,
  variant = "default",
  children,
  ...props
}: TabsPrimitive.List.Props & VariantProps<typeof tabsListVariants>) {
  const hover = useGlide("[data-slot=tabs-trigger]:hover:not([data-disabled])")
  const active = useGlide("[data-slot=tabs-trigger][data-active]")
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      data-variant={variant}
      className={cn(tabsListVariants({ variant }), className)}
      {...props}
    >
      {children}
      {variant === "default" && (
        <span
          ref={hover}
          aria-hidden
          data-hidden=""
          data-slot="tabs-hover"
          className="pointer-events-none absolute top-0 left-0 -z-1 rounded-md bg-gray-alpha-100 transition-[translate,width,height,opacity,background-color] duration-150 ease-out data-hidden:opacity-0 data-hidden:delay-50 data-pressed:bg-gray-alpha-200 motion-reduce:transition-[opacity]"
        />
      )}
      <span
        ref={active}
        aria-hidden
        data-hidden=""
        data-slot="tabs-indicator"
        className="pointer-events-none absolute top-0 left-0 -z-1 rounded-md bg-gray-alpha-200 transition-[translate,width,height,opacity] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-data-[variant=line]/tabs-list:bg-transparent group-data-[variant=line]/tabs-list:after:absolute group-data-[variant=line]/tabs-list:after:bg-gray-1000 group-data-horizontal/tabs:after:inset-x-px group-data-horizontal/tabs:after:-bottom-1 group-data-horizontal/tabs:after:h-0.5 group-data-vertical/tabs:after:inset-y-px group-data-vertical/tabs:after:-right-[3px] group-data-vertical/tabs:after:w-0.5 data-hidden:opacity-0 data-hidden:delay-50 motion-reduce:transition-[opacity]"
      />
    </TabsPrimitive.List>
  )
}

function TabsTrigger({ className, ...props }: TabsPrimitive.Tab.Props) {
  return (
    <TabsPrimitive.Tab
      data-slot="tabs-trigger"
      className={cn(
        "relative inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-button-14 whitespace-nowrap text-gray-900 transition-colors group-data-vertical/tabs:w-full group-data-vertical/tabs:justify-start hover:text-gray-1000 focus-visible:border-gray-600 focus-visible:ring-3 focus-visible:ring-gray-600/50 focus-visible:outline-1 focus-visible:outline-gray-600 disabled:pointer-events-none disabled:opacity-50 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        "group-data-[variant=line]/tabs-list:bg-transparent group-data-[variant=line]/tabs-list:data-active:bg-transparent",
        "data-active:bg-gray-alpha-200 data-active:text-gray-1000 group-data-glide/tabs-list:data-active:bg-transparent",
        "after:absolute after:bg-gray-1000 after:opacity-0 after:transition-opacity group-data-glide/tabs-list:after:hidden group-data-horizontal/tabs:after:inset-x-0 group-data-horizontal/tabs:after:bottom-[-5px] group-data-horizontal/tabs:after:h-0.5 group-data-vertical/tabs:after:inset-y-0 group-data-vertical/tabs:after:-right-1 group-data-vertical/tabs:after:w-0.5 group-data-[variant=line]/tabs-list:data-active:after:opacity-100",
        className
      )}
      {...props}
    />
  )
}

function TabsContent({ className, ...props }: TabsPrimitive.Panel.Props) {
  return (
    <TabsPrimitive.Panel
      data-slot="tabs-content"
      className={cn("flex-1 text-copy-14 outline-none", className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants }
